import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { sitePages, socialImagePath, type PageKey } from "@/lib/site-pages";

export const dynamic = "force-static";

export function generateStaticParams() {
  return (Object.keys(sitePages) as PageKey[]).flatMap((key) => [
    { slug: key }, // Keep previously shared image URLs available.
    { slug: socialImagePath(key).split("/").pop()! },
    ...(key === "steady-rounds" ? [{ slug: "steady-rounds-v2.png" }] : []),
  ]);
}

const labels: Record<PageKey, [string, string]> = {
  home: ["Aldo Leka.", "Apps for real life"],
  about: ["About Aldo", "The person behind the apps"],
  contact: ["Let’s talk.", "Ideas, projects & a hello"],
  "count-my-shift": ["Count My Shift", "Tip Tracker · For iPhone"],
  "count-my-shift-privacy": ["Privacy", "Count My Shift"],
  "count-my-shift-support": ["Support", "Count My Shift"],
  "steady-rounds": ["Steady Rounds", "Boxing Timer · For iPhone"],
  "steady-rounds-privacy": ["Privacy", "Steady Rounds"],
  "steady-rounds-support": ["Support", "Steady Rounds"],
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const versioned = /-v[23]\.png$/.test(slug);
  const key = versioned ? slug.slice(0, -7) : slug;
  if (!Object.hasOwn(sitePages, key))
    return new Response("Not found", { status: 404 });

  const page = sitePages[key as PageKey];
  const [title, subtitle] = labels[key as PageKey];
  const appFolder = key.startsWith("count-my-shift")
    ? "count-my-shift"
    : key.startsWith("steady-rounds") && slug !== "steady-rounds-v2.png"
      ? "steady-rounds"
      : null;
  const appIcon = appFolder
    ? `data:image/png;base64,${(await readFile(join(process.cwd(), `public/apps/${appFolder}/icon.png`))).toString("base64")}`
    : null;

  // Essential content stays in the middle 630px: a square thumbnail must
  // remain recognizable instead of clipping a landscape block of tiny text.
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#fffdf8",
        color: "#202126",
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          display: "flex",
          width: 590,
          height: 590,
          borderRadius: "50%",
          background: page.color,
          top: 20,
          left: 305,
        }}
      />
      <div
        style={{
          position: "absolute",
          display: "flex",
          left: 54,
          top: 42,
          fontSize: 25,
        }}
      >
        Aldo Leka<span style={{ color: "#f7665d" }}>.</span>
      </div>
      <svg
        width="95"
        height="95"
        viewBox="0 0 60 60"
        style={{ position: "absolute", left: 116, top: 277 }}
      >
        <path
          d="M30 3v54M3 30h54M11 11l38 38M49 11 11 49"
          fill="none"
          stroke="#202126"
          strokeWidth="2"
        />
      </svg>
      <svg
        width="145"
        height="60"
        viewBox="0 0 174 60"
        style={{ position: "absolute", right: 81, top: 300 }}
      >
        <path
          d="M2 32c34-39 49 30 85 0S138 3 172 12"
          fill="none"
          stroke="#202126"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          display: "flex",
          width: 560,
          left: 320,
          top: 84,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {appIcon ? (
          // ImageResponse renders this embedded asset without a network request.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={appIcon}
            alt=""
            width="280"
            height="280"
            style={{ borderRadius: 62 }}
          />
        ) : key === "steady-rounds" ? (
          <svg width="280" height="280" viewBox="0 0 280 280">
            <rect x="119" y="12" width="42" height="22" rx="5" fill="#202126" />
            <rect x="132" y="28" width="16" height="22" fill="#202126" />
            <circle cx="140" cy="158" r="103" fill="#202126" />
            <circle
              cx="140"
              cy="158"
              r="83"
              fill="none"
              stroke="#fffdf8"
              strokeWidth="4"
              strokeDasharray="3 18"
            />
            <path
              d="M124 116 178 152Q184 157 178 163L124 199Z"
              fill="#fff0bd"
            />
            <path
              d="M140 75a83 83 0 0 1 63 29"
              fill="none"
              stroke="#f7665d"
              strokeWidth="10"
            />
          </svg>
        ) : (
          <svg width="280" height="280" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="17" fill="#fffdf8" />
            <path
              d="M14 47 27 17h9l13 30H38l-2-6H25l-2 6Zm14-14h5l-2.5-8Z"
              fill="#202126"
            />
            <circle cx="50" cy="49" r="5" fill="#f7665d" />
          </svg>
        )}
        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 15,
            fontSize: 25,
            color: "#565863",
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 26,
            width: 125,
            height: 7,
            borderRadius: 8,
            background: "#f7665d",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          left: 54,
          bottom: 37,
          fontSize: 20,
          color: "#565863",
        }}
      >
        aldoleka.com
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": versioned
          ? "public, max-age=31536000, immutable"
          : "public, max-age=3600, must-revalidate",
      },
    },
  );
}
