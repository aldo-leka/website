import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site-pages";
import "@fontsource-variable/dm-sans";
import "@fontsource/caveat/400.css";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
export const metadata: Metadata = {
  ...pageMetadata("home"),
  metadataBase: new URL("https://aldoleka.com"),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
