import { notFound } from "next/navigation";
import { db } from "@/lib/prisma";
import { buildLocalePath, isLocale } from "@/lib/site";
import { Card, StatusMessage, ButtonLink } from "@/components/ui";
import { auth } from "@/auth";
import { UnlockButton } from "./unlock-button";

export const metadata = {
  title: "Your Email Templates",
  robots: { index: false, follow: false },
};

/* ── Types ── */

type OutputSchema = {
  subjectOptions: string[];
  shortEmail: string;
  detailedEmail: string;
  tips: string[];
};

type InputSchema = {
  jobTitle?: string;
  companyName?: string;
  emailType?: string;
  tone?: string;
  experienceLevel?: string;
};

/* ── Helpers ── */

function getPartialEmail(fullEmail: string): string {
  const lines = fullEmail.trim().split("\n");
  // Grab greeting + first paragraph
  const previewLines = lines.slice(0, 3);
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

  const generation = await db.toolGeneration.findUnique({
    where: { id },
  });

  const session = await auth();
  const isLoggedIn = !!session?.user;

  if (!generation || generation.toolType !== "email_template") {
    notFound();
  }

  const output = generation.outputData as OutputSchema | undefined;
  const isPaid = generation.isPaid;
  const input = generation.inputData as InputSchema | undefined;

  if (!output || !output.shortEmail) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <StatusMessage tone="error">Generation missing or corrupted.</StatusMessage>
      </div>
    );
  }

  const primarySubject = output.subjectOptions[0];
  const partialShortEmail = getPartialEmail(output.shortEmail);
  const toolPath = buildLocalePath(locale, "/tools/email-template");
  const resultPath = buildLocalePath(locale, `/tools/email-template/result/${id}`);
  const signInPath = `${buildLocalePath(locale, "/sign-in")}?callbackUrl=${encodeURIComponent(resultPath)}`;

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-10">
      {/* ── Header ── */}
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70 sm:text-sm">
          {isPaid ? "Your Email Pack" : "Free Preview"}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {input?.jobTitle && input?.companyName
            ? `Your email for: ${input.jobTitle} at ${input.companyName}`
            : "Your Personalised Job Email"}
        </h1>
        {isPaid ? (
          <StatusMessage tone="info">
            Your full email pack is ready. Copy the version that best fits your style.
          </StatusMessage>
        ) : (
          <StatusMessage tone="info">
            Ready in seconds. No editing needed. Let&apos;s make a strong first impression.
          </StatusMessage>
        )}
      </div>

      {/* ── Paid Content ── */}
      {isPaid ? (
        <>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Subject Lines
            </h2>
            <Card className="space-y-2">
              {output.subjectOptions.map((subj, i) => (
                <div key={i} className="flex items-center gap-3 bg-surface-strong p-3 rounded-lg">
                  <span className="text-primary font-bold text-sm">{i + 1}.</span>
                  <span className="text-foreground font-medium text-[15px]">{subj}</span>
                </div>
              ))}
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Short & Simple Version
            </h2>
            <Card className="border-l-4 border-l-primary">
              <div className="text-foreground text-[15px] leading-[1.75] whitespace-pre-wrap font-mono text-sm bg-surface-strong p-5 rounded-xl">
                {output.shortEmail}
              </div>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Detailed Version
            </h2>
            <Card className="border-l-4 border-l-accent">
              <div className="text-foreground text-[15px] leading-[1.75] whitespace-pre-wrap font-mono text-sm bg-surface-strong p-5 rounded-xl">
                {output.detailedEmail}
              </div>
            </Card>
          </section>

          {output.tips && output.tips.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                💡 Quick Sending Tips
              </h2>
              <Card className="space-y-3">
                {output.tips.map((tip, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 mt-0.5 text-accent font-semibold text-sm">→</span>
                    <p className="text-[15px] leading-[1.7] text-foreground">{tip}</p>
                  </div>
                ))}
              </Card>
            </section>
          )}

          <section className="text-center py-4">
            <Card className="space-y-4 py-6">
              <p className="text-2xl">🎉</p>
              <h3 className="text-lg font-semibold text-foreground">You&apos;re ready to hit send!</h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <ButtonLink href={toolPath} variant="secondary">
                  Create Another Email
                </ButtonLink>
              </div>
            </Card>
          </section>
        </>
      ) : (
        /* ── Preview + Paywall ── */
        <section className="space-y-8">
          
          {/* Partial Free Preview (the "cut off mid-way" hook) */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Preview
            </h2>
            <Card className="border-l-4 border-l-primary relative overflow-hidden">
              <div className="space-y-4 relative z-10">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">Subject:</p>
                  <p className="text-foreground font-medium text-[16px]">{primarySubject}</p>
                </div>
                <hr className="border-border/50" />
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">Body:</p>
                  <div className="text-foreground text-[15px] leading-[1.75] whitespace-pre-wrap font-mono text-sm bg-surface-strong p-4 rounded-xl rounded-b-none border-b-0 pb-0">
                    {partialShortEmail}
                    <div className="h-10 bg-gradient-to-t from-surface-strong to-transparent w-full mt-2" />
                  </div>
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
                <div className="h-4 w-1/4 rounded bg-muted/20" />
                <div className="space-y-3 pt-2">
                  <div className="h-4 w-[90%] rounded bg-muted/15" />
                  <div className="h-4 w-4/5 rounded bg-muted/15" />
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
                    Get your complete, ready-to-send email
                  </h3>
                  <p className="text-primary font-medium text-[15px] leading-relaxed max-w-sm mx-auto">
                    Your email is almost ready. Unlock it and send it with confidence.
                  </p>
                </div>

                {/* Benefits list */}
                <div className="text-left space-y-2.5 px-4 pt-2">
                  {[
                    `✔ Full professional email`,
                    `✔ 3 subject line options`,
                    `✔ Short + detailed versions`,
                    `✔ Proper formatting`,
                    `✔ Copy & send instantly`,
                  ].map((benefit) => (
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
                      Unlock Now — R19
                    </ButtonLink>
                    <p className="text-xs text-muted">
                      You&apos;ll need a free account to save your emails
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
