import type { Metadata } from "next";

export const sitePages = {
  home: {
    path: "/",
    title: "Aldo Leka — Apps, software & a little curiosity",
    headline: "A few things\nI’m building.",
    description:
      "Independent apps and software by Aldo Leka. Explore Count My Shift, Steady Rounds and DineMio, and meet the developer behind them.",
    eyebrow: "Independent products & experiments",
    color: "#ffe4d9",
  },
  about: {
    path: "/about",
    title: "About Aldo Leka",
    headline: "Hi, I’m Aldo.",
    description:
      "Technical co-founder. Product development, practical AI and automation.",
    eyebrow: "The person behind the apps",
    color: "#dfe7d5",
  },
  contact: {
    path: "/contact",
    title: "Contact Aldo Leka",
    headline: "Let’s talk.",
    description: "Ideas, projects, partnerships or a question about an app.",
    eyebrow: "Get in touch",
    color: "#fff0bd",
  },
  "count-my-shift": {
    path: "/count-my-shift",
    title: "Count My Shift: Tip Tracker",
    headline: "A little clarity\nafter every shift.",
    description: "Your hours, tips and earnings in one place. For iPhone.",
    eyebrow: "Count My Shift · Tip Tracker",
    color: "#ffe4d9",
  },
  "count-my-shift-privacy": {
    path: "/count-my-shift/privacy",
    title: "Count My Shift Privacy Policy",
    headline: "Your records.\nYour business.",
    description:
      "Your notebook, private iCloud sync and optional analytics, explained.",
    eyebrow: "Count My Shift · Privacy",
    color: "#dfe7d5",
  },
  "count-my-shift-support": {
    path: "/count-my-shift/support",
    title: "Count My Shift Support",
    headline: "Here when you\nneed a hand.",
    description:
      "Help with shifts, iCloud, backups, exports and restoring Plus.",
    eyebrow: "Count My Shift · Support",
    color: "#ffe4d9",
  },
  "steady-rounds": {
    path: "/steady-rounds",
    title: "Steady Rounds: Boxing Timer",
    headline: "Every round.\nIn your corner.",
    description:
      "Your rounds, rest and rhythm. An iPhone boxing timer with saved routines, clear countdowns and bells.",
    eyebrow: "Boxing Timer · For iPhone",
    color: "#fff0bd",
  },
  "steady-rounds-privacy": {
    path: "/steady-rounds/privacy",
    title: "Steady Rounds Privacy Policy",
    headline: "Your training.\nYour choices.",
    description:
      "Local routines, optional usage analytics and Pro purchases, explained.",
    eyebrow: "Steady Rounds · Privacy",
    color: "#dfe7d5",
  },
  "steady-rounds-support": {
    path: "/steady-rounds/support",
    title: "Steady Rounds Support",
    headline: "Here to help.",
    description:
      "Help with timers, bells, lock-screen cues, saved routines and restoring Pro.",
    eyebrow: "Steady Rounds · Support",
    color: "#fff0bd",
  },
} as const;
export type PageKey = keyof typeof sitePages;

export function socialImagePath(key: PageKey) {
  return `/share/${key}-${key.startsWith("steady-rounds") ? "v3" : "v2"}.png`;
}

export function pageMetadata(key: PageKey): Metadata {
  const page = sitePages[key];
  const image = {
    url: `https://aldoleka.com${socialImagePath(key)}`,
    secureUrl: `https://aldoleka.com${socialImagePath(key)}`,
    type: "image/png",
    width: 1200,
    height: 630,
    alt: `${page.title} — ${page.description}`,
  };
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.path,
      type: "website",
      siteName: "Aldo Leka",
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
  };
}
