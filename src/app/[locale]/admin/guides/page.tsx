import { notFound } from "next/navigation";

import { deleteGuideAction, upsertGuideAction } from "@/actions/admin";
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

export default async function AdminGuidesPage({
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
      <Section eyebrow="Admin" title="Guides">
        <Card>
          <p className="text-sm text-muted">Database not configured.</p>
        </Card>
      </Section>
    );
  }

  const guides = await db.guideArticle.findMany({
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
  });

  const selectedGuide =
    guides.find((guide) => guide.id === resolvedSearchParams.edit) ?? null;

  return (
    <div className="space-y-8">
      <Section eyebrow="Admin" title="Guides">
        <div className="space-y-4">
          {resolvedSearchParams.message ? (
            <StatusMessage>{resolvedSearchParams.message}</StatusMessage>
          ) : null}
          {resolvedSearchParams.error ? (
            <StatusMessage tone="error">{resolvedSearchParams.error}</StatusMessage>
          ) : null}
        </div>
      </Section>

      <Section title={selectedGuide ? "Edit guide" : "New guide"}>
        <Card className="space-y-5">
          <form action={upsertGuideAction} className="space-y-5">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="id" value={selectedGuide?.id ?? ""} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Slug">
                <Input name="slug" defaultValue={selectedGuide?.slug ?? ""} required />
              </Field>
              <Field label="Title">
                <Input name="title" defaultValue={selectedGuide?.title ?? ""} required />
              </Field>
              <Field label="Sort order">
                <Input name="sortOrder" type="number" min="0" defaultValue={selectedGuide?.sortOrder ?? 0} required />
              </Field>
              <Field label="Status">
                <Select name="status" defaultValue={selectedGuide?.status ?? "draft"}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </Select>
              </Field>
            </div>
            <Field label="Summary">
              <Textarea name="summary" defaultValue={selectedGuide?.summary ?? ""} required />
            </Field>
            <Field label="Sections">
              <Textarea
                name="sections"
                defaultValue={stringifySectionsInput(
                  Array.isArray(selectedGuide?.sections)
                    ? (selectedGuide?.sections as Array<{ title: string; body: string }>)
                    : [],
                )}
              />
            </Field>
            <div className="grid gap-3">
              <CheckboxRow name="featured" label="Featured" defaultChecked={selectedGuide?.featured ?? false} />
              <CheckboxRow name="sponsored" label="Sponsored" defaultChecked={selectedGuide?.sponsored ?? false} />
            </div>
            <div className="space-y-4 rounded-3xl border border-border bg-surface-muted p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">Translations</p>
              {LOCALES.filter((entry) => entry.code !== "en").map((entry) => (
                <div key={entry.code} className="grid gap-4 sm:grid-cols-2">
                  <Field label={`Title (${entry.label})`}>
                    <Input
                      name={`translation_title_${entry.code}`}
                      defaultValue={getTranslationText(selectedGuide?.translations, entry.code as Locale, "title")}
                    />
                  </Field>
                  <Field label={`Summary (${entry.label})`}>
                    <Textarea
                      name={`translation_summary_${entry.code}`}
                      defaultValue={getTranslationText(selectedGuide?.translations, entry.code as Locale, "summary")}
                    />
                  </Field>
                </div>
              ))}
            </div>
            <SubmitButton pendingLabel="Saving">Save guide</SubmitButton>
          </form>
        </Card>
      </Section>

      <Section title="All guides">
        <div className="grid gap-4">
          {guides.map((guide) => (
            <Card key={guide.id} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{guide.title}</h3>
                <p className="text-sm text-muted">
                  {guide.slug} · {guide.status}
                  {guide.publishedAt ? ` · ${guide.publishedAt.toISOString().slice(0, 10)}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`?edit=${guide.id}`}
                  className="focus-ring tap-target inline-flex items-center rounded-full border border-border bg-surface px-4 text-sm font-semibold"
                >
                  Edit
                </a>
                <form action={deleteGuideAction}>
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="id" value={guide.id} />
                  <ConfirmSubmitButton confirmText="Delete this guide?">
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
