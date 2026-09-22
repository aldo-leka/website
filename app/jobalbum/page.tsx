import Image from "next/image";
import Link from "next/link";
import { Arrow, FeatureIcon, Asterisk } from "@/components/Marks";
import { StoreLink } from "@/components/StoreLink";
import { apps } from "@/lib/apps";
import { pageMetadata } from "@/lib/site-pages";

export const metadata = pageMetadata("jobalbum");

export default function JobAlbumPage() {
  return (
    <div className="wrap product-page">
      <section className="product-hero">
        <div>
          <p className="eyebrow">
            For iPhone{!apps.jobAlbum.storeUrl && " · In beta"}
          </p>
          <h1>
            Good work.
            <br />
            <span className="underlined">Clearly recorded.</span>
          </h1>
          <p className="hero-description">
            Capture timestamped photos, keep each job together and turn your
            work into a report with JobAlbum. For cleaning visits, deliveries,
            property handovers and the everyday work worth documenting.
          </p>
          <div className="product-name">
            <Image
              src="/apps/jobalbum/icon.png"
              alt="JobAlbum icon"
              width={66}
              height={66}
            />
            <p>
              <strong>JobAlbum:</strong> Timestamp Camera
            </p>
          </div>
          <StoreLink url={apps.jobAlbum.storeUrl} />
          <a className="text-link" href="#features">
            See how it works <span aria-hidden="true">↓</span>
          </a>
          <p className="byline">Built by Aldo Leka · iOS 17 or later</p>
        </div>
        <div className="product-visual jobalbum-product-visual sage">
          <Image
            src="/apps/jobalbum/icon.png"
            alt=""
            width={512}
            height={512}
            priority
          />
          <span className="handwritten" aria-hidden="true">
            A job well done.
            <br />A record to keep.
          </span>
        </div>
      </section>
      <section className="feature-section" id="features">
        <h2>From the first photo to the final report.</h2>
        <div className="feature-grid">
          <div>
            <FeatureIcon type="timer" />
            <div>
              <h3>Capture the details</h3>
              <p>
                Stamp photos with the date and time. Keep the camera ready
                for the next shot, with originals and stamped copies saved.
              </p>
            </div>
          </div>
          <div>
            <FeatureIcon type="notebook" />
            <div>
              <h3>One album for each job</h3>
              <p>
                Add photo notes, keep a visit together and archive completed
                jobs. Quick capture holds photos you want to file later.
              </p>
            </div>
          </div>
          <div>
            <FeatureIcon type="routines" />
            <div>
              <h3>Ready to hand over</h3>
              <p>
                Share individual JPEGs or try a PDF sample with up to three
                photos. Pro adds full reports, batch exports and customization.
              </p>
            </div>
          </div>
        </div>
        <p className="fine-print">
          No account. No ads. Capture, organize and prepare exports on your
          iPhone, even offline.
        </p>
      </section>
      <section className="plus-section butter">
        <div>
          <p className="eyebrow">JobAlbum Pro</p>
          <h2>More room for your work.</h2>
          <p>
            Unlimited active jobs, full PDF reports, batch JPEG exports and
            stamp and report customization.
            <br />
            One purchase. No subscription.
          </p>
          <p className="fine-print">
            Free includes three active jobs, unlimited archived jobs, individual
            photo sharing and PDF samples of up to three selected photos. Apple
            shows your local Pro price before purchase.
          </p>
        </div>
        <div className="plus-doodle" aria-hidden="true">
          <Asterisk />
          <span className="handwritten">
            Capture it.
            <br />
            Keep it together.
          </span>
          <Image
            src="/apps/jobalbum/icon.png"
            alt=""
            width={110}
            height={110}
          />
        </div>
      </section>
      <section className="support-strip">
        <h2>Here when you need a hand.</h2>
        <div className="link-row">
          <Link className="text-link" href="/jobalbum/support">
            Get support <Arrow diagonal />
          </Link>
          <Link className="text-link" href="/jobalbum/privacy">
            Read the privacy policy <Arrow diagonal />
          </Link>
        </div>
        <p className="fine-print">
          Timestamps use your device’s clock. GPS is optional and may be
          unavailable or inaccurate. JobAlbum records are not certified or
          tamper-proof evidence.
        </p>
      </section>
    </div>
  );
}
