"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Arrow } from "./Marks";
import { chartPoints, formatCount, formatDate, statsPeriods, type DayCount, type Ranking, type SiteStats, type StatsPeriod } from "@/lib/site-stats";

function useStats(period: StatsPeriod) {
  const [result, setResult] = useState<{ period: StatsPeriod; data: SiteStats | null; failed: boolean } | null>(null);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    fetch(`/api/site-stats?days=${period}`, { signal: controller.signal })
      .then(r => { if (!r.ok) throw new Error("Unavailable"); return r.json(); })
      .then((data: SiteStats) => {
        if (active) setResult({ period, data, failed: false });
      }).catch(() => {
        if (active) setResult({ period, data: null, failed: true });
      });
    return () => { active = false; controller.abort(); };
  }, [period, retry]);
  return { data: result?.period === period ? result.data : null,
    loading: result?.period !== period, failed: result?.period === period && result.failed,
    retry: () => { setResult(null); setRetry(value => value + 1); } };
}

export function VisitCounter() {
  const { data } = useStats("all");
  const total = data?.status === "ready" ? data.totalVisits : null;
  return <Link href="/stats" className="visit-counter" aria-label={total === null ? "View site stats" : `${formatCount(total)} total site visits. View site stats.`}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 19V12M10 19V5M16 19V9M22 19H2" /></svg>
    <span><strong>{formatCount(total)}</strong> visits</span>
    <Arrow />
  </Link>;
}

function Trend({ days }: { days: DayCount[] }) {
  const gradient = useId().replace(/:/g, "");
  const points = chartPoints(days);
  const max = Math.max(1, ...points.map(day => day.count));
  const width = 900, height = 225, left = 44, right = 12, top = 20, bottom = 28;
  const x = (i: number) => left + (points.length === 1 ? 0.5 : i / (points.length - 1)) * (width - left - right);
  const y = (count: number) => height - bottom - count / max * (height - top - bottom);
  const line = points.map((day, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(day.count).toFixed(1)}`).join(" ");
  const monthly = days.length > 180;
  return <>
    <svg className="stats-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${monthly ? "Monthly" : "Daily"} site visits. A table of the values follows.`}>
      <defs><linearGradient id={gradient} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f7665d" stopOpacity=".3" /><stop offset="100%" stopColor="#f7665d" stopOpacity=".025" /></linearGradient></defs>
      {[0, 0.5, 1].map(fraction => <g key={fraction}>
        <line x1={left} x2={width - right} y1={y(max * fraction)} y2={y(max * fraction)} stroke="#e2dfd7" strokeDasharray="4 5" />
        <text x={left - 10} y={y(max * fraction) + 4} textAnchor="end" fill="#565863" fontSize="12">{new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(max * fraction)}</text>
      </g>)}
      {points.length > 1 && <path d={`${line} L${x(points.length - 1)},${height - bottom} L${left},${height - bottom} Z`} fill={`url(#${gradient})`} />}
      <path d={line} fill="none" stroke="#b93931" strokeWidth="2.5" strokeLinejoin="round" />
      {points.length === 1 && <circle cx={x(0)} cy={y(points[0].count)} r="4" fill="#b93931" />}
    </svg>
    <div className="chart-dates"><span>{formatDate(days[0].date, true)}</span><span>{monthly ? "Monthly totals" : "Daily totals"}</span><span>{formatDate(days[days.length - 1].date, true)}</span></div>
    <details className="chart-table"><summary>View the numbers</summary><div className="table-scroll"><table><caption>{monthly ? "Monthly" : "Daily"} page visits (UTC)</caption><thead><tr><th scope="col">{monthly ? "Month" : "Date"}</th><th scope="col">Visits</th></tr></thead><tbody>{points.map(day => <tr key={day.date}><td>{monthly ? day.date.slice(0, 7) : formatDate(day.date, true)}</td><td>{formatCount(day.count)}</td></tr>)}</tbody></table></div></details>
  </>;
}

function RankingList({ rows, empty }: { rows: Ranking[]; empty: string }) {
  if (!rows.length) return <p className="stats-empty-small">{empty}</p>;
  const max = Math.max(...rows.map(row => row.count));
  return <ol className="stats-ranking">{rows.map(row => <li key={row.label}>
    <div><span>{row.label}</span><strong>{formatCount(row.count)}</strong></div>
    <span className="stats-bar" aria-hidden="true"><span style={{ width: `${row.count / max * 100}%` }} /></span>
  </li>)}</ol>;
}

