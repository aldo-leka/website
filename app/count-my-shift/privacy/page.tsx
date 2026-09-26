import { pageMetadata } from "@/lib/site-pages";
import { supportEmail } from "@/lib/apps";
export const metadata = pageMetadata("count-my-shift-privacy");
export default function PrivacyPage() {
  return (
    <div className="reading-page wrap">
      <p className="eyebrow">Count My Shift · Privacy policy</p>
      <h1>
        Your records.
        <br />
        <span className="underlined">Your business.</span>
      </h1>
      <p className="effective-date">Effective 26 September 2026</p>
      <div className="policy-intro prose">
        <p>
          Your notebook lives on your device and, when available, in your
          private iCloud storage. Usage analytics is optional and starts only if
          you opt in. You can use the app without it.
        </p>
      </div>
      <nav className="policy-toc" aria-label="Privacy policy sections">
        <a href="#notebook">Your notebook</a>
        <a href="#icloud">iCloud & exports</a>
        <a href="#exchange-rates">Exchange rates</a>
        <a href="#analytics">Optional analytics</a>
        <a href="#purchases">Purchases</a>
        <a href="#choices">Your choices</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="prose">
        <p>
          This policy applies to Count My Shift: Tip Tracker, provided by Aldo
          Leka, based in the Netherlands. Aldo is responsible for the optional
          analytics and support information described here. Contact:{" "}
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
        </p>
        <h2 id="notebook">Your notebook</h2>
        <p>
          The app stores the jobs, hours, wages, tips, tip-out, payments and
          notes you enter so it can show your records and calculate summaries.
          You do not create a separate Count My Shift account. Your notebook
          contents are not sent to Aldo’s servers or to Mixpanel.
        </p>
        <p>
          Records remain in your notebook until you change or delete them.
          Deleting a shift removes its stored content and can sync that deletion
          to your other devices; a technical deletion marker can remain to
          prevent old copies from returning. Archiving a job keeps its records
          and is not the same as deleting them.
        </p>
        <h2 id="icloud">Private iCloud, backups and exports</h2>
        <p>
          When iCloud is available and permitted on your device, the app uses
          Apple’s CloudKit service to sync records through your private iCloud
          account. Apple processes this data under its own{" "}
          <a href="https://www.apple.com/legal/privacy/">privacy policy</a>.
          Aldo does not receive access to your private notebook through the
          analytics integration.
        </p>
        <p>
          Backups and CSV exports are created when you request them. You choose
          where to save or share them. They contain notebook information, so
          keep them somewhere private. Deleting something in the app does not
          remove copies you previously exported or shared. Manage those copies
          separately.
        </p>
        <h2 id="exchange-rates">Currency conversion and public exchange rates</h2>
        <p>
          Summaries containing only one currency keep that currency. When a
          selection combines different currencies, the app converts the summary
          into your chosen reporting currency and downloads public
          exchange-rate tables from <a href="https://frankfurter.dev/">Frankfurter</a>.
          Requests contain currency codes and date ranges for the required monthly
          tables. Your amounts, hours, job names, notes, payment records and app
          analytics identifier are never sent to this service. Conversion happens
          on your device, and downloaded rates are cached there for offline use.
          Original records and CSV amounts keep their original currencies.
        </p>
        <p>
          The service receives the network request, including the IP address
          needed to deliver its response. Frankfurter states that its public API
          does not retain personal data, IP addresses or request URLs. Its current
          privacy information is available in the FAQ on its website. Exchange-rate
          requests are part of the conversion feature and are separate from
          optional Mixpanel analytics.
        </p>
        <h2 id="analytics">Optional usage analytics</h2>
        <p>
          With your consent, the app sends limited usage events to{" "}
          <a href="https://mixpanel.com/legal/privacy-policy/">Mixpanel</a> to
          understand which features are useful and identify problems. Events can
          describe screens visited, completed or abandoned actions, operation
          outcomes, and Plus purchase or restoration outcomes. They include
          event times, app and operating-system information, and a randomly
          generated app identifier.
        </p>
        <p>
          Analytics does not include your job names, notes, hours worked, tip or
          wage amounts, payment amounts, exported files, email address or Apple
          Account details. IP-based location enrichment and automatic event
          collection are disabled in our integration. We do not use session
          replay, advertising identifiers, targeted advertising or data brokers.
        </p>
        <p>
          Our Mixpanel projects use its EU data region. Network requests
          necessarily reach the service using an IP address, but we do not use
          it to build location reports. Mixpanel processes analytics on our
          behalf; it is not used to sell your data or advertise to you. We do not
          combine these events with data from other companies’ apps or websites
          for targeted advertising or advertising measurement. The random app
          identifier links events from that installation; it is pseudonymous,
          not a promise that analytics is anonymous.
        </p>
        <h3>Analytics retention</h3>
        <p>
          Mixpanel’s standard retention for these projects is two years from an
          event’s date, after which events are automatically deleted. Turning
          off analytics prevents future collection but does not automatically
          erase events already delivered. You can contact us about deletion as
          described below.
        </p>
        <p>
          Analytics is off until you opt in. On first use, a separate choice
          appears before job setup; Allow analytics and No thanks both let you
          continue. This choice concerns optional product analytics, not
          permission for advertising tracking. Your decision is remembered on
          that device and is not synced through iCloud. Change it in Settings →
          Usage analytics at any time. Opting out clears queued events and
          resets the local analytics identity; a request already sent cannot be
          recalled. Activity while analytics is off is not saved for later
          upload. Free and paid features do not depend on consent.
        </p>
        <h2 id="purchases">Purchases and reminders</h2>
        <p>
          Apple handles Plus purchases and payment details. The app receives
          transaction and entitlement information through StoreKit to unlock and
          restore Plus. We do not receive your card or bank details. If you opt
          into analytics, purchase outcomes and entitlement status can be
          included, but not payment credentials.
        </p>
        <p>
          Reminders are optional local notifications. The app requests
          notification permission when you enable them. Reminder text does not
          include your earnings. You can change your schedule in the app or
          notification permission in your iPhone or iPad settings.
        </p>
        <h2 id="choices">Your choices and requests</h2>
        <ul>
          <li>
            Review and edit your notebook, delete shifts, and export your
            records in the app.
          </li>
          <li>
            Manage iCloud access through your Apple Account and device settings.
          </li>
          <li>
            Leave optional analytics off or withdraw consent in Settings → Usage
            analytics.
          </li>
          <li>
            Contact us to request access, correction or deletion of information
            we hold, or to ask about your privacy rights.
          </li>
        </ul>
        <p>
          Analytics is associated with a random identifier rather than your name
          or email. We may need additional information to locate your events,
          and resetting the identifier can make older events difficult to
          identify. We will explain what we can locate and what we need to
          process your request. Do not send your notebook, password or payment
          credentials.
        </p>
        <p>
          Settings → Send feedback opens an email addressed to dev@aldoleka.com.
          You choose what to write and whether to send it; the app does not
          automatically attach your notebook, logs or analytics identifier.
          If you contact support or send feedback, we use your email address and the information
          you send to respond and resolve your request. We retain correspondence
          only as needed for that purpose and any applicable legal obligations.
          Depending on where you live, you may have rights to access, correct,
          erase, restrict or object to processing, portability, and to complain
          to your local data-protection authority. Withdrawing analytics consent
          does not affect processing that happened before withdrawal.
        </p>
        <h2 id="contact">Contact and policy updates</h2>
        <p>
          For privacy questions, email{" "}
          <a
            href={`mailto:${supportEmail}?subject=Count%20My%20Shift%20privacy`}
          >
            {supportEmail}
          </a>{" "}
          with “Count My Shift privacy” in the subject. We update this page when
          our practices change and show the effective date above. Material
          changes to optional analytics will be reflected in the app’s
          explanation and consent flow as appropriate.
        </p>
      </div>
    </div>
  );
}
