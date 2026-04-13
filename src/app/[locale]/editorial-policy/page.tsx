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
    path: "/editorial-policy",
    title: "GrantCare editorial policy",
    description:
      "Read how GrantCare handles official-source checks, payment-date updates, and status guidance.",
  });
}

export default async function EditorialPolicyPage({
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
      currentPath="/editorial-policy"
      eyebrow="Editorial policy"
      intro={[
        "GrantCare should rely on official government sources when it publishes payment dates, official links, and government contact details.",
      ]}
      locale={locale}
      sections={[
        {
          title: "Source handling",
          paragraphs: [
            "Official payment schedules, official grant amount updates, and official contact details should be taken from government sources first.",
            "Independent guide pages should stay clearly separate from official government action pages.",
          ],
        },
        {
          title: "Date and status handling",
          paragraphs: [
            "Payment dates should distinguish between expected timing, pending updates, and portal-only situations.",
            "Status pages should explain common wording plainly without pretending to replace the official status system.",
          ],
        },
        {
          title: "Corrections",
          paragraphs: [
            "If a government source changes, GrantCare should update the related page and remove or revise outdated wording as quickly as possible.",
          ],
        },
      ]}
      title="Editorial policy"
    />
  );
}
