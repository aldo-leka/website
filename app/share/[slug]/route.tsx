import { ImageResponse } from "next/og";
import { sitePages, type PageKey } from "@/lib/site-pages";
export const dynamic = "force-static";
export function generateStaticParams() {
  return Object.keys(sitePages).map((slug) => ({ slug }));
}
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!Object.hasOwn(sitePages, slug))
    return new Response("Not found", { status: 404 });
  const page = sitePages[slug as PageKey];
  return new ImageResponse(
    <div
      style={{
        background: "#fffdf8",
        width: "100%",
        height: "100%",
        display: "flex",
        padding: "58px 72px",
        flexDirection: "column",
        color: "#202126",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: -125,
          bottom: -185,
          width: 660,
          height: 660,
          borderRadius: "50%",
          background: page.color,
        }}
      />
      <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
        Aldo Leka<span style={{ color: "#f7665d" }}>.</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 55,
          fontSize: 18,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "#565863",
        }}
      >
        {page.eyebrow}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 79,
          letterSpacing: -4,
          fontWeight: 700,
          lineHeight: 1.09,
          marginTop: 17,
        }}
      >
        {page.headline.split("\n").map((line) => (
          <div key={line} style={{ display: "flex" }}>
            {line}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          width: 355,
          height: 7,
          background: "#ff8d7e",
          borderRadius: 8,
          marginTop: 16,
        }}
      />
      <div
        style={{
          display: "flex",
          marginTop: 24,
          fontSize: 24,
          color: "#565863",
          maxWidth: 840,
          lineHeight: 1.4,
        }}
      >
        {page.description}
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: 41,
          left: 72,
          fontSize: 17,
          color: "#565863",
        }}
      >
        aldoleka.com{page.path === "/" ? "" : page.path}
      </div>
      <svg
        width="82"
        height="82"
        viewBox="0 0 60 60"
        style={{ position: "absolute", right: 73, top: 65 }}
      >
        <path
          d="M30 3v54M3 30h54M11 11l38 38M49 11 11 49"
          stroke="#202126"
          strokeWidth="2"
        />
      </svg>
    </div>,
    { width: 1200, height: 630 },
  );
}
