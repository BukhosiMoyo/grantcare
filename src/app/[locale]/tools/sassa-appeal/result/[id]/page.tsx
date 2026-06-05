import { notFound } from "next/navigation";
import { db } from "@/lib/prisma";
import { buildLocalePath, isLocale } from "@/lib/site";
import { Card, StatusMessage, ButtonLink } from "@/components/ui";
import { auth } from "@/auth";
import { AppealPackActions } from "./appeal-pack-actions";
import { UnlockButton } from "./unlock-button";
import { getSassaAppealCopy } from "../../copy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) return {};
  const copy = getSassaAppealCopy(locale);

  return {
    title: copy.resultMetadataTitle,
    robots: { index: false, follow: false },
  };
}

/* ── Types ── */

type OutputSchema = {
  actions?: string[];
  appealLetter: string;
  contacts?: Array<{ title: string; value: string; href: string }>;
  decisionDate?: string;
  declinedMonth?: string | null;
  finalDeadline?: string;
  grantLabel?: string;
  guidePath?: string;
  reasonExplanation?: string;
  reasonLabel?: string;
  reminder?: {
    saved?: boolean;
    signInRequired?: boolean;
  };
  requiredDocuments?: string[];
  route?: {
    href: string;
    label: string;
    method: string;
  };
  targetDeadline?: string | null;
  warnings?: string[];
};

type InputSchema = {
  grantType?: string;
  rejectionReason?: string;
  idNumber?: string;
};

/* ── Helpers ── */

function getPartialLetter(fullLetter: string): string {
  const lines = fullLetter.trim().split("\n");
  // Grab greeting + first 3 lines of body
  const previewLines = lines.slice(0, 5);
  return previewLines.join("\n");
}

/* ── Page ── */

