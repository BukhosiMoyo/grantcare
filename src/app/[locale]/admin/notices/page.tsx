import { notFound } from "next/navigation";

import { deleteNoticeAction, upsertNoticeAction } from "@/actions/admin";
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

export default async function AdminNoticesPage({
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
      <Section eyebrow="Admin" title="Notices">
        <Card>
          <p className="text-sm text-muted">Database not configured.</p>
        </Card>
      </Section>
    );
  }

  const notices = await db.notice.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  const selectedNotice =
    notices.find((notice) => notice.id === resolvedSearchParams.edit) ?? null;

  return (
    <div className="space-y-8">
      <Section eyebrow="Admin" title="Notices">
        <div className="space-y-4">
          {resolvedSearchParams.message ? (
            <StatusMessage>{resolvedSearchParams.message}</StatusMessage>
          ) : null}
          {resolvedSearchParams.error ? (
            <StatusMessage tone="error">{resolvedSearchParams.error}</StatusMessage>
          ) : null}
        </div>
      </Section>

      <Section title={selectedNotice ? "Edit notice" : "New notice"}>
        <Card className="space-y-5">
          <form action={upsertNoticeAction} className="space-y-5">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="id" value={selectedNotice?.id ?? ""} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Slug">
                <Input name="slug" defaultValue={selectedNotice?.slug ?? ""} required />
              </Field>
              <Field label="Title">
                <Input name="title" defaultValue={selectedNotice?.title ?? ""} required />
              </Field>
              <Field label="Link">
                <Input name="href" defaultValue={selectedNotice?.href ?? ""} />
              </Field>
              <Field label="Tone">
                <Input name="tone" defaultValue={selectedNotice?.tone ?? "notice"} required />
              </Field>
              <Field label="Sort order">
                <Input name="sortOrder" type="number" min="0" defaultValue={selectedNotice?.sortOrder ?? 0} required />
              </Field>
              <Field label="Status">
                <Select name="status" defaultValue={selectedNotice?.status ?? "draft"}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </Select>
              </Field>
              <Field label="Starts at">
                <Input
                  name="startsAt"
                  type="datetime-local"
                  defaultValue={selectedNotice?.startsAt?.toISOString().slice(0, 16) ?? ""}
                />
              </Field>
              <Field label="Ends at">
                <Input
                  name="endsAt"
                  type="datetime-local"
                  defaultValue={selectedNotice?.endsAt?.toISOString().slice(0, 16) ?? ""}
                />
              </Field>
            </div>
            <Field label="Body">
              <Textarea name="body" defaultValue={selectedNotice?.body ?? ""} required />
            </Field>
            <div className="space-y-4 rounded-3xl border border-border bg-surface-muted p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">Translations</p>
              {LOCALES.filter((entry) => entry.code !== "en").map((entry) => (
                <div key={entry.code} className="grid gap-4 sm:grid-cols-2">
                  <Field label={`Title (${entry.label})`}>
                    <Input
                      name={`translation_title_${entry.code}`}
                      defaultValue={getTranslationText(selectedNotice?.translations, entry.code as Locale, "title")}
                    />
                  </Field>
                  <Field label={`Body (${entry.label})`}>
                    <Textarea
                      name={`translation_body_${entry.code}`}
                      defaultValue={getTranslationText(selectedNotice?.translations, entry.code as Locale, "body")}
                    />
                  </Field>
                </div>
              ))}
            </div>
            <SubmitButton pendingLabel="Saving">Save notice</SubmitButton>
          </form>
        </Card>
      </Section>

      <Section title="All notices">
        <div className="grid gap-4">
          {notices.map((notice) => (
            <Card key={notice.id} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{notice.title}</h3>
                <p className="text-sm text-muted">
                  {notice.slug} · {notice.status}
                  {notice.publishedAt ? ` · ${notice.publishedAt.toISOString().slice(0, 10)}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`?edit=${notice.id}`}
                  className="focus-ring tap-target inline-flex items-center rounded-full border border-border bg-surface px-4 text-sm font-semibold"
                >
                  Edit
                </a>
                <form action={deleteNoticeAction}>
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="id" value={notice.id} />
                  <ConfirmSubmitButton confirmText="Delete this notice?">
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
