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
- `/steady-rounds`: introductory page to expand when more product information is ready.

Global navigation is Apps, About and Contact. App-specific legal and help links belong within the app pages. The previous blog, older projects and their assets were deliberately removed. Their old URLs return 404; historical content remains in Git history.

Set `storeUrl` in **`lib/apps.ts`** when an iPhone app has a public `https://apps.apple.com/...` listing. Until then its page says “Coming to the App Store”; home cards link to the app overview. Setting the URL enables the store buttons and removes Count My Shift’s beta label. DineMio uses its own website URL. Never use a private App Store Connect page or TestFlight invitation as a public store URL.

Page titles, descriptions and preview copy are centralized in `lib/site-pages.ts`. Every public page has its own generated PNG at `/share/<page-key>` and Open Graph/Twitter metadata. Add new pages to the sitemap and this metadata registry. Unknown preview keys return 404.

## Privacy policy maintenance

The Count My Shift policy describes its current implementation: private local/iCloud records, opt-in usage analytics, no financial values or free text in analytics, EU Mixpanel projects, Apple-managed purchases and local reminders. The app source was checked when drafting it.

The published **two-year event retention** matches Mixpanel’s default for projects created after 1 September 2025, and the owner approved using that period. This website does not change Mixpanel project settings. Recheck [Mixpanel’s retention documentation](https://docs.mixpanel.com/docs/privacy/gdpr-compliance) and actual project settings whenever practices change; update the policy and app disclosures together.

## Assets

`public/art/` contains original AI-generated Amsterdam, stopwatch and restaurant illustrations made for this design, optimized to WebP. The latter two are decorative artwork, not official app logos or product screenshots. `public/apps/count-my-shift/` contains the app’s own icon and an actual screenshot with example records. DM Sans and Caveat are self-hosted through their Fontsource packages; their font licenses are also distributed in `public/licenses/`. Do not add the CV, credentials, private app data or raw research documents to the repository.

## Deployment

Pushing `main` triggers `.github/workflows/deploy.yml`. GitHub builds the standalone Next.js Docker image, pushes it to GHCR, then the existing self-hosted `website-vps` runner calls `scripts/deploy.sh` to deploy the SHA-tagged image with Docker Compose. Hosting remains on the existing VPS, behind Caddy/Cloudflare.

After a push, verify the GitHub Actions deployment and run the smoke check against `https://aldoleka.com`. Roll back with a Git revert and push, or redeploy a previous known-good GHCR SHA tag on the VPS. Do not force-push production history.
