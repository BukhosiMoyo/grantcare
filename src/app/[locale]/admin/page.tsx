import { Prisma } from "@prisma/client";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Card, Section } from "@/components/ui";
import { getAdminAnalytics, type AnalyticsWindow } from "@/lib/admin-analytics";
import { requireAdmin } from "@/lib/auth-guards";
import { db } from "@/lib/prisma";
import { buildLocalePath, isLocale, type Locale } from "@/lib/site";
import { getLaunchReadiness, isDatabaseConfigured } from "@/lib/server-env";
import { PricingToggle } from "./pricing-toggle";

export const metadata: Metadata = {
  title: "Admin",
};

const ZU_ADMIN_COPY: Record<string, string> = {
  "No data yet.": "Ayikho idatha okwamanje.",
  "Claim checker type conversion": "Ukuguqulwa kohlobo lwe-claim checker",
  "start to use": "ukuqala uye ekusebenziseni",
  "use to click": "ukusebenzisa uye ekuchofozeni",
  "Content admin": "Ukuphatha okuqukethwe",
  "Database not configured.": "Idathabheyisi ayilungisiwe.",
  "Grant types": "Izinhlobo zezibonelelo",
  "Payment dates": "Izinsuku zokukhokha",
  Statuses: "Izimo",
  Guides: "Imihlahlandlela",
  News: "Izindaba",
  "FAQ entries": "Okufakiwe kwe-FAQ",
  Notices: "Izaziso",
  Placements: "Izindawo",
  "Draft items": "Okusalungiswa",
  "Pending dates": "Izinsuku ezisalindile",
  "Portal-only dates": "Izinsuku zephothali kuphela",
  "Scheduled notices": "Izaziso ezihleliwe",
  "Missing translations": "Ukuhumusha okushodayo",
  "Route views": "Ukubukwa kwemizila",
  "Claim checker clicks": "Ukuchofoza kwe-claim checker",
  "Claim checker starts": "Ukuqala kwe-claim checker",
  "Claim checker uses": "Ukusetshenziswa kwe-claim checker",
  "Reminder signups": "Ukubhalisela izikhumbuzo",
  "Reminder unsubscribes": "Ukuyeka izikhumbuzo",
  Signups: "Ukubhalisa",
  Logins: "Ukungena",
  "7 days": "Izinsuku ezi-7",
  "30 days": "Izinsuku ezingama-30",
  Settings: "Izilungiselelo",
  "Launch status": "Isimo sokwethulwa",
  Publishing: "Ukushicilela",
  Analytics: "Izibalo",
  Ready: "Kulungile",
  Missing: "Kuyashoda",
  Database: "Idathabheyisi",
  "Auth secret": "Imfihlo ye-auth",
  "Site URL": "I-URL yesayithi",
  "Reminder email": "I-imeyili yesikhumbuzo",
  "Cron secret": "Imfihlo ye-cron",
  "Start to use": "Ukuqala uye ekusebenziseni",
  "Use to click": "Ukusebenzisa uye ekuchofozeni",
  "Start to click": "Ukuqala uye ekuchofozeni",
  "Views by route": "Ukubukwa ngomzila",
  "Claim checker topics": "Izihloko ze-claim checker",
  "Claim checker targets": "Okuqondwe yi-claim checker",
  "Guide views": "Ukubukwa kwemihlahlandlela",
  "Payment-date views": "Ukubukwa kwezinsuku zokukhokha",
  "Status views": "Ukubukwa kwezimo",
  "Language preferences": "Izinketho zolimi",
  "Preferred grants": "Izibonelelo ezikhethwayo",
  "External link clicks": "Ukuchofoza izixhumanisi zangaphandle",
};

function adminCopy(locale: Locale, text: string) {
  return locale === "zu" ? (ZU_ADMIN_COPY[text] ?? text) : text;
}

function liveCopy(locale: Locale, count: number) {
  return locale === "zu" ? `${count} bukhoma` : `${count} live`;
}

function isMissingNewsArticleTableError(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2021" &&
    String(error.meta?.table ?? "").includes("NewsArticle")
  );
}

