import { db } from "@/lib/prisma";
import { assertDatabaseConfigured } from "@/lib/server-env";

export type AnalyticsWindow = "7d" | "30d";

function getWindowStart(window: AnalyticsWindow) {
  const days = window === "30d" ? 30 : 7;
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

function countByKey(values: Array<string | null | undefined>) {
  const counts = new Map<string, number>();

  for (const value of values) {
    if (!value) {
      continue;
    }

    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((left, right) => right.value - left.value);
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
      .map((event) => {
        if (!event.payload || typeof event.payload !== "object" || Array.isArray(event.payload)) {
          return null;
        }

        const href = (event.payload as Record<string, unknown>).href;
        return typeof href === "string" ? href : null;
      }),
  ).slice(0, 5);

  const languageDistribution = countByKey(users.map((user) => user.preferredLocale));
  const preferredGrantDistribution = countByKey(
    users.map((user) =>
      user.preferredGrantTypeId ? grantTypeNameById.get(user.preferredGrantTypeId) ?? "Unknown grant" : "No preference",
    ),
  );

  const totals = {
    logins: events.filter((event) => event.name === "account.login").length,
    signups: events.filter((event) => event.name === "account.signup").length,
    reminderSignups: events.filter((event) => event.name === "reminder.signup").length,
    reminderUnsubscribes: events.filter((event) => event.name === "reminder.unsubscribe").length,
    routeViews: routeViews.reduce((total, item) => total + item.value, 0),
  };

  return {
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
