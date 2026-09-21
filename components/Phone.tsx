import Image from "next/image";
export function Phone({
  compact = false,
  app = "countMyShift",
}: {
  compact?: boolean;
  app?: "countMyShift" | "steadyRounds";
}) {
  const isRounds = app === "steadyRounds";
  return (
    <div className={`phone ${compact ? "phone-compact" : ""}`}>
      <Image
        src={
          isRounds
            ? "/apps/steady-rounds/work.webp"
            : "/apps/count-my-shift/home.webp"
        }
        alt={
          compact
            ? ""
            : isRounds
              ? "Steady Rounds workout timer showing round three of six, 2 minutes 15 seconds remaining, and pause and end controls."
              : "Count My Shift weekly overview showing sample earnings, four shifts and 24 paid hours."
        }
        width={471}
        height={1024}
        sizes={
          compact
            ? "(max-width: 760px) 52vw, 230px"
            : "(max-width: 760px) 72vw, 300px"
        }
        priority={!compact}
      />
      <span className="phone-island" aria-hidden="true" />
    </div>
  );
}
