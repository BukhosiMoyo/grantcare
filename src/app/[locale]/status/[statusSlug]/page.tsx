import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { PageViewTracker } from "@/components/page-view-tracker";
import { TrackedExternalLink } from "@/components/tracked-external-link";
import { ButtonLink, Card, Section } from "@/components/ui";
import {
  getStatusMeaningBySlug,
  listRelatedGuides,
  listRelatedStatuses,
} from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { buildLocalePath, isLocale } from "@/lib/site";

function getStatusGuidePath(statusSlug: string) {
  switch (statusSlug) {
    case "declined":
      return "/guides/how-to-fix-declined-status";
    case "pending":
      return "/guides/why-is-my-status-pending";
    case "approved":
      return "/guides/what-to-do-after-approval";
    case "identity-verification":
      return "/guides/identity-verification-required-meaning";
    case "banking-issue":
      return "/guides/how-to-update-banking-details";
    case "reapplication-needed":
      return "/guides/reapplication-needed-meaning";
    case "payment-failed":
      return "/guides/how-to-fix-missing-payment-issues";
    default:
      return "/guides/how-to-check-your-status";
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; statusSlug: string }>;
}): Promise<Metadata> {
  const { locale, statusSlug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const status = await getStatusMeaningBySlug(locale, statusSlug);

  if (!status) {
    return {};
  }

  return buildLocalizedMetadata({
    locale,
    path: `/status/${statusSlug}`,
    title: `SASSA Status "${status.title}" Meaning — What to Do Next`,
    description: `Your SASSA status shows "${status.title}". Learn what it means, possible causes, common fixes, and your next steps.`,
  });
}

export default async function StatusDetailPage({
  params,
}: {
  params: Promise<{ locale: string; statusSlug: string }>;
}) {
  const { locale, statusSlug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);
  const [status, relatedGuides, relatedStatuses] = await Promise.all([
    getStatusMeaningBySlug(locale, statusSlug),
    listRelatedGuides(locale, 2, undefined, statusSlug),
    listRelatedStatuses(locale, statusSlug, 3),
  ]);

  if (!status) {
    notFound();
  }

  const howToSteps = [
    ...status.fixes.map((fix, i) => ({
      "@type": "HowToStep" as const,
      position: i + 1,
      name: fix,
      text: fix,
    })),
    ...status.nextSteps.map((step, i) => ({
      "@type": "HowToStep" as const,
      position: status.fixes.length + i + 1,
      name: step,
      text: step,
    })),
  ];

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to fix SASSA "${status.title}" status`,
    description: status.meaning,
    step: howToSteps,
    totalTime: "PT30M",
  };

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: "Home", path: "/" },
          { label: "Status help", path: "/status" },
          { label: status.title, path: `/status/${statusSlug}` },
        ]}
      />
      <PageViewTracker
        name="status.viewed"
        locale={locale}
        payload={{
          statusSlug,
        }}
      />
      <Section eyebrow={copy.statusHelp} title={status.title}>
        <Card className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{copy.meaningLabel}</p>
            <p className="text-lg text-foreground">{status.meaning}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <p className="font-semibold">{copy.possibleCauses}</p>
              <ul className="space-y-2 text-sm text-muted">
                {status.causes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">{copy.commonFixes}</p>
              <ul className="space-y-2 text-sm text-muted">
                {status.fixes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">{copy.nextSteps}</p>
              <ul className="space-y-2 text-sm text-muted">
                {status.nextSteps.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <TrackedExternalLink
              href={status.officialHref}
              locale={locale}
              eventName="official_resource.clicked"
              eventPayload={{
                destination: "status",
                statusSlug,
              }}
              target="_blank"
              rel="noreferrer"
              className="primary-action focus-ring tap-target inline-flex items-center justify-center rounded-full bg-primary px-5 text-base font-semibold text-white hover:bg-primary-strong"
            >
              {copy.officialLink}
            </TrackedExternalLink>
            <ButtonLink href={buildLocalePath(locale, getStatusGuidePath(statusSlug))} variant="secondary">
              {copy.readGuide}
            </ButtonLink>
          </div>
        </Card>
      </Section>

      <Section title={copy.relatedStatusesTitle}>
        <div className="grid gap-3 md:grid-cols-3">
          {relatedStatuses.map((relatedStatus) => (
            <Link key={relatedStatus.slug} href={buildLocalePath(locale, `/status/${relatedStatus.slug}`)}>
              <Card className="space-y-2">
                <h3 className="text-xl font-semibold">{relatedStatus.title}</h3>
                <p className="text-sm text-muted">{relatedStatus.meaning}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section title={copy.relatedGuidesTitle}>
        <div className="grid gap-3 md:grid-cols-2">
          {relatedGuides.map((guide) => (
            <Link key={guide.slug} href={buildLocalePath(locale, `/guides/${guide.slug}`)}>
              <Card className="space-y-2">
                <h3 className="text-xl font-semibold">{guide.title}</h3>
                <p className="text-sm text-muted">{guide.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
