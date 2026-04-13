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
    amount: "R2 400 (60-74) / R2 420 (75+)",
  },
  {
    name: "Disability Grant",
    amount: "R2 400",
  },
  {
    name: "Care Dependency Grant",
    amount: "R2 400",
  },
  {
    name: "Child Support Grant",
    amount: "R580",
  },
  {
    name: "Foster Child Grant",
    amount: "R1 290 (R1 300 from October 2026)",
  },
  {
    name: "Grant-in-Aid",
    amount: "R580",
  },
  {
    name: "Social Relief of Distress",
    amount: "R370",
  },
] as const;

const GRANT_AMOUNT_LABELS: Record<string, string> = {
  "older-persons": "R2 400 (60-74) / R2 420 (75+)",
  disability: "R2 400",
  children: "Child Support R580 / Foster Child R1 290 / Care Dependency R2 400",
  "child-support": "R580",
  "foster-child": "R1 290 (R1 300 from October 2026)",
  "care-dependency": "R2 400",
  "grant-in-aid": "R580",
  "social-relief": "R370",
};

export function getGrantAmountLabel(slug: string) {
  return GRANT_AMOUNT_LABELS[slug] ?? null;
}
