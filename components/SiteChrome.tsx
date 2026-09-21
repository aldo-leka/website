import Link from "next/link";
export function SiteHeader() {
  return (
    <header className="site-header wrap">
      <Link className="wordmark" href="/" aria-label="Aldo Leka home">
        Aldo Leka<span className="brand-dot">.</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/#apps">Apps</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer wrap">
      <div className="footer-top">
        <nav aria-label="Footer navigation">
          <Link href="/#apps">Apps</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Aldo Leka</span>
        <span className="handwritten">Good software for real life.</span>
      </div>
    </footer>
  );
}
