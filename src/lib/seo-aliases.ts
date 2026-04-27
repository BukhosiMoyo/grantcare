type GrantLike = {
  slug: string;
  name: string;
  summary?: string;
};

type PaymentEntryLike = {
  grantSlug: string;
  grantName: string;
};

type GrantSeoAliasConfig = {
  displayName?: string;
  metadataName?: string;
  metadataDescriptionSuffix?: string;
  paymentDisplayName?: string;
  referenceTerms: string[];
};

const GRANT_SEO_ALIAS_MAP: Record<string, GrantSeoAliasConfig> = {
  "social-relief": {
    displayName: "Social Relief of Distress (SRD Grant)",
    metadataName: "SRD Grant (R370)",
    metadataDescriptionSuffix:
      "This page also covers SRD SASSA Gov.za search intent, SRD application help, SRD status-check guidance, payment dates, reapplication help, and historical R350 grant searches.",
    paymentDisplayName: "SRD Grant (R370)",
    referenceTerms: [
      "srd",
      "srd sassa gov za",
      "srd sassa gov za application",
      "srd sassa gov za status check",
      "srd sassa gov za status check online",
      "www srd sassa gov za status",
      "srd sassa",
      "srd grant",
      "srd grant increase",
      "social relief grant",
      "social relief of distress grant",
      "social relief of distress",
      "covid 19 social relief of distress grant",
      "covid-19 social relief of distress grant",
      "covid 19 social relief of distress",
      "sassa srd grant",
      "srd sassa grant",
      "r350",
      "r350 grant",
      "r370",
      "r370 grant",
      "online application",
      "application form",
      "grant increase",
      "payment increase",
      "reapplication",
      "banking details",
      "bank verification",
      "identity verification",
      "phone number change",
      "change number",
      "status check",
      "payment date",
    ],
  },
  disability: {
    displayName: "Disability Grant",
    metadataName: "Disability Grant",
    metadataDescriptionSuffix:
      "This page also covers disability payment-date and disability pay-date search intent.",
    paymentDisplayName: "Disability Grant",
    referenceTerms: [
      "disability grant",
      "disability payment date",
      "disability pay date",
      "disability payment",
      "disabled adult grant",
    ],
  },
  children: {
    displayName: "Children's Grants",
    metadataName: "Children's Grants",
    metadataDescriptionSuffix:
      "This page also covers child grant, child support grant payment date, children's grant pay date, foster child, and care dependency payment-date search intent.",
    paymentDisplayName: "Children's Grants",
    referenceTerms: [
      "children's grants",
      "children grant",
      "child grant",
      "child grant date",
      "child grant pay date",
      "children payment date",
      "child support grant",
      "child support grant payment date",
      "foster child grant",
      "care dependency grant",
    ],
  },
  "older-persons": {
    displayName: "Older Persons Grant (Old Age Grant)",
    metadataName: "Old Age Grant",
    metadataDescriptionSuffix:
      "This page also covers old age grant and pension-style search intent.",
    paymentDisplayName: "Older Persons Grant (Old Age Grant)",
    referenceTerms: [
      "old age grant",
      "old age pension",
      "pension grant",
      "sassa old age grant",
      "old age grant pay date",
      "grant increase",
      "payment date",
    ],
  },
};

function joinTerms(parts: Array<string | undefined>) {
  return [...new Set(parts.map((part) => part?.trim()).filter(Boolean))].join(" ");
}

function getGrantSeoAliasConfig(slug: string) {
  return GRANT_SEO_ALIAS_MAP[slug];
}

export function getGrantSeoDisplayName(grant: GrantLike) {
  return getGrantSeoAliasConfig(grant.slug)?.displayName ?? grant.name;
}

export function getGrantSeoMetadataName(grant: GrantLike) {
  return getGrantSeoAliasConfig(grant.slug)?.metadataName ?? getGrantSeoDisplayName(grant);
}

export function getGrantSeoDescription(grant: GrantLike, amountLabel?: string | null) {
  const aliasConfig = getGrantSeoAliasConfig(grant.slug);
  const metadataName = getGrantSeoMetadataName(grant);
  const baseDescription = amountLabel
    ? `Check ${metadataName} eligibility, the current SASSA amount (${amountLabel}), documents, and how to apply through the official route.`
    : `Check ${metadataName} eligibility, documents, and how to apply through the official SASSA route.`;

  return aliasConfig?.metadataDescriptionSuffix
    ? `${baseDescription} ${aliasConfig.metadataDescriptionSuffix}`
    : baseDescription;
}

export function getGrantSeoReferenceText(grant: GrantLike) {
  const aliasConfig = getGrantSeoAliasConfig(grant.slug);

  return joinTerms([
    grant.slug,
    grant.name,
    grant.summary,
    aliasConfig?.displayName,
    aliasConfig?.metadataName,
    ...(aliasConfig?.referenceTerms ?? []),
  ]);
}

export function getPaymentGrantSeoDisplayName(entry: PaymentEntryLike) {
  return getGrantSeoAliasConfig(entry.grantSlug)?.paymentDisplayName ?? entry.grantName;
}

export function getPaymentGrantSeoTitle(
  entry: PaymentEntryLike,
  paymentMonthLabel: string,
  paymentDateText?: string | null,
) {
  const metadataName = getGrantSeoAliasConfig(entry.grantSlug)?.metadataName ?? entry.grantName;

  if (paymentDateText) {
    const dateType = entry.grantSlug === "social-relief" ? "Window" : "Date";
    return `SASSA ${metadataName} Payment ${dateType}: ${paymentDateText}`;
  }

  return `SASSA ${metadataName} Payment Dates for ${paymentMonthLabel}`;
}

export function getPaymentGrantSeoDescription(
  entry: PaymentEntryLike,
  paymentMonthLabel: string,
  paymentDateText?: string | null,
) {
  const metadataName = getGrantSeoAliasConfig(entry.grantSlug)?.metadataName ?? entry.grantName;

  if (paymentDateText) {
    const dateType = entry.grantSlug === "social-relief" ? "window" : "date";
    return `Check the ${metadataName} payment ${dateType} for ${paymentMonthLabel}: ${paymentDateText}. See the current amount and pay-date note.`;
  }

  return `Check ${metadataName} payment dates for ${paymentMonthLabel}, read the current pay-date note, and see the current amount.`;
}

export function getPaymentGrantSeoReferenceText(
  entry: PaymentEntryLike,
  paymentMonthLabel: string,
) {
  const aliasConfig = getGrantSeoAliasConfig(entry.grantSlug);

  return joinTerms([
    paymentMonthLabel,
    entry.grantName,
    getPaymentGrantSeoDisplayName(entry),
    "grant pay date",
    "payment date",
    "payment dates",
    "pay date",
    "pay dates",
    "pay day",
    "grant date",
    ...(aliasConfig?.referenceTerms ?? []),
  ]);
}
