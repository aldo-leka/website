import Image from "next/image";
export function Phone({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`phone ${compact ? "phone-compact" : ""}`}>
      <Image
        src="/apps/count-my-shift/home.webp"
        alt={
          compact
            ? ""
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
