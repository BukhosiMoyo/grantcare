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
    metadataName: "SRD Grant",
    metadataDescriptionSuffix:
      "This page also covers SRD grant, R350 grant, R370 grant, Social Relief of Distress, and historical COVID-19 Social Relief of Distress grant search intent.",
    paymentDisplayName: "SRD Grant (R350 / R370)",
    referenceTerms: [
      "srd",
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
      "grant increase",
      "payment increase",
      "reapplication",
      "status check",
      "payment date",
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

export function getPaymentGrantSeoTitle(entry: PaymentEntryLike, paymentMonthLabel: string) {
  const metadataName = getGrantSeoAliasConfig(entry.grantSlug)?.metadataName ?? entry.grantName;

  return `SASSA ${metadataName} Payment Date for ${paymentMonthLabel}`;
}

export function getPaymentGrantSeoDescription(entry: PaymentEntryLike, paymentMonthLabel: string) {
  const metadataName = getGrantSeoAliasConfig(entry.grantSlug)?.metadataName ?? entry.grantName;

  return `Check the ${metadataName} payment date for ${paymentMonthLabel}, see the current amount, and open the official SASSA link if you need confirmation.`;
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
    ...(aliasConfig?.referenceTerms ?? []),
  ]);
}
