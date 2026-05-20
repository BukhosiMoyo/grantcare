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
  authorName?: string;
  publishedAt?: string | null;
  updatedAt?: string | null;
  translations?: LocalizedFields;
};

export type PublicNewsArticle = {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  sections: Array<{ title: string; body: string }>;
  sourceUrls: string[];
  featured: boolean;
  sortOrder: number;
  publishedAt?: string | null;
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
  {
    slug: "sassa-office-visit-survival-guide",
    title: "How to Survive Your Physical SASSA Office Visit (Certified Documents Checklist & Queue Tips)",
    summary: "A highly practical, step-by-step guide to visiting a physical SASSA office, including queue-survival timing strategies, Commissioner of Oaths certified document checklists, and crucial tips for a successful application.",
    sections: [
      {
        title: "The Queue Challenge: Timing Your Visit",
        body: "Physical SASSA offices are notorious for long queues, often starting before dawn. To minimize waiting times, we recommend arriving between 06:00 AM and 07:00 AM. Tuesdays and Thursdays are generally less congested than Mondays or Fridays. Avoid visiting during the first week of the month when payment date collections cause peak crowding.",
      },
      {
        title: "MANDATORY: Certified Documents Checklist",
        body: "Never arrive empty-handed. You must bring the following documents, certified within the last 3 months by a Commissioner of Oaths (at a police station or post office):\n• Your original green barcoded ID book or smart ID card (plus 2 clear copies).\n• Proof of residence (utility bill or letter from a local ward councillor).\n• Three months of bank statements showing all transactions (no older than 3 months).\n• Proof of income or an affidavit confirming unemployment/no income.\n• If applying for child support: original birth certificate(s) of the child(ren) and proof of school attendance.",
      },
      {
        title: "Survival Tips for the Day",
        body: "Prepare for a long day: bring a bottle of water, a pen, and a light snack. Confirm with the queue marshal that you are in the correct line for your specific inquiry (applications vs status queries vs appeals). Always request a receipt or reference number from the agent who assists you—this is your only proof of application.",
      },
    ],
    featured: true,
    sponsored: false,
    sortOrder: 4,
    translations: {
      zu: {
        title: "Uyisinda kanjani i-SASSA Office Visit (Uhlu Lwemibhalo Egunyaziwe & Amathiphu Womugqa)",
        summary: "Umhlahlandlela osebenzayo wokuvakashela ihhovisi le-SASSA, okuhlanganisa imibhalo edingekayo kanye namathiphu okubekezela emugqeni.",
        sections: [
          {
            title: "Inselelo Yomugqa: Ukuhlela Isikhathi Sakho",
            body: "Amahhovisi e-SASSA adume ngemigqa emide, evame ukuqala ngaphambi kokusa. Ukuze unciphise isikhathi sokulinda, sincoma ukuthi ufike phakathi kuka-06:00 AM no-07:00 AM. Izinsuku zangoLwesibili nangoLwesine zivame ukuba nengcindezi encane kunoMsombuluko noLwesihlanu. Gwema ukuvakashela phakathi nesonto lokuqala lenyanga lapho kukhokhwa khona izibonelelo.",
          },
          {
            title: "OKUBALULEKILE: Uhlu Lwemibhalo Egunyaziwe",
            body: "Ungalokothi ufike ungenalutho. Kumele ulethe le mibhalo elandelayo, egunyazwe phakathi kwezinyanga ezi-3 ezidlule:\n• Umazisi wakho wokuqala (green ID book noma smart card) namakhophi a-2 acacile.\n• Ubufakazi bendawo yokuhlala.\n• Izitatimende zebhange zezinyanga ezintathu ezigunyaziwe.\n• Ubufakazi bokungeniswa kwemali noma i-affidavit eqinisekisa ukungasebenzi.\n• Uma ufakele ingane: isitifiketi sokuzalwa sengane kanye nobufakazi besikole.",
          },
          {
            title: "Amathiphu Okusinda Wosuku",
            body: "Lungiselela usuku olude: phatha amanzi okukuphuza, ipeni, kanye nokudla okulula. Qinisekisa nomphathi womugqa ukuthi ukumugqa ofanele. Hlala ucela irisidi noma inombolo yereferensi ku-agent ekusizayo.",
          },
        ],
      },
      xh: {
        title: "Uyisinda njani i-SASSA Office Visit (Uluhlu Lwamaxwebhu Aqinisekisiweyo kunye neeNcebiso zeLayini)",
        summary: "Isikhokelo esisebenzayo sokundwendwela i-ofisi ye-SASSA, kubandakanywa amaxwebhu afunekayo kunye neengcebiso zokulinda emgceni.",
        sections: [
          {
            title: "Umngeni We-Queue: Ixesha Lokundwendwela",
            body: "Ii-ofisi ze-SASSA ziyaziwa ngemigca emide, eqala phambi kokuba kuse. Ukuze unciphise ixesha lokulinda, sicebisa ukuba ufike phakathi kwentsimbi yesi-06:00 AM neye-07:00 AM. OoLwesibini nooLwesine bafumana abantu abambalwa kunooLwesithathu nooLwesihlanu. Kuphephe ukutyelela kwiveki yokuqala yenyanga xa abantu abaninzi bephuthuma iimali zabo.",
          },
          {
            title: "OKUNYANZELISIWEYO: Uluhlu Lwamaxwebhu Aqinisekisiweyo",
            body: "Ungaze ufike ungenanto. Kufuneka uze nala maxwebhu alandelayo, aqinisekisiweyo kwiinyanga ezi-3 ezidlulileyo:\n• Isazisi sakho sokuqala (green ID book okanye smart card) kunye neekopi ezi-2 ezicacileyo.\n• Ubungqina bendawo yokuhlala.\n• Izitatimende zebhange zeenyanga ezintathu ezigunyazisiweyo.\n• Ubungqina bangeniso okanye iaffidavit eqinisekisa ukungaphangeli.\n• Ukuba ufakele umntwana: isatifikethi sokuzalwa sokuqala somntwana kunye nobungqina besikolo.",
          },
          {
            title: "Iingcebiso zokulinda emgceni",
            body: "Lungiselela usuku olude: phatha amanzi, usiba (ipeni), kunye nesikhwanyana sokutya. Qinisekisa nomphathi womgca ukuba ukulayini ochanekileyo. Soloko ucela irisithi okanye inombolo yereferensi kwi-ofisi ekuncedayo.",
          },
        ],
      },
    },
  },
];

