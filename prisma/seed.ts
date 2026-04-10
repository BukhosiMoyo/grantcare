import { readFile } from "node:fs/promises";
import path from "node:path";

import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

import {
  FALLBACK_FAQS,
  FALLBACK_GUIDES,
  FALLBACK_GRANT_TYPES,
  FALLBACK_NOTICES,
  FALLBACK_PAYMENT_PERIODS,
  FALLBACK_STATUS_MEANINGS,
  type PublicFaq,
  type PublicGrantType,
  type PublicGuide,
  type PublicNotice,
  type PublicPaymentPeriod,
  type PublicStatusMeaning,
} from "../src/lib/fallback-content";

const prisma = new PrismaClient();

type SeedBundle = {
  faqs: PublicFaq[];
  grantTypes: PublicGrantType[];
  guides: PublicGuide[];
  notices: PublicNotice[];
  paymentPeriods: PublicPaymentPeriod[];
  statuses: PublicStatusMeaning[];
};

const DEFAULT_SEED_BUNDLE: SeedBundle = {
  faqs: FALLBACK_FAQS,
  grantTypes: FALLBACK_GRANT_TYPES,
  guides: FALLBACK_GUIDES,
  notices: FALLBACK_NOTICES,
  paymentPeriods: FALLBACK_PAYMENT_PERIODS,
  statuses: FALLBACK_STATUS_MEANINGS,
};

function assertSeedBundle(value: unknown): asserts value is SeedBundle {
  if (!value || typeof value !== "object") {
    throw new Error("Seed content must be an object.");
  }

  const candidate = value as Record<string, unknown>;
  const requiredKeys = ["faqs", "grantTypes", "guides", "notices", "paymentPeriods", "statuses"];

  for (const key of requiredKeys) {
    if (!Array.isArray(candidate[key])) {
      throw new Error(`Seed content is missing the "${key}" array.`);
    }
  }
}

