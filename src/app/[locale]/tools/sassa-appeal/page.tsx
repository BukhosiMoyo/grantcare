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
    path: "/tools/sassa-appeal",
    title: "SASSA Appeal Letter Builder | Draft Your Grant Appeal",
    description:
      "Create a formal appeal letter draft for a rejected SASSA SRD R370, Disability, or Child Support grant, then submit it yourself through the official appeal route.",
  });
}

export default async function SassaAppealMarketingPage({
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
            SASSA Independent Tribunal Appeals
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl leading-[1.15]">
            Was your SASSA grant rejected unfairly?
          </h1>
          <p className="text-base leading-8 text-muted sm:text-lg max-w-2xl mx-auto">
            Stop struggling with what to say. Generate a formal, professional appeal letter draft in 60 seconds, then submit it yourself through the official appeal route.
          </p>
        </div>
        <div className="flex justify-center pt-2">
          <ButtonLink href={buildLocalePath(locale, "/tools/sassa-appeal/builder")} className="px-8 py-3 text-lg">
            Draft My Appeal Letter
          </ButtonLink>
        </div>
      </section>

      {/* ── Section 2: Rejection Reasons ── */}
      <Section title="We help overturn common SRD rejections.">
        <div className="grid gap-6 sm:grid-cols-2 mt-4">
          <Card className="space-y-4 border-l-4 border-l-danger/80 bg-danger/5">
            <h3 className="text-lg font-semibold text-danger">Did you get one of these statuses?</h3>
            <ul className="space-y-3">
              {[
                `"Alternative Income Source Identified"`,
                `"UIF Registered" (Even if you haven't worked in years)`,
                `"Identify Verification Failed"`,
                `"NSFAS Registered" (When you aren't a student)`
              ].map((item, i) => (
                <li key={i} className="flex gap-2 text-muted text-[15px]">
                  <span className="text-danger flex-shrink-0">✕</span> {item}
                </li>
              ))}
            </ul>
          </Card>
          
          <Card className="space-y-4 border-l-4 border-l-primary bg-primary/5">
            <h3 className="text-lg font-semibold text-primary">How our letter helps you</h3>
            <p className="text-muted text-sm mb-2">The Tribunal requires a formal written defense. We give you exactly what they want to see.</p>
            <ul className="space-y-3">
              {[
                "Properly addressed to the Independent Tribunal",
                "Includes your ID and Grant Type correctly",
                "Explains your financial situation formally",
                "Tells you exactly which affidavits/documents to attach"
              ].map((item, i) => (
                <li key={i} className="flex gap-2 text-foreground font-medium text-[15px]">
                  <span className="text-primary flex-shrink-0">✓</span> {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* ── Section 3: How It Works ── */}
      <Section title="How it works">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Tell us the problem",
              desc: "Select your grant and the exact reason SASSA rejected you.",
            },
            {
              step: "2",
              title: "Explain your side",
              desc: "Briefly tell us why they are wrong. Don't worry about sounding fancy, we'll fix it.",
            },
            {
              step: "3",
              title: "Get your appeal draft",
              desc: "We generate a formal appeal letter draft you can review before submission.",
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

      {/* ── Bottom CTA ── */}
      <section className="text-center py-6 space-y-5 border-t border-border/50 mt-12 pt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Don&apos;t wait 90 days.
        </h2>
        <p className="text-muted max-w-lg mx-auto">
          You only have a limited time to appeal a rejection. Let us help you prepare a strong defense today.
        </p>
        <ButtonLink href={buildLocalePath(locale, "/tools/sassa-appeal/builder")} className="px-8 py-3 text-lg">
          Draft My Appeal Letter
        </ButtonLink>
      </section>
    </>
  );
}
