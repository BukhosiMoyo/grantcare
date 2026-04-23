import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
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
    title: "Independent SASSA Claim Checker for Grant, Status and Payment Rumours",
    description:
      "Use GrantCare's independent claim checker to test status updates, payment-date claims, grant increase stories, banking-update rumours, and reapplication warnings before you trust them.",
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
      href: "/status",
      title: "Check status meanings",
      description: "Open status meanings if the claim mixes real status wording with rumours, screenshots, or copied advice.",
    },
    {
      href: "/payment-dates",
      title: "Check payment dates",
      description: "Open payment dates if the claim is really about timing, release windows, or late-payment confusion.",
    },
    {
      href: "/guides/how-to-find-official-banking-and-verification-pages-safely",
      title: "Find official banking and verification pages",
      description: "Use the guide if a claim points you toward bank-detail updates or identity verification and you need the right official route.",
    },
    {
      href: "/guides/how-to-find-the-official-reapplication-page-safely",
      title: "Find the official reapplication page",
      description: "Use the guide if a claim says you must reapply and you need to separate the official route from unofficial pages.",
    },
    {
      href: "/guides/how-to-know-if-a-sassa-website-is-official",
      title: "Check if a SASSA website is official",
      description: "Open the guide if you need to check whether the page itself looks official.",
    },
  ];

  return (
    <div className="space-y-12">
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: "Home", path: "/" },
          { label: "Claim checker", path: "/claim-checker" },
        ]}
      />
      <PageViewTracker name="page.viewed" locale={locale} />

      <section className="flex flex-col items-center justify-center space-y-8 rounded-[2rem] bg-surface px-4 py-12 text-center shadow-sm sm:px-6 sm:py-20 lg:py-24">
        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tight text-primary sm:text-5xl lg:text-7xl">
            Claim checker
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            Check a status update, payment-date claim, grant increase story, or warning message before you trust it.
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
