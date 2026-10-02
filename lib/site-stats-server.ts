import "server-only";
import { sitePages } from "./site-pages";
import { count, dailyCounts, dateRange, emptyStats, ranked, type ProviderRow, type SiteStats, type StatsPeriod } from "./site-stats";

export function analyticsConfig() {
  const code = process.env.GOATCOUNTER_SITE ?? "";
  const token = process.env.GOATCOUNTER_API_KEY;
  const since = process.env.GOATCOUNTER_START_DATE ?? "";
  if (!/^[a-z0-9][a-z0-9-]{1,60}$/.test(code) || !token ||
      !/^\d{4}-\d{2}-\d{2}$/.test(since) || !Number.isFinite(Date.parse(since)) ||
      new Date(since).toISOString().slice(0, 10) !== since || Date.parse(since) > Date.now()) return null;
  return { origin: `https://${code}.goatcounter.com`, token, since,
    trackingEnabled: process.env.WEBSITE_ANALYTICS_ENABLED === "true" };
}

const cache = new Map<StatsPeriod, { data: SiteStats; until: number }>();
const pending = new Map<StatsPeriod, Promise<SiteStats>>();
let queue: Promise<unknown> = Promise.resolve();
let nextRequest = 0;

async function request(path: string, start: string, end: string, offset = 0) {
  const config = analyticsConfig();
  if (!config) throw new Error("Analytics not configured");
  // A fixed allowlist excludes future admin paths and custom events. Credentials
  // and provider responses never leave this server module.
  const url = new URL(`/api/v0/stats/${path}`, config.origin);
  url.searchParams.set("start", `${start}T00:00:00Z`);
  // GoatCounter includes the end hour/day. Our public ranges are end-exclusive.
  url.searchParams.set("end", new Date(Date.parse(end) - 3_600_000).toISOString());
  url.searchParams.set("path_by_name", "true");
  url.searchParams.set("include_paths", Object.values(sitePages).map(p => p.path).join(","));
  if (path !== "total") {
    url.searchParams.set("limit", "100");
    url.searchParams.set("offset", String(offset));
  }
  const task = queue.then(async () => {
    await new Promise(resolve => setTimeout(resolve, Math.max(0, nextRequest - Date.now())));
    nextRequest = Date.now() + 300; // GoatCounter permits four requests/second.
    const response = await fetch(url, { cache: "no-store", redirect: "error",
      headers: { Authorization: `Bearer ${config.token}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error("Analytics provider unavailable");
    return response.json();
  });
  queue = task.catch(() => undefined);
  return task;
}

async function dimensions(path: "locations" | "toprefs", start: string, end: string) {
  const rows: ProviderRow[] = [];
  // Country codes and the source allowlist are bounded; allow pagination for
  // historical data without accepting an unbounded request from a visitor.
  for (let page = 0; page < 10; page++) {
    const data = await request(path, start, end, rows.length);
    if (data.stats === null && !data.more) return rows;
    if (!Array.isArray(data.stats)) throw new Error("Missing analytics ranking");
    rows.push(...data.stats);
    if (!data.more) return rows;
    if (!data.stats.length) break;
  }
  throw new Error("Incomplete analytics ranking");
}

async function load(period: StatsPeriod): Promise<SiteStats> {
  const config = analyticsConfig();
  if (!config) return emptyStats(period, "not-configured");
  const now = new Date();
  const range = dateRange(period, now, config.since);
  const allRange = dateRange("all", now, config.since);
  try {
    const allRequest = request("total", allRange.start, allRange.end);
    const [total, all, countries, sources] = await Promise.all([
      period === "all" ? allRequest : request("total", range.start, range.end),
      allRequest,
      dimensions("locations", range.start, range.end),
      dimensions("toprefs", range.start, range.end),
    ]);
    if (count(total.total_events) !== 0 || count(all.total_events) !== 0) throw new Error("Unexpected events in website counts");
    const locations = ranked(countries, "countries");
    const visits = count(total.total);
    const days = dailyCounts(total.stats === null && visits === 0 ? [] : total.stats, range.start, range.end);
    if (days.reduce((sum, day) => sum + day.count, 0) !== visits) throw new Error("Inconsistent daily totals; check provider timezone");
    return { status: "ready", period, ...range, trackedSince: config.since,
      updatedAt: new Date().toISOString(), totalVisits: count(all.total), visits,
      countryCount: locations.countryCount, countries: locations.rows,
      sources: ranked(sources, "sources").rows, days };
  } catch {
    // No zero substitutes, exception details, provider bodies or tokens in public responses.
    return { ...emptyStats(period, "unavailable"), ...range, trackedSince: config.since };
  }
}

export async function getSiteStats(period: StatsPeriod): Promise<SiteStats> {
  const saved = cache.get(period);
  if (saved && saved.until > Date.now()) return saved.data;
  const inFlight = pending.get(period);
  if (inFlight) return inFlight;
  const task = load(period).then(data => {
    cache.set(period, { data, until: Date.now() + (data.status === "ready" ? 300_000 : 30_000) });
    return data;
  }).finally(() => pending.delete(period));
  pending.set(period, task);
  return task;
}
