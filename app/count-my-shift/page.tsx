import { pageMetadata } from "@/lib/site-pages";
import Image from "next/image";
import Link from "next/link";
import { Arrow, FeatureIcon, Asterisk } from "@/components/Marks";
import { Phone } from "@/components/Phone";
import { StoreLink } from "@/components/StoreLink";
import { apps } from "@/lib/apps";
export const metadata = pageMetadata("count-my-shift");
export default function ShiftPage() {
  return (
    <div className="wrap product-page">
      <section className="product-hero">
        <div>
          <p className="eyebrow">
            For iPhone &amp; iPad{!apps.countMyShift.storeUrl && " · In beta"}
          </p>
          <h1>
            A little clarity
            <br />
            <span className="underlined">after every shift.</span>
          </h1>
          <p className="hero-description">
            Keep track of your hours, tips and earnings across multiple
            currencies. See combined totals in the reporting currency you
            choose.
          </p>
          <div className="product-name">
            <Image
              src="/apps/count-my-shift/icon.png"
              alt="Count My Shift icon"
              width={66}
              height={66}
            />
            <p>
              <strong>Count My Shift:</strong> Tip Tracker
            </p>
          </div>
          <StoreLink url={apps.countMyShift.storeUrl} />
          <a className="text-link" href="#features">
            See how it works <span aria-hidden="true">↓</span>
          </a>
          <p className="byline">Built by Aldo Leka</p>
        </div>
        <div className="product-visual peach">
          <Phone />
          <span className="handwritten product-note" aria-hidden="true">
            Same shifts.
            <br />A clearer picture.
          </span>
        </div>
      </section>
      <section className="feature-section" id="features">
        <h2>Your shift, in perspective.</h2>
        <div className="feature-grid">
          <div>
            <FeatureIcon type="notebook" />
            <div>
              <h3>Log your shift</h3>
              <p>Hours, cash and card tips, wages and tip-out.</p>
            </div>
          </div>
          <div>
            <FeatureIcon type="chart" />
            <div>
              <h3>See the bigger picture</h3>
              <p>
                Combine earnings across currencies in weekly, monthly and yearly
                summaries.
              </p>
            </div>
          </div>
          <div>
            <FeatureIcon type="cloud" />
            <div>
              <h3>Keep your records close</h3>
              <p>Private iCloud sync, backups and CSV export.</p>
            </div>
          </div>
        </div>
        <p className="fine-print">
          Earnings shown before taxes and other deductions. Currency conversions
          use published historical rates and are estimates; original records
          stay unchanged.
        </p>
      </section>
      <section className="plus-section butter">
        <div>
          <p className="eyebrow">Count My Shift Plus</p>
          <h2>A little more with Plus.</h2>
          <p>
            Multiple active jobs and job comparisons.
            <br />
            One purchase. No subscription.
          </p>
          <p className="fine-print">
            Basic summaries, iCloud sync, backup and CSV export stay free.
          </p>
        </div>
        <div className="plus-doodle" aria-hidden="true">
          <Asterisk />
          <span className="handwritten">
            More insights
            <br />
            for your journey.
          </span>
          <Image
            src="/apps/count-my-shift/icon.png"
            alt=""
            width={110}
            height={110}
          />
        </div>
      </section>
      <section className="support-strip">
        <h2>Here when you need a hand.</h2>
        <div className="link-row">
          <Link className="text-link" href="/count-my-shift/support">
            Get support <Arrow diagonal />
          </Link>
          <Link className="text-link" href="/count-my-shift/privacy">
            Read the privacy policy <Arrow diagonal />
          </Link>
        </div>
      </section>
    </div>
  );
}
