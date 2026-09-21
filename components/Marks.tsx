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
export function FeatureIcon({
  type,
}: {
  type: "notebook" | "chart" | "cloud" | "timer" | "bell" | "routines";
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
