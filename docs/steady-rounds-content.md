# Steady Rounds website content

Checked 21 September 2026 against `aldo-leka/boxing-round-timer`, commit `cc7d960a7e0ccf1d3e0e05417b6e112be568b287`, and the Steady Rounds development discussion.

## Sources and distinctions

- `docs/MONETIZATION.md` and `App/Views/ProView.swift`: unlimited free timer sessions, one free saved routine, optional one-time Pro for unlimited routines, per-routine sounds, extra bells and accents. The website does not hard-code a worldwide price; Apple displays localized prices.
- `App/Views/SettingsView.swift` and `App/Services/InterruptionMonitor.swift`: current setting names, sound previews, local notification cues and interruption recovery. No guarantee that locked-screen cues bypass Focus, Silent mode or audio routing.
- `App/Core/SavedState.swift` and `App/AppStore.swift`: local settings, routines and unfinished session. Steady Rounds has no app-managed iCloud sync. Device backup is separate.
- `docs/ANALYTICS.md`, `App/Core/AnalyticsEvent.swift` and `App/Services/AnalyticsService.swift`: consent off by default; EU Mixpanel projects; coarse duration/count ranges; no routine names or exact timing; reset/queue clearing on withdrawal; previously transmitted events remain.
- Mixpanel projects were created on 21 September 2026. The two-year event retention follows [the current default for projects created after 1 September 2025](https://docs.mixpanel.com/docs/privacy/gdpr-compliance). Recheck actual settings if retention changes.
- Apple StoreKit handles purchases. No RevenueCat integration or separate app account is described.

## Asset provenance

- `public/apps/steady-rounds/icon.png`: resized from the app's `assets/Assets.xcassets/AppIcon.appiconset/AppIcon-1024.png`.
- `public/apps/steady-rounds/work.webp`: optimized from `design/app-store/raw/01-work.png`, a captured app screen showing an example workout. This is not a generated UI mockup.
- Original sources remain unchanged in the app repository. The website's decorative stopwatch illustration remains separate from the real app icon.

## Release handoff

- Overview / marketing URL: `https://aldoleka.com/steady-rounds`
- Support URL: `https://aldoleka.com/steady-rounds/support`
- Privacy policy URL: `https://aldoleka.com/steady-rounds/privacy`

These website changes do not update App Store Connect or the in-app Help/Privacy links. Wire the published URLs into those places during the app's release work. Configure the public App Store listing in `lib/apps.ts` when it is available.