function RankingCard({
  items,
  locale,
  title,
}: {
  items: Array<{ label: string; value: number }>;
  locale: Locale;
  title: string;
}) {
  return (
    <Card className="space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{adminCopy(locale, title)}</p>
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
        <p className="text-sm text-muted">{adminCopy(locale, "No data yet.")}</p>
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
  locale,
}: {
  items: Array<{
    clicks: number;
    label: string;
    startToUseRate: number;
    starts: number;
    useToClickRate: number;
    uses: number;
  }>;
  locale: Locale;
}) {
  return (
    <Card className="space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
        {adminCopy(locale, "Claim checker type conversion")}
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
                <span>
                  {formatPercent(item.startToUseRate)} {adminCopy(locale, "start to use")}
                </span>
                <span>
                  {formatPercent(item.useToClickRate)} {adminCopy(locale, "use to click")}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">{adminCopy(locale, "No data yet.")}</p>
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
      <Section eyebrow="Admin" title={adminCopy(locale, "Content admin")}>
        <Card>
          <p className="text-sm text-muted">{adminCopy(locale, "Database not configured.")}</p>
        </Card>
      </Section>
    );
  }

  const missingTranslationsFilter = { equals: Prisma.AnyNull };

  const newsStats = await Promise.all([
    db.newsArticle.count(),
    db.newsArticle.count({ where: { status: "published" } }),
    db.newsArticle.count({ where: { status: "published", translations: missingTranslationsFilter } }),
  ]).catch((error) => {
    if (isMissingNewsArticleTableError(error)) {
      return [0, 0, 0] as const;
    }

    throw error;
  });

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
    dbToolsPricing,
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
      db.siteSetting.findUnique({ where: { key: "tools_pricing_enabled" } }),
    ]);

  const [newsCount, newsPublishedCount, newsMissingTranslations] = newsStats;
  const toolsPricingEnabled = dbToolsPricing?.value === "true";

  const window =
    resolvedSearchParams.window === "30d" ? "30d" : "7d";
  const analytics = await getAdminAnalytics(window as AnalyticsWindow);
  const launchReadiness = getLaunchReadiness();
  const draftContentCount =
    (grantCount - grantPublishedCount) +
    (statusCount - statusPublishedCount) +
    (guideCount - guidePublishedCount) +
    (newsCount - newsPublishedCount) +
    (faqCount - faqPublishedCount) +
    (noticeCount - noticePublishedCount) +
    (placementCount - placementPublishedCount);
  const missingTranslationCount =
    grantMissingTranslations +
    guideMissingTranslations +
    newsMissingTranslations +
    statusMissingTranslations +
    faqMissingTranslations +
    noticeMissingTranslations;

  const collections = [
    { label: adminCopy(locale, "Grant types"), live: grantPublishedCount, value: grantCount, href: buildLocalePath(locale, "/admin/grants") },
    { label: adminCopy(locale, "Payment dates"), live: paymentPublishedCount, value: paymentCount, href: buildLocalePath(locale, "/admin/payment-dates") },
    { label: adminCopy(locale, "Statuses"), live: statusPublishedCount, value: statusCount, href: buildLocalePath(locale, "/admin/statuses") },
    { label: adminCopy(locale, "Guides"), live: guidePublishedCount, value: guideCount, href: buildLocalePath(locale, "/admin/guides") },
    { label: adminCopy(locale, "News"), live: newsPublishedCount, value: newsCount, href: buildLocalePath(locale, "/admin/news") },
    { label: adminCopy(locale, "FAQ entries"), live: faqPublishedCount, value: faqCount, href: buildLocalePath(locale, "/admin/faqs") },
    { label: adminCopy(locale, "Notices"), live: noticePublishedCount, value: noticeCount, href: buildLocalePath(locale, "/admin/notices") },
    { label: adminCopy(locale, "Placements"), live: placementPublishedCount, value: placementCount, href: buildLocalePath(locale, "/admin/placements") },
  ];

  const publishingCards = [
    { label: adminCopy(locale, "Draft items"), value: draftContentCount },
    { label: adminCopy(locale, "Pending dates"), value: pendingPaymentCount },
    { label: adminCopy(locale, "Portal-only dates"), value: portalOnlyPaymentCount },
    { label: adminCopy(locale, "Scheduled notices"), value: scheduledNoticeCount },
    { label: adminCopy(locale, "Missing translations"), value: missingTranslationCount },
  ];

  const analyticsCards = [
    { label: adminCopy(locale, "Route views"), value: analytics.totals.routeViews },
    { label: adminCopy(locale, "Claim checker clicks"), value: analytics.totals.claimCheckerClicks },
    { label: adminCopy(locale, "Claim checker starts"), value: analytics.totals.claimCheckerStarts },
    { label: adminCopy(locale, "Claim checker uses"), value: analytics.totals.claimCheckerUses },
    { label: adminCopy(locale, "Reminder signups"), value: analytics.totals.reminderSignups },
    { label: adminCopy(locale, "Reminder unsubscribes"), value: analytics.totals.reminderUnsubscribes },
    { label: adminCopy(locale, "Signups"), value: analytics.totals.signups },
    { label: adminCopy(locale, "Logins"), value: analytics.totals.logins },
  ];

  const windowLinks = [
    { label: adminCopy(locale, "7 days"), value: "7d" },
    { label: adminCopy(locale, "30 days"), value: "30d" },
  ];

  return (
    <div className="space-y-8">
      <Section eyebrow="Admin" title={adminCopy(locale, "Content admin")}>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {collections.map((collection) => (
            <Link key={collection.label} href={collection.href}>
              <Card className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{collection.label}</p>
                <p className="text-3xl font-semibold">{collection.value}</p>
                <p className="text-sm text-muted">{liveCopy(locale, collection.live)}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section title={adminCopy(locale, "Settings")}>
        <Card className="max-w-md">
          <PricingToggle isEnabled={toolsPricingEnabled} locale={locale} />
        </Card>
      </Section>

      <Section title={adminCopy(locale, "Launch status")}>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {launchReadiness.map((item) => (
            <Card key={item.key} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{adminCopy(locale, item.label)}</p>
              <p className="text-base font-semibold">{adminCopy(locale, item.ready ? "Ready" : "Missing")}</p>
              <p className="text-xs text-muted">{item.key}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title={adminCopy(locale, "Publishing")}>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {publishingCards.map((item) => (
            <Card key={item.label} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{item.label}</p>
              <p className="text-3xl font-semibold">{item.value}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title={adminCopy(locale, "Analytics")}>
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
              label={adminCopy(locale, "Start to use")}
              numerator={analytics.claimCheckerFunnel.uses}
              denominator={analytics.claimCheckerFunnel.starts}
            />
            <FunnelRateCard
              label={adminCopy(locale, "Use to click")}
              numerator={analytics.claimCheckerFunnel.clicks}
              denominator={analytics.claimCheckerFunnel.uses}
            />
            <FunnelRateCard
              label={adminCopy(locale, "Start to click")}
              numerator={analytics.claimCheckerFunnel.clicks}
              denominator={analytics.claimCheckerFunnel.starts}
            />
          </div>
          <div className="grid gap-4 xl:grid-cols-3">
            <RankingCard items={analytics.routeViews} title={adminCopy(locale, "Views by route")} locale={locale} />
            <RankingCard items={analytics.claimCheckerTopics} title={adminCopy(locale, "Claim checker topics")} locale={locale} />
            <ClaimCheckerTypeFunnelCard items={analytics.claimCheckerTypeFunnel} locale={locale} />
            <RankingCard items={analytics.claimCheckerTargets} title={adminCopy(locale, "Claim checker targets")} locale={locale} />
            <RankingCard items={analytics.guideViews} title={adminCopy(locale, "Guide views")} locale={locale} />
            <RankingCard items={analytics.paymentViews} title={adminCopy(locale, "Payment-date views")} locale={locale} />
            <RankingCard items={analytics.statusViews} title={adminCopy(locale, "Status views")} locale={locale} />
            <RankingCard items={analytics.languageDistribution} title={adminCopy(locale, "Language preferences")} locale={locale} />
            <RankingCard items={analytics.preferredGrantDistribution} title={adminCopy(locale, "Preferred grants")} locale={locale} />
            <RankingCard items={analytics.externalClicks} title={adminCopy(locale, "External link clicks")} locale={locale} />
          </div>
        </div>
      </Section>
    </div>
  );
}
