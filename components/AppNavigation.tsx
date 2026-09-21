"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { apps } from "@/lib/apps";
export function AppNavigation({
  app = "countMyShift",
}: {
  app?: "countMyShift" | "steadyRounds";
}) {
  const pathname = usePathname();
  const { name, path } = apps[app];
  return (
    <div className="app-navigation wrap">
      <Link href="/#apps" className="back-link">
        ← <span>All apps</span>
      </Link>
      <Link href={path} className="app-identity">
        <Image src={`/apps${path}/icon.png`} width={38} height={38} alt="" />
        <span>{name}</span>
      </Link>
      <nav aria-label={`${name} navigation`}>
        {[
          ["Overview", path],
          ["Privacy", `${path}/privacy`],
          ["Support", `${path}/support`],
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
