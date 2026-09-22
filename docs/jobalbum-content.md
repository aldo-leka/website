# JobAlbum website content

Checked 22 September 2026 against the task **JobAlbum: Timestamp camera** (`01a0c862-12e8-7391-8721-a840b42fc170`) and the app source at commit `bdbe924e1df66d4fb37d4cf07735a41a064d975d`, including the ongoing Settings caption removal. This website release does not alter the app or its active release work.

## Sources and distinctions

- `docs/PRODUCT.md`, `docs/DEVELOPMENT-HANDOFF.md`, `JobAlbum/Views/SettingsView.swift`: jobs as albums, Quick capture, original/stamped copies, photo notes, archive, free/pro limits and localized StoreKit price. Minimum iOS 17. The public App Store listing is not yet configured, so use coming-soon links.
- `JobAlbum/Services/CameraService.swift` and `JobAlbum/Models/Library.swift`: optional foreground GPS, no more than 60 seconds old and accuracy estimate no worse than 100 metres. Date-only fallback, no background location or reverse geocoding. Typed address/place is separate from GPS. Device time and coordinates are not certified evidence.
- `JobAlbum/Services/LibraryRepository.swift` and `LibraryStore.swift`: local library, deletion tombstones, no in-app trash or cross-device sync. Device backups, Photos copies and exports are separate.
- `JobAlbum/Services/ExportService.swift`: complete JPEG/PDF files before sharing, original/stamped options, notes and recorded-GPS report controls, temporary export cleanup after seven days during a subsequent export. Disabling GPS does not remove an address typed in free text. Share-sheet display is not delivery confirmation.
- `docs/ANALYTICS.md`, `JobAlbum/Services/Analytics.swift` and the in-app privacy/consent views: consent required before initialization or queuing, random app identifier, fixed event categories and coarse photo-count ranges. App/OS/SDK versions remain. No photos, notes, addresses, coordinates, job/photo IDs, receipts, advertising identity, profiles or replay. EU ingestion; no IP geolocation enrichment. Opt-out discards the queue and resets identity, but does not delete already-delivered events.
- Mixpanel projects were created 22 September 2026. Two-year event retention follows [Mixpanel's current standard](https://docs.mixpanel.com/docs/privacy/gdpr-compliance). Recheck if the release task changes project retention or analytics behavior.
- Privacy coverage was checked against [Apple's privacy-policy requirements](https://developer.apple.com/app-store/review/guidelines/#privacy): data use, processors, retention, consent withdrawal and deletion/contact routes. Mixpanel's [DPA](https://mixpanel.com/legal/dpa/) describes processor safeguards.

## Asset provenance

`public/apps/jobalbum/icon.png` is a 512px optimized copy of the app's actual `JobAlbum/Resources/Assets.xcassets/AppIcon.appiconset/AppIcon.png`. The website uses the icon, not the planning mockups or QA report screenshots. No private photos, research exports or credentials are included.

## App Store handoff

- Marketing URL: `https://aldoleka.com/jobalbum`
- Support URL: `https://aldoleka.com/jobalbum/support`
- Privacy Policy URL: `https://aldoleka.com/jobalbum/privacy`

These URLs are public after this website deployment. Add them to App Store Connect and the in-app help/privacy links during the separate JobAlbum release task. Do not assume that publishing this website updates Apple's fields. Set `apps.jobAlbum.storeUrl` only when the public listing is available.
