import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { REMINDER_EMAIL_COPY } from "../src/emails/reminder-email";
import {
  FALLBACK_FAQS,
  FALLBACK_GRANT_TYPES,
  FALLBACK_GUIDES,
  FALLBACK_MONETIZATION_BLOCKS,
  FALLBACK_NEWS_ARTICLES,
  FALLBACK_NOTICES,
  FALLBACK_PAYMENT_PERIODS,
  FALLBACK_STATUS_MEANINGS,
  type LocalizedFields,
} from "../src/lib/fallback-content";
import { COPY } from "../src/lib/copy";
import { DEFAULT_LOCALE, getPublicLocales, isLocale, type Locale } from "../src/lib/site";

function getTargetLocale(): Locale {
  const localeArg = process.argv.find((arg) => arg.startsWith("--locale="))?.split("=")[1];
  const target = localeArg ?? process.env.TARGET_LOCALE ?? "zu";

  if (!isLocale(target)) {
    throw new Error(`Unsupported audit locale: ${target}`);
  }

  return target;
}

const TARGET_LOCALE = getTargetLocale();
const MAX_STATIC_FINDINGS = 80;

type Issue = {
  area: string;
  message: string;
};

type TranslationFieldKey = keyof NonNullable<LocalizedFields[Locale]>;

const issues: Issue[] = [];

function addIssue(area: string, message: string) {
  issues.push({ area, message });
}

function hasText(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function getLocaleFields(translations: LocalizedFields | undefined) {
  return translations?.[TARGET_LOCALE] ?? {};
}

function assertStringField(
  area: string,
  translations: LocalizedFields | undefined,
  key: TranslationFieldKey,
) {
  if (!hasText(getLocaleFields(translations)[key])) {
    addIssue(area, `Missing ${TARGET_LOCALE}.${key}`);
  }
}

function assertStringArrayField(
  area: string,
  translations: LocalizedFields | undefined,
  key: TranslationFieldKey,
  expectedLength: number,
) {
  const value = getLocaleFields(translations)[key];

  if (!Array.isArray(value) || value.length !== expectedLength || value.some((item) => !hasText(item))) {
    addIssue(area, `Missing complete ${TARGET_LOCALE}.${key} array (${expectedLength} item/s)`);
  }
}

function assertSectionsField(
  area: string,
  translations: LocalizedFields | undefined,
  expectedLength: number,
) {
  const sections = getLocaleFields(translations).sections;

  if (!Array.isArray(sections) || sections.length !== expectedLength) {
    addIssue(area, `Missing complete ${TARGET_LOCALE}.sections array (${expectedLength} section/s)`);
    return;
  }

  sections.forEach((section, index) => {
    if (!hasText(section?.title) || !hasText(section?.body)) {
      addIssue(area, `Missing ${TARGET_LOCALE}.sections[${index}] title/body`);
    }
  });
}

function assertSameKeys(area: string, source: Record<string, unknown>, target: Record<string, unknown> | undefined) {
  const targetRecord = target ?? {};
  const sourceKeys = Object.keys(source).sort();
  const targetKeys = Object.keys(targetRecord).sort();

  for (const key of sourceKeys) {
    if (!hasText(targetRecord[key])) {
      addIssue(area, `Missing ${TARGET_LOCALE}.${key}`);
    }
  }

  for (const key of targetKeys) {
    if (!sourceKeys.includes(key)) {
      addIssue(area, `Unexpected ${TARGET_LOCALE}.${key}`);
    }
  }
}

function auditPublicLocaleGate() {
  const publicLocales = getPublicLocales().map((locale) => locale.code);

  if (!publicLocales.includes(DEFAULT_LOCALE) || !publicLocales.includes(TARGET_LOCALE)) {
    addIssue(
      "public locale gate",
      `Expected ${DEFAULT_LOCALE} and ${TARGET_LOCALE} to be public but found ${publicLocales.join(", ")}`,
    );
  }
}

function auditCodeCopy() {
  assertSameKeys("src/lib/copy.ts", COPY.en, COPY[TARGET_LOCALE]);
  assertSameKeys("src/emails/reminder-email.tsx", REMINDER_EMAIL_COPY.en, REMINDER_EMAIL_COPY[TARGET_LOCALE]);
}

function auditFallbackContent() {
  for (const grant of FALLBACK_GRANT_TYPES) {
    const area = `grant:${grant.slug}`;
    assertStringField(area, grant.translations, "name");
    if (grant.shortName) {
      assertStringField(area, grant.translations, "shortName");
    }
    assertStringField(area, grant.translations, "summary");
    assertStringArrayField(area, grant.translations, "checks", grant.checks.length);
    assertStringArrayField(area, grant.translations, "documents", grant.documents.length);
  }

  for (const status of FALLBACK_STATUS_MEANINGS) {
    const area = `status:${status.slug}`;
    assertStringField(area, status.translations, "title");
    assertStringField(area, status.translations, "meaning");
    assertStringArrayField(area, status.translations, "causes", status.causes.length);
    assertStringArrayField(area, status.translations, "fixes", status.fixes.length);
    assertStringArrayField(area, status.translations, "nextSteps", status.nextSteps.length);
  }

  for (const guide of FALLBACK_GUIDES) {
    const area = `guide:${guide.slug}`;
    assertStringField(area, guide.translations, "title");
    assertStringField(area, guide.translations, "summary");
    assertSectionsField(area, guide.translations, guide.sections.length);
  }

  for (const article of FALLBACK_NEWS_ARTICLES) {
    const area = `news:${article.slug}`;
    assertStringField(area, article.translations, "title");
    assertStringField(area, article.translations, "summary");
    assertSectionsField(area, article.translations, article.sections.length);
  }

  for (const faq of FALLBACK_FAQS) {
    const area = `faq:${faq.id}`;
    assertStringField(area, faq.translations, "question");
    assertStringField(area, faq.translations, "answer");
  }

  for (const notice of FALLBACK_NOTICES) {
    const area = `notice:${notice.slug}`;
    assertStringField(area, notice.translations, "title");
    assertStringField(area, notice.translations, "body");
  }

  for (const block of FALLBACK_MONETIZATION_BLOCKS) {
    const area = `monetization:${block.slug}`;
    assertStringField(area, block.translations, "title");
    assertStringField(area, block.translations, "body");
  }

  for (const period of FALLBACK_PAYMENT_PERIODS) {
    for (const entry of period.entries) {
      const area = `payment:${period.year}-${period.monthSlug}:${entry.grantSlug}`;
      assertStringField(area, entry.translations, "note");
    }
  }
}

async function walkFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".next") {
          return [];
        }
        return walkFiles(entryPath);
      }

      return /\.(ts|tsx)$/.test(entry.name) ? [entryPath] : [];
    }),
  );

  return files.flat();
}

