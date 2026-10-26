import Image from "next/image";
import Link from "next/link";
import { Arrow, FeatureIcon, Asterisk } from "@/components/Marks";
import { StoreLink } from "@/components/StoreLink";
import { apps } from "@/lib/apps";
import { pageMetadata } from "@/lib/site-pages";

export const metadata = pageMetadata("couch");

export default function CouchPage() {
  return (
    <div className="wrap product-page">
      <section className="product-hero">
        <div>
          <p className="eyebrow">
            For iPhone and iPad{!apps.couch.storeUrl && " · Coming soon"}
          </p>
          <h1>
            Any TV.
            <br />
            <span className="underlined">Right from your couch.</span>
          </h1>
          <p className="hero-description">
            A friendly TV remote for iPhone and iPad. Couch finds the TV on
            your Wi-Fi and pairs in a tap, at home or in a holiday rental.
          </p>
          <div className="product-name">
            <Image
              src="/apps/couch/icon.png"
              alt="Couch icon"
              width={66}
              height={66}
            />
            <p>
              <strong>{apps.couch.name}:</strong> {apps.couch.subtitle}
            </p>
          </div>
          <StoreLink url={apps.couch.storeUrl} />
          <a className="text-link" href="#features">
            See what it does <span aria-hidden="true">↓</span>
          </a>
          <p className="byline">Built by Aldo Leka · In 51 languages</p>
        </div>
        <div className="product-visual couch-product-visual peach">
          <Image
            src="/apps/couch/icon.png"
            alt=""
            width={512}
            height={512}
            priority
          />
          <span className="handwritten" aria-hidden="true">
            Where did the
            <br />
            remote go?
          </span>
        </div>
      </section>
      <section className="feature-section" id="features">
        <h2>One remote for the TVs you meet.</h2>
        <div className="feature-grid">
          <div>
            <FeatureIcon type="wifi" />
            <div>
              <h3>Finds the TV for you</h3>
              <p>
                Couch looks for LG, Samsung, Sony, Philips, Roku, Fire TV,
                Android and Google TV, Vizio and Panasonic TVs on your Wi-Fi.
                Pair once: accept on the TV, or type the code it shows.
              </p>
            </div>
          </div>
          <div>
            <FeatureIcon type="remote" />
            <div>
              <h3>A remote that feels right</h3>
              <p>
                A big d-pad, volume and channel, play and pause, numbers and
                color buttons. Every press gives a soft tap, and arrows repeat
                while you hold them.
              </p>
            </div>
          </div>
          <div>
            <FeatureIcon type="keyboard" />
            <div>
              <h3>Touchpad and keyboard</h3>
              <p>
                Swipe to move and tap to select, or use a pointer on LG and
                Samsung. Type searches on your phone instead of hunting letters
                with the arrows.
              </p>
            </div>
          </div>
          <div>
            <FeatureIcon type="apps" />
            <div>
              <h3>Your TV’s apps and inputs</h3>
              <p>
                Open the TV’s apps and switch HDMI inputs in one tap, on TVs
                that let other apps do that.
              </p>
            </div>
          </div>
          <div>
            <FeatureIcon type="bell" />
            <div>
              <h3>Control Center and Siri</h3>
              <p>
                Add TV power, volume and mute to Control Center or the Lock
                Screen, or ask Siri to turn the TV off.
              </p>
            </div>
          </div>
        </div>
        <p className="fine-print">
          Your phone and the TV need to be on the same Wi-Fi. Apple TV and TVs
          without Wi-Fi aren’t supported.
        </p>
      </section>
      <section className="plus-section butter">
        <div>
          <p className="eyebrow">Free</p>
          <h2>No account. No ads. No tracking.</h2>
          <p>
            Couch talks only to the TVs on your Wi-Fi. Nothing you press or
            type goes to us or to anyone else.
          </p>
        </div>
        <div className="plus-doodle" aria-hidden="true">
          <Asterisk />
          <span className="handwritten">
            Found it!
            <br />
            It was the phone.
          </span>
          <Image src="/apps/couch/icon.png" alt="" width={110} height={110} />
        </div>
      </section>
      <section className="support-strip">
        <h2>Here when you need a hand.</h2>
        <div className="link-row">
          <Link className="text-link" href="/couch/support">
            Get support <Arrow diagonal />
          </Link>
          <Link className="text-link" href="/couch/privacy">
            Read the privacy policy <Arrow diagonal />
          </Link>
        </div>
      </section>
    </div>
  );
}
