import { pageMetadata } from "@/lib/site-pages";
import { PublicStats } from "@/components/SiteStats";

export const metadata = pageMetadata("stats");

export default function StatsPage() {
  return <div className="stats-page wrap">
    <header className="stats-heading"><h1>Site <span className="underlined">stats.</span></h1></header>
    <PublicStats />
    <noscript><p className="stats-notice">JavaScript is needed to load the latest public counts.</p></noscript>
  </div>;
}
