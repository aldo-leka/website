"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { sitePages } from "@/lib/site-pages";
import { directSource, publicSource } from "@/lib/site-stats";

const paths = new Set<string>(Object.values(sitePages).map(page => page.path));

function entrySource() {
  try {
    const host = new URL(document.referrer).hostname.replace(/^www\./, "");
    if (host === "aldoleka.com" || host === "aldo.al") return directSource;
  } catch { /* No or malformed referrer. */ }
  return publicSource(document.referrer);
}

export function SiteAnalytics() {
  const path = usePathname();
  const previous = useRef<string | null>(null);
  const source = useRef<string | null>(null);
  useEffect(() => {
    const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
    if (nav.globalPrivacyControl || nav.doNotTrack === "1" ||
        !["aldoleka.com", "www.aldoleka.com"].includes(location.hostname) ||
        !paths.has(path) || previous.current === path) return;
    previous.current = path;
    source.current ??= entrySource();
    // No queries, fragments, form values, precise referrer URLs or click events.
    fetch("/api/collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, source: source.current, screen: `${screen.width}x${screen.height}`, language: navigator.language }),
      credentials: "omit",
      keepalive: true,
    }).catch(() => { /* Analytics must never interrupt the site. */ });
  }, [path]);
  return null;
}
