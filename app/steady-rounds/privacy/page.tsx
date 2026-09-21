import { pageMetadata } from "@/lib/site-pages";
import { contactEmail } from "@/lib/apps";

export const metadata = pageMetadata("steady-rounds-privacy");

export default function PrivacyPage() {
  return (
    <div className="reading-page wrap">
      <p className="eyebrow">Steady Rounds · Privacy policy</p>
      <h1>
        Your training.
        <br />
        <span className="underlined">Your choices.</span>
      </h1>
      <p className="effective-date">Effective 21 September 2026</p>
      <div className="policy-intro prose">
        <p>
          Your routines live on your iPhone. Usage analytics is optional and
          starts only if you opt in. You can use the timer and Pro without it.
        </p>
      </div>
      <nav className="policy-toc" aria-label="Privacy policy sections">
        <a href="#routines">Local app data</a>
        <a href="#analytics">Optional analytics</a>
        <a href="#purchases">Purchases</a>
        <a href="#cues">Sounds & cues</a>
        <a href="#choices">Your choices</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="prose">
        <p>
          This policy applies to Steady Rounds: Boxing Timer, provided by Aldo
          Leka, based in the Netherlands. Aldo is responsible for the optional
          analytics and support information described here. Contact:{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
        <h2 id="routines">Local app data</h2>
        <p>
          The app saves routine names and timer configurations, sound and
          display preferences, and the state of an unfinished session on your
          iPhone. This lets you reuse routines and resume an interrupted
          workout. You do not create a separate Steady Rounds account. Routine
          names and exact timer settings are not uploaded to Aldo or Mixpanel.
        </p>
        <p>
          Steady Rounds does not currently provide iCloud or other cross-device
          routine sync. Apple device backups may include app data, depending on
          your backup settings. Apple processes backup information under its own{" "}
          <a href="https://www.apple.com/legal/privacy/">privacy policy</a>.
        </p>
        <p>
          Local data remains until you change or delete it. You can delete a
          routine from its options menu. Deleting the app removes its local
          data; offloading an app can keep its documents and data. Copies in
          device backups are managed separately through Apple’s backup settings.
        </p>
        <h2 id="analytics">Optional usage analytics</h2>
        <p>
          With your consent, the app sends limited usage events to{" "}
          <a href="https://mixpanel.com/legal/privacy-policy/">Mixpanel</a> to
          understand feature use and identify problems. Analytics is off by
          default, and the analytics service is not initialized until you opt
          in. Change your choice in Settings → Share usage analytics.
        </p>
        <p>
          Events can describe app and screen opens, timer or sound-setting
          changes, sound previews, notification-permission outcomes, workout
          starts and completions, pauses, interruptions, recoveries, skipped
          rests and early endings. They can also describe routine creation,
          edits or deletion, upgrade screens, purchase and restoration outcomes,
          Pro status, and predefined reliability error categories.
        </p>
        <p>
          Workout duration and routine counts use broad ranges rather than exact
          values. Events include timestamps, a randomly generated identifier for
          this app, app version and build, and analytics software information.
          These events let us understand usage over time for a consenting
          installation.
        </p>
        <p>
          Analytics does not include routine names or IDs, exact workout
          timings, free-form notes or error messages, email addresses, Apple
          Account details or payment credentials. Our integration excludes
          device-model, screen, carrier and operating-system-version properties
          and disables IP-based location enrichment. We do not use advertising
          identifiers, cross-app identity, person profiles, automatic event
          capture, session replay, targeted advertising or data brokers.
        </p>
        <p>
          Our Mixpanel projects use its EU data region. Network requests
          necessarily reach the service with an IP address and normal request
          metadata, but we do not use that information to build location
          reports. Mixpanel processes analytics on our behalf to improve the
          app, not to advertise to you or sell your data.
        </p>
        <h3>Retention and withdrawing consent</h3>
        <p>
          Mixpanel’s standard retention for these projects is two years from an
          event’s date, after which events are automatically deleted. Turning
          off analytics blocks future collection, clears queued local events and
          resets the local analytics identifier. Activity while analytics is off
          is not held for later upload. A request already sent cannot be
          recalled, and turning the switch off does not automatically erase
          previously delivered events.
        </p>
        <p>
          Analytics relies on your consent. You can withdraw it at any time
          without losing free or paid features. Withdrawal does not affect the
          lawfulness of processing that happened before it. Contact us about
          previously sent data as described below.
        </p>
        <h2 id="purchases">Pro purchases</h2>
        <p>
          Apple handles the optional one-time Pro purchase and payment details.
          The app receives transaction and entitlement information through
          StoreKit to unlock and restore Pro. We do not receive your card or
          bank details. If you opt into analytics, purchase or restoration
          outcomes and entitlement status may be included, but payment
          credentials are not.
        </p>
        <h2 id="cues">Sounds, lock-screen cues and interruptions</h2>
        <p>
          Workout sounds are bundled with the app and play locally. The app does
          not contact a sound-generation service during use. Optional
          lock-screen cues use notifications scheduled on your device.
          Notification permission is requested when you enable them, and you can
          change it in iPhone Settings.
        </p>
        <p>
          The app uses system call and audio-interruption signals to pause a
          workout when an interruption is detected. It does not record calls or
          their audio, or store who called you. If you opt into analytics, a
          general interruption or recovery event can be sent as described above.
        </p>
        <h2 id="choices">Your choices and requests</h2>
        <ul>
          <li>Edit or delete your saved routines in the app.</li>
          <li>
            Manage device backups and notification permission through Apple’s
            settings.
          </li>
          <li>
            Leave analytics off or withdraw consent in Settings → Share usage
            analytics.
          </li>
          <li>
            Contact us to request access, correction or deletion of information
            we hold, or ask about your privacy rights.
          </li>
        </ul>
        <p>
          Analytics is associated with a random app identifier rather than your
          name or email. We may need additional information to locate your
          events, and resetting the identifier can make older events difficult
          to identify. We will explain what we can locate and what is needed for
          your request.
        </p>
        <p>
          If you contact support, we use your email address and the information
          you send to respond and resolve your request. We process this
          correspondence for our legitimate interest in providing support, and
          retain it only as needed for that purpose and any applicable legal
          obligations.
        </p>
        <p>
          Depending on where you live, you may have rights to access, correct,
          erase, restrict or object to processing, portability, and to complain
          to your local data-protection authority. Contact us if you would like
          to exercise these rights.
        </p>
        <h2 id="contact">Contact and policy updates</h2>
        <p>
          For privacy questions, email{" "}
          <a href={`mailto:${contactEmail}?subject=Steady%20Rounds%20privacy`}>
            {contactEmail}
          </a>{" "}
          with “Steady Rounds privacy” in the subject. We update this page when
          our practices change and show the effective date above. Material
          changes to optional analytics will be reflected in the app’s
          explanation and consent flow as appropriate.
        </p>
      </div>
    </div>
  );
}
