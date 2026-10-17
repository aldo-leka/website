import { supportEmail } from "@/lib/apps";
import { pageMetadata } from "@/lib/site-pages";

export const metadata = pageMetadata("night-show-privacy");

export default function PrivacyPage() {
  return (
    <div className="reading-page wrap">
      <p className="eyebrow">Night Show · Privacy policy</p>
      <h1>
        Play together.
        <br />
        <span className="underlined">Keep it simple.</span>
      </h1>
      <p className="effective-date">Effective 17 October 2026</p>
      <div className="policy-intro prose">
        <p>
          Night Show needs no account and shows no ads. The app contains no
          third-party analytics or advertising software. Our game server keeps
          a random player ID, your game balance and simple game statistics.
          Player names are never sent to the AI.
        </p>
      </div>
      <nav className="policy-toc" aria-label="Privacy policy sections">
        <a href="#server">The game server</a>
        <a href="#player-id">Player ID</a>
        <a href="#games">During a game</a>
        <a href="#ai">AI</a>
        <a href="#statistics">Statistics</a>
        <a href="#purchases">Purchases</a>
        <a href="#retention">Retention</a>
        <a href="#choices">Your choices</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="prose">
        <p>
          This policy applies to the Night Show: Party Games app and its game
          pages at show.aldo.al, provided by Aldo Leka, based in the
          Netherlands. Aldo is responsible for the information described here.
          Contact: <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
        </p>
        <h2 id="server">How the game server works</h2>
        <p>
          A Night Show game runs on our server. The TV opens a game screen in
          its browser, and phones join that room with its code, either in the
          app or in a phone browser. The server keeps the room in memory, sends
          each screen what it needs to show and stores the records described
          below in its own database.
        </p>
        <p>
          Your device’s IP address is used to connect it to the server. Night
          Show’s server doesn’t store IP addresses in its database or game
          records. Our hosting and network providers process connection data,
          including IP addresses, to deliver and protect the service.
        </p>
        <h2 id="player-id">Your player ID</h2>
        <p>
          The first time you open the app, it creates a random player ID and
          keeps it in your device’s secure storage (the iOS Keychain), so it
          can survive reinstalling the app. The ID isn’t your name, email,
          phone number or an advertising identifier. You can see it in the
          app’s settings.
        </p>
        <p>
          With the ID, the app sends its platform, app version and your
          device’s language setting. The server records when the ID was first
          and last seen, and a ledger of free, used and returned games. That
          ledger is how your game balance is counted.
        </p>
        <p>
          Players who join from a browser don’t get a player ID. The join page
          saves your name, the room code, your place in the room and your
          language in that browser’s local storage, so a reload or a locked
          screen brings you straight back in.
        </p>
        <h2 id="games">What you type during a game</h2>
        <p>
          Player names, avatars, teams and answers appear on the shared TV
          screen and on the other players’ phones. The server keeps them in
          memory only while the room is open; a room closes after 30 minutes
          without activity. Names, typed answers and custom team names are not
          stored in the database.
        </p>
        <p>
          A custom quiz topic typed by the host is stored with the game and
          with the questions written for it. Those questions can be shown again
          in any room that picks the same topic. Please don’t type personal
          details into a topic.
        </p>
        <h2 id="ai">AI judging and questions</h2>
        <p>
          Night Show uses Anthropic’s Claude through Anthropic’s API. For
          Country City, the server sends the round’s letter, the categories and
          the answers, each with a number. Player names and IDs aren’t sent.
          For The Buzzer, Claude writes quiz questions for a category or a
          custom topic; answers in The Buzzer are matched on our server and
          aren’t sent to Claude.
        </p>
        <p>
          To save cost, the server remembers Claude’s verdict on each answer
          (for example letter B, category City, answer Berat, valid) and the
          questions it writes. These don’t identify who typed or played them.
          Anthropic processes this content under its{" "}
          <a href="https://www.anthropic.com/legal/commercial-terms">
            commercial terms
          </a>{" "}
          and{" "}
          <a href="https://www.anthropic.com/legal/privacy">privacy policy</a>.
        </p>
        <h2 id="statistics">Game statistics</h2>
        <p>
          The server logs simple events to understand what people play and what
          breaks: a new player ID, games given or used, a game started (which
          game, free or paid, number of players and their platforms, settings
          such as rounds, category or topic), a game finished or abandoned and
          how many rounds were played, a host accepting or rejecting an answer,
          and the AI falling back to a simpler check. Each event is linked to
          the host’s player ID or to the game.
        </p>
        <p>
          For each AI request the server logs the model, the number of tokens,
          the cost, how long it took and whether it worked, linked to the game
          it served. We don’t use advertising identifiers, cross-app tracking,
          session recordings or third-party analytics, and we don’t sell this
          information.
        </p>
        <h2 id="purchases">Purchases</h2>
        <p>
          If Night Show offers games to buy, Apple handles the purchase and
          your payment details. Our server receives the purchase confirmation
          from Apple to add the games to your player ID. We never receive card
          or bank details.
        </p>
        <h2 id="retention">How long we keep it</h2>
        <ul>
          <li>
            Room data, names and answers: in memory while the room is open.
          </li>
          <li>
            Game statistics, game records and AI request logs: deleted after
            13 months.
          </li>
          <li>
            Your player ID and game ledger: kept so your games don’t expire,
            until you ask us to delete them.
          </li>
          <li>
            AI verdicts and quiz questions: kept, because they aren’t linked to
            anyone.
          </li>
        </ul>
        <h2 id="choices">Your choices and privacy rights</h2>
        <ul>
          <li>
            Join from a browser instead of the app if you don’t want a player
            ID; only the host needs the app.
          </li>
          <li>
            Clear the join page’s saved details by clearing that site’s data in
            your browser.
          </li>
          <li>
            Ask us to access or delete the data linked to your player ID. Send
            the ID shown in the app’s settings so we can find it. Deleting it
            also removes any games left on it.
          </li>
        </ul>
        <p>
          Night Show is a party game for everyone, but the app is meant for an
          adult host and isn’t aimed at children under 13.
        </p>
        <p>
          If you contact support, we receive your email address and what you
          choose to send. We use it to answer your request and keep the
          correspondence only as long as needed for that and for legal
          obligations.
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
          <a href={`mailto:${supportEmail}?subject=Night%20Show%20privacy`}>
            {supportEmail}
          </a>{" "}
          with “Night Show privacy” in the subject. We update this page when
          practices change and show the effective date above.
        </p>
      </div>
    </div>
  );
}
