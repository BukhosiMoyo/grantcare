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
    path: "/disclaimer",
    title: "Disclaimer",
    description:
      "GrantCare is an independent information site and is not affiliated with SASSA or the South African government.",
  });
}

export default async function DisclaimerPage({
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
      currentPath="/disclaimer"
      eyebrow="Disclaimer"
      intro={[
        "GrantCare is an independent information site.",
        "GrantCare is not affiliated with SASSA or the South African government.",
      ]}
      locale={locale}
      sections={[
        {
          title: "What GrantCare does",
          paragraphs: [
            "GrantCare explains payment dates, common status wording, grant types, and next-step guidance.",
            "GrantCare can point users to official routes, but it is not the official route.",
          ],
        },
        {
          title: "What GrantCare does not do",
          paragraphs: [
            "GrantCare does not process official applications, official appeals, or official status checks.",
            "GrantCare does not issue government decisions, payments, or confirmations.",
          ],
        },
        {
          title: "Official action",
          paragraphs: [
            "Use the official SASSA website, online services portal, SRD portal, and official contact channels whenever you need an official action or official answer.",
          ],
        },
      ]}
      title="Disclaimer"
    />
  );
}
