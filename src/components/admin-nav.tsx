"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { type Locale, buildLocalePath } from "@/lib/site";
import { cn } from "@/lib/utils";

const ADMIN_ITEMS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/grants", label: "Grants" },
  { href: "/admin/payment-dates", label: "Payment dates" },
  { href: "/admin/statuses", label: "Statuses" },
  { href: "/admin/guides", label: "Guides" },
  { href: "/admin/faqs", label: "FAQ" },
  { href: "/admin/notices", label: "Notices" },
  { href: "/admin/placements", label: "Placements" },
];

export function AdminNav({
  locale,
}: {
  locale: Locale;
}) {
  const currentPath = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto pb-1">
      {ADMIN_ITEMS.map((item) => {
        const href = buildLocalePath(locale, item.href);
        const active = currentPath === href;

        return (
          <Link
            key={item.href}
            href={href}
            className={cn(
              "focus-ring tap-target inline-flex items-center rounded-full border px-4 text-sm font-medium whitespace-nowrap",
              active
                ? "border-primary bg-primary text-white"
                : "border-border bg-surface text-foreground hover:bg-surface-muted",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
