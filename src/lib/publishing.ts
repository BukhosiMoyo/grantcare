import { PaymentDateState } from "@prisma/client";
import { z } from "zod";

import { db } from "@/lib/prisma";
import { syncReminderJobsForPaymentEntry } from "@/lib/reminders";
import { assertDatabaseConfigured } from "@/lib/server-env";

const sectionSchema = z.object({
  title: z.string().trim().min(1).max(160),
  body: z.string().trim().min(1),
});

const internalLinkSchema = z.string().trim().regex(/^\/[^\s]*$/);
const publishStatusSchema = z.enum(["draft", "published"]);
const isoDateSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/);

export const publishGuideInputSchema = z.object({
  id: z.string().trim().optional(),
  slug: z.string().trim().optional(),
  title: z.string().trim().min(2).max(160),
  summary: z.string().trim().min(2).max(240),
  sections: z.array(sectionSchema).min(1),
  internalLinks: z.array(internalLinkSchema).default([]),
  featured: z.boolean().default(false),
  sponsored: z.boolean().default(false),
  sortOrder: z.number().int().min(0).max(999).default(0),
  status: publishStatusSchema.default("published"),
  publishedAt: isoDateSchema.optional(),
});

export const publishNewsInputSchema = z.object({
  id: z.string().trim().optional(),
  slug: z.string().trim().optional(),
  title: z.string().trim().min(2).max(160),
  summary: z.string().trim().min(2).max(240),
  sections: z.array(sectionSchema).min(1),
  sourceUrls: z.array(z.string().trim().url()).default([]),
  internalLinks: z.array(internalLinkSchema).default([]),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().min(0).max(999).default(0),
  status: publishStatusSchema.default("published"),
  publishedAt: isoDateSchema.optional(),
});

export const paymentPeriodSyncInputSchema = z.object({
  year: z.number().int().min(2024).max(2100),
  month: z.number().int().min(1).max(12),
  published: z.boolean().default(true),
  entries: z.array(
    z.object({
      grantSlug: z.string().trim().min(1),
      state: z.enum(["expected", "pending", "portal_only"]),
      paymentDate: isoDateSchema.nullish(),
      note: z.string().trim().nullish(),
      published: z.boolean().default(true),
    }),
  ).min(1),
});

export type PublishGuideInput = z.infer<typeof publishGuideInputSchema>;
export type PublishNewsInput = z.infer<typeof publishNewsInputSchema>;
export type PaymentPeriodSyncInput = z.infer<typeof paymentPeriodSyncInputSchema>;

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function normalizeInternalLinks(links: string[]) {
  return Array.from(new Set(links.map((link) => link.trim()).filter(Boolean)));
}

function buildSectionsWithInternalLinks(
  sections: Array<{ title: string; body: string }>,
  internalLinks: string[],
) {
  const links = normalizeInternalLinks(internalLinks);
  const nextSections = sections.filter(
    (section) => section.title.trim().toLowerCase() !== "related pages",
  );

  if (links.length === 0) {
    return nextSections;
  }

  nextSections.push({
    title: "Related pages",
    body: links.map((link) => `• ${link}`).join("\n"),
  });

  return nextSections;
}

function resolvePublishedAt(
  status: "draft" | "published",
  currentPublishedAt?: Date | null,
  publishedAt?: string,
) {
  if (status !== "published") {
    return null;
  }

  if (publishedAt) {
    return new Date(`${publishedAt}T00:00:00.000Z`);
  }

  return currentPublishedAt ?? new Date();
}

export async function upsertGuideArticle(input: PublishGuideInput) {
  assertDatabaseConfigured();

  const parsed = publishGuideInputSchema.parse(input);
  const slug = parsed.slug?.trim() || slugify(parsed.title);
  const existing = parsed.id
    ? await db.guideArticle.findUnique({
        where: { id: parsed.id },
        select: { id: true, publishedAt: true },
      })
    : await db.guideArticle.findUnique({
        where: { slug },
        select: { id: true, publishedAt: true },
      });

  const payload = {
    slug,
    title: parsed.title,
    summary: parsed.summary,
    sections: buildSectionsWithInternalLinks(parsed.sections, parsed.internalLinks),
    featured: parsed.featured,
    sponsored: parsed.sponsored,
    sortOrder: parsed.sortOrder,
    status: parsed.status,
    publishedAt: resolvePublishedAt(parsed.status, existing?.publishedAt, parsed.publishedAt),
  };

  const article = existing?.id
    ? await db.guideArticle.update({
        where: { id: existing.id },
        data: payload,
      })
    : await db.guideArticle.create({
        data: payload,
      });

  return {
    id: article.id,
    slug: article.slug,
    status: article.status,
    publishedAt: article.publishedAt?.toISOString() ?? null,
  };
}

