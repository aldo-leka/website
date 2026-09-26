import { pageMetadata } from "@/lib/site-pages";
import Link from "next/link";
import { Arrow } from "@/components/Marks";
import { supportEmail } from "@/lib/apps";

export const metadata = pageMetadata("steady-rounds-support");

const questions = [
  {
    title: "How do I start a workout?",
    body: "Set your number of rounds, work time, rest and preparation, then start the timer. Set rest or preparation to zero to skip that phase. There is no rest after the final round. You can pause and resume, skip a rest to begin the next round, or end the session with confirmation.",
  },
  {
    title: "How do I change or check the sounds?",
    body: "Open Settings → Sounds & warnings. Turn on Workout sounds, choose your Round bell and use Preview round bell to check it. Under Before round ends, choose a warning or turn it off. Preview warning lets you hear it first. A warning only plays when the round is longer than the warning interval. Check your iPhone’s volume and connected audio output too.",
  },
  {
    title: "Will I hear cues when my iPhone is locked?",
    body: "Settings → Lock-screen cues enables optional local notifications and asks for notification permission. iPhone notification settings, Focus, Silent mode and audio routing can affect whether you hear them. Keep screen awake helps keep the timer visible while the app is open. Test a short session with your usual music, headphones and phone settings before training.",
  },
  {
    title: "What happens if a call interrupts my session?",
    body: "When the app detects a call, an audio interruption or disconnected headphones, it pauses the workout so you can choose when to continue. If the app closes with an unfinished session, reopening it restores the last saved point in a paused state. Check the round and remaining time before resuming.",
  },
  {
    title: "What is free, and what does Pro include?",
    body: "The free app includes unlimited timer sessions, adjustable work/rest/preparation/rounds, standard sounds, warnings and one saved routine. Pro adds unlimited saved routines, sound and warning preferences for each routine, Bright chime and Low gong bells, and Amber and Ice blue accents. Pro is a one-time purchase, not a subscription. Apple shows your local price before you confirm.",
  },
  {
    title: "How do I restore Pro?",
    body: "Open Settings → Unlock Steady Rounds Pro, then choose Restore purchases. If Pro is already unlocked, open its entry in Settings to see the same purchase screen. Use the Apple Account that originally purchased Pro and an internet connection. Restoring Pro restores the upgrade; it does not transfer routines from another iPhone.",
  },
  {
    title: "Do my routines sync between devices?",
    body: "Routines, settings and unfinished sessions are saved locally on your iPhone. Steady Rounds does not currently sync them between devices. Your device backup may include app data, depending on your Apple backup settings. Deleting the app removes its local data, so do not delete it as a troubleshooting step if you want to keep your routines.",
  },
  {
    title: "Can I use the app offline?",
    body: "Yes. The timer, saved routines and bundled sounds work offline. An internet connection is needed to load, buy or restore the Pro purchase. You do not need a Steady Rounds account.",
  },
  {
    title: "How do I change analytics or delete a routine?",
    body: "Optional analytics is off by default. Change your choice in Settings → Share usage analytics; using the app and Pro never depends on opting in. To remove a saved routine, open its options menu and choose Delete routine. Previously sent analytics is separate from your local routines; the privacy policy explains retention and deletion requests.",
  },
  {
    title: "What should I know about TestFlight?",
    body: "The beta may change before launch. Purchases made in TestFlight use Apple’s sandbox and do not charge you. If you have already accepted an invitation, open Steady Rounds from TestFlight’s app list. For installation or purchase problems, contact support with the message shown, your app version and iOS version.",
  },
];

export default function SupportPage() {
  return (
    <div className="reading-page wrap">
      <p className="eyebrow">Steady Rounds · Help & contact</p>
      <h1>
        Here to <span className="underlined">help.</span>
      </h1>
      <p className="lead">A little guidance to keep your training moving.</p>
      <div className="support-contact butter">
        <div>
          <h2>Can’t find what you need?</h2>
          <p>
            Tell me what happened, your app version and your iPhone’s iOS
            version.
          </p>
        </div>
        <a
          className="text-link"
          href={`mailto:${supportEmail}?subject=Steady%20Rounds%20support`}
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
        For information about local storage and optional analytics, read the{" "}
        <Link href="/steady-rounds/privacy">privacy policy</Link>.
      </p>
    </div>
  );
}
