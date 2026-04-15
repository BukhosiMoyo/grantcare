import { db } from "@/lib/prisma";
import { assertDatabaseConfigured } from "@/lib/server-env";

export type AnalyticsWindow = "7d" | "30d";
export type ClaimCheckerTypeFunnelRow = {
  clicks: number;
  label: string;
  startToClickRate: number;
  startToUseRate: number;
  starts: number;
  useToClickRate: number;
  uses: number;
};

function getWindowStart(window: AnalyticsWindow) {
  const days = window === "30d" ? 30 : 7;
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

function getPayloadString(payload: unknown, key: string) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return null;
  }

  const value = (payload as Record<string, unknown>)[key];
  return typeof value === "string" ? value : null;
}

function buildCountMap(values: Array<string | null | undefined>) {
  const counts = new Map<string, number>();

  for (const value of values) {
    if (!value) {
      continue;
    }

    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return counts;
}

function countByKey(values: Array<string | null | undefined>) {
  return [...buildCountMap(values).entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((left, right) => right.value - left.value);
}

function getRate(numerator: number, denominator: number) {
  if (denominator <= 0) {
    return 0;
  }

  return numerator / denominator;
}

export async function getAdminAnalytics(window: AnalyticsWindow) {
  assertDatabaseConfigured();

  const since = getWindowStart(window);

  const [events, users, grantTypes] = await Promise.all([
    db.analyticsEvent.findMany({
      where: {
        createdAt: {
          gte: since,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        name: true,
        path: true,
        payload: true,
      },
    }),
    db.user.findMany({
      select: {
        preferredGrantTypeId: true,
        preferredLocale: true,
      },
    }),
    db.grantType.findMany({
      select: {
        id: true,
        name: true,
      },
    }),
  ]);

  const grantTypeNameById = new Map(grantTypes.map((grant) => [grant.id, grant.name]));

  const routeViews = countByKey(
    events
      .filter((event) =>
        ["page.viewed", "guide.viewed", "payment_date.viewed", "status.viewed"].includes(event.name),
      )
      .map((event) => event.path),
  ).slice(0, 10);

  const guideViews = countByKey(
    events
      .filter((event) => event.name === "guide.viewed")
      .map((event) => event.path),
  ).slice(0, 5);

  const paymentViews = countByKey(
    events
      .filter((event) => event.name === "payment_date.viewed")
      .map((event) => event.path),
  ).slice(0, 5);

  const statusViews = countByKey(
    events
      .filter((event) => event.name === "status.viewed")
      .map((event) => event.path),
  ).slice(0, 5);

  const externalClicks = countByKey(
    events
      .filter((event) =>
        event.name === "official_resource.clicked" || event.name === "monetization.clicked",
      )
      .map((event) => getPayloadString(event.payload, "href")),
  ).slice(0, 5);

  const claimCheckerTopics = countByKey(
    events
      .filter((event) => event.name === "claim_checker.used")
      .map((event) => getPayloadString(event.payload, "claimTopicLabel")),
  ).slice(0, 8);

  const claimCheckerTargets = countByKey(
    events
      .filter((event) => event.name === "claim_checker.link_clicked")
      .map((event) => getPayloadString(event.payload, "targetHref")),
  ).slice(0, 8);

  const claimCheckerStartTypeCounts = buildCountMap(
    events
      .filter((event) => event.name === "claim_checker.started")
      .map(
        (event) =>
          getPayloadString(event.payload, "claimTypeLabel") ??
          getPayloadString(event.payload, "claimType"),
      ),
  );

  const claimCheckerUseTypeCounts = buildCountMap(
    events
      .filter((event) => event.name === "claim_checker.used")
      .map(
        (event) =>
          getPayloadString(event.payload, "claimTypeLabel") ??
          getPayloadString(event.payload, "claimType"),
      ),
  );

  const claimCheckerClickTypeCounts = buildCountMap(
    events
      .filter((event) => event.name === "claim_checker.link_clicked")
      .map(
        (event) =>
          getPayloadString(event.payload, "claimTypeLabel") ??
          getPayloadString(event.payload, "claimType"),
      ),
  );

  const claimCheckerTypeFunnel: ClaimCheckerTypeFunnelRow[] = [
    ...new Set([
      ...claimCheckerStartTypeCounts.keys(),
      ...claimCheckerUseTypeCounts.keys(),
      ...claimCheckerClickTypeCounts.keys(),
    ]),
  ]
    .map((label) => {
      const starts = claimCheckerStartTypeCounts.get(label) ?? 0;
      const uses = claimCheckerUseTypeCounts.get(label) ?? 0;
      const clicks = claimCheckerClickTypeCounts.get(label) ?? 0;

      return {
        clicks,
        label,
        startToClickRate: getRate(clicks, starts),
        startToUseRate: getRate(uses, starts),
        starts,
        useToClickRate: getRate(clicks, uses),
        uses,
      };
    })
    .sort((left, right) => right.starts - left.starts || right.uses - left.uses || right.clicks - left.clicks);

  const languageDistribution = countByKey(users.map((user) => user.preferredLocale));
  const preferredGrantDistribution = countByKey(
    users.map((user) =>
      user.preferredGrantTypeId ? grantTypeNameById.get(user.preferredGrantTypeId) ?? "Unknown grant" : "No preference",
    ),
  );

  const totals = {
    claimCheckerClicks: events.filter((event) => event.name === "claim_checker.link_clicked").length,
    claimCheckerStarts: events.filter((event) => event.name === "claim_checker.started").length,
    claimCheckerUses: events.filter((event) => event.name === "claim_checker.used").length,
    logins: events.filter((event) => event.name === "account.login").length,
    signups: events.filter((event) => event.name === "account.signup").length,
    reminderSignups: events.filter((event) => event.name === "reminder.signup").length,
    reminderUnsubscribes: events.filter((event) => event.name === "reminder.unsubscribe").length,
    routeViews: routeViews.reduce((total, item) => total + item.value, 0),
  };

  return {
    claimCheckerFunnel: {
      clicks: totals.claimCheckerClicks,
      startToClickRate: getRate(totals.claimCheckerClicks, totals.claimCheckerStarts),
      startToUseRate: getRate(totals.claimCheckerUses, totals.claimCheckerStarts),
      starts: totals.claimCheckerStarts,
      useToClickRate: getRate(totals.claimCheckerClicks, totals.claimCheckerUses),
      uses: totals.claimCheckerUses,
    },
    claimCheckerTargets,
    claimCheckerTopics,
    claimCheckerTypeFunnel,
    externalClicks,
    guideViews,
    languageDistribution,
    paymentViews,
    preferredGrantDistribution,
    routeViews,
    since,
    statusViews,
    totals,
    window,
  };
}
