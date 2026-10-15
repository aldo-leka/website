import "server-only";
import { Pool } from "pg";
import { count, dailyCounts, dateRange, emptyStats, ranked, type ProviderRow, type SiteStats, type StatsPeriod } from "./site-stats";

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export function analyticsConfig() {
  const websiteId = process.env.UMAMI_WEBSITE_ID ?? "";
  const umamiUrl = process.env.UMAMI_URL ?? "";
  const database = process.env.UMAMI_STATS_DATABASE_URL;
  const since = process.env.WEBSITE_ANALYTICS_START_DATE ?? "";
  if (!uuid.test(websiteId) || !/^https?:\/\/[a-z0-9.-]+(:\d+)?\/?$/.test(umamiUrl) || !database ||
      !/^\d{4}-\d{2}-\d{2}$/.test(since) || !Number.isFinite(Date.parse(since)) ||
      new Date(since).toISOString().slice(0, 10) !== since || Date.parse(since) > Date.now()) return null;
  return { websiteId, collectUrl: new URL("/api/send", umamiUrl).toString(), database, since,
    trackingEnabled: process.env.WEBSITE_ANALYTICS_ENABLED === "true" };
}

// Umami records one page view per event (event_type 1). Without its client cache
// token, a visit is one session within one clock hour, so a visit never spans two
// days and belongs to exactly one country and one entry source. The role behind
// UMAMI_STATS_DATABASE_URL can only read website_event and session.
const queries = {
  total: `/* site-stats:total */
    select count(distinct visit_id)::int as visits from website_event
    where website_id = $1 and event_type = 1 and created_at >= $2 and created_at < $3`,
  daily: `/* site-stats:daily */
    select to_char(created_at at time zone 'UTC', 'YYYY-MM-DD') as day, count(distinct visit_id)::int as daily
    from website_event
    where website_id = $1 and event_type = 1 and created_at >= $2 and created_at < $3
    group by 1 order by 1`,
  countries: `/* site-stats:countries */
    select s.country as id, count(distinct e.visit_id)::int as count
    from website_event e join session s on s.session_id = e.session_id
    where e.website_id = $1 and e.event_type = 1 and e.created_at >= $2 and e.created_at < $3
    group by 1`,
  sources: `/* site-stats:sources */
    select referrer_domain as name, count(*)::int as count from (
      select distinct on (visit_id) visit_id, referrer_domain from website_event
      where website_id = $1 and event_type = 1 and created_at >= $2 and created_at < $3
      order by visit_id, created_at
    ) as entries group by 1`,
};

let pool: { url: string; pool: Pool } | undefined;
function database(url: string) {
  if (pool?.url !== url) {
    pool = { url, pool: new Pool({ connectionString: url, max: 2, connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30_000, statement_timeout: 5000 }) };
    pool.pool.on("error", () => { /* Idle client errors surface on the next query. */ });
  }
  return pool.pool;
}

async function rows(url: string, query: keyof typeof queries, websiteId: string, start: string, end: string) {
  const result = await database(url).query(queries[query], [websiteId, `${start}T00:00:00Z`, `${end}T00:00:00Z`]);
  if (!Array.isArray(result?.rows)) throw new Error("Missing analytics rows");
  return result.rows as Record<string, unknown>[];
}

async function load(period: StatsPeriod): Promise<SiteStats> {
  const config = analyticsConfig();
  if (!config) return emptyStats(period, "not-configured");
  const now = new Date();
  const range = dateRange(period, now, config.since);
  const allRange = dateRange("all", now, config.since);
  const read = (query: keyof typeof queries, from: { start: string; end: string }) =>
    rows(config.database, query, config.websiteId, from.start, from.end);
  try {
    const [total, all, daily, countries, sources] = await Promise.all([
      read("total", range), period === "all" ? null : read("total", allRange),
      read("daily", range), read("countries", range), read("sources", range),
    ]);
    const visits = count(total[0]?.visits);
    const totalVisits = all ? count(all[0]?.visits) : visits;
    const days = dailyCounts(daily, range.start, range.end);
    if (days.reduce((sum, day) => sum + day.count, 0) !== visits) throw new Error("Inconsistent daily totals");
    const locations = ranked(countries as ProviderRow[], "countries");
    return { status: "ready", period, ...range, trackedSince: config.since,
      updatedAt: new Date().toISOString(), totalVisits, visits,
      countryCount: locations.countryCount, countries: locations.rows,
      sources: ranked(sources as ProviderRow[], "sources").rows, days };
  } catch {
    // No zero substitutes, exception details, database errors or credentials in public responses.
    return { ...emptyStats(period, "unavailable"), ...range, trackedSince: config.since };
  }
}

const cache = new Map<StatsPeriod, { data: SiteStats; until: number }>();
const pending = new Map<StatsPeriod, Promise<SiteStats>>();

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
