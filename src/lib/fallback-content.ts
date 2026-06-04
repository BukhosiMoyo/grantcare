import type { Locale } from "./site";
import {
  addSetswanaTranslations,
  toGeneratedSetswanaText,
  toGeneratedXhosaText,
} from "./generated-guide-translations";
import { SEO_BATCH_ELEVEN_GUIDES } from "./seo-batch-eleven-guides";
import { SEO_BATCH_THIRTEEN_GUIDES } from "./seo-batch-thirteen-guides";
import { SEO_BATCH_FOURTEEN_GUIDES } from "./seo-batch-fourteen-guides";
import { SEO_BATCH_FIFTEEN_GUIDES } from "./seo-batch-fifteen-guides";
import { SEO_BATCH_SIXTEEN_GUIDES } from "./seo-batch-sixteen-guides";
import { SEO_BATCH_TWELVE_GUIDES } from "./seo-batch-twelve-guides";
import { SEO_BATCH_ONE_GUIDES } from "./seo-batch-one-guides";
import { SEO_BATCH_NINE_GUIDES } from "./seo-batch-nine-guides";
import { SEO_BATCH_EIGHT_GUIDES } from "./seo-batch-eight-guides";
import { SEO_BATCH_SEVEN_GUIDES } from "./seo-batch-seven-guides";
import { SEO_BATCH_SIX_GUIDES } from "./seo-batch-six-guides";
import { SEO_BATCH_TEN_GUIDES } from "./seo-batch-ten-guides";
import { SEO_BATCH_FIVE_GUIDES } from "./seo-batch-five-guides";
import { SEO_BATCH_FOUR_GUIDES } from "./seo-batch-four-guides";
import { SEO_BATCH_THREE_GUIDES } from "./seo-batch-three-guides";
import { SEO_BATCH_TWO_GUIDES } from "./seo-batch-two-guides";

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

function mergeSetswanaTranslation(translations: LocalizedFields | undefined, fields: NonNullable<LocalizedFields["tn"]>) {
  return {
    ...(translations ?? {}),
    tn: {
      ...(translations?.tn ?? {}),
      ...fields,
    },
  };
}

function mergeXhosaTranslation(translations: LocalizedFields | undefined, fields: NonNullable<LocalizedFields["xh"]>) {
  return {
    ...(translations ?? {}),
    xh: {
      ...(translations?.xh ?? {}),
      ...fields,
    },
  };
}

function withSetswanaGrantType<T extends PublicGrantType>(grant: T): T {
  const translations = mergeSetswanaTranslation(grant.translations, {
    name: toGeneratedSetswanaText(grant.name),
    shortName: grant.shortName ? toGeneratedSetswanaText(grant.shortName) : undefined,
    summary: toGeneratedSetswanaText(grant.summary),
    checks: grant.checks.map(toGeneratedSetswanaText),
    documents: grant.documents.map(toGeneratedSetswanaText),
  });

  return {
    ...grant,
    translations: mergeXhosaTranslation(translations, {
      name: toGeneratedXhosaText(grant.name),
      shortName: grant.shortName ? toGeneratedXhosaText(grant.shortName) : undefined,
      summary: toGeneratedXhosaText(grant.summary),
      checks: grant.checks.map(toGeneratedXhosaText),
      documents: grant.documents.map(toGeneratedXhosaText),
    }),
  };
}

function withSetswanaStatusMeaning<T extends PublicStatusMeaning>(status: T): T {
  const translations = mergeSetswanaTranslation(status.translations, {
    title: toGeneratedSetswanaText(status.title),
    meaning: toGeneratedSetswanaText(status.meaning),
    causes: status.causes.map(toGeneratedSetswanaText),
    fixes: status.fixes.map(toGeneratedSetswanaText),
    nextSteps: status.nextSteps.map(toGeneratedSetswanaText),
  });

  return {
    ...status,
    translations: mergeXhosaTranslation(translations, {
      title: toGeneratedXhosaText(status.title),
      meaning: toGeneratedXhosaText(status.meaning),
      causes: status.causes.map(toGeneratedXhosaText),
      fixes: status.fixes.map(toGeneratedXhosaText),
      nextSteps: status.nextSteps.map(toGeneratedXhosaText),
    }),
  };
}

