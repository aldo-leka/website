import { pageMetadata } from "@/lib/site-pages";
import Link from "next/link";
import { Arrow, Asterisk } from "@/components/Marks";
export const metadata = pageMetadata("about");
export default function AboutPage() {
  return (
    <div className="reading-page wrap">
      <p className="eyebrow">A bit about the person behind the apps</p>
      <h1>
        Hi, I’m <span className="underlined">Aldo.</span>
      </h1>
      <p className="lead">
        I like turning a useful idea into something people can actually use.
      </p>
      <div className="prose">
        <p>
          I’m a technical co-founder based in the Amsterdam area, with a
          background in software engineering, infrastructure and automation. I
          use AI extensively in product development, prototyping and the little
          tools that make everyday work easier.
        </p>
        <p>
          At Lekasoft, I co-created <a href="https://dinemio.com">DineMio</a>, a
          reservation and table-management product used by paying restaurants. I
          built its technical foundation and infrastructure, working with my
          co-founder on features and design.
        </p>
        <p>
          Before that, I worked on network automation at Eurofiber and software
          for an internal energy-trading team at Pure Energie. I studied
          Information and Communication Technologies at Saxion, with a focus on
          game development.
        </p>
        <h2>Curiosity is the common thread.</h2>
        <p>
          From apps for shift workers to a timer for boxing rounds, I enjoy
          making practical things and learning along the way. Software, product
          design and automation tend to meet somewhere in the middle.
        </p>
        <div className="note-box">
          <Asterisk />
          <p>
            I’m open to remote project work and business partnerships around
            product development, practical AI and automation.
          </p>
        </div>
      </div>
      <div className="link-row">
        <Link href="/contact" className="text-link">
          Let’s talk <Arrow diagonal />
        </Link>
        <a href="https://www.linkedin.com/in/aldo-leka/" className="text-link">
          LinkedIn <Arrow diagonal />
        </a>
        <a href="https://github.com/aldo-leka" className="text-link">
          GitHub <Arrow diagonal />
        </a>
      </div>
    </div>
  );
}
