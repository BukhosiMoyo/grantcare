import type { Locale } from "@/lib/site";

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
  translations?: Partial<Record<Locale, {
    displayName?: string;
    metadataName?: string;
    metadataDescriptionSuffix?: string;
    paymentDisplayName?: string;
  }>>;
  referenceTerms: string[];
};

const GRANT_SEO_ALIAS_MAP: Record<string, GrantSeoAliasConfig> = {
  "social-relief": {
    displayName: "Social Relief of Distress (SRD Grant)",
    metadataName: "SRD Grant (R370)",
    metadataDescriptionSuffix:
      "This page also covers SRD SASSA Gov.za search intent, SRD application help, SRD status-check guidance, payment dates, reapplication help, and historical R350 grant searches.",
    paymentDisplayName: "SRD Grant (R370)",
    translations: {
      zu: {
        displayName: "Usizo Lwesikhashana Lokuhlupheka (Isibonelelo se-SRD)",
        metadataName: "Isibonelelo se-SRD (R370)",
        paymentDisplayName: "Isibonelelo se-SRD (R370)",
      },
      tn: {
        displayName: "Thuso ya Nakwana ya Kgatelelo (Thuso ya SRD)",
        metadataName: "Thuso ya SRD (R370)",
        paymentDisplayName: "Thuso ya SRD (R370)",
      },
      xh: {
        displayName: "Uncedo Lwentlalo Loxinzelelo (Isibonelelo se-SRD)",
        metadataName: "Isibonelelo se-SRD (R370)",
        paymentDisplayName: "Isibonelelo se-SRD (R370)",
      },
    },
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
    translations: {
      zu: {
        displayName: "Isibonelelo Sokukhubazeka",
        metadataName: "Isibonelelo Sokukhubazeka",
        paymentDisplayName: "Isibonelelo Sokukhubazeka",
      },
      tn: {
        displayName: "Thuso ya Bogole",
        metadataName: "Thuso ya Bogole",
        paymentDisplayName: "Thuso ya Bogole",
      },
      xh: {
        displayName: "Isibonelelo Sokukhubazeka",
        metadataName: "Isibonelelo Sokukhubazeka",
        paymentDisplayName: "Isibonelelo Sokukhubazeka",
      },
    },
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
    metadataName: "Child Grant",
    metadataDescriptionSuffix:
      "This page also covers child grant, child support grant payment date, children's grant pay date, foster child, and care dependency payment-date search intent.",
    paymentDisplayName: "Children's Grants",
    translations: {
      zu: {
        displayName: "Izibonelelo Zezingane",
        metadataName: "Isibonelelo Sengane",
        paymentDisplayName: "Izibonelelo Zezingane",
      },
      tn: {
        displayName: "Dithuso tsa Bana",
        metadataName: "Thuso ya Ngwana",
        paymentDisplayName: "Dithuso tsa Bana",
      },
      xh: {
        displayName: "Izibonelelo Zabantwana",
        metadataName: "Isibonelelo Somntwana",
        paymentDisplayName: "Izibonelelo Zabantwana",
      },
    },
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
    translations: {
      zu: {
        displayName: "Isibonelelo Sabantu Abadala",
        metadataName: "Isibonelelo Sabantu Abadala",
        paymentDisplayName: "Isibonelelo Sabantu Abadala",
      },
      tn: {
        displayName: "Thuso ya Bagodi",
        metadataName: "Thuso ya Bagodi",
        paymentDisplayName: "Thuso ya Bagodi",
      },
      xh: {
        displayName: "Isibonelelo Sabantu Abadala",
        metadataName: "Isibonelelo Sabantu Abadala",
        paymentDisplayName: "Isibonelelo Sabantu Abadala",
      },
    },
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

function getLocalizedAliasValue(
  aliasConfig: GrantSeoAliasConfig | undefined,
  locale: Locale,
  key: "displayName" | "metadataName" | "metadataDescriptionSuffix" | "paymentDisplayName",
) {
  return aliasConfig?.translations?.[locale]?.[key] ?? aliasConfig?.[key];
}

export function getGrantSeoDisplayName(grant: GrantLike, locale: Locale = "en") {
  return getLocalizedAliasValue(getGrantSeoAliasConfig(grant.slug), locale, "displayName") ?? grant.name;
}

export function getGrantSeoMetadataName(grant: GrantLike, locale: Locale = "en") {
  return getLocalizedAliasValue(getGrantSeoAliasConfig(grant.slug), locale, "metadataName") ?? getGrantSeoDisplayName(grant, locale);
}

export function getGrantSeoDescription(grant: GrantLike, amountLabel?: string | null, locale: Locale = "en") {
  const aliasConfig = getGrantSeoAliasConfig(grant.slug);
  const metadataName = getGrantSeoMetadataName(grant, locale);
  const baseDescription =
    locale === "zu"
      ? amountLabel
        ? `Hlola ukufaneleka kwe-${metadataName}, inani lamanje le-SASSA (${amountLabel}), imibhalo, nendlela yokufaka isicelo ngomzila osemthethweni.`
        : `Hlola ukufaneleka kwe-${metadataName}, imibhalo, nendlela yokufaka isicelo ngomzila osemthethweni we-SASSA.`
      : locale === "tn"
        ? amountLabel
          ? `Tlhola tshwanelo ya ${metadataName}, madi a gone jaanong a SASSA (${amountLabel}), ditokomane, le kafa o ka dirang kopo ka tsela ya semmuso.`
          : `Tlhola tshwanelo ya ${metadataName}, ditokomane, le kafa o ka dirang kopo ka tsela ya semmuso ya SASSA.`
        : locale === "xh"
          ? amountLabel
            ? `Jonga ukufaneleka kwe-${metadataName}, imali ye-SASSA yangoku (${amountLabel}), amaxwebhu, nendlela yokufaka isicelo ngendlela esemthethweni.`
            : `Jonga ukufaneleka kwe-${metadataName}, amaxwebhu, nendlela yokufaka isicelo ngendlela esemthethweni ye-SASSA.`
      : amountLabel
        ? `Check ${metadataName} eligibility, the current SASSA amount (${amountLabel}), documents, and how to apply through the official route.`
        : `Check ${metadataName} eligibility, documents, and how to apply through the official SASSA route.`;

  const metadataDescriptionSuffix = getLocalizedAliasValue(aliasConfig, locale, "metadataDescriptionSuffix");

  return metadataDescriptionSuffix
    ? `${baseDescription} ${metadataDescriptionSuffix}`
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

export function getPaymentGrantSeoDisplayName(entry: PaymentEntryLike, locale: Locale = "en") {
  return getLocalizedAliasValue(getGrantSeoAliasConfig(entry.grantSlug), locale, "paymentDisplayName") ?? entry.grantName;
}

export function getPaymentGrantSeoTitle(
  entry: PaymentEntryLike,
  paymentMonthLabel: string,
  paymentDateText?: string | null,
  locale: Locale = "en",
) {
  const metadataName = getLocalizedAliasValue(getGrantSeoAliasConfig(entry.grantSlug), locale, "metadataName") ?? entry.grantName;

  if (entry.grantSlug === "social-relief") {
    if (locale === "xh") return `Imihla yokuhlawula ye-SASSA SRD ka-${paymentMonthLabel}`;
    if (locale === "tn") return `Malatsi a tefo a SASSA SRD a ${paymentMonthLabel}`;
    if (locale === "zu") return `Izinsuku zokukhokhwa kwe-SASSA SRD ngo-${paymentMonthLabel}`;
    return `SASSA SRD Payment Dates for ${paymentMonthLabel}`;
  }

  if (paymentDateText) {
    if (locale === "xh") {
      const dateType = entry.grantSlug === "social-relief" ? "ifestile" : "umhla";
      return `SASSA ${metadataName} ${dateType} yokuhlawula ka-${paymentMonthLabel}: ${paymentDateText}`;
    }

    if (locale === "tn") {
      const dateType = entry.grantSlug === "social-relief" ? "nako" : "letsatsi";
      return `SASSA ${metadataName} ${dateType} ya tefo ya ${paymentMonthLabel}: ${paymentDateText}`;
    }

    if (entry.grantSlug === "children") {
      return `SASSA Child Grant Date for ${paymentMonthLabel}: ${paymentDateText}`;
    }

    const dateType = entry.grantSlug === "social-relief" ? "Window" : "Date";
    return `SASSA ${metadataName} Payment ${dateType} for ${paymentMonthLabel}: ${paymentDateText} (Confirmed)`;
  }

  if (locale === "xh") {
    return `Imihla yokuhlawula ye-SASSA ${metadataName} ka-${paymentMonthLabel}`;
  }

  if (locale === "tn") {
    return `Malatsi a tefo a SASSA ${metadataName} a ${paymentMonthLabel}`;
  }

  return `SASSA ${metadataName} Payment Dates for ${paymentMonthLabel} (Expected Schedule)`;
}

export function getPaymentGrantSeoDescription(
  entry: PaymentEntryLike,
  paymentMonthLabel: string,
  paymentDateText?: string | null,
  locale: Locale = "en",
) {
  const metadataName = getLocalizedAliasValue(getGrantSeoAliasConfig(entry.grantSlug), locale, "metadataName") ?? entry.grantName;

  if (entry.grantSlug === "social-relief") {
    if (locale === "xh") return `Jonga usuku lwakho lokuhlawulwa kwe-SRD ka-${paymentMonthLabel} kwiwebhusayithi esemthethweni ye-SASSA. Imihla iyahluka ngomfaki-sicelo.`;
    if (locale === "tn") return `Tlhola letsatsi la gago la tefo ya SRD la ${paymentMonthLabel} mo webosaeteng ya semmuso ya SASSA. Malatsi a farologana go ya ka mokopi.`;
    if (locale === "zu") return `Hlola usuku lwakho lokukhokhwa kwe-SRD ngo-${paymentMonthLabel} kuwebhusayithi esemthethweni ye-SASSA. Izinsuku ziyahluka ngomfakisicelo.`;
    return `SRD payment dates for ${paymentMonthLabel} vary by applicant. Check your own payment date on the official SASSA SRD portal.`;
  }

  if (paymentDateText) {
    if (locale === "xh") {
      return `Jonga umhla wokuhlawula we-SASSA ${metadataName} ka-${paymentMonthLabel}: ${paymentDateText}. Bona ishedyuli epheleleyo, imali yesibonelelo, nento onokuyenza xa intlawulo ilibazisekile.`;
    }

    if (locale === "tn") {
      return `Tlhola letsatsi la tefo la SASSA ${metadataName} la ${paymentMonthLabel}: ${paymentDateText}. Bona lenaneo lotlhe, madi a thuso, le se o ka se dirang fa tefo e diega.`;
    }

    if (entry.grantSlug === "children") {
      return `The SASSA child grant payment date for ${paymentMonthLabel} is ${paymentDateText}. This covers child support, foster child, and care dependency grant payments.`;
    }

    return `Looking for the official SASSA ${metadataName.toLowerCase()} payment date for ${paymentMonthLabel}? The payout date is confirmed as ${paymentDateText}. View the full payment schedule, check baseline grant amounts, and learn what to do if your grant is delayed.`;
  }

  if (locale === "xh") {
    return `Jonga imihla yokuhlawula elindelekileyo ye-SASSA ${metadataName} ka-${paymentMonthLabel}. Bona ikhalenda, iintsingiselo zesimo, nendlela yokulungisa iintlawulo ezingekhoyo.`;
  }

  if (locale === "tn") {
    return `Tlhola malatsi a tefo a a solofetsweng a SASSA ${metadataName} a ${paymentMonthLabel}. Bona khalendara, bokao jwa maemo, le kafa o ka rarabololang ditefo tse di sa bonaleng.`;
  }

  if (entry.grantSlug === "children") {
    return `Check expected SASSA child grant payment dates for ${paymentMonthLabel}. View the estimated payout calendar, see status meanings, and learn how to resolve missing payments.`;
  }

  return `Check expected SASSA ${metadataName.toLowerCase()} payment dates for ${paymentMonthLabel}. View the estimated payout calendar, see status meanings, and learn how to resolve missing payments.`;
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
