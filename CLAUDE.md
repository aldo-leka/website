# Project guidance

This repository is Aldo Leka’s apps-first portfolio at https://aldoleka.com. See README.md for routes, configuration, validation and the existing VPS deployment workflow.

- Preserve the approved warm design: ivory, coral, peach, yellow and sage; DM Sans with Caveat accents; generous space and original illustrations.
- Keep the homepage focused on Count My Shift, Steady Rounds and DineMio, followed by a short introduction.
- Global navigation contains Apps, About and Contact. Each app owns its Privacy and Support links within its own pages.
- Keep “© <current year> Aldo Leka” in the footer, without another footer wordmark.
- The old blog and older project content were deliberately removed; do not restore them or add legacy redirects without a request.
- Configure public store destinations in lib/apps.ts. Until a listing is public, show a clear coming-soon status rather than a fake download link.
- Give every public page its own canonical URL, Open Graph/Twitter metadata and preview image through lib/site-pages.ts and app/share/[slug]/route.tsx.
- Do not invent product features, launch status or privacy guarantees. Update privacy disclosures when the real app or its services change.
- Keep credentials, private financial records, CV files and research exports out of Git.
- Prefer server-rendered content, native accessible controls and small local assets. Avoid adding tracking or a CMS without a request.
- Run lint, production build, typecheck and the HTTP smoke check; inspect mobile and desktop layouts before publishing.
- Deploy through the existing main-branch Docker/GitHub Actions workflow. Do not migrate hosting providers as part of ordinary edits.
