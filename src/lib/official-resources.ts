import { DEFAULT_LOCALE, type Locale } from "@/lib/site";
import { toGeneratedSetswanaText, toGeneratedXhosaText } from "./generated-guide-translations";

export const WHATSAPP_CHANNEL = {
  label: "GrantCare WhatsApp Channel",
  href: "https://whatsapp.com/channel/0029VbC2OuyJpe8bnXFVWe3k",
} as const;

export const GRANT_AMOUNT_SOURCE = {
  label: "South African Government grant amounts effective April 2026",
  href: "https://www.dsd.gov.za/index.php/21-latest-news/680-sassa-confirms-2026-2027-social-grant-payment-schedule-and-increases",
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

const GRANT_AMOUNT_DETAILS: Record<string, readonly GrantAmountDetail[]> = {
  "older-persons": [
    {
      label: "Old Age (60–74)",
      amount: "R2 400",
    },
    {
      label: "Old Age (75+)",
      amount: "R2 420",
    },
    {
      label: "War Veterans",
      amount: "R2 420",
    },
  ],
  disability: [
    {
      label: "Disability",
      amount: "R2 400",
    },
  ],
  children: [
    {
      label: "Child Support",
      amount: "R580",
    },
    {
      label: "Foster Child",
      amount: "R1 290 (R1 300 from October)",
    },
    {
      label: "Care Dependency",
      amount: "R2 400",
    },
  ],
  "child-support": [
    {
      label: "Child Support",
      amount: "R580",
    },
  ],
  "foster-child": [
    {
      label: "Foster Child",
      amount: "R1 290 (R1 300 from October)",
    },
  ],
  "care-dependency": [
    {
      label: "Care Dependency",
      amount: "R2 400",
    },
  ],
  "grant-in-aid": [
    {
      label: "Grant-in-Aid",
      amount: "R580",
    },
  ],
  "social-relief": [
    {
      label: "SRD Grant",
      amount: "R370",
    },
  ],
};

const GRANT_AMOUNT_DETAIL_TRANSLATIONS: Partial<Record<Locale, Record<string, readonly GrantAmountDetail[]>>> = {
  zu: {
    "older-persons": [
      {
        label: "Abadala (60-74)",
        amount: "R2 400",
      },
      {
        label: "Abadala (75+)",
        amount: "R2 420",
      },
      {
        label: "Omakadebona Bempi",
        amount: "R2 420",
      },
    ],
    disability: [
      {
        label: "Ukukhubazeka",
        amount: "R2 400",
      },
    ],
    children: [
      {
        label: "Sokondla Ingane",
        amount: "R580",
      },
      {
        label: "Ingane Yokutholwa",
        amount: "R1 290 (R1 300 kusukela ngo-Okthoba)",
      },
      {
        label: "Sokunakekelwa",
        amount: "R2 400",
      },
    ],
    "child-support": [
      {
        label: "Sokondla Ingane",
        amount: "R580",
      },
    ],
    "foster-child": [
      {
        label: "Ingane Yokutholwa",
        amount: "R1 290 (R1 300 kusukela ngo-Okthoba)",
      },
    ],
    "care-dependency": [
      {
        label: "Sokunakekelwa",
        amount: "R2 400",
      },
    ],
    "grant-in-aid": [
      {
        label: "Isibonelelo Sosizo",
        amount: "R580",
      },
    ],
    "social-relief": [
      {
        label: "Isibonelelo se-SRD",
        amount: "R370",
      },
    ],
  },
};

export function getGrantAmountDetails(slug: string, locale: Locale = DEFAULT_LOCALE) {
  const localized = GRANT_AMOUNT_DETAIL_TRANSLATIONS[locale]?.[slug];
  if (localized) {
    return localized;
  }

  const details = GRANT_AMOUNT_DETAILS[slug];
  if (locale === "tn" && details) {
    return details.map((detail) => ({
      label: toGeneratedSetswanaText(detail.label),
      amount: detail.amount.replace("from October", "go tloga ka Diphalane"),
    }));
  }

  if (locale === "xh" && details) {
    return details.map((detail) => ({
      label: toGeneratedXhosaText(detail.label),
      amount: detail.amount.replace("from October", "ukusukela ngo-Oktobha"),
    }));
  }

  return details ?? null;
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
