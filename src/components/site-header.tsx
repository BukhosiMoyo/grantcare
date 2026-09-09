import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

import { signOutAction } from "@/actions/auth";
import { BrandLogo } from "@/components/brand-logo";
import {
  BellIcon,
  BookmarkIcon,
  CalendarIcon,
  ChevronRightIcon,
  CompassIcon,
  FileCheckIcon,
  LinkIcon,
  MapPinIcon,
  ShieldCheckIcon,
  StatusIcon,
  UserIcon,
} from "@/components/icons";
import { LanguageSwitcher } from "@/components/language-switcher";
import { NavigationDetails } from "@/components/navigation-details";
import { WhatsAppChannelBanner } from "@/components/whatsapp-channel";
import { getSessionUser } from "@/lib/auth-guards";
import { getCopy } from "@/lib/copy";
import type { Locale } from "@/lib/site";
import { buildLocalePath } from "@/lib/site";

type HeaderNavLink = {
  href: string;
  label: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type HeaderNavGroup = {
  title: string;
  links: HeaderNavLink[];
};

export async function SiteHeader({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const localCopy = {
    menu: locale === "zu" ? "Imenyu" : locale === "tn" ? "Menu" : locale === "xh" ? "Imenyu" : "Menu",
    myAccount: "My Account",
  };
  const sessionUser = await getSessionUser();

  const navItems = [
    { href: buildLocalePath(locale, "/payment-dates"), label: copy.paymentDates },
    { href: buildLocalePath(locale, "/status"), label: copy.statusHelp },
    { href: buildLocalePath(locale, "/eligibility-checker"), label: copy.eligibilityChecker },
    { href: buildLocalePath(locale, "/news"), label: copy.news },
    { href: buildLocalePath(locale, "/guides"), label: copy.guides },
  ];
  const navGroups: HeaderNavGroup[] = [
    {
      title: copy.popularTools,
      links: [
        {
          href: buildLocalePath(locale, "/eligibility-checker"),
          label: copy.eligibilityChecker,
          description: "Find a grant path and build a document checklist.",
          icon: ShieldCheckIcon,
        },
        {
          href: buildLocalePath(locale, "/payment-dates"),
          label: copy.paymentDates,
          description: "Track upcoming SASSA payment windows.",
          icon: CalendarIcon,
        },
        {
          href: buildLocalePath(locale, "/status"),
          label: copy.statusHelp,
          description: "Understand status wording and next steps.",
          icon: StatusIcon,
        },
        {
          href: buildLocalePath(locale, "/claim-checker"),
          label: "Claim checker",
          description: "Check rumours before you trust them.",
          icon: CompassIcon,
        },
      ],
    },
    {
      title: copy.help,
      links: [
        {
          href: buildLocalePath(locale, "/guides"),
          label: copy.guides,
          description: "Plain-language guides for applications and payments.",
          icon: BookmarkIcon,
        },
        {
          href: buildLocalePath(locale, "/grants"),
          label: copy.grantTypesTitle,
          description: "Compare grants, checks, amounts, and documents.",
          icon: FileCheckIcon,
        },
        {
          href: buildLocalePath(locale, "/sassa-office-locator"),
          label: "SASSA office locator",
          description: "Find offices, contacts, and directions.",
          icon: MapPinIcon,
        },
        {
          href: buildLocalePath(locale, "/news"),
          label: copy.news,
          description: "Read current updates and official announcements.",
          icon: BellIcon,
        },
        {
          href: buildLocalePath(locale, "/faq"),
          label: copy.faq,
          description: "Quick answers to common GrantCare questions.",
          icon: LinkIcon,
        },
      ],
    },
  ];
  const primaryNavItems = navItems.slice(0, 3);

  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="shell py-3">
        <div className="flex items-center justify-between gap-3">
          <Link href={buildLocalePath(locale)} className="focus-ring inline-flex min-w-0 items-center">
            <BrandLogo variant="full" className="h-8 w-auto sm:h-9" priority />
          </Link>
          <nav className="hidden flex-1 items-center justify-center gap-x-2 text-sm font-medium text-muted lg:flex">
            {primaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring max-w-[10rem] rounded-full px-2 py-1.5 leading-tight transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <NavigationDetails className="group relative">
              <summary className="focus-ring flex h-10 list-none items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted [&::-webkit-details-marker]:hidden">
                {copy.explore}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180"
                >
                  <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </summary>
              <div className="absolute left-1/2 top-full z-30 mt-3 max-h-[calc(100dvh-5.5rem)] w-[min(56rem,calc(100vw-2rem))] -translate-x-1/2 overflow-y-auto rounded-[1.5rem] border border-border bg-surface p-4 shadow-[0_26px_70px_-34px_rgba(24,36,31,0.28)]">
                <MegaMenuGroups groups={navGroups} />
              </div>
            </NavigationDetails>
          </nav>
          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <LanguageSwitcher currentLocale={locale} label={copy.language} />
            <div className="flex items-center gap-2">
              {sessionUser ? (
                <>
                  <Link
                    href={buildLocalePath(locale, "/dashboard")}
                    className="primary-action focus-ring inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold hover:bg-primary-strong"
                  >
                    <UserIcon className="h-4 w-4" />
                    {localCopy.myAccount}
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
                <Link
                  href={buildLocalePath(locale, "/sign-in")}
                  className="primary-action focus-ring inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold hover:bg-primary-strong"
                >
                  <UserIcon className="h-4 w-4" />
                  {localCopy.myAccount}
                </Link>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <NavigationDetails className="relative">
              <summary className="focus-ring flex h-10 list-none items-center rounded-full border border-border bg-surface px-3.5 text-sm font-medium text-foreground hover:bg-surface-muted [&::-webkit-details-marker]:hidden">
                {localCopy.menu}
              </summary>
              <div className="absolute right-0 top-full z-30 mt-3 max-h-[calc(100dvh-5.5rem)] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto rounded-[1.5rem] border border-border bg-surface p-4 shadow-[0_18px_42px_-28px_rgba(24,36,31,0.18)]">
                <MegaMenuGroups groups={navGroups} compact />
                <div className="mt-2">
                  <WhatsAppChannelBanner compact locale={locale} />
                </div>
                <div className="mt-4 border-t border-border/80 pt-4">
                  <div className="mb-4 flex items-center justify-between gap-2 px-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                      {copy.language}
                    </span>
                    <LanguageSwitcher currentLocale={locale} label={copy.language} compact />
                  </div>
                  <div className="grid gap-2">
                    {sessionUser ? (
                      <>
                        <Link
                          href={buildLocalePath(locale, "/dashboard")}
                          className="primary-action focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-3.5 text-sm font-semibold hover:bg-primary-strong"
                        >
                          <UserIcon className="h-4 w-4" />
                          {localCopy.myAccount}
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
                      <Link
                        href={buildLocalePath(locale, "/sign-in")}
                        className="primary-action focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-3.5 text-sm font-semibold hover:bg-primary-strong"
                      >
                        <UserIcon className="h-4 w-4" />
                        {localCopy.myAccount}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </NavigationDetails>
          </div>
        </div>
      </div>
    </header>
  );
}

function MegaMenuGroups({
  groups,
  compact = false,
}: {
  groups: HeaderNavGroup[];
  compact?: boolean;
}) {
  return (
    <nav className={compact ? "grid gap-4" : "grid gap-5 sm:grid-cols-2"}>
      {groups.map((group) => (
        <div key={group.title} className="min-w-0">
          <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
            {group.title}
          </p>
          <div className="grid gap-2">
            {group.links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring group/link grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)_1rem] items-center gap-3 rounded-2xl border border-transparent bg-surface px-3 py-3 text-sm leading-tight text-foreground transition-colors hover:border-border hover:bg-surface-muted"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 space-y-1">
                  <span className="block font-semibold">{item.label}</span>
                  <span className="block text-xs leading-5 text-muted">{item.description}</span>
                </span>
                <ChevronRightIcon className="h-4 w-4 text-muted transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
