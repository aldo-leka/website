"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Arrow, Asterisk } from "./Marks";
import { chartPoints, directSource, formatCount, formatDate, statsPeriods, type DayCount, type Ranking, type SiteStats, type StatsPeriod } from "@/lib/site-stats";

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
  const [active, setActive] = useState<number | null>(null);
  // Draw at the real pixel width so phones get a tall, readable chart to scrub.
  const frame = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(900);
  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(280, Math.round(entry.contentRect.width))));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const points = chartPoints(days);
  // An even maximum keeps the middle gridline on a whole number of visits.
  const max = Math.max(2, Math.ceil(Math.max(...points.map(day => day.count)) / 2) * 2);
  const height = width < 600 ? 200 : 250, left = width < 600 ? 34 : 44, right = 12, top = 20, bottom = 28;
  const x = (i: number) => left + (points.length === 1 ? 0.5 : i / (points.length - 1)) * (width - left - right);
  const y = (count: number) => height - bottom - count / max * (height - top - bottom);
  const line = points.map((day, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(day.count).toFixed(1)}`).join(" ");
  const monthly = days.length > 180;
  const when = (point: DayCount) => monthly
    ? new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(point.date))
    : new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(point.date));
  const visits = (count: number) => `${formatCount(count)} ${count === 1 ? "visit" : "visits"}`;
  const last = points.length - 1;
  const shown = active === null ? null : points[active];
  // Pointer events cover mouse, pen and touch: drag a finger across to read each day.
  const pick = (event: React.PointerEvent<SVGSVGElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const position = (event.clientX - box.left) / box.width * width;
    const index = Math.round((position - left) / (width - left - right) * last);
    setActive(Math.min(last, Math.max(0, Number.isFinite(index) ? index : 0)));
  };
  const step = (event: React.KeyboardEvent<SVGSVGElement>) => {
    const keys: Record<string, number> = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1 };
    if (event.key === "Home" || event.key === "End") setActive(event.key === "Home" ? 0 : last);
    else if (keys[event.key]) setActive(current => Math.min(last, Math.max(0, (current ?? last) + keys[event.key])));
    else return;
    event.preventDefault();
  };
  return <>
    <p className="chart-readout" aria-live="polite">
      {shown ? <><strong>{visits(shown.count)}</strong><span>{when(shown)}</span></>
        : <span className="chart-hint">{monthly ? "Hover or drag across the chart for each month" : "Hover or drag across the chart for each day"}</span>}
    </p>
    <div ref={frame}><svg className="stats-chart" viewBox={`0 0 ${width} ${height}`} tabIndex={0} role="slider"
      aria-label={`${monthly ? "Monthly" : "Daily"} site visits from ${formatDate(days[0].date, true)} to ${formatDate(days[days.length - 1].date, true)}`}
      aria-valuemin={0} aria-valuemax={last} aria-valuenow={active ?? last}
      aria-valuetext={`${when(points[active ?? last])}: ${visits(points[active ?? last].count)}`}
      onPointerDown={pick} onPointerMove={pick}
      onPointerLeave={event => { if (event.pointerType === "mouse") setActive(null); }}
      onKeyDown={step} onFocus={() => setActive(current => current ?? last)} onBlur={() => setActive(null)}>
      <defs><linearGradient id={gradient} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f7665d" stopOpacity=".3" /><stop offset="100%" stopColor="#f7665d" stopOpacity=".025" /></linearGradient></defs>
      {[0, 0.5, 1].map(fraction => <g key={fraction}>
        <line x1={left} x2={width - right} y1={y(max * fraction)} y2={y(max * fraction)} stroke="#e2dfd7" strokeDasharray="4 5" />
        <text x={left - 10} y={y(max * fraction) + 4} textAnchor="end" fill="#565863" fontSize="12">{new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(max * fraction)}</text>
      </g>)}
      {points.length > 1 && <path d={`${line} L${x(last)},${height - bottom} L${left},${height - bottom} Z`} fill={`url(#${gradient})`} />}
      <path d={line} fill="none" stroke="#b93931" strokeWidth="2.5" strokeLinejoin="round" />
      {points.length === 1 && !shown && <circle cx={x(0)} cy={y(points[0].count)} r="4" fill="#b93931" />}
      {shown && active !== null && <g aria-hidden="true">
        <line x1={x(active)} x2={x(active)} y1={top - 6} y2={height - bottom} stroke="#b93931" strokeOpacity=".4" strokeWidth="1.5" />
        <circle cx={x(active)} cy={y(shown.count)} r="6" fill="#fffdf8" stroke="#b93931" strokeWidth="3" />
      </g>}
    </svg></div>
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
  const lastDay = ready ? new Date(Date.parse(data.end) - 86_400_000).toISOString().slice(0, 10) : "";
  // Direct visits have no referrer, so the tile names the leading external source.
  const topSource = ready ? data.sources.find(source => source.label !== directSource) ?? null : null;
  return <>
    <div className="stats-toolbar">
      <p className="stats-range" aria-live="polite">{ready ? `${data.start === lastDay ? formatDate(lastDay, true) : `${formatDate(data.start, true)} – ${formatDate(lastDay, true)}`}${period === "all" ? " · includes today" : ""}` : ""}</p>
      <div className="stats-periods" role="group" aria-label="Date range">{statsPeriods.map(value => <button key={value} type="button" aria-pressed={period === value} onClick={() => setPeriod(value)}>{value === "all" ? "All time" : `${value} days`}</button>)}</div>
    </div>
    <div className="stats-results" aria-busy={loading}>
      <div className="stats-tiles">
        <article className="stats-tile peach"><p>Site visits</p><strong>{formatCount(ready ? data.visits : null)}</strong><span>{period === "all" || (ready && data.start === data.trackedSince) ? "Since tracking began" : `Last ${period} days`}</span></article>
        <article className="stats-tile sage"><p>Countries</p><strong>{formatCount(ready ? data.countryCount : null)}</strong><span>Around the world</span></article>
        <article className="stats-tile butter"><p>Top referrer</p><strong className="stats-source">{topSource?.label ?? "—"}</strong><span>{topSource ? `${formatCount(topSource.count)} ${topSource.count === 1 ? "visit" : "visits"}` : ready ? "None yet" : "From other sites"}</span></article>
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
