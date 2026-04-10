import { notFound } from "next/navigation";

import { deleteFaqAction, upsertFaqAction } from "@/actions/admin";
import { ConfirmSubmitButton } from "@/components/confirm-submit-button";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  Field,
  Input,
  Section,
  Select,
  StatusMessage,
  Textarea,
} from "@/components/ui";
import { db } from "@/lib/prisma";
import { LOCALES, isLocale, type Locale } from "@/lib/site";
import { isDatabaseConfigured } from "@/lib/server-env";
import { getTranslationText } from "@/lib/translation-utils";

export default async function AdminFaqsPage({
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
      <Section eyebrow="Admin" title="FAQ">
        <Card>
          <p className="text-sm text-muted">Database not configured.</p>
        </Card>
      </Section>
    );
  }

  const faqs = await db.faqEntry.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  const selectedFaq = faqs.find((faq) => faq.id === resolvedSearchParams.edit) ?? null;

  return (
    <div className="space-y-8">
      <Section eyebrow="Admin" title="FAQ">
        <div className="space-y-4">
          {resolvedSearchParams.message ? (
            <StatusMessage>{resolvedSearchParams.message}</StatusMessage>
          ) : null}
          {resolvedSearchParams.error ? (
            <StatusMessage tone="error">{resolvedSearchParams.error}</StatusMessage>
          ) : null}
        </div>
      </Section>

      <Section title={selectedFaq ? "Edit FAQ" : "New FAQ"}>
        <Card className="space-y-5">
          <form action={upsertFaqAction} className="space-y-5">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="id" value={selectedFaq?.id ?? ""} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Sort order">
                <Input name="sortOrder" type="number" min="0" defaultValue={selectedFaq?.sortOrder ?? 0} required />
              </Field>
              <Field label="Status">
                <Select name="status" defaultValue={selectedFaq?.status ?? "draft"}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </Select>
              </Field>
            </div>
            <Field label="Question">
              <Textarea name="question" defaultValue={selectedFaq?.question ?? ""} required />
            </Field>
            <Field label="Answer">
              <Textarea name="answer" defaultValue={selectedFaq?.answer ?? ""} required />
            </Field>
            <div className="space-y-4 rounded-3xl border border-border bg-surface-muted p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">Translations</p>
              {LOCALES.filter((entry) => entry.code !== "en").map((entry) => (
                <div key={entry.code} className="grid gap-4 sm:grid-cols-2">
                  <Field label={`Question (${entry.label})`}>
                    <Textarea
                      name={`translation_question_${entry.code}`}
                      defaultValue={getTranslationText(selectedFaq?.translations, entry.code as Locale, "question")}
                    />
                  </Field>
                  <Field label={`Answer (${entry.label})`}>
                    <Textarea
                      name={`translation_answer_${entry.code}`}
                      defaultValue={getTranslationText(selectedFaq?.translations, entry.code as Locale, "answer")}
                    />
                  </Field>
                </div>
              ))}
            </div>
            <SubmitButton pendingLabel="Saving">Save FAQ</SubmitButton>
          </form>
        </Card>
      </Section>

      <Section title="All FAQ entries">
        <div className="grid gap-4">
          {faqs.map((faq) => (
            <Card key={faq.id} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <p className="text-sm text-muted">
                  {faq.status}
                  {faq.publishedAt ? ` · ${faq.publishedAt.toISOString().slice(0, 10)}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`?edit=${faq.id}`}
                  className="focus-ring tap-target inline-flex items-center rounded-full border border-border bg-surface px-4 text-sm font-semibold"
                >
                  Edit
                </a>
                <form action={deleteFaqAction}>
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="id" value={faq.id} />
                  <ConfirmSubmitButton confirmText="Delete this FAQ entry?">
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
