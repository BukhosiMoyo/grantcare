import type { Locale } from "@/lib/site";
import { SEO_BATCH_ELEVEN_GUIDES } from "@/lib/seo-batch-eleven-guides";
import { SEO_BATCH_THIRTEEN_GUIDES } from "@/lib/seo-batch-thirteen-guides";
import { SEO_BATCH_FOURTEEN_GUIDES } from "@/lib/seo-batch-fourteen-guides";
import { SEO_BATCH_FIFTEEN_GUIDES } from "@/lib/seo-batch-fifteen-guides";
import { SEO_BATCH_SIXTEEN_GUIDES } from "@/lib/seo-batch-sixteen-guides";
import { SEO_BATCH_TWELVE_GUIDES } from "@/lib/seo-batch-twelve-guides";
import { SEO_BATCH_ONE_GUIDES } from "@/lib/seo-batch-one-guides";
import { SEO_BATCH_NINE_GUIDES } from "@/lib/seo-batch-nine-guides";
import { SEO_BATCH_EIGHT_GUIDES } from "@/lib/seo-batch-eight-guides";
import { SEO_BATCH_SEVEN_GUIDES } from "@/lib/seo-batch-seven-guides";
import { SEO_BATCH_SIX_GUIDES } from "@/lib/seo-batch-six-guides";
import { SEO_BATCH_TEN_GUIDES } from "@/lib/seo-batch-ten-guides";
import { SEO_BATCH_FIVE_GUIDES } from "@/lib/seo-batch-five-guides";
import { SEO_BATCH_FOUR_GUIDES } from "@/lib/seo-batch-four-guides";
import { SEO_BATCH_THREE_GUIDES } from "@/lib/seo-batch-three-guides";
import { SEO_BATCH_TWO_GUIDES } from "@/lib/seo-batch-two-guides";

export const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;

export type MonthSlug = (typeof MONTHS)[number];
export type PublicPaymentDateState = "expected" | "pending" | "portal-only";

export type LocalizedFields = Partial<
  Record<
    Locale,
    Partial<{
      name: string;
      shortName: string;
      summary: string;
      title: string;
      body: string;
      question: string;
      answer: string;
      meaning: string;
      note: string;
      checks: string[];
      documents: string[];
      causes: string[];
      fixes: string[];
      nextSteps: string[];
      sections: Array<{ title: string; body: string }>;
    }>
  >
>;

export type PublicGrantType = {
  id?: string;
  slug: string;
  name: string;
  shortName?: string | null;
  summary: string;
  officialHref: string;
  checks: string[];
  documents: string[];
  sortOrder: number;
  showInPaymentTool: boolean;
  showInGrantLibrary: boolean;
  paymentGroupSlug?: string | null;
  translations?: LocalizedFields;
};

export type PublicStatusMeaning = {
  id?: string;
  slug: string;
  title: string;
  meaning: string;
  causes: string[];
  fixes: string[];
  nextSteps: string[];
  officialHref: string;
  sortOrder: number;
  translations?: LocalizedFields;
};

export type PublicGuide = {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  sections: Array<{ title: string; body: string }>;
  featured: boolean;
  sponsored: boolean;
  sortOrder: number;
  translations?: LocalizedFields;
};

export type PublicFaq = {
  id: string;
  question: string;
  answer: string;
  sortOrder?: number;
  translations?: LocalizedFields;
};

export type PublicNotice = {
  id?: string;
  slug: string;
  title: string;
  body: string;
  href?: string | null;
  tone: string;
  sortOrder: number;
  status: "draft" | "published";
  startsAt?: string | null;
  endsAt?: string | null;
  translations?: LocalizedFields;
};

export type PublicMonetizationPlacement =
  | "payment-dates"
  | "guide-inline"
  | "dashboard-helpful";