function withSetswanaNewsArticle<T extends PublicNewsArticle>(article: T): T {
  return addSetswanaTranslations(article);
}

function withSetswanaFaq<T extends PublicFaq>(faq: T): T {
  const translations = mergeSetswanaTranslation(faq.translations, {
    question: toGeneratedSetswanaText(faq.question),
    answer: toGeneratedSetswanaText(faq.answer),
  });

  return {
    ...faq,
    translations: mergeXhosaTranslation(translations, {
      question: toGeneratedXhosaText(faq.question),
      answer: toGeneratedXhosaText(faq.answer),
    }),
  };
}

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
    translations: {
      zu: {
        name: "Isibonelelo Sabantu Abadala",
        shortName: "Abantu abadala",
        summary: "Ukwesekwa kwabantu abaneminyaka engu-60 noma ngaphezulu.",
        checks: ["Uneminyaka engu-60 noma ngaphezulu", "Uhlala eNingizimu Afrika", "Uyahlangabezana nokuhlolwa kwezindlela zokuziphilisa"],
        documents: ["Umazisi waseNingizimu Afrika noma isimo sobubaleki", "Ubufakazi besimo somshado", "Imininingwane yemali engenayo nempahla"],
      },
    },
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
    translations: {
      zu: {
        name: "Isibonelelo Sokukhubazeka",
        shortName: "Ukukhubazeka",
        summary: "Ukwesekwa kwabantu abadala abanokukhubazeka okubavimbela ukusebenza.",
        checks: ["Uneminyaka engu-18 kuya kwengu-59", "Ukuhlolwa kwezokwelapha", "Uyahlangabezana nokuhlolwa kwezindlela zokuziphilisa"],
        documents: ["Umazisi", "Umbiko wakamuva wezokwelapha", "Ubufakazi bemali engenayo nempahla"],
      },
    },
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
    translations: {
      zu: {
        name: "Izibonelelo Zezingane",
        shortName: "Izingane",
        summary: "Isigaba sokukhokha se-Child Support, Foster Child, kanye ne-Care Dependency grants.",
        checks: ["Isibonelelo Sokondla Ingane", "Isibonelelo Sengane Esekunakekelweni", "Isibonelelo Sokunakekelwa Kwengane Encike Ekusizweni"],
        documents: ["Umazisi", "Imibhalo yengane", "Imibhalo efanele yokweseka"],
      },
    },
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
    translations: {
      zu: {
        name: "Usizo Lwesikhashana Lokuhlupheka",
        shortName: "SRD",
        summary: "Usizo lwesikhashana kubantu abangenakho ukwesekwa ngemali engenayo.",
        checks: ["Imali engenayo incane noma ayikho", "Uyahlangabezana nemithetho esemthethweni ye-SRD", "Sebenzisa uhlelo olusemthethweni lokuhlola isimo"],
        documents: ["Umazisi", "Inombolo yocingo", "Imininingwane yasebhange uma idingeka"],
      },
    },
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
    translations: {
      zu: {
        name: "Isibonelelo Sokondla Ingane",
        shortName: "Ukondla ingane",
        summary: "Ukwesekwa komnakekeli oyinhloko wengane.",
        checks: ["Umnakekeli oyinhloko", "Ingane ingaphansi komkhawulo weminyaka", "Ukuhlolwa kwezindlela zokuziphilisa kuyasebenza"],
        documents: ["Umazisi", "Isitifiketi sokuzalwa sengane", "Ubufakazi bemali engenayo"],
      },
    },
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
    translations: {
      zu: {
        name: "Isibonelelo Sengane Esekunakekelweni",
        shortName: "Ingane esekunakekelweni",
        summary: "Ukwesekwa kwengane efakwe ekunakekelweni ngokusemthethweni.",
        checks: ["Umyalelo wenkantolo osebenzayo", "Ingane isekunakekelweni", "Umhlali waseNingizimu Afrika"],
        documents: ["Umazisi", "Umyalelo wenkantolo", "Isitifiketi sokuzalwa sengane"],
      },
    },
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
    translations: {
      zu: {
        name: "Isibonelelo Sokunakekelwa Kwengane Encike Ekusizweni",
        shortName: "Ukunakekelwa okudingekayo",
        summary: "Ukwesekwa kwabanakekeli bezingane ezinokukhubazeka okukhulu.",
        checks: ["Umnakekeli wengane engaphansi kweminyaka engu-18", "Ukuhlolwa kwezokwelapha", "Ukuhlolwa kwezindlela zokuziphilisa kuyasebenza"],
        documents: ["Umazisi", "Isitifiketi sokuzalwa sengane", "Umbiko wezokwelapha"],
      },
    },
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
    translations: {
      zu: {
        name: "Isibonelelo Sosizo Olungeziwe",
        shortName: "Usizo olungeziwe",
        summary: "Ukwesekwa okwengeziwe uma usuvele uthola isibonelelo futhi udinga ukunakekelwa isikhathi esigcwele.",
        checks: ["Usuvele uthola isibonelelo esifanele", "Udinga ukunakekelwa kwansuku zonke", "Kudingeka ukwesekwa kwezokwelapha"],
        documents: ["Umazisi", "Umbiko wezokwelapha", "Imininingwane yesibonelelo osuvele usithola"],
      },
    },
  },
].map(withSetswanaGrantType);

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
    translations: {
      zu: {
        title: "Kuvunyiwe",
        meaning: "Isicelo sakho siphumelele ukuhlolwa kwamanje.",
        causes: ["Isicelo sakho sihambisane nemithetho yamanje.", "Akutholakalanga inkinga evimbelayo."],
        fixes: ["Gcina imininingwane yakho yasebhange isesikhathini.", "Bheka ukubuyekezwa kosuku lokukhokha."],
        nextSteps: ["Hlola ithuluzi lezinsuku zokukhokha.", "Sebenzisa uhlelo olusemthethweni uma inkokhelo ingakafiki."],
      },
    },
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
    translations: {
      zu: {
        title: "Kusalindile",
        meaning: "Ukuhlolwa kusaqhubeka.",
        causes: ["Ukuhlola kusasebenza.", "Uhlelo kungenzeka lusaqhathanisa amarekhodi akho."],
        fixes: ["Linda umjikelezo olandelayo wokubuyekezwa.", "Gwema izinguquko eziphindaphindiwe ngaphandle uma imininingwane yakho ishintshile."],
        nextSteps: ["Hlola futhi kamuva.", "Gcina imininingwane yakho yokuxhumana ilungile ohlelweni olusemthethweni."],
      },
    },
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
    translations: {
      zu: {
        title: "Kunqatshiwe",
        meaning: "Isicelo asiphumelelanga umthetho owodwa noma ngaphezulu.",
        causes: ["Imithetho yemali engenayo noma yokufaneleka ayihlangabezanwanga.", "Ukuqhathaniswa kwedatha kungenzeka kuhlulekile."],
        fixes: ["Funda isizathu sokwenqatshwa ohlelweni olusemthethweni.", "Qoqa imibhalo esekelayo ngaphambi kokudlulisa isikhalazo."],
        nextSteps: ["Sebenzisa indlela esemthethweni yokudlulisa isikhalazo uma ufaneleka.", "Buyekeza umhlahlandlela wezikhalazo ngaphambi kokuhambisa."],
      },
    },
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
    translations: {
      zu: {
        title: "Ukuqinisekiswa kobuwena",
        meaning: "Ubuwena bakho kufanele buqinisekiswe ngaphambi kokuba inqubo iqhubeke.",
        causes: ["Ukuqhathaniswa kwe-ID kuhlulekile.", "Uhlelo ludinga esinye isinyathelo sokuqinisekisa."],
        fixes: ["Sebenzisa isixhumanisi esisemthethweni esiboniswe kwirekhodi lakho.", "Hlola ukuthi imininingwane yakho ye-ID ifakwe kahle."],
        nextSteps: ["Qedela isinyathelo esisemthethweni sokuqinisekisa.", "Hlola futhi ngemva kokuba ukuqinisekiswa sekuvunyelwe."],
      },
    },
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
    translations: {
      zu: {
        title: "Inkinga yasebhange",
        meaning: "Imininingwane yakho yokukhokhelwa ingase ingekho, ibambezelekile, noma ingasebenzi.",
        causes: ["Imininingwane ye-akhawunti yasebhange ayihambisani.", "Indlela yokukhokha isadinga ukuvunywa."],
        fixes: ["Buyekeza imininingwane yakho yasebhange.", "Sebenzisa i-akhawunti esegameni lakho kuphela."],
        nextSteps: ["Buyekeza imininingwane ngohlelo olusemthethweni.", "Gcina ubufakazi be-akhawunti bulungile uma bucelwa."],
      },
    },
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
    translations: {
      zu: {
        title: "Kudingeka ukufaka isicelo kabusha",
        meaning: "Kudingeka isicelo esisha noma isinyathelo sokufaka isicelo kabusha.",
        causes: ["Umjikelezo wosizo usuphelile.", "Uhlelo ludinga isicelo esisha."],
        fixes: ["Sebenzisa indlela yamanje esemthethweni yokufaka isicelo.", "Hlola izinsuku ngaphambi kokufaka isicelo kabusha."],
        nextSteps: ["Vula isixhumanisi esisemthethweni sokufaka isicelo.", "Gcina inombolo yakho yocingo isebenza ukuze uthole ama-OTP."],
      },
    },
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
    translations: {
      zu: {
        title: "Inkokhelo yehlulekile",
        meaning: "Kuzanywe ukukhokha kodwa akuphothulwanga.",
        causes: ["Imininingwane yokukhokha yenqatshiwe.", "Kube nenkinga yokucubungula."],
        fixes: ["Hlola kabusha imininingwane yasebhange noma yokuqoqa imali.", "Bheka iwindi elisha lokukhokha."],
        nextSteps: ["Sebenzisa isiteshi esisemthethweni ukuqinisekisa isizathu sokwehluleka.", "Buyekeza imininingwane uma kudingeka."],
      },
    },
  },
].map(withSetswanaStatusMeaning);

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
    translations: {
      zu: {
        title: "Okushiwo isimo sakho",
        summary: "Izincazelo ezimfushane ze-approved, pending, declined, nezinkinga zokukhokha.",
        sections: [
          { title: "Qala lapha", body: "Qondanisa amagama esimo njengoba ebhaliwe kuqala." },
          { title: "Okufanele uhlole", body: "Bheka imbangela engenzeka kanye nesinyathelo esilandelayo." },
          { title: "Isenzo esisemthethweni", body: "Sebenzisa uhlelo olusemthethweni uma udinga ukudlulisa isikhalazo noma ukubuyekeza imininingwane." },
        ],
      },
    },
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
    translations: {
      zu: {
        title: "Izinsuku zokukhokha ngenyanga",
        summary: "Amakhasi eshejuli yanyanga zonke anezikhumbuzi nezixhumanisi zamarekhodi adlule.",
        sections: [
          { title: "Ukubuka kwenyanga", body: "Khetha inyanga nesigaba sesibonelelo." },
          { title: "Inothi elibalulekile", body: "Izinsuku ezilindelekile azisemthethweni kuze kube yilapho zishicilelwa yi-SASSA." },
          { title: "Izikhumbuzi", body: "Londoloza inyanga kudeshibhodi yakho ukuze uyilandelele." },
        ],
      },
    },
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
    translations: {
      zu: {
        title: "Indlela yokulungisa izinkinga zemininingwane yasebhange",
        summary: "Okufanele ukwenze uma indlela yakho yokukhokhelwa noma imininingwane yasebhange ibangela ukubambezeleka.",
        sections: [
          { title: "Ngaphambi kokushintsha noma yini", body: "Hlola amagama asemthethweni esimo kuqala." },
          { title: "Izinkinga ezivamile", body: "Ukungafani kwegama, i-akhawunti engasebenzi, noma uhlobo lwe-akhawunti olungalungile." },
          { title: "Isenzo esisemthethweni", body: "Buyekeza imininingwane kuphela ngohlelo olusemthethweni." },
        ],
      },
    },
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
    translations: {
      zu: {
        title: "Okufanele ukwenze ngemva kokwenqatshwa",
        summary: "Indlela emfushane yokudlulisa isikhalazo kubasebenzisi abakholelwa ukuthi ukwenqatshwa bekungalungile.",
        sections: [
          { title: "Funda isizathu", body: "Qala ngesizathu sokwenqatshwa njengoba sibhalwe." },
          { title: "Hlola amarekhodi akho", body: "Qinisekisa ukuthi imininingwane yakho ihambisana nemibhalo yakho." },
          { title: "Sebenzisa indlela esemthethweni", body: "Hambisa isikhalazo kuphela ngesiteshi esisemthethweni." },
        ],
      },
    },
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
        title: "Ukulungiselela ukuvakashela ihhovisi le-SASSA (uhlu lwemibhalo eqinisekisiwe namathiphu emigqa)",
        summary: "Umhlahlandlela osebenzayo, wesinyathelo ngesinyathelo wokuvakashela ihhovisi le-SASSA, okuhlanganisa izindlela zokuhlela imigqa, uhlu lwemibhalo eqinisekiswe nguKhomishana Wezifungo, namathiphu abalulekile okuphumelela kwesicelo.",
        sections: [
          {
            title: "Inselelo yomugqa: ukuhlela isikhathi sokufika",
            body: "Amahhovisi e-SASSA avame ukuba nemigqa emide eqala ngaphambi kokusa. Ukuze unciphise isikhathi sokulinda, sincoma ukuthi ufike phakathi kuka-06:00 AM no-07:00 AM. NgoLwesibili nangoLwesine kuvame ukuba nokuminyana okuncane kunoMsombuluko noma uLwesihlanu. Gwema ukuvakashela ngesonto lokuqala lenyanga lapho ukuqoqwa kwezinkokhelo kubanga ukuminyana okukhulu.",
          },
          {
            title: "OKUPHOQELEKILE: uhlu lwemibhalo eqinisekisiwe",
            body: "Ungafiki ungenalutho. Kufanele ulethe le mibhalo elandelayo, eqinisekiswe phakathi kwezinyanga ezi-3 ezedlule nguKhomishana Wezifungo (esiteshini samaphoyisa noma eposini):\n• I-ID book yakho yokuqala eluhlaza noma i-smart ID card (kanye namakhophi acacile angu-2).\n• Ubufakazi bendawo yokuhlala (ibhili yezinsiza noma incwadi evela kukhansela wendawo).\n• Izitatimende zasebhange zezinyanga ezintathu ezibonisa konke okwenzekile (zingabi ngaphezu kwezinyanga ezi-3 ubudala).\n• Ubufakazi bemali engenayo noma i-afidavithi eqinisekisa ukungasebenzi/ukungabi nemali engenayo.\n• Uma ufaka isicelo se-child support: izitifiketi zokuzalwa zokuqala zengane/zezingane nobufakazi bokuhamba esikoleni.",
          },
          {
            title: "Amathiphu osuku",
            body: "Lungiselela usuku olude: phatha ibhodlela lamanzi, ipeni, nokudla okulula. Qinisekisa kumphathi womugqa ukuthi usemugqeni ofanele wendaba yakho ethile (izicelo, imibuzo yesimo, noma izikhalazo). Njalo cela irisidi noma inombolo yereferensi kumsebenzi okusizayo; lokhu kuwubufakazi bakho bokufaka isicelo.",
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
].map(addSetswanaTranslations);

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
].map(addSetswanaTranslations);

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
    translations: {
      zu: {
        title: "I-SASSA yethula imithetho emisha eqinile yokuqinisekisa nge-biometric ukuvimba ukukhwabanisa kwezibonelelo",
        summary: "Esinyathelweni esikhulu sokulwa nokwebiwa kobuwena nokukhwabanisa okuhlelekile, i-SASSA isiqalise imithetho ephoqelekile yokuqashelwa kobuso nge-biometric kumaphrofayela anobungozi obuphezulu nasezinguqukweni zokukhokha nge-elektroniki ebhange.",
        sections: [
          {
            title: "Isizathu sama-biometric",
            body: "Ukuvikela izigidigidi zamaRandi zosizo lwezenhlalakahle, i-South African Social Security Agency (SASSA) isisungule inqubo eqinile yokuqinisekisa ubuso nge-biometric. Lesi sinqumo silandela ukwanda kokuthunjwa kwezibonelelo nokwebiwa kobuwena okuqhutshwa amaqembu obugebengu, ikakhulukazi okuqondiswe kwisibonelelo se-Social Relief of Distress (SRD) sika-R370.",
          },
          {
            title: "Ubani okufanele aqedele ukuqinisekiswa nge-biometric",
            body: "Ukuqashelwa kobuso nge-biometric kuqalwa ezimeni ezithile:\n• Uma umsebenzisi ezama ukushintsha inombolo yakhe yeselula ebhalisiwe.\n• Uma imininingwane yokukhokhwa ebhange ibuyekezwa kuphothali ye-SASSA.\n• Ezicelweni eziphawulwe izinhlelo zangaphakathi ze-SASSA zokuhlola ubungozi (isb. ukuhlolwa kohlelo okukhombisa ama-akhawunti amaningi kudivayisi eyodwa).",
          },
          {
            title: "Umhlahlandlela wokuqinisekisa ngesinyathelo ngesinyathelo",
            body: "Uma isimo sakho siphawuliwe, uzothola i-SMS equkethe isixhumanisi sokukuvikela esenzelwe wena sokuqinisekisa. Chofoza lesi sixhumanisi ku-smartphone enekhamera yangaphambili esebenzayo. Beka ubuso bakho ngaphakathi kwe-oval esesikrinini egumbini elikhanyiswe kahle, bese ulandela imiyalelo. Ukuqinisekisa kuthatha ngaphansi kwemizuzu engu-2 futhi kucutshungulwa ngokuphepha ngesikhathi sangempela.",
          },
        ],
      },
    },
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
    translations: {
      zu: {
        title: "I-SASSA iqinisekisa izinsuku zokukhokha izibonelelo zenhlalakahle zika-2026/2027",
        summary: "Ishejuli esemthethweni ibeka izinsuku kusukela ngo-Ephreli 2026 kuya kuMashi 2027 futhi ihlanganisa nokwenyuka kwezibonelelo zango-Ephreli.",
        sections: [
          {
            title: "Okushintshile",
            body: "Izinsuku zokukhokha ziqinisekisiwe kusukela ngo-Ephreli 2026 kuya kuMashi 2027, kuhlanganise nezinyanga ezithintwa amaholide omphakathi.",
          },
          {
            title: "Ukwenyuka kwezibonelelo (kusukela ngo-Ephreli 2026)",
            body: "Abantu abadala, ukukhubazeka, nokunakekelwa kwengane encike ekusizweni: R2,400. Omakadebona bempi: R2,420. Ingane esekunakekelweni: R1,295. Child support kanye ne-grant-in-aid: R580. I-SRD isala ku-R370.",
          },
          {
            title: "Amakhasi ahlobene",
            body: "• /payment-dates\n• /guides/payment-dates-by-month\n• /grants",
          },
        ],
      },
    },
  },
].map(withSetswanaNewsArticle);

