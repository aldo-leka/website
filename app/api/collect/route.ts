import { analyticsConfig } from "@/lib/site-stats-server";
import { sitePages } from "@/lib/site-pages";
import { sourceReferrer } from "@/lib/site-stats";

export const dynamic = "force-dynamic";

const pages = new Map<string, string>(Object.values(sitePages).map(page => [page.path, page.title]));
const origins = new Set(["https://aldoleka.com", "https://www.aldoleka.com"]);
const done = (status = 204) => new Response(null, { status, headers: { "Cache-Control": "no-store" } });

// First-party page-view endpoint. Only a public path, a source label, the screen
// size and the browser language arrive here; Umami derives a monthly-salted
// session from the forwarded IP and user agent and does not store either.
export async function POST(request: Request) {
  const config = analyticsConfig();
  const headers = request.headers;
  const site = headers.get("sec-fetch-site");
  const origin = headers.get("origin");
  if (!config?.trackingEnabled || headers.get("sec-gpc") === "1" || headers.get("dnt") === "1" ||
      (site && site !== "same-origin") || (origin && !origins.has(origin))) return done();
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object") return done(400);
    body = parsed as Record<string, unknown>;
  } catch {
    return done(400);
  }
  const title = typeof body.path === "string" ? pages.get(body.path) : undefined;
  if (!title) return done(400);
  const screen = typeof body.screen === "string" && /^\d{2,5}x\d{2,5}$/.test(body.screen) ? body.screen : undefined;
  const language = typeof body.language === "string" && /^[A-Za-z]{2,3}(-[A-Za-z0-9]{2,8}){0,3}$/.test(body.language) ? body.language : undefined;
  const forwarded: Record<string, string> = { "Content-Type": "application/json", "User-Agent": headers.get("user-agent") ?? "" };
  for (const name of ["cf-connecting-ip", "cf-ipcountry", "x-forwarded-for"]) {
    const value = headers.get(name);
    if (value) forwarded[name] = value;
  }
  const payload = { website: config.websiteId, hostname: "aldoleka.com", url: body.path, title, screen, language,
    referrer: sourceReferrer(body.source) };
  try {
    await fetch(config.collectUrl, { method: "POST", headers: forwarded, body: JSON.stringify({ type: "event", payload }),
      cache: "no-store", redirect: "error", signal: AbortSignal.timeout(3000) });
  } catch { /* Analytics must never interrupt the site. */ }
  return done();
}
