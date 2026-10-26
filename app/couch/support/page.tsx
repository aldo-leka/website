import Link from "next/link";
import { Arrow } from "@/components/Marks";
import { supportEmail } from "@/lib/apps";
import { pageMetadata } from "@/lib/site-pages";

export const metadata = pageMetadata("couch-support");

const questions = [
  {
    title: "Which TVs does Couch work with?",
    body: "Smart TVs and streaming boxes that can be controlled over Wi-Fi: LG (webOS), Samsung (2016 and newer), Android TV and Google TV (including Sony, Philips, TCL, Hisense, Xiaomi, Sharp and Chromecast), Roku, Fire TV, Philips TVs without Android, Sony Bravia with IP control on, Vizio SmartCast and Panasonic Viera sets made before 2019. Apple TV, Hisense VIDAA and newer Panasonic sets don’t let other apps control them yet. TVs without Wi-Fi only listen to infrared, which iPhones don’t have.",
  },
  {
    title: "Couch doesn’t find my TV",
    body: "Turn the TV on and make sure your phone is on the same Wi-Fi as the TV, with any VPN off. Check that Couch may use the local network in iOS Settings › Privacy & Security › Local Network. Some hotel, guest and office networks keep devices from seeing each other; on those no phone app can reach the TV. You can also add the TV by its IP address, which the TV shows in its network settings.",
  },
  {
    title: "How do I pair?",
    body: "Tap Connect next to your TV. LG and Samsung TVs ask you to accept Couch on screen. Android TV and Google TV show a 6-character code; Fire TV, Philips, Sony and Vizio show a PIN. Type it in Couch. Roku and older Philips and Panasonic sets need no pairing. Couch remembers each TV, so you pair once.",
  },
  {
    title: "My Sony or Roku doesn’t respond",
    body: "Sony TVs without Google TV need Settings › Network › Remote device settings › Control remotely turned on. On a Roku, set Settings › System › Advanced system settings › Control by mobile apps to Enabled. Sony TVs with Google TV pair as a Google TV instead.",
  },
  {
    title: "Can Couch turn the TV on?",
    body: "Turning off always works while Couch is connected. Turning on depends on the TV: it has to keep its network on in standby. On LG, turn on Settings › General › Devices › External devices › TV On With Mobile; on Samsung, Settings › General › Network › Expert settings › Power On with Mobile. Because iOS limits how apps send the wake-up signal, it’s most reliable shortly after the TV was turned off.",
  },
  {
    title: "Typing doesn’t show up on the TV",
    body: "Open a search box on the TV first, then use Couch’s Keyboard tab. On LG, Android TV, Google TV and Roku the letters appear as you type; on other TVs, type and tap Send. A few TVs don’t accept typing from apps at all.",
  },
  {
    title: "Why does the Apps tab show only popular apps?",
    body: "Android TV, Google TV and Fire TV don’t tell other apps what’s installed, so Couch shows the popular ones. Opening one that isn’t installed takes the TV to its store page. LG, Samsung, Roku, Philips and Sony list their own apps.",
  },
  {
    title: "How do I use Control Center, the Lock Screen and Siri?",
    body: "Open Control Center, tap +, then Add a Control and search for Couch to add TV power, volume, mute or play/pause. The same controls fit the Lock Screen. Or ask Siri: “Turn off the TV with Couch”. They work with the TV you used last in Couch.",
  },
  {
    title: "Can I use Couch on a TV I don’t own, like in a rental?",
    body: "Yes, if your phone is on the same Wi-Fi as the TV. Pair it like your own TV. When you leave, swipe the TV in Couch’s TV list and choose Forget, and you can remove Couch from the TV’s own list of paired devices in its settings.",
  },
  {
    title: "Which language is Couch in?",
    body: "Couch follows your iPhone or iPad’s language. To choose another one just for Couch, go to iOS Settings › Apps › Couch › Language.",
  },
  {
    title: "How do I send an idea or report a problem?",
    body: "In Couch, open Settings and tap Send feedback. The email includes your app version, device and TV model, so we can help faster. You can also email us, below.",
  },
];

export default function SupportPage() {
  return (
    <div className="reading-page wrap">
      <p className="eyebrow">Couch · Help & contact</p>
      <h1>
        A hand with <span className="underlined">your remote.</span>
      </h1>
      <p className="lead">
        Finding and pairing TVs, turning them on, typing and the extras.
      </p>
      <div className="support-contact peach">
        <div>
          <h2>Can’t find what you need?</h2>
          <p>
            Tell me what happened, the brand and model of the TV and your app
            version. Settings › Send feedback in Couch fills those in for you.
          </p>
        </div>
        <a
          className="text-link"
          href={`mailto:${supportEmail}?subject=Couch%20support`}
        >
          Email Aldo <Arrow diagonal />
        </a>
        <p className="fine-print">{supportEmail}</p>
      </div>
      <div className="faq-list">
        {questions.map(({ title, body }) => (
          <details key={title}>
            <summary>
              {title}
              <span aria-hidden="true">+</span>
            </summary>
            <div className="faq-answer">
              <p>{body}</p>
            </div>
          </details>
        ))}
      </div>
      <p className="prose">
        For what Couch stores and sends, read the{" "}
        <Link href="/couch/privacy">privacy policy</Link>.
      </p>
    </div>
  );
}
