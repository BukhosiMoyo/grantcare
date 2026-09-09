"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function SiteNavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={
        pathname === href ? "page" : active ? "location" : undefined
      }
      className={active ? "nav-active" : undefined}
    >
      {children}
    </Link>
  );
}
