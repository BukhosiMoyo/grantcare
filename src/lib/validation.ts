import { z } from "zod";

import type { Locale } from "@/lib/site";

const localeCodes = ["en", "zu", "xh", "af", "nso", "tn"] as const satisfies readonly Locale[];
const localeEnum = z.enum(localeCodes);

const emailSchema = z
  .string()
  .trim()
  .min(1, "Enter your email address.")
  .email("Enter a valid email address.")
  .transform((value) => value.toLowerCase());

const passwordSchema = z
  .string()
  .min(1, "Enter your password.")
  .min(8, "Password must be at least 8 characters.")
  .max(100, "Password must be 100 characters or fewer.");

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Enter your name.")
      .min(2, "Name must be at least 2 characters.")
      .max(80, "Name must be 80 characters or fewer."),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .superRefine((value, context) => {
    if (value.password !== value.confirmPassword) {
      context.addIssue({
        code: "custom",
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      });
    }
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    token: z.string().trim().min(1, "Reset link is not valid."),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .superRefine((value, context) => {
    if (value.password !== value.confirmPassword) {
      context.addIssue({
        code: "custom",
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      });
    }
  });

export const profileSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().trim().toLowerCase(),
  preferredLocale: localeEnum,
  preferredGrantTypeId: z.string().trim().nullable(),
});

export const reminderSubscriptionSchema = z.object({
  grantTypeId: z.string().trim().min(1),
  active: z.boolean(),
  oneDayBefore: z.boolean(),
  twoDaysBefore: z.boolean(),
  onPublish: z.boolean(),
});

export const contentStatusSchema = z.enum(["draft", "published"]);

export const grantTypeSchema = z.object({
  id: z.string().trim().nullable(),
  slug: z.string().trim().min(2).max(80),
  name: z.string().trim().min(2).max(120),
  shortName: z.string().trim().nullable(),
  summary: z.string().trim().min(2).max(240),
  officialHref: z.url(),
  showInPaymentTool: z.boolean(),
  showInGrantLibrary: z.boolean(),
  paymentGroupId: z.string().trim().nullable(),
  sortOrder: z.number().int().min(0).max(999),
  status: contentStatusSchema,
});

export const paymentEntrySchema = z.object({
  periodId: z.string().trim().nullable(),
  entryId: z.string().trim().nullable(),
  year: z.number().int().min(2024).max(2100),
  month: z.number().int().min(1).max(12),
  grantTypeId: z.string().trim().min(1),
  state: z.enum(["expected", "pending", "portal_only"]),
  paymentDate: z.string().trim().nullable(),
  note: z.string().trim().nullable(),
  published: z.boolean(),
});

export const statusMeaningSchema = z.object({
  id: z.string().trim().nullable(),
  slug: z.string().trim().min(2).max(80),
  title: z.string().trim().min(2).max(120),
  meaning: z.string().trim().min(2).max(240),
  officialHref: z.url(),
  sortOrder: z.number().int().min(0).max(999),
  status: contentStatusSchema,
});

export const guideSchema = z.object({
  id: z.string().trim().nullable(),
  slug: z.string().trim().min(2).max(80),
  title: z.string().trim().min(2).max(160),
  summary: z.string().trim().min(2).max(240),
  featured: z.boolean(),
  sponsored: z.boolean(),
  sortOrder: z.number().int().min(0).max(999),
  status: contentStatusSchema,
});

export const faqSchema = z.object({
  id: z.string().trim().nullable(),
  question: z.string().trim().min(2).max(180),
  answer: z.string().trim().min(2).max(320),
  sortOrder: z.number().int().min(0).max(999),
  status: contentStatusSchema,
});

export const noticeSchema = z.object({
  id: z.string().trim().nullable(),
  slug: z.string().trim().min(2).max(80),
  title: z.string().trim().min(2).max(140),
  body: z.string().trim().min(2).max(280),
  href: z.string().trim().nullable(),
  tone: z.string().trim().min(2).max(40),
  sortOrder: z.number().int().min(0).max(999),
  status: contentStatusSchema,
  startsAt: z.string().trim().nullable(),
  endsAt: z.string().trim().nullable(),
});

export const monetizationBlockSchema = z.object({
  id: z.string().trim().nullable(),
  slug: z.string().trim().min(2).max(80),
  title: z.string().trim().min(2).max(140),
  body: z.string().trim().min(2).max(280),
  href: z.url(),
  ctaLabel: z.string().trim().min(2).max(40),
  disclosureLabel: z.string().trim().min(2).max(40),
  placement: z.enum(["payment_dates", "guide_inline", "dashboard_helpful"]),
  grantTypeId: z.string().trim().nullable(),
  guideId: z.string().trim().nullable(),
  sortOrder: z.number().int().min(0).max(999),
  status: contentStatusSchema,
  startsAt: z.string().trim().nullable(),
  endsAt: z.string().trim().nullable(),
});
