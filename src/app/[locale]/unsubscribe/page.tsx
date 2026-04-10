import { notFound } from "next/navigation";

import { Card, Section } from "@/components/ui";
import { getCopy } from "@/lib/copy";
import { unsubscribeFromReminderToken } from "@/lib/reminders";
import { buildLocalePath, isLocale } from "@/lib/site";

export default async function UnsubscribePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);
  const token = typeof resolvedSearchParams.token === "string" ? resolvedSearchParams.token : "";
  const result = token ? await unsubscribeFromReminderToken(token) : { success: false, grantName: null };

  return (
    <Section
      eyebrow={copy.unsubscribeEyebrow}
      title={result.success ? copy.unsubscribeStoppedTitle : copy.unsubscribeInvalidTitle}
    >
      <Card className="space-y-4">
        <p className="text-sm text-muted">
          {result.success
            ? `${result.grantName ?? copy.thisGrant} ${copy.unsubscribeStoppedSuffix}`
            : copy.unsubscribeInvalidText}
        </p>
        <a
          href={buildLocalePath(locale, "/dashboard")}
          className="focus-ring tap-target inline-flex items-center rounded-full border border-border bg-surface px-5 text-sm font-semibold"
        >
          {copy.openDashboard}
        </a>
      </Card>
    </Section>
  );
}
