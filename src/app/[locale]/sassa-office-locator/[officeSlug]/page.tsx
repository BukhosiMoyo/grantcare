import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { PageViewTracker } from "@/components/page-view-tracker";
import { Card, Pill, Section } from "@/components/ui";
import { getLocalizedRouteCopy } from "@/lib/homepage-content";
import { buildLocalizedMetadata } from "@/lib/metadata";
import {
  getSassaOfficeBySlug,
  getSassaOfficeCopy,
  getSassaOfficeDirectionsUrl,
  getSassaOfficeMapSearchUrl,
  SASSA_OFFICES,
} from "@/lib/sassa-offices";
import { buildLocalePath, getPublicLocales, isLocale, type Locale } from "@/lib/site";

export function generateStaticParams() {
  return getPublicLocales().flatMap((locale) =>
    SASSA_OFFICES.map((office) => ({
      locale: locale.code,
      officeSlug: office.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; officeSlug: string }>;
}): Promise<Metadata> {
  const { locale, officeSlug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const office = getSassaOfficeBySlug(officeSlug);

  if (!office) {
    return {};
  }

  return buildLocalizedMetadata({
    locale,
    path: `/sassa-office-locator/${office.slug}`,
    title: `${office.name}: Address, Phone and Directions`,
    description: `${office.name} contact details, address, phone number, source, and directions for ${office.city}, ${office.province}.`,
  });
}

function formatVerifiedDate(value: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default async function SassaOfficeDetailPage({
  params,
}: {
  params: Promise<{ locale: string; officeSlug: string }>;
}) {
  const { locale, officeSlug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const office = getSassaOfficeBySlug(officeSlug);

  if (!office) {
    notFound();
  }

  const copy = getSassaOfficeCopy(locale);
  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      breadcrumbHome: "Home",
      breadcrumbLocator: "Office locator",
      address: "Address",
      contact: "Contact",
      services: "Services",
      map: "Map",
    },
    {
      breadcrumbHome: "Ekhaya",
      breadcrumbLocator: "Isitholi samahhovisi",
      address: "Ikheli",
      contact: "Xhumana nabo",
      services: "Amasevisi",
      map: "Imephu",
    },
  );
  const officeSchema = {
    "@context": "https://schema.org",
    "@type": "GovernmentOffice",
    name: office.name,
    telephone: office.phone,
    email: office.email,
    address: office.address,
    url: buildLocalePath(locale as Locale, `/sassa-office-locator/${office.slug}`),
    geo: {
      "@type": "GeoCoordinates",
      latitude: office.latitude,
      longitude: office.longitude,
    },
  };

  return (
    <div className="space-y-8">
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: routeCopy.breadcrumbHome, path: "/" },
          { label: routeCopy.breadcrumbLocator, path: "/sassa-office-locator" },
          { label: office.name, path: `/sassa-office-locator/${office.slug}` },
        ]}
      />
      <PageViewTracker name="page.viewed" locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(officeSchema) }}
      />

      <Section headingAs="h1" eyebrow={office.province} title={office.name}>
        <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
          <Card className="space-y-5">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
                {routeCopy.address}
              </p>
              <p className="text-base leading-8 text-foreground">{office.address}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
                {routeCopy.contact}
              </p>
              <div className="grid gap-1 text-sm leading-7 text-muted">
                <a href={`tel:${office.phone.replace(/\D/g, "")}`} className="hover:text-primary">
                  {office.phone}
                </a>
                {office.email ? (
                  <a href={`mailto:${office.email}`} className="hover:text-primary">
                    {office.email}
                  </a>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
                {routeCopy.services}
              </p>
              <div className="flex flex-wrap gap-2">
                {office.services.map((service) => (
                  <Pill key={service}>{service}</Pill>
                ))}
                <Pill>{copy.noRecentReport}</Pill>
              </div>
            </div>

            <div className="grid gap-1 text-sm text-muted">
              <p>
                <span className="font-semibold text-foreground">{copy.lastVerified}:</span>{" "}
                {formatVerifiedDate(office.lastVerified)}
              </p>
              <p>
                <span className="font-semibold text-foreground">{copy.source}:</span>{" "}
                <a
                  href={office.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-primary hover:text-primary-strong"
                >
                  {office.sourceLabel}
                </a>
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={`tel:${office.phone.replace(/\D/g, "")}`}
                className="focus-ring tap-target inline-flex items-center justify-center rounded-full border border-border bg-surface px-4 text-sm font-semibold hover:bg-surface-muted"
              >
                {copy.call}
              </a>
              <a
                href={getSassaOfficeDirectionsUrl(office)}
                target="_blank"
                rel="noreferrer"
                className="primary-action focus-ring tap-target inline-flex items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold hover:bg-primary-strong"
              >
                {copy.directions}
              </a>
            </div>
          </Card>

          <Card className="space-y-3 self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
              {routeCopy.map}
            </p>
            <iframe
              title={office.name}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${office.longitude - 0.015},${office.latitude - 0.015},${office.longitude + 0.015},${office.latitude + 0.015}&layer=mapnik&marker=${office.latitude},${office.longitude}`}
              className="min-h-64 w-full overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-strong"
              loading="lazy"
            />
            <a
              href={getSassaOfficeMapSearchUrl(office)}
              target="_blank"
              rel="noreferrer"
              className="focus-ring tap-target inline-flex items-center justify-center rounded-full border border-border bg-surface px-4 text-sm font-semibold hover:bg-surface-muted"
            >
              {copy.directions}
            </a>
          </Card>
        </div>
      </Section>
    </div>
  );
}
