import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { OfficialContactGrid } from "@/components/official-contact-grid";
import { QuickCheckOptions } from "@/components/quick-check-options";
import { Card, Section } from "@/components/ui";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { LEGAL_LINKS } from "@/lib/official-resources";
import { SUPPORT_EMAIL, SUPPORT_MAILTO, buildLocalePath, isLocale } from "@/lib/site";

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
    path: "/contact",
    title: "GrantCare contact and official SASSA details",
    description:
      "Find GrantCare support details together with official SASSA website, portal, phone, email, and address details.",
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

  return (
    <div className="space-y-8">
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

      <Section title="GrantCare support">
        <Card className="space-y-3">
          <p className="text-sm leading-7 text-muted">
            GrantCare product support is separate from official SASSA support.
          </p>
          <a href={SUPPORT_MAILTO} className="text-sm font-semibold text-primary">
            {SUPPORT_EMAIL}
          </a>
        </Card>
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
