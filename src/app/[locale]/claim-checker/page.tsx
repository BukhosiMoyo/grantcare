import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ClaimChecker } from "@/components/claim-checker";
import { InternalLinkGrid } from "@/components/internal-link-grid";
import { PageViewTracker } from "@/components/page-view-tracker";
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

  return buildLocalizedMetadata({
    locale,
    path: "/claim-checker",
    title: "SASSA Claim Checker — Is This Grant, Increase or Payment Story Real?",
    description:
      "Use the SASSA claim checker to test grant claims, increase updates, payment stories, and warning messages before you trust them.",
  });
}

export default async function ClaimCheckerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const hubLinks = [
    {
      href: "/grant-amounts",
      title: "Grant amounts",
      description: "Open the amount hub if the claim uses a number and you need the current official amount context.",
    },
    {
      href: "/grants",
      title: "Grant types",
      description: "Open grant pages if you need the real grant category behind the claim.",
    },
    {
      href: "/payment-dates",
      title: "Payment dates",
      description: "Open payment dates if the story is really about timing or late payment wording.",
    },
    {
      href: "/guides/how-to-know-if-a-sassa-website-is-official",
      title: "Website safety",
      description: "Open the guide if you need to check whether the page itself looks official.",
    },
  ];

  return (
    <div className="space-y-12">
      <PageViewTracker name="page.viewed" locale={locale} />

      <section className="flex flex-col items-center justify-center space-y-8 rounded-[2rem] bg-surface px-4 py-12 text-center shadow-sm sm:px-6 sm:py-20 lg:py-24">
        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tight text-primary sm:text-5xl lg:text-7xl">
            Claim checker
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            Check a grant claim, increase update, payment story, or warning message before you trust it.
          </p>
        </div>

        <div className="w-full max-w-3xl rounded-3xl bg-surface-strong p-2 text-left shadow-inner sm:p-4">
          <ClaimChecker locale={locale} />
        </div>
      </section>

      <InternalLinkGrid locale={locale} title="Related routes" items={hubLinks} />
    </div>
  );
}
