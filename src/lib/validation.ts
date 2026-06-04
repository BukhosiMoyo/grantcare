import { z } from "zod";

import type { Locale } from "@/lib/site";

const localeCodes = ["en", "zu", "xh", "af", "nso", "tn"] as const satisfies readonly Locale[];
const localeEnum = z.enum(localeCodes);

const ENGLISH_VALIDATION_COPY = {
  confirmPasswordRequired: "Confirm your password.",
  emailInvalid: "Enter a valid email address.",
  emailRequired: "Enter your email address.",
  nameMax: "Name must be 80 characters or fewer.",
  nameMin: "Name must be at least 2 characters.",
  nameRequired: "Enter your name.",
  passwordMax: "Password must be 100 characters or fewer.",
  passwordMin: "Password must be at least 8 characters.",
  passwordMismatch: "Passwords do not match.",
  passwordRequired: "Enter your password.",
  resetLinkInvalid: "Reset link is not valid.",
};

type ValidationCopy = typeof ENGLISH_VALIDATION_COPY;

const VALIDATION_COPY: Partial<Record<Locale, Partial<ValidationCopy>>> = {
  en: ENGLISH_VALIDATION_COPY,
  zu: {
    confirmPasswordRequired: "Qinisekisa iphasiwedi yakho.",
    emailInvalid: "Faka ikheli le-imeyili elisebenzayo.",
    emailRequired: "Faka ikheli lakho le-imeyili.",
    nameMax: "Igama kufanele libe nezinhlamvu ezingu-80 noma ngaphansi.",
    nameMin: "Igama kufanele libe nezinhlamvu okungenani ezingu-2.",
    nameRequired: "Faka igama lakho.",
    passwordMax: "Iphasiwedi kufanele ibe nezinhlamvu ezingu-100 noma ngaphansi.",
    passwordMin: "Iphasiwedi kufanele ibe nezinhlamvu okungenani ezingu-8.",
    passwordMismatch: "Amaphasiwedi awafani.",
    passwordRequired: "Faka iphasiwedi yakho.",
    resetLinkInvalid: "Isixhumanisi sokusetha kabusha asivumelekile.",
  },
};

function getValidationCopy(locale: Locale = "en") {
  return {
    ...ENGLISH_VALIDATION_COPY,
    ...VALIDATION_COPY[locale],
  };
}

function createEmailSchema(locale: Locale = "en") {
  const copy = getValidationCopy(locale);

  return z
    .string()
    .trim()
    .min(1, copy.emailRequired)
    .email(copy.emailInvalid)
    .transform((value) => value.toLowerCase());
}

function createPasswordSchema(locale: Locale = "en") {
  const copy = getValidationCopy(locale);

  return z
    .string()
    .min(1, copy.passwordRequired)
    .min(8, copy.passwordMin)
    .max(100, copy.passwordMax);
}

export function getSignInSchema(locale: Locale = "en") {
  return z.object({
    email: createEmailSchema(locale),
    password: createPasswordSchema(locale),
  });
}

export function getSignUpSchema(locale: Locale = "en") {
  const copy = getValidationCopy(locale);

  return z
    .object({
      name: z
        .string()
        .trim()
        .min(1, copy.nameRequired)
        .min(2, copy.nameMin)
        .max(80, copy.nameMax),
      email: createEmailSchema(locale),
      password: createPasswordSchema(locale),
      confirmPassword: z.string().min(1, copy.confirmPasswordRequired),
    })
    .superRefine((value, context) => {
      if (value.password !== value.confirmPassword) {
        context.addIssue({
          code: "custom",
          message: copy.passwordMismatch,
          path: ["confirmPassword"],
        });
      }
    });
}

export function getForgotPasswordSchema(locale: Locale = "en") {
  return z.object({
    email: createEmailSchema(locale),
  });
}

export function getResetPasswordSchema(locale: Locale = "en") {
  const copy = getValidationCopy(locale);

  return z
    .object({
      token: z.string().trim().min(1, copy.resetLinkInvalid),
      password: createPasswordSchema(locale),
      confirmPassword: z.string().min(1, copy.confirmPasswordRequired),
    })
    .superRefine((value, context) => {
      if (value.password !== value.confirmPassword) {
        context.addIssue({
          code: "custom",
          message: copy.passwordMismatch,
          path: ["confirmPassword"],
        });
      }
    });
}

export const signInSchema = getSignInSchema();
export const signUpSchema = getSignUpSchema();
export const forgotPasswordSchema = getForgotPasswordSchema();
export const resetPasswordSchema = getResetPasswordSchema();

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

export const newsArticleSchema = z.object({
  id: z.string().trim().nullable(),
  slug: z.string().trim().min(2).max(80),
  title: z.string().trim().min(2).max(160),
  summary: z.string().trim().min(2).max(240),
  featured: z.boolean(),
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
