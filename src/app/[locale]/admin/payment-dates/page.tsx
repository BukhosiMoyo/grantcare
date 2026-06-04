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

const ZU_PAYMENT_COPY: Record<string, string> = {
  "Payment dates": "Izinsuku zokukhokha",
  "Database not configured.": "Idathabheyisi ayilungisiwe.",
  "Payment date saved.": "Usuku lokukhokha lulondoloziwe.",
  "Payment date deleted.": "Usuku lokukhokha lususiwe.",
  "Check the payment date form and try again.": "Hlola ifomu losuku lokukhokha bese uzama futhi.",
  "Payment entry not found.": "Okufakiwe kosuku lokukhokha akutholakalanga.",
  "Edit payment date": "Hlela usuku lokukhokha",
  "New payment date": "Usuku lokukhokha olusha",
  Year: "Unyaka",
  Month: "Inyanga",
  "Grant type": "Uhlobo lwesibonelelo",
  "Select a grant type": "Khetha uhlobo lwesibonelelo",
  State: "Isimo",
  Expected: "Kulindelwe",
  Pending: "Kusalindile",
  "Portal only": "Kuphothali kuphela",
  expected: "kulindelwe",
  pending: "kusalindile",
  portal_only: "kuphothali kuphela",
  "Payment date": "Usuku lokukhokha",
  Note: "Inothi",
  Published: "Kushicilelwe",
  Draft: "Okusalungiswa",
  "Translated note": "Inothi elihunyushiwe",
  Saving: "Kuyalondolozwa",
  "Save payment date": "Londoloza usuku lokukhokha",
  "All payment dates": "Zonke izinsuku zokukhokha",
  "No date": "Alukho usuku",
  Edit: "Hlela",
  "Delete this payment date?": "Susa lolu suku lokukhokha?",
  Delete: "Susa",
};

function paymentCopy(locale: Locale, text: string) {
  return locale === "zu" ? (ZU_PAYMENT_COPY[text] ?? text) : text;
}

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
      <Section eyebrow="Admin" title={paymentCopy(locale, "Payment dates")}>
        <Card>
          <p className="text-sm text-muted">{paymentCopy(locale, "Database not configured.")}</p>
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
      <Section eyebrow="Admin" title={paymentCopy(locale, "Payment dates")}>
        <div className="space-y-4">
          {resolvedSearchParams.message ? (
            <StatusMessage>{paymentCopy(locale, resolvedSearchParams.message)}</StatusMessage>
          ) : null}
          {resolvedSearchParams.error ? (
            <StatusMessage tone="error">{paymentCopy(locale, resolvedSearchParams.error)}</StatusMessage>
          ) : null}
        </div>
      </Section>

      <Section title={paymentCopy(locale, selectedEntry ? "Edit payment date" : "New payment date")}>
        <Card className="space-y-5">
          <form action={upsertPaymentDateAction} className="space-y-5">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="entryId" value={selectedEntry?.id ?? ""} />
            <input type="hidden" name="periodId" value={selectedEntry?.periodId ?? ""} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={paymentCopy(locale, "Year")}>
                <Input
                  name="year"
                  type="number"
                  min="2024"
                  defaultValue={selectedEntry?.period.year ?? new Date().getFullYear()}
                  required
                />
              </Field>
              <Field label={paymentCopy(locale, "Month")}>
                <Input
                  name="month"
                  type="number"
                  min="1"
                  max="12"
                  defaultValue={selectedEntry?.period.month ?? new Date().getMonth() + 1}
                  required
                />
              </Field>
              <Field label={paymentCopy(locale, "Grant type")}>
                <Select name="grantTypeId" defaultValue={selectedEntry?.grantTypeId ?? ""}>
                  <option value="">{paymentCopy(locale, "Select a grant type")}</option>
                  {grantTypes.map((grant) => (
                    <option key={grant.id} value={grant.id}>
                      {grant.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label={paymentCopy(locale, "State")}>
                <Select name="state" defaultValue={selectedEntry?.state ?? "pending"}>
                  <option value="expected">{paymentCopy(locale, "Expected")}</option>
                  <option value="pending">{paymentCopy(locale, "Pending")}</option>
                  <option value="portal_only">{paymentCopy(locale, "Portal only")}</option>
                </Select>
              </Field>
              <Field label={paymentCopy(locale, "Payment date")}>
                <Input
                  name="paymentDate"
                  type="date"
                  defaultValue={selectedEntry?.paymentDate?.toISOString().slice(0, 10) ?? ""}
                />
              </Field>
            </div>
            <Field label={paymentCopy(locale, "Note")}>
              <Textarea name="note" defaultValue={selectedEntry?.note ?? ""} />
            </Field>
            <CheckboxRow
              name="published"
              label={paymentCopy(locale, "Published")}
              defaultChecked={selectedEntry?.published ?? false}
            />
            <div className="space-y-4 rounded-3xl border border-border bg-surface-muted p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{paymentCopy(locale, "Translated note")}</p>
              {LOCALES.filter((entry) => entry.code !== "en").map((entry) => (
                <Field key={entry.code} label={`${paymentCopy(locale, "Note")} (${entry.label})`}>
                  <Textarea
                    name={`translation_note_${entry.code}`}
                    defaultValue={getTranslationText(selectedEntry?.translations, entry.code as Locale, "note")}
                  />
                </Field>
              ))}
            </div>
            <SubmitButton pendingLabel={paymentCopy(locale, "Saving")}>{paymentCopy(locale, "Save payment date")}</SubmitButton>
          </form>
        </Card>
      </Section>

      <Section title={paymentCopy(locale, "All payment dates")}>
        <div className="grid gap-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">
                  {entry.grantType.name} · {entry.period.month}/{entry.period.year}
                </h3>
                <p className="text-sm text-muted">
                  {entry.paymentDate ? entry.paymentDate.toISOString().slice(0, 10) : paymentCopy(locale, "No date")} · {paymentCopy(locale, entry.state)} · {paymentCopy(locale, entry.published ? "Published" : "Draft")}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`?edit=${entry.id}`}
                  className="focus-ring tap-target inline-flex items-center rounded-full border border-border bg-surface px-4 text-sm font-semibold"
                >
                  {paymentCopy(locale, "Edit")}
                </a>
                <form action={deletePaymentDateAction}>
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="id" value={entry.id} />
                  <ConfirmSubmitButton confirmText={paymentCopy(locale, "Delete this payment date?")}>
                    {paymentCopy(locale, "Delete")}
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
