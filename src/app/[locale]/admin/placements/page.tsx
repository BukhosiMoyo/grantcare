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

const ZU_PLACEMENTS_COPY: Record<string, string> = {
  Placements: "Izindawo",
  "Database not configured.": "Idathabheyisi ayilungisiwe.",
  "Placement saved.": "Indawo ilondoloziwe.",
  "Placement deleted.": "Indawo isusiwe.",
  "Check the placement form and try again.": "Hlola ifomu lendawo bese uzama futhi.",
  "Edit placement": "Hlela indawo",
  "New placement": "Indawo entsha",
  Slug: "I-slug",
  Title: "Isihloko",
  Link: "Isixhumanisi",
  "CTA label": "Ilebula ye-CTA",
  Disclosure: "Ukudalula",
  Placement: "Indawo",
  "Payment dates": "Izinsuku zokukhokha",
  "Guide inline": "Umhlahlandlela ngaphakathi",
  "Dashboard helpful": "Usizo kudeshibhodi",
  payment_dates: "izinsuku zokukhokha",
  guide_inline: "umhlahlandlela ngaphakathi",
  dashboard_helpful: "usizo kudeshibhodi",
  "Grant target": "Isibonelelo esiqondiwe",
  "All grants": "Zonke izibonelelo",
  "Guide target": "Umhlahlandlela oqondiwe",
  "All guides": "Yonke imihlahlandlela",
  "Sort order": "Ukuhlelwa",
  Status: "Isimo",
  Draft: "Okusalungiswa",
  Published: "Kushicilelwe",
  draft: "okusalungiswa",
  published: "kushicilelwe",
  "Starts at": "Kuqala ngo",
  "Ends at": "Kuphela ngo",
  Body: "Umzimba",
  Translations: "Ukuhumusha",
  CTA: "CTA",
  Saving: "Kuyalondolozwa",
  "Save placement": "Londoloza indawo",
  "All placements": "Zonke izindawo",
  Edit: "Hlela",
  "Delete this placement?": "Susa le ndawo?",
  Delete: "Susa",
};