export type PublicMonetizationBlock = {
  id?: string;
  slug: string;
  title: string;
  body: string;
  href: string;
  ctaLabel: string;
  disclosureLabel: string;
  placement: PublicMonetizationPlacement;
  sortOrder: number;
  grantSlug?: string | null;
  guideSlug?: string | null;
  status: "draft" | "published";
  startsAt?: string | null;
  endsAt?: string | null;
  translations?: LocalizedFields;
};

export type PublicPaymentEntry = {
  id?: string;
  grantSlug: string;
  grantName: string;
  shortName?: string | null;
  officialHref: string;
  state: PublicPaymentDateState;
  date: string | null;
  note: string;
  published: boolean;
  translations?: LocalizedFields;
};

export type PublicPaymentPeriod = {
  id?: string;
  year: number;
  month: number;
  monthSlug: MonthSlug;
  label: string;
  published: boolean;
  entries: PublicPaymentEntry[];
  grants: Record<string, PublicPaymentEntry>;
};

export const OFFICIAL_LINKS = [
  {
    label: "SASSA grants information",
    href: "https://services.sassa.gov.za/portal/r/sassa/sassa/grants-information",
  },
  {
    label: "SASSA how to apply",
    href: "https://services.sassa.gov.za/portal/r/sassa/sassa/how-to",
  },
  {
    label: "SASSA contact details",
    href: "https://services.sassa.gov.za/portal/r/sassa/sassa/contact-us-pu",
  },
  {
    label: "SRD official portal",
    href: "https://srd.sassa.gov.za/",
  },
] as const;

export const HOME_STEPS = [
  "Pick a tool.",
  "Read the short result.",
  "Use the official link for the official action.",
];

export const SEO_KEYWORD_CLUSTERS = [
  "sassa status check",
  "payment dates",
  "appeal",
  "banking details",
  "how to apply",
  "change phone number",
];

export const FALLBACK_MONETIZATION_BLOCKS: PublicMonetizationBlock[] = [];

export const FALLBACK_GRANT_TYPES: PublicGrantType[] = [
  {
    slug: "older-persons",
    name: "Older Persons Grant",
    shortName: "Older persons",
    summary: "Support for people aged 60 or older.",
    officialHref: OFFICIAL_LINKS[0].href,
    checks: ["60 years or older", "Lives in South Africa", "Meets the means test"],
    documents: ["South African ID or refugee status", "Proof of marital status", "Income and asset details"],
    showInPaymentTool: true,
    showInGrantLibrary: true,
    sortOrder: 0,
  },
  {
    slug: "disability",
    name: "Disability Grant",
    shortName: "Disability",
    summary: "Support for adults with a disability that limits work.",
    officialHref: OFFICIAL_LINKS[0].href,
    checks: ["18 to 59 years old", "Medical assessment", "Meets the means test"],
    documents: ["ID", "Recent medical report", "Proof of income and assets"],
    showInPaymentTool: true,
    showInGrantLibrary: true,
    sortOrder: 1,
  },
  {
    slug: "children",
    name: "Children's Grants",
    shortName: "Children",
    summary: "Payment category for Child Support, Foster Child, and Care Dependency grants.",
    officialHref: OFFICIAL_LINKS[0].href,
    checks: ["Child Support Grant", "Foster Child Grant", "Care Dependency Grant"],
    documents: ["ID", "Child documents", "Relevant support documents"],
    showInPaymentTool: true,
    showInGrantLibrary: false,
    sortOrder: 2,
  },
  {
    slug: "social-relief",
    name: "Social Relief of Distress",
    shortName: "SRD",
    summary: "Short-term relief for people with no income support.",
    officialHref: OFFICIAL_LINKS[3].href,
    checks: ["Limited or no income", "Meets official SRD rules", "Use official status system"],
    documents: ["ID", "Phone number", "Banking details if required"],
    showInPaymentTool: true,
    showInGrantLibrary: true,
    sortOrder: 3,
  },
  {
    slug: "child-support",
    name: "Child Support Grant",
    shortName: "Child support",
    summary: "Support for a primary caregiver of a child.",
    officialHref: OFFICIAL_LINKS[0].href,
    checks: ["Primary caregiver", "Child is under the age limit", "Means test applies"],
    documents: ["ID", "Child birth certificate", "Proof of income"],
    showInPaymentTool: false,
    showInGrantLibrary: true,
    paymentGroupSlug: "children",
    sortOrder: 4,
  },
  {
    slug: "foster-child",
    name: "Foster Child Grant",
    shortName: "Foster child",
    summary: "Support for a child placed in foster care.",
    officialHref: OFFICIAL_LINKS[0].href,
    checks: ["Valid court order", "Child in foster care", "South African resident"],
    documents: ["ID", "Court order", "Child birth certificate"],
    showInPaymentTool: false,
    showInGrantLibrary: true,
    paymentGroupSlug: "children",
    sortOrder: 5,
  },
  {
    slug: "care-dependency",
    name: "Care Dependency Grant",
    shortName: "Care dependency",
    summary: "Support for caregivers of children with severe disabilities.",
    officialHref: OFFICIAL_LINKS[0].href,
    checks: ["Caregiver for child under 18", "Medical assessment", "Means test applies"],
    documents: ["ID", "Child birth certificate", "Medical report"],
    showInPaymentTool: false,
    showInGrantLibrary: true,
    paymentGroupSlug: "children",
    sortOrder: 6,
  },
  {
    slug: "grant-in-aid",
    name: "Grant-in-Aid",
    shortName: "Grant-in-aid",
    summary: "Extra support if you already get a grant and need full-time care.",
    officialHref: OFFICIAL_LINKS[0].href,
    checks: ["Already receives a qualifying grant", "Needs daily care", "Medical support needed"],
    documents: ["ID", "Medical report", "Existing grant details"],
    showInPaymentTool: false,
    showInGrantLibrary: true,
    sortOrder: 7,
  },
];

