import type { Locale } from "@/lib/site";

function getLocaleEntry(translations: unknown, locale: Locale) {
  if (!translations || typeof translations !== "object" || Array.isArray(translations)) {
    return {};
  }

  const value = (translations as Record<string, unknown>)[locale];
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

export function getTranslationText(
  translations: unknown,
  locale: Locale,
  field: string,
) {
  const value = getLocaleEntry(translations, locale)[field];
  return typeof value === "string" ? value : "";
}

export function getTranslationLines(
  translations: unknown,
  locale: Locale,
  field: string,
) {
  const value = getLocaleEntry(translations, locale)[field];
  if (!Array.isArray(value)) {
    return "";
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .join("\n");
}
