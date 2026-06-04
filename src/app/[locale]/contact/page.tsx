import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { OfficialContactGrid } from "@/components/official-contact-grid";
import { QuickCheckOptions } from "@/components/quick-check-options";
import { Card, Section } from "@/components/ui";
import { WhatsAppChannelBanner } from "@/components/whatsapp-channel";
import { getLocalizedRouteCopy } from "@/lib/homepage-content";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { LEGAL_LINKS } from "@/lib/official-resources";
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

  const currentYear = new Date().getUTCFullYear();
  const routeCopy = getLocalizedRouteCopy(
    locale,
    {
      metaTitle: `SASSA Contact Details ${currentYear}: Phone Number and Offices`,
      metaDescription:
        "Get the official SASSA phone number, email, office details, and portal links in one place.",
    },
    {
      metaTitle: `Imininingwane Yokuxhumana ne-SASSA ${currentYear}: Inombolo Yocingo Namahhovisi`,
      metaDescription:
        "Thola inombolo yocingo esemthethweni ye-SASSA, i-imeyili, imininingwane yamahhovisi, nezixhumanisi zephothali endaweni eyodwa.",
    },
  );

  return buildLocalizedMetadata({
    locale,
    path: "/contact",
    title: routeCopy.metaTitle,
    description: routeCopy.metaDescription,
  });
}

export default async function ContactPage({
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
      breadcrumbContact: "Contact",
      schemaName: "SASSA Contact Details",
      schemaDescription: "Official SASSA contact numbers, portal, email, and office details.",
      eyebrow: "Contact",
      quickCheckOptionsTitle: "Quick check options",
      officialContactsTitle: "Official contacts",
      officialContactsIntro: "Use these official SASSA channels when you need an official action, official answer, or official portal.",
      stayUpdatedTitle: "Stay updated",
      relatedPagesTitle: "Related pages",
      legalLinkTranslations: {},
    },
    {
      breadcrumbHome: "Ekhaya",
      breadcrumbContact: "Xhumana nathi",
      schemaName: "Imininingwane Yokuxhumana ne-SASSA",
      schemaDescription: "Izinombolo zokuxhumana ezisemthethweni ze-SASSA, iphothali, i-imeyili, nemininingwane yamahhovisi.",
      eyebrow: "Xhumana nathi",
      quickCheckOptionsTitle: "Izindlela zokuhlola ngokushesha",
      officialContactsTitle: "Oxhumana nabo abasemthethweni",
      officialContactsIntro: "Sebenzisa lezi ziteshi ezisemthethweni ze-SASSA uma udinga isenzo esisemthethweni, impendulo esemthethweni, noma iphothali esemthethweni.",
      stayUpdatedTitle: "Hlala unolwazi",
      relatedPagesTitle: "Amakhasi ahlobene",
      legalLinkTranslations: {
        Contact: "Xhumana nathi",
        Privacy: "Ubumfihlo",
        Disclaimer: "Isitatimende sokuzikhulula",
        Terms: "Imigomo",
        "Editorial policy": "Inqubomgomo yokuhlela",
        "Cookie policy": "Inqubomgomo yamakhukhi",
      },
    },
  );
  const legalLinkTranslations = routeCopy.legalLinkTranslations as Record<string, string>;
  const legalLinks = LEGAL_LINKS.map((link) => ({
    ...link,
    label: legalLinkTranslations[link.label] ?? link.label,
  }));
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: routeCopy.schemaName,
    description: routeCopy.schemaDescription,
    mainEntity: {
      "@type": "GovernmentOrganization",
      name: "South African Social Security Agency (SASSA)",
      url: "https://www.sassa.gov.za/",
      telephone: "0800 60 10 11",
    },
  };

  return (
    <div className="space-y-8">
      <BreadcrumbSchema
        locale={locale}
        items={[
          { label: routeCopy.breadcrumbHome, path: "/" },
          { label: routeCopy.breadcrumbContact, path: "/contact" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Section eyebrow={routeCopy.eyebrow} title={routeCopy.quickCheckOptionsTitle}>
        <QuickCheckOptions locale={locale} />
      </Section>

      <Section eyebrow={routeCopy.eyebrow} title={routeCopy.officialContactsTitle}>
        <Card className="space-y-3">
          <p className="text-sm leading-7 text-muted">
            {routeCopy.officialContactsIntro}
          </p>
        </Card>
      </Section>

      <OfficialContactGrid locale={locale} />

      <Section title={routeCopy.stayUpdatedTitle}>
        <WhatsAppChannelBanner locale={locale} />
      </Section>

      <Section title={routeCopy.relatedPagesTitle}>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {legalLinks.filter((link) => link.path !== "/contact").map((link) => (
            <Link key={link.path} href={buildLocalePath(locale, link.path)}>
              <Card className="space-y-2">
                <h2 className="text-lg font-semibold">{link.label}</h2>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
