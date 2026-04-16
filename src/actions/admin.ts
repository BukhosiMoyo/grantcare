"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth-guards";
import {
  getBoolean,
  getNumber,
  getOptionalString,
  getRequiredString,
  parseLineList,
  parseLocalizedFields,
  parseLocalizedListFields,
  parseSectionsInput,
} from "@/lib/form-utils";
import { db } from "@/lib/prisma";
import { syncReminderJobsForPaymentEntry } from "@/lib/reminders";
import { buildLocalePath, isLocale } from "@/lib/site";
import {
  faqSchema,
  grantTypeSchema,
  guideSchema,
  monetizationBlockSchema,
  newsArticleSchema,
  noticeSchema,
  paymentEntrySchema,
  statusMeaningSchema,
} from "@/lib/validation";

function getLocale(value: FormDataEntryValue | null) {
  return typeof value === "string" && isLocale(value) ? value : "en";
}

function buildRedirect(path: string, params: Record<string, string | null | undefined>) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      searchParams.set(key, value);
    }
  }

  return `${path}${searchParams.size > 0 ? `?${searchParams.toString()}` : ""}`;
}

function handleAdminError(
  locale: ReturnType<typeof getLocale>,
  path: string,
  error: string,
): never {
  redirect(
    buildRedirect(buildLocalePath(locale, path), {
      error,
    }),
  );
}

function resolvePublishedAt(
  status: "draft" | "published",
  currentPublishedAt?: Date | null,
) {
  if (status !== "published") {
    return null;
  }

  return currentPublishedAt ?? new Date();
}

