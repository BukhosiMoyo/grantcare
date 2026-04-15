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
    path: "/privacy",
    title: "Privacy Policy",
    description: "Read how GrantCare handles reminders, saved preferences, account access, and product analytics.",
  });
}

export default async function PrivacyPage({
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
      currentPath="/privacy"
      eyebrow="Privacy"
      intro={[
        "GrantCare keeps product data limited to reminders, saved preferences, account access, and basic support handling.",
        "GrantCare is independent and not affiliated with SASSA or the South African government.",
      ]}
      locale={locale}
      sections={[
        {
          title: "What GrantCare may store",
          paragraphs: [
            "Account email addresses, sign-in details, reminder settings, saved guides, and grant preferences may be stored so the product can work.",
            "Official applications, appeals, and official status checks belong on government systems, not on GrantCare.",
          ],
        },
        {
          title: "How the data is used",
          paragraphs: [
            "GrantCare uses stored data to support sign-in, reminders, saved pages, and core product analytics.",
            "GrantCare should avoid collecting sensitive grant documents or official application data unless that changes in a clearly stated feature.",
          ],
        },
        {
          title: "Official contact routes",
          paragraphs: [
            "Official government questions should go through the official SASSA contacts and portals listed on the contact page.",
          ],
        },
      ]}
      title="Privacy"
    />
  );
}
