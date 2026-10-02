export const statsPeriods = [7, 30, 90, "all"] as const;
export type StatsPeriod = (typeof statsPeriods)[number];
export type Ranking = { label: string; count: number };
export type DayCount = { date: string; count: number };
export type SiteStats = {
  status: "ready" | "not-configured" | "unavailable";
  period: StatsPeriod;
  start: string;
  end: string;
  trackedSince: string | null;
  updatedAt: string | null;
  totalVisits: number | null;
  visits: number | null;
  countryCount: number | null;
  countries: Ranking[];
  sources: Ranking[];
  days: DayCount[];
};

export function dateRange(period: StatsPeriod, now = new Date(), since?: string) {
  // Fixed windows use completed UTC days. All time also includes today.
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  if (period === "all") return {
    start: since ?? end.toISOString().slice(0, 10),
    end: new Date(end.getTime() + 86_400_000).toISOString().slice(0, 10),
  };
  const start = new Date(end.getTime() - period * 86_400_000);
  return { start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) };
}

export function emptyStats(period: StatsPeriod, status: SiteStats["status"], now = new Date()): SiteStats {
  return { status, period, ...dateRange(period, now), trackedSince: null,
    updatedAt: null, totalVisits: null, visits: null, countryCount: null,
    countries: [], sources: [], days: [] };
}

export function formatCount(value: number | null) {
  return value === null ? "—" : new Intl.NumberFormat("en-GB").format(value);
}

export function formatDate(date: string, year = false) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", ...(year ? { year: "numeric" } as const : {}), timeZone: "UTC" }).format(new Date(date));
}

export function count(value: unknown): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) throw new Error("Invalid analytics count");
  return value;
}

export type ProviderRow = { name?: unknown; id?: unknown; count?: unknown };

const sourceNames: Record<string, string> = {
  google: "Google", bing: "Bing", duckduckgo: "DuckDuckGo", yahoo: "Yahoo",
  linkedin: "LinkedIn", facebook: "Facebook", instagram: "Instagram",
  reddit: "Reddit", github: "GitHub", youtube: "YouTube", chatgpt: "ChatGPT",
  twitter: "X", x: "X", "direct / unknown": "Direct / unknown",
};

// Only a known label is public. Never echo an arbitrary referrer, URL or query.
export function publicSource(raw: unknown): string {
  if (typeof raw !== "string" || !raw.trim()) return "Direct / unknown";
  const value = raw.trim().toLowerCase();
  if (sourceNames[value]) return sourceNames[value];
  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    if (url.username || url.password) return "Other sources";
    const host = url.hostname.replace(/^www\./, "");
    const domains: Record<string, string> = { "google.com": "Google", "google.nl": "Google", "google.co.uk": "Google", "bing.com": "Bing", "duckduckgo.com": "DuckDuckGo", "linkedin.com": "LinkedIn", "lnkd.in": "LinkedIn", "facebook.com": "Facebook", "instagram.com": "Instagram", "reddit.com": "Reddit", "github.com": "GitHub", "youtube.com": "YouTube", "chatgpt.com": "ChatGPT", "t.co": "X", "x.com": "X", "twitter.com": "X" };
    for (const [domain, label] of Object.entries(domains)) {
      if (host === domain || host.endsWith(`.${domain}`)) return label;
    }
  } catch { /* Unrecognized text is deliberately grouped. */ }
  return "Other sources";
}

export function ranked(rows: ProviderRow[], kind: "countries" | "sources") {
  const totals = new Map<string, number>();
  const regions = new Intl.DisplayNames(["en"], { type: "region" });
  const countryCodes = new Set<string>();
  for (const row of rows) {
    const visits = count(row.count);
    if (!visits) continue;
    let label: string;
    if (kind === "sources") label = publicSource(row.name);
    else {
      const code = typeof row.id === "string" ? row.id.toUpperCase() : "";
      const name = /^[A-Z]{2}$/.test(code) ? regions.of(code) : undefined;
      if (name && name !== code && code !== "ZZ") {
        countryCodes.add(code);
        label = name;
      } else label = "Unknown country";
    }
    totals.set(label, (totals.get(label) ?? 0) + visits);
  }
  const countryCount = countryCodes.size;
  // Small groups stay grouped, rather than advertising one person's location.
  let other = 0;
  const result: Ranking[] = [];
  for (const [label, visits] of totals) {
    if (visits < 5 || label === "Other sources" || label === "Unknown country") other += visits;
    else result.push({ label, count: visits });
  }
  result.sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  const top = result.slice(0, 5);
  other += result.slice(5).reduce((sum, row) => sum + row.count, 0);
  if (other) top.push({ label: kind === "sources" ? "Other sources" : "Other / unknown", count: other });
  top.sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  return { rows: top, countryCount };
}

export function dailyCounts(raw: unknown, start: string, end: string): DayCount[] {
  if (!Array.isArray(raw)) throw new Error("Missing daily analytics");
  const byDay = new Map<string, number>();
  for (const item of raw) {
    if (!item || typeof item.day !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(item.day)) throw new Error("Invalid analytics day");
    if (item.day >= start && item.day < end) byDay.set(item.day, count(item.daily));
  }
  const days: DayCount[] = [];
  for (let date = Date.parse(start); date < Date.parse(end); date += 86_400_000) {
    const day = new Date(date).toISOString().slice(0, 10);
    days.push({ date: day, count: byDay.get(day) ?? 0 });
  }
  return days;
}

export function chartPoints(days: DayCount[]): DayCount[] {
  if (days.length <= 180) return days;
  const months = new Map<string, number>();
  for (const day of days) {
    const month = `${day.date.slice(0, 7)}-01`;
    months.set(month, (months.get(month) ?? 0) + day.count);
  }
  return [...months].map(([date, count]) => ({ date, count }));
}
