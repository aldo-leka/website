import { pageMetadata } from "@/lib/site-pages";
import { Arrow, Squiggle } from "@/components/Marks";
import { contactEmail } from "@/lib/apps";
export const metadata = pageMetadata("contact");
export default function ContactPage() {
  return (
    <div className="reading-page wrap contact-page">
      <p className="eyebrow">Ideas, questions, or just a hello</p>
      <h1>
        Let’s <span className="underlined">talk.</span>
      </h1>
      <p className="lead">Have something in mind? I’d love to hear about it.</p>
      <a className="email-link" href={`mailto:${contactEmail}`}>
        {contactEmail} <Arrow diagonal />
      </a>
      <div className="prose">
        <p>
          For project work, partnerships or general questions, send me an email.
          You can also find me on{" "}
          <a href="https://www.linkedin.com/in/aldo-leka/">LinkedIn</a> and{" "}
          <a href="https://github.com/aldo-leka">GitHub</a>.
        </p>
        <div className="note-box">
          <Squiggle />
          <div>
            <h2>Need a hand with an app?</h2>
            <p>
              Send me an email with the app name and what you need help with.
              I’ll point you in the right direction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