const FALLBACK_GUIDE_AUTHOR = "GrantCare Editorial Team";
const FALLBACK_GUIDE_UPDATED_AT = "2026-04-23";

function withGuideMetadata(guides: PublicGuide[]) {
  return guides.map((guide) => ({
    ...guide,
    authorName: guide.authorName ?? FALLBACK_GUIDE_AUTHOR,
    updatedAt: guide.updatedAt ?? FALLBACK_GUIDE_UPDATED_AT,
  }));
}

export const FALLBACK_GUIDES: PublicGuide[] = [
  ...withGuideMetadata(CORE_FALLBACK_GUIDES),
  ...withGuideMetadata(SEO_BATCH_ONE_GUIDES),
  ...withGuideMetadata(SEO_BATCH_TWO_GUIDES),
  ...withGuideMetadata(SEO_BATCH_THREE_GUIDES),
  ...withGuideMetadata(SEO_BATCH_FOUR_GUIDES),
  ...withGuideMetadata(SEO_BATCH_FIVE_GUIDES),
  ...withGuideMetadata(SEO_BATCH_SIX_GUIDES),
  ...withGuideMetadata(SEO_BATCH_SEVEN_GUIDES),
  ...withGuideMetadata(SEO_BATCH_EIGHT_GUIDES),
  ...withGuideMetadata(SEO_BATCH_NINE_GUIDES),
  ...withGuideMetadata(SEO_BATCH_TEN_GUIDES),
  ...withGuideMetadata(SEO_BATCH_ELEVEN_GUIDES),
  ...withGuideMetadata(SEO_BATCH_TWELVE_GUIDES),
  ...withGuideMetadata(SEO_BATCH_THIRTEEN_GUIDES),
  ...withGuideMetadata(SEO_BATCH_FOURTEEN_GUIDES),
  ...withGuideMetadata(SEO_BATCH_FIFTEEN_GUIDES),
  ...withGuideMetadata(SEO_BATCH_SIXTEEN_GUIDES),
];

