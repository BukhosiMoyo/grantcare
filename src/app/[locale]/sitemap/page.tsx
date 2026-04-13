import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Section } from "@/components/ui";
import {
  listGuides,
  listPaymentPeriods,
  listPublicGrantTypes,
  listStatusMeanings,
} from "@/lib/content";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { buildLocalePath, isLocale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return buildLocalizedMetadata({
    locale,
    path: "/sitemap",
    title: "SASSA GrantCare Sitemap — All Pages",
    description:
      "Browse all SASSA pages on GrantCare: payment dates, status help, grant types, guides, and official contact details.",
  });
}

function LinkList({
  items,
}: {
  items: Array<{ href: string; label: string }>;
}) {
  return (
    <ul className="space-y-2 text-sm text-muted sm:text-base">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="hover:text-foreground">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function HtmlSitemapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const [guides, grants, statuses, periods] = await Promise.all([
    listGuides(locale),
    listPublicGrantTypes(locale),
    listStatusMeanings(locale),
    listPaymentPeriods(locale),
  ]);

  const mainPages = [
    { href: buildLocalePath(locale, "/"), label: "Home" },
    { href: buildLocalePath(locale, "/payment-dates"), label: "Payment dates" },
    { href: buildLocalePath(locale, "/status"), label: "Status help" },
    { href: buildLocalePath(locale, "/eligibility-checker"), label: "Eligibility checker" },
    { href: buildLocalePath(locale, "/guides"), label: "Guides" },
    { href: buildLocalePath(locale, "/grants"), label: "Grant types" },
    { href: buildLocalePath(locale, "/faq"), label: "FAQ" },
    { href: buildLocalePath(locale, "/contact"), label: "Contact" },
    { href: buildLocalePath(locale, "/privacy"), label: "Privacy" },
    { href: buildLocalePath(locale, "/disclaimer"), label: "Disclaimer" },
    { href: buildLocalePath(locale, "/terms"), label: "Terms" },
    { href: buildLocalePath(locale, "/editorial-policy"), label: "Editorial policy" },
    { href: buildLocalePath(locale, "/cookie-policy"), label: "Cookie policy" },
    { href: "/sitemap.xml", label: "XML sitemap" },
  ];

  const paymentPages = periods.flatMap((period) => [
    {
      href: buildLocalePath(locale, `/payment-dates/${period.year}/${period.monthSlug}`),
      label: `${period.label} payment dates`,
    },
    ...period.entries.map((entry) => ({
      href: buildLocalePath(
        locale,
        `/payment-dates/${period.year}/${period.monthSlug}/${entry.grantSlug}`,
      ),
      label: `${entry.grantName} payment dates for ${period.label}`,
    })),
  ]);

  const grantPages = grants.map((grant) => ({
    href: buildLocalePath(locale, `/grants/${grant.slug}`),
    label: grant.name,
  }));

  const statusPages = statuses.map((status) => ({
    href: buildLocalePath(locale, `/status/${status.slug}`),
    label: status.title,
  }));

  const guidePages = guides.map((guide) => ({
    href: buildLocalePath(locale, `/guides/${guide.slug}`),
    label: guide.title,
  }));

  return (
    <div className="shell space-y-10 py-8 sm:py-10">
      <Section eyebrow="Sitemap" title="All public GrantCare pages">
        <p className="max-w-3xl text-sm leading-7 text-muted sm:text-base">
          Use this page to browse the main sections, payment-date archives, status help,
          grant pages, and guides. GrantCare is an independent information platform.
        </p>
      </Section>

      <div className="grid gap-10 lg:grid-cols-2">
        <Section title="Main pages">
          <LinkList items={mainPages} />
        </Section>
        <Section title="Grant pages">
          <LinkList items={grantPages} />
        </Section>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <Section title="Status pages">
          <LinkList items={statusPages} />
        </Section>
        <Section title="Payment-date pages">
          <LinkList items={paymentPages} />
        </Section>
      </div>

      <Section title="Guide pages">
        <div className="columns-1 gap-8 sm:columns-2 xl:columns-3">
          <LinkList items={guidePages} />
        </div>
      </Section>
    </div>
  );
}
