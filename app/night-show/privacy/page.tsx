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
      <p className="effective-date">Effective 19 October 2026</p>
      <div className="policy-intro prose">
        <p>
          Night Show is free to play, needs no account and shows no ads. An
          optional subscription, Night Show Plus, adds custom topics. Our game
          server keeps a random player ID and simple game statistics, which it
          also sends to our analytics provider. The app reports crashes to our
          error-reporting provider. There is no advertising software, and player
          names are never sent to the AI or to these providers.
        </p>
      </div>
      <nav className="policy-toc" aria-label="Privacy policy sections">
        <a href="#server">The game server</a>
        <a href="#player-id">Player ID</a>
        <a href="#games">During a game</a>
        <a href="#ai">AI</a>
        <a href="#played">What you’ve played</a>
        <a href="#statistics">Statistics</a>
        <a href="#crashes">Crash reports</a>
        <a href="#feedback">Feedback and requests</a>
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
          and last seen. The ID is what lets a phone host games.
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
          A custom topic typed by the host (for The Buzzer, The Big Board or
          Draw &amp; Guess) is stored with the game and with the questions,
          category or words written for it. Those can be shown again in any
          room that picks the same topic. Please don’t type personal details
          into a topic.
        </p>
        <h2 id="ai">AI judging and questions</h2>
        <p>
          Night Show uses Anthropic’s Claude through Anthropic’s API. For
          Country City, the server sends the round’s letter, the categories and
          the answers, each with a number. Player names and IDs aren’t sent.
          For The Buzzer, Claude writes quiz questions for a category or a
          custom topic. For The Big Board and Draw &amp; Guess, Claude writes a
          quiz category or words to draw on a custom topic. Answers and guesses
          in these games are matched on our server and aren’t sent to Claude.
          Drawings go from the artist’s phone to the screens in the room and
          are only kept in memory while the room is open.
        </p>
        <p>
          When you ask for a game in the app’s settings, Claude reads what you
          typed together with the names of the games asked for so far, and
          decides which game it is. Your player ID isn’t sent.
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
        <h2 id="played">What your games have played</h2>
        <p>
          So the next game brings questions, categories and words you haven’t
          had yet, the server remembers which ones were played in games that
          a player ID took part in. This list is linked to the player ID only,
          not to names or answers.
        </p>
        <h2 id="statistics">Game statistics</h2>
        <p>
          The server logs simple events to understand what people play and what
          breaks: the app being opened (platform and app version), a new player
          ID, a TV opening a room, a player joining (app or browser), a game
          started (which game, number of players and their platforms, settings
          such as rounds, category or topic), a game finished or abandoned (how
          many rounds were played and how long it took), a host accepting or
          rejecting an answer, a game starting to repeat content the host has
          played before, the Night Show Plus screen being opened, a purchase or
          restore being started or failing, a subscription being confirmed,
          feedback being sent, a game being requested or voted for, content
          being reported, and the AI falling back
          to a simpler check. Each event is linked to a player ID or to the
          game; events from browsers and TVs have no player ID.
        </p>
        <p>
          The server also sends these events to Mixpanel, our analytics
          provider, which stores them in the European Union. Mixpanel receives
          the event, its time, the player ID and the details listed above. It
          doesn’t receive names, answers, drawings or IP addresses (the server
          sends the events itself and turns off Mixpanel’s location lookup).
          Mixpanel processes them for us under its{" "}
          <a href="https://mixpanel.com/legal/privacy-policy/">privacy policy</a>.
        </p>
        <p>
          For each AI request the server logs the model, the number of tokens,
          the cost, how long it took and whether it worked, linked to the game
          it served. We don’t use advertising identifiers, cross-app tracking or
          session recordings, and we don’t sell this information.
        </p>
        <h2 id="crashes">Crash reports</h2>
        <p>
          When the app crashes or runs into an error, it sends a report to
          Sentry, our error-reporting provider, which stores it in the European
          Union. A report contains what went wrong and where in the app’s code,
          the app version, your device model, operating system version and
          language, and the app’s own technical steps just before the error
          (such as which screen was open). It doesn’t contain your player ID,
          your name, what you typed or your IP address. Our game server reports
          its own errors to Sentry in the same way. Sentry processes them for us
          under its{" "}
          <a href="https://sentry.io/privacy/">privacy policy</a>.
        </p>
        <h2 id="feedback">Feedback, game requests and reports</h2>
        <p>
          If you send feedback from the app’s settings, the server stores your
          message, the email address you add (it’s optional), the app version,
          platform and language and your player ID, and emails the message to
          us. Our email is hosted by Zoho in the European Union. We use it to
          read your feedback and, if you left an address, to answer you.
        </p>
        <p>
          In the app’s settings you can also ask for a game we don’t have yet,
          or vote for one that other players asked for. The server stores what
          you typed, the app’s language, your player ID and your votes. Claude
          puts requests for the same game under one name (see AI above). Other
          players see only the names of the games and how many votes each has,
          never what anyone typed or who voted. Please don’t type personal
          details into a request.
        </p>
        <p>
          Any player can report a question, category or word that Claude wrote.
          The server then stores what was on screen, the game, the language and
          the reporter’s player ID (when they play in the app), and takes the
          item out of the games.
        </p>
        <h2 id="purchases">Purchases</h2>
        <p>
          Night Show Plus is an auto-renewable subscription sold by Apple
          through the App Store. Apple handles the payment; we never receive
          your payment details or your Apple Account.
        </p>
        <p>
          After a purchase or a restore, the app sends our server the
          transaction Apple signed for it. The server checks Apple’s signature
          and stores the product, Apple’s transaction ID, the expiry date and
          whether it’s a test purchase, linked to your player ID. We use this
          only to know which phones have Plus and to count the custom topics
          used each month (fair use). The purchase is also tagged with your
          player ID in Apple’s records, so it belongs to this app. You manage
          or cancel the subscription in your Apple Account settings.
        </p>
        <h2 id="retention">How long we keep it</h2>
        <ul>
          <li>
            Room data, names and answers: in memory while the room is open.
          </li>
          <li>
            Game statistics, game records, AI request logs and the list of what
            your games have played: deleted after 13 months.
          </li>
          <li>
            Night Show Plus records: deleted 13 months after the subscription
            ends.
          </li>
          <li>
            Feedback, game requests, votes and content reports on our server:
            deleted after 13 months. Feedback emails: kept as long as needed to
            answer them.
          </li>
          <li>
            Events in Mixpanel and crash reports in Sentry: kept under those
            services’ retention settings. When you ask us to delete the data
            linked to your player ID, we also delete it from Mixpanel.
          </li>
          <li>
            Your player ID and when it was first and last seen: kept until you
            ask us to delete them.
          </li>
          <li>
            AI verdicts, quiz questions, categories and drawing words: kept,
            because they aren’t linked to anyone.
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
            the ID shown in the app’s settings so we can find it.
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