export async function upsertNewsArticle(input: PublishNewsInput) {
  assertDatabaseConfigured();

  const parsed = publishNewsInputSchema.parse(input);
  const slug = parsed.slug?.trim() || slugify(parsed.title);
  const existing = parsed.id
    ? await db.newsArticle.findUnique({
        where: { id: parsed.id },
        select: { id: true, publishedAt: true },
      })
    : await db.newsArticle.findUnique({
        where: { slug },
        select: { id: true, publishedAt: true },
      });

  const payload = {
    slug,
    title: parsed.title,
    summary: parsed.summary,
    sections: buildSectionsWithInternalLinks(parsed.sections, parsed.internalLinks),
    sourceUrls: parsed.sourceUrls,
    featured: parsed.featured,
    sortOrder: parsed.sortOrder,
    status: parsed.status,
    publishedAt: resolvePublishedAt(parsed.status, existing?.publishedAt, parsed.publishedAt),
  };

  const article = existing?.id
    ? await db.newsArticle.update({
        where: { id: existing.id },
        data: payload,
      })
    : await db.newsArticle.create({
        data: payload,
      });

  return {
    id: article.id,
    slug: article.slug,
    status: article.status,
    publishedAt: article.publishedAt?.toISOString() ?? null,
  };
}

export async function syncPaymentPeriod(input: PaymentPeriodSyncInput) {
  assertDatabaseConfigured();

  const parsed = paymentPeriodSyncInputSchema.parse(input);
  const period = await db.paymentPeriod.upsert({
    where: {
      year_month: {
        year: parsed.year,
        month: parsed.month,
      },
    },
    update: {
      published: parsed.published,
    },
    create: {
      year: parsed.year,
      month: parsed.month,
      published: parsed.published,
    },
  });

  const results: Array<{
    grantSlug: string;
    entryId: string;
    published: boolean;
  }> = [];

  for (const entry of parsed.entries) {
    const grantType = await db.grantType.findUnique({
      where: { slug: entry.grantSlug },
      select: { id: true },
    });

    if (!grantType) {
      throw new Error(`Grant type not found for slug "${entry.grantSlug}".`);
    }

    const existing = await db.paymentDateEntry.findUnique({
      where: {
        periodId_grantTypeId: {
          periodId: period.id,
          grantTypeId: grantType.id,
        },
      },
    });

    const savedEntry = existing
      ? await db.paymentDateEntry.update({
          where: { id: existing.id },
          data: {
            state: entry.state as PaymentDateState,
            paymentDate: entry.paymentDate ? new Date(`${entry.paymentDate}T00:00:00.000Z`) : null,
            note: entry.note ?? null,
            published: entry.published,
            publishedAt:
              entry.published && !existing.published
                ? new Date()
                : existing.publishedAt ?? null,
          },
        })
      : await db.paymentDateEntry.create({
          data: {
            periodId: period.id,
            grantTypeId: grantType.id,
            state: entry.state as PaymentDateState,
            paymentDate: entry.paymentDate ? new Date(`${entry.paymentDate}T00:00:00.000Z`) : null,
            note: entry.note ?? null,
            published: entry.published,
            publishedAt: entry.published ? new Date() : null,
          },
        });

    await syncReminderJobsForPaymentEntry(savedEntry.id, {
      enqueuePublishNotification: entry.published && (!existing || !existing.published),
    });

    results.push({
      grantSlug: entry.grantSlug,
      entryId: savedEntry.id,
      published: savedEntry.published,
    });
  }

  return {
    periodId: period.id,
    year: period.year,
    month: period.month,
    updatedEntries: results,
  };
}