export const FALLBACK_STATUS_MEANINGS: PublicStatusMeaning[] = [
  {
    slug: "approved",
    title: "Approved",
    meaning: "Your application has passed the current checks.",
    causes: ["Your application matched the current rules.", "No blocking issue was found."],
    fixes: ["Keep your banking details current.", "Watch for the payment date update."],
    nextSteps: ["Check the payment date tool.", "Use the official system if the payment still does not arrive."],
    officialHref: OFFICIAL_LINKS[3].href,
    sortOrder: 0,
  },
  {
    slug: "pending",
    title: "Pending",
    meaning: "The review is still in progress.",
    causes: ["Checks are still running.", "The system may still be matching your records."],
    fixes: ["Wait for the next update cycle.", "Avoid repeated changes unless your details changed."],
    nextSteps: ["Check again later.", "Keep your contact details correct on the official system."],
    officialHref: OFFICIAL_LINKS[3].href,
    sortOrder: 1,
  },
  {
    slug: "declined",
    title: "Declined",
    meaning: "The application did not pass one or more rules.",
    causes: ["Income or eligibility rules were not met.", "A data match may have failed."],
    fixes: ["Read the decline reason in the official system.", "Collect supporting documents before appealing."],
    nextSteps: ["Use the official appeal path if you qualify.", "Review the appeals guide before you submit."],
    officialHref: OFFICIAL_LINKS[3].href,
    sortOrder: 2,
  },
  {
    slug: "identity-verification",
    title: "Identity verification",
    meaning: "Your identity must be confirmed before the process can continue.",
    causes: ["The ID match failed.", "The system needs another confirmation step."],
    fixes: ["Use the official link shown in your record.", "Check that your ID details were entered correctly."],
    nextSteps: ["Complete the official verification step.", "Check again after the verification clears."],
    officialHref: OFFICIAL_LINKS[3].href,
    sortOrder: 3,
  },
  {
    slug: "banking-issue",
    title: "Banking issue",
    meaning: "Your payment details may be missing, delayed, or invalid.",
    causes: ["Bank account details do not match.", "The payment method still needs approval."],
    fixes: ["Review your banking details.", "Use an account in your own name only."],
    nextSteps: ["Update details through the official system.", "Keep proof of account ready if asked."],
    officialHref: OFFICIAL_LINKS[3].href,
    sortOrder: 4,
  },
  {
    slug: "reapplication-needed",
    title: "Reapplication needed",
    meaning: "A new application or reapplication step is required.",
    causes: ["The support cycle ended.", "The system needs a fresh application."],
    fixes: ["Use the current official application route.", "Check the dates before you reapply."],
    nextSteps: ["Open the official application link.", "Keep your phone number active for OTPs."],
    officialHref: OFFICIAL_LINKS[3].href,
    sortOrder: 5,
  },
  {
    slug: "payment-failed",
    title: "Payment failed",
    meaning: "A payment attempt was made but did not complete.",
    causes: ["Payment details were rejected.", "There was a processing issue."],
    fixes: ["Recheck banking or collection details.", "Watch for a fresh payment window."],
    nextSteps: ["Use the official channel to confirm the failure reason.", "Update details if required."],
    officialHref: OFFICIAL_LINKS[3].href,
    sortOrder: 6,
  },
];

