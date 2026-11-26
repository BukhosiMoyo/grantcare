/** Evidence is scoped to a claim, never inferred from an article's edit date. */
export type EvidenceState = "checked" | "limited" | "pending";
export type EvidenceSource = {
  id: string;
  label: string;
  href: string;
  scope: string;
  state: EvidenceState;
  checkedOn?: string;
  publishedOn?: string;
};

export const EVIDENCE_SOURCES = {
  amounts: {
    id: "grant-amount-notice-2026", label: "Government Gazette 54397, notice R.7287 — grant amounts",
    href: "https://www.gov.za/sites/default/files/gcis_document/202603/54397reg11960gon7276.pdf",
    scope: "Maximum ordinary-grant amounts from April 2026 and the Foster Child increase from October 2026. The enacted notice resolves differences from the earlier budget reporting.",
    state: "checked", checkedOn: "2026-11-26", publishedOn: "2026-03-23",
  },
  srdAmount: {
    id: "srd-amount-2026", label: "SAnews: SRD amount and extension, 25 February 2026",
    href: "https://www.sanews.gov.za/node/79817",
    scope: "SRD remains R370 under the published extension to 31 March 2027. For ordinary-grant amounts, use the later Gazette notice rather than this budget report.",
    state: "checked", checkedOn: "2026-11-26", publishedOn: "2026-02-25",
  },
  contacts: {
    id: "sassa-contact-reference", label: "SASSA Services: regional contact listings",
    href: "https://services.sassa.gov.za/portal/r/sassa/sassa/contact-us-pu",
    scope: "Listed regional addresses, enquiry telephone numbers and emails were compared with this page. Other government directories list different addresses for some regions; confirm with the office before travelling. Map pins are approximate.",
    state: "limited", checkedOn: "2026-11-26",
  },
  directory: {
    id: "government-sassa-directory", label: "South African Government: SASSA directory",
    href: "https://www.gov.za/about-government/contact-directory/soe/south-african-social-security-agency-sassa",
    scope: "National enquiry contact and head-office address. Regional manager entries can differ from the Services portal's public enquiry listings.",
    state: "checked", checkedOn: "2026-11-26",
  },
  child: {
    id: "child-support-reference", label: "South African Government: Child Support Grant",
    href: "https://www.gov.za/services/child-care-social-benefits/child-support-grant",
    scope: "Caregiver, child age, residence and document guidance. Numeric means-test thresholds differ across official publications and are not certified by this review.",
    state: "limited", checkedOn: "2026-11-26",
  },
  disability: {
    id: "disability-reference", label: "South African Government: Disability Grant",
    href: "https://www.gov.za/services/social-benefits/disability-grant",
    scope: "Age range and medical-assessment guidance. Numeric means-test thresholds require a separate current determination.",
    state: "limited", checkedOn: "2026-11-26",
  },
  grants: {
    id: "sassa-grant-reference", label: "SASSA Services: grants information",
    href: "https://services.sassa.gov.za/portal/r/sassa/sassa/grants-information",
    scope: "Official reference for grant-specific requirements. The grant requirements page was checked directly. Numeric means-test thresholds are outside this check; linked historical brochures must not supply current amounts.",
    state: "limited", checkedOn: "2026-11-26",
  },
  srd: {
    id: "srd-official-reference", label: "SASSA: official SRD portal",
    href: "https://srd.sassa.gov.za/",
    scope: "Official route for SRD information and account actions. Individual decisions and payment dates must be checked there; this guide is not an official status result.",
    state: "checked", checkedOn: "2026-11-26",
  },
  appeals: {
    id: "srd-appeal-reference", label: "DSD: Independent Tribunal SRD appeals",
    href: "https://srd.sassa.gov.za/appeals/",
    scope: "SRD appeal instructions. Some background text on the portal describes an earlier grant period; do not treat its historic income threshold as current. Check the instructions and decision notice for the month concerned.",
    state: "limited", checkedOn: "2026-11-26",
  },
  banking: {
    id: "srd-banking-reference", label: "SASSA: SRD banking-update instructions",
    href: "https://srd.sassa.gov.za/sc19/banking-details-update",
    scope: "Registered-mobile verification, beneficiary-owned bank accounts and future use of new details after verification. These instructions apply to SRD; they do not establish a universal bank-clearing time.",
    state: "checked", checkedOn: "2026-11-26",
  },
} as const satisfies Record<string, EvidenceSource>;

export type EvidenceTopic = "general" | "amounts" | "grants" | "status" | "appeals" | "banking" | "contacts" | "planning";

export function getEvidenceTopic(value: string): EvidenceTopic {
  if (/appeal|reconsider|declin/.test(value)) return "appeals";
  if (/bank|phone|identity|verification|otp/.test(value)) return "banking";
  if (/amount|increase|bonus|r700|r1400/.test(value)) return "amounts";
  if (/office|contact/.test(value)) return "contacts";
  if (/budget|grocery|essentials/.test(value)) return "planning";
  if (/appl|eligib|document|grant-type/.test(value)) return "grants";
  return "status";
}

export function getEvidenceSources(topic: EvidenceTopic): readonly EvidenceSource[] {
  switch (topic) {
    case "amounts": return [EVIDENCE_SOURCES.amounts, EVIDENCE_SOURCES.srdAmount];
    case "contacts": return [EVIDENCE_SOURCES.contacts, EVIDENCE_SOURCES.directory];
    case "grants": return [EVIDENCE_SOURCES.grants, EVIDENCE_SOURCES.child, EVIDENCE_SOURCES.disability];
    case "banking": return [EVIDENCE_SOURCES.banking, EVIDENCE_SOURCES.srd];
    case "appeals": return [EVIDENCE_SOURCES.appeals, EVIDENCE_SOURCES.srd];
    case "planning": return [EVIDENCE_SOURCES.amounts, EVIDENCE_SOURCES.srdAmount];
    default: return [EVIDENCE_SOURCES.srd, EVIDENCE_SOURCES.grants];
  }
}

/** Only safe, public web references can become source links. */
export function isEvidenceUrl(value: string): boolean {
  try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password; }
  catch { return false; }
}
