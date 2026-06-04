export const SUPPORT_EMAIL = "hello@symaxx.com";
export const SUPPORT_MAILTO = `mailto:${SUPPORT_EMAIL}`;

export const LOCALE_COOKIE_NAME = "grantcare-locale";
export const LEGACY_LOCALE_COOKIE_NAME = "grantease-locale";

export const LOCALES = [
  { code: "en", label: "English" },
  { code: "zu", label: "isiZulu" },
  { code: "xh", label: "isiXhosa" },
  { code: "af", label: "Afrikaans" },
  { code: "nso", label: "Sepedi" },
  { code: "tn", label: "Setswana" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];

export const DEFAULT_LOCALE: Locale = "en";
export const PUBLIC_LOCALE_CODES = ["en", "zu", "xh", "tn"] as const satisfies readonly Locale[];

export function isLocale(value: string | undefined | null): value is Locale {
  return LOCALES.some((locale) => locale.code === value);
}

export function getPublicLocales() {
  return LOCALES.filter((locale) => (PUBLIC_LOCALE_CODES as readonly Locale[]).includes(locale.code));
}

export function isPublicLocale(value: string | undefined | null): value is Locale {
  return getPublicLocales().some((locale) => locale.code === value);
}

export function getLocaleLabel(locale: Locale) {
  return LOCALES.find((entry) => entry.code === locale)?.label ?? "English";
}

export function stripLocaleFromPathname(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return "/";
  }

  if (isLocale(segments[0])) {
    return `/${segments.slice(1).join("/")}` || "/";
  }

  return pathname;
}

export function getInternalLocalePath(locale: Locale, pathname = "/") {
  const cleanPath = stripLocaleFromPathname(pathname);
  return cleanPath === "/" ? `/${locale}` : `/${locale}${cleanPath}`;
}

export function buildLocalePath(locale: Locale, pathname = "/") {
  if (locale !== DEFAULT_LOCALE && isPublicLocale(locale)) {
    return getInternalLocalePath(locale, pathname);
  }

  return stripLocaleFromPathname(pathname);
}
