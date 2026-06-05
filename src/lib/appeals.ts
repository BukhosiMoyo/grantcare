import type { Prisma } from "@prisma/client";

import {
  CONTACT_DIRECTORY_SOURCE,
  OFFICIAL_SASSA_CONTACTS,
} from "@/lib/official-resources";
import { toGeneratedSetswanaText, toGeneratedXhosaText } from "@/lib/generated-guide-translations";
import { buildLocalePath, type Locale } from "@/lib/site";

export const APPEAL_GRANT_TYPES = [
  "srd_r370",
  "child_support",
  "disability",
  "older_persons",
] as const;

export const APPEAL_REJECTION_REASONS = [
  "alternative_income",
  "uif_registered",
  "nsfas_registered",
  "identity_failed",
  "medical_failed",
  "missing_documents",
  "income_threshold",
  "other",
] as const;

export type AppealGrantType = (typeof APPEAL_GRANT_TYPES)[number];
export type AppealRejectionReason = (typeof APPEAL_REJECTION_REASONS)[number];

type AppealReasonDetail = {
  actions: string[];
  documents: string[];
  explanation: string;
  guidePath: string;
  label: string;
};

type AppealSubmissionRoute = {
  href: string;
  label: string;
  method: string;
};

const GRANT_LABELS: Record<AppealGrantType, string> = {
  srd_r370: "SRD R370 Grant",
  child_support: "Child Support Grant",
  disability: "Disability Grant",
  older_persons: "Older Persons Grant",
};

const REASON_DETAILS: Record<AppealRejectionReason, AppealReasonDetail> = {
  alternative_income: {
    label: "Alternative income",
    explanation: "SASSA may have found income or support linked to your ID or bank activity.",
    actions: [
      "Check the exact declined month.",
      "Match your appeal to the income reason.",
      "Prepare bank records for that period.",
    ],
    documents: [
      "Bank statements for the declined period",
      "Affidavit explaining deposits",
      "Proof that temporary deposits were not income",
    ],
    guidePath: "/guides/how-to-use-status-reasons-in-an-appeal",
  },
  uif_registered: {
    label: "UIF registered",
    explanation: "The system may show a UIF record even if you are not currently receiving UIF.",
    actions: [
      "Check whether UIF was actually paid in the declined month.",
      "Get proof if you did not receive UIF.",
      "Keep the appeal focused on the UIF mismatch.",
    ],
    documents: [
      "UIF status or payment record",
      "Affidavit confirming unemployment",
      "Bank statements for the declined period",
    ],
    guidePath: "/guides/what-documents-help-with-an-appeal",
  },
  nsfas_registered: {
    label: "NSFAS registered",
    explanation: "The decline may be linked to a student funding record connected to your ID.",
    actions: [
      "Confirm whether NSFAS support was active.",
      "Get proof if you are not funded.",
      "Explain the funding record clearly.",
    ],
    documents: [
      "NSFAS status proof",
      "Institution letter if you are not registered",
      "Affidavit explaining your study or funding status",
    ],
    guidePath: "/guides/how-to-know-if-an-appeal-is-worth-submitting",
  },
  identity_failed: {
    label: "Identity verification failed",
    explanation: "The details used in the application may not match official identity records.",
    actions: [
      "Compare your name and ID number with your ID document.",
      "Check phone number and profile details.",
      "Fix official details before appealing if they are wrong.",
    ],
    documents: [
      "Certified ID copy",
      "Proof of corrected names if applicable",
      "Screenshot of the exact identity status wording",
    ],
    guidePath: "/status/identity-verification",
  },
  medical_failed: {
    label: "Medical assessment failed",
    explanation: "The decision may be linked to the medical assessment used for disability-related grants.",
    actions: [
      "Read the medical reason carefully.",
      "Collect recent medical evidence.",
      "Keep copies of specialist or clinic records.",
    ],
    documents: [
      "Recent medical report",
      "Clinic or specialist records",
      "Proof of treatment or functional limitation",
    ],
    guidePath: "/guides/disability-grant-documents-you-may-need",
  },
  missing_documents: {
    label: "Missing documents",
    explanation: "The application may be incomplete or blocked because required proof was missing or unclear.",
    actions: [
      "Identify the missing document.",
      "Use clear certified copies where required.",
      "Submit only documents linked to the decline reason.",
    ],
    documents: [
      "Missing document named in the official message",
      "Certified ID copy",
      "Proof of income or relationship where applicable",
    ],
    guidePath: "/guides/what-documents-you-may-need",
  },
  income_threshold: {
    label: "Income above threshold",
    explanation: "The decision may mean the recorded income for that period was above the allowed limit.",
    actions: [
      "Check the income period used in the decision.",
      "Separate income from once-off support where relevant.",
      "Appeal only if the recorded income is wrong.",
    ],
    documents: [
      "Bank statements for the review period",
      "Affidavit explaining once-off support",
      "Proof of household or personal income where relevant",
    ],
    guidePath: "/guides/when-to-appeal-a-declined-status",
  },
  other: {
    label: "Other or unsure",
    explanation: "The safest next step is to confirm the exact wording before submitting an appeal.",
    actions: [
      "Take a screenshot of the official status.",
      "Find the exact decline reason.",
      "Use the official route only after checking the wording.",
    ],
    documents: [
      "Screenshot of the official declined status",
      "ID document",
      "Any proof linked to the reason shown",
    ],
    guidePath: "/guides/how-to-use-status-check-before-appealing",
  },
};

