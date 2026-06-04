import { notFound } from "next/navigation";
import { db } from "@/lib/prisma";
import { buildLocalePath, isLocale } from "@/lib/site";
import { Card, StatusMessage, ButtonLink } from "@/components/ui";
import { auth } from "@/auth";
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
  appealLetter: string;
  requiredDocuments: string[];
  warnings: string[];
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
  const toolPath = buildLocalePath(locale, "/tools/sassa-appeal");
  const resultPath = buildLocalePath(locale, `/tools/sassa-appeal/result/${id}`);
  const signInPath = `${buildLocalePath(locale, "/sign-in")}?callbackUrl=${encodeURIComponent(resultPath)}`;

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-10">
      {/* ── Header ── */}
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70 sm:text-sm">
          {isPaid ? copy.packEyebrow : copy.draftEyebrow}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {copy.appealTitlePrefix} {reasonLabel}
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

      {/* ── Paid Content ── */}
      {isPaid ? (
        <>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {copy.letterDraftTitle}
            </h2>
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
              {output.requiredDocuments.map((doc, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 mt-0.5 text-primary font-bold text-sm">✓</span>
                  <p className="text-[15px] leading-[1.7] text-foreground font-medium">{doc}</p>
                </div>
              ))}
            </Card>
          </section>

          {output.warnings && output.warnings.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {copy.warningsTitle}
              </h2>
              <Card className="space-y-3 border-danger/30 bg-danger/5">
                {output.warnings.map((warn, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 mt-0.5 text-danger font-bold text-sm">!</span>
                    <p className="text-[15px] leading-[1.7] text-danger font-medium">{warn}</p>
                  </div>
                ))}
              </Card>
            </section>
          )}

          <section className="text-center py-4">
            <Card className="space-y-4 py-6">
              <p className="text-2xl">🏛️</p>
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
