"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { sitePages } from "@/lib/site-pages";
import { publicSource } from "@/lib/site-stats";

declare global {
  interface Window {
    goatcounter?: { no_onload?: boolean; no_events?: boolean; count?: (data: Record<string, unknown>) => void };
  }
}

export function SiteAnalytics() {
  const path = usePathname();
  const [ready, setReady] = useState(false);
  const previous = useRef<string | null>(null);
  const source = useRef("");
  useEffect(() => {
    const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
    if (nav.globalPrivacyControl || nav.doNotTrack === "1" ||
        !["aldoleka.com", "www.aldoleka.com"].includes(location.hostname)) return;
    let active = true;
    let script: HTMLScriptElement | undefined;
    const controller = new AbortController();
    source.current = publicSource(document.referrer);
    fetch("/api/analytics-config", { signal: controller.signal })
      .then(r => r.ok ? r.json() : null)
      .then(config => {
        if (!active || !config?.endpoint || !/^https:\/\/[a-z0-9-]+\.goatcounter\.com\/count$/.test(config.endpoint)) return;
        window.goatcounter = { no_onload: true, no_events: true };
        script = document.createElement("script");
        script.src = "https://gc.zgo.at/count.js";
        script.async = true;
        script.dataset.goatcounter = config.endpoint;
        script.dataset.goatcounterSettings = JSON.stringify({ no_onload: true, no_events: true });
        script.onload = () => { if (active) setReady(true); };
        document.head.append(script);
      }).catch(() => { /* Analytics must never interrupt the site. */ });
    return () => { active = false; controller.abort(); script?.remove(); };
  }, []);
  useEffect(() => {
    const page = Object.values(sitePages).find(page => page.path === path);
    if (!ready || !page || previous.current === path || !window.goatcounter?.count) return;
    previous.current = path;
    // No queries, fragments, form values, precise referrer URLs or click events.
    window.goatcounter.count({ path, title: page.title, referrer: source.current, event: false });
  }, [path, ready]);
  return null;
}
