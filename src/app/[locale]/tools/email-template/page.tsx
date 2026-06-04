import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink, Card, Section } from "@/components/ui";
import { PageViewTracker } from "@/components/page-view-tracker";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { buildLocalePath, isLocale } from "@/lib/site";
import { getEmailTemplateCopy } from "./copy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};
  const copy = getEmailTemplateCopy(locale);

  return buildLocalizedMetadata({
    locale,
    path: "/tools/email-template",
    title: copy.metadataTitle,
    description: copy.metadataDescription,
  });
}

export default async function EmailTemplateMarketingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();
  const copy = getEmailTemplateCopy(locale);

  return (
    <>
      <PageViewTracker name="page.viewed" locale={locale} />
      
      {/* ── Section 1: Hero ── */}
      <section className="space-y-6 pt-4 sm:pt-8 text-center max-w-3xl mx-auto">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm">
            {copy.eyebrow}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl leading-[1.15]">
            {copy.heroTitle}
          </h1>
          <p className="text-base leading-8 text-muted sm:text-lg max-w-2xl mx-auto">
            {copy.heroBody}
          </p>
        </div>
        <div className="flex justify-center pt-2">
          <ButtonLink href={buildLocalePath(locale, "/tools/email-template/builder")} className="px-8 py-3 text-lg">
            {copy.cta}
          </ButtonLink>
        </div>
      </section>

      {/* ── Section 2 & 3: Pain vs What They Get ── */}
      <Section title={copy.painTitle}>
        <div className="grid gap-6 sm:grid-cols-2 mt-4">
          <Card className="space-y-4 border-l-4 border-l-danger/80 bg-danger/5">
            <h3 className="text-lg font-semibold text-danger">{copy.painCardTitle}</h3>
            <ul className="space-y-3">
              {copy.painItems.map((item, i) => (
                <li key={i} className="flex gap-2 text-muted text-[15px]">
                  <span className="text-danger flex-shrink-0">✕</span> {item}
                </li>
              ))}
            </ul>
          </Card>
          
          <Card className="space-y-4 border-l-4 border-l-primary bg-primary/5">
            <h3 className="text-lg font-semibold text-primary">{copy.helpTitle}</h3>
            <p className="text-muted text-sm mb-2">{copy.helpBody}</p>
            <ul className="space-y-3">
              {copy.helpItems.map((item, i) => (
                <li key={i} className="flex gap-2 text-foreground font-medium text-[15px]">
                  <span className="text-primary flex-shrink-0">✓</span> {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* ── Section 4: How It Works ── */}
      <Section title={copy.howItWorksTitle}>
        <div className="grid gap-4 sm:grid-cols-3">
          {copy.steps.map((item) => (
            <Card key={item.step} className="space-y-3 text-center">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-lg font-bold mx-auto">
                {item.step}
              </span>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-[15px] leading-[1.7] text-muted">{item.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── Trust Builders ── */}
      <section className="py-8 border-y border-border/50 text-center space-y-3">
        <div className="flex justify-center gap-1 mb-2">
          {"⭐⭐⭐⭐⭐".split("").map((star, i) => <span key={i} className="text-accent">{star}</span>)}
        </div>
        <h3 className="text-xl font-semibold text-foreground">{copy.trustTitle}</h3>
        <p className="text-muted">{copy.trustBody}</p>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="text-center py-6 space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {copy.bottomTitle}
        </h2>
        <p className="text-muted max-w-lg mx-auto">
          {copy.bottomBody}
        </p>
        <ButtonLink href={buildLocalePath(locale, "/tools/email-template/builder")} className="px-8 py-3 text-lg">
          {copy.cta}
        </ButtonLink>
      </section>
    </>
  );
}
