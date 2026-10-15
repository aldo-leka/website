# Public website statistics

`/stats` and the footer show **recorded visits**, not unique people or app usage. A visit is one visitor (an anonymous, monthly-rotating session) on public pages within one clock hour. Every 7/30/90-day window includes today in UTC; a seven-day view covers today and the previous six days. All time and the footer include today, from the configured first tracking day. Long charts group daily counts into months without discarding totals.

## Architecture

Self-hosted [Umami](https://umami.is) 3.4.0 runs on the website VPS (`ubuntu-8gb-hel1-1`) in `/root/umami`, with its own Postgres. Nothing about it is public:

- **Collection.** The browser posts `{path, source, screen, language}` to the website's own `/api/collect`. The route accepts only `lib/site-pages.ts` paths and known source labels, drops requests with Global Privacy Control, Do Not Track or another origin, and forwards a page view to `http://umami:3000/api/send` with the visitor's user agent and Cloudflare's `CF-Connecting-IP` / `CF-IPCountry` headers. Umami filters bots, derives a session ID from a monthly salt and does not store the IP address or user agent string.
- **Reading.** `/api/site-stats` queries Umami's database directly with the `website_stats` role, which can only `SELECT` from `website_event` and `session`, runs read-only and has a 5-second statement timeout. Counting distinct visits per day, per country and per entry source keeps every view consistent: rankings and daily totals always add up to the headline number. Direct traffic is included.
- **Networks.** The website container joins the external Docker network `website-analytics` alongside `umami` and `umami-postgres`. Umami's dashboard listens on `127.0.0.1:3010` only.
- **Dashboard.** `tailscale serve` publishes it to the tailnet: <https://ubuntu-8gb-hel1-1.tail4e166c.ts.net:8443>. It is not reachable from the internet.

Memory limits: Umami 512 MB (Node heap capped at 320 MB), Postgres 256 MB with 64 MB shared buffers. Measured at start: about 225 MB and 40 MB.

## Configuration

- `/root/umami/.env` (chmod 600) holds the Umami database password, `APP_SECRET` and the two-factor key, generated on the server.
- `/root/website/.env` (chmod 600, gitignored) holds `UMAMI_STATS_DATABASE_URL` for the read-only role.
- The deploy workflow passes the non-secret values: `UMAMI_URL`, `UMAMI_WEBSITE_ID`, `WEBSITE_ANALYTICS_START_DATE` (first Umami day, 2026-10-15) and `WEBSITE_ANALYTICS_ENABLED`.

The aldoleka.com website record was created directly in Umami's database and belongs to the `admin` user. **Change the default `admin` / `umami` password** in the dashboard (Settings → Profile) before using it.

To recreate the stack: `cd /root/umami && docker compose up -d`. To upgrade, change the pinned image tag, read Umami's release notes for schema changes to `website_event` or `session`, then run `npm run test:stats-api` and check `/api/site-stats` for every period. The read-only role's table grants must survive the upgrade.

GoatCounter (site `lekisti`, used from 2 October until the switch on 15 October 2026; 123 recorded visits) is no longer used. Its history stays in that private account and is not merged into these counts.

## Data boundary

- Only public routes are counted. Route queries, fragments, free-form titles and click events are excluded.
- Referrers are reduced in the browser to known source labels or Direct / unknown / Other sources, then stored in Umami as one canonical domain per label (`other.invalid` for Other sources). Public output maps them back to the label and shows country names derived from country codes only. Rankings keep every count, with no minimum threshold or top-five cutoff.
- No referrer URLs, identifiers, user records, credentials or app revenue appear in the public response. Website stats do not read any Mixpanel, PostHog or App Store account.
- The production-host guard, Global Privacy Control and Do Not Track apply in the browser and again on the server.
- Stats cache for five minutes (30 seconds after a failure) with four bounded date choices and request coalescing. Database errors produce an unavailable state rather than invented zeros. This assumes the existing single app container.

## Verification

Run `npm run test:stats`, `npm run lint`, `npm run build`, `npm run typecheck`, `npm run test:stats-api` (built handlers with a stubbed `pg` pool and collector) and `npm run test:smoke -- http://127.0.0.1:3000`. After deploying, load a public page in a normal browser, confirm the visit appears in the Umami dashboard and in `/api/site-stats?days=7`, and check `/stats` and the footer at desktop and mobile widths.
