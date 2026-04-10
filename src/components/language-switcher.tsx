"use client";

import { usePathname, useRouter } from "next/navigation";
import { startTransition } from "react";

import { trackClientEvent } from "@/lib/analytics-client";
import {
  LEGACY_LOCALE_COOKIE_NAME,
  LOCALES,
  LOCALE_COOKIE_NAME,
  type Locale,
  buildLocalePath,
} from "@/lib/site";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  currentLocale,
  label,
  compact = false,
}: {
  currentLocale: Locale;
  label: string;
  compact?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="relative">
      <select
        value={currentLocale}
        aria-label={label}
        onChange={(event) => {
          const nextLocale = event.target.value as Locale;
          document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
          document.cookie = `${LEGACY_LOCALE_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
          trackClientEvent({
            name: "language.changed",
            locale: nextLocale,
            path: pathname,
            payload: {
              from: currentLocale,
              to: nextLocale,
            },
          });
          startTransition(() => {
            router.push(buildLocalePath(nextLocale, pathname));
          });
        }}
        className={cn(
          "focus-ring h-10 appearance-none rounded-full border border-border bg-surface text-sm font-medium text-foreground transition-colors hover:bg-surface-muted",
          compact ? "w-[4.5rem] px-3 pr-8 text-center" : "px-3 pr-9",
        )}
      >
        {LOCALES.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {compact ? locale.code.toUpperCase() : locale.label}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        className={cn(
          "pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted",
          compact ? "right-2.5" : "right-3",
        )}
      >
        <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}
