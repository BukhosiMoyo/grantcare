import rejectedText from "./rejected-generated-translations.json";
import { getPublicLocales, type Locale } from "./site";

type Article = { title: string; summary: string; sections: Array<{ title: string; body: string }> };

// Exact paragraphs produced by the former keyword-based translator for three or
// more different source paragraphs. Retain this check for existing CMS records.
export function hasArticleTranslation(source: Article, translations: Record<string, unknown>, locale: Locale) {
  if (locale === "en") return true;
  const translated = translations[locale] as Partial<Article> | undefined;
  if (!translated?.title || !translated.summary || !translated.sections?.length) return false;
  if (translated.sections.length !== source.sections.length) return false;
  const rejected = rejectedText[locale as keyof typeof rejectedText] ?? [];
  if (translated.sections.some(section => !section.body || rejected.includes(section.body))) return false;
  return translated.title !== source.title && translated.sections.some((section, i) => section.body !== source.sections[i]?.body);
}

export function localizeArticle<T extends Article>(source: T, translations: Record<string, unknown>, locale: Locale) {
  const indexableLocales = getPublicLocales().map(l => l.code).filter(l => hasArticleTranslation(source, translations, l));
  const contentLocale = indexableLocales.includes(locale) ? locale : "en";
  const translated = contentLocale === "en" ? {} : translations[contentLocale] as Article;
  return { ...source, ...translated, contentLocale, indexableLocales };
}