export const FALLBACK_NEWS_ARTICLES: PublicNewsArticle[] = [
  {
    slug: "sassa-new-biometric-verification-rules",
    title: "SASSA Introduces Strict New Biometric Verification Rules to Curb Grant Fraud",
    summary: "In a major move to fight identity theft and systemic fraud, SASSA has rolled out compulsory biometric facial recognition rules for high-risk profiles and electronic banking payment changes.",
    sections: [
      {
        title: "The Reason Behind Biometrics",
        body: "To safeguard billions of Rands in social assistance, the South African Social Security Agency (SASSA) has instituted a strict biometric facial verification process. This decision follows a surge in syndicate-driven grant hijacking and identity theft, particularly targeting the Social Relief of Distress (SRD) R370 grant.",
      },
      {
        title: "Who Must Complete Biometric Verification",
        body: "Biometric facial recognition is triggered under specific conditions:\n• When a user attempts to change their registered mobile phone number.\n• When bank payment details are updated on the SASSA portal.\n• For applications flagged by SASSA's internal risk engines (e.g. system audits showing multiple accounts on one device).",
      },
      {
        title: "Step-by-Step Verification Guide",
        body: "If your status is flagged, you will receive an SMS containing a secure, personalized verification link. Click this link on a smartphone with a working front camera. Position your face inside the on-screen oval in a well-lit room, and follow the prompts. The verification takes less than 2 minutes and is processed securely in real-time.",
      },
    ],
    sourceUrls: [
      "https://srd.sassa.gov.za/news/biometric-facial-recognition-system",
      "https://www.gov.za/speeches/sassa-implements-biometric-facial-recognition-curb-srd-fraud-21-jun-2026",
    ],
    featured: true,
    sortOrder: 0,
    publishedAt: "2026-05-18",
  },
  {
    slug: "sassa-payment-schedule-2026-2027",
    title: "SASSA confirms social grant payment dates for 2026/2027",
    summary: "The official schedule sets dates from April 2026 to March 2027 and includes April grant increases.",
    sections: [
      {
        title: "What changed",
        body: "Payment dates are confirmed for April 2026 through March 2027, including months affected by public holidays.",
      },
      {
        title: "Grant increases (from April 2026)",
        body: "Older persons, disability, and care dependency: R2,400. War veterans: R2,420. Foster child: R1,295. Child support and grant-in-aid: R580. SRD remains R370.",
      },
      {
        title: "Related pages",
        body: "• /payment-dates\n• /guides/payment-dates-by-month\n• /grants",
      },
    ],
    sourceUrls: [
      "https://www.dsd.gov.za/index.php/latest-news/21-latest-news/680-sassa-confirms-2026-2027-social-grant-payment-schedule-and-increases",
      "https://www.sanews.gov.za/south-africa/sassa-announces-202627-social-grant-payment-dates",
      "https://www.treasury.gov.za/documents/National%20Budget/2026/review/FullBR.pdf",
    ],
    featured: true,
    sortOrder: 1,
    publishedAt: "2026-03-20",
  },
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

const OFFICIAL_PAYMENT_SCHEDULE: Record<
  string,
  { olderPersons: string; disability: string; children: string }
> = {
  "2025-04": { olderPersons: "2025-04-02", disability: "2025-04-03", children: "2025-04-04" },
  "2025-05": { olderPersons: "2025-05-06", disability: "2025-05-07", children: "2025-05-08" },
  "2025-06": { olderPersons: "2025-06-03", disability: "2025-06-04", children: "2025-06-05" },
  "2025-07": { olderPersons: "2025-07-02", disability: "2025-07-03", children: "2025-07-04" },
  "2025-08": { olderPersons: "2025-08-05", disability: "2025-08-06", children: "2025-08-07" },
  "2025-09": { olderPersons: "2025-09-02", disability: "2025-09-03", children: "2025-09-04" },
  "2025-10": { olderPersons: "2025-10-02", disability: "2025-10-03", children: "2025-10-06" },
  "2025-11": { olderPersons: "2025-11-04", disability: "2025-11-05", children: "2025-11-06" },
  "2025-12": { olderPersons: "2025-12-02", disability: "2025-12-03", children: "2025-12-04" },
  "2026-01": { olderPersons: "2026-01-06", disability: "2026-01-07", children: "2026-01-08" },
  "2026-02": { olderPersons: "2026-02-03", disability: "2026-02-04", children: "2026-02-05" },
  "2026-03": { olderPersons: "2026-03-03", disability: "2026-03-04", children: "2026-03-05" },
  "2026-04": { olderPersons: "2026-04-02", disability: "2026-04-07", children: "2026-04-08" },
  "2026-05": { olderPersons: "2026-05-05", disability: "2026-05-06", children: "2026-05-07" },
  "2026-06": { olderPersons: "2026-06-02", disability: "2026-06-03", children: "2026-06-04" },
  "2026-07": { olderPersons: "2026-07-02", disability: "2026-07-03", children: "2026-07-06" },
  "2026-08": { olderPersons: "2026-08-04", disability: "2026-08-05", children: "2026-08-06" },
  "2026-09": { olderPersons: "2026-09-02", disability: "2026-09-03", children: "2026-09-04" },
  "2026-10": { olderPersons: "2026-10-02", disability: "2026-10-05", children: "2026-10-06" },
  "2026-11": { olderPersons: "2026-11-03", disability: "2026-11-04", children: "2026-11-05" },
  "2026-12": { olderPersons: "2026-12-02", disability: "2026-12-03", children: "2026-12-04" },
  "2027-01": { olderPersons: "2027-01-05", disability: "2027-01-06", children: "2027-01-07" },
  "2027-02": { olderPersons: "2027-02-02", disability: "2027-02-03", children: "2027-02-04" },
  "2027-03": { olderPersons: "2027-03-02", disability: "2027-03-03", children: "2027-03-04" },
};

function getOfficialPaymentScheduleOverride(year: number, month: number) {
  const key = `${year}-${String(month).padStart(2, "0")}`;
  return OFFICIAL_PAYMENT_SCHEDULE[key] ?? null;
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
  const officialOverride = getOfficialPaymentScheduleOverride(year, month);
  const [olderPersonsDate, disabilityDate, childrenDate] = officialOverride
    ? [officialOverride.olderPersons, officialOverride.disability, officialOverride.children]
    : getFirstBusinessDays(year, monthIndex, 3);
  const monthSlug = getMonthSlugFromNumber(month);
  const state: PublicPaymentDateState = officialOverride ? "expected" : getRelativeMonthState(year, monthIndex);
  const olderPersons = FALLBACK_GRANT_TYPES.find((entry) => entry.slug === "older-persons");
  const disability = FALLBACK_GRANT_TYPES.find((entry) => entry.slug === "disability");
  const children = FALLBACK_GRANT_TYPES.find((entry) => entry.slug === "children");
  const socialRelief = FALLBACK_GRANT_TYPES.find((entry) => entry.slug === "social-relief");
  const officialNote =
    year < 2026 || (year === 2026 && month <= 3)
      ? "Official schedule for the 2025/2026 financial year."
      : "Official schedule for the 2026/2027 financial year.";

  const entries: PublicPaymentEntry[] = [
    {
      grantSlug: "older-persons",
      grantName: olderPersons?.name ?? "Older Persons Grant",
      shortName: olderPersons?.shortName,
      officialHref: olderPersons?.officialHref ?? OFFICIAL_LINKS[2].href,
      state,
      date: olderPersonsDate,
      note: officialOverride ? officialNote : "Regular grant sequence only. Confirm with official published dates.",
      published: true,
    },
    {
      grantSlug: "disability",
      grantName: disability?.name ?? "Disability Grant",
      shortName: disability?.shortName,
      officialHref: disability?.officialHref ?? OFFICIAL_LINKS[2].href,
      state,
      date: disabilityDate,
      note: officialOverride ? officialNote : "Regular grant sequence only. Confirm with official published dates.",
      published: true,
    },
    {
      grantSlug: "children",
      grantName: children?.name ?? "Children's Grants",
      shortName: children?.shortName,
      officialHref: children?.officialHref ?? OFFICIAL_LINKS[2].href,
      state,
      date: childrenDate,
      note: officialOverride
        ? officialNote
        : "Child Support, Foster Child, and Care Dependency grants usually follow together.",
      published: true,
    },
    {
      grantSlug: "social-relief",
      grantName: socialRelief?.name ?? "Social Relief of Distress",
      shortName: socialRelief?.shortName,
      officialHref: socialRelief?.officialHref ?? OFFICIAL_LINKS[3].href,
      state: "portal-only",
      date: null,
      note: "SRD paydays are assigned per approved applicant during the monthly payment window.",
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

export function findFallbackNewsArticle(slug: string) {
  return FALLBACK_NEWS_ARTICLES.find((entry) => entry.slug === slug) ?? null;
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
