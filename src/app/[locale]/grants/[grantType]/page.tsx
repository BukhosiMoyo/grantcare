import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InternalLinkGrid } from "@/components/internal-link-grid";
import { TrackedExternalLink } from "@/components/tracked-external-link";
import { ButtonLink, Card, Section } from "@/components/ui";
import {
  getGrantBySlug,
  getPaymentRouteDefaults,
  listRelatedGrantTypes,
  listRelatedGuides,
  listStatusMeanings,
} from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { buildLocalePath, isLocale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; grantType: string }>;
}): Promise<Metadata> {
  const { locale, grantType } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const grant = await getGrantBySlug(locale, grantType);

  if (!grant) {
    return {};
  }

  return buildLocalizedMetadata({
    locale,
    path: `/grants/${grantType}`,
    title: grant.name,
    description: grant.summary,
  });
}

export default async function GrantDetailPage({
  params,
}: {
  params: Promise<{ locale: string; grantType: string }>;
}) {
  const { locale, grantType } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);
  const [grant, relatedGuides, relatedGrants, statuses, paymentDefaults] = await Promise.all([
    getGrantBySlug(locale, grantType),
    listRelatedGuides(locale, 2, undefined, grantType),
    listRelatedGrantTypes(locale, grantType, 3),
    listStatusMeanings(locale),
    getPaymentRouteDefaults(locale),
  ]);

  if (!grant) {
    notFound();
  }

  const paymentGrantSlug = grant.showInPaymentTool ? grant.slug : grant.paymentGroupSlug;
  const paymentDatesHref = paymentGrantSlug
    ? buildLocalePath(
        locale,
        `/payment-dates/${paymentDefaults.year}/${paymentDefaults.monthSlug}/${paymentGrantSlug}`,
      )
    : buildLocalePath(locale, "/payment-dates");
  const hubLinks = statuses.slice(0, 4).map((status) => ({
    href: `/status/${status.slug}`,
    title: status.title,
    description: status.meaning,
  }));

  return (
    <div className="space-y-8">
      <Section eyebrow={copy.eligibility} title={grant.name}>
        <Card className="space-y-6">
          <p className="max-w-2xl text-base text-muted">{grant.summary}</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="font-semibold">{copy.whoItMayFit}</p>
              <ul className="space-y-2 text-sm text-muted">
                {grant.checks.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">{copy.documents}</p>
              <ul className="space-y-2 text-sm text-muted">
                {grant.documents.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <TrackedExternalLink
              href={grant.officialHref}
              locale={locale}
              eventName="official_resource.clicked"
              eventPayload={{
                destination: "grant",
                grantSlug: grant.slug,
              }}
              target="_blank"
              rel="noreferrer"
              className="primary-action focus-ring tap-target inline-flex items-center justify-center rounded-full bg-primary px-5 text-base font-semibold text-white hover:bg-primary-strong"
            >
              {copy.officialNextStep}
            </TrackedExternalLink>
            <ButtonLink href={buildLocalePath(locale, "/eligibility-checker")} variant="secondary">
              {copy.eligibility}
            </ButtonLink>
            <ButtonLink href={paymentDatesHref} variant="secondary">
              Payment dates
            </ButtonLink>
          </div>
        </Card>
      </Section>

      <Section title={copy.relatedGuidesTitle}>
        <div className="grid gap-4 md:grid-cols-2">
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

      <InternalLinkGrid locale={locale} title={copy.relatedStatusesTitle} items={hubLinks} columns="md:grid-cols-2" />

      <Section title={copy.otherGrantsTitle}>
        <div className="grid gap-4 md:grid-cols-3">
          {relatedGrants.map((relatedGrant) => (
            <Link key={relatedGrant.slug} href={buildLocalePath(locale, `/grants/${relatedGrant.slug}`)}>
              <Card className="space-y-2">
                <h3 className="text-xl font-semibold">{relatedGrant.name}</h3>
                <p className="text-sm text-muted">{relatedGrant.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
