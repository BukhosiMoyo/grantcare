import { createHash, createHmac, randomBytes } from "node:crypto";
import { Prisma, type InterestStatus } from "@prisma/client";

import { db } from "@/lib/prisma";
import { interestConsentText, INTEREST_CONSENT_VERSION, INTEREST_RETENTION_DAYS, type InterestTopic } from "@/lib/interest-schema";

export function isInterestCaptureEnabled() {
  return process.env.INTEREST_CAPTURE_ENABLED === "true" && Boolean(process.env.DATABASE_URL && process.env.AUTH_SECRET);
}

export function hashWithdrawalToken(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function privateHash(value: string) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("Interest capture requires AUTH_SECRET.");
  return createHmac("sha256", secret).update(value).digest("hex");
}

export class InterestRateLimitError extends Error {}

export async function saveInterest(input: {
  topic: InterestTopic;
  contactChannel: "email" | "phone";
  contactValue: string;
  sourcePath: string;
}, clientAddress: string) {
  const now = new Date();
  const contactHash = privateHash(`contact:${input.contactChannel}:${input.contactValue}`);
  const day = Math.floor(now.getTime() / 86_400_000);
  const window = Math.floor(now.getTime() / 600_000);
  // DB counters are shared across instances. Hashes avoid retaining raw network addresses.
  const buckets = [
    { key: privateHash(`contact:${contactHash}:${day}`), max: 5, ttl: 86_400_000 },
    { key: privateHash(`network:${clientAddress}:${window}`), max: 30, ttl: 600_000 },
  ];
  for (const bucket of buckets) {
    const count = await db.interestRateLimit.upsert({
      where: { key: bucket.key },
      create: { key: bucket.key, count: 1, expiresAt: new Date(now.getTime() + bucket.ttl) },
      update: { count: { increment: 1 } },
    });
    if (count.count > bucket.max) throw new InterestRateLimitError();
  }

  const token = randomBytes(24).toString("hex");
  try {
    await db.interestLead.create({ data: {
      ...input, contactHash, withdrawalHash: hashWithdrawalToken(token),
      consentVersion: INTEREST_CONSENT_VERSION,
      consentText: interestConsentText(input.topic, input.contactChannel),
      consentedAt: now,
      expiresAt: new Date(now.getTime() + INTEREST_RETENTION_DAYS * 86_400_000),
    } });
    return { withdrawalCode: token };
  } catch (error) {
    // Do not rotate another person's withdrawal code, reveal existing interest,
    // count repeated requests as new contacts, or reactivate a withdrawn record.
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") return { withdrawalCode: null };
    throw error;
  }
}

export async function withdrawInterest(token: string) {
  const result = await db.interestLead.updateMany({
    where: { withdrawalHash: hashWithdrawalToken(token), status: { not: "withdrawn" } },
    data: { status: "withdrawn", contactValue: "", confirmedAt: null, confirmedBy: null },
  });
  return result.count;
}

export async function changeInterestStatus(id: string, status: InterestStatus, adminId: string) {
  if (status === "withdrawn") {
    return db.interestLead.updateMany({ where: { id }, data: { status, contactValue: "", confirmedAt: null, confirmedBy: null } });
  }
  return db.interestLead.updateMany({
    where: { id, status: { not: "withdrawn" }, expiresAt: { gt: new Date() } },
    data: { status, confirmedAt: status === "confirmed" ? new Date() : null, confirmedBy: status === "confirmed" ? adminId : null },
  });
}

export async function cleanupInterests() {
  const now = new Date();
  const [leads, limits] = await db.$transaction([
    db.interestLead.deleteMany({ where: { expiresAt: { lte: now } } }),
    db.interestRateLimit.deleteMany({ where: { expiresAt: { lte: now } } }),
  ]);
  return { expiredInterests: leads.count, expiredCounters: limits.count };
}

export async function getInterestReport(days = 30) {
  const since = new Date(Date.now() - days * 86_400_000);
  const leads = await db.interestLead.findMany({
    where: { createdAt: { gte: since }, expiresAt: { gt: new Date() }, status: { not: "withdrawn" } },
    select: { topic: true, status: true, contactHash: true, sourcePath: true },
  });
  const topics = (["bank_account", "mobile_data", "payment_updates"] as const).map((topic) => {
    const matching = leads.filter((lead) => lead.topic === topic);
    return { topic, submitted: matching.length, confirmed: matching.filter((lead) => lead.status === "confirmed").length };
  });
  const sources = new Map<string, number>();
  for (const lead of leads) sources.set(lead.sourcePath, (sources.get(lead.sourcePath) ?? 0) + 1);
  const views = await db.analyticsEvent.count({ where: { name: "interest.form_viewed", createdAt: { gte: since } } });
  return { days, since, submitted: leads.length, uniqueContacts: new Set(leads.map((lead) => lead.contactHash)).size,
    confirmed: leads.filter((lead) => lead.status === "confirmed").length, topics, views,
    sources: [...sources].sort((a, b) => b[1] - a[1]).slice(0, 10) };
}
