import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { PageViewTracker } from "@/components/page-view-tracker";
import { SassaOfficeLocator } from "@/components/sassa-office-locator";
import { Section } from "@/components/ui";
import { getLocalizedRouteCopy } from "@/lib/homepage-content";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { SASSA_OFFICES } from "@/lib/sassa-offices";
import { buildLocalePath, isLocale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      metaTitle: "SASSA Office Locator: Find Contacts, Addresses and Directions",
      metaDescription:
        "Find SASSA office contact details, addresses, directions, and verified regional support points in South Africa.",
    },
    {
      metaTitle: "Isitholi Samahhovisi e-SASSA: Oxhumana Nabo, Amakheli Nezikhombisi-ndlela",
      metaDescription:
        "Thola imininingwane yokuxhumana yamahhovisi e-SASSA, amakheli, izikhombisi-ndlela, nezindawo zesifunda eziqinisekisiwe eNingizimu Afrika.",
    },
  );

  return buildLocalizedMetadata({
    locale,
    path: "/sassa-office-locator",
    title: routeCopy.metaTitle,
    description: routeCopy.metaDescription,
  });
}

export default async function SassaOfficeLocatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      breadcrumbHome: "Home",
      breadcrumbLocator: "Office locator",
      eyebrow: "SASSA offices",
      title: "SASSA office locator",
      intro: "Search official regional SASSA contacts, addresses, and directions.",
      schemaName: "SASSA Office Locator",
      schemaDescription: "SASSA regional office contact details, addresses, and directions.",
    },
    {
      breadcrumbHome: "Ekhaya",
      breadcrumbLocator: "Isitholi samahhovisi",
      eyebrow: "Amahhovisi e-SASSA",
      title: "Isitholi samahhovisi e-SASSA",
      intro: "Sesha oxhumana nabo besifunda be-SASSA, amakheli, nezikhombisi-ndlela.",
      schemaName: "Isitholi Samahhovisi e-SASSA",
      schemaDescription: "Imininingwane yokuxhumana yamahhovisi esifunda e-SASSA, amakheli, nezikhombisi-ndlela.",
    },
  );
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: routeCopy.schemaName,
    description: routeCopy.schemaDescription,
    itemListElement: SASSA_OFFICES.map((office, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: buildLocalePath(locale, `/sassa-office-locator/${office.slug}`),
      item: {
        "@type": "GovernmentOffice",
        name: office.name,
        telephone: office.phone,
        email: office.email,
        address: office.address,
        geo: {
          "@type": "GeoCoordinates",
          latitude: office.latitude,
          longitude: office.longitude,
        },
      },
    })),
  };

  return (
    <div className="space-y-8">
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: routeCopy.breadcrumbHome, path: "/" },
          { label: routeCopy.breadcrumbLocator, path: "/sassa-office-locator" },
        ]}
      />
      <PageViewTracker name="page.viewed" locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <Section eyebrow={routeCopy.eyebrow} title={routeCopy.title}>
        <p className="max-w-3xl text-base leading-8 text-muted">{routeCopy.intro}</p>
      </Section>

      <SassaOfficeLocator locale={locale} />
    </div>
  );
}