function translateText(locale: Locale, value: string) {
  if (locale === "tn") return toGeneratedSetswanaText(value);
  if (locale === "xh") return toGeneratedXhosaText(value);
  return value;
}

function translateList(locale: Locale, values: string[]) {
  return values.map((value) => translateText(locale, value));
}

export function getAppealGrantLabel(grantType: string, locale: Locale = "en") {
  const label = GRANT_LABELS[grantType as AppealGrantType] ?? grantType;
  return translateText(locale, label);
}

export function getAppealReasonDetail(reason: string, locale: Locale = "en") {
  const detail = REASON_DETAILS[reason as AppealRejectionReason] ?? REASON_DETAILS.other;

  return {
    ...detail,
    actions: translateList(locale, detail.actions),
    documents: translateList(locale, detail.documents),
    explanation: translateText(locale, detail.explanation),
    label: translateText(locale, detail.label),
  };
}

export function getAppealReasonOptions(locale: Locale = "en") {
  return APPEAL_REJECTION_REASONS.map((value) => ({
    label: getAppealReasonDetail(value, locale).label,
    value,
  }));
}

export function getAppealSubmissionRoute(grantType: string, locale: Locale = "en"): AppealSubmissionRoute {
  if (grantType === "srd_r370") {
    return {
      href: "https://srd.sassa.gov.za/appeals/www.dsd.gov.za",
      label: translateText(locale, "SRD appeals portal"),
      method: translateText(locale, "Submit online through the official DSD appeal route."),
    };
  }

  return {
    href: CONTACT_DIRECTORY_SOURCE.href,
    label: translateText(locale, "SASSA or ITSAA contact route"),
    method: translateText(locale, "Use the official SASSA office or Independent Tribunal contact route."),
  };
}

export function getAppealOfficialContacts(locale: Locale = "en") {
  const contacts = OFFICIAL_SASSA_CONTACTS.filter((contact) =>
    ["SRD portal", "Toll-free line", "Grant enquiries", "Head office"].includes(contact.title),
  );

  return contacts.map((contact) => ({
    ...contact,
    title: translateText(locale, contact.title),
  }));
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function parseAppealDate(value: string) {
  const date = new Date(`${value}T12:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function calculateAppealDeadlines(decisionDate: Date, grantType: string) {
  const targetDays = grantType === "srd_r370" ? 30 : null;

  return {
    targetDeadline: targetDays ? addDays(decisionDate, targetDays) : null,
    finalDeadline: addDays(decisionDate, 90),
  };
}

export function formatDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function buildAppealPack(input: {
  appealLetter: string;
  decisionDate: Date;
  declinedMonth?: string | null;
  fullName: string;
  grantType: string;
  idNumber: string;
  locale: Locale;
  rejectionReason: string;
  warnings: string[];
}) {
  const reason = getAppealReasonDetail(input.rejectionReason, input.locale);
  const route = getAppealSubmissionRoute(input.grantType, input.locale);
  const deadlines = calculateAppealDeadlines(input.decisionDate, input.grantType);

  return {
    appealLetter: input.appealLetter,
    actions: reason.actions,
    contacts: getAppealOfficialContacts(input.locale),
    decisionDate: formatDateInputValue(input.decisionDate),
    declinedMonth: input.declinedMonth ?? null,
    finalDeadline: formatDateInputValue(deadlines.finalDeadline),
    grantLabel: getAppealGrantLabel(input.grantType, input.locale),
    guidePath: reason.guidePath,
    reasonExplanation: reason.explanation,
    reasonLabel: reason.label,
    requiredDocuments: reason.documents,
    route,
    targetDeadline: deadlines.targetDeadline ? formatDateInputValue(deadlines.targetDeadline) : null,
    warnings: input.warnings,
  };
}

export type AppealPack = ReturnType<typeof buildAppealPack>;

export function buildAppealReminderPayload(input: {
  appealCaseId: string;
  finalDeadline: Date;
  grantType: string;
  locale: Locale;
  rejectionReason: string;
  resultPath: string;
}): Prisma.InputJsonObject {
  return {
    appealCaseId: input.appealCaseId,
    finalDeadline: formatDateInputValue(input.finalDeadline),
    grantLabel: getAppealGrantLabel(input.grantType, input.locale),
    locale: input.locale,
    reasonLabel: getAppealReasonDetail(input.rejectionReason, input.locale).label,
    resultPath: input.resultPath,
  };
}

export function parseAppealReminderPayload(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const payload = value as Record<string, unknown>;

  if (
    typeof payload.appealCaseId !== "string" ||
    typeof payload.finalDeadline !== "string" ||
    typeof payload.grantLabel !== "string" ||
    typeof payload.locale !== "string" ||
    typeof payload.reasonLabel !== "string" ||
    typeof payload.resultPath !== "string"
  ) {
    return null;
  }

  return {
    appealCaseId: payload.appealCaseId,
    finalDeadline: payload.finalDeadline,
    grantLabel: payload.grantLabel,
    locale: payload.locale as Locale,
    reasonLabel: payload.reasonLabel,
    resultPath: payload.resultPath,
  };
}

export function buildAppealResultPath(locale: Locale, generationId: string) {
  return buildLocalePath(locale, `/tools/sassa-appeal/result/${generationId}`);
}
