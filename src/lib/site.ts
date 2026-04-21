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
// Keep locale-aware content in place, but expose only the default locale publicly for now.
export const PUBLIC_LOCALE_PREFIX_ENABLED = false;

export function isLocale(value: string | undefined | null): value is Locale {
  return LOCALES.some((locale) => locale.code === value);
}

export function getPublicLocales() {
  return PUBLIC_LOCALE_PREFIX_ENABLED
    ? LOCALES
    : LOCALES.filter((locale) => locale.code === DEFAULT_LOCALE);
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
  if (PUBLIC_LOCALE_PREFIX_ENABLED) {
    return getInternalLocalePath(locale, pathname);
  }

  return stripLocaleFromPathname(pathname);
}
