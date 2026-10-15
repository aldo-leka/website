import { pageMetadata } from "@/lib/site-pages";
import Image from "next/image";
import Link from "next/link";
import { Arrow, Asterisk, LekasoftIcon, Squiggle } from "@/components/Marks";
import { Phone } from "@/components/Phone";
import { apps } from "@/lib/apps";
import { StructuredData } from "@/components/StructuredData";
import { websiteIdentity } from "@/lib/site-identity";

export const metadata = pageMetadata("home");

export default function HomePage() {
  return (
    <>
      <StructuredData data={websiteIdentity} />
      <section className="home-hero wrap" aria-labelledby="intro">
        <div className="hero-copy">
          <h1 id="intro">
            A few things
            <br />
            <span className="underlined">I’m building.</span>
          </h1>
          <p className="hero-description">
            Useful apps, thoughtful software,
            <br className="desktop-break" /> and a little curiosity.
          </p>
          <a className="button" href="#apps">
            Explore my apps <Arrow />
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <span className="handwritten hero-note">
            Small apps.
            <br />A brighter everyday.
          </span>
          <Image
            src="/art/amsterdam.webp"
            alt=""
            width={900}
            height={600}
            priority
            sizes="(max-width: 760px) 92vw, 48vw"
          />
        </div>
      </section>
      <section
        className="apps-section wrap"
        id="apps"
        aria-labelledby="apps-heading"
      >
        <div className="section-heading">
          <h2 id="apps-heading">Selected projects</h2>
        </div>
        <div className="app-grid">
          <article className="app-card lead-card sage">
            <a
              className="card-art"
              href={apps.dineMio.websiteUrl}
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image
                className="tile-illustration"
                src="/art/dining.webp"
                alt=""
                width={650}
                height={650}
                sizes="(max-width: 760px) 90vw, 36vw"
              />
            </a>
            <div className="card-copy">
              <h3>
                <a href={apps.dineMio.websiteUrl}>DineMio</a>
              </h3>
              <p className="app-subtitle">Restaurant reservations</p>
              <p className="app-description">
                Reservations and table management for restaurants.
              </p>
              <div className="card-bottom">
                <a className="text-link" href={apps.dineMio.websiteUrl}>
                  Visit DineMio <Arrow diagonal />
                </a>
              </div>
            </div>
          </article>
          <p className="handwritten shelf-hint" aria-hidden="true">
            Swipe for more <Arrow />
          </p>
          <div className="app-shelf">
            <article className="app-card butter">
              <a
                className="card-art icon-card-art"
                href={apps.rogersDeepValue.websiteUrl}
                tabIndex={-1}
                aria-hidden="true"
              >
                <Image
                  src="/apps/rogers-deep-value/avatar.webp"
                  alt=""
                  width={220}
                  height={220}
                  sizes="220px"
                />
              </a>
              <div className="card-copy">
                <h3>
                  <a href={apps.rogersDeepValue.websiteUrl}>
                    Rogers Deep Value
                  </a>
                </h3>
                <p className="app-subtitle">Multi-agent investor</p>
                <p className="app-description">
                  Researcher, verifier, re-evaluator, writer and trader agents
                  that work like a real investor. Started on OpenClaw in March
                  2026, now runs on Grok bots.
                </p>
                <div className="card-bottom">
                  <a
                    className="text-link"
                    href={apps.rogersDeepValue.websiteUrl}
                  >
                    Read on Substack <Arrow diagonal />
                  </a>
                </div>
              </div>
            </article>
            <article className="app-card peach">
              <Link
                className="card-art shift-art"
                href="/count-my-shift"
                tabIndex={-1}
                aria-hidden="true"
              >
                <Phone compact />
                <Image
                  className="card-app-icon"
                  src="/apps/count-my-shift/icon.png"
                  width={88}
                  height={88}
                  alt=""
                  sizes="88px"
                />
              </Link>
              <div className="card-copy">
                <h3>
                  <Link href="/count-my-shift">Count My Shift</Link>
                </h3>
                <p className="app-subtitle">Tip Tracker</p>
                <p className="app-description">
                  Your hours, tips and earnings in one place.
                </p>
                <div className="card-bottom">
                  {!apps.countMyShift.storeUrl && (
                    <span className="badge">In beta</span>
                  )}
                  {apps.countMyShift.storeUrl ? (
                    <a className="text-link" href={apps.countMyShift.storeUrl}>
                      App Store <Arrow diagonal />
                    </a>
                  ) : (
                    <Link className="text-link" href="/count-my-shift">
                      Explore app <Arrow diagonal />
                    </Link>
                  )}
                </div>
              </div>
            </article>
            <article className="app-card butter">
              <Link
                className="card-art"
                href="/steady-rounds"
                tabIndex={-1}
                aria-hidden="true"
              >
                <Image
                  className="tile-illustration"
                  src="/art/rounds.webp"
                  alt=""
                  width={650}
                  height={650}
                  sizes="(max-width: 760px) 90vw, 32vw"
                />
              </Link>
              <div className="card-copy">
                <h3>
                  <Link href="/steady-rounds">Steady Rounds</Link>
                </h3>
                <p className="app-subtitle">Boxing Timer</p>
                <p className="app-description">
                  A timer for your boxing rounds.
                </p>
                <div className="card-bottom">
                  {apps.steadyRounds.storeUrl ? (
                    <a className="text-link" href={apps.steadyRounds.storeUrl}>
                      App Store <Arrow diagonal />
                    </a>
                  ) : (
                    <Link className="text-link" href="/steady-rounds">
                      Explore app <Arrow diagonal />
                    </Link>
                  )}
                </div>
              </div>
            </article>
            <article className="app-card sage">
              <Link
                className="card-art icon-card-art"
                href="/jobalbum"
                tabIndex={-1}
                aria-hidden="true"
              >
                <Image
                  src="/apps/jobalbum/icon.png"
                  alt=""
                  width={250}
                  height={250}
                  sizes="220px"
                />
              </Link>
              <div className="card-copy">
                <h3>
                  <Link href="/jobalbum">JobAlbum</Link>
                </h3>
                <p className="app-subtitle">Timestamp Camera</p>
                <p className="app-description">
                  Work photos, notes and reports. A clear record of every job.
                </p>
                <div className="card-bottom">
                  {!apps.jobAlbum.storeUrl && (
                    <span className="badge">In beta</span>
                  )}
                  {apps.jobAlbum.storeUrl ? (
                    <a className="text-link" href={apps.jobAlbum.storeUrl}>
                      App Store <Arrow diagonal />
                    </a>
                  ) : (
                    <Link className="text-link" href="/jobalbum">
                      Explore app <Arrow diagonal />
                    </Link>
                  )}
                </div>
              </div>
            </article>
            <article className="app-card closing-card butter">
              <a
                className="card-art icon-card-art"
                href={apps.lekasoft.websiteUrl}
                tabIndex={-1}
                aria-hidden="true"
              >
                <LekasoftIcon />
              </a>
              <div className="card-copy">
                <h3>
                  <a href={apps.lekasoft.websiteUrl}>Lekasoft</a>
                </h3>
                <p className="app-subtitle">Printables &amp; tools</p>
                <p className="app-description">
                  Gift draws, Sinterklaas poems and printable templates, in
                  Dutch.
                </p>
                <div className="card-bottom">
                  <a className="text-link" href={apps.lekasoft.websiteUrl}>
                    Visit Lekasoft <Arrow diagonal />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="about-strip wrap" aria-labelledby="about-heading">
        <div className="about-doodle" aria-hidden="true">
          <Asterisk />
        </div>
        <div>
          <h2 id="about-heading">Hi, I’m Aldo.</h2>
          <p>
            A technical co-founder based in the Amsterdam area.
            <br className="desktop-break" /> I build products and automate the
            work around them.
          </p>
          <div className="link-row">
            <Link className="text-link" href="/about">
              More about me <Arrow diagonal />
            </Link>
            <a
              className="text-link"
              href="https://www.linkedin.com/in/aldo-leka/"
            >
              LinkedIn <Arrow diagonal />
            </a>
          </div>
        </div>
        <div className="about-signoff" aria-hidden="true">
          <Squiggle />
          <span className="handwritten">
            Same curiosity.
            <br />
            Tomorrow.
          </span>
        </div>
      </section>
    </>
  );
}