async function loadSeedBundle() {
  const contentFile = process.env.SEED_CONTENT_FILE;

  if (!contentFile) {
    return DEFAULT_SEED_BUNDLE;
  }

  const resolvedPath = path.isAbsolute(contentFile)
    ? contentFile
    : path.resolve(process.cwd(), contentFile);
  const raw = await readFile(resolvedPath, "utf8");
  const parsed = JSON.parse(raw) as unknown;

  assertSeedBundle(parsed);
  console.log(`Using seed content from ${resolvedPath}`);

  return parsed;
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.log("DATABASE_URL is not set. Seed skipped.");
    return;
  }

  const seedBundle = await loadSeedBundle();
  const grantTypeBySlug = new Map<string, string>();

  for (const grant of seedBundle.grantTypes) {
    const record = await prisma.grantType.upsert({
      where: { slug: grant.slug },
      update: {
        name: grant.name,
        shortName: grant.shortName,
        summary: grant.summary,
        officialHref: grant.officialHref,
        checks: grant.checks,
        documents: grant.documents,
        showInPaymentTool: grant.showInPaymentTool,
        showInGrantLibrary: grant.showInGrantLibrary,
        sortOrder: grant.sortOrder,
        status: "published",
        publishedAt: new Date(),
        translations: grant.translations ?? undefined,
      },
      create: {
        slug: grant.slug,
        name: grant.name,
        shortName: grant.shortName,
        summary: grant.summary,
        officialHref: grant.officialHref,
        checks: grant.checks,
        documents: grant.documents,
        showInPaymentTool: grant.showInPaymentTool,
        showInGrantLibrary: grant.showInGrantLibrary,
        sortOrder: grant.sortOrder,
        status: "published",
        publishedAt: new Date(),
        translations: grant.translations ?? undefined,
      },
    });

    grantTypeBySlug.set(grant.slug, record.id);
  }

  for (const grant of seedBundle.grantTypes) {
    if (!grant.paymentGroupSlug) {
      continue;
    }

    await prisma.grantType.update({
      where: { slug: grant.slug },
      data: {
        paymentGroupId: grantTypeBySlug.get(grant.paymentGroupSlug),
      },
    });
  }

  for (const status of seedBundle.statuses) {
    await prisma.statusMeaning.upsert({
      where: { slug: status.slug },
      update: {
        title: status.title,
        meaning: status.meaning,
        causes: status.causes,
        fixes: status.fixes,
        nextSteps: status.nextSteps,
        officialHref: status.officialHref,
        sortOrder: status.sortOrder,
        status: "published",
        publishedAt: new Date(),
        translations: status.translations ?? undefined,
      },
      create: {
        slug: status.slug,
        title: status.title,
        meaning: status.meaning,
        causes: status.causes,
        fixes: status.fixes,
        nextSteps: status.nextSteps,
        officialHref: status.officialHref,
        sortOrder: status.sortOrder,
        status: "published",
        publishedAt: new Date(),
        translations: status.translations ?? undefined,
      },
    });
  }

  for (const guide of seedBundle.guides) {
    await prisma.guideArticle.upsert({
      where: { slug: guide.slug },
      update: {
        title: guide.title,
        summary: guide.summary,
        sections: guide.sections,
        featured: guide.featured,
        sponsored: guide.sponsored,
        sortOrder: guide.sortOrder,
        status: "published",
        publishedAt: new Date(),
        translations: guide.translations ?? undefined,
      },
      create: {
        slug: guide.slug,
        title: guide.title,
        summary: guide.summary,
        sections: guide.sections,
        featured: guide.featured,
        sponsored: guide.sponsored,
        sortOrder: guide.sortOrder,
        status: "published",
        publishedAt: new Date(),
        translations: guide.translations ?? undefined,
      },
    });
  }

  for (const [index, faq] of seedBundle.faqs.entries()) {
    await prisma.faqEntry.upsert({
      where: { id: faq.id },
      update: {
        question: faq.question,
        answer: faq.answer,
        sortOrder: faq.sortOrder ?? index,
        status: "published",
        publishedAt: new Date(),
        translations: faq.translations ?? undefined,
      },
      create: {
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        sortOrder: faq.sortOrder ?? index,
        status: "published",
        publishedAt: new Date(),
        translations: faq.translations ?? undefined,
      },
    });
  }

  for (const notice of seedBundle.notices) {
    await prisma.notice.upsert({
      where: { slug: notice.slug },
      update: {
        title: notice.title,
        body: notice.body,
        href: notice.href,
        tone: notice.tone,
        sortOrder: notice.sortOrder,
        status: notice.status,
        publishedAt: notice.status === "published" ? new Date() : null,
        startsAt: notice.startsAt ? new Date(notice.startsAt) : null,
        endsAt: notice.endsAt ? new Date(notice.endsAt) : null,
        translations: notice.translations ?? undefined,
      },
      create: {
        slug: notice.slug,
        title: notice.title,
        body: notice.body,
        href: notice.href,
        tone: notice.tone,
        sortOrder: notice.sortOrder,
        status: notice.status,
        publishedAt: notice.status === "published" ? new Date() : null,
        startsAt: notice.startsAt ? new Date(notice.startsAt) : null,
        endsAt: notice.endsAt ? new Date(notice.endsAt) : null,
        translations: notice.translations ?? undefined,
      },
    });
  }

  for (const period of seedBundle.paymentPeriods) {
    const periodRecord = await prisma.paymentPeriod.upsert({
      where: {
        year_month: {
          year: period.year,
          month: period.month,
        },
      },
      update: {
        published: period.published,
      },
      create: {
        year: period.year,
        month: period.month,
        published: period.published,
      },
    });

    for (const entry of period.entries) {
      const grantTypeId = grantTypeBySlug.get(entry.grantSlug);
      if (!grantTypeId) {
        continue;
      }

      await prisma.paymentDateEntry.upsert({
        where: {
          periodId_grantTypeId: {
            periodId: periodRecord.id,
            grantTypeId,
          },
        },
        update: {
          state: entry.state === "portal-only" ? "portal_only" : entry.state,
          paymentDate: entry.date ? new Date(`${entry.date}T00:00:00.000Z`) : null,
          note: entry.note,
          published: entry.published,
          publishedAt: entry.published ? new Date() : null,
          translations: entry.translations ?? undefined,
        },
        create: {
          periodId: periodRecord.id,
          grantTypeId,
          state: entry.state === "portal-only" ? "portal_only" : entry.state,
          paymentDate: entry.date ? new Date(`${entry.date}T00:00:00.000Z`) : null,
          note: entry.note,
          published: entry.published,
          publishedAt: entry.published ? new Date() : null,
          translations: entry.translations ?? undefined,
        },
      });
    }
  }

  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@local.grantcare.test";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: "admin",
      passwordHash: await hash(adminPassword, 12),
      preferredLocale: "en",
    },
    create: {
      name: "Local Admin",
      email: adminEmail,
      role: "admin",
      passwordHash: await hash(adminPassword, 12),
      preferredLocale: "en",
    },
  });

  console.log("Seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
