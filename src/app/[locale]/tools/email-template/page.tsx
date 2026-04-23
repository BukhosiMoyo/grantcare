import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink, Card, Section } from "@/components/ui";
import { PageViewTracker } from "@/components/page-view-tracker";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { buildLocalePath, isLocale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};

  return buildLocalizedMetadata({
    locale,
    path: "/tools/email-template",
    title: "Job Email Template Generator (South Africa)",
    description: "Write the perfect cover letter, follow-up, or networking email in 60 seconds with our AI generator.",
  });
}

export default async function EmailTemplateMarketingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  return (
    <>
      <PageViewTracker name="page.viewed" locale={locale} />
      
      {/* ── Section 1: Hero ── */}
      <section className="space-y-6 pt-4 sm:pt-8 text-center max-w-3xl mx-auto">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm">
            Professional Job Email Writer
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl leading-[1.15]">
            Send a professional job email in seconds.
          </h1>
          <p className="text-base leading-8 text-muted sm:text-lg max-w-2xl mx-auto">
            No more guessing what to say — get a ready-to-send email that makes a strong impression.
          </p>
        </div>
        <div className="flex justify-center pt-2">
          <ButtonLink href={buildLocalePath(locale, "/tools/email-template/builder")} className="px-8 py-3 text-lg">
            Create My Email
          </ButtonLink>
        </div>
      </section>

      {/* ── Section 2 & 3: Pain vs What They Get ── */}
      <Section title="Don't mess up your chances because of a bad email.">
        <div className="grid gap-6 sm:grid-cols-2 mt-4">
          <Card className="space-y-4 border-l-4 border-l-danger/80 bg-danger/5">
            <h3 className="text-lg font-semibold text-danger">Do you do this?</h3>
            <ul className="space-y-3">
              {[
                "Sending blank emails with just a CV attached?",
                "Not sure what to write to employers?",
                "Worried about sounding unprofessional or desperate?",
                "Wasting hours writing one simple follow-up?"
              ].map((item, i) => (
                <li key={i} className="flex gap-2 text-muted text-[15px]">
                  <span className="text-danger flex-shrink-0">✕</span> {item}
                </li>
              ))}
            </ul>
          </Card>
          
          <Card className="space-y-4 border-l-4 border-l-primary bg-primary/5">
            <h3 className="text-lg font-semibold text-primary">What we give you</h3>
            <p className="text-muted text-sm mb-2">We help you write emails that sound clean, confident, and professional.</p>
            <ul className="space-y-3">
              {[
                "Proper subject line options",
                "Structured, polite message",
                "Professional tone matching your experience",
                "Ready to copy, paste, and send instantly"
              ].map((item, i) => (
                <li key={i} className="flex gap-2 text-foreground font-medium text-[15px]">
                  <span className="text-primary flex-shrink-0">✓</span> {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* ── Section 4: How It Works ── */}
      <Section title="How it works">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Choose your email type",
              desc: "Is it a job application? A follow-up? We cover all scenarios.",
            },
            {
              step: "2",
              title: "Add your details",
              desc: "Job role, company name, your experience, and desired tone.",
            },
            {
              step: "3",
              title: "Get your email instantly",
              desc: "Preview your free starter template, then unlock all variations.",
            },
          ].map((item) => (
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
        <h3 className="text-xl font-semibold text-foreground">Drafted for the South African job market.</h3>
        <p className="text-muted">Land more interviews by looking like a serious professional.</p>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="text-center py-6 space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Get your complete, ready-to-send email
        </h2>
        <p className="text-muted max-w-lg mx-auto">
          Less than the cost of data — but helps you make a strong first impression. One small step to sound professional and stand out.
        </p>
        <ButtonLink href={buildLocalePath(locale, "/tools/email-template/builder")} className="px-8 py-3 text-lg">
          Create My Email
        </ButtonLink>
      </section>
    </>
  );
}
