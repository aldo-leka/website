import type { Metadata } from "next";

export const sitePages = {
  stats: {
    path: "/stats",
    title: "Site stats — Aldo Leka",
    headline: "A little look\naround the world.",
    description: "A public look at visits to aldoleka.com: trends, countries and how people find the site.",
    color: "#ffe4d9",
  },
  home: {
    path: "/",
    title: "Aldo Leka — Apps, software & a little curiosity",
    headline: "A few things\nI’m building.",
    description:
      "Independent apps and software by Aldo Leka. Explore DineMio, Rogers Deep Value, Night Show, Count My Shift, Steady Rounds, JobAlbum and Lekasoft, and meet the developer behind them.",
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
    description:
      "Track tips, hours and shift income on iPhone and iPad. Combine multiple currencies in your chosen reporting currency.",
    eyebrow: "Count My Shift · Tip Tracker",
    color: "#ffe4d9",
  },
  "count-my-shift-privacy": {
    path: "/count-my-shift/privacy",
    title: "Count My Shift Privacy Policy",
    headline: "Your records.\nYour business.",
    description:
      "Your notebook, private iCloud sync, public exchange rates and optional analytics, explained.",
    eyebrow: "Count My Shift · Privacy",
    color: "#dfe7d5",
  },
  "count-my-shift-support": {
    path: "/count-my-shift/support",
    title: "Count My Shift Support",
    headline: "Here when you\nneed a hand.",
    description:
      "Help with shifts, multiple currencies, consolidated totals, exchange rates, iCloud, backups, CSV exports and restoring Plus.",
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
  jobalbum: {
    path: "/jobalbum",
    title: "JobAlbum: Timestamp Camera",
    headline: "Good work.\nClearly recorded.",
    description:
      "Timestamped work photos, job albums, notes and PDF reports. Keep a clear record of each visit, right on your iPhone.",
    eyebrow: "JobAlbum · Timestamp Camera",
    color: "#dfe7d5",
  },
  "jobalbum-privacy": {
    path: "/jobalbum/privacy",
    title: "JobAlbum Privacy Policy",
    headline: "Your work.\nYour choices.",
    description:
      "How JobAlbum handles local photos, optional GPS, exports, purchases and opt-in usage analytics.",
    eyebrow: "JobAlbum · Privacy",
    color: "#dfe7d5",
  },
  "jobalbum-support": {
    path: "/jobalbum/support",
    title: "JobAlbum Support",
    headline: "A hand with\nyour work photos.",
    description:
      "Help with timestamped photos, job albums, GPS, PDF reports, backups and restoring JobAlbum Pro.",
    eyebrow: "JobAlbum · Support",
    color: "#fff0bd",
  },
  "night-show": {
    path: "/night-show",
    title: "Night Show: Party Games",
    headline: "Game night.\nOn the big screen.",
    description:
      "Party games for friends and family. The TV shows the game and everyone plays from their phone. Country City, The Buzzer, The Big Board and Draw & Guess, in English and Albanian.",
    eyebrow: "Night Show · Party Games",
    color: "#fff0bd",
  },
  "night-show-privacy": {
    path: "/night-show/privacy",
    title: "Night Show Privacy Policy",
    headline: "Play together.\nKeep it simple.",
    description:
      "A random player ID, game statistics, crash reports, feedback, AI without player names and the optional Plus subscription, explained.",
    eyebrow: "Night Show · Privacy",
    color: "#dfe7d5",
  },
  "night-show-support": {
    path: "/night-show/support",
    title: "Night Show Support",
    headline: "Here to help\nthe party along.",
    description:
      "Help with the TV screen, joining from phones, the games, Night Show Plus and languages.",
    eyebrow: "Night Show · Support",
    color: "#ffe4d9",
  },
  armrest: {
    path: "/armrest",
    title: "Armrest: TV Remote",
    headline: "Any TV.\nRight from your couch.",
    description:
      "A friendly TV remote for iPhone and iPad. Armrest finds the TV on your Wi-Fi and pairs in a tap: LG, Samsung, Sony, Philips, Roku, Fire TV, Google TV and more.",
    eyebrow: "Armrest · TV Remote",
    color: "#ffe4d9",
  },
  "armrest-privacy": {
    path: "/armrest/privacy",
    title: "Armrest Privacy Policy",
    headline: "Between you\nand your TV.",
    description:
      "Armrest talks only to the TVs on your Wi-Fi. No account, no analytics, no ads, and nothing sent to us.",
    eyebrow: "Armrest · Privacy",
    color: "#dfe7d5",
  },
  "armrest-support": {
    path: "/armrest/support",
    title: "Armrest Support",
    headline: "A hand with\nyour remote.",
    description:
      "Help with finding and pairing TVs, turning them on, typing, apps, Control Center and Siri.",
    eyebrow: "Armrest · Support",
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
