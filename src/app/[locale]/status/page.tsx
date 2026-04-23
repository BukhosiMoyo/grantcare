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

  return buildLocalizedMetadata({
    locale,
    path: "/status",
    title: "SASSA Status Check Meanings for SRD, R350 and R370 Results",
    description:
      "Understand SASSA status check wording for SRD, R350, and R370 results, including Approved, Pending, Declined, Banking Issue, Identity Verification, and Reapplication Needed after an official status check.",
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
  const [statuses, faqs] = await Promise.all([
    listStatusMeanings(locale),
    listFaqs(locale),
  ]);
  const statusFaqs = faqs.slice(0, 5);
  const hubLinks = [
    {
      href: "/status/identity-verification",
      title: "Check identity verification meaning",
      description: "Open the identity verification status guide when the official wording says another identity check is still blocking progress.",
    },
    {
      href: "/status/banking-issue",
      title: "Check banking issue meaning",
      description: "Open the banking issue status guide when payment release depends on bank verification or a payment-method problem.",
    },
    {
      href: "/status/reapplication-needed",
      title: "Check reapplication needed meaning",
      description: "Open the reapplication-needed guide if the official wording points to a fresh application route instead of ordinary waiting.",
    },
    {
      href: "/guides/how-to-change-phone-number",
      title: "Change your phone number safely",
      description: "Read the phone-number guide if OTP, mismatch, or number-change issues are affecting your status.",
    },
    {
      href: "/guides/how-to-know-if-a-sassa-website-is-official",
      title: "Check if a SASSA website is official",
      description: "Use the website-safety guide before entering details on a copied status-check, verification, or reapplication link.",
    },
  ];

  const siteUrl = getSiteUrl();
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SASSA Status Meanings",
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
          { label: "Home", path: "/" },
          { label: "Status help", path: "/status" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <PageViewTracker name="page.viewed" locale={locale} />

      {/* ── 1. Hero Redesign ── */}
      <section className="flex flex-col items-center justify-center space-y-8 rounded-[2rem] bg-surface px-4 py-12 text-center shadow-sm sm:px-6 sm:py-20 lg:py-24">
        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tight text-primary sm:text-5xl lg:text-7xl">
            {copy.statusHelp}
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-muted sm:text-xl">
             Understand common official SASSA status-check wording for SRD, R350, and R370 searches. This page is not an official status checker.
          </p>
        </div>

        <div className="w-full max-w-2xl rounded-3xl bg-surface-strong p-2 shadow-inner sm:p-4 text-left">
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
      <Section title="Quick Utilities">
        <QuickCheckOptions />
      </Section>

      <InternalLinkGrid locale={locale} title="Related help" items={hubLinks} />

      {/* ── FAQ Section ── */}
      {statusFaqs.length > 0 ? (
        <Section title="Status Checks FAQ">
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
