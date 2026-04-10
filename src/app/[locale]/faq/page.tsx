import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageViewTracker } from "@/components/page-view-tracker";
import { Card, Section } from "@/components/ui";
import { listFaqs } from "@/lib/content";
import { getCopy } from "@/lib/copy";
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

  const copy = getCopy(locale);

  return {
    title: copy.faq,
    alternates: {
      canonical: `/${locale}/faq`,
    },
  };
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

  return (
    <>
      <PageViewTracker name="page.viewed" locale={locale} />
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
    </>
  );
}
