import Image from "next/image";
import Link from "next/link";
import { Arrow, FeatureIcon, Asterisk } from "@/components/Marks";
import { StoreLink } from "@/components/StoreLink";
import { apps } from "@/lib/apps";
import { pageMetadata } from "@/lib/site-pages";

export const metadata = pageMetadata("night-show");

export default function NightShowPage() {
  return (
    <div className="wrap product-page">
      <section className="product-hero">
        <div>
          <p className="eyebrow">
            For iPhone{!apps.nightShow.storeUrl && " · Coming soon"}
          </p>
          <h1>
            Game night.
            <br />
            <span className="underlined">On the big screen.</span>
          </h1>
          <p className="hero-description">
            Party games for friends and family. Open the game screen on your
            TV, scan the code and play from your phones. The TV shows the
            game; every phone is a controller.
          </p>
          <div className="product-name">
            <Image
              src="/apps/night-show/icon.png"
              alt="Night Show icon"
              width={66}
              height={66}
            />
            <p>
              <strong>Night Show:</strong> Party Games
            </p>
          </div>
          <StoreLink url={apps.nightShow.storeUrl} />
          <a className="text-link" href="#features">
            See how it works <span aria-hidden="true">↓</span>
          </a>
          <p className="byline">Built by Aldo Leka · In English and Albanian</p>
        </div>
        <div className="product-visual night-show-product-visual butter">
          <Image
            src="/apps/night-show/icon.png"
            alt=""
            width={512}
            height={512}
            priority
          />
          <span className="handwritten" aria-hidden="true">
            Grab a phone.
            <br />
            You’re on!
          </span>
        </div>
      </section>
      <section className="feature-section" id="features">
        <h2>One TV. Every phone. Two games to start.</h2>
        <div className="feature-grid">
          <div>
            <FeatureIcon type="tv" />
            <div>
              <h3>Everyone joins in seconds</h3>
              <p>
                Open show.aldo.al/tv in the TV’s browser and scan the code.
                Guests play from their phone’s browser with nothing to install.
                The host runs the night from the app.
              </p>
            </div>
          </div>
          <div>
            <FeatureIcon type="routines" />
            <div>
              <h3>Country City</h3>
              <p>
                The classic letter game: a country, a city, an animal, a name,
                a thing and a food. Shout STOP first. Claude checks every
                answer, and the host has the final word.
              </p>
            </div>
          </div>
          <div>
            <FeatureIcon type="bell" />
            <div>
              <h3>The Buzzer</h3>
              <p>
                The team survey quiz: “We asked 100 people…”. Hit the buzzer,
                find the answers on the board and steal the points. Pick a
                category or type your own topic.
              </p>
            </div>
          </div>
        </div>
        <p className="fine-print">
          No account. No ads. Up to 12 players in a room.
        </p>
      </section>
      <section className="plus-section butter">
        <div>
          <p className="eyebrow">Free games</p>
          <h2>The first games are on us.</h2>
          <p>
            A new player starts with free games. A game counts only when the
            host starts it, and going back to the lobby within the first minute
            gives it back.
          </p>
          <p className="fine-print">
            Survey answers in The Buzzer are Claude’s estimate of what most
            people would say, not a real poll.
          </p>
        </div>
        <div className="plus-doodle" aria-hidden="true">
          <Asterisk />
          <span className="handwritten">
            Ready, steady…
            <br />
            STOP!
          </span>
          <Image
            src="/apps/night-show/icon.png"
            alt=""
            width={110}
            height={110}
          />
        </div>
      </section>
      <section className="support-strip">
        <h2>Here when you need a hand.</h2>
        <div className="link-row">
          <Link className="text-link" href="/night-show/support">
            Get support <Arrow diagonal />
          </Link>
          <Link className="text-link" href="/night-show/privacy">
            Read the privacy policy <Arrow diagonal />
          </Link>
        </div>
        <p className="fine-print">
          The TV, the host’s app and every phone need an internet connection.
        </p>
      </section>
    </div>
  );
}
