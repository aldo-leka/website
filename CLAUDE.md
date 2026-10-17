# Project guidance

This repository is Aldo Leka’s apps-first portfolio at https://aldoleka.com. See README.md for routes, configuration, validation and the existing VPS deployment workflow.

- Preserve the approved warm design: ivory, coral, peach, yellow and sage; DM Sans with Caveat accents; generous space and original illustrations.
- Keep the homepage focused on its projects, followed by a short introduction. DineMio leads as the wide first card, Rogers Deep Value comes second and Night Show third; Count My Shift, Steady Rounds and JobAlbum follow, and Lekasoft closes the grid by filling the rest of its row (two columns on desktop, one on tablets), so the grid never ends on a gap. On phones the cards after DineMio form a horizontal swipe row, so new projects join that row instead of lengthening the page.
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
