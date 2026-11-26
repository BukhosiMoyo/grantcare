import { formatPublishedGrantAmount } from "./grant-amounts";
import { EVIDENCE_SOURCES } from "./content-evidence";
import { DEFAULT_LOCALE, type Locale } from "@/lib/site";
import { toGeneratedSetswanaText, toGeneratedXhosaText } from "./generated-guide-translations";

export const WHATSAPP_CHANNEL = {
  label: "GrantCare WhatsApp Channel",
  href: "https://whatsapp.com/channel/0029VbC2OuyJpe8bnXFVWe3k",
} as const;

export const GRANT_AMOUNT_SOURCE = {
  label: EVIDENCE_SOURCES.amounts.label,
  href: EVIDENCE_SOURCES.amounts.href,
} as const;

export const PAYMENT_SCHEDULE_SOURCE = {
  label: "South African Government 2026/2027 SASSA payment dates",
  href: "https://www.sanews.gov.za/south-africa/sassa-announces-202627-social-grant-payment-dates",
} as const;

export const CONTACT_DIRECTORY_SOURCE = {
  label: "South African Government SASSA contact directory",
  href: "https://www.gov.za/about-government/contact-directory/soe/south-african-social-security-agency-sassa",
} as const;

export const OFFICIAL_SASSA_CONTACTS = [
  {
    title: "Official website",
    value: "www.sassa.gov.za",
    href: "https://www.sassa.gov.za/",
  },
  {
    title: "Online services",
    value: "services.sassa.gov.za",
    href: "https://services.sassa.gov.za/portal/r/sassa/sassa",
  },
  {
    title: "SRD portal",
    value: "srd.sassa.gov.za",
    href: "https://srd.sassa.gov.za/",
  },
  {
    title: "Toll-free line",
    value: "0800 60 10 11",
    href: "tel:0800601011",
  },
  {
    title: "Grant enquiries",
    value: "GrantEnquiries@sassa.gov.za",
    href: "mailto:GrantEnquiries@sassa.gov.za",
  },
  {
    title: "Head office",
    value: "501 Prodinsa Building, cnr Steve Biko and Pretorius Streets, Pretoria",
    href: CONTACT_DIRECTORY_SOURCE.href,
  },
] as const;

const OFFICIAL_SASSA_CONTACT_TRANSLATIONS: Partial<Record<Locale, Record<string, string>>> = {
  zu: {
    "Official website": "Iwebhusayithi esemthethweni",
    "Online services": "Amasevisi aku-inthanethi",
    "SRD portal": "Iphothali ye-SRD",
    "Toll-free line": "Inombolo yamahhala",
    "Grant enquiries": "Imibuzo ngezibonelelo",
    "Head office": "Ihhovisi elikhulu",
  },
};

function toGeneratedLocaleText(locale: Locale, value: string) {
  if (locale === "tn") {
    return toGeneratedSetswanaText(value);
  }

  if (locale === "xh") {
    return toGeneratedXhosaText(value);
  }

  return value;
}

export function getOfficialSassaContacts(locale: Locale = DEFAULT_LOCALE) {
  const translations = OFFICIAL_SASSA_CONTACT_TRANSLATIONS[locale] ?? {};

  return OFFICIAL_SASSA_CONTACTS.map((item) => ({
    ...item,
    title: translations[item.title] ?? toGeneratedLocaleText(locale, item.title),
  }));
}

export const LEGAL_LINKS = [
  { path: "/contact", label: "Contact" },
  { path: "/privacy", label: "Privacy" },
  { path: "/disclaimer", label: "Disclaimer" },
  { path: "/terms", label: "Terms" },
  { path: "/editorial-policy", label: "Editorial policy" },
  { path: "/cookie-policy", label: "Cookie policy" },
] as const;

const LEGAL_LINK_TRANSLATIONS: Partial<Record<Locale, Record<string, string>>> = {
  zu: {
    Contact: "Xhumana nathi",
    Privacy: "Ubumfihlo",
    Disclaimer: "Isitatimende sokuzikhulula",
    Terms: "Imigomo",
    "Editorial policy": "Inqubomgomo yokuhlela",
    "Cookie policy": "Inqubomgomo yamakhukhi",
  },
};

export function getLegalLinks(locale: Locale = DEFAULT_LOCALE) {
  const translations = LEGAL_LINK_TRANSLATIONS[locale] ?? {};

  return LEGAL_LINKS.map((item) => ({
    ...item,
    label: translations[item.label] ?? toGeneratedLocaleText(locale, item.label),
  }));
}

export const REPORTED_CHECK_METHODS = [
  {
    title: "Online services",
    value: "services.sassa.gov.za",
    detail: "Official SASSA portal",
    href: "https://services.sassa.gov.za/portal/r/sassa/sassa",
  },
  {
    title: "WhatsApp",
    value: "082 046 8553",
    detail: "Send a status or update message",
    href: "https://wa.me/27820468553",
  },
  {
    title: "Call centre",
    value: "0800 60 10 11",
    detail: "General SASSA support line",
    href: "tel:0800601011",
  },
  {
    title: "SRD portal",
    value: "srd.sassa.gov.za",
    detail: "Status, appeals, and updates",
    href: "https://srd.sassa.gov.za/",
  },
] as const;