const CORE_FALLBACK_GUIDES: PublicGuide[] = [
  {
    slug: "sassa-status-meaning",
    title: "What your status means",
    summary: "Short explanations for approved, pending, declined, and payment issues.",
    sections: [
      { title: "Start here", body: "Match the exact status wording first." },
      { title: "What to check", body: "Look at the likely cause and the next step." },
      { title: "Official action", body: "Use the official system if you need to appeal or update details." },
    ],
    featured: true,
    sponsored: false,
    sortOrder: 0,
  },
  {
    slug: "payment-dates-by-month",
    title: "Payment dates by month",
    summary: "Monthly payment schedule pages with reminders and archive links.",
    sections: [
      { title: "Monthly view", body: "Choose a month and grant category." },
      { title: "Important note", body: "Expected dates are not official until published by SASSA." },
      { title: "Reminders", body: "Save the month to your dashboard to track it." },
    ],
    featured: true,
    sponsored: false,
    sortOrder: 1,
  },
  {
    slug: "fix-banking-details",
    title: "How to fix banking details issues",
    summary: "What to do when your payment method or bank details cause delays.",
    sections: [
      { title: "Before you change anything", body: "Check the official status wording first." },
      { title: "Common issues", body: "Name mismatch, inactive account, or wrong account type." },
      { title: "Official action", body: "Update the details only through the official system." },
    ],
    featured: false,
    sponsored: false,
    sortOrder: 2,
  },
  {
    slug: "appeal-after-decline",
    title: "What to do after a decline",
    summary: "A short appeal path for users who believe a decline was incorrect.",
    sections: [
      { title: "Read the reason", body: "Start with the exact decline reason." },
      { title: "Check your records", body: "Make sure your details match your documents." },
      { title: "Use the official path", body: "Submit an appeal only through the official channel." },
    ],
    featured: false,
    sponsored: false,
    sortOrder: 3,
  },
];

export const FALLBACK_GUIDES: PublicGuide[] = [
  ...CORE_FALLBACK_GUIDES,
  ...SEO_BATCH_ONE_GUIDES,
  ...SEO_BATCH_TWO_GUIDES,
  ...SEO_BATCH_THREE_GUIDES,
  ...SEO_BATCH_FOUR_GUIDES,
  ...SEO_BATCH_FIVE_GUIDES,
  ...SEO_BATCH_SIX_GUIDES,
  ...SEO_BATCH_SEVEN_GUIDES,
  ...SEO_BATCH_EIGHT_GUIDES,
  ...SEO_BATCH_NINE_GUIDES,
  ...SEO_BATCH_TEN_GUIDES,
  ...SEO_BATCH_ELEVEN_GUIDES,
  ...SEO_BATCH_TWELVE_GUIDES,
  ...SEO_BATCH_THIRTEEN_GUIDES,
  ...SEO_BATCH_FOURTEEN_GUIDES,
  ...SEO_BATCH_FIFTEEN_GUIDES,
  ...SEO_BATCH_SIXTEEN_GUIDES,
];

