import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { FaqSchema } from "@/components/faq-schema";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { PageViewTracker } from "@/components/page-view-tracker";
import { QuickCheckOptions } from "@/components/quick-check-options";
import { StatusPicker } from "@/components/status-picker";
import { Card, Section } from "@/components/ui";
import { listStatusMeanings, listFaqs } from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { getLocalizedRouteCopy } from "@/lib/homepage-content";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { buildLocalePath, isLocale } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      metaTitle: "SASSA Status Check Meanings for SRD, R350 and R370 Results",
      metaDescription:
        "Understand SASSA status check wording for SRD, R350, and R370 results, including Approved, Pending, Declined, Banking Issue, Identity Verification, and Reapplication Needed after an official status check.",
    },
    {
      metaTitle: "Izincazelo Zokuhlola Isimo se-SASSA zemiphumela ye-SRD, R350 ne-R370",
      metaDescription:
        "Qonda amagama okuhlola isimo se-SASSA emiphumeleni ye-SRD, R350, ne-R370, okuhlanganisa Approved, Pending, Declined, Banking Issue, Identity Verification, ne-Reapplication Needed ngemva kokuhlola isimo okusemthethweni.",
    },
  );

  return buildLocalizedMetadata({
    locale,
    path: "/status",
    title: routeCopy.metaTitle,
    description: routeCopy.metaDescription,
  });
}

