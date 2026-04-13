export const GRANT_AMOUNT_SOURCE = {
  label: "South African Government grant amounts effective April 2026",
  href: "https://www.gov.za/news/media-statements/social-grant-amount-increases-effective-april-2026-24-mar-2026",
} as const;

export const PAYMENT_SCHEDULE_SOURCE = {
  label: "South African Government 2026/2027 SASSA payment dates",
  href: "https://www.gov.za/news/media-statements/20262027-sassa-payment-dates-are-announced-24-mar-2026",
} as const;

export const CONTACT_DIRECTORY_SOURCE = {
  label: "South African Government SASSA contact directory",
  href: "https://www.gov.za/about-government/contact-directory/national-government-directory/national-government-departments/south-african-social-security-agency-sassa",
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

export const LEGAL_LINKS = [
  { path: "/contact", label: "Contact" },
  { path: "/privacy", label: "Privacy" },
  { path: "/disclaimer", label: "Disclaimer" },
  { path: "/terms", label: "Terms" },
  { path: "/editorial-policy", label: "Editorial policy" },
  { path: "/cookie-policy", label: "Cookie policy" },
] as const;

export const REPORTED_CHECK_METHODS = [
  {
    title: "USSD code",
    value: "*120*3210#",
    detail: "Alt: *120*69277# and *134*7737#",
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

export type GrantAmountDetail = {
  label: string;
  amount: string;
};

const GRANT_AMOUNT_DETAILS: Record<string, readonly GrantAmountDetail[]> = {
  "older-persons": [
    {
      label: "Age 60 to 74",
      amount: "R2 400",
    },
    {
      label: "Age 75 or older",
      amount: "R2 420",
    },
  ],
  disability: [
    {
      label: "Disability Grant",
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
      amount: "R1 290 (R1 300 from October 2026)",
    },
    {
      label: "Care Dependency",
      amount: "R2 400",
    },
  ],
  "child-support": [
    {
      label: "Child Support Grant",
      amount: "R580",
    },
  ],
  "foster-child": [
    {
      label: "Foster Child Grant",
      amount: "R1 290 (R1 300 from October 2026)",
    },
  ],
  "care-dependency": [
    {
      label: "Care Dependency Grant",
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
      label: "Social Relief of Distress",
      amount: "R370",
    },
  ],
};

export function getGrantAmountDetails(slug: string) {
  return GRANT_AMOUNT_DETAILS[slug] ?? null;
}

export function getGrantAmountLabel(slug: string) {
  const details = getGrantAmountDetails(slug);

  if (!details || details.length === 0) {
    return null;
  }

  if (details.length === 1) {
    return details[0].amount;
  }

  return details.map((detail) => `${detail.label} ${detail.amount}`).join(" / ");
}
