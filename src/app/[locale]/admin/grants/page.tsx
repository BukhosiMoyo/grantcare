import { notFound } from "next/navigation";

import { deleteGrantTypeAction, upsertGrantTypeAction } from "@/actions/admin";
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
import { stringifyLineList } from "@/lib/form-utils";
import { db } from "@/lib/prisma";
import { LOCALES, isLocale, type Locale } from "@/lib/site";
import { isDatabaseConfigured } from "@/lib/server-env";
import { getTranslationLines, getTranslationText } from "@/lib/translation-utils";

export default async function AdminGrantsPage({
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
      <Section eyebrow="Admin" title="Grant types">
        <Card>
          <p className="text-sm text-muted">Database not configured.</p>
        </Card>
      </Section>
    );
  }

  const grants = await db.grantType.findMany({
    include: {
      paymentGroup: true,
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  const selectedGrant =
    grants.find((grant) => grant.id === resolvedSearchParams.edit) ?? null;

  return (
    <div className="space-y-8">
      <Section eyebrow="Admin" title="Grant types">
        <div className="space-y-4">
          {resolvedSearchParams.message ? (
            <StatusMessage>{resolvedSearchParams.message}</StatusMessage>
          ) : null}
          {resolvedSearchParams.error ? (
            <StatusMessage tone="error">{resolvedSearchParams.error}</StatusMessage>
          ) : null}
        </div>
      </Section>

      <Section title={selectedGrant ? "Edit grant" : "New grant"}>
        <Card className="space-y-5">
          <form action={upsertGrantTypeAction} className="space-y-5">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="id" value={selectedGrant?.id ?? ""} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Slug">
                <Input name="slug" defaultValue={selectedGrant?.slug ?? ""} required />
              </Field>
              <Field label="Name">
                <Input name="name" defaultValue={selectedGrant?.name ?? ""} required />
              </Field>
              <Field label="Short name">
                <Input name="shortName" defaultValue={selectedGrant?.shortName ?? ""} />
              </Field>
              <Field label="Official link">
                <Input name="officialHref" defaultValue={selectedGrant?.officialHref ?? ""} required />
              </Field>
              <Field label="Sort order">
                <Input name="sortOrder" type="number" min="0" defaultValue={selectedGrant?.sortOrder ?? 0} required />
              </Field>
              <Field label="Status">
                <Select name="status" defaultValue={selectedGrant?.status ?? "draft"}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </Select>
              </Field>
              <Field label="Payment group">
                <Select name="paymentGroupId" defaultValue={selectedGrant?.paymentGroupId ?? ""}>
                  <option value="">None</option>
                  {grants
                    .filter((grant) => grant.showInPaymentTool && grant.id !== selectedGrant?.id)
                    .map((grant) => (
                      <option key={grant.id} value={grant.id}>
                        {grant.name}
                      </option>
                    ))}
                </Select>
              </Field>
            </div>
            <Field label="Summary">
              <Textarea name="summary" defaultValue={selectedGrant?.summary ?? ""} required />
            </Field>
            <Field label="Checks">
              <Textarea
                name="checks"
                defaultValue={stringifyLineList(
                  Array.isArray(selectedGrant?.checks) ? (selectedGrant?.checks as string[]) : [],
                )}
              />
            </Field>
            <Field label="Documents">
              <Textarea
                name="documents"
                defaultValue={stringifyLineList(
                  Array.isArray(selectedGrant?.documents)
                    ? (selectedGrant?.documents as string[])
                    : [],
                )}
              />
            </Field>
            <div className="grid gap-3">
              <CheckboxRow
                name="showInPaymentTool"
                label="Show in payment tool"
                defaultChecked={selectedGrant?.showInPaymentTool ?? false}
              />
              <CheckboxRow
                name="showInGrantLibrary"
                label="Show in grant library"
                defaultChecked={selectedGrant?.showInGrantLibrary ?? true}
              />
            </div>
            <div className="space-y-4 rounded-3xl border border-border bg-surface-muted p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">Translations</p>
              {LOCALES.filter((entry) => entry.code !== "en").map((entry) => (
                <div key={entry.code} className="grid gap-4 sm:grid-cols-2">
                  <Field label={`Name (${entry.label})`}>
                    <Input
                      name={`translation_name_${entry.code}`}
                      defaultValue={getTranslationText(selectedGrant?.translations, entry.code as Locale, "name")}
                    />
                  </Field>
                  <Field label={`Summary (${entry.label})`}>
                    <Textarea
                      name={`translation_summary_${entry.code}`}
                      defaultValue={getTranslationText(selectedGrant?.translations, entry.code as Locale, "summary")}
                    />
                  </Field>
                  <Field label={`Checks (${entry.label})`}>
                    <Textarea
                      name={`translation_checks_${entry.code}`}
                      defaultValue={getTranslationLines(selectedGrant?.translations, entry.code as Locale, "checks")}
                    />
                  </Field>
                  <Field label={`Documents (${entry.label})`}>
                    <Textarea
                      name={`translation_documents_${entry.code}`}
                      defaultValue={getTranslationLines(selectedGrant?.translations, entry.code as Locale, "documents")}
                    />
                  </Field>
                </div>
              ))}
            </div>
            <SubmitButton pendingLabel="Saving">Save grant</SubmitButton>
          </form>
        </Card>
      </Section>

      <Section title="All grant types">
        <div className="grid gap-4">
          {grants.map((grant) => (
            <Card key={grant.id} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{grant.name}</h3>
                <p className="text-sm text-muted">
                  {grant.slug} · {grant.status}
                  {grant.publishedAt ? ` · ${grant.publishedAt.toISOString().slice(0, 10)}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`?edit=${grant.id}`}
                  className="focus-ring tap-target inline-flex items-center rounded-full border border-border bg-surface px-4 text-sm font-semibold"
                >
                  Edit
                </a>
                <form action={deleteGrantTypeAction}>
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="id" value={grant.id} />
                  <ConfirmSubmitButton confirmText="Delete this grant type?">
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
