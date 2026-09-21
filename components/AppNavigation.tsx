"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
export function AppNavigation() {
  const pathname = usePathname();
  return (
    <div className="app-navigation wrap">
      <Link href="/#apps" className="back-link">
        ← <span>All apps</span>
      </Link>
      <Link href="/count-my-shift" className="app-identity">
        <Image
          src="/apps/count-my-shift/icon.png"
          width={38}
          height={38}
          alt=""
        />
        <span>Count My Shift</span>
      </Link>
      <nav aria-label="Count My Shift navigation">
        {[
          ["Overview", "/count-my-shift"],
          ["Privacy", "/count-my-shift/privacy"],
          ["Support", "/count-my-shift/support"],
        ].map(([label, href]) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
