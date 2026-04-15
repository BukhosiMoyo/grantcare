import { Prisma } from "@prisma/client";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Card, Section } from "@/components/ui";
import { getAdminAnalytics, type AnalyticsWindow } from "@/lib/admin-analytics";
import { requireAdmin } from "@/lib/auth-guards";
import { db } from "@/lib/prisma";
import { buildLocalePath, isLocale } from "@/lib/site";
import { getLaunchReadiness, isDatabaseConfigured } from "@/lib/server-env";

export const metadata: Metadata = {
  title: "Admin",
};

function RankingCard({
  items,
  title,
}: {
  items: Array<{ label: string; value: number }>;
  title: string;
}) {
  return (
    <Card className="space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{title}</p>
      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.label} className="flex items-start justify-between gap-4 text-sm">
              <span className="break-all text-muted">{item.label}</span>
              <span className="shrink-0 font-semibold text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">No data yet.</p>
      )}
    </Card>
  );
}

function formatPercent(rate: number) {
  const percentage = rate * 100;
  return `${percentage % 1 === 0 ? percentage.toFixed(0) : percentage.toFixed(1)}%`;
}

function FunnelRateCard({
  label,
  numerator,
  denominator,
}: {
  denominator: number;
  label: string;
  numerator: number;
}) {
  return (
    <Card className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{label}</p>
      <p className="text-3xl font-semibold">
        {formatPercent(denominator > 0 ? numerator / denominator : 0)}
      </p>
      <p className="text-sm text-muted">
        {numerator} / {denominator}
      </p>
    </Card>
  );
}

function ClaimCheckerTypeFunnelCard({
  items,
}: {
  items: Array<{
    clicks: number;
    label: string;
    startToUseRate: number;
    starts: number;
    useToClickRate: number;
    uses: number;
  }>;
}) {
  return (
    <Card className="space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
        Claim checker type conversion
      </p>
      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.label} className="space-y-2 border-t border-border pt-3 first:border-t-0 first:pt-0">
              <div className="flex items-start justify-between gap-4 text-sm">
                <span className="text-foreground">{item.label}</span>
                <span className="shrink-0 font-semibold text-foreground">
                  {item.starts} / {item.uses} / {item.clicks}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-muted">
                <span>{formatPercent(item.startToUseRate)} start to use</span>
                <span>{formatPercent(item.useToClickRate)} use to click</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">No data yet.</p>
      )}
    </Card>
  );
}

