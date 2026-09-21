import { pageMetadata } from "@/lib/site-pages";
import Image from "next/image";
import Link from "next/link";
import { StoreLink } from "@/components/StoreLink";
import { apps } from "@/lib/apps";
export const metadata = pageMetadata("steady-rounds");
export default function RoundsPage() {
  return (
    <div className="wrap rounds-page">
      <Link href="/#apps" className="back-link">
        ← All apps
      </Link>
      <section className="product-hero">
        <div>
          <p className="eyebrow">Boxing Timer</p>
          <h1>
            Steady
            <br />
            <span className="underlined">Rounds.</span>
          </h1>
          <p className="hero-description">A timer for your boxing rounds.</p>
          <p className="rounds-description">
            I’m putting together a proper introduction to Steady Rounds. More
            details will be shared here as the project develops.
          </p>
          <StoreLink url={apps.steadyRounds.storeUrl} />
          <Link className="text-link" href="/contact">
            Get in touch ↗
          </Link>
          <p className="byline">Built by Aldo Leka</p>
        </div>
        <div className="rounds-visual butter">
          <Image
            src="/art/rounds.webp"
            alt="Illustrated stopwatch with a play symbol"
            width={650}
            height={650}
            priority
            sizes="(max-width: 760px) 90vw, 45vw"
          />
        </div>
      </section>
    </div>
  );
}
