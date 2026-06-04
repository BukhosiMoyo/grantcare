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

const ZU_GRANTS_COPY: Record<string, string> = {
  "Grant types": "Izinhlobo zezibonelelo",
  "Database not configured.": "Idathabheyisi ayilungisiwe.",
  "Grant saved.": "Isibonelelo silondoloziwe.",
  "Grant deleted.": "Isibonelelo sisusiwe.",
  "Check the grant form and try again.": "Hlola ifomu lesibonelelo bese uzama futhi.",
  "Slug already exists.": "I-slug isivele ikhona.",
  "Grant not found.": "Isibonelelo asitholakalanga.",
  "Edit grant": "Hlela isibonelelo",
  "New grant": "Isibonelelo esisha",
  Slug: "I-slug",
  Name: "Igama",
  "Short name": "Igama elifushane",
  "Official link": "Isixhumanisi esisemthethweni",
  "Sort order": "Ukuhlelwa",
  Status: "Isimo",
  Draft: "Okusalungiswa",
  Published: "Kushicilelwe",
  draft: "okusalungiswa",
  published: "kushicilelwe",
  "Payment group": "Iqembu lokukhokha",
  None: "Akukho",
  Summary: "Isifinyezo",
  Checks: "Ukuhlola",
  Documents: "Amadokhumenti",
  "Show in payment tool": "Bonisa ethuluzini lokukhokha",
  "Show in grant library": "Bonisa emtatsheni wezibonelelo",
  Translations: "Ukuhumusha",
  Saving: "Kuyalondolozwa",
  "Save grant": "Londoloza isibonelelo",
  "All grant types": "Zonke izinhlobo zezibonelelo",
  Edit: "Hlela",
  "Delete this grant type?": "Susa lolu hlobo lwesibonelelo?",
  Delete: "Susa",
};

function grantCopy(locale: Locale, text: string) {
  return locale === "zu" ? (ZU_GRANTS_COPY[text] ?? text) : text;
}

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
      <Section eyebrow="Admin" title={grantCopy(locale, "Grant types")}>
        <Card>
          <p className="text-sm text-muted">{grantCopy(locale, "Database not configured.")}</p>
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
      <Section eyebrow="Admin" title={grantCopy(locale, "Grant types")}>
        <div className="space-y-4">
          {resolvedSearchParams.message ? (
            <StatusMessage>{grantCopy(locale, resolvedSearchParams.message)}</StatusMessage>
          ) : null}
          {resolvedSearchParams.error ? (
            <StatusMessage tone="error">{grantCopy(locale, resolvedSearchParams.error)}</StatusMessage>
          ) : null}
        </div>
      </Section>

      <Section title={grantCopy(locale, selectedGrant ? "Edit grant" : "New grant")}>
        <Card className="space-y-5">
          <form action={upsertGrantTypeAction} className="space-y-5">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="id" value={selectedGrant?.id ?? ""} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={grantCopy(locale, "Slug")}>
                <Input name="slug" defaultValue={selectedGrant?.slug ?? ""} required />
              </Field>
              <Field label={grantCopy(locale, "Name")}>
                <Input name="name" defaultValue={selectedGrant?.name ?? ""} required />
              </Field>
              <Field label={grantCopy(locale, "Short name")}>
                <Input name="shortName" defaultValue={selectedGrant?.shortName ?? ""} />
              </Field>
              <Field label={grantCopy(locale, "Official link")}>
                <Input name="officialHref" defaultValue={selectedGrant?.officialHref ?? ""} required />
              </Field>
              <Field label={grantCopy(locale, "Sort order")}>
                <Input name="sortOrder" type="number" min="0" defaultValue={selectedGrant?.sortOrder ?? 0} required />
              </Field>
              <Field label={grantCopy(locale, "Status")}>
                <Select name="status" defaultValue={selectedGrant?.status ?? "draft"}>
                  <option value="draft">{grantCopy(locale, "Draft")}</option>
                  <option value="published">{grantCopy(locale, "Published")}</option>
                </Select>
              </Field>
              <Field label={grantCopy(locale, "Payment group")}>
                <Select name="paymentGroupId" defaultValue={selectedGrant?.paymentGroupId ?? ""}>
                  <option value="">{grantCopy(locale, "None")}</option>
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
            <Field label={grantCopy(locale, "Summary")}>
              <Textarea name="summary" defaultValue={selectedGrant?.summary ?? ""} required />
            </Field>
            <Field label={grantCopy(locale, "Checks")}>
              <Textarea
                name="checks"
                defaultValue={stringifyLineList(
                  Array.isArray(selectedGrant?.checks) ? (selectedGrant?.checks as string[]) : [],
                )}
              />
            </Field>
            <Field label={grantCopy(locale, "Documents")}>
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
                label={grantCopy(locale, "Show in payment tool")}
                defaultChecked={selectedGrant?.showInPaymentTool ?? false}
              />
              <CheckboxRow
                name="showInGrantLibrary"
                label={grantCopy(locale, "Show in grant library")}
                defaultChecked={selectedGrant?.showInGrantLibrary ?? true}
              />
            </div>
            <div className="space-y-4 rounded-3xl border border-border bg-surface-muted p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{grantCopy(locale, "Translations")}</p>
              {LOCALES.filter((entry) => entry.code !== "en").map((entry) => (
                <div key={entry.code} className="grid gap-4 sm:grid-cols-2">
                  <Field label={`${grantCopy(locale, "Name")} (${entry.label})`}>
                    <Input
                      name={`translation_name_${entry.code}`}
                      defaultValue={getTranslationText(selectedGrant?.translations, entry.code as Locale, "name")}
                    />
                  </Field>
                  <Field label={`${grantCopy(locale, "Summary")} (${entry.label})`}>
                    <Textarea
                      name={`translation_summary_${entry.code}`}
                      defaultValue={getTranslationText(selectedGrant?.translations, entry.code as Locale, "summary")}
                    />
                  </Field>
                  <Field label={`${grantCopy(locale, "Checks")} (${entry.label})`}>
                    <Textarea
                      name={`translation_checks_${entry.code}`}
                      defaultValue={getTranslationLines(selectedGrant?.translations, entry.code as Locale, "checks")}
                    />
                  </Field>
                  <Field label={`${grantCopy(locale, "Documents")} (${entry.label})`}>
                    <Textarea
                      name={`translation_documents_${entry.code}`}
                      defaultValue={getTranslationLines(selectedGrant?.translations, entry.code as Locale, "documents")}
                    />
                  </Field>
                </div>
              ))}
            </div>
            <SubmitButton pendingLabel={grantCopy(locale, "Saving")}>{grantCopy(locale, "Save grant")}</SubmitButton>
          </form>
        </Card>
      </Section>

      <Section title={grantCopy(locale, "All grant types")}>
        <div className="grid gap-4">
          {grants.map((grant) => (
            <Card key={grant.id} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{grant.name}</h3>
                <p className="text-sm text-muted">
                  {grant.slug} · {grantCopy(locale, grant.status)}
                  {grant.publishedAt ? ` · ${grant.publishedAt.toISOString().slice(0, 10)}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`?edit=${grant.id}`}
                  className="focus-ring tap-target inline-flex items-center rounded-full border border-border bg-surface px-4 text-sm font-semibold"
                >
                  {grantCopy(locale, "Edit")}
                </a>
                <form action={deleteGrantTypeAction}>
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="id" value={grant.id} />
                  <ConfirmSubmitButton confirmText={grantCopy(locale, "Delete this grant type?")}>
                    {grantCopy(locale, "Delete")}
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
