import { notFound } from "next/navigation";

import {
  deleteMonetizationBlockAction,
  upsertMonetizationBlockAction,
} from "@/actions/admin";
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

export default async function AdminPlacementsPage({
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
      <Section eyebrow="Admin" title="Placements">
        <Card>
          <p className="text-sm text-muted">Database not configured.</p>
        </Card>
      </Section>
    );
  }

  const [blocks, grantTypes, guides] = await Promise.all([
    db.monetizationBlock.findMany({
      include: {
        grantType: true,
        guide: true,
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    db.grantType.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    }),
    db.guideArticle.findMany({
      orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
    }),
  ]);

  const selectedBlock = blocks.find((block) => block.id === resolvedSearchParams.edit) ?? null;

  return (
    <div className="space-y-8">
      <Section eyebrow="Admin" title="Placements">
        <div className="space-y-4">
          {resolvedSearchParams.message ? <StatusMessage>{resolvedSearchParams.message}</StatusMessage> : null}
          {resolvedSearchParams.error ? (
            <StatusMessage tone="error">{resolvedSearchParams.error}</StatusMessage>
          ) : null}
        </div>
      </Section>

      <Section title={selectedBlock ? "Edit placement" : "New placement"}>
        <Card className="space-y-5">
          <form action={upsertMonetizationBlockAction} className="space-y-5">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="id" value={selectedBlock?.id ?? ""} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Slug">
                <Input name="slug" defaultValue={selectedBlock?.slug ?? ""} required />
              </Field>
              <Field label="Title">
                <Input name="title" defaultValue={selectedBlock?.title ?? ""} required />
              </Field>
              <Field label="Link">
                <Input name="href" defaultValue={selectedBlock?.href ?? ""} required />
              </Field>
              <Field label="CTA label">
                <Input name="ctaLabel" defaultValue={selectedBlock?.ctaLabel ?? "Open"} required />
              </Field>
              <Field label="Disclosure">
                <Input
                  name="disclosureLabel"
                  defaultValue={selectedBlock?.disclosureLabel ?? "Sponsored"}
                  required
                />
              </Field>
              <Field label="Placement">
                <Select name="placement" defaultValue={selectedBlock?.placement ?? "payment_dates"}>
                  <option value="payment_dates">Payment dates</option>
                  <option value="guide_inline">Guide inline</option>
                  <option value="dashboard_helpful">Dashboard helpful</option>
                </Select>
              </Field>
              <Field label="Grant target">
                <Select name="grantTypeId" defaultValue={selectedBlock?.grantTypeId ?? ""}>
                  <option value="">All grants</option>
                  {grantTypes.map((grant) => (
                    <option key={grant.id} value={grant.id}>
                      {grant.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Guide target">
                <Select name="guideId" defaultValue={selectedBlock?.guideId ?? ""}>
                  <option value="">All guides</option>
                  {guides.map((guide) => (
                    <option key={guide.id} value={guide.id}>
                      {guide.title}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Sort order">
                <Input name="sortOrder" type="number" min="0" defaultValue={selectedBlock?.sortOrder ?? 0} required />
              </Field>
              <Field label="Status">
                <Select name="status" defaultValue={selectedBlock?.status ?? "draft"}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </Select>
              </Field>
              <Field label="Starts at">
                <Input
                  name="startsAt"
                  type="datetime-local"
                  defaultValue={selectedBlock?.startsAt?.toISOString().slice(0, 16) ?? ""}
                />
              </Field>
              <Field label="Ends at">
                <Input
                  name="endsAt"
                  type="datetime-local"
                  defaultValue={selectedBlock?.endsAt?.toISOString().slice(0, 16) ?? ""}
                />
              </Field>
            </div>
            <Field label="Body">
              <Textarea name="body" defaultValue={selectedBlock?.body ?? ""} required />
            </Field>
            <div className="space-y-4 rounded-3xl border border-border bg-surface-muted p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">Translations</p>
              {LOCALES.filter((entry) => entry.code !== "en").map((entry) => (
                <div key={entry.code} className="grid gap-4 sm:grid-cols-2">
                  <Field label={`Title (${entry.label})`}>
                    <Input
                      name={`translation_title_${entry.code}`}
                      defaultValue={getTranslationText(selectedBlock?.translations, entry.code as Locale, "title")}
                    />
                  </Field>
                  <Field label={`Body (${entry.label})`}>
                    <Textarea
                      name={`translation_body_${entry.code}`}
                      defaultValue={getTranslationText(selectedBlock?.translations, entry.code as Locale, "body")}
                    />
                  </Field>
                  <Field label={`CTA (${entry.label})`}>
                    <Input
                      name={`translation_ctaLabel_${entry.code}`}
                      defaultValue={getTranslationText(selectedBlock?.translations, entry.code as Locale, "ctaLabel")}
                    />
                  </Field>
                  <Field label={`Disclosure (${entry.label})`}>
                    <Input
                      name={`translation_disclosureLabel_${entry.code}`}
                      defaultValue={getTranslationText(
                        selectedBlock?.translations,
                        entry.code as Locale,
                        "disclosureLabel",
                      )}
                    />
                  </Field>
                </div>
              ))}
            </div>
            <SubmitButton pendingLabel="Saving">Save placement</SubmitButton>
          </form>
        </Card>
      </Section>

      <Section title="All placements">
        <div className="grid gap-4">
          {blocks.map((block) => (
            <Card key={block.id} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{block.title}</h3>
                <p className="text-sm text-muted">
                  {block.placement} · {block.status}
                  {block.publishedAt ? ` · ${block.publishedAt.toISOString().slice(0, 10)}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`?edit=${block.id}`}
                  className="focus-ring tap-target inline-flex items-center rounded-full border border-border bg-surface px-4 text-sm font-semibold"
                >
                  Edit
                </a>
                <form action={deleteMonetizationBlockAction}>
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="id" value={block.id} />
                  <ConfirmSubmitButton confirmText="Delete this placement?">
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