function isStaticCopyCandidate(line: string) {
  const trimmed = line.trim();

  if (
    trimmed.startsWith("import ") ||
    trimmed.startsWith("export ") ||
    trimmed.startsWith("function ") ||
    trimmed.startsWith("async function ") ||
    trimmed.startsWith("className=") ||
    trimmed.includes("className=\"") ||
    trimmed.includes("href=\"") ||
    trimmed.includes("src=\"") ||
    trimmed.includes("type=\"") ||
    trimmed.includes("name=\"") ||
    trimmed.includes("data-") ||
    trimmed.includes("aria-") ||
    trimmed.includes("http") ||
    trimmed.includes("@/") ||
    trimmed.includes("node:") ||
    trimmed.includes('alt="GrantCare"')
  ) {
    return false;
  }

  if (/\b[a-zA-Z]*Copy\(locale,\s*["'`][^"'`]+["'`]\)/.test(trimmed)) {
    return false;
  }

  if (/\bt\(locale,\s*["'`][^"'`]+["'`]\)/.test(trimmed)) {
    return false;
  }

  const literalPropPattern =
    /\b(?:title|eyebrow|label|pendingLabel|confirmText|placeholder|alt)=["'`](?=[A-Z0-9])[^"'`]*[A-Za-z][^"'`]*["'`]/;
  const jsxTextPattern = />\s*(?=[A-Z0-9])[^<{}`]*[A-Za-z][^<{}]*\s*</;

  return literalPropPattern.test(trimmed) || jsxTextPattern.test(trimmed);
}

async function auditStaticCopyCandidates() {
  const roots = [
    "src/app/[locale]",
    "src/components",
    "src/actions",
    "src/lib",
    "src/emails",
  ];
  const findings: string[] = [];

  for (const root of roots) {
    const files = await walkFiles(path.resolve(process.cwd(), root));

    for (const file of files) {
      const relativePath = path.relative(process.cwd(), file);

      if (
        relativePath === "src/lib/copy.ts" ||
        relativePath === "src/emails/reminder-email.tsx" ||
        relativePath === "src/lib/fallback-content.ts"
      ) {
        continue;
      }

      const lines = (await readFile(file, "utf8")).split("\n");
      lines.forEach((line, index) => {
        if (isStaticCopyCandidate(line)) {
          findings.push(`${relativePath}:${index + 1}: ${line.trim()}`);
        }
      });
    }
  }

  if (findings.length > 0) {
    addIssue(
      "static copy scan",
      `Found ${findings.length} hard-coded string candidate/s outside translation data. First ${Math.min(
        findings.length,
        MAX_STATIC_FINDINGS,
      )}:\n${findings.slice(0, MAX_STATIC_FINDINGS).join("\n")}`,
    );
  }
}

async function main() {
  auditPublicLocaleGate();
  auditCodeCopy();
  auditFallbackContent();
  await auditStaticCopyCandidates();

  if (issues.length > 0) {
    console.error(`${TARGET_LOCALE} translation audit failed with ${issues.length} issue group/s.`);

    for (const issue of issues) {
      console.error(`\n[${issue.area}]\n${issue.message}`);
    }

    process.exit(1);
  }

  console.log(`${TARGET_LOCALE} translation audit passed.`);
}

void main();