export default async function ResultPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;

  if (!isLocale(locale)) notFound();
  const copy = getSassaAppealCopy(locale);

  const generation = await db.toolGeneration.findUnique({
    where: { id },
  });

  const session = await auth();
  const isLoggedIn = !!session?.user;

  if (!generation || generation.toolType !== "sassa_appeal") {
    notFound();
  }

  if (generation.userId && generation.userId !== session?.user?.id) {
    notFound();
  }

  const output = generation.outputData as OutputSchema | undefined;
  const isPaid = generation.isPaid;
  const input = generation.inputData as InputSchema | undefined;

  if (!output || !output.appealLetter) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <StatusMessage tone="error">{copy.missingGeneration}</StatusMessage>
      </div>
    );
  }

  const partialLetter = getPartialLetter(output.appealLetter);
  const reasonLabels = copy.reasonLabels as Record<string, string>;
  const reasonLabel = reasonLabels[input?.rejectionReason || "other"] ?? reasonLabels.other;
  const displayReasonLabel = output.reasonLabel ?? reasonLabel;
  const toolPath = buildLocalePath(locale, "/tools/sassa-appeal");
  const resultPath = buildLocalePath(locale, `/tools/sassa-appeal/result/${id}`);
  const signInPath = `${buildLocalePath(locale, "/sign-in")}?callbackUrl=${encodeURIComponent(resultPath)}`;
  const requiredDocuments = output.requiredDocuments ?? [];
  const warnings = output.warnings ?? [];
  const actions = output.actions ?? [];
  const contacts = output.contacts ?? [];
  const guidePath = output.guidePath ? buildLocalePath(locale, output.guidePath) : toolPath;

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-10">
      {/* ── Header ── */}
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70 sm:text-sm">
          {isPaid ? copy.packEyebrow : copy.draftEyebrow}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {copy.appealTitlePrefix} {displayReasonLabel}
        </h1>
        {isPaid ? (
          <StatusMessage tone="info">
            {copy.paidStatus}
          </StatusMessage>
        ) : (
          <StatusMessage tone="info">
            {copy.previewStatus}
          </StatusMessage>
        )}
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {copy.reasonSummaryTitle}
        </h2>
        <Card className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{displayReasonLabel}</p>
            {output.reasonExplanation ? (
              <p className="text-[15px] leading-7 text-muted">{output.reasonExplanation}</p>
            ) : null}
          </div>
          {actions.length > 0 ? (
            <div className="space-y-2">
              <p className="font-semibold">{copy.actionChecklistTitle}</p>
              <ul className="space-y-2 text-sm text-muted">
                {actions.map((action) => (
                  <li key={action}>• {action}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <div>
            <ButtonLink href={guidePath} variant="secondary">
              {copy.readGuide}
            </ButtonLink>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">{copy.deadlineTitle}</h2>
          {output.targetDeadline ? (
            <p className="text-sm text-muted">
              <span className="font-semibold text-foreground">{copy.targetDeadlineLabel}:</span> {output.targetDeadline}
            </p>
          ) : null}
          {output.finalDeadline ? (
            <p className="text-sm text-muted">
              <span className="font-semibold text-foreground">{copy.finalDeadlineLabel}:</span> {output.finalDeadline}
            </p>
          ) : null}
          {output.reminder?.saved ? (
            <StatusMessage>{copy.reminderSaved}</StatusMessage>
          ) : output.reminder?.signInRequired ? (
            <StatusMessage>{copy.reminderSignIn}</StatusMessage>
          ) : null}
        </Card>

        {output.route ? (
          <Card className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">{copy.submissionTitle}</h2>
            <p className="text-sm leading-7 text-muted">{output.route.method}</p>
            <a href={output.route.href} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary">
              {output.route.label}
            </a>
          </Card>
        ) : null}
      </section>

      {/* ── Paid Content ── */}
      {isPaid ? (
        <>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {copy.letterDraftTitle}
            </h2>
            <AppealPackActions
              appealLetter={output.appealLetter}
              copiedLabel={copy.copied}
              copyLabel={copy.copyLetter}
              downloadLabel={copy.download}
              fileName={`${displayReasonLabel} appeal letter`}
              printLabel={copy.print}
            />
            <Card className="border-l-4 border-l-primary">
              <div className="text-foreground text-[15px] leading-[1.75] whitespace-pre-wrap font-mono text-sm bg-surface-strong p-6 rounded-xl">
                {output.appealLetter}
              </div>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {copy.requiredDocsTitle}
            </h2>
            <Card className="space-y-3">
              {requiredDocuments.map((doc, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 mt-0.5 text-primary font-bold text-sm">•</span>
                  <p className="text-[15px] leading-[1.7] text-foreground font-medium">{doc}</p>
                </div>
              ))}
            </Card>
          </section>

          {warnings.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {copy.warningsTitle}
              </h2>
              <Card className="space-y-3 border-danger/30 bg-danger/5">
                {warnings.map((warn, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 mt-0.5 text-danger font-bold text-sm">!</span>
                    <p className="text-[15px] leading-[1.7] text-danger font-medium">{warn}</p>
                  </div>
                ))}
              </Card>
            </section>
          )}

          {contacts.length > 0 ? (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {copy.contactsTitle}
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {contacts.map((contact) => {
                  const isHttp = contact.href.startsWith("http");

                  return (
                    <Card key={contact.title} className="space-y-2">
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">{contact.title}</p>
                      <a
                        href={contact.href}
                        target={isHttp ? "_blank" : undefined}
                        rel={isHttp ? "noreferrer" : undefined}
                        className="text-sm leading-7 text-foreground hover:text-primary"
                      >
                        {contact.value}
                      </a>
                    </Card>
                  );
                })}
              </div>
            </section>
          ) : null}

          <section className="text-center py-4">
            <Card className="space-y-4 py-6">
              <h3 className="text-lg font-semibold text-foreground">{copy.readyTitle}</h3>
              <p className="text-muted text-sm max-w-sm mx-auto">{copy.readyBody}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <ButtonLink href={toolPath} variant="secondary">
                  {copy.draftAnother}
                </ButtonLink>
              </div>
            </Card>
          </section>
        </>
      ) : (
        /* ── Preview + Paywall ── */
        <section className="space-y-8">
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {copy.letterPreviewTitle}
            </h2>
            <Card className="border-l-4 border-l-primary relative overflow-hidden">
              <div className="space-y-4 relative z-10">
                <div className="text-foreground text-[15px] leading-[1.75] whitespace-pre-wrap font-mono text-sm bg-surface-strong p-6 rounded-xl rounded-b-none border-b-0 pb-0">
                  {partialLetter}
                  <div className="h-16 bg-gradient-to-t from-surface-strong to-transparent w-full mt-2" />
                </div>
              </div>
            </Card>
          </div>

          <div className="relative">
            {/* Blurred templates to show length */}
            <div className="space-y-6 opacity-25 select-none pointer-events-none blur-md filter">
              <Card className="space-y-4">
                <div className="h-4 w-1/3 rounded bg-muted/20" />
                <div className="space-y-3 pt-2">
                  <div className="h-4 w-full rounded bg-muted/15" />
                  <div className="h-4 w-5/6 rounded bg-muted/15" />
                  <div className="h-4 w-full rounded bg-muted/15" />
                </div>
              </Card>
              <Card className="space-y-4">
                <div className="h-4 w-1/3 rounded bg-muted/20" />
                <div className="space-y-3 pt-2">
                  <div className="h-4 w-full rounded bg-muted/15" />
                  <div className="h-4 w-5/6 rounded bg-muted/15" />
                </div>
              </Card>
            </div>

            {/* Paywall Overlay */}
            <div className="absolute inset-0 flex items-start justify-center pt-8">
              <Card className="max-w-md mx-4 text-center space-y-5 py-8 shadow-xl border border-primary/20 bg-background/95 backdrop-blur-sm">
                <div className="h-16 w-16 mx-auto bg-surface-strong rounded-full flex items-center justify-center text-2xl shadow-md border border-border">
                  🔒
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">
                    {copy.paywallTitle}
                  </h3>
                  <p className="text-primary font-medium text-[15px] leading-relaxed max-w-sm mx-auto">
                    {copy.paywallBody}
                  </p>
                </div>

                {/* Benefits list */}
                <div className="text-left space-y-2.5 px-4 pt-2">
                  {copy.paywallBenefits.map((benefit) => (
                    <div key={benefit} className="flex gap-2.5 items-center">
                      <span className="text-foreground text-[15px] font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                {isLoggedIn ? (
                  <div className="pt-2">
                    <UnlockButton generationId={id} locale={locale} />
                  </div>
                ) : (
                  <div className="space-y-3 pt-2">
                    <ButtonLink
                      href={signInPath}
                      className="w-full h-12 text-[17px]"
                    >
                      {copy.unlock}
                    </ButtonLink>
                    <p className="text-xs text-muted">
                      {copy.accountRequired}
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
