"use client";

import { usePathname, useRouter } from "next/navigation";
import { startTransition, useRef } from "react";

import { trackClientEvent } from "@/lib/analytics-client";
import {
  LEGACY_LOCALE_COOKIE_NAME,
  LOCALE_COOKIE_NAME,
  type Locale,
  buildLocalePath,
  getPublicLocales,
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
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const publicLocales = getPublicLocales();
  if (publicLocales.length <= 1) {
    return null;
  }

  return (
    <details ref={detailsRef} className="group relative">
      <summary
        aria-label={label}
        className={cn(
          "focus-ring flex h-10 list-none items-center justify-center gap-1.5 rounded-full border border-border bg-surface text-sm font-medium text-foreground transition-colors hover:bg-surface-muted [&::-webkit-details-marker]:hidden",
          compact ? "w-[4.5rem] px-3" : "min-w-16 px-3.5",
        )}
      >
        <span>{currentLocale.toUpperCase()}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180"
        >
          <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </summary>
      <div className="absolute right-0 top-full z-40 mt-2 w-[min(13rem,calc(100vw-2rem))] rounded-[1.25rem] border border-border bg-surface p-2 shadow-[0_18px_42px_-28px_rgba(24,36,31,0.18)]">
        <div className="grid gap-1">
          {publicLocales.map((locale) => (
            <button
              key={locale.code}
              type="button"
              aria-current={locale.code === currentLocale ? "true" : undefined}
              onClick={() => {
                const nextLocale = locale.code;
                detailsRef.current?.removeAttribute("open");

                if (nextLocale === currentLocale) {
                  return;
                }

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
                "focus-ring min-w-0 rounded-2xl px-3 py-2.5 text-left text-sm font-medium leading-tight text-foreground transition-colors hover:bg-surface-muted",
                locale.code === currentLocale ? "bg-surface-muted" : null,
              )}
            >
              {locale.label}
            </button>
          ))}
        </div>
      </div>
    </details>
  );
}
