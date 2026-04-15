import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalPage } from "@/components/legal-page";
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
    path: "/terms",
    title: "Terms and Conditions",
    description:
      "Read the terms for using GrantCare as an independent information and reminder product.",
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <LegalPage
      currentPath="/terms"
      eyebrow="Terms"
      intro={[
        "These terms cover use of GrantCare as an independent information and reminder product.",
      ]}
      locale={locale}
      sections={[
        {
          title: "Use of the site",
          paragraphs: [
            "GrantCare may be used to read guidance, compare payment dates, understand common status wording, and manage reminders or saved preferences.",
            "Users should keep official actions on official government systems.",
          ],
        },
        {
          title: "Content limits",
          paragraphs: [
            "GrantCare aims to keep information useful and current, but official decisions and official updates remain with government channels.",
            "Users should verify formal actions, deadlines, and final outcomes on official routes.",
          ],
        },
        {
          title: "Account use",
          paragraphs: [
            "Users should keep account access details secure and use the product lawfully.",
            "GrantCare may limit or remove access if the service is abused or used to mislead others.",
          ],
        },
      ]}
      title="Terms"
    />
  );
}
