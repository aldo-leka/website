import { pageMetadata } from "@/lib/site-pages";
import Image from "next/image";
import Link from "next/link";
import { Arrow, FeatureIcon, Asterisk } from "@/components/Marks";
import { Phone } from "@/components/Phone";
import { StoreLink } from "@/components/StoreLink";
import { apps } from "@/lib/apps";

export const metadata = pageMetadata("steady-rounds");

export default function RoundsPage() {
  return (
    <div className="wrap product-page">
      <section className="product-hero">
        <div>
          <p className="eyebrow">
            For iPhone{!apps.steadyRounds.storeUrl && " · In beta"}
          </p>
          <h1>
            Every round.
            <br />
            <span className="underlined">In your corner.</span>
          </h1>
          <p className="hero-description">
            Set your rounds, hear the bell and keep your focus with Steady
            Rounds.
          </p>
          <div className="product-name">
            <Image
              src="/apps/steady-rounds/icon.png"
              alt="Steady Rounds icon"
              width={66}
              height={66}
            />
            <p>
              <strong>Steady Rounds:</strong> Boxing Timer
            </p>
          </div>
          <StoreLink url={apps.steadyRounds.storeUrl} />
          <a className="text-link" href="#features">
            See how it works <span aria-hidden="true">↓</span>
          </a>
          <p className="byline">Built by Aldo Leka</p>
        </div>
        <div className="product-visual rounds-product-visual butter">
          <Phone app="steadyRounds" />
          <span className="handwritten product-note" aria-hidden="true">
            Find your rhythm.
            <br />
            Make it count.
          </span>
        </div>
      </section>
      <section className="feature-section" id="features">
        <h2>A timer that trains with you.</h2>
        <div className="feature-grid">
          <div>
            <FeatureIcon type="timer" />
            <div>
              <h3>Your rounds, your pace</h3>
              <p>
                Adjust work, rest, preparation and round count. Pause, resume or
                skip a rest.
              </p>
            </div>
          </div>
          <div>
            <FeatureIcon type="bell" />
            <div>
              <h3>Clear at a glance</h3>
              <p>
                Big countdowns, distinct work and rest screens, a round bell and
                optional warnings.
              </p>
            </div>
          </div>
          <div>
            <FeatureIcon type="routines" />
            <div>
              <h3>Ready for next time</h3>
              <p>
                Save a favorite routine and start again. Unlimited timer
                sessions come free.
              </p>
            </div>
          </div>
        </div>
        <p className="fine-print">
          No account. No ads. Your timer and bundled sounds work offline.
        </p>
      </section>
      <section className="plus-section sage">
        <div>
          <p className="eyebrow">Steady Rounds Pro</p>
          <h2>More ways to make it yours.</h2>
          <p>
            Unlimited saved routines, sound settings for each routine, extra
            bells and accent colors.
            <br />
            One purchase. No subscription.
          </p>
          <p className="fine-print">
            The full timer, standard sounds and one saved routine stay free.
          </p>
        </div>
        <div className="plus-doodle" aria-hidden="true">
          <Asterisk />
          <span className="handwritten">
            Your training.
            <br />
            Your rhythm.
          </span>
          <Image
            src="/apps/steady-rounds/icon.png"
            alt=""
            width={110}
            height={110}
          />
        </div>
      </section>
      <section className="support-strip">
        <h2>Here when you need a hand.</h2>
        <div className="link-row">
          <Link className="text-link" href="/steady-rounds/support">
            Get support <Arrow diagonal />
          </Link>
          <Link className="text-link" href="/steady-rounds/privacy">
            Read the privacy policy <Arrow diagonal />
          </Link>
        </div>
      </section>
    </div>
  );
}
