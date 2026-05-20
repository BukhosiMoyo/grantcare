import { FALLBACK_GUIDES } from "./fallback-content";

const MONTH_SLUG_PATTERN =
  "january|february|march|april|may|june|july|august|september|october|november|december";
const PAYMENT_YEAR_PATTERN = "2025|2026|2027";
const LOCALE_PATTERN = "en|zu|xh|af|nso|tn";

const redirectRules = [
  {
    source: `/guides/payment-dates-:month(${MONTH_SLUG_PATTERN})-:year(${PAYMENT_YEAR_PATTERN})`,
    destination: "/payment-dates/:year/:month",
  },
  {
    source: `/guides/srd-payment-dates-:month(${MONTH_SLUG_PATTERN})-:year(${PAYMENT_YEAR_PATTERN})`,
    destination: "/payment-dates/:year/:month/social-relief",
  },
  {
    source: `/guides/child-support-grant-payment-dates-:month(${MONTH_SLUG_PATTERN})-:year(${PAYMENT_YEAR_PATTERN})`,
    destination: "/payment-dates/:year/:month/children",
  },
  {
    source: `/guides/older-persons-grant-payment-dates-:month(${MONTH_SLUG_PATTERN})-:year(${PAYMENT_YEAR_PATTERN})`,
    destination: "/payment-dates/:year/:month/older-persons",
  },
  {
    source: `/guides/disability-grant-payment-dates-:month(${MONTH_SLUG_PATTERN})-:year(${PAYMENT_YEAR_PATTERN})`,
    destination: "/payment-dates/:year/:month/disability",
  },
] as const;

const explicitGuideRedirects = {
  "sassa-old-age-grant-pay-date": "/payment-dates",
  "sassa-payment-date-for-old-age": "/payment-dates",
  "sassa-350-payment-date": "/payment-dates",
  "sassa-r370-payment-dates": "/payment-dates",
  "sassa-payment-dates-r350": "/payment-dates",
  "sassa-payment-dates-2025-r350": "/payment-dates",
  "sassa-srd-grant-payment-dates": "/payment-dates",
  "sassa-status-check-for-r350-payment-date": "/guides/how-to-use-sassa-status-check-for-r350",
  "sassa-status-check-for-r350-payment-dates": "/guides/how-to-use-sassa-status-check-for-r350",
  "sassa-status-check-for-r350-payment-dates-2024": "/guides/how-to-use-sassa-status-check-for-r350",
  "sassa-status-check-for-r350-payment-dates-2025": "/guides/how-to-use-sassa-status-check-for-r350",
  "sassa-status-check-for-r350-payment-dates-july": "/guides/how-to-use-sassa-status-check-for-r350",
  "sassa-status-check-for-r350-pay-day": "/guides/how-to-use-sassa-status-check-for-r350",
  "sassa-status-check-for-r350-payments": "/guides/how-to-use-sassa-status-check-for-r350",
} as const;

const duplicateGuideRedirectMatchers = [
  {
    pattern: new RegExp(`^payment-dates-(${MONTH_SLUG_PATTERN})-(${PAYMENT_YEAR_PATTERN})$`),
    toDestination: (match: RegExpMatchArray) => `/payment-dates/${match[2]}/${match[1]}`,
  },
  {
    pattern: new RegExp(`^srd-payment-dates-(${MONTH_SLUG_PATTERN})-(${PAYMENT_YEAR_PATTERN})$`),
    toDestination: (match: RegExpMatchArray) =>
      `/payment-dates/${match[2]}/${match[1]}/social-relief`,
  },
  {
    pattern: new RegExp(
      `^child-support-grant-payment-dates-(${MONTH_SLUG_PATTERN})-(${PAYMENT_YEAR_PATTERN})$`,
    ),
    toDestination: (match: RegExpMatchArray) => `/payment-dates/${match[2]}/${match[1]}/children`,
  },
  {
    pattern: new RegExp(
      `^older-persons-grant-payment-dates-(${MONTH_SLUG_PATTERN})-(${PAYMENT_YEAR_PATTERN})$`,
    ),
    toDestination: (match: RegExpMatchArray) =>
      `/payment-dates/${match[2]}/${match[1]}/older-persons`,
  },
  {
    pattern: new RegExp(
      `^disability-grant-payment-dates-(${MONTH_SLUG_PATTERN})-(${PAYMENT_YEAR_PATTERN})$`,
    ),
    toDestination: (match: RegExpMatchArray) =>
      `/payment-dates/${match[2]}/${match[1]}/disability`,
  },
] as const;

function withLocaleSource(source: string) {
  return `/:locale(${LOCALE_PATTERN})${source}`;
}

export function getDuplicateGuideRedirectPath(slug: string) {
  if (slug in explicitGuideRedirects) {
    return explicitGuideRedirects[slug as keyof typeof explicitGuideRedirects];
  }

  for (const matcher of duplicateGuideRedirectMatchers) {
    const match = slug.match(matcher.pattern);

    if (match) {
      return matcher.toDestination(match);
    }
  }

  return null;
}

export function getSeoRedirects() {
  const dynamicRedirects = redirectRules.flatMap(({ source, destination }) => [
    {
      source,
      destination,
      permanent: true,
    },
    {
      source: withLocaleSource(source),
      destination: `/:locale${destination}`,
      permanent: true,
    },
  ]);

  const explicitRedirects = Object.entries(explicitGuideRedirects).flatMap(
    ([slug, destination]) => [
      {
        source: `/guides/${slug}`,
        destination,
        permanent: true,
      },
      {
        source: withLocaleSource(`/guides/${slug}`),
        destination: `/:locale${destination}`,
        permanent: true,
      },
    ],
  );

  const duplicateRedirects = FALLBACK_GUIDES.flatMap((guide) => {
    const destination = getDuplicateGuideRedirectPath(guide.slug);
    if (!destination) {
      return [];
    }

    return [
      {
        source: `/guides/${guide.slug}`,
        destination,
        permanent: true,
      },
      {
        source: withLocaleSource(`/guides/${guide.slug}`),
        destination: `/:locale${destination}`,
        permanent: true,
      },
    ];
  });

  return [...dynamicRedirects, ...explicitRedirects, ...duplicateRedirects];
}
