import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InternalLinkGrid } from "@/components/internal-link-grid";
import { PageViewTracker } from "@/components/page-view-tracker";
import { Card, Section } from "@/components/ui";
import { listFaqs } from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { isLocale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const currentYear = new Date().getUTCFullYear();

  return buildLocalizedMetadata({
    locale,
    path: "/faq",
    title: `SASSA FAQ ${currentYear}: Grants, Payment Dates and Status Check`,
    description:
      "Get quick answers about SASSA grants, payment dates, status checks, eligibility, and official next steps.",
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);
  const faqs = await listFaqs(locale);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  const hubLinks = [
    {
      href: "/payment-dates",
      title: copy.paymentDates,
      description: "Go straight to the payment-date hub if your question is about timing.",
    },
    {
      href: "/status",
      title: copy.statusHelp,
      description: "Open the status hub if your question starts with a status message.",
    },
    {
      href: "/eligibility-checker",
      title: copy.eligibilityChecker,
      description: "Use the checker when you want general guidance about where to start.",
    },
    {
      href: "/guides",
      title: copy.guides,
      description: "Read the full guide library for longer problem-solving help.",
    },
  ];

  return (
    <>
      <PageViewTracker name="page.viewed" locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Section eyebrow={copy.faq} title={copy.frequentlyAskedQuestionsTitle}>
        <div className="grid gap-3">
          {faqs.map((item) => (
            <Card key={item.question} className="space-y-2">
              <h2 className="text-xl font-semibold">{item.question}</h2>
              <p className="text-sm text-muted">{item.answer}</p>
            </Card>
          ))}
        </div>
      </Section>
      <InternalLinkGrid locale={locale} title="Helpful next pages" items={hubLinks} />
    </>
  );
}
