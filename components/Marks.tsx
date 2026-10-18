export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {diagonal ? (
        <path d="M6 18 18 6M6 6h12v12" />
      ) : (
        <path d="M4 12h16m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}
export function Asterisk() {
  return (
    <svg
      aria-hidden="true"
      width="42"
      height="48"
      viewBox="0 0 42 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    >
      <path d="m22 3-4 41M3 21l35 5M6 6l29 36M35 4 6 43" />
    </svg>
  );
}
export function Squiggle() {
  return (
    <svg
      aria-hidden="true"
      width="174"
      height="47"
      viewBox="0 0 174 47"
      fill="none"
    >
      <path
        d="M2 32c34-39 49 30 85 0S138 3 172 12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
// Lekasoft's own mark, as published at lekasoft.nl/icon.svg, with rounded corners.
export function LekasoftIcon() {
  return (
    <svg aria-hidden="true" width="220" height="220" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="14" fill="#111418" />
      <rect x="18" y="16" width="8" height="32" fill="#f5f7fa" />
      <rect x="30" y="40" width="16" height="8" fill="#ffb020" />
    </svg>
  );
}
export function FeatureIcon({
  type,
}: {
  type: "notebook" | "chart" | "cloud" | "timer" | "bell" | "routines" | "tv" | "board" | "pencil";
}) {
  return (
    <svg
      aria-hidden="true"
      width="50"
      height="54"
      viewBox="0 0 48 52"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {type === "notebook" ? (
        <>
          <rect x="8" y="4" width="31" height="43" rx="5" />
          <path d="M17 15h13M17 23h13M17 31h8M4 13h7M4 24h7M4 35h7" />
        </>
      ) : type === "chart" ? (
        <>
          <rect x="4" y="29" width="9" height="18" rx="1" />
          <rect x="20" y="18" width="9" height="29" rx="1" />
          <rect x="35" y="5" width="9" height="42" rx="1" />
        </>
      ) : (
        <>
          {type === "cloud" && (
            <path d="M12 40h25a9 9 0 0 0 1-18 14 14 0 0 0-27-3 11 11 0 0 0 1 21Z" />
          )}
          {type === "timer" && (
            <>
              <circle cx="24" cy="29" r="18" />
              <path d="M19 4h10M24 4v7M24 18v12l8 5M37 12l4-4" />
            </>
          )}
          {type === "bell" && (
            <path d="M10 38h28c-5-5-5-10-5-15a9 9 0 0 0-18 0c0 5 0 10-5 15ZM20 44a4 4 0 0 0 8 0M24 9V5M5 15l-3-3M43 15l3-3" />
          )}
          {type === "tv" && (
            <>
              <rect x="4" y="13" width="40" height="27" rx="5" />
              <path d="m16 4 8 9 8-9M15 47h18M19 40v7M29 40v7" />
            </>
          )}
          {type === "board" && (
            <>
              <rect x="4" y="7" width="40" height="38" rx="4" />
              <path d="M17 7v38M31 7v38M4 17h40M4 26h40M4 35h40" />
            </>
          )}
          {type === "pencil" && (
            <>
              <path d="M33 6l9 9-25 25-11 3 3-11Z" />
              <path d="M28 11l9 9M6 48h36" />
            </>
          )}
          {type === "routines" && (
            <>
              <rect x="7" y="5" width="34" height="42" rx="5" />
              <path d="m14 17 3 3 5-6M27 18h7m-20 11 3 3 5-6M27 30h7M14 40h20" />
            </>
          )}
        </>
      )}
    </svg>
  );
}
