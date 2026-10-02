"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Arrow, Asterisk } from "./Marks";
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
    <Asterisk />
    <span>{formatCount(total)} visits</span>
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
    <svg className="stats-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${monthly ? "Monthly" : "Daily"} site visits from ${formatDate(days[0].date, true)} to ${formatDate(days[days.length - 1].date, true)}.`}>
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
      <p className="stats-range" aria-live="polite">{ready ? `${formatDate(data.start, true)} – ${formatDate(new Date(Date.parse(data.end) - 86_400_000).toISOString(), true)}${period === "all" ? " · includes today" : ""}` : ""}</p>
      <div className="stats-periods" role="group" aria-label="Date range">{statsPeriods.map(value => <button key={value} type="button" aria-pressed={period === value} onClick={() => setPeriod(value)}>{value === "all" ? "All time" : `${value} days`}</button>)}</div>
    </div>
    <div className="stats-results" aria-busy={loading}>
      <div className="stats-tiles">
        <article className="stats-tile peach"><p>Site visits</p><strong>{formatCount(ready ? data.visits : null)}</strong><span>{period === "all" ? "Since tracking began" : `Last ${period} days`}</span></article>
        <article className="stats-tile sage"><p>Countries</p><strong>{formatCount(ready ? data.countryCount : null)}</strong><span>Around the world</span></article>
        <article className="stats-tile butter"><p>Top referrer</p><strong className="stats-source">{topSource?.label ?? "—"}</strong><span>{topSource ? `${formatCount(topSource.count)} recorded visits` : "Among identified sources"}</span></article>
      </div>
      {!ready && <div className="stats-notice" role="status"><strong>{loading ? "Fetching the latest counts…" : unavailable ? "The stats are taking a breather." : "Every visit starts somewhere."}</strong><p>{loading ? "Just a moment." : unavailable ? "The latest numbers aren’t available right now. Please try again in a little while." : "Counting hasn’t started yet. Once it does, you’ll find real visits, countries and sources here."}</p>{unavailable && !loading && <button type="button" onClick={retry} className="text-link">Try again <Arrow /></button>}</div>}
      <section className="stats-panel trend-panel" aria-labelledby="trend-title"><div className="stats-panel-heading"><h2 id="trend-title">Visits over time</h2></div>{ready && data.days.length ? <Trend days={data.days} /> : <div className="stats-chart-empty"><span>No chart to show yet</span></div>}</section>
      <div className="stats-breakdowns">
        <section className="stats-panel" aria-labelledby="countries-title"><h2 id="countries-title">Where in the world?</h2><RankingList rows={ready ? data.countries : []} empty="Countries will appear as visits come in." /></section>
        <section className="stats-panel sources-panel" aria-labelledby="sources-title"><h2 id="sources-title">How you found me</h2><RankingList rows={ready ? data.sources : []} empty="Traffic sources will appear here." /></section>
      </div>
    </div>
  </>;
}