export const FALLBACK_FAQS: PublicFaq[] = [
  {
    id: "faq-independent",
    question: "Is GrantCare an official government website?",
    answer: "No. GrantCare is independent and links you to official systems when you need an official action.",
    sortOrder: 0,
  },
  {
    id: "faq-apply",
    question: "Can I apply for a grant on GrantCare?",
    answer: "No. Applications and official status checks must be completed through the relevant government systems.",
    sortOrder: 1,
  },
  {
    id: "faq-payment-dates",
    question: "Are the payment dates official?",
    answer: "Expected dates are clearly marked. Always confirm final published dates through official SASSA channels.",
    sortOrder: 2,
  },
  {
    id: "faq-approval",
    question: "Will the eligibility checker guarantee approval?",
    answer: "No. It provides general guidance only and cannot promise approval.",
    sortOrder: 3,
  },
];

export const FALLBACK_NOTICES: PublicNotice[] = [];

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getFirstBusinessDays(year: number, monthIndex: number, count: number) {
  const dates: string[] = [];
  const current = new Date(Date.UTC(year, monthIndex, 1));

  while (dates.length < count) {
    const day = current.getUTCDay();
    if (day !== 0 && day !== 6) {
      dates.push(toIsoDate(current));
    }
    current.setUTCDate(current.getUTCDate() + 1);
  }

  return dates;
}

function getRelativeMonthState(year: number, monthIndex: number): PublicPaymentDateState {
  const now = new Date();
  const currentMonth = now.getUTCMonth();
  const currentYear = now.getUTCFullYear();
  const monthDiff = (year - currentYear) * 12 + (monthIndex - currentMonth);

  return monthDiff > 2 ? "pending" : "expected";
}

export function getMonthSlugFromNumber(month: number): MonthSlug {
  return MONTHS[Math.max(0, Math.min(month - 1, MONTHS.length - 1))];
}

export function getMonthNumberFromSlug(month: string) {
  const index = MONTHS.findIndex((entry) => entry === month);
  return index === -1 ? null : index + 1;
}

export function getMonthLabel(year: number, month: number) {
  const monthSlug = getMonthSlugFromNumber(month);
  return `${monthSlug.charAt(0).toUpperCase()}${monthSlug.slice(1)} ${year}`;
}

