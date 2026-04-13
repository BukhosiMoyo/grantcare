import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InternalLinkGrid } from "@/components/internal-link-grid";
import { PageViewTracker } from "@/components/page-view-tracker";
import { EligibilityChecker } from "@/components/eligibility-checker";
import { Card, Section } from "@/components/ui";
import { FaqSchema } from "@/components/faq-schema";
import { listPublicGrantTypes, listFaqs } from "@/lib/content";
import { getCopy } from "@/lib/copy";
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
    path: "/eligibility-checker",
    title: "SASSA Eligibility Checker — Find the Right Grant",
    description:
      "Answer a few questions to find which SASSA grant you may qualify for. Free guidance for Older Persons, Disability, Child Support, and SRD grants.",
  });
}

export default async function EligibilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);
  const [grants, faqs] = await Promise.all([
    listPublicGrantTypes(locale),
    listFaqs(locale),
  ]);
  const eligibilityFaqs = faqs.slice(0, 5);
  const hubLinks = [
    {
      href: "/grants",
      title: copy.grantTypesTitle,
      description: "Compare grant pages if you want to read checks and documents side by side.",
    },
    {
      href: "/payment-dates",
      title: copy.paymentDates,
      description: "Open payment dates after you know which grant category you need to follow.",
    },
    {
      href: "/status",
      title: copy.statusHelp,
      description: "Use status help if your question is about wording, not eligibility.",
    },
    {
      href: "/guides/how-to-prepare-before-applying",
      title: "Prepare before applying",
      description: "Read the preparation guide if you want a calmer application checklist before using official channels.",
    },
  ];

  return (
    <div className="space-y-12">
      <PageViewTracker name="page.viewed" locale={locale} />

      {/* ── 1. Hero Redesign ── */}
      <section className="flex flex-col items-center justify-center space-y-8 rounded-[2rem] bg-surface px-4 py-12 text-center shadow-sm sm:px-6 sm:py-20 lg:py-24">
        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tight text-primary sm:text-5xl lg:text-7xl">
            {copy.eligibilityTitle}
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            {copy.eligibilityIntro}
          </p>
        </div>

        <div className="w-full max-w-3xl rounded-3xl bg-surface-strong p-2 shadow-inner sm:p-4 text-left">
          <EligibilityChecker locale={locale} grants={grants} />
        </div>
      </section>

      {/* ── 2. Grant Types List ── */}
      <Section title={copy.grantTypesTitle}>
        <div className="grid gap-4 sm:grid-cols-2">
          {grants.map((grant) => (
            <Link key={grant.slug} href={buildLocalePath(locale, `/grants/${grant.slug}`)}>
              <Card className="flex h-full flex-col space-y-2 transition-all hover:-translate-y-1 hover:border-primary/20 hover:bg-surface-muted hover:shadow-md">
                <h3 className="text-xl font-semibold bg-primary/5 px-2 py-1 rounded w-fit text-primary">{grant.name}</h3>
                <p className="text-sm leading-7 text-muted">{grant.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
      <InternalLinkGrid locale={locale} title="Next pages to open" items={hubLinks} />

      {/* ── FAQ Section ── */}
      {eligibilityFaqs.length > 0 ? (
        <Section title="Eligibility FAQ">
          <FaqSchema faqs={eligibilityFaqs} />
          <div className="space-y-4">
            {eligibilityFaqs.map((faq) => (
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
