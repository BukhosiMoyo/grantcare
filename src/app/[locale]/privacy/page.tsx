import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Card, Section } from "@/components/ui";
import { getCopy } from "@/lib/copy";
import { isLocale } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);

  return (
    <Section eyebrow={copy.privacy} title={`${copy.privacy} notice`}>
      <Card className="space-y-3">
        <p className="text-sm text-muted">
          GrantCare should collect only the minimum data needed for reminders, saved preferences, and account access.
        </p>
        <p className="text-sm text-muted">
          Do not store sensitive grant information unless it is necessary, lawful, and protected.
        </p>
      </Card>
    </Section>
  );
}
