import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/contact",
    "/count-my-shift",
    "/count-my-shift/privacy",
    "/count-my-shift/support",
    "/steady-rounds",
    "/steady-rounds/privacy",
    "/steady-rounds/support",
  ].map((path) => ({
    url: `https://aldoleka.com${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
