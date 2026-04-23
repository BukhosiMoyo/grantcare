import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  updateProfileAction,
  updateReminderSubscriptionAction,
} from "@/actions/dashboard";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CheckboxRow,
  Field,
  Input,
  Section,
  Select,
  StatusMessage,
  ButtonLink,
} from "@/components/ui";
import { MonetizationBlocks } from "@/components/monetization-blocks";
import { WhatsAppChannelBanner } from "@/components/whatsapp-channel";
import { formatDateLabel } from "@/lib/utils";
import { requireUser } from "@/lib/auth-guards";
import { listGrantTypes, listMonetizationBlocks, listPaymentCategories } from "@/lib/content";
import { getCopy } from "@/lib/copy";
import { buildLocalizedMetadata } from "@/lib/metadata";
import { getDashboardData } from "@/lib/users";
import { DEFAULT_LOCALE, buildLocalePath, isLocale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const copy = getCopy(locale);

  return buildLocalizedMetadata({
    locale,
    path: "/dashboard",
    title: copy.dashboard,
    description: "Manage your GrantCare preferences, reminders, and saved pages.",
    noIndex: true,
  });
}

export default async function DashboardPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ message?: string; error?: string }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getCopy(locale);
  const user = await requireUser(locale, buildLocalePath(locale, "/dashboard"));
  const [dashboardData, grants, reminderGrantTypes] = await Promise.all([
    getDashboardData(user.id),
    listGrantTypes(locale),
    listPaymentCategories(locale),
  ]);

  if (!dashboardData) {
    notFound();
  }

  const subscriptionByGrantId = new Map(
    dashboardData.user.reminderSubscriptions.map((subscription) => [
      subscription.grantTypeId,
      subscription,
    ]),
  );

  const dashboardBlocks = await listMonetizationBlocks(locale, {
    placement: "dashboard-helpful",
    grantSlug:
      dashboardData.user.preferredGrantType?.paymentGroup?.slug ??
      dashboardData.user.preferredGrantType?.slug,
    limit: 2,
  });

  return (
    <div className="space-y-8">
      <Section eyebrow={copy.dashboard} title={copy.myDashboard}>
        <div className="space-y-4">
          {resolvedSearchParams.message ? (
            <StatusMessage>{resolvedSearchParams.message}</StatusMessage>
          ) : null}
          {resolvedSearchParams.error ? (
            <StatusMessage tone="error">{resolvedSearchParams.error}</StatusMessage>
          ) : null}
        </div>
      </Section>

      <Section title={copy.profileTitle}>
        <Card className="space-y-5">
          <form action={updateProfileAction} className="space-y-5">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="preferredLocale" value={DEFAULT_LOCALE} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={copy.nameLabel}>
                <Input name="name" defaultValue={dashboardData.user.name ?? ""} required />
              </Field>
              <Field label={copy.emailLabel}>
                <Input name="email" type="email" defaultValue={dashboardData.user.email} required />
              </Field>
              <Field label={copy.preferredGrant}>
                <Select
                  name="preferredGrantTypeId"
                  defaultValue={dashboardData.user.preferredGrantTypeId ?? ""}
                >
                  <option value="">{copy.noPreference}</option>
                  {grants.map((grant) => (
                    <option key={grant.id ?? grant.slug} value={grant.id ?? ""}>
                      {grant.name}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
            <SubmitButton pendingLabel="Saving">{copy.saveProfile}</SubmitButton>
          </form>
        </Card>
      </Section>

      <Section title={copy.emailRemindersTitle}>
        <div className="grid gap-4">
          {reminderGrantTypes.map((grant) => {
            const subscription = subscriptionByGrantId.get(grant.id ?? "");

            return (
              <Card key={grant.slug} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{grant.name}</h3>
                  <p className="text-sm text-muted">{copy.reminderSettingsText}</p>
                </div>
                <form action={updateReminderSubscriptionAction} className="space-y-4">
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="grantTypeId" value={grant.id ?? ""} />
                  <div className="grid gap-3">
                    <CheckboxRow
                      name="active"
                      label={copy.enableReminders}
                      defaultChecked={subscription?.active ?? false}
                    />
                    <CheckboxRow
                      name="oneDayBefore"
                      label={copy.oneDayBefore}
                      defaultChecked={subscription?.oneDayBefore ?? false}
                    />
                    <CheckboxRow
                      name="twoDaysBefore"
                      label={copy.twoDaysBefore}
                      defaultChecked={subscription?.twoDaysBefore ?? false}
                    />
                    <CheckboxRow
                      name="onPublish"
                      label={copy.onPublishReminder}
                      defaultChecked={subscription?.onPublish ?? false}
                    />
                  </div>
                  <SubmitButton pendingLabel="Saving">{copy.saveReminders}</SubmitButton>
                </form>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ── WhatsApp Channel ── */}
      <Section title="WhatsApp updates">
        <Card className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted">
              Get payment date reminders and grant updates directly on WhatsApp. Join our channel to stay informed.
            </p>
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
              WhatsApp notifications coming soon
            </p>
          </div>
          <WhatsAppChannelBanner />
        </Card>
      </Section>

      <Section title={copy.savedGuidesTitle}>
        {dashboardData.user.savedGuides.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {dashboardData.user.savedGuides.map((item) => (
              <Card key={item.id} className="space-y-2">
                <h3 className="text-xl font-semibold">{item.guide.title}</h3>
                <p className="text-sm text-muted">{item.guide.summary}</p>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <p className="text-sm text-muted">{copy.noSavedGuides}</p>
          </Card>
        )}
      </Section>

      <Section title="My Interview Guides">
        {dashboardData.user.toolGenerations?.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {dashboardData.user.toolGenerations.map((item) => {
              const inputData = item.inputData as Record<string, unknown> | null | undefined;
              const jobTitle =
                typeof inputData?.jobTitle === "string" && inputData.jobTitle.trim().length > 0
                  ? inputData.jobTitle
                  : "Custom Role";

              return (
                <Link
                  key={item.id}
                  href={buildLocalePath(locale, `/tools/interview-guide/result/${item.id}`)}
                  className="group block"
                >
                <Card className="space-y-2 transition-all hover:bg-surface-muted hover:border-primary/30 h-full">
                  <h3 className="text-xl font-semibold tracking-tight">{item.toolType === "interview_guide" ? "Interview Guide" : "Generated Tool"}</h3>
                  <p className="text-[16px] text-muted">
                    {jobTitle}
                  </p>
                  <div>
                    {item.isPaid ? (
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">Full Access</span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-600">Free Preview</span>
                    )}
                  </div>
                </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <Card className="space-y-4">
            <p className="text-[16px] text-muted">You haven&apos;t generated any customized guides yet.</p>
            <div>
               <ButtonLink href={buildLocalePath(locale, "/tools/interview-guide")} variant="secondary">
                 Create Interview Guide
               </ButtonLink>
            </div>
          </Card>
        )}
      </Section>

      <Section title={copy.latestScheduleSlots}>
        {dashboardData.latestPaymentEntries.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {dashboardData.latestPaymentEntries.map((entry) => (
              <Card key={entry.id} className="space-y-2">
                <h3 className="text-xl font-semibold">
                  {entry.grantType.name}
                </h3>
                <p className="text-sm text-muted">
                  {entry.paymentDate
                    ? formatDateLabel(entry.paymentDate.toISOString().slice(0, 10))
                    : copy.paymentPortalOnly}
                </p>
                <p className="text-sm text-muted">
                  {entry.note ?? copy.latestPublishedPaymentDate}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <p className="text-sm text-muted">{copy.setPreferredGrantPrompt}</p>
          </Card>
        )}
      </Section>

      {dashboardBlocks.length > 0 ? (
        <Section title={copy.helpfulOffersTitle}>
          <MonetizationBlocks blocks={dashboardBlocks} locale={locale} placement="dashboard-helpful" />
        </Section>
      ) : null}
    </div>
  );
}
