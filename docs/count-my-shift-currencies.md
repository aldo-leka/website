# Count My Shift currency copy

Updated 22 September 2026 from the authorized handoff in **Count My Shift: Tip Tracker** (`01a0c45d-38f0-7ae0-adde-d34e4f80e3f2`). Privacy disclosure commit `8caa000` was already deployed and is preserved. The overview, four support FAQs, metadata and current app screenshot were transferred from its reviewed website worktree without editing the iOS project.

- `CountMyShift/Services/ExchangeRates.swift`, `Core/Reporting.swift` and `Views/SettingsViews.swift`: public historical Frankfurter rates, remembered reporting currency, cache and missing-rate behavior.
- Combined summaries use rates on or before a shift's date. Original shift/payment amounts, CSV and backups are unchanged; conversion is an estimate and is not a currency-exchange service.
- No income amounts, hours, job names, notes, payments or analytics identifier go to the rate service. The policy explains the public currency/date queries and normal connection metadata separately from optional Mixpanel analytics.
- `public/apps/count-my-shift/home.webp` is the release task's refreshed actual app screen with example data (five shifts, 30 paid hours). The shared Phone alt text matches it.
- Build 1.0 (5) is in internal TestFlight; these pages do not claim public App Store availability. The public store URL remains unset.

Reference: [Frankfurter](https://frankfurter.dev/).
