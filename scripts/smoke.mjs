import assert from "node:assert/strict";

// Check the rendered site, including the actual images sent to social crawlers.
// Run against a production server: npm run test:smoke -- http://127.0.0.1:4173
const base = new URL(process.argv[2] || "http://127.0.0.1:4173");
const canonicalOrigin = "https://aldoleka.com";
const internalLinks = new Set();
const images = new Set();

async function get(path, expectedStatus = 200) {
  const response = await fetch(new URL(path, base), {
    signal: AbortSignal.timeout(20000),
  });
  assert.equal(response.status, expectedStatus, `${path}: HTTP status`);
  return response;
}

const sitemap = await (await get("/sitemap.xml")).text();
const pages = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => {
  const url = new URL(match[1]);
  assert.equal(url.origin, canonicalOrigin, "Sitemap domain");
  return url.pathname;
});
assert(pages.length > 0, "Sitemap must contain pages");

for (const path of pages) {
  const html = await (await get(path)).text();
  const tags = [...html.matchAll(/<(?:meta|link)\b[^>]*>/g)].map((match) => {
    return Object.fromEntries(
      [...match[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map((attribute) => [
        attribute[1],
        attribute[2],
      ]),
    );
  });
  const meta = (name) =>
    tags.find((tag) => tag.property === name || tag.name === name)?.content;
  const canonical = tags.find((tag) => tag.rel === "canonical")?.href;
  assert.equal(
    new URL(canonical).href,
    new URL(path, canonicalOrigin).href,
    `${path}: canonical`,
  );
  assert.equal(meta("og:url"), canonical, `${path}: Open Graph URL`);
  assert(meta("og:title"), `${path}: Open Graph title`);
  assert(meta("og:description"), `${path}: Open Graph description`);
  assert.equal(
    meta("twitter:card"),
    "summary_large_image",
    `${path}: social card`,
  );
  const image = new URL(meta("og:image"));
  assert.equal(image.origin, canonicalOrigin, `${path}: image origin`);
  assert.equal(
    meta("twitter:image"),
    image.href,
    `${path}: shared social image`,
  );
  assert(
    !images.has(image.pathname),
    `${path}: needs a distinct social preview`,
  );
  images.add(image.pathname);
  assert.equal(
    [...html.matchAll(/<h1\b/g)].length,
    1,
    `${path}: primary heading`,
  );
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)) {
    const url = new URL(href.replaceAll("&amp;", "&"), new URL(path, base));
    if (url.origin === base.origin) internalLinks.add(url.pathname + url.hash);
  }
  console.log(`PASS ${path} — metadata and social preview`);
}

for (const path of images) {
  const response = await get(path);
  assert.match(response.headers.get("content-type"), /^image\/png/);
  const png = Buffer.from(await response.arrayBuffer());
  assert.equal(
    png.subarray(0, 8).toString("hex"),
    "89504e470d0a1a0a",
    `${path}: PNG`,
  );
  assert.equal(png.readUInt32BE(16), 1200, `${path}: width`);
  assert.equal(png.readUInt32BE(20), 630, `${path}: height`);
}

for (const href of internalLinks) {
  const url = new URL(href, base);
  const html = await (await get(url.pathname)).text();
  if (url.hash) {
    assert(
      html.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
      `${href}: anchor exists`,
    );
  }
}
for (const path of [
  "/projects",
  "/blog",
  "/blog/naii-natural-alternatives-analysis",
  "/share/unknown-page",
]) {
  await get(path, 404);
}
const robots = await (await get("/robots.txt")).text();
assert(robots.includes(`${canonicalOrigin}/sitemap.xml`), "Robots sitemap");
console.log(
  `PASS ${pages.length} pages, ${images.size} preview images, ${internalLinks.size} internal links, removed routes and robots.txt`,
);
