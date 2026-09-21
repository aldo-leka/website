# Aldo Leka — app portfolio

Warm, apps-first portfolio at **https://aldoleka.com**. Built with Next.js App Router, React and custom CSS. Fonts and artwork are served locally. The website has no analytics SDK, tracking pixels or contact-form backend.

## Development

Use Node.js 22 or later.

```sh
npm ci
npm run dev
```

Before publishing:

```sh
npm run lint
npm run build
npm run typecheck
npm run start -- --hostname 127.0.0.1 --port 4173
# In another terminal:
npm run test:smoke -- http://127.0.0.1:4173
```

The smoke check requests every sitemap page, validates canonical and social metadata, downloads each 1200 × 630 preview PNG, checks internal links and confirms removed routes return 404. Also check desktop and mobile layouts in a browser.

## Content and links

- `/`: Count My Shift, Steady Rounds and DineMio, with a short introduction.
- `/about` and `/contact`: professional biography and general contact.
- `/count-my-shift`: app overview, with its own Privacy and Support navigation.
- `/count-my-shift/privacy`: published privacy policy.
- `/count-my-shift/support`: contact and frequently asked questions.
- `/steady-rounds`: full boxing-timer overview with real app imagery, free/Pro features and app navigation.
- `/steady-rounds/privacy`: local storage, optional analytics, purchases and privacy choices.
- `/steady-rounds/support`: timer, sounds, lock-screen cues, routines, restore and beta help.

Global navigation is Apps, About and Contact. App-specific legal and help links belong within the app pages. The previous blog, older projects and their assets were deliberately removed. Their old URLs return 404; historical content remains in Git history.

Set `storeUrl` in **`lib/apps.ts`** when an iPhone app has a public `https://apps.apple.com/...` listing. Until then its page says “Coming to the App Store”; home cards link to the app overview. Setting the URL enables the store buttons and removes the app’s beta label. DineMio uses its own website URL. Never use a private App Store Connect page or TestFlight invitation as a public store URL.

Page titles, descriptions and preview copy are centralized in `lib/site-pages.ts`. Every public page has its own generated PNG at `/share/<page-key>-v<revision>.png` (currently v2, or v3 for Steady Rounds) and Open Graph/Twitter metadata. The central 630px contains the essential artwork and label so square thumbnails do not cut them off. Keep image filenames versioned when the design changes: social platforms may retain previously fetched images. Previous `/share/<page-key>` URLs remain available. Add new pages to the sitemap and this metadata registry. Unknown preview keys return 404.

The smoke check uses `Twitterbot/1.0` by default and verifies metadata in the HTML head, PNG content and dimensions, image MIME metadata and a 300KB file-size budget. Use `SMOKE_USER_AGENT='WhatsApp/2.26' npm run test:smoke -- https://aldo.al` to check the alias with another crawler identity. Also run it against `https://aldoleka.com`. HTTP checks establish reachability; they do not prove a platform has refreshed its cached card. Check X’s Card Validator and a fresh draft, and inspect both wide and square image crops when updating previews.

## Privacy policy maintenance

The Count My Shift policy describes its current implementation: private local/iCloud records, opt-in usage analytics, no financial values or free text in analytics, EU Mixpanel projects, Apple-managed purchases and local reminders. The app source was checked when drafting it.

Steady Rounds has separate app-specific disclosures: local routines and unfinished sessions, no cross-device routine sync, optional EU Mixpanel analytics with coarse workout/routine-count ranges, StoreKit purchases and local workout cues. Source references and asset provenance are recorded in `docs/steady-rounds-content.md`.

The published **two-year event retention** matches Mixpanel’s default for projects created after 1 September 2025, and the owner approved using that period. This website does not change Mixpanel project settings. Recheck [Mixpanel’s retention documentation](https://docs.mixpanel.com/docs/privacy/gdpr-compliance) and actual project settings whenever practices change; update the policy and app disclosures together.

## Assets

`public/art/` contains original AI-generated Amsterdam, stopwatch and restaurant illustrations made for this design, optimized to WebP. The latter two are decorative artwork, not official app logos or product screenshots. `public/apps/count-my-shift/` contains the app’s own icon and an actual screenshot with example records. `public/apps/steady-rounds/` contains its actual boxing-bell icon and a real timer screenshot, optimized from the app repository. DM Sans and Caveat are self-hosted through their Fontsource packages; their font licenses are also distributed in `public/licenses/`. Do not add the CV, credentials, private app data or raw research documents to the repository.

## Deployment

Pushing `main` triggers `.github/workflows/deploy.yml`. GitHub builds the standalone Next.js Docker image, pushes it to GHCR, then the existing self-hosted `website-vps` runner calls `scripts/deploy.sh` to deploy the SHA-tagged image with Docker Compose. Hosting remains on the existing VPS, behind Caddy/Cloudflare.

After a push, verify the GitHub Actions deployment and run the smoke check against `https://aldoleka.com`. Roll back with a Git revert and push, or redeploy a previous known-good GHCR SHA tag on the VPS. Do not force-push production history.
