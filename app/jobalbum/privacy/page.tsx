import { supportEmail } from "@/lib/apps";
import { pageMetadata } from "@/lib/site-pages";

export const metadata = pageMetadata("jobalbum-privacy");

export default function PrivacyPage() {
  return (
    <div className="reading-page wrap">
      <p className="eyebrow">JobAlbum · Privacy policy</p>
      <h1>
        Your work.
        <br />
        <span className="underlined">Your choices.</span>
      </h1>
      <p className="effective-date">Effective 23 September 2026</p>
      <div className="policy-intro prose">
        <p>
          Your photos, job details, notes and optional GPS are stored on your
          iPhone. Usage analytics starts only if you agree. You can use the app
          and Pro with analytics off.
        </p>
      </div>
      <nav className="policy-toc" aria-label="Privacy policy sections">
        <a href="#library">Your library</a>
        <a href="#permissions">Permissions</a>
        <a href="#sharing">Sharing & backups</a>
        <a href="#analytics">Optional analytics</a>
        <a href="#purchases">Purchases</a>
        <a href="#choices">Your choices</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="prose">
        <p>
          This policy applies to JobAlbum: Timestamp Camera, provided by Aldo
          Leka, based in the Netherlands. Aldo is responsible for the optional
          analytics and support information described here. Contact:{" "}
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
        </p>
        <h2 id="library">Your photos and job library</h2>
        <p>
          JobAlbum stores original and stamped photos, job names and
          descriptions, typed address or place labels, photo notes, capture
          dates and time zones, optional recorded GPS coordinates and accuracy,
          and app preferences on your iPhone. These records let you organize
          work, add stamps and create exports. No JobAlbum account is required.
        </p>
        <p>
          We do not operate a photo server or receive your library through the
          app. Photos, notes, job names, addresses, GPS and other library
          content are not sent to Mixpanel. JobAlbum does not provide team
          sharing or cross-device album sync. Content you deliberately export or
          send to support is handled as described below.
        </p>
        <p>
          Your library remains until you change or delete it. Archiving a job
          retains its photos. Deleting a photo or job removes its content from
          the app after confirmation; there is no in-app trash or recovery
          feature. Deleting the app removes its local data, while offloading may
          keep documents and data. Backups and exported copies are managed
          separately.
        </p>
        <h2 id="permissions">Camera, location and Photos permissions</h2>
        <p>
          Camera access is used to take still photos. JobAlbum does not record
          audio or video. Location permission is requested when using the camera.
          If allowed, a recent, sufficiently accurate position is automatically
          saved with each photo. Location updates stop when the camera closes.
          There is no background location collection, and capture works when
          location is denied or unavailable.
        </p>
        <p>
          The Address or place field is a label you type. It is separate from
          sensor coordinates and automatically displayed nearby addresses.
          Date and time come from your device.
          Neither timestamps nor GPS are a guarantee of a photo’s authenticity
          or exact location.
        </p>
        <p>
          When you open a photo with recorded GPS, JobAlbum can send those
          coordinates to Apple’s mapping service to display a nearby address
          and map. The address is approximate and may refer to a neighboring
          property. Apple handles the request under its{" "}
          <a href="https://www.apple.com/legal/privacy/data/en/apple-maps/">
            Maps privacy policy
          </a>
          . We do not receive the lookup or send it to Mixpanel. Address results
          are held only temporarily in memory, cleared when the app leaves the
          foreground, and expire after five minutes. They are not written into
          photo metadata, stamped images or PDF reports. Recorded coordinates
          are retained locally when an address cannot be found or the device is
          offline; map detail may also be unavailable offline.
        </p>
        <p>
          Also save stamped photos to Photos is off by default. Enabling it
          requests add-only Photos permission to save an extra stamped copy
          after capture. JobAlbum does not need access to read your full Photos
          library. Manage camera, location and Photos permissions in iPhone
          Settings.
        </p>
        <h2 id="sharing">Exports, Photos copies and device backups</h2>
        <p>
          You choose when and where to share JPEGs and PDF reports through
          Apple’s share sheet. These files may include photos, job labels,
          notes and capture time. Include location starts off and remembers your
          choice. When enabled, PDFs include the saved job address and links to
          each recorded photo position in Apple Maps; JPEGs include recorded
          location metadata. When disabled, those fields, links and JPEG GPS
          metadata are omitted. Exported JPEGs retain capture time and image
          orientation but omit other source metadata. This does not remove an
          address visible in a photographed scene or typed into a job name or
          note. New stamped copies do not display coordinates. Review the
          preview and your location choice before sharing. Opening a map link
          sends its recorded coordinates to the mapping service.
        </p>
        <p>
          Receiving apps, storage providers and recipients control the copies
          you send them. Deleting content in JobAlbum does not delete those
          copies or extra copies in Apple Photos. Temporary export folders are
          kept locally for sharing and are eligible for cleanup after seven days
          when the app next runs that cleanup; they are not cloud uploads.
        </p>
        <p>
          Apple device backups may include app data. Extra copies saved to
          Photos may sync through iCloud Photos if you have enabled it. These
          are Apple services, separate from JobAlbum’s local library, and follow
          your Apple settings and{" "}
          <a href="https://www.apple.com/legal/privacy/">
            Apple’s privacy policy
          </a>
          .
        </p>
        <h2 id="analytics">Optional usage analytics</h2>
        <p>
          With your consent, JobAlbum sends limited usage events to{" "}
          <a href="https://mixpanel.com/legal/privacy-policy/">Mixpanel</a> to
          understand feature use, reliability and the Pro purchase flow.
          Analytics is off until you choose Share usage analytics. No analytics
          service starts and no events are queued before consent. Choose No
          thanks during onboarding or change Settings → Share usage analytics at
          any time.
        </p>
        <p>
          Events describe app opens, job creation, capture starts or failures,
          whether an original and stamp were saved, saving a note, moving a
          photo, archiving a job, preparing an export, viewing or closing a Pro
          offer, and purchase, restoration or product-loading outcomes. Export
          events use the format, a photo-count range, Free or Pro status and a
          fixed outcome such as succeeded or failed. A successful export event
          means a file was prepared locally, not that a recipient received it.
        </p>
        <p>
          Events also include event time, a random app-specific identifier, app
          and operating-system versions, analytics software information, an
          event deduplication identifier, and the beta, development or
          production environment. The random identifier allows events from a
          participating installation to be understood over time. This is
          pseudonymous usage data, not a promise of anonymity.
        </p>
        <p>
          Analytics does not include photos, note text, names, job or photo
          identifiers, addresses, GPS coordinates, search text, actual
          photo-capture timestamps, payment details, prices, transaction
          identifiers or purchase receipts. Device model, carrier, network-type
          and screen-size properties are excluded. We do not use advertising
          identifiers, cross-app identity, person profiles, automatic
          interaction capture, session replay or screen recordings. We do not
          sell this information or use it for targeted advertising.
        </p>
        <p>
          Our Mixpanel projects use its EU data region. IP-based location
          enrichment is disabled. Network requests still reach Mixpanel with an
          IP address and ordinary connection information; disabling location
          enrichment does not prevent that. Mixpanel processes analytics on our
          behalf under its{" "}
          <a href="https://mixpanel.com/legal/dpa/">data-processing terms</a>.
        </p>
        <h3>Retention and withdrawing consent</h3>
        <p>
          Analytics events follow Mixpanel’s standard two-year retention from
          the event date, after which they are automatically deleted. Turning
          analytics off stops future collection, discards queued events and
          resets the local analytics identifier. Activity while analytics is off
          is not saved for later analytics upload. A request already sent cannot
          be recalled, and turning the switch off does not automatically erase
          previously delivered events.
        </p>
        <p>
          Analytics relies on your consent. Withdrawing it does not affect free
          or paid features or the lawfulness of earlier processing. Contact us
          to ask about access or deletion of previously sent data. Because
          events use a random app identifier rather than your name or email, we
          may need additional information to find them. Resetting that
          identifier can make older events difficult to locate.
        </p>
        <h2 id="purchases">Pro purchases</h2>
        <p>
          Apple handles the optional one-time JobAlbum Pro purchase and your
          payment details. The app receives transaction and entitlement
          information through StoreKit to unlock or restore Pro. We do not
          receive card or bank details. If you consent to analytics, fixed
          purchase or restoration outcomes and Free or Pro status may be sent as
          described above; payment credentials and receipts are not sent to
          Mixpanel.
        </p>
        <h2 id="choices">Your choices and privacy rights</h2>
        <ul>
          <li>Edit or delete photos, notes and jobs in the app.</li>
          <li>
            Manage camera, location, Photos access and device backups in Apple’s
            settings.
          </li>
          <li>
            Review your export choices and manage shared copies at their
            destinations.
          </li>
          <li>
            Leave analytics off or withdraw consent in Settings → Share usage
            analytics.
          </li>
          <li>
            Contact us about information we hold and requests to access, correct
            or delete it.
          </li>
        </ul>
        <p>
          If you contact support, we receive your email address and the
          information or attachments you choose to send. We use them to answer
          your request, based on our legitimate interest in providing support,
          and retain correspondence only as needed for that purpose and
          applicable legal obligations. We cannot access or delete a library
          that exists only on your iPhone.
        </p>
        <p>
          Depending on where you live, you may have rights to access,
          correction, erasure, portability, restriction of or objection to
          processing, and to complain to your local data-protection authority.
          Contact us to exercise these rights or ask how they apply.
        </p>
        <h2 id="contact">Contact and policy updates</h2>
        <p>
          For privacy questions, email{" "}
          <a href={`mailto:${supportEmail}?subject=JobAlbum%20privacy`}>
            {supportEmail}
          </a>{" "}
          with “JobAlbum privacy” in the subject. We update this page when
          practices change and show the effective date above. Material changes
          to optional analytics will be reflected in the app’s explanation and
          consent flow as appropriate.
        </p>
      </div>
    </div>
  );
}
