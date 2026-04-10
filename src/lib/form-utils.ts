import type { LocalizedFields } from "@/lib/fallback-content";
import { LOCALES } from "@/lib/site";

export function getRequiredString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function getOptionalString(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function getBoolean(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

export function getNumber(formData: FormData, key: string) {
  const rawValue = getRequiredString(formData, key);
  if (!rawValue) {
    return Number.NaN;
  }

  return Number(rawValue);
}

export function parseLineList(value: string | null) {
  if (!value) {
    return [];
  }

  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function stringifyLineList(value: string[] | null | undefined) {
  return value?.join("\n") ?? "";
}

export function parseSectionsInput(value: string | null) {
  if (!value) {
    return [];
  }

  return value
    .split("\n")
    .map((line) => {
      const [title, ...bodyParts] = line.split("|");
      const cleanTitle = title?.trim() ?? "";
      const cleanBody = bodyParts.join("|").trim();

      if (!cleanTitle || !cleanBody) {
        return null;
      }

      return {
        title: cleanTitle,
        body: cleanBody,
      };
    })
    .filter((item): item is { title: string; body: string } => Boolean(item));
}

export function stringifySectionsInput(
  value: Array<{ title: string; body: string }> | null | undefined,
) {
  return value?.map((item) => `${item.title} | ${item.body}`).join("\n") ?? "";
}

export function parseLocalizedFields(
  formData: FormData,
  fieldNames: string[],
): LocalizedFields | null {
  const translations: Record<string, Record<string, unknown>> = {};

  for (const locale of LOCALES) {
    if (locale.code === "en") {
      continue;
    }

    for (const fieldName of fieldNames) {
      const value = getOptionalString(formData, `translation_${fieldName}_${locale.code}`);
      if (!value) {
        continue;
      }

      const localeTranslations = (translations[locale.code] ??= {});
      localeTranslations[fieldName] = value;
    }
  }

  return Object.keys(translations).length > 0 ? (translations as LocalizedFields) : null;
}

export function parseLocalizedListFields(
  formData: FormData,
  fieldNames: string[],
): LocalizedFields | null {
  const translations: Record<string, Record<string, unknown>> = {};

  for (const locale of LOCALES) {
    if (locale.code === "en") {
      continue;
    }

    for (const fieldName of fieldNames) {
      const value = parseLineList(getOptionalString(formData, `translation_${fieldName}_${locale.code}`));
      if (value.length === 0) {
        continue;
      }

      const localeTranslations = (translations[locale.code] ??= {});
      localeTranslations[fieldName] = value;
    }
  }

  return Object.keys(translations).length > 0 ? (translations as LocalizedFields) : null;
}
