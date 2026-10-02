# Public website statistics

`/stats` and the footer show **recorded page visits**, not unique people or app usage. There is no owner dashboard in this release. Every 7/30/90-day window includes today in UTC; a seven-day view covers today and the previous six days. All time and the footer include today, from the configured first tracking day. Long charts group daily counts into months without discarding totals.

## Activation

Code alone does not create an account or start tracking. Until runtime settings exist, the page shows an honest not-started state.

Production configuration: site `lekisti`, first tracking day `2026-10-02`, and the encrypted repository secret `GOATCOUNTER_API_KEY` are supplied to the existing VPS deployment step. Docker Compose reads these environment values at runtime; the secret is not part of the image or repository. Routine container restarts preserve its environment. For manual deployments outside Actions, provide the same settings through an untracked VPS `.env` or exported environment; otherwise counting disables itself.

On 2026-10-02 the owner registered the account and authorized the key. The initial setup enabled Sessions, Referrer and Country. Later that day the owner requested all collection options: Individual pageviews, Sessions, Referrer, User-Agent, Size, Country, Region and Language are now enabled and saved in GoatCounter. The optional region-country restriction is blank, so regions are collected for all countries. Dashboard access remains private; the website key is read-statistics only and reporting uses UTC. Retention remains the default unlimited period for the requested all-time view. Collection changes apply to new visits and cannot reconstruct disabled fields from older visits.

User-Agent collection stores parsed browser/system information, not the full header. Individual pageviews stores detailed records for exports; aggregate dashboard counts work without it. These records remain in the private GoatCounter account. The public website still displays aggregate counts and country/source rankings only. On 2026-10-02 the live public API was verified to show named countries and direct traffic after the ranking/date-range correction.

1. Create a dedicated hosted GoatCounter site for `aldoleka.com`. Complete its account/terms flow with the account owner. No paid plan is required for the initial setup.
2. Keep the native GoatCounter dashboard private and its timezone set to UTC. Preserve the owner's current choice to enable all eight Data collection options, with no country restriction for regions. Confirm these settings against the current UI before reporting them as applied. Do not expose individual pageview records through the public website.
3. Create a **read-only statistics** API key restricted to this website. Never use a key with export, count/write, site-management or other-app access. Store it only as a runtime secret on the VPS, outside Git.
4. Set the values from `.env.example` in `/root/website/.env` on the existing deployment host. `GOATCOUNTER_SITE` is the short site code, not a URL. `GOATCOUNTER_START_DATE` is the actual UTC activation day. Set `WEBSITE_ANALYTICS_ENABLED=true` only after checking settings.
5. Recreate the existing app container (`docker compose up -d --force-recreate app`, preserving its current image tag). These are runtime values; no build-time secret is needed.
6. Check `/api/analytics-config`: only the public `/count` endpoint is returned. Check `/api/site-stats?days=all` and each 7/30/90 window. Confirm a real normal-browser page visit arrives, no query or full referrer is sent, and totals agree with the provider. Today's visit appears in every period. Test a client-side route change and a reload; confirm GoatCounter deduplication. Verify GPC/DNT and non-production hosts send nothing.

If the provider response, timezone or totals disagree, the endpoint fails closed with an unavailable state rather than publishing invented zeros. Account settings, API responses and tracking must be checked with the real account before considering analytics live.

## Data boundary

- Only `lib/site-pages.ts` public routes are counted and included in queries. Route queries, fragments, free-form titles and click events are excluded.
- Referrers are reduced in the browser to known source labels or Direct / unknown / Other sources. Public API output repeats that sanitization and permits country names derived from country codes only. Rankings retain every returned country/source count without a minimum-count threshold or top-five cutoff; URI-encoded source labels are decoded before normalization.
- No raw referrer URLs, identifiers, user records, API keys or app revenue appear in the public response. Website stats do not read any Mixpanel, PostHog or App Store account.
- Production-host guard, Global Privacy Control and Do Not Track apply before loading the analytics script. Configure GoatCounter's collection settings as above too; JavaScript minimization is not a substitute for provider settings.
- Stats cache for five minutes with four bounded date choices, request coalescing and a paced provider queue. Provider failures use short caches and expose no error details. This assumes the existing single app container; use shared caching/rate limiting before horizontal scaling.

## Verification

Run `npm run test:stats`, `npm run lint`, `npm run build`, `npm run typecheck`, `npm run test:stats-api` (uses the built handlers with a local provider stub), and `npm run test:smoke -- http://127.0.0.1:3000`. Inspect `/stats` and the footer at desktop and mobile widths. Test loading, empty, unavailable, zero and populated data states. Preview fixtures must remain local and must not enter the deployed API.

Official references: [API](https://www.goatcounter.com/help/api), [JavaScript](https://www.goatcounter.com/help/js), [sessions](https://www.goatcounter.com/help/sessions), [privacy](https://www.goatcounter.com/help/privacy).
