# Night Show website content

Checked 17 October 2026 against the night-show repository (aldo-leka/night-show, uncommitted work on top of v0.1). The app isn't on the App Store or in TestFlight yet; `apps.nightShow.storeUrl` stays `null` until the public listing exists.

## Sources and distinctions

- `app/src/profile.ts`: random player ID in the iOS Keychain (`expo-secure-store`, after first unlock), so it can survive a reinstall. The app's language is the one picked on the home screen, else Albanian for Albanian devices, else English.
- `server/src/app.js` (`app:hello`, `player:join`): the app sends player ID, platform, app version and device locale. Browser guests have no profile. IP addresses are used only for the connection and the local admin check; nothing writes them to the database. Rooms close after 30 idle minutes.
- `server/src/store.js`: tables `profiles` (first/last seen, platform, app version, locale), `games` (type, room code, host profile, players, platforms, settings without team names), `events`, `ai_calls` (model, tokens, cost, duration, success), `fq_verdicts` (language/letter/category/answer verdict cache) and `zilja_questions` (including custom topics). `prune()` deletes events, games and AI calls older than 13 months, daily.
- Events: `profile_created`, `game_started`, `game_finished` / `game_abandoned`, `judge_override`, `ai_fallback`.
- `server/src/games/fshat-qytet/game.js` and `judge.js`: Country City sends the letter, categories and numbered answers to Claude; no names or player IDs. `server/src/games/zilja/`: Buzzer answers are matched on the server (`match.js`); Claude only writes questions (`questions.js`). Topic questions are only served to rooms that pick the same topic.
- `server/public/src/join.js`: the browser join page keeps name, room code, player ID for that room and language in local storage.
- Every game is free (since 17 October 2026): no game credits, no ledger table, no ads. Since 18 October 2026 there is one optional purchase, the Night Show Plus subscription (custom topics, 30 a month); the privacy page's Purchases section describes what the server stores for it.
- The Buzzer's "We asked 100 people" answers are Claude's estimate, as the overview and support pages say.

## Asset provenance

`public/apps/night-show/icon.png` is a 512px copy of the app's `app/assets/icon.png`, generated with Codex image generation for this app (October 2026).

## App Store handoff

- Marketing URL: `https://aldoleka.com/night-show`
- Support URL: `https://aldoleka.com/night-show/support`
- Privacy Policy URL: `https://aldoleka.com/night-show/privacy`

These URLs are public after this website deployment. Publishing the website doesn't update App Store Connect.