const REPORTED_CHECK_METHOD_TRANSLATIONS: Partial<Record<Locale, Record<string, { title?: string; detail?: string }>>> = {
  zu: {
    "Online services": {
      title: "Amasevisi aku-inthanethi",
      detail: "Iphothali ye-SASSA esemthethweni",
    },
    WhatsApp: {
      detail: "Thumela umlayezo wesimo noma wokubuyekeza",
    },
    "Call centre": {
      title: "Isikhungo sezingcingo",
      detail: "Inombolo yosizo evamile ye-SASSA",
    },
    "SRD portal": {
      title: "Iphothali ye-SRD",
      detail: "Isimo, izikhalazo, nezibuyekezo",
    },
  },
};

export function getReportedCheckMethods(locale: Locale = DEFAULT_LOCALE) {
  const translations = REPORTED_CHECK_METHOD_TRANSLATIONS[locale] ?? {};

  return REPORTED_CHECK_METHODS.map((item) => {
    const translation = translations[item.title] ?? {};

    return {
      ...item,
      title: translation.title ?? toGeneratedLocaleText(locale, item.title),
      detail: translation.detail ?? toGeneratedLocaleText(locale, item.detail),
    };
  });
}

export const CURRENT_GRANT_AMOUNT_ROWS = [
  {
    name: "Older Persons Grant",
    slug: "older-persons",
  },
  {
    name: "Disability Grant",
    slug: "disability",
  },
  {
    name: "Care Dependency Grant",
    slug: "care-dependency",
  },
  {
    name: "Child Support Grant",
    slug: "child-support",
  },
  {
    name: "Foster Child Grant",
    slug: "foster-child",
  },
  {
    name: "Grant-in-Aid",
    slug: "grant-in-aid",
  },
  {
    name: "Social Relief of Distress",
    slug: "social-relief",
  },
] as const;

const CURRENT_GRANT_AMOUNT_ROW_TRANSLATIONS: Partial<Record<Locale, Record<string, string>>> = {
  zu: {
    "Older Persons Grant": "Isibonelelo Sabantu Abadala",
    "Disability Grant": "Isibonelelo Sokukhubazeka",
    "Care Dependency Grant": "Isibonelelo Sokunakekelwa",
    "Child Support Grant": "Isibonelelo Sokondla Ingane",
    "Foster Child Grant": "Isibonelelo Sengane Yokutholwa",
    "Grant-in-Aid": "Isibonelelo Sosizo",
    "Social Relief of Distress": "Usizo Lomphakathi Lwesimo Esiphuthumayo",
  },
};

export function getCurrentGrantAmountRows(locale: Locale = DEFAULT_LOCALE) {
  const translations = CURRENT_GRANT_AMOUNT_ROW_TRANSLATIONS[locale] ?? {};

  return CURRENT_GRANT_AMOUNT_ROWS.map((item) => ({
    ...item,
    name: translations[item.name] ?? toGeneratedLocaleText(locale, item.name),
  }));
}

export type GrantAmountDetail = {
  label: string;
  amount: string;
};

const GRANT_AMOUNT_KEYS: Record<string, readonly string[]> = {
  "older-persons": ["older-persons", "older-persons-75", "war-veterans"],
  disability: ["disability"], children: ["child-support", "foster-child", "care-dependency"],
  "child-support": ["child-support"], "foster-child": ["foster-child"],
  "care-dependency": ["care-dependency"], "grant-in-aid": ["grant-in-aid"], "social-relief": ["social-relief"],
};
const GRANT_AMOUNT_LABELS: Record<string, string> = {
  "older-persons": "Old Age (60–74)", "older-persons-75": "Old Age (75+)", "war-veterans": "War Veterans",
  disability: "Disability", "child-support": "Child Support", "foster-child": "Foster Child",
  "care-dependency": "Care Dependency", "grant-in-aid": "Grant-in-Aid", "social-relief": "SRD Grant",
};
const ZULU_AMOUNT_LABELS: Record<string, string> = {
  "older-persons": "Abadala (60-74)", "older-persons-75": "Abadala (75+)", "war-veterans": "Omakadebona Bempi",
  disability: "Ukukhubazeka", "child-support": "Sokondla Ingane", "foster-child": "Ingane Yokutholwa",
  "care-dependency": "Sokunakekelwa", "grant-in-aid": "Isibonelelo Sosizo", "social-relief": "Isibonelelo se-SRD",
};

export function getGrantAmountDetails(slug: string, locale: Locale = DEFAULT_LOCALE, on?: string): GrantAmountDetail[] | null {
  const keys = GRANT_AMOUNT_KEYS[slug];
  if (!keys) return null;
  const details = keys.map(key => {
    const amount = formatPublishedGrantAmount(key, on);
    if (!amount) return null;
    const label = locale === "zu" ? ZULU_AMOUNT_LABELS[key] : toGeneratedLocaleText(locale, GRANT_AMOUNT_LABELS[key]);
    return {label, amount};
  }).filter((detail): detail is GrantAmountDetail => detail !== null);
  return details.length ? details : null;
}

export function getGrantAmountLabel(slug: string, locale: Locale = DEFAULT_LOCALE) {
  const details = getGrantAmountDetails(slug, locale);

  if (!details || details.length === 0) {
    return null;
  }

  if (details.length === 1) {
    return details[0].amount;
  }

  return details.map((detail) => `${detail.label} ${detail.amount}`).join(" / ");
}
