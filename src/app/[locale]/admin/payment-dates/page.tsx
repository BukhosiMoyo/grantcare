import { notFound } from "next/navigation";

import {
  deletePaymentDateAction,
  upsertPaymentDateAction,
} from "@/actions/admin";
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
import { db } from "@/lib/prisma";
import { LOCALES, isLocale, type Locale } from "@/lib/site";
import { isDatabaseConfigured } from "@/lib/server-env";
import { getTranslationText } from "@/lib/translation-utils";

export default async function AdminPaymentDatesPage({
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
      <Section eyebrow="Admin" title="Payment dates">
        <Card>
          <p className="text-sm text-muted">Database not configured.</p>
        </Card>
      </Section>
    );
  }

  const [entries, grantTypes] = await Promise.all([
    db.paymentDateEntry.findMany({
      include: {
        period: true,
        grantType: true,
      },
      orderBy: [{ period: { year: "desc" } }, { period: { month: "desc" } }],
    }),
    db.grantType.findMany({
      where: { showInPaymentTool: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    }),
  ]);

  const selectedEntry =
    entries.find((entry) => entry.id === resolvedSearchParams.edit) ?? null;

  return (
    <div className="space-y-8">
      <Section eyebrow="Admin" title="Payment dates">
        <div className="space-y-4">
          {resolvedSearchParams.message ? (
            <StatusMessage>{resolvedSearchParams.message}</StatusMessage>
          ) : null}
          {resolvedSearchParams.error ? (
            <StatusMessage tone="error">{resolvedSearchParams.error}</StatusMessage>
          ) : null}
        </div>
      </Section>

      <Section title={selectedEntry ? "Edit payment date" : "New payment date"}>
        <Card className="space-y-5">
          <form action={upsertPaymentDateAction} className="space-y-5">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="entryId" value={selectedEntry?.id ?? ""} />
            <input type="hidden" name="periodId" value={selectedEntry?.periodId ?? ""} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Year">
                <Input
                  name="year"
                  type="number"
                  min="2024"
                  defaultValue={selectedEntry?.period.year ?? new Date().getFullYear()}
                  required
                />
              </Field>
              <Field label="Month">
                <Input
                  name="month"
                  type="number"
                  min="1"
                  max="12"
                  defaultValue={selectedEntry?.period.month ?? new Date().getMonth() + 1}
                  required
                />
              </Field>
              <Field label="Grant type">
                <Select name="grantTypeId" defaultValue={selectedEntry?.grantTypeId ?? ""}>
                  <option value="">Select a grant type</option>
                  {grantTypes.map((grant) => (
                    <option key={grant.id} value={grant.id}>
                      {grant.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="State">
                <Select name="state" defaultValue={selectedEntry?.state ?? "pending"}>
                  <option value="expected">Expected</option>
                  <option value="pending">Pending</option>
                  <option value="portal_only">Portal only</option>
                </Select>
              </Field>
              <Field label="Payment date">
                <Input
                  name="paymentDate"
                  type="date"
                  defaultValue={selectedEntry?.paymentDate?.toISOString().slice(0, 10) ?? ""}
                />
              </Field>
            </div>
            <Field label="Note">
              <Textarea name="note" defaultValue={selectedEntry?.note ?? ""} />
            </Field>
            <CheckboxRow
              name="published"
              label="Published"
              defaultChecked={selectedEntry?.published ?? false}
            />
            <div className="space-y-4 rounded-3xl border border-border bg-surface-muted p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">Translated note</p>
              {LOCALES.filter((entry) => entry.code !== "en").map((entry) => (
                <Field key={entry.code} label={`Note (${entry.label})`}>
                  <Textarea
                    name={`translation_note_${entry.code}`}
                    defaultValue={getTranslationText(selectedEntry?.translations, entry.code as Locale, "note")}
                  />
                </Field>
              ))}
            </div>
            <SubmitButton pendingLabel="Saving">Save payment date</SubmitButton>
          </form>
        </Card>
      </Section>

      <Section title="All payment dates">
        <div className="grid gap-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">
                  {entry.grantType.name} · {entry.period.month}/{entry.period.year}
                </h3>
                <p className="text-sm text-muted">
                  {entry.paymentDate ? entry.paymentDate.toISOString().slice(0, 10) : "No date"} · {entry.state} · {entry.published ? "Published" : "Draft"}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`?edit=${entry.id}`}
                  className="focus-ring tap-target inline-flex items-center rounded-full border border-border bg-surface px-4 text-sm font-semibold"
                >
                  Edit
                </a>
                <form action={deletePaymentDateAction}>
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="id" value={entry.id} />
                  <ConfirmSubmitButton confirmText="Delete this payment date?">
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
