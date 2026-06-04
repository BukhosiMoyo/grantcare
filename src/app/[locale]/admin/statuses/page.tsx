import { notFound } from "next/navigation";

import {
  deleteStatusMeaningAction,
  upsertStatusMeaningAction,
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
import { getTranslationLines, getTranslationText } from "@/lib/translation-utils";

const ZU_STATUSES_COPY: Record<string, string> = {
  Statuses: "Izimo",
  "Database not configured.": "Idathabheyisi ayilungisiwe.",
  "Status saved.": "Isimo silondoloziwe.",
  "Status deleted.": "Isimo sisusiwe.",
  "Check the status form and try again.": "Hlola ifomu lesimo bese uzama futhi.",
  "Edit status": "Hlela isimo",
  "New status": "Isimo esisha",
  Slug: "I-slug",
  Title: "Isihloko",
  "Official link": "Isixhumanisi esisemthethweni",
  "Sort order": "Ukuhlelwa",
  Status: "Isimo",
  Draft: "Okusalungiswa",
  Published: "Kushicilelwe",
  draft: "okusalungiswa",
  published: "kushicilelwe",
  Meaning: "Incazelo",
  "Possible causes": "Izimbangela ezingaba khona",
  "Common fixes": "Izixazululo ezivamile",
  "Next steps": "Izinyathelo ezilandelayo",
  Causes: "Izimbangela",
  Translations: "Ukuhumusha",
  Saving: "Kuyalondolozwa",
  "Save status": "Londoloza isimo",
  "All statuses": "Zonke izimo",
  Edit: "Hlela",
  "Delete this status?": "Susa lesi simo?",
  Delete: "Susa",
};

function statusCopy(locale: Locale, text: string) {
  return locale === "zu" ? (ZU_STATUSES_COPY[text] ?? text) : text;
}

export default async function AdminStatusesPage({
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
      <Section eyebrow="Admin" title={statusCopy(locale, "Statuses")}>
        <Card>
          <p className="text-sm text-muted">{statusCopy(locale, "Database not configured.")}</p>
        </Card>
      </Section>
    );
  }

  const statuses = await db.statusMeaning.findMany({
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
  });

  const selectedStatus =
    statuses.find((status) => status.id === resolvedSearchParams.edit) ?? null;

  return (
    <div className="space-y-8">
      <Section eyebrow="Admin" title={statusCopy(locale, "Statuses")}>
        <div className="space-y-4">
          {resolvedSearchParams.message ? (
            <StatusMessage>{statusCopy(locale, resolvedSearchParams.message)}</StatusMessage>
          ) : null}
          {resolvedSearchParams.error ? (
            <StatusMessage tone="error">{statusCopy(locale, resolvedSearchParams.error)}</StatusMessage>
          ) : null}
        </div>
      </Section>

      <Section title={statusCopy(locale, selectedStatus ? "Edit status" : "New status")}>
        <Card className="space-y-5">
          <form action={upsertStatusMeaningAction} className="space-y-5">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="id" value={selectedStatus?.id ?? ""} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={statusCopy(locale, "Slug")}>
                <Input name="slug" defaultValue={selectedStatus?.slug ?? ""} required />
              </Field>
              <Field label={statusCopy(locale, "Title")}>
                <Input name="title" defaultValue={selectedStatus?.title ?? ""} required />
              </Field>
              <Field label={statusCopy(locale, "Official link")}>
                <Input name="officialHref" defaultValue={selectedStatus?.officialHref ?? ""} required />
              </Field>
              <Field label={statusCopy(locale, "Sort order")}>
                <Input name="sortOrder" type="number" min="0" defaultValue={selectedStatus?.sortOrder ?? 0} required />
              </Field>
              <Field label={statusCopy(locale, "Status")}>
                <Select name="status" defaultValue={selectedStatus?.status ?? "draft"}>
                  <option value="draft">{statusCopy(locale, "Draft")}</option>
                  <option value="published">{statusCopy(locale, "Published")}</option>
                </Select>
              </Field>
            </div>
            <Field label={statusCopy(locale, "Meaning")}>
              <Textarea name="meaning" defaultValue={selectedStatus?.meaning ?? ""} required />
            </Field>
            <Field label={statusCopy(locale, "Possible causes")}>
              <Textarea
                name="causes"
                defaultValue={getTranslationLines({ en: { causes: selectedStatus?.causes ?? [] } }, "en", "causes")}
              />
            </Field>
            <Field label={statusCopy(locale, "Common fixes")}>
              <Textarea
                name="fixes"
                defaultValue={getTranslationLines({ en: { fixes: selectedStatus?.fixes ?? [] } }, "en", "fixes")}
              />
            </Field>
            <Field label={statusCopy(locale, "Next steps")}>
              <Textarea
                name="nextSteps"
                defaultValue={getTranslationLines({ en: { nextSteps: selectedStatus?.nextSteps ?? [] } }, "en", "nextSteps")}
              />
            </Field>
            <div className="space-y-4 rounded-3xl border border-border bg-surface-muted p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{statusCopy(locale, "Translations")}</p>
              {LOCALES.filter((entry) => entry.code !== "en").map((entry) => (
                <div key={entry.code} className="grid gap-4 sm:grid-cols-2">
                  <Field label={`${statusCopy(locale, "Title")} (${entry.label})`}>
                    <Input
                      name={`translation_title_${entry.code}`}
                      defaultValue={getTranslationText(selectedStatus?.translations, entry.code as Locale, "title")}
                    />
                  </Field>
                  <Field label={`${statusCopy(locale, "Meaning")} (${entry.label})`}>
                    <Textarea
                      name={`translation_meaning_${entry.code}`}
                      defaultValue={getTranslationText(selectedStatus?.translations, entry.code as Locale, "meaning")}
                    />
                  </Field>
                  <Field label={`${statusCopy(locale, "Causes")} (${entry.label})`}>
                    <Textarea
                      name={`translation_causes_${entry.code}`}
                      defaultValue={getTranslationLines(selectedStatus?.translations, entry.code as Locale, "causes")}
                    />
                  </Field>
                  <Field label={`${statusCopy(locale, "Next steps")} (${entry.label})`}>
                    <Textarea
                      name={`translation_nextSteps_${entry.code}`}
                      defaultValue={getTranslationLines(selectedStatus?.translations, entry.code as Locale, "nextSteps")}
                    />
                  </Field>
                </div>
              ))}
            </div>
            <SubmitButton pendingLabel={statusCopy(locale, "Saving")}>{statusCopy(locale, "Save status")}</SubmitButton>
          </form>
        </Card>
      </Section>

      <Section title={statusCopy(locale, "All statuses")}>
        <div className="grid gap-4">
          {statuses.map((status) => (
            <Card key={status.id} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{status.title}</h3>
                <p className="text-sm text-muted">
                  {status.slug} · {statusCopy(locale, status.status)}
                  {status.publishedAt ? ` · ${status.publishedAt.toISOString().slice(0, 10)}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`?edit=${status.id}`}
                  className="focus-ring tap-target inline-flex items-center rounded-full border border-border bg-surface px-4 text-sm font-semibold"
                >
                  {statusCopy(locale, "Edit")}
                </a>
                <form action={deleteStatusMeaningAction}>
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="id" value={status.id} />
                  <ConfirmSubmitButton confirmText={statusCopy(locale, "Delete this status?")}>
                    {statusCopy(locale, "Delete")}
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
