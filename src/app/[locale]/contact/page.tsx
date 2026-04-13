import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { OfficialContactGrid } from "@/components/official-contact-grid";
import { QuickCheckOptions } from "@/components/quick-check-options";
import { Card, Section } from "@/components/ui";
import { WhatsAppChannelBanner } from "@/components/whatsapp-channel";
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

  return buildLocalizedMetadata({
    locale,
    path: "/contact",
    title: `SASSA Contact Details ${currentYear} — Phone, Email & Office`,
    description:
      `Find official SASSA contact numbers, email addresses, office locations, and online portal links for ${currentYear} in one place.`,
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

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "SASSA Contact Details",
    description: "Official SASSA contact numbers, portal, email, and office details.",
    mainEntity: {
      "@type": "GovernmentOrganization",
      name: "South African Social Security Agency (SASSA)",
      url: "https://www.sassa.gov.za/",
      telephone: "0800 60 10 11",
    },
  };

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Section eyebrow="Contact" title="Quick check options">
        <QuickCheckOptions />
      </Section>

      <Section eyebrow="Contact" title="Official contacts">
        <Card className="space-y-3">
          <p className="text-sm leading-7 text-muted">
            Use these official SASSA channels when you need an official action, official answer, or official portal.
          </p>
        </Card>
      </Section>

      <OfficialContactGrid />

      <Section title="Stay updated">
        <WhatsAppChannelBanner />
      </Section>

      <Section title="Related pages">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {LEGAL_LINKS.filter((link) => link.path !== "/contact").map((link) => (
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
