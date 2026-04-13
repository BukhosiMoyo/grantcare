import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { WhatsAppChannelLink } from "@/components/whatsapp-channel";
import { getSessionUser } from "@/lib/auth-guards";
import { getCopy } from "@/lib/copy";
import { LEGAL_LINKS, OFFICIAL_SASSA_CONTACTS } from "@/lib/official-resources";
import type { Locale } from "@/lib/site";
import { buildLocalePath } from "@/lib/site";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const sessionUser = await getSessionUser();
  const quickLinks = [
    { href: buildLocalePath(locale, "/payment-dates"), label: copy.paymentDates },
    { href: buildLocalePath(locale, "/status"), label: copy.statusHelp },
    { href: buildLocalePath(locale, "/eligibility-checker"), label: copy.eligibility },
    { href: buildLocalePath(locale, "/guides"), label: copy.guides },
    { href: buildLocalePath(locale, "/grants"), label: copy.grantTypesTitle },
    { href: buildLocalePath(locale, "/faq"), label: copy.faq },
    { href: buildLocalePath(locale, "/contact"), label: "Contact" },
  ];

  return (
    <footer className="border-t border-border/80 bg-surface-muted">
      <div className="shell space-y-6 py-8">
        <div className="grid gap-8 md:grid-cols-[1.3fr_0.9fr_0.9fr]">
          <div className="space-y-3">
            <BrandLogo variant="full" className="h-9 w-auto" />
            <p className="max-w-xl text-sm text-muted">{copy.officialNotice}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{copy.explore}</p>
            <div className="flex flex-col gap-2 text-sm text-muted">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-foreground">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
              {copy.officialLinks}
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted">
              {OFFICIAL_SASSA_CONTACTS.map((link) => {
                const isHttp = link.href.startsWith("http");

                return (
                  <a
                    key={link.title}
                    href={link.href}
                    target={isHttp ? "_blank" : undefined}
                    rel={isHttp ? "noreferrer" : undefined}
                    className="hover:text-foreground"
                  >
                    {link.title}: {link.value}
                  </a>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-border/50">
              <WhatsAppChannelLink />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 border-t border-border/70 pt-4 text-sm text-muted">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.path} href={buildLocalePath(locale, link.path)} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
          <Link href={buildLocalePath(locale, "/sitemap")} className="hover:text-foreground">
            HTML sitemap
          </Link>
          <Link href="/sitemap.xml" className="hover:text-foreground">
            XML sitemap
          </Link>
          <Link href={buildLocalePath(locale, "/dashboard")} className="hover:text-foreground">
            {copy.dashboard}
          </Link>
          {sessionUser?.role === "admin" ? (
            <Link href={buildLocalePath(locale, "/admin")} className="hover:text-foreground">
              {copy.admin}
            </Link>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
