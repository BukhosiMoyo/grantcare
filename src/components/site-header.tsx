import Link from "next/link";

import { signOutAction } from "@/actions/auth";
import { BrandLogo } from "@/components/brand-logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { WhatsAppChannelBanner } from "@/components/whatsapp-channel";
import { getSessionUser } from "@/lib/auth-guards";
import { getCopy } from "@/lib/copy";
import type { Locale } from "@/lib/site";
import { buildLocalePath } from "@/lib/site";

export async function SiteHeader({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const sessionUser = await getSessionUser();

  const navItems = [
    { href: buildLocalePath(locale, "/payment-dates"), label: copy.paymentDates },
    { href: buildLocalePath(locale, "/status"), label: copy.statusHelp },
    { href: buildLocalePath(locale, "/eligibility-checker"), label: copy.eligibilityChecker },
    { href: buildLocalePath(locale, "/news"), label: copy.news },
    { href: buildLocalePath(locale, "/guides"), label: copy.guides },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="shell py-3">
        <div className="flex items-center justify-between gap-3">
          <Link href={buildLocalePath(locale)} className="focus-ring inline-flex shrink-0 items-center">
            <BrandLogo variant="full" className="h-8 w-auto sm:h-9" priority />
          </Link>
          <nav className="hidden flex-1 items-center justify-center gap-x-5 text-sm font-medium text-muted lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-full px-1 py-1.5 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <LanguageSwitcher currentLocale={locale} label={copy.language} compact />
            <div className="flex items-center gap-2">
              {sessionUser ? (
                <>
                  <Link
                    href={buildLocalePath(locale, "/dashboard")}
                    className="focus-ring inline-flex h-10 items-center rounded-full border border-border bg-surface px-3.5 text-sm font-medium hover:bg-surface-muted"
                  >
                    {copy.dashboard}
                  </Link>
                  {sessionUser.role === "admin" ? (
                    <Link
                      href={buildLocalePath(locale, "/admin")}
                      className="focus-ring inline-flex h-10 items-center rounded-full border border-border bg-surface px-3.5 text-sm font-medium hover:bg-surface-muted"
                    >
                      {copy.admin}
                    </Link>
                  ) : null}
                  <form action={signOutAction}>
                    <input type="hidden" name="locale" value={locale} />
                    <button
                      type="submit"
                      className="primary-action focus-ring h-10 rounded-full bg-primary px-3.5 text-sm font-medium hover:bg-primary-strong"
                    >
                      {copy.signOut}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href={buildLocalePath(locale, "/sign-in")}
                    className="focus-ring inline-flex h-10 items-center rounded-full border border-border bg-surface px-3.5 text-sm font-medium hover:bg-surface-muted"
                  >
                    {copy.signIn}
                  </Link>
                  <Link
                    href={buildLocalePath(locale, "/sign-up")}
                    className="primary-action focus-ring inline-flex h-10 items-center rounded-full bg-primary px-3.5 text-sm font-medium hover:bg-primary-strong"
                  >
                    {copy.createAccount}
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <LanguageSwitcher currentLocale={locale} label={copy.language} compact />
            <details className="relative">
              <summary className="focus-ring flex h-10 list-none items-center rounded-full border border-border bg-surface px-3.5 text-sm font-medium text-foreground hover:bg-surface-muted [&::-webkit-details-marker]:hidden">
                Menu
              </summary>
              <div className="absolute right-0 top-full z-30 mt-3 w-[min(20rem,calc(100vw-2rem))] rounded-[1.5rem] border border-border bg-surface p-4 shadow-[0_18px_42px_-28px_rgba(24,36,31,0.18)]">
                <nav className="grid gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="focus-ring rounded-2xl px-3 py-3 text-sm font-medium text-foreground hover:bg-surface-muted"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-2">
                  <WhatsAppChannelBanner compact />
                </div>
                <div className="mt-4 border-t border-border/80 pt-4">
                  <div className="grid gap-2">
                    {sessionUser ? (
                      <>
                        <Link
                          href={buildLocalePath(locale, "/dashboard")}
                          className="focus-ring inline-flex h-10 items-center justify-center rounded-full border border-border bg-surface px-3.5 text-sm font-medium hover:bg-surface-muted"
                        >
                          {copy.dashboard}
                        </Link>
                        {sessionUser.role === "admin" ? (
                          <Link
                            href={buildLocalePath(locale, "/admin")}
                            className="focus-ring inline-flex h-10 items-center justify-center rounded-full border border-border bg-surface px-3.5 text-sm font-medium hover:bg-surface-muted"
                          >
                            {copy.admin}
                          </Link>
                        ) : null}
                        <form action={signOutAction}>
                          <input type="hidden" name="locale" value={locale} />
                          <button
                            type="submit"
                            className="primary-action focus-ring h-10 w-full rounded-full bg-primary px-3.5 text-sm font-medium hover:bg-primary-strong"
                          >
                            {copy.signOut}
                          </button>
                        </form>
                      </>
                    ) : (
                      <>
                        <Link
                          href={buildLocalePath(locale, "/sign-in")}
                          className="focus-ring inline-flex h-10 items-center justify-center rounded-full border border-border bg-surface px-3.5 text-sm font-medium hover:bg-surface-muted"
                        >
                          {copy.signIn}
                        </Link>
                        <Link
                          href={buildLocalePath(locale, "/sign-up")}
                          className="primary-action focus-ring inline-flex h-10 items-center justify-center rounded-full bg-primary px-3.5 text-sm font-medium hover:bg-primary-strong"
                        >
                          {copy.createAccount}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
