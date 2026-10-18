import Link from "next/link";
import { Arrow } from "@/components/Marks";
import { supportEmail } from "@/lib/apps";
import { pageMetadata } from "@/lib/site-pages";

export const metadata = pageMetadata("night-show-support");

const questions = [
  {
    title: "How do I start a game night?",
    body: "On the TV, open show.aldo.al/tv in its web browser. A laptop or tablet connected to the TV works too. The screen shows a room code and a QR code. The host opens Night Show on their iPhone and enters the code; everyone else scans the QR code with their phone camera. The host then picks a game and starts it.",
  },
  {
    title: "Does everyone need the app?",
    body: "No. Only the host needs the app to start games. Guests join in their phone’s browser, with nothing to install. The first player who joins from the app becomes the host. A room holds up to 12 players.",
  },
  {
    title: "The TV screen goes dark or stops updating",
    body: "Some TVs dim or sleep when nobody touches the remote. When the game screen asks, press OK on the remote (or click) once so it stays awake. The game screen works in older smart-TV browsers, but if yours struggles, a laptop connected to the TV with HDMI is the easiest fix. The TV and every phone need an internet connection.",
  },
  {
    title: "How does Country City check the answers?",
    body: "When a player shouts STOP, everyone’s answers are checked for the letter and the category by Claude, Anthropic’s AI. The TV then goes through the answers one category at a time. If Claude gets one wrong, the host can accept or reject it from their phone.",
  },
  {
    title: "Did you really ask 100 people?",
    body: "No. The Buzzer’s answers and points are Claude’s estimate of what most people would say, not a real poll. If the board misses a fair answer, the host can accept it.",
  },
  {
    title: "Can we play on our own topic?",
    body: "Yes, with Night Show Plus. The host types a topic in the lobby, and Claude writes new Buzzer questions, a Big Board category or Draw & Guess words about it. That takes one to three minutes; until then the game plays its usual content. Topics and what was written for them can come up again for anyone who picks the same topic, so don’t type personal details.",
  },
  {
    title: "Does Night Show cost anything?",
    body: "No. Every game is free, with no ads and no account. Night Show Plus is an optional subscription for the host that adds custom topics, up to 30 a month. Only the host needs it; everyone in the room plays the new content.",
  },
  {
    title: "How do I cancel or restore Night Show Plus?",
    body: "Plus is billed by Apple. Cancel it any time in your iPhone’s Settings › your name › Subscriptions, at least 24 hours before it renews. On a new phone, open the app’s Settings › Night Show Plus and tap Restore purchase.",
  },
  {
    title: "Why do we sometimes get a question we’ve had before?",
    body: "Night Show remembers what your games have played and brings new questions, categories and words first. When you’ve played most of a game, some come back; the lobby then says so. With Plus you can type a topic for brand-new ones.",
  },
  {
    title: "How do I switch between English and Albanian?",
    body: "Use the English / Shqip switch at the top of the app’s home screen or on the join page. A room plays in its host’s language, and the host can switch it in the lobby before the game starts.",
  },
  {
    title: "Can I remove someone from the room?",
    body: "Yes. The host can tap a player in the lobby and remove them. Anyone can also leave the room from their own phone.",
  },
];

export default function SupportPage() {
  return (
    <div className="reading-page wrap">
      <p className="eyebrow">Night Show · Help & contact</p>
      <h1>
        Here to help <span className="underlined">the party along.</span>
      </h1>
      <p className="lead">
        A little guidance for the TV screen, the phones and the games.
      </p>
      <div className="support-contact peach">
        <div>
          <h2>Can’t find what you need?</h2>
          <p>
            Tell me what happened, your app version and, for questions about
            your games, the player ID. Both are in the app’s settings.
          </p>
        </div>
        <a
          className="text-link"
          href={`mailto:${supportEmail}?subject=Night%20Show%20support`}
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
        For what the app and the game server collect, read the{" "}
        <Link href="/night-show/privacy">privacy policy</Link>.
      </p>
    </div>
  );
}