export const FALLBACK_FAQS: PublicFaq[] = [
  {
    id: "faq-independent",
    question: "Is GrantCare an official government website?",
    answer: "No. GrantCare is independent and links you to official systems when you need an official action.",
    sortOrder: 0,
    translations: {
      zu: {
        question: "Ingabe i-GrantCare iyiwebhusayithi esemthethweni kahulumeni?",
        answer: "Cha. I-GrantCare izimele futhi ikuxhumanisa nezinhlelo ezisemthethweni uma udinga isenzo esisemthethweni.",
      },
    },
  },
  {
    id: "faq-apply",
    question: "Can I apply for a grant on GrantCare?",
    answer: "No. Applications and official status checks must be completed through the relevant government systems.",
    sortOrder: 1,
    translations: {
      zu: {
        question: "Ngingakwazi ukufaka isicelo sesibonelelo ku-GrantCare?",
        answer: "Cha. Izicelo nokuhlolwa kwesimo okusemthethweni kufanele kuqedelwe ngezinhlelo zikahulumeni ezifanele.",
      },
    },
  },
  {
    id: "faq-payment-dates",
    question: "Are the payment dates official?",
    answer: "Expected dates are clearly marked. Always confirm final published dates through official SASSA channels.",
    sortOrder: 2,
    translations: {
      zu: {
        question: "Ingabe izinsuku zokukhokha zisemthethweni?",
        answer: "Izinsuku ezilindelekile zimakwe ngokucacile. Njalo qinisekisa izinsuku zokugcina ezishicilelwe ngeziteshi ezisemthethweni ze-SASSA.",
      },
    },
  },
  {
    id: "faq-approval",
    question: "Will the eligibility checker guarantee approval?",
    answer: "No. It provides general guidance only and cannot promise approval.",
    sortOrder: 3,
    translations: {
      zu: {
        question: "Ingabe isihloli sokufaneleka siqinisekisa ukuvunywa?",
        answer: "Cha. Sinikeza isiqondiso esijwayelekile kuphela futhi asikwazi ukuthembisa ukuvunywa.",
      },
    },
  },
].map(withSetswanaFaq);

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