export async function upsertGrantTypeAction(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await requireAdmin(locale, buildLocalePath(locale, "/admin/grants"));

  const parsed = grantTypeSchema.safeParse({
    id: getOptionalString(formData, "id"),
    slug: getRequiredString(formData, "slug"),
    name: getRequiredString(formData, "name"),
    shortName: getOptionalString(formData, "shortName"),
    summary: getRequiredString(formData, "summary"),
    officialHref: getRequiredString(formData, "officialHref"),
    showInPaymentTool: getBoolean(formData, "showInPaymentTool"),
    showInGrantLibrary: getBoolean(formData, "showInGrantLibrary"),
    paymentGroupId: getOptionalString(formData, "paymentGroupId"),
    sortOrder: getNumber(formData, "sortOrder"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    handleAdminError(locale, "/admin/grants", "Check the grant form and try again.");
  }

  const data = parsed.data;
  const existingGrant = data.id
    ? await db.grantType.findUnique({
        where: { id: data.id },
        select: { publishedAt: true },
      })
    : null;

  const translations = {
    ...parseLocalizedFields(formData, ["name", "shortName", "summary"]),
    ...parseLocalizedListFields(formData, ["checks", "documents"]),
  };

  const payload = {
    slug: data.slug,
    name: data.name,
    shortName: data.shortName,
    summary: data.summary,
    officialHref: data.officialHref,
    checks: parseLineList(getOptionalString(formData, "checks")),
    documents: parseLineList(getOptionalString(formData, "documents")),
    showInPaymentTool: data.showInPaymentTool,
    showInGrantLibrary: data.showInGrantLibrary,
    paymentGroupId: data.paymentGroupId,
    sortOrder: data.sortOrder,
    status: data.status,
    publishedAt: resolvePublishedAt(data.status, existingGrant?.publishedAt),
    translations: Object.keys(translations).length > 0 ? translations : undefined,
  };

  try {
    if (data.id) {
      await db.grantType.update({
        where: { id: data.id },
        data: payload,
      });
    } else {
      await db.grantType.create({
        data: payload,
      });
    }
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      handleAdminError(locale, "/admin/grants", "Slug already exists.");
    }

    throw error;
  }

  revalidatePath(buildLocalePath(locale, "/admin/grants"));
  revalidatePath(buildLocalePath(locale));
  redirect(
    buildRedirect(buildLocalePath(locale, "/admin/grants"), {
      message: "Grant saved.",
    }),
  );
}

export async function deleteGrantTypeAction(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await requireAdmin(locale, buildLocalePath(locale, "/admin/grants"));
  const id = getRequiredString(formData, "id");

  if (!id) {
    handleAdminError(locale, "/admin/grants", "Grant not found.");
  }

  await db.grantType.delete({ where: { id } });

  revalidatePath(buildLocalePath(locale, "/admin/grants"));
  revalidatePath(buildLocalePath(locale));
  redirect(
    buildRedirect(buildLocalePath(locale, "/admin/grants"), {
      message: "Grant deleted.",
    }),
  );
}

export async function upsertPaymentDateAction(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await requireAdmin(locale, buildLocalePath(locale, "/admin/payment-dates"));

  const parsed = paymentEntrySchema.safeParse({
    periodId: getOptionalString(formData, "periodId"),
    entryId: getOptionalString(formData, "entryId"),
    year: getNumber(formData, "year"),
    month: getNumber(formData, "month"),
    grantTypeId: getRequiredString(formData, "grantTypeId"),
    state: getRequiredString(formData, "state"),
    paymentDate: getOptionalString(formData, "paymentDate"),
    note: getOptionalString(formData, "note"),
    published: getBoolean(formData, "published"),
  });

  if (!parsed.success) {
    handleAdminError(locale, "/admin/payment-dates", "Check the payment date form and try again.");
  }

  const period = await db.paymentPeriod.upsert({
    where: {
      year_month: {
        year: parsed.data.year,
        month: parsed.data.month,
      },
    },
    update: {
      published: true,
    },
    create: {
      year: parsed.data.year,
      month: parsed.data.month,
      published: true,
    },
  });

  const existingEntry = parsed.data.entryId
    ? await db.paymentDateEntry.findUnique({ where: { id: parsed.data.entryId } })
    : null;

  const translations = parseLocalizedFields(formData, ["note"]);

  const entry = parsed.data.entryId
    ? await db.paymentDateEntry.update({
        where: { id: parsed.data.entryId },
        data: {
          periodId: period.id,
          grantTypeId: parsed.data.grantTypeId,
          state: parsed.data.state,
          paymentDate: parsed.data.paymentDate ? new Date(`${parsed.data.paymentDate}T00:00:00.000Z`) : null,
          note: parsed.data.note,
          published: parsed.data.published,
          publishedAt:
            parsed.data.published && !existingEntry?.published ? new Date() : existingEntry?.publishedAt ?? null,
          translations: translations ?? Prisma.JsonNull,
        },
      })
    : await db.paymentDateEntry.create({
        data: {
          periodId: period.id,
          grantTypeId: parsed.data.grantTypeId,
          state: parsed.data.state,
          paymentDate: parsed.data.paymentDate ? new Date(`${parsed.data.paymentDate}T00:00:00.000Z`) : null,
          note: parsed.data.note,
          published: parsed.data.published,
          publishedAt: parsed.data.published ? new Date() : null,
          translations: translations ?? undefined,
        },
      });

  await syncReminderJobsForPaymentEntry(entry.id, {
    enqueuePublishNotification:
      parsed.data.published && (!existingEntry || !existingEntry.published),
  });

  revalidatePath(buildLocalePath(locale, "/admin/payment-dates"));
  revalidatePath(buildLocalePath(locale, "/payment-dates"));
  redirect(
    buildRedirect(buildLocalePath(locale, "/admin/payment-dates"), {
      message: "Payment date saved.",
    }),
  );
}

export async function deletePaymentDateAction(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await requireAdmin(locale, buildLocalePath(locale, "/admin/payment-dates"));
  const id = getRequiredString(formData, "id");

  if (!id) {
    handleAdminError(locale, "/admin/payment-dates", "Payment entry not found.");
  }

  await db.paymentDateEntry.delete({ where: { id } });

  revalidatePath(buildLocalePath(locale, "/admin/payment-dates"));
  revalidatePath(buildLocalePath(locale, "/payment-dates"));
  redirect(
    buildRedirect(buildLocalePath(locale, "/admin/payment-dates"), {
      message: "Payment date deleted.",
    }),
  );
}

export async function upsertStatusMeaningAction(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await requireAdmin(locale, buildLocalePath(locale, "/admin/statuses"));

  const parsed = statusMeaningSchema.safeParse({
    id: getOptionalString(formData, "id"),
    slug: getRequiredString(formData, "slug"),
    title: getRequiredString(formData, "title"),
    meaning: getRequiredString(formData, "meaning"),
    officialHref: getRequiredString(formData, "officialHref"),
    sortOrder: getNumber(formData, "sortOrder"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    handleAdminError(locale, "/admin/statuses", "Check the status form and try again.");
  }

  const data = parsed.data;
  const existingStatus = data.id
    ? await db.statusMeaning.findUnique({
        where: { id: data.id },
        select: { publishedAt: true },
      })
    : null;

  const translations = {
    ...parseLocalizedFields(formData, ["title", "meaning"]),
    ...parseLocalizedListFields(formData, ["causes", "fixes", "nextSteps"]),
  };

  const payload = {
    slug: data.slug,
    title: data.title,
    meaning: data.meaning,
    causes: parseLineList(getOptionalString(formData, "causes")),
    fixes: parseLineList(getOptionalString(formData, "fixes")),
    nextSteps: parseLineList(getOptionalString(formData, "nextSteps")),
    officialHref: data.officialHref,
    sortOrder: data.sortOrder,
    status: data.status,
    publishedAt: resolvePublishedAt(data.status, existingStatus?.publishedAt),
    translations: Object.keys(translations).length > 0 ? translations : undefined,
  };

  if (data.id) {
    await db.statusMeaning.update({
      where: { id: data.id },
      data: payload,
    });
  } else {
    await db.statusMeaning.create({
      data: payload,
    });
  }

  revalidatePath(buildLocalePath(locale, "/admin/statuses"));
  revalidatePath(buildLocalePath(locale, "/status"));
  redirect(
    buildRedirect(buildLocalePath(locale, "/admin/statuses"), {
      message: "Status saved.",
    }),
  );
}

export async function deleteStatusMeaningAction(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await requireAdmin(locale, buildLocalePath(locale, "/admin/statuses"));
  const id = getRequiredString(formData, "id");

  await db.statusMeaning.delete({ where: { id } });

  revalidatePath(buildLocalePath(locale, "/admin/statuses"));
  revalidatePath(buildLocalePath(locale, "/status"));
  redirect(
    buildRedirect(buildLocalePath(locale, "/admin/statuses"), {
      message: "Status deleted.",
    }),
  );
}

export async function upsertGuideAction(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await requireAdmin(locale, buildLocalePath(locale, "/admin/guides"));

  const parsed = guideSchema.safeParse({
    id: getOptionalString(formData, "id"),
    slug: getRequiredString(formData, "slug"),
    title: getRequiredString(formData, "title"),
    summary: getRequiredString(formData, "summary"),
    featured: getBoolean(formData, "featured"),
    sponsored: getBoolean(formData, "sponsored"),
    sortOrder: getNumber(formData, "sortOrder"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    handleAdminError(locale, "/admin/guides", "Check the guide form and try again.");
  }

  const data = parsed.data;
  const existingGuide = data.id
    ? await db.guideArticle.findUnique({
        where: { id: data.id },
        select: { publishedAt: true },
      })
    : null;

  const translations = parseLocalizedFields(formData, ["title", "summary"]);

  const payload = {
    slug: data.slug,
    title: data.title,
    summary: data.summary,
    sections: parseSectionsInput(getOptionalString(formData, "sections")),
    featured: data.featured,
    sponsored: data.sponsored,
    sortOrder: data.sortOrder,
    status: data.status,
    publishedAt: resolvePublishedAt(data.status, existingGuide?.publishedAt),
    translations: translations ?? undefined,
  };

  if (data.id) {
    await db.guideArticle.update({
      where: { id: data.id },
      data: payload,
    });
  } else {
    await db.guideArticle.create({
      data: payload,
    });
  }

  revalidatePath(buildLocalePath(locale, "/admin/guides"));
  revalidatePath(buildLocalePath(locale, "/guides"));
  redirect(
    buildRedirect(buildLocalePath(locale, "/admin/guides"), {
      message: "Guide saved.",
    }),
  );
}

export async function deleteGuideAction(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await requireAdmin(locale, buildLocalePath(locale, "/admin/guides"));
  const id = getRequiredString(formData, "id");

  await db.guideArticle.delete({ where: { id } });

  revalidatePath(buildLocalePath(locale, "/admin/guides"));
  revalidatePath(buildLocalePath(locale, "/guides"));
  redirect(
    buildRedirect(buildLocalePath(locale, "/admin/guides"), {
      message: "Guide deleted.",
    }),
  );
}

export async function upsertNewsArticleAction(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await requireAdmin(locale, buildLocalePath(locale, "/admin/news"));

  const parsed = newsArticleSchema.safeParse({
    id: getOptionalString(formData, "id"),
    slug: getRequiredString(formData, "slug"),
    title: getRequiredString(formData, "title"),
    summary: getRequiredString(formData, "summary"),
    featured: getBoolean(formData, "featured"),
    sortOrder: getNumber(formData, "sortOrder"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    handleAdminError(locale, "/admin/news", "Check the news form and try again.");
  }

  const data = parsed.data;
  const existingArticle = data.id
    ? await db.newsArticle.findUnique({
        where: { id: data.id },
        select: { publishedAt: true },
      })
    : null;

  const translations = parseLocalizedFields(formData, ["title", "summary"]);
  const sourceUrls = parseLineList(getOptionalString(formData, "sourceUrls"));

  const payload = {
    slug: data.slug,
    title: data.title,
    summary: data.summary,
    sections: parseSectionsInput(getOptionalString(formData, "sections")),
    sourceUrls,
    featured: data.featured,
    sortOrder: data.sortOrder,
    status: data.status,
    publishedAt: resolvePublishedAt(data.status, existingArticle?.publishedAt),
    translations: translations ?? undefined,
  };

  if (data.id) {
    await db.newsArticle.update({
      where: { id: data.id },
      data: payload,
    });
  } else {
    await db.newsArticle.create({
      data: payload,
    });
  }

  revalidatePath(buildLocalePath(locale, "/admin/news"));
  revalidatePath(buildLocalePath(locale, "/news"));
  redirect(
    buildRedirect(buildLocalePath(locale, "/admin/news"), {
      message: "News article saved.",
    }),
  );
}

export async function deleteNewsArticleAction(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await requireAdmin(locale, buildLocalePath(locale, "/admin/news"));
  const id = getRequiredString(formData, "id");

  await db.newsArticle.delete({ where: { id } });

  revalidatePath(buildLocalePath(locale, "/admin/news"));
  revalidatePath(buildLocalePath(locale, "/news"));
  redirect(
    buildRedirect(buildLocalePath(locale, "/admin/news"), {
      message: "News article deleted.",
    }),
  );
}

export async function upsertFaqAction(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await requireAdmin(locale, buildLocalePath(locale, "/admin/faqs"));

  const parsed = faqSchema.safeParse({
    id: getOptionalString(formData, "id"),
    question: getRequiredString(formData, "question"),
    answer: getRequiredString(formData, "answer"),
    sortOrder: getNumber(formData, "sortOrder"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    handleAdminError(locale, "/admin/faqs", "Check the FAQ form and try again.");
  }

  const data = parsed.data;
  const existingFaq = data.id
    ? await db.faqEntry.findUnique({
        where: { id: data.id },
        select: { publishedAt: true },
      })
    : null;

  const translations = parseLocalizedFields(formData, ["question", "answer"]);

  const payload = {
    question: data.question,
    answer: data.answer,
    sortOrder: data.sortOrder,
    status: data.status,
    publishedAt: resolvePublishedAt(data.status, existingFaq?.publishedAt),
    translations: translations ?? undefined,
  };

  if (data.id) {
    await db.faqEntry.update({
      where: { id: data.id },
      data: payload,
    });
  } else {
    await db.faqEntry.create({
      data: payload,
    });
  }

  revalidatePath(buildLocalePath(locale, "/admin/faqs"));
  revalidatePath(buildLocalePath(locale, "/faq"));
  redirect(
    buildRedirect(buildLocalePath(locale, "/admin/faqs"), {
      message: "FAQ saved.",
    }),
  );
}

export async function deleteFaqAction(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await requireAdmin(locale, buildLocalePath(locale, "/admin/faqs"));
  const id = getRequiredString(formData, "id");

  await db.faqEntry.delete({ where: { id } });

  revalidatePath(buildLocalePath(locale, "/admin/faqs"));
  revalidatePath(buildLocalePath(locale, "/faq"));
  redirect(
    buildRedirect(buildLocalePath(locale, "/admin/faqs"), {
      message: "FAQ deleted.",
    }),
  );
}

export async function upsertNoticeAction(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await requireAdmin(locale, buildLocalePath(locale, "/admin/notices"));

  const parsed = noticeSchema.safeParse({
    id: getOptionalString(formData, "id"),
    slug: getRequiredString(formData, "slug"),
    title: getRequiredString(formData, "title"),
    body: getRequiredString(formData, "body"),
    href: getOptionalString(formData, "href"),
    tone: getRequiredString(formData, "tone"),
    sortOrder: getNumber(formData, "sortOrder"),
    status: formData.get("status"),
    startsAt: getOptionalString(formData, "startsAt"),
    endsAt: getOptionalString(formData, "endsAt"),
  });

  if (!parsed.success) {
    handleAdminError(locale, "/admin/notices", "Check the notice form and try again.");
  }

  const data = parsed.data;
  const existingNotice = data.id
    ? await db.notice.findUnique({
        where: { id: data.id },
        select: { publishedAt: true },
      })
    : null;

  const translations = parseLocalizedFields(formData, ["title", "body"]);

  const payload = {
    slug: data.slug,
    title: data.title,
    body: data.body,
    href: data.href,
    tone: data.tone,
    sortOrder: data.sortOrder,
    status: data.status,
    publishedAt: resolvePublishedAt(data.status, existingNotice?.publishedAt),
    startsAt: data.startsAt ? new Date(data.startsAt) : null,
    endsAt: data.endsAt ? new Date(data.endsAt) : null,
    translations: translations ?? undefined,
  };

  if (data.id) {
    await db.notice.update({
      where: { id: data.id },
      data: payload,
    });
  } else {
    await db.notice.create({
      data: payload,
    });
  }

  revalidatePath(buildLocalePath(locale, "/admin/notices"));
  revalidatePath(buildLocalePath(locale));
  redirect(
    buildRedirect(buildLocalePath(locale, "/admin/notices"), {
      message: "Notice saved.",
    }),
  );
}

export async function deleteNoticeAction(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await requireAdmin(locale, buildLocalePath(locale, "/admin/notices"));
  const id = getRequiredString(formData, "id");

  await db.notice.delete({ where: { id } });

  revalidatePath(buildLocalePath(locale, "/admin/notices"));
  revalidatePath(buildLocalePath(locale));
  redirect(
    buildRedirect(buildLocalePath(locale, "/admin/notices"), {
      message: "Notice deleted.",
    }),
  );
}

export async function upsertMonetizationBlockAction(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await requireAdmin(locale, buildLocalePath(locale, "/admin/placements"));

  const parsed = monetizationBlockSchema.safeParse({
    id: getOptionalString(formData, "id"),
    slug: getRequiredString(formData, "slug"),
    title: getRequiredString(formData, "title"),
    body: getRequiredString(formData, "body"),
    href: getRequiredString(formData, "href"),
    ctaLabel: getRequiredString(formData, "ctaLabel"),
    disclosureLabel: getRequiredString(formData, "disclosureLabel"),
    placement: getRequiredString(formData, "placement"),
    grantTypeId: getOptionalString(formData, "grantTypeId"),
    guideId: getOptionalString(formData, "guideId"),
    sortOrder: getNumber(formData, "sortOrder"),
    status: formData.get("status"),
    startsAt: getOptionalString(formData, "startsAt"),
    endsAt: getOptionalString(formData, "endsAt"),
  });

  if (!parsed.success) {
    handleAdminError(locale, "/admin/placements", "Check the placement form and try again.");
  }

  const data = parsed.data;
  const existingBlock = data.id
    ? await db.monetizationBlock.findUnique({
        where: { id: data.id },
        select: { publishedAt: true },
      })
    : null;

  const translations = parseLocalizedFields(formData, [
    "title",
    "body",
    "ctaLabel",
    "disclosureLabel",
  ]);

  const payload = {
    slug: data.slug,
    title: data.title,
    body: data.body,
    href: data.href,
    ctaLabel: data.ctaLabel,
    disclosureLabel: data.disclosureLabel,
    placement: data.placement,
    grantTypeId: data.grantTypeId,
    guideId: data.guideId,
    sortOrder: data.sortOrder,
    status: data.status,
    publishedAt: resolvePublishedAt(data.status, existingBlock?.publishedAt),
    startsAt: data.startsAt ? new Date(data.startsAt) : null,
    endsAt: data.endsAt ? new Date(data.endsAt) : null,
    translations: translations ?? undefined,
  };

  if (data.id) {
    await db.monetizationBlock.update({
      where: { id: data.id },
      data: payload,
    });
  } else {
    await db.monetizationBlock.create({
      data: payload,
    });
  }

  revalidatePath(buildLocalePath(locale, "/admin/placements"));
  revalidatePath(buildLocalePath(locale, "/payment-dates"));
  revalidatePath(buildLocalePath(locale, "/guides"));
  revalidatePath(buildLocalePath(locale, "/dashboard"));
  redirect(
    buildRedirect(buildLocalePath(locale, "/admin/placements"), {
      message: "Placement saved.",
    }),
  );
}

export async function deleteMonetizationBlockAction(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await requireAdmin(locale, buildLocalePath(locale, "/admin/placements"));
  const id = getRequiredString(formData, "id");

  await db.monetizationBlock.delete({ where: { id } });

  revalidatePath(buildLocalePath(locale, "/admin/placements"));
  revalidatePath(buildLocalePath(locale, "/payment-dates"));
  revalidatePath(buildLocalePath(locale, "/guides"));
  revalidatePath(buildLocalePath(locale, "/dashboard"));
  redirect(
    buildRedirect(buildLocalePath(locale, "/admin/placements"), {
      message: "Placement deleted.",
    }),
  );
}
