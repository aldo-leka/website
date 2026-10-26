import { supportEmail } from "@/lib/apps";
import { pageMetadata } from "@/lib/site-pages";

export const metadata = pageMetadata("armrest-privacy");

export default function PrivacyPage() {
  return (
    <div className="reading-page wrap">
      <p className="eyebrow">Armrest · Privacy policy</p>
      <h1>
        Between you
        <br />
        <span className="underlined">and your TV.</span>
      </h1>
      <p className="effective-date">Effective 26 October 2026</p>
      <div className="policy-intro prose">
        <p>
          Armrest is a free TV remote with no account, no ads, no analytics and
          no tracking. It talks directly to the TVs on your Wi-Fi network and
          has no server of its own, so what you press, type and pair stays
          between your iPhone or iPad and your TV.
        </p>
      </div>
      <nav className="policy-toc" aria-label="Privacy policy sections">
        <a href="#network">Your Wi-Fi network</a>
        <a href="#device">On your device</a>
        <a href="#typing">Typing and apps</a>
        <a href="#apple">Siri, Control Center and the App Store</a>
        <a href="#feedback">Feedback</a>
        <a href="#choices">Your choices</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="prose">
        <p>
          This policy applies to the Armrest: TV Remote app for iPhone and iPad,
          provided by Aldo Leka, based in the Netherlands. Aldo is responsible
          for the information described here. Contact:{" "}
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
        </p>
        <h2 id="network">How Armrest uses your Wi-Fi network</h2>
        <p>
          iOS asks your permission before Armrest can use the local network.
          With it, Armrest finds TVs by listening for the services TVs announce
          and by checking which devices on your network answer on the ports
          TVs use for remote control. It then connects straight to the TV you
          choose.
        </p>
        <p>
          Armrest sends your TV the buttons you press, the text you type in its
          keyboard and the apps or inputs you open. It reads back what the TV
          offers: its name and model, its network hardware address (used to
          wake it), its list of apps and inputs, and its volume. Some TVs send
          app icons, which Armrest loads from the TV itself.
        </p>
        <p>
          None of this goes over the internet or to us. Your TV’s maker
          handles what the TV itself does with remote commands under its own
          privacy terms.
        </p>
        <h2 id="device">What stays on your device</h2>
        <p>
          Armrest remembers the TVs you’ve paired: their name, brand, model,
          network address and hardware address, and the key or token each TV
          issued when you paired. For Android TV and Google TV, Armrest creates
          its own certificate, kept in your device’s keychain, so the TV
          recognizes it. Armrest also keeps your settings, such as haptics, and
          the days it last connected, which decide when it asks for an App
          Store rating.
        </p>
        <p>
          This information is kept in Armrest’s storage on your device, which
          its Control Center controls share. It isn’t sent to us. Deleting
          Armrest deletes it; “Forget this TV” removes a single TV.
        </p>
        <h2 id="typing">Typing and apps</h2>
        <p>
          Text you type on the Keyboard tab goes only to your TV, as you type
          or when you tap Send. Armrest doesn’t keep it. Opening an app sends the
          TV that app’s name or address; some TVs then open their app store if
          the app isn’t installed.
        </p>
        <h2 id="apple">Siri, Control Center and the App Store</h2>
        <p>
          The TV controls you add to Control Center or the Lock Screen, and
          the Siri shortcuts, run on your device and send the same commands to
          your TV. Apple handles Siri requests, App Store ratings and the crash
          and usage statistics you choose to share with app developers, under
          Apple’s privacy policy. If you’ve agreed to share them, Apple gives
          us crash reports and anonymous, aggregated statistics. They don’t
          identify you.
        </p>
        <h2 id="feedback">Feedback</h2>
        <p>
          Settings › Send feedback opens an email draft in your mail app. It
          includes Armrest’s version, your iOS version, your device model and the
          brand and model of the TV you’re using, so we can help. You see all
          of it before sending and can remove anything. When you send it, we
          receive your email address and what you wrote, use them to answer and
          keep the correspondence only as long as needed for that and for legal
          obligations.
        </p>
        <h2 id="choices">Your choices</h2>
        <ul>
          <li>
            Turn off Armrest’s local network access in iOS Settings › Privacy &
            Security › Local Network. Armrest then can’t find or control TVs.
          </li>
          <li>
            Remove a TV with “Forget this TV”, or delete the app to remove
            everything Armrest stored.
          </li>
          <li>
            Stop sharing crash and usage statistics in iOS Settings › Privacy &
            Security › Analytics & Improvements.
          </li>
        </ul>
        <p>
          Armrest is suitable for everyone and doesn’t collect personal
          information from anyone, including children.
        </p>
        <p>
          Depending on where you live, you may have rights to access,
          correction, erasure, portability, restriction of or objection to
          processing, and to complain to your local data-protection authority.
          In the Netherlands that is the Autoriteit Persoonsgegevens. Contact us
          to exercise these rights or ask how they apply.
        </p>
        <h2 id="contact">Contact and policy updates</h2>
        <p>
          For privacy questions, email{" "}
          <a href={`mailto:${supportEmail}?subject=Armrest%20privacy`}>
            {supportEmail}
          </a>{" "}
          with “Armrest privacy” in the subject. We update this page when
          practices change and show the effective date above.
        </p>
      </div>
    </div>
  );
}