function buildFallbackPaymentPeriod(year: number, month: number): PublicPaymentPeriod {
  const monthIndex = month - 1;
  const [olderPersonsDate, disabilityDate, childrenDate] = getFirstBusinessDays(
    year,
    monthIndex,
    3,
  );
  const monthSlug = getMonthSlugFromNumber(month);
  const state = getRelativeMonthState(year, monthIndex);
  const olderPersons = FALLBACK_GRANT_TYPES.find((entry) => entry.slug === "older-persons");
  const disability = FALLBACK_GRANT_TYPES.find((entry) => entry.slug === "disability");
  const children = FALLBACK_GRANT_TYPES.find((entry) => entry.slug === "children");
  const socialRelief = FALLBACK_GRANT_TYPES.find((entry) => entry.slug === "social-relief");

  const entries: PublicPaymentEntry[] = [
    {
      grantSlug: "older-persons",
      grantName: olderPersons?.name ?? "Older Persons Grant",
      shortName: olderPersons?.shortName,
      officialHref: olderPersons?.officialHref ?? OFFICIAL_LINKS[2].href,
      state,
      date: olderPersonsDate,
      note: "Regular grant sequence only. Confirm with official published dates.",
      published: true,
    },
    {
      grantSlug: "disability",
      grantName: disability?.name ?? "Disability Grant",
      shortName: disability?.shortName,
      officialHref: disability?.officialHref ?? OFFICIAL_LINKS[2].href,
      state,
      date: disabilityDate,
      note: "Regular grant sequence only. Confirm with official published dates.",
      published: true,
    },
    {
      grantSlug: "children",
      grantName: children?.name ?? "Children's Grants",
      shortName: children?.shortName,
      officialHref: children?.officialHref ?? OFFICIAL_LINKS[2].href,
      state,
      date: childrenDate,
      note: "Child Support, Foster Child, and Care Dependency grants usually follow together.",
      published: true,
    },
    {
      grantSlug: "social-relief",
      grantName: socialRelief?.name ?? "Social Relief of Distress",
      shortName: socialRelief?.shortName,
      officialHref: socialRelief?.officialHref ?? OFFICIAL_LINKS[3].href,
      state: "portal-only",
      date: null,
      note: "SRD payment timing varies by application outcome. Use the official SRD portal.",
      published: true,
    },
  ];

  return {
    year,
    month,
    monthSlug,
    label: getMonthLabel(year, month),
    published: true,
    entries,
    grants: Object.fromEntries(entries.map((entry) => [entry.grantSlug, entry])),
  };
}

const calendarYears = [
  new Date().getUTCFullYear() - 1,
  new Date().getUTCFullYear(),
  new Date().getUTCFullYear() + 1,
];

export const FALLBACK_PAYMENT_PERIODS = calendarYears.flatMap((year) =>
  Array.from({ length: 12 }, (_, index) => buildFallbackPaymentPeriod(year, index + 1)),
);

export function findFallbackGrantType(slug: string) {
  return FALLBACK_GRANT_TYPES.find((entry) => entry.slug === slug) ?? null;
}

export function findFallbackGuide(slug: string) {
  return FALLBACK_GUIDES.find((entry) => entry.slug === slug) ?? null;
}

export function findFallbackStatusMeaning(slug: string) {
  return FALLBACK_STATUS_MEANINGS.find((entry) => entry.slug === slug) ?? null;
}

export function findFallbackPaymentPeriod(year: number, month: string | number) {
  const monthNumber = typeof month === "number" ? month : getMonthNumberFromSlug(month);
  if (!monthNumber) {
    return null;
  }

  return (
    FALLBACK_PAYMENT_PERIODS.find((entry) => entry.year === year && entry.month === monthNumber) ?? null
  );
}

/**
 * Check whether all non-null payment dates in a period have already passed.
 * Uses SAST (UTC+2) since the target audience is South African.
 */
export function hasAllDatesPassed(period: PublicPaymentPeriod): boolean {
  const now = new Date();
  const todaySAST = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  const todayStr = todaySAST.toISOString().slice(0, 10);

  const datesWithValues = period.entries.filter((entry) => entry.date !== null);

  if (datesWithValues.length === 0) {
    return false;
  }

  return datesWithValues.every((entry) => entry.date! < todayStr);
}

export function getFallbackPaymentRouteDefaults() {
  const currentYear = new Date().getUTCFullYear();
  const currentMonth = new Date().getUTCMonth() + 1;

  return (
    FALLBACK_PAYMENT_PERIODS.find(
      (entry) => entry.year === currentYear && entry.month === currentMonth,
    ) ?? FALLBACK_PAYMENT_PERIODS[0]
  );
}

export const ELIGIBILITY_RESULT_SLUGS = {
  older: "older-persons",
  disabledChild: "care-dependency",
  fosterCare: "foster-child",
  supportsChild: "child-support",
  disabledAdult: "disability",
  noIncome: "social-relief",
  fallback: "grant-in-aid",
} as const;
