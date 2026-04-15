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
    path: "/cookie-policy",
    title: "Cookie Policy",
    description:
      "Read the cookie policy for locale preferences, sign-in sessions, and product analytics on GrantCare.",
  });
}

export default async function CookiePolicyPage({
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
      currentPath="/cookie-policy"
      eyebrow="Cookie policy"
      intro={[
        "GrantCare may use cookies or similar storage for locale preferences, sign-in sessions, and core product analytics.",
      ]}
      locale={locale}
      sections={[
        {
          title: "Product cookies",
          paragraphs: [
            "GrantCare can store a language preference so the site opens in the same locale on a later visit.",
            "Account and security features may use session storage or cookies to keep sign-in working correctly.",
          ],
        },
        {
          title: "Analytics",
          paragraphs: [
            "GrantCare may use basic analytics to understand which pages or tools are being used.",
            "Analytics should support product improvement, not replace official government systems.",
          ],
        },
        {
          title: "Control",
          paragraphs: [
            "Browser settings can limit or clear cookies, but some product features may stop working as expected if they are disabled.",
          ],
        },
      ]}
      title="Cookie policy"
    />
  );
}