export function PublicStats() {
  const [period, setPeriod] = useState<StatsPeriod>(30);
  const { data, loading, failed, retry } = useStats(period);
  const ready = !loading && data?.status === "ready";
  const unavailable = failed || data?.status === "unavailable";
  const topSource = ready ? data.sources.find(row => !["Direct / unknown", "Other sources"].includes(row.label)) : null;
  return <>
    <div className="stats-toolbar">
      <p className="stats-range" aria-live="polite">{ready ? `${formatDate(data.start, true)} – ${formatDate(new Date(Date.parse(data.end) - 86_400_000).toISOString(), true)}${period === "all" ? " · includes today" : " · complete days"}` : "A little look at who stops by."}</p>
      <div className="stats-periods" role="group" aria-label="Date range">{statsPeriods.map(value => <button key={value} type="button" aria-pressed={period === value} onClick={() => setPeriod(value)}>{value === "all" ? "All time" : `${value} days`}</button>)}</div>
    </div>
    <div className="stats-results" aria-busy={loading}>
      <div className="stats-tiles">
        <article className="stats-tile peach"><p>Site visits</p><strong>{formatCount(ready ? data.visits : null)}</strong><span>{period === "all" ? "Since tracking began" : `Last ${period} complete days`}</span></article>
        <article className="stats-tile sage"><p>Countries</p><strong>{formatCount(ready ? data.countryCount : null)}</strong><span>Around the world</span></article>
        <article className="stats-tile butter"><p>Top referrer</p><strong className="stats-source">{topSource?.label ?? "—"}</strong><span>{topSource ? `${formatCount(topSource.count)} recorded visits` : "Among identified sources"}</span></article>
      </div>
      {!ready && <div className="stats-notice" role="status"><strong>{loading ? "Fetching the latest counts…" : unavailable ? "The stats are taking a breather." : "Every visit starts somewhere."}</strong><p>{loading ? "Just a moment." : unavailable ? "The latest numbers aren’t available right now. Please try again in a little while." : "Counting hasn’t started yet. Once it does, you’ll find real visits, countries and sources here."}</p>{unavailable && !loading && <button type="button" onClick={retry} className="text-link">Try again <Arrow /></button>}</div>}
      <section className="stats-panel trend-panel" aria-labelledby="trend-title"><div className="stats-panel-heading"><h2 id="trend-title">Visits over time</h2><span className="handwritten">Thanks for stopping by!</span></div>{ready && data.days.length ? <Trend days={data.days} /> : <div className="stats-chart-empty"><span>No chart to show yet</span></div>}</section>
      <div className="stats-breakdowns">
        <section className="stats-panel" aria-labelledby="countries-title"><h2 id="countries-title">Where in the world?</h2><p className="stats-panel-subtitle">Countries, from most visits to fewest.</p><RankingList rows={ready ? data.countries : []} empty="Countries will appear as visits come in." /></section>
        <section className="stats-panel sources-panel" aria-labelledby="sources-title"><h2 id="sources-title">How you found me</h2><p className="stats-panel-subtitle">The places sending people this way.</p><RankingList rows={ready ? data.sources : []} empty="Traffic sources will appear here." /></section>
      </div>
      <p className="stats-updated">{ready ? `Tracking since ${formatDate(data.trackedSince!, true)}. Updated ${new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }).format(new Date(data.updatedAt!))} UTC.` : "No estimates or sample numbers are shown."}</p>
    </div>
    <section className="stats-method" id="privacy" aria-labelledby="stats-method-title"><h2 id="stats-method-title">Just the big picture.</h2><p>These stats cover this website. They don’t include activity or purchases inside my apps.</p>
      <details><summary>What does a visit mean?</summary><p>A visit is a recorded page visit, not a unique person. GoatCounter deduplicates repeat visits to the same page within an eight-hour session. Visiting different pages can add several visits. Privacy settings, blockers and bots affect the count. The 7-, 30- and 90-day views use completed UTC days; All time includes today, which is still in progress. Updates can take a few minutes.</p></details>
      <details><summary>Countries and referrers, explained</summary><p>A country is an approximate location inferred from a connection’s IP address, so VPNs can change it. A referrer is a site someone arrived from, such as Google or LinkedIn. Direct / unknown includes visits without that information, including many messages and email links. Small groups of fewer than five visits and less common sources are combined; only the five largest named groups are shown.</p></details>
      <details><summary>Website privacy</summary><p>When counting is enabled, this site uses <a href="https://www.goatcounter.com/help/privacy">GoatCounter</a> for aggregate analytics. No analytics cookies, accounts, session recordings or cross-app profiles are used. The browser sends a public page name and a broad source label, without URL queries, fragments or form contents. GoatCounter processes your IP address and browser information to derive a country and recognise repeat visits temporarily; see its privacy policy for details. Only totals and grouped country/source counts are displayed here. Global Privacy Control and Do Not Track disable counting. Contact <a href="mailto:help@aldoleka.com">help@aldoleka.com</a> with privacy questions.</p></details>
    </section>
  </>;
}
