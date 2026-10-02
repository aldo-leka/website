import { analyticsConfig } from "@/lib/site-stats-server";
export const dynamic = "force-dynamic";
export function GET() {
  const config = analyticsConfig();
  return Response.json({ endpoint: config?.trackingEnabled ? `${config.origin}/count` : null },
    { headers: { "Cache-Control": "no-store" } });
}
