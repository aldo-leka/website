import Link from "next/link";
export default function NotFound() {
  return (
    <div className="reading-page wrap">
      <p className="eyebrow">404 · A little off the path</p>
      <h1>
        This page
        <br />
        isn’t here.
      </h1>
      <p className="lead">
        The site has a new home for my apps. Let’s get you back to it.
      </p>
      <Link className="button" href="/">
        Back to the apps <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
