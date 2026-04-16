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
      <Section eyebrow="Admin" title="News">
        <Card>
          <p className="text-sm text-muted">Database not configured.</p>
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
      <Section eyebrow="Admin" title="News">
        <div className="space-y-4">
          {resolvedSearchParams.message ? (
            <StatusMessage>{resolvedSearchParams.message}</StatusMessage>
          ) : null}
          {resolvedSearchParams.error ? (
            <StatusMessage tone="error">{resolvedSearchParams.error}</StatusMessage>
          ) : null}
        </div>
      </Section>

      <Section title={selectedArticle ? "Edit news article" : "New news article"}>
        <Card className="space-y-5">
          <form action={upsertNewsArticleAction} className="space-y-5">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="id" value={selectedArticle?.id ?? ""} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Slug">
                <Input name="slug" defaultValue={selectedArticle?.slug ?? ""} required />
              </Field>
              <Field label="Title">
                <Input name="title" defaultValue={selectedArticle?.title ?? ""} required />
              </Field>
              <Field label="Sort order">
                <Input name="sortOrder" type="number" min="0" defaultValue={selectedArticle?.sortOrder ?? 0} required />
              </Field>
              <Field label="Status">
                <Select name="status" defaultValue={selectedArticle?.status ?? "draft"}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </Select>
              </Field>
            </div>
            <Field label="Summary">
              <Textarea name="summary" defaultValue={selectedArticle?.summary ?? ""} required />
            </Field>
            <Field label="Sections">
              <Textarea
                name="sections"
                defaultValue={stringifySectionsInput(
                  Array.isArray(selectedArticle?.sections)
                    ? (selectedArticle?.sections as Array<{ title: string; body: string }>)
                    : [],
                )}
              />
            </Field>
            <Field label="Source URLs">
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
              <CheckboxRow name="featured" label="Featured" defaultChecked={selectedArticle?.featured ?? false} />
            </div>
            <div className="space-y-4 rounded-3xl border border-border bg-surface-muted p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">Translations</p>
              {LOCALES.filter((entry) => entry.code !== "en").map((entry) => (
                <div key={entry.code} className="grid gap-4 sm:grid-cols-2">
                  <Field label={`Title (${entry.label})`}>
                    <Input
                      name={`translation_title_${entry.code}`}
                      defaultValue={getTranslationText(selectedArticle?.translations, entry.code as Locale, "title")}
                    />
                  </Field>
                  <Field label={`Summary (${entry.label})`}>
                    <Textarea
                      name={`translation_summary_${entry.code}`}
                      defaultValue={getTranslationText(selectedArticle?.translations, entry.code as Locale, "summary")}
                    />
                  </Field>
                </div>
              ))}
            </div>
            <SubmitButton pendingLabel="Saving">Save news article</SubmitButton>
          </form>
        </Card>
      </Section>

      <Section title="All news articles">
        <div className="grid gap-4">
          {articles.map((article) => (
            <Card key={article.id} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{article.title}</h3>
                <p className="text-sm text-muted">
                  {article.slug} · {article.status}
                  {article.publishedAt ? ` · ${article.publishedAt.toISOString().slice(0, 10)}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`?edit=${article.id}`}
                  className="focus-ring tap-target inline-flex items-center rounded-full border border-border bg-surface px-4 text-sm font-semibold"
                >
                  Edit
                </a>
                <form action={deleteNewsArticleAction}>
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="id" value={article.id} />
                  <ConfirmSubmitButton confirmText="Delete this news article?">
                    Delete
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
