import { FALLBACK_GUIDES } from "./fallback-content";
import { CORRECTED_LINKS } from "./guide-links";

import { redirectRules, explicitGuideRedirects, getDuplicateGuideRedirectPath } from "./guide-redirects";
export { getDuplicateGuideRedirectPath } from "./guide-redirects";
const DEFAULT_LOCALE_PATTERN = "en";
const NON_DEFAULT_LOCALE_PATTERN = "zu|xh|af|nso|tn";

function withDefaultLocaleSource(source: string) {
  return `/:locale(${DEFAULT_LOCALE_PATTERN})${source}`;
}

function withNonDefaultLocaleSource(source: string) {
  return `/:locale(${NON_DEFAULT_LOCALE_PATTERN})${source}`;
}

export function getSeoRedirects() {
  const dynamicRedirects = redirectRules.flatMap(({ source, destination }) => [
    {
      source,
      destination,
      permanent: true,
    },
    {
      source: withDefaultLocaleSource(source),
      destination,
      permanent: true,
    },
    {
      source: withNonDefaultLocaleSource(source),
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
        source: withDefaultLocaleSource(`/guides/${slug}`),
        destination,
        permanent: true,
      },
      {
        source: withNonDefaultLocaleSource(`/guides/${slug}`),
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
        source: withDefaultLocaleSource(`/guides/${guide.slug}`),
        destination,
        permanent: true,
      },
      {
        source: withNonDefaultLocaleSource(`/guides/${guide.slug}`),
        destination: `/:locale${destination}`,
        permanent: true,
      },
    ];
  });

  return [
    ...Object.entries(CORRECTED_LINKS).flatMap(([source, destination]) => [
      { source, destination, permanent: true },
      { source: withDefaultLocaleSource(source), destination, permanent: true },
      { source: withNonDefaultLocaleSource(source), destination: `/:locale${destination}`, permanent: true },
    ]),
    ...["", "/:locale(en)", "/:locale(zu|xh|tn)"].map(prefix => ({
      source: `${prefix}/news/sassa-confirms-2026-2027-payment-schedule-and-increases`,
      destination: `${prefix.includes("zu|") ? "/:locale" : ""}/news/sassa-payment-schedule-2026-2027`,
      permanent: true,
    })),
    ...dynamicRedirects,
    ...explicitRedirects,
    ...duplicateRedirects,
    {
      source: "/en",
      destination: "/",
      permanent: true,
    },
    {
      source: "/en/:path*",
      destination: "/:path*",
      permanent: true,
    },
  ];
}
