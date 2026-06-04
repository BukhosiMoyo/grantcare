import { notFound } from "next/navigation";
import { Prisma } from "@prisma/client";

import { deleteNewsArticleAction, upsertNewsArticleAction } from "@/actions/admin";
import { ConfirmSubmitButton } from "@/components/confirm-submit-button";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CheckboxRow,
  Field,
  Input,
  Section,
  Select,
  StatusMessage,
  Textarea,
} from "@/components/ui";
import { stringifySectionsInput } from "@/lib/form-utils";
import { db } from "@/lib/prisma";
import { LOCALES, isLocale, type Locale } from "@/lib/site";
import { isDatabaseConfigured } from "@/lib/server-env";
import { getTranslationText } from "@/lib/translation-utils";

const ZU_NEWS_COPY: Record<string, string> = {
  News: "Izindaba",
  "Database not configured.": "Idathabheyisi ayilungisiwe.",
  "News article saved.": "Udaba lwezindaba lulondoloziwe.",
  "News article deleted.": "Udaba lwezindaba lususiwe.",
  "Check the news form and try again.": "Hlola ifomu lezindaba bese uzama futhi.",
  "Edit news article": "Hlela udaba lwezindaba",
  "New news article": "Udaba lwezindaba olusha",
  Slug: "I-slug",
  Title: "Isihloko",
  "Sort order": "Ukuhlelwa",
  Status: "Isimo",
  Draft: "Okusalungiswa",
  Published: "Kushicilelwe",
  draft: "okusalungiswa",
  published: "kushicilelwe",
  Summary: "Isifinyezo",
  Sections: "Izigaba",
  "Source URLs": "Ama-URL emithombo",
  Featured: "Okugqanyisiwe",
  Translations: "Ukuhumusha",
  Saving: "Kuyalondolozwa",
  "Save news article": "Londoloza udaba lwezindaba",
  "All news articles": "Zonke izindaba",
  Edit: "Hlela",
  "Delete this news article?": "Susa lolu daba lwezindaba?",
  Delete: "Susa",
};

function newsCopy(locale: Locale, text: string) {
  return locale === "zu" ? (ZU_NEWS_COPY[text] ?? text) : text;
}

function isMissingNewsArticleTableError(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2021" &&
    String(error.meta?.table ?? "").includes("NewsArticle")
  );
}

export default async function AdminNewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ edit?: string; message?: string; error?: string }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  if (!isLocale(locale)) {
    notFound();
  }

  if (!isDatabaseConfigured()) {
    return (
      <Section eyebrow="Admin" title={newsCopy(locale, "News")}>
        <Card>
          <p className="text-sm text-muted">{newsCopy(locale, "Database not configured.")}</p>
        </Card>
      </Section>
    );
  }

  const articles = await db.newsArticle.findMany({
    orderBy: [{ publishedAt: "desc" }, { sortOrder: "asc" }, { title: "asc" }],
  }).catch((error) => {
    if (isMissingNewsArticleTableError(error)) {
      return [];
    }

    throw error;
  });

  const selectedArticle =
    articles.find((article) => article.id === resolvedSearchParams.edit) ?? null;

  return (
    <div className="space-y-8">
      <Section eyebrow="Admin" title={newsCopy(locale, "News")}>
        <div className="space-y-4">
          {resolvedSearchParams.message ? (
            <StatusMessage>{newsCopy(locale, resolvedSearchParams.message)}</StatusMessage>
          ) : null}
          {resolvedSearchParams.error ? (
            <StatusMessage tone="error">{newsCopy(locale, resolvedSearchParams.error)}</StatusMessage>
          ) : null}
        </div>
      </Section>

      <Section title={newsCopy(locale, selectedArticle ? "Edit news article" : "New news article")}>
        <Card className="space-y-5">
          <form action={upsertNewsArticleAction} className="space-y-5">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="id" value={selectedArticle?.id ?? ""} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={newsCopy(locale, "Slug")}>
                <Input name="slug" defaultValue={selectedArticle?.slug ?? ""} required />
              </Field>
              <Field label={newsCopy(locale, "Title")}>
                <Input name="title" defaultValue={selectedArticle?.title ?? ""} required />
              </Field>
              <Field label={newsCopy(locale, "Sort order")}>
                <Input name="sortOrder" type="number" min="0" defaultValue={selectedArticle?.sortOrder ?? 0} required />
              </Field>
              <Field label={newsCopy(locale, "Status")}>
                <Select name="status" defaultValue={selectedArticle?.status ?? "draft"}>
                  <option value="draft">{newsCopy(locale, "Draft")}</option>
                  <option value="published">{newsCopy(locale, "Published")}</option>
                </Select>
              </Field>
            </div>
            <Field label={newsCopy(locale, "Summary")}>
              <Textarea name="summary" defaultValue={selectedArticle?.summary ?? ""} required />
            </Field>
            <Field label={newsCopy(locale, "Sections")}>
              <Textarea
                name="sections"
                defaultValue={stringifySectionsInput(
                  Array.isArray(selectedArticle?.sections)
                    ? (selectedArticle?.sections as Array<{ title: string; body: string }>)
                    : [],
                )}
              />
            </Field>
            <Field label={newsCopy(locale, "Source URLs")}>
              <Textarea
                name="sourceUrls"
                defaultValue={
                  Array.isArray(selectedArticle?.sourceUrls)
                    ? (selectedArticle?.sourceUrls as string[]).join("\n")
                    : ""
                }
              />
            </Field>
            <div className="grid gap-3">
              <CheckboxRow name="featured" label={newsCopy(locale, "Featured")} defaultChecked={selectedArticle?.featured ?? false} />
            </div>
            <div className="space-y-4 rounded-3xl border border-border bg-surface-muted p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{newsCopy(locale, "Translations")}</p>
              {LOCALES.filter((entry) => entry.code !== "en").map((entry) => (
                <div key={entry.code} className="grid gap-4 sm:grid-cols-2">
                  <Field label={`${newsCopy(locale, "Title")} (${entry.label})`}>
                    <Input
                      name={`translation_title_${entry.code}`}
                      defaultValue={getTranslationText(selectedArticle?.translations, entry.code as Locale, "title")}
                    />
                  </Field>
                  <Field label={`${newsCopy(locale, "Summary")} (${entry.label})`}>
                    <Textarea
                      name={`translation_summary_${entry.code}`}
                      defaultValue={getTranslationText(selectedArticle?.translations, entry.code as Locale, "summary")}
                    />
                  </Field>
                </div>
              ))}
            </div>
            <SubmitButton pendingLabel={newsCopy(locale, "Saving")}>{newsCopy(locale, "Save news article")}</SubmitButton>
          </form>
        </Card>
      </Section>

      <Section title={newsCopy(locale, "All news articles")}>
        <div className="grid gap-4">
          {articles.map((article) => (
            <Card key={article.id} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{article.title}</h3>
                <p className="text-sm text-muted">
                  {article.slug} · {newsCopy(locale, article.status)}
                  {article.publishedAt ? ` · ${article.publishedAt.toISOString().slice(0, 10)}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`?edit=${article.id}`}
                  className="focus-ring tap-target inline-flex items-center rounded-full border border-border bg-surface px-4 text-sm font-semibold"
                >
                  {newsCopy(locale, "Edit")}
                </a>
                <form action={deleteNewsArticleAction}>
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="id" value={article.id} />
                  <ConfirmSubmitButton confirmText={newsCopy(locale, "Delete this news article?")}>
                    {newsCopy(locale, "Delete")}
                  </ConfirmSubmitButton>
                </form>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
