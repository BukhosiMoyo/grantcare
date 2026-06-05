import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Section } from "@/components/ui";
import {
  listGuides,
  listNewsArticles,
  listPaymentPeriods,
  listPublicGrantTypes,
  listStatusMeanings,
} from "@/lib/content";
import { filterIndexableGuides } from "@/lib/guide-seo";
import { getLocalizedRouteCopy } from "@/lib/homepage-content";
import { filterIndexablePaymentPeriods } from "@/lib/payment-seo";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { SASSA_OFFICES } from "@/lib/sassa-offices";
import { buildLocalePath, isPublicLocale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isPublicLocale(locale)) {
    return {};
  }

  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      metaTitle: "SASSA Pages, News, Guides and Payment Dates",
      metaDescription:
        "Browse GrantCare pages for SASSA payment dates, news, status help, grant guides, FAQs, and official contact routes.",
    },
    {
      metaTitle: "Amakhasi e-SASSA, Izindaba, Imihlahlandlela Nezinsuku Zokukhokha",
      metaDescription:
        "Phequlula amakhasi e-GrantCare ngezinsuku zokukhokha ze-SASSA, izindaba, usizo lwesimo, imihlahlandlela yezibonelelo, imibuzo ejwayelekile, nezindlela zokuxhumana ezisemthethweni.",
    },
  );

  return buildLocalizedMetadata({
    locale,
    path: "/sitemap",
    title: routeCopy.metaTitle,
    description: routeCopy.metaDescription,
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

  if (!isPublicLocale(locale)) {
    notFound();
  }

  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      home: "Home",
      paymentDates: "Payment dates",
      statusHelp: "Status help",
      eligibilityChecker: "Eligibility checker",
      news: "News",
      guides: "Guides",
      grantTypes: "Grant types",
      grantAmounts: "Grant amounts",
      claimChecker: "Claim checker",
      officeLocator: "Office locator",
      faq: "FAQ",
      contact: "Contact",
      privacy: "Privacy",
      disclaimer: "Disclaimer",
      terms: "Terms",
      editorialPolicy: "Editorial policy",
      cookiePolicy: "Cookie policy",
      xmlSitemap: "XML sitemap",
      paymentDatesLabel: (label: string) => `${label} payment dates`,
      grantPaymentDatesLabel: (grantName: string, label: string) => `${grantName} payment dates for ${label}`,
      eyebrow: "Sitemap",
      title: "All public GrantCare pages",
      intro: "Use this page to browse the main sections, payment-date archives, news, status help, grant pages, and guides. GrantCare is an independent information platform.",
      mainPagesTitle: "Main pages",
      grantPagesTitle: "Grant pages",
      statusPagesTitle: "Status pages",
      paymentDatePagesTitle: "Payment-date pages",
      guidePagesTitle: "Guide pages",
      newsPagesTitle: "News pages",
    },
    {
      home: "Ekhaya",
      paymentDates: "Izinsuku zokukhokha",
      statusHelp: "Usizo lwesimo",
      eligibilityChecker: "Isihloli sokufaneleka",
      news: "Izindaba",
      guides: "Imihlahlandlela",
      grantTypes: "Izinhlobo zezibonelelo",
      grantAmounts: "Amanani ezibonelelo",
      claimChecker: "Isihloli sezimangalo",
      officeLocator: "Isitholi samahhovisi",
      faq: "Imibuzo ejwayelekile",
      contact: "Xhumana nathi",
      privacy: "Ubumfihlo",
      disclaimer: "Isitatimende sokuzikhulula",
      terms: "Imigomo",
      editorialPolicy: "Inqubomgomo yokuhlela",
      cookiePolicy: "Inqubomgomo yamakhukhi",
      xmlSitemap: "Imephu yesayithi ye-XML",
      paymentDatesLabel: (label: string) => `Izinsuku zokukhokha zango-${label}`,
      grantPaymentDatesLabel: (grantName: string, label: string) => `Izinsuku zokukhokha ze-${grantName} zango-${label}`,
      eyebrow: "Imephu yesayithi",
      title: "Wonke amakhasi omphakathi e-GrantCare",
      intro: "Sebenzisa leli khasi ukuphequlula izigaba eziyinhloko, izingobo zezinsuku zokukhokha, izindaba, usizo lwesimo, amakhasi ezibonelelo, nemihlahlandlela. I-GrantCare iyinkundla yolwazi ezimele.",
      mainPagesTitle: "Amakhasi ayinhloko",
      grantPagesTitle: "Amakhasi ezibonelelo",
      statusPagesTitle: "Amakhasi esimo",
      paymentDatePagesTitle: "Amakhasi ezinsuku zokukhokha",
      guidePagesTitle: "Amakhasi emihlahlandlela",
      newsPagesTitle: "Amakhasi ezindaba",
    },
  );
  const [guides, newsArticles, grants, statuses, periods] = await Promise.all([
    listGuides(locale),
    listNewsArticles(locale),
    listPublicGrantTypes(locale),
    listStatusMeanings(locale),
    listPaymentPeriods(locale),
  ]);

  const mainPages = [
    { href: buildLocalePath(locale, "/"), label: routeCopy.home },
    { href: buildLocalePath(locale, "/payment-dates"), label: routeCopy.paymentDates },
    { href: buildLocalePath(locale, "/status"), label: routeCopy.statusHelp },
    { href: buildLocalePath(locale, "/eligibility-checker"), label: routeCopy.eligibilityChecker },
    { href: buildLocalePath(locale, "/news"), label: routeCopy.news },
    { href: buildLocalePath(locale, "/guides"), label: routeCopy.guides },
    { href: buildLocalePath(locale, "/grants"), label: routeCopy.grantTypes },
    { href: buildLocalePath(locale, "/grant-amounts"), label: routeCopy.grantAmounts },
    { href: buildLocalePath(locale, "/claim-checker"), label: routeCopy.claimChecker },
    { href: buildLocalePath(locale, "/sassa-office-locator"), label: routeCopy.officeLocator },
    ...SASSA_OFFICES.map((office) => ({
      href: buildLocalePath(locale, `/sassa-office-locator/${office.slug}`),
      label: office.name,
    })),
    { href: buildLocalePath(locale, "/faq"), label: routeCopy.faq },
    { href: buildLocalePath(locale, "/contact"), label: routeCopy.contact },
    { href: buildLocalePath(locale, "/privacy"), label: routeCopy.privacy },
    { href: buildLocalePath(locale, "/disclaimer"), label: routeCopy.disclaimer },
    { href: buildLocalePath(locale, "/terms"), label: routeCopy.terms },
    { href: buildLocalePath(locale, "/editorial-policy"), label: routeCopy.editorialPolicy },
    { href: buildLocalePath(locale, "/cookie-policy"), label: routeCopy.cookiePolicy },
    { href: "/sitemap.xml", label: routeCopy.xmlSitemap },
  ];

  const paymentPages = filterIndexablePaymentPeriods(periods).flatMap((period) => [
    {
      href: buildLocalePath(locale, `/payment-dates/${period.year}/${period.monthSlug}`),
      label: routeCopy.paymentDatesLabel(period.label),
    },
    ...period.entries.map((entry) => ({
      href: buildLocalePath(
        locale,
        `/payment-dates/${period.year}/${period.monthSlug}/${entry.grantSlug}`,
      ),
      label: routeCopy.grantPaymentDatesLabel(entry.grantName, period.label),
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

  const guidePages = filterIndexableGuides(guides).map((guide) => ({
    href: buildLocalePath(locale, `/guides/${guide.slug}`),
    label: guide.title,
  }));

  const newsPages = newsArticles.map((article) => ({
    href: buildLocalePath(locale, `/news/${article.slug}`),
    label: article.title,
  }));

  return (
    <div className="shell space-y-10 py-8 sm:py-10">
      <Section eyebrow={routeCopy.eyebrow} title={routeCopy.title}>
        <p className="max-w-3xl text-sm leading-7 text-muted sm:text-base">
          {routeCopy.intro}
        </p>
      </Section>

      <div className="grid gap-10 lg:grid-cols-2">
        <Section title={routeCopy.mainPagesTitle}>
          <LinkList items={mainPages} />
        </Section>
        <Section title={routeCopy.grantPagesTitle}>
          <LinkList items={grantPages} />
        </Section>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <Section title={routeCopy.statusPagesTitle}>
          <LinkList items={statusPages} />
        </Section>
        <Section title={routeCopy.paymentDatePagesTitle}>
          <LinkList items={paymentPages} />
        </Section>
      </div>

      <Section title={routeCopy.guidePagesTitle}>
        <div className="columns-1 gap-8 sm:columns-2 xl:columns-3">
          <LinkList items={guidePages} />
        </div>
      </Section>

      <Section title={routeCopy.newsPagesTitle}>
        <div className="columns-1 gap-8 sm:columns-2 xl:columns-3">
          <LinkList items={newsPages} />
        </div>
      </Section>
    </div>
  );
}