export default async function AdminPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ window?: string }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  if (!isLocale(locale)) {
    notFound();
  }

  await requireAdmin(locale, buildLocalePath(locale, "/admin"));

  if (!isDatabaseConfigured()) {
    return (
      <Section eyebrow="Admin" title="Content admin">
        <Card>
          <p className="text-sm text-muted">Database not configured.</p>
        </Card>
      </Section>
    );
  }

  const missingTranslationsFilter = { equals: Prisma.AnyNull };

  const [
    grantCount,
    grantPublishedCount,
    paymentCount,
    paymentPublishedCount,
    statusCount,
    statusPublishedCount,
    guideCount,
    guidePublishedCount,
    faqCount,
    faqPublishedCount,
    noticeCount,
    noticePublishedCount,
    placementCount,
    placementPublishedCount,
    grantMissingTranslations,
    guideMissingTranslations,
    statusMissingTranslations,
    faqMissingTranslations,
    noticeMissingTranslations,
    pendingPaymentCount,
    portalOnlyPaymentCount,
    scheduledNoticeCount,
  ] =
    await Promise.all([
      db.grantType.count(),
      db.grantType.count({ where: { status: "published" } }),
      db.paymentDateEntry.count(),
      db.paymentDateEntry.count({ where: { published: true } }),
      db.statusMeaning.count(),
      db.statusMeaning.count({ where: { status: "published" } }),
      db.guideArticle.count(),
      db.guideArticle.count({ where: { status: "published" } }),
      db.faqEntry.count(),
      db.faqEntry.count({ where: { status: "published" } }),
      db.notice.count(),
      db.notice.count({ where: { status: "published" } }),
      db.monetizationBlock.count(),
      db.monetizationBlock.count({ where: { status: "published" } }),
      db.grantType.count({ where: { status: "published", translations: missingTranslationsFilter } }),
      db.guideArticle.count({ where: { status: "published", translations: missingTranslationsFilter } }),
      db.statusMeaning.count({ where: { status: "published", translations: missingTranslationsFilter } }),
      db.faqEntry.count({ where: { status: "published", translations: missingTranslationsFilter } }),
      db.notice.count({ where: { status: "published", translations: missingTranslationsFilter } }),
      db.paymentDateEntry.count({ where: { state: "pending" } }),
      db.paymentDateEntry.count({ where: { state: "portal_only" } }),
      db.notice.count({ where: { status: "published", startsAt: { gt: new Date() } } }),
    ]);

  const window =
    resolvedSearchParams.window === "30d" ? "30d" : "7d";
  const analytics = await getAdminAnalytics(window as AnalyticsWindow);
  const launchReadiness = getLaunchReadiness();
  const draftContentCount =
    (grantCount - grantPublishedCount) +
    (statusCount - statusPublishedCount) +
    (guideCount - guidePublishedCount) +
    (faqCount - faqPublishedCount) +
    (noticeCount - noticePublishedCount) +
    (placementCount - placementPublishedCount);
  const missingTranslationCount =
    grantMissingTranslations +
    guideMissingTranslations +
    statusMissingTranslations +
    faqMissingTranslations +
    noticeMissingTranslations;

  const collections = [
    { label: "Grant types", live: grantPublishedCount, value: grantCount, href: buildLocalePath(locale, "/admin/grants") },
    { label: "Payment dates", live: paymentPublishedCount, value: paymentCount, href: buildLocalePath(locale, "/admin/payment-dates") },
    { label: "Statuses", live: statusPublishedCount, value: statusCount, href: buildLocalePath(locale, "/admin/statuses") },
    { label: "Guides", live: guidePublishedCount, value: guideCount, href: buildLocalePath(locale, "/admin/guides") },
    { label: "FAQ entries", live: faqPublishedCount, value: faqCount, href: buildLocalePath(locale, "/admin/faqs") },
    { label: "Notices", live: noticePublishedCount, value: noticeCount, href: buildLocalePath(locale, "/admin/notices") },
    { label: "Placements", live: placementPublishedCount, value: placementCount, href: buildLocalePath(locale, "/admin/placements") },
  ];

  const publishingCards = [
    { label: "Draft items", value: draftContentCount },
    { label: "Pending dates", value: pendingPaymentCount },
    { label: "Portal-only dates", value: portalOnlyPaymentCount },
    { label: "Scheduled notices", value: scheduledNoticeCount },
    { label: "Missing translations", value: missingTranslationCount },
  ];

  const analyticsCards = [
    { label: "Route views", value: analytics.totals.routeViews },
    { label: "Claim checker clicks", value: analytics.totals.claimCheckerClicks },
    { label: "Claim checker starts", value: analytics.totals.claimCheckerStarts },
    { label: "Claim checker uses", value: analytics.totals.claimCheckerUses },
    { label: "Reminder signups", value: analytics.totals.reminderSignups },
    { label: "Reminder unsubscribes", value: analytics.totals.reminderUnsubscribes },
    { label: "Signups", value: analytics.totals.signups },
    { label: "Logins", value: analytics.totals.logins },
  ];

  const windowLinks = [
    { label: "7 days", value: "7d" },
    { label: "30 days", value: "30d" },
  ];

  return (
    <div className="space-y-8">
      <Section eyebrow="Admin" title="Content admin">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {collections.map((collection) => (
            <Link key={collection.label} href={collection.href}>
              <Card className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{collection.label}</p>
                <p className="text-3xl font-semibold">{collection.value}</p>
                <p className="text-sm text-muted">{collection.live} live</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Launch status">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {launchReadiness.map((item) => (
            <Card key={item.key} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{item.label}</p>
              <p className="text-base font-semibold">{item.ready ? "Ready" : "Missing"}</p>
              <p className="text-xs text-muted">{item.key}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Publishing">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {publishingCards.map((item) => (
            <Card key={item.label} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{item.label}</p>
              <p className="text-3xl font-semibold">{item.value}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Analytics">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {windowLinks.map((item) => (
              <Link
                key={item.value}
                href={buildLocalePath(locale, `/admin?window=${item.value}`)}
                className={`focus-ring tap-target inline-flex items-center rounded-full border px-4 text-sm font-medium ${
                  window === item.value
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-surface text-foreground hover:bg-surface-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {analyticsCards.map((item) => (
              <Card key={item.label} className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{item.label}</p>
                <p className="text-3xl font-semibold">{item.value}</p>
              </Card>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <FunnelRateCard
              label="Start to use"
              numerator={analytics.claimCheckerFunnel.uses}
              denominator={analytics.claimCheckerFunnel.starts}
            />
            <FunnelRateCard
              label="Use to click"
              numerator={analytics.claimCheckerFunnel.clicks}
              denominator={analytics.claimCheckerFunnel.uses}
            />
            <FunnelRateCard
              label="Start to click"
              numerator={analytics.claimCheckerFunnel.clicks}
              denominator={analytics.claimCheckerFunnel.starts}
            />
          </div>
          <div className="grid gap-4 xl:grid-cols-3">
            <RankingCard items={analytics.routeViews} title="Views by route" />
            <RankingCard items={analytics.claimCheckerTopics} title="Claim checker topics" />
            <ClaimCheckerTypeFunnelCard items={analytics.claimCheckerTypeFunnel} />
            <RankingCard items={analytics.claimCheckerTargets} title="Claim checker targets" />
            <RankingCard items={analytics.guideViews} title="Guide views" />
            <RankingCard items={analytics.paymentViews} title="Payment-date views" />
            <RankingCard items={analytics.statusViews} title="Status views" />
            <RankingCard items={analytics.languageDistribution} title="Language preferences" />
            <RankingCard items={analytics.preferredGrantDistribution} title="Preferred grants" />
            <RankingCard items={analytics.externalClicks} title="External link clicks" />
          </div>
        </div>
      </Section>
    </div>
  );
}
