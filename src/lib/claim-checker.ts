export type ClaimCheckerType =
  | "amount-claim"
  | "increase-update"
  | "payment-story"
  | "warning-message";

export type ClaimCheckerOption = {
  value: string;
  label: string;
};

export type ClaimCheckerResult = {
  title: string;
  summary: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export const CLAIM_CHECKER_TYPES: Array<{
  value: ClaimCheckerType;
  label: string;
}> = [
  { value: "amount-claim", label: "New grant or amount" },
  { value: "increase-update", label: "Increase update" },
  { value: "payment-story", label: "Payment or delay" },
  { value: "warning-message", label: "Warning or suspension" },
];

const CLAIM_CHECKER_OPTIONS: Record<ClaimCheckerType, ClaimCheckerOption[]> = {
  "amount-claim": [
    { value: "r700", label: "R700 grant" },
    { value: "youth", label: "Youth grant" },
    { value: "r12500-youth", label: "R12500 youth grant" },
    { value: "r500", label: "R500 grant" },
    { value: "r530", label: "R530 grant" },
    { value: "r1500-grocery", label: "R1500 grocery grant" },
    { value: "r1370", label: "R1370 grant" },
    { value: "r1400", label: "R1400 grant" },
    { value: "r2090", label: "R2090 grant" },
    { value: "r2315", label: "R2315 grant" },
    { value: "r3070", label: "R3070 grant" },
    { value: "senior-bonus", label: "Senior grant bonus" },
  ],
  "increase-update": [
    { value: "social-grant", label: "Social grant increase" },
    { value: "srd", label: "SRD increase" },
    { value: "older-persons", label: "Older Persons increase" },
    { value: "disability", label: "Disability increase" },
    { value: "child-support", label: "Child Support increase" },
  ],
  "payment-story": [
    { value: "social-grant-dates", label: "Social grant dates" },
    { value: "capitec-delay", label: "Capitec delay" },
    { value: "double-payment", label: "Double payment" },
    { value: "r500-delay", label: "R500 delay story" },
    { value: "r350-id-date", label: "R350 date by ID number" },
    { value: "general-delay", label: "General payment delay" },
  ],
  "warning-message": [
    { value: "suspension", label: "Suspension warning" },
    { value: "deadline-kyc", label: "Deadline or KYC notice" },
    { value: "gold-card-deadline", label: "Gold card deadline" },
    { value: "beneficiary-update", label: "Beneficiary detail update" },
    { value: "website-contact", label: "Website or contact route" },
  ],
};

const CLAIM_CHECKER_RESULTS: Record<string, ClaimCheckerResult> = {
  "amount-claim:r700": {
    title: "R700 grant claim",
    summary: "Open the exact myth-busting guide, then compare the claim with current grant amounts before you trust it.",
    primaryHref: "/guides/is-the-r700-grant-real",
    primaryLabel: "Open guide",
    secondaryHref: "/grant-amounts",
    secondaryLabel: "Grant amounts",
  },
  "amount-claim:youth": {
    title: "Youth grant claim",
    summary: "Open the youth-grant myth page first, then compare the claim with real grant categories.",
    primaryHref: "/guides/is-the-youth-grant-real",
    primaryLabel: "Open guide",
    secondaryHref: "/eligibility-checker",
    secondaryLabel: "Eligibility checker",
  },
  "amount-claim:r12500-youth": {
    title: "R12500 youth grant claim",
    summary: "Open the exact myth-busting guide, then compare the claim with the broader youth-grant route.",
    primaryHref: "/guides/is-the-r12500-youth-grant-real",
    primaryLabel: "Open guide",
    secondaryHref: "/eligibility-checker",
    secondaryLabel: "Eligibility checker",
  },
  "amount-claim:r500": {
    title: "R500 grant claim",
    summary: "Open the exact myth-busting guide, then compare the claim with current grant amounts.",
    primaryHref: "/guides/is-the-r500-grant-real",
    primaryLabel: "Open guide",
    secondaryHref: "/grant-amounts",
    secondaryLabel: "Grant amounts",
  },
  "amount-claim:r530": {
    title: "R530 grant claim",
    summary: "Open the exact myth-busting guide, then compare the claim with current real grant categories.",
    primaryHref: "/guides/is-the-r530-grant-real",
    primaryLabel: "Open guide",
    secondaryHref: "/grant-amounts",
    secondaryLabel: "Grant amounts",
  },
  "amount-claim:r1500-grocery": {
    title: "R1500 grocery grant claim",
    summary: "Open the exact myth-busting guide, then compare the claim with current grant amounts before you trust it.",
    primaryHref: "/guides/is-the-r1500-grocery-grant-real",
    primaryLabel: "Open guide",
    secondaryHref: "/grant-amounts",
    secondaryLabel: "Grant amounts",
  },
  "amount-claim:r1370": {
    title: "R1370 grant claim",
    summary: "Open the exact myth-busting guide, then compare the claim with current grant amounts and routes.",
    primaryHref: "/guides/is-the-r1370-grant-real",
    primaryLabel: "Open guide",
    secondaryHref: "/grant-amounts",
    secondaryLabel: "Grant amounts",
  },
  "amount-claim:r1400": {
    title: "R1400 grant claim",
    summary: "Open the exact myth-busting guide, then compare the claim with current grant amounts before you trust it.",
    primaryHref: "/guides/is-the-r1400-grant-real",
    primaryLabel: "Open guide",
    secondaryHref: "/grant-amounts",
    secondaryLabel: "Grant amounts",
  },
  "amount-claim:r2090": {
    title: "R2090 grant claim",
    summary: "Open the exact myth-busting guide, then compare the claim with current grant amounts and payment guidance.",
    primaryHref: "/guides/is-the-r2090-grant-real",
    primaryLabel: "Open guide",
    secondaryHref: "/grant-amounts",
    secondaryLabel: "Grant amounts",
  },
  "amount-claim:r2315": {
    title: "R2315 grant claim",
    summary: "Open the exact myth-busting guide, then compare the claim with current grant amounts and payment pages.",
    primaryHref: "/guides/is-the-r2315-grant-real",
    primaryLabel: "Open guide",
    secondaryHref: "/payment-dates",
    secondaryLabel: "Payment dates",
  },
  "amount-claim:r3070": {
    title: "R3070 grant claim",
    summary: "Open the exact myth-busting guide, then compare the claim with current grant amounts before you trust it.",
    primaryHref: "/guides/is-the-r3070-grant-real",
    primaryLabel: "Open guide",
    secondaryHref: "/grant-amounts",
    secondaryLabel: "Grant amounts",
  },
  "amount-claim:senior-bonus": {
    title: "Senior grant bonus claim",
    summary: "Open the exact myth-busting guide, then compare the claim with the real Older Persons Grant route.",
    primaryHref: "/guides/is-the-senior-grant-bonus-real",
    primaryLabel: "Open guide",
    secondaryHref: "/grants/older-persons",
    secondaryLabel: "Older Persons Grant",
  },
  "increase-update:social-grant": {
    title: "Social grant increase update",
    summary: "Open the increase-check guide first, then compare the update with the main amount hub.",
    primaryHref: "/guides/how-to-check-social-grant-increase-updates-safely",
    primaryLabel: "Open guide",
    secondaryHref: "/grant-amounts",
    secondaryLabel: "Grant amounts",
  },
  "increase-update:srd": {
    title: "SRD increase update",
    summary: "Open the SRD increase guide first, then compare the update with the SRD grant page.",
    primaryHref: "/guides/how-to-check-srd-grant-increase-updates-safely",
    primaryLabel: "Open guide",
    secondaryHref: "/grants/social-relief",
    secondaryLabel: "SRD grant",
  },
  "increase-update:older-persons": {
    title: "Older Persons increase update",
    summary: "Open the increase-check guide first, then compare the update with the Older Persons Grant page.",
    primaryHref: "/guides/how-to-check-older-persons-grant-increase-updates-safely",
    primaryLabel: "Open guide",
    secondaryHref: "/grants/older-persons",
    secondaryLabel: "Older Persons Grant",
  },
  "increase-update:disability": {
    title: "Disability increase update",
    summary: "Open the increase-check guide first, then compare the update with the Disability Grant page.",
    primaryHref: "/guides/how-to-check-disability-grant-increase-updates-safely",
    primaryLabel: "Open guide",
    secondaryHref: "/grants/disability",
    secondaryLabel: "Disability Grant",
  },
  "increase-update:child-support": {
    title: "Child Support increase update",
    summary: "Open the increase-check guide first, then compare the update with the Child Support Grant page.",
    primaryHref: "/guides/how-to-check-child-support-grant-increase-updates-safely",
    primaryLabel: "Open guide",
    secondaryHref: "/grants/child-support",
    secondaryLabel: "Child Support Grant",
  },
  "payment-story:social-grant-dates": {
    title: "Social grant dates story",
    summary: "Open the broad date guide first, then narrow the claim on the payment-date hub.",
    primaryHref: "/guides/what-social-grant-dates-searches-usually-mean",
    primaryLabel: "Open guide",
    secondaryHref: "/payment-dates",
    secondaryLabel: "Payment dates",
  },
  "payment-story:capitec-delay": {
    title: "Capitec payment delay",
    summary: "Open the delay guide first, then compare the issue with the payment-date and payment-stage pages.",
    primaryHref: "/guides/capitec-sassa-payment-delay-help",
    primaryLabel: "Open guide",
    secondaryHref: "/payment-dates",
    secondaryLabel: "Payment dates",
  },
  "payment-story:double-payment": {
    title: "Double payment story",
    summary: "Open the verification guide first, then compare the claim with the payment-date hub.",
    primaryHref: "/guides/how-to-check-if-a-double-payment-update-is-real",
    primaryLabel: "Open guide",
    secondaryHref: "/payment-dates",
    secondaryLabel: "Payment dates",
  },
  "payment-story:r500-delay": {
    title: "R500 delay story",
    summary: "Open the delay explainer first, then compare the claim with the amount hub.",
    primaryHref: "/guides/what-r500-grant-payment-delay-searches-usually-mean",
    primaryLabel: "Open guide",
    secondaryHref: "/grant-amounts",
    secondaryLabel: "Grant amounts",
  },
  "payment-story:r350-id-date": {
    title: "R350 date by ID number",
    summary: "Open the myth guide first, then compare the claim with the payment-date hub.",
    primaryHref: "/guides/sassa-r350-grant-payment-date-according-to-id-number",
    primaryLabel: "Open guide",
    secondaryHref: "/payment-dates",
    secondaryLabel: "Payment dates",
  },
  "payment-story:general-delay": {
    title: "General payment delay",
    summary: "Open the delay guide first, then compare the issue with the current payment-date page.",
    primaryHref: "/guides/why-payment-is-delayed",
    primaryLabel: "Open guide",
    secondaryHref: "/payment-dates",
    secondaryLabel: "Payment dates",
  },
  "warning-message:suspension": {
    title: "Suspension warning",
    summary: "Open the warning-check guide first, then compare the wording with the status-help library.",
    primaryHref: "/guides/how-to-check-if-a-suspension-warning-is-official",
    primaryLabel: "Open guide",
    secondaryHref: "/status",
    secondaryLabel: "Status help",
  },
  "warning-message:deadline-kyc": {
    title: "Deadline or KYC notice",
    summary: "Open the deadline-check guide first, then compare the wording with the KYC explainer.",
    primaryHref: "/guides/how-to-check-if-a-deadline-notice-is-official",
    primaryLabel: "Open guide",
    secondaryHref: "/guides/what-id-and-kyc-deadline-searches-usually-mean",
    secondaryLabel: "Read the wording guide",
  },
  "warning-message:gold-card-deadline": {
    title: "Gold card deadline",
    summary: "Open the gold-card deadline guide first, then compare the notice with the main deadline-check guide.",
    primaryHref: "/guides/what-gold-card-and-card-deadline-searches-usually-mean",
    primaryLabel: "Open guide",
    secondaryHref: "/guides/how-to-check-if-a-deadline-notice-is-official",
    secondaryLabel: "Deadline check guide",
  },
  "warning-message:beneficiary-update": {
    title: "Beneficiary detail update",
    summary: "Open the beneficiary-update guide first, then use the official contact guide if the route still needs checking.",
    primaryHref: "/guides/what-beneficiary-detail-update-searches-usually-mean",
    primaryLabel: "Open guide",
    secondaryHref: "/guides/how-to-find-official-contact-details-safely",
    secondaryLabel: "Official contact guide",
  },
  "warning-message:website-contact": {
    title: "Website or contact route",
    summary: "Open the site-check guide first, then compare the route with the official contact guide.",
    primaryHref: "/guides/how-to-know-if-a-sassa-website-is-official",
    primaryLabel: "Open guide",
    secondaryHref: "/guides/how-to-find-official-contact-details-safely",
    secondaryLabel: "Official contact guide",
  },
};

export function getClaimCheckerOptions(type: ClaimCheckerType) {
  return CLAIM_CHECKER_OPTIONS[type];
}

export function getClaimCheckerResult(type: ClaimCheckerType, option: string) {
  return CLAIM_CHECKER_RESULTS[`${type}:${option}`] ?? null;
}
