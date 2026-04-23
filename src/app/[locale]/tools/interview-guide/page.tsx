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
    path: "/tools/interview-guide",
    title: "Interview Questions and Answers Guide (South Africa)",
    description: "Get personalized, AI-generated interview answers tailored to your job title and experience level. Build confidence and pass your interview.",
  });
}

export default async function InterviewGuideMarketingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  return (
    <>
      <PageViewTracker name="page.viewed" locale={locale} />
      
      {/* ── Section 1: Hero (First 3 seconds matter) ── */}
      <section className="space-y-6 pt-4 sm:pt-8 text-center max-w-3xl mx-auto">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm">
            AI-Powered Interview Prep
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl leading-[1.15]">
            Pass your next interview with answers tailored to you.
          </h1>
          <p className="text-base leading-8 text-muted sm:text-lg max-w-2xl mx-auto">
            Get a personalised interview guide based on your job, experience, and situation. Takes less than 60 seconds.
          </p>
        </div>
        <div className="flex justify-center pt-2">
          <ButtonLink href={buildLocalePath(locale, "/tools/interview-guide/builder")} className="px-8 py-3 text-lg">
            Start My Interview Guide
          </ButtonLink>
        </div>
      </section>

      {/* ── Section 2 & 3: The Pain + The Transformation ── */}
      <Section title="Stop guessing what they'll ask you.">
        <div className="grid gap-6 sm:grid-cols-2 mt-4">
          <Card className="space-y-4 border-l-4 border-l-danger/80 bg-danger/5">
            <h3 className="text-lg font-semibold text-danger">Without this guide</h3>
            <ul className="space-y-3">
              {[
                "Not sure what to say in interviews",
                "Feeling nervous and unprepared",
                "Don't have experience and don't know how to explain it",
                "Guessing what employers want to hear"
              ].map((item, i) => (
                <li key={i} className="flex gap-2 text-muted text-[15px]">
                  <span className="text-danger flex-shrink-0">✕</span> {item}
                </li>
              ))}
            </ul>
          </Card>
          
          <Card className="space-y-4 border-l-4 border-l-primary bg-primary/5">
            <h3 className="text-lg font-semibold text-primary">With your custom guide</h3>
            <ul className="space-y-3">
              {[
                "Confident, natural-sounding answers",
                "Clear structure using the STAR method",
                "Ready for any question they throw at you",
                "Knowing exactly what you bring to the table"
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
              title: "Tell us about the job",
              desc: "Your role, industry, and experience level — so we know exactly what you need.",
            },
            {
              step: "2",
              title: "Get your personalised guide",
              desc: "Our AI creates tailored questions, answers, and tips specific to your situation.",
            },
            {
              step: "3",
              title: "Walk into your interview prepared",
              desc: "Preview free questions, then unlock your full pack.",
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

      {/* ── Section 7: Trust Builders ── */}
      <section className="py-8 border-y border-border/50 text-center space-y-3">
        <div className="flex justify-center gap-1 mb-2">
          {"⭐⭐⭐⭐⭐".split("").map((star, i) => <span key={i} className="text-accent">{star}</span>)}
        </div>
        <h3 className="text-xl font-semibold text-foreground">Built to help real people get real jobs.</h3>
        <p className="text-muted">Used by job seekers across South Africa to build confidence.</p>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="text-center py-6 space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Ready to feel confident?
        </h2>
        <p className="text-muted max-w-lg mx-auto">
          One small investment to walk into your interview prepared. Less than the cost of transport to your interview — but could help you get the job.
        </p>
        <ButtonLink href={buildLocalePath(locale, "/tools/interview-guide/builder")} className="px-8 py-3 text-lg">
          Start My Interview Guide
        </ButtonLink>
      </section>
    </>
  );
}