function placementCopy(locale: Locale, text: string) {
  return locale === "zu" ? (ZU_PLACEMENTS_COPY[text] ?? text) : text;
}

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
      <Section eyebrow="Admin" title={placementCopy(locale, "Placements")}>
        <Card>
          <p className="text-sm text-muted">{placementCopy(locale, "Database not configured.")}</p>
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
      <Section eyebrow="Admin" title={placementCopy(locale, "Placements")}>
        <div className="space-y-4">
          {resolvedSearchParams.message ? <StatusMessage>{placementCopy(locale, resolvedSearchParams.message)}</StatusMessage> : null}
          {resolvedSearchParams.error ? (
            <StatusMessage tone="error">{placementCopy(locale, resolvedSearchParams.error)}</StatusMessage>
          ) : null}
        </div>
      </Section>

      <Section title={placementCopy(locale, selectedBlock ? "Edit placement" : "New placement")}>
        <Card className="space-y-5">
          <form action={upsertMonetizationBlockAction} className="space-y-5">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="id" value={selectedBlock?.id ?? ""} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={placementCopy(locale, "Slug")}>
                <Input name="slug" defaultValue={selectedBlock?.slug ?? ""} required />
              </Field>
              <Field label={placementCopy(locale, "Title")}>
                <Input name="title" defaultValue={selectedBlock?.title ?? ""} required />
              </Field>
              <Field label={placementCopy(locale, "Link")}>
                <Input name="href" defaultValue={selectedBlock?.href ?? ""} required />
              </Field>
              <Field label={placementCopy(locale, "CTA label")}>
                <Input name="ctaLabel" defaultValue={selectedBlock?.ctaLabel ?? "Open"} required />
              </Field>
              <Field label={placementCopy(locale, "Disclosure")}>
                <Input
                  name="disclosureLabel"
                  defaultValue={selectedBlock?.disclosureLabel ?? "Sponsored"}
                  required
                />
              </Field>
              <Field label={placementCopy(locale, "Placement")}>
                <Select name="placement" defaultValue={selectedBlock?.placement ?? "payment_dates"}>
                  <option value="payment_dates">{placementCopy(locale, "Payment dates")}</option>
                  <option value="guide_inline">{placementCopy(locale, "Guide inline")}</option>
                  <option value="dashboard_helpful">{placementCopy(locale, "Dashboard helpful")}</option>
                </Select>
              </Field>
              <Field label={placementCopy(locale, "Grant target")}>
                <Select name="grantTypeId" defaultValue={selectedBlock?.grantTypeId ?? ""}>
                  <option value="">{placementCopy(locale, "All grants")}</option>
                  {grantTypes.map((grant) => (
                    <option key={grant.id} value={grant.id}>
                      {grant.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label={placementCopy(locale, "Guide target")}>
                <Select name="guideId" defaultValue={selectedBlock?.guideId ?? ""}>
                  <option value="">{placementCopy(locale, "All guides")}</option>
                  {guides.map((guide) => (
                    <option key={guide.id} value={guide.id}>
                      {guide.title}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label={placementCopy(locale, "Sort order")}>
                <Input name="sortOrder" type="number" min="0" defaultValue={selectedBlock?.sortOrder ?? 0} required />
              </Field>
              <Field label={placementCopy(locale, "Status")}>
                <Select name="status" defaultValue={selectedBlock?.status ?? "draft"}>
                  <option value="draft">{placementCopy(locale, "Draft")}</option>
                  <option value="published">{placementCopy(locale, "Published")}</option>
                </Select>
              </Field>
              <Field label={placementCopy(locale, "Starts at")}>
                <Input
                  name="startsAt"
                  type="datetime-local"
                  defaultValue={selectedBlock?.startsAt?.toISOString().slice(0, 16) ?? ""}
                />
              </Field>
              <Field label={placementCopy(locale, "Ends at")}>
                <Input
                  name="endsAt"
                  type="datetime-local"
                  defaultValue={selectedBlock?.endsAt?.toISOString().slice(0, 16) ?? ""}
                />
              </Field>
            </div>
            <Field label={placementCopy(locale, "Body")}>
              <Textarea name="body" defaultValue={selectedBlock?.body ?? ""} required />
            </Field>
            <div className="space-y-4 rounded-3xl border border-border bg-surface-muted p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{placementCopy(locale, "Translations")}</p>
              {LOCALES.filter((entry) => entry.code !== "en").map((entry) => (
                <div key={entry.code} className="grid gap-4 sm:grid-cols-2">
                  <Field label={`${placementCopy(locale, "Title")} (${entry.label})`}>
                    <Input
                      name={`translation_title_${entry.code}`}
                      defaultValue={getTranslationText(selectedBlock?.translations, entry.code as Locale, "title")}
                    />
                  </Field>
                  <Field label={`${placementCopy(locale, "Body")} (${entry.label})`}>
                    <Textarea
                      name={`translation_body_${entry.code}`}
                      defaultValue={getTranslationText(selectedBlock?.translations, entry.code as Locale, "body")}
                    />
                  </Field>
                  <Field label={`${placementCopy(locale, "CTA")} (${entry.label})`}>
                    <Input
                      name={`translation_ctaLabel_${entry.code}`}
                      defaultValue={getTranslationText(selectedBlock?.translations, entry.code as Locale, "ctaLabel")}
                    />
                  </Field>
                  <Field label={`${placementCopy(locale, "Disclosure")} (${entry.label})`}>
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
            <SubmitButton pendingLabel={placementCopy(locale, "Saving")}>{placementCopy(locale, "Save placement")}</SubmitButton>
          </form>
        </Card>
      </Section>

      <Section title={placementCopy(locale, "All placements")}>
        <div className="grid gap-4">
          {blocks.map((block) => (
            <Card key={block.id} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{block.title}</h3>
                <p className="text-sm text-muted">
                  {placementCopy(locale, block.placement)} · {placementCopy(locale, block.status)}
                  {block.publishedAt ? ` · ${block.publishedAt.toISOString().slice(0, 10)}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`?edit=${block.id}`}
                  className="focus-ring tap-target inline-flex items-center rounded-full border border-border bg-surface px-4 text-sm font-semibold"
                >
                  {placementCopy(locale, "Edit")}
                </a>
                <form action={deleteMonetizationBlockAction}>
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="id" value={block.id} />
                  <ConfirmSubmitButton confirmText={placementCopy(locale, "Delete this placement?")}>
                    {placementCopy(locale, "Delete")}
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
