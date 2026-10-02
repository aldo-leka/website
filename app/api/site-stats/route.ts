import { getSiteStats } from "@/lib/site-stats-server";
import { statsPeriods, type StatsPeriod } from "@/lib/site-stats";

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const value = url.searchParams.get("days") ?? "30";
  const days = value === "all" ? "all" : Number(value);
  if (!statsPeriods.includes(days as StatsPeriod)) return Response.json({ error: "Choose 7, 30, 90 or all." }, { status: 400 });
  const data = await getSiteStats(days as StatsPeriod);
  return Response.json(data, { headers: { "Cache-Control": data.status === "ready" ? "public, max-age=60, s-maxage=300" : "no-store" } });
}
