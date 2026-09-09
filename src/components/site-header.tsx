import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

import { signOutAction } from "@/actions/auth";
import { BrandLogo } from "@/components/brand-logo";
import {
  BellIcon,
  BookmarkIcon,
  CalendarIcon,
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
import { SiteNavLink } from "@/components/site-nav-link";
import { getSessionUser } from "@/lib/auth-guards";
import { getCopy } from "@/lib/copy";
import { buildLocalePath, type Locale } from "@/lib/site";

type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export async function SiteHeader({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const sessionUser = await getSessionUser();
  const menuLabel = locale === "zu" || locale === "xh" ? "Imenyu" : "Menu";
  const groups: { title: string; items: NavItem[] }[] = [
    {
      title: copy.popularTools,
      items: [
        {
          href: "/payment-dates",
          label: copy.paymentDates,
          icon: CalendarIcon,
        },
        { href: "/status", label: copy.statusHelp, icon: StatusIcon },
        {
          href: "/eligibility-checker",
          label: copy.eligibilityChecker,
          icon: ShieldCheckIcon,
        },
        { href: "/claim-checker", label: "Claim checker", icon: CompassIcon },
      ],
    },
    {
      title: copy.help,
      items: [
        { href: "/guides", label: copy.guides, icon: BookmarkIcon },
        { href: "/grants", label: copy.grantTypesTitle, icon: FileCheckIcon },
        {
          href: "/sassa-office-locator",
          label: locale === "en" ? "Office locator" : copy.officialLinks,
          icon: MapPinIcon,
        },
        { href: "/news", label: copy.news, icon: BellIcon },
        { href: "/faq", label: copy.faq, icon: LinkIcon },
      ],
    },
  ];
  const accountPath = buildLocalePath(
    locale,
    sessionUser ? "/dashboard" : "/sign-in",
  );
  const accountControls = (
    <>
      <Link href={accountPath} className="header-account">
        <UserIcon className="h-4 w-4" aria-hidden="true" />
        {copy.account}
      </Link>
      {sessionUser?.role === "admin" ? (
        <Link
          href={buildLocalePath(locale, "/admin")}
          className="header-account"
        >
          {copy.admin}
        </Link>
      ) : null}
      {sessionUser ? (
        <form action={signOutAction}>
          <input type="hidden" name="locale" value={locale} />
          <button type="submit" className="header-account">
            {copy.signOut}
          </button>
        </form>
      ) : null}
    </>
  );
  const menuGroups = (
    <>
      {groups.map((group) => (
        <div key={group.title}>
          <p className="menu-group-title">{group.title}</p>
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={buildLocalePath(locale, item.href)}
              className="menu-link"
            >
              <item.icon aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </>
  );

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href={buildLocalePath(locale)} className="header-brand">
          <BrandLogo priority />
        </Link>
        <nav
          className="header-nav"
          aria-label={locale === "en" ? "Main navigation" : copy.explore}
        >
          <SiteNavLink href={buildLocalePath(locale, "/payment-dates")}>
            {copy.paymentDates}
          </SiteNavLink>
          <SiteNavLink href={buildLocalePath(locale, "/status")}>
            {copy.statusHelp}
          </SiteNavLink>
          <SiteNavLink href={buildLocalePath(locale, "/guides")}>
            {copy.guides}
          </SiteNavLink>
          <NavigationDetails className="group relative">
            <summary className="nav-summary">
              {copy.explore}
              <svg
                viewBox="0 0 20 20"
                className="h-3.5 w-3.5 transition-transform group-open:rotate-180"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="m5 7.5 5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </summary>
            <div className="menu-panel menu-desktop grid grid-cols-2 gap-4">
              {menuGroups}
            </div>
          </NavigationDetails>
        </nav>
        <div className="header-controls">
          <LanguageSwitcher currentLocale={locale} label={copy.language} />
          {accountControls}
        </div>
        <NavigationDetails className="mobile-nav relative">
          <summary className="mobile-menu-summary">
            <svg
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M3 5h14M3 10h14M3 15h14" />
            </svg>
            {menuLabel}
          </summary>
          <div className="menu-panel menu-mobile">
            <nav aria-label={copy.explore} className="grid gap-3">
              {menuGroups}
            </nav>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
              <span className="text-sm text-muted">{copy.language}</span>
              <LanguageSwitcher
                currentLocale={locale}
                label={copy.language}
                compact
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">{accountControls}</div>
          </div>
        </NavigationDetails>
      </div>
    </header>
  );
}