const ZU_MONTH_LABELS: Record<MonthSlug, string> = {
  january: "Januwari",
  february: "Februwari",
  march: "Mashi",
  april: "Ephreli",
  may: "Meyi",
  june: "Juni",
  july: "Julayi",
  august: "Agasti",
  september: "Septhemba",
  october: "Okthoba",
  november: "Novemba",
  december: "Disemba",
};

const TN_MONTH_LABELS: Record<MonthSlug, string> = {
  january: "Ferikgong",
  february: "Tlhakole",
  march: "Mopitlwe",
  april: "Moranang",
  may: "Motsheganong",
  june: "Seetebosigo",
  july: "Phukwi",
  august: "Phatwe",
  september: "Lwetse",
  october: "Diphalane",
  november: "Ngwanatsele",
  december: "Sedimonthole",
};

const XH_MONTH_LABELS: Record<MonthSlug, string> = {
  january: "Januwari",
  february: "Februwari",
  march: "Matshi",
  april: "Epreli",
  may: "Meyi",
  june: "Juni",
  july: "Julayi",
  august: "Agasti",
  september: "Septemba",
  october: "Oktobha",
  november: "Novemba",
  december: "Disemba",
};

export function getMonthLabel(year: number, month: number, locale: Locale = "en") {
  const monthSlug = getMonthSlugFromNumber(month);
  if (locale === "zu") {
    return `${ZU_MONTH_LABELS[monthSlug]} ${year}`;
  }

  if (locale === "tn") {
    return `${TN_MONTH_LABELS[monthSlug]} ${year}`;
  }

  if (locale === "xh") {
    return `${XH_MONTH_LABELS[monthSlug]} ${year}`;
  }

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
  const officialNoteZu =
    year < 2026 || (year === 2026 && month <= 3)
      ? "Ishejuli esemthethweni yonyaka wezimali ka-2025/2026."
      : "Ishejuli esemthethweni yonyaka wezimali ka-2026/2027.";
  const officialNoteTn =
    year < 2026 || (year === 2026 && month <= 3)
      ? "Lenaneo la semmuso la ngwaga wa ditšhelete wa 2025/2026."
      : "Lenaneo la semmuso la ngwaga wa ditšhelete wa 2026/2027.";
  const officialNoteXh =
    year < 2026 || (year === 2026 && month <= 3)
      ? "Ishedyuli esemthethweni yonyaka-mali ka-2025/2026."
      : "Ishedyuli esemthethweni yonyaka-mali ka-2026/2027.";
  const regularGrantNote = "Regular grant sequence only. Confirm with official published dates.";
  const regularGrantNoteZu =
    "Ukulandelana okuvamile kwezibonelelo kuphela. Qinisekisa ngezinsuku ezishicilelwe ngokusemthethweni.";
  const regularGrantNoteTn =
    "Tatelano e e tlwaelegileng ya dithuso fela. Netefatsa ka malatsi a a phasaladitsweng semmuso.";
  const regularGrantNoteXh =
    "Ulandelelwano oluqhelekileyo lwezibonelelo kuphela. Qinisekisa ngemihla epapashwe ngokusemthethweni.";
  const childrenGrantNote =
    "Child Support, Foster Child, and Care Dependency grants usually follow together.";
  const childrenGrantNoteZu =
    "Izibonelelo ze-Child Support, Foster Child, kanye ne-Care Dependency zivame ukulandela ndawonye.";
  const childrenGrantNoteTn =
    "Dithuso tsa tlhokomelo ya ngwana, ngwana wa tlhokomelo, le tlhokomelo e e kgethegileng gantsi di tsamaya mmogo.";
  const childrenGrantNoteXh =
    "Izibonelelo ze-Child Support, Foster Child, kunye ne-Care Dependency zidla ngokulandela kunye.";
  const socialReliefNote =
    "SRD paydays are assigned per approved applicant during the monthly payment window.";
  const socialReliefNoteZu =
    "Izinsuku zokukhokha ze-SRD zinikezwa umfakisicelo ngamunye ovunyiwe phakathi newindi lokukhokha lanyanga zonke.";
  const socialReliefNoteTn =
    "Malatsi a tefo a SRD a abelwa mokopi mongwe le mongwe yo o amogetsweng mo nakong ya tefo ya kgwedi.";
  const socialReliefNoteXh =
    "Imihla yokuhlawula ye-SRD yabelwa umfaki-sicelo ngamnye ovunyiweyo ngexesha lefestile yentlawulo yenyanga.";

  const entries: PublicPaymentEntry[] = [
    {
      grantSlug: "older-persons",
      grantName: olderPersons?.name ?? "Older Persons Grant",
      shortName: olderPersons?.shortName,
      officialHref: olderPersons?.officialHref ?? OFFICIAL_LINKS[2].href,
      state,
      date: olderPersonsDate,
      note: officialOverride ? officialNote : regularGrantNote,
      published: true,
      translations: {
        zu: {
          note: officialOverride ? officialNoteZu : regularGrantNoteZu,
        },
        tn: {
          note: officialOverride ? officialNoteTn : regularGrantNoteTn,
        },
        xh: {
          note: officialOverride ? officialNoteXh : regularGrantNoteXh,
        },
      },
    },
    {
      grantSlug: "disability",
      grantName: disability?.name ?? "Disability Grant",
      shortName: disability?.shortName,
      officialHref: disability?.officialHref ?? OFFICIAL_LINKS[2].href,
      state,
      date: disabilityDate,
      note: officialOverride ? officialNote : regularGrantNote,
      published: true,
      translations: {
        zu: {
          note: officialOverride ? officialNoteZu : regularGrantNoteZu,
        },
        tn: {
          note: officialOverride ? officialNoteTn : regularGrantNoteTn,
        },
        xh: {
          note: officialOverride ? officialNoteXh : regularGrantNoteXh,
        },
      },
    },
    {
      grantSlug: "children",
      grantName: children?.name ?? "Children's Grants",
      shortName: children?.shortName,
      officialHref: children?.officialHref ?? OFFICIAL_LINKS[2].href,
      state,
      date: childrenDate,
      note: officialOverride ? officialNote : childrenGrantNote,
      published: true,
      translations: {
        zu: {
          note: officialOverride ? officialNoteZu : childrenGrantNoteZu,
        },
        tn: {
          note: officialOverride ? officialNoteTn : childrenGrantNoteTn,
        },
        xh: {
          note: officialOverride ? officialNoteXh : childrenGrantNoteXh,
        },
      },
    },
    {
      grantSlug: "social-relief",
      grantName: socialRelief?.name ?? "Social Relief of Distress",
      shortName: socialRelief?.shortName,
      officialHref: socialRelief?.officialHref ?? OFFICIAL_LINKS[3].href,
      state: "portal-only",
      date: null,
      note: socialReliefNote,
      published: true,
      translations: {
        zu: {
          note: socialReliefNoteZu,
        },
        tn: {
          note: socialReliefNoteTn,
        },
        xh: {
          note: socialReliefNoteXh,
        },
      },
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
  const fallbackSlug =
    slug === "sassa-confirms-2026-2027-payment-schedule-and-increases"
      ? "sassa-payment-schedule-2026-2027"
      : slug;

  return FALLBACK_NEWS_ARTICLES.find((entry) => entry.slug === fallbackSlug) ?? null;
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