export default async function StatusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);
  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      breadcrumbHome: "Home",
      breadcrumbStatusHelp: "Status help",
      hubIdentityTitle: "Check identity verification meaning",
      hubIdentityDescription: "Open the identity verification status guide when the official wording says another identity check is still blocking progress.",
      hubBankingTitle: "Check banking issue meaning",
      hubBankingDescription: "Open the banking issue status guide when payment release depends on bank verification or a payment-method problem.",
      hubReapplicationTitle: "Check reapplication needed meaning",
      hubReapplicationDescription: "Open the reapplication-needed guide if the official wording points to a fresh application route instead of ordinary waiting.",
      hubPhoneTitle: "Change your phone number safely",
      hubPhoneDescription: "Read the phone-number guide if OTP, mismatch, or number-change issues are affecting your status.",
      hubWebsiteTitle: "Check if a SASSA website is official",
      hubWebsiteDescription: "Use the website-safety guide before entering details on a copied status-check, verification, or reapplication link.",
      itemListName: "SASSA Status Meanings",
      heroDescription: "Understand common official SASSA status-check wording for SRD, R350, and R370 searches. This page is not an official status checker.",
      quickUtilitiesTitle: "Quick Utilities",
      relatedHelpTitle: "Related help",
      statusFaqTitle: "Status Checks FAQ",
    },
    {
      breadcrumbHome: "Ekhaya",
      breadcrumbStatusHelp: "Usizo lwesimo",
      hubIdentityTitle: "Hlola incazelo ye-identity verification",
      hubIdentityDescription: "Vula umhlahlandlela wesimo se-identity verification uma amagama asemthethweni ethi olunye uhlolo lobunikazi lusavimba inqubekela phambili.",
      hubBankingTitle: "Hlola incazelo ye-banking issue",
      hubBankingDescription: "Vula umhlahlandlela wesimo se-banking issue uma ukukhishwa kwenkokhelo kuncike ekuqinisekisweni kwebhange noma enkingeni yendlela yokukhokha.",
      hubReapplicationTitle: "Hlola incazelo ye-reapplication needed",
      hubReapplicationDescription: "Vula umhlahlandlela we-reapplication-needed uma amagama asemthethweni ekhomba indlela entsha yesicelo esikhundleni sokulinda okuvamile.",
      hubPhoneTitle: "Shintsha inombolo yakho yocingo ngokuphepha",
      hubPhoneDescription: "Funda umhlahlandlela wenombolo yocingo uma i-OTP, ukungafani, noma izinkinga zokushintsha inombolo kuthinta isimo sakho.",
      hubWebsiteTitle: "Hlola ukuthi iwebhusayithi ye-SASSA isemthethweni yini",
      hubWebsiteDescription: "Sebenzisa umhlahlandlela wokuphepha kwewebhusayithi ngaphambi kokufaka imininingwane kusixhumanisi esikopishiwe sokuhlola isimo, ukuqinisekisa, noma ukufaka kabusha isicelo.",
      itemListName: "Izincazelo Zezimo ze-SASSA",
      heroDescription: "Qonda amagama ajwayelekile asemthethweni okuhlola isimo se-SASSA ekusesheni kwe-SRD, R350, ne-R370. Leli khasi alisona isihloli sesimo esisemthethweni.",
      quickUtilitiesTitle: "Amathuluzi asheshayo",
      relatedHelpTitle: "Usizo oluhlobene",
      statusFaqTitle: "Imibuzo yokuhlola isimo",
    },
  );
  const [statuses, faqs] = await Promise.all([
    listStatusMeanings(locale),
    listFaqs(locale),
  ]);
  const statusFaqs = faqs.slice(0, 5);
  const hubLinks = [
    {
      href: "/status/identity-verification",
      title: routeCopy.hubIdentityTitle,
      description: routeCopy.hubIdentityDescription,
    },
    {
      href: "/status/banking-issue",
      title: routeCopy.hubBankingTitle,
      description: routeCopy.hubBankingDescription,
    },
    {
      href: "/status/reapplication-needed",
      title: routeCopy.hubReapplicationTitle,
      description: routeCopy.hubReapplicationDescription,
    },
    {
      href: "/guides/how-to-change-phone-number",
      title: routeCopy.hubPhoneTitle,
      description: routeCopy.hubPhoneDescription,
    },
    {
      href: "/guides/how-to-know-if-a-sassa-website-is-official",
      title: routeCopy.hubWebsiteTitle,
      description: routeCopy.hubWebsiteDescription,
    },
  ];

  const siteUrl = getSiteUrl();
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: routeCopy.itemListName,
    numberOfItems: statuses.length,
    itemListElement: statuses.map((status, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: status.title,
      url: new URL(buildLocalePath(locale, `/status/${status.slug}`), siteUrl).toString(),
    })),
  };

  return (
    <div className="space-y-12">
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: routeCopy.breadcrumbHome, path: "/" },
          { label: routeCopy.breadcrumbStatusHelp, path: "/status" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <PageViewTracker name="page.viewed" locale={locale} />

      {/* ── 1. Hero Redesign ── */}
      <section className="page-intro">
        <div className="space-y-4">
          <h1 className="page-title">
            {copy.statusHelp}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-muted">
             {routeCopy.heroDescription}
          </p>
        </div>

        <div className="w-full max-w-2xl">
          <StatusPicker
            locale={locale}
            statuses={statuses.map((status) => ({
              slug: status.slug,
              title: status.title,
            }))}
            statusLabel={copy.statusLabel}
            showLabel={copy.showLabel}
          />
        </div>
      </section>

      {/* ── 2. Status Dictionary ── */}
      <Section title={copy.statusListTitle}>
        <div className="grid gap-4 sm:grid-cols-2">
          {statuses.map((status) => (
            <Link key={status.slug} href={buildLocalePath(locale, `/status/${status.slug}`)}>
              <Card className="flex h-full flex-col space-y-2 transition-all hover:-translate-y-1 hover:border-primary/20 hover:bg-surface-muted hover:shadow-md">
                <h3 className="text-xl font-semibold bg-primary/5 px-2 py-1 rounded w-fit text-primary">{status.title}</h3>
                <p className="text-sm leading-7 text-muted">{status.meaning}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
      <Section title={routeCopy.quickUtilitiesTitle}>
        <QuickCheckOptions locale={locale} />
      </Section>

      <InternalLinkGrid locale={locale} title={routeCopy.relatedHelpTitle} items={hubLinks} />

      {/* ── FAQ Section ── */}
      {statusFaqs.length > 0 ? (
        <Section title={routeCopy.statusFaqTitle}>
          <FaqSchema faqs={statusFaqs} />
          <div className="space-y-4">
            {statusFaqs.map((faq) => (
              <details key={faq.question} className="group rounded-[1.5rem] border border-border bg-surface p-6 transition-colors hover:border-primary/20 hover:bg-surface-muted">
                <summary className="flex cursor-pointer items-center justify-between font-semibold tracking-tight text-foreground sm:text-lg">
                  {faq.question}
                  <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-strong transition-transform group-open:rotate-180">
                    ↓
                  </span>
                </summary>
                <div className="mt-4 text-sm leading-7 text-muted prose prose-sm prose-p:mb-4">
                  {faq.answer.split('\n').map((line, i) => (
                    line.trim() ? <p key={i}>{line}</p> : null
                  ))}
                </div>
              </details>
            ))}
          </div>
        </Section>
      ) : null}
    </div>
  );
}
