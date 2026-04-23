import { notFound } from "next/navigation";
import { db } from "@/lib/prisma";
import { buildLocalePath, isLocale } from "@/lib/site";
import { Card, StatusMessage, ButtonLink } from "@/components/ui";
import { auth } from "@/auth";
import { UnlockButton } from "./unlock-button";

export const metadata = {
  title: "Your Interview Guide",
  robots: { index: false, follow: false },
};

/* ── Types ── */

type QA = { question: string; answer?: string; answerContext?: string; exampleAnswer?: string };

/** v3 schema: questions[] + concernTips[] + questionsForEmployer[] + mistakesToAvoid[] */
type OutputV3 = {
  questions: QA[];
  concernTips?: string[];
  questionsForEmployer?: string[];
  mistakesToAvoid?: string[];
};

/** v2 schema: freePreview[] + premium[] */
type OutputV2 = {
  freePreview: { question: string; answerContext: string; exampleAnswer: string }[];
  premium: { question: string; answerContext: string; exampleAnswer: string }[];
  tipsToAvoid?: string[];
  questionsForEmployer?: string[];
};

/** v1 schema: single snippet + premium[] */
type OutputV1 = {
  snippet: { question: string; answerContext: string; exampleAnswer: string };
  premium: { question: string; answerContext: string; exampleAnswer: string }[];
};

type OutputData = OutputV3 | OutputV2 | OutputV1;

function isV3(output: OutputData): output is OutputV3 {
  return "questions" in output && Array.isArray((output as OutputV3).questions);
}

function isV2(output: OutputData): output is OutputV2 {
  return "freePreview" in output;
}

/** Normalize any schema version into a consistent shape */
function normalizeOutput(output: OutputData) {
  if (isV3(output)) {
    return {
      allQuestions: output.questions.map((q) => ({
        question: q.question,
        answer: q.answer ?? q.exampleAnswer ?? "",
      })),
      concernTips: output.concernTips ?? [],
      questionsForEmployer: output.questionsForEmployer ?? [],
      mistakesToAvoid: output.mistakesToAvoid ?? [],
    };
  }

  if (isV2(output)) {
    const all = [
      ...output.freePreview.map((q) => ({ question: q.question, answer: q.exampleAnswer })),
      ...output.premium.map((q) => ({ question: q.question, answer: q.exampleAnswer })),
    ];
    return {
      allQuestions: all,
      concernTips: [],
      questionsForEmployer: output.questionsForEmployer ?? [],
      mistakesToAvoid: output.tipsToAvoid ?? [],
    };
  }

  // v1
  const all = [
    { question: output.snippet.question, answer: output.snippet.exampleAnswer },
    ...output.premium.map((q) => ({ question: q.question, answer: q.exampleAnswer })),
  ];
  return {
    allQuestions: all,
    concernTips: [],
    questionsForEmployer: [],
    mistakesToAvoid: [],
  };
}

/* ── Free preview config ── */
const FREE_QUESTION_COUNT = 3;

/** Truncate answer to 1-2 sentences for free preview */
function truncateAnswer(answer: string): string {
  const sentences = answer.split(/(?<=[.!?])\s+/);
  return sentences.slice(0, 2).join(" ");
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

  if (!generation || generation.toolType !== "interview_guide") {
    notFound();
  }

  const output = generation.outputData as OutputData | undefined;
  const isPaid = generation.isPaid;
  const input = generation.inputData as { jobTitle?: string; concern?: string } | undefined;

  if (!output) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <StatusMessage tone="error">Generation missing or corrupted.</StatusMessage>
      </div>
    );
  }

  const { allQuestions, concernTips, questionsForEmployer, mistakesToAvoid } = normalizeOutput(output);
  const freeQuestions = allQuestions.slice(0, FREE_QUESTION_COUNT);
  const paidQuestions = allQuestions.slice(FREE_QUESTION_COUNT);
  const toolPath = buildLocalePath(locale, "/tools/interview-guide");
  const resultPath = buildLocalePath(locale, `/tools/interview-guide/result/${id}`);
  const signInPath = `${buildLocalePath(locale, "/sign-in")}?callbackUrl=${encodeURIComponent(resultPath)}`;

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-10">
      {/* ── Header ── */}
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70 sm:text-sm">
          {isPaid ? "Your Full Guide" : "Free Preview"}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {input?.jobTitle
            ? `Your personalised guide for: ${input.jobTitle}`
            : "Your Personalised Interview Guide"}
        </h1>
        {isPaid ? (
          <StatusMessage tone="info">
            Your full guide is ready. Study these answers and walk into your interview with confidence.
          </StatusMessage>
        ) : (
          <StatusMessage tone="info">
            Here&apos;s a free preview — {FREE_QUESTION_COUNT} of {allQuestions.length} questions with short answers. Unlock the rest to fully prepare.
          </StatusMessage>
        )}
      </div>

      {/* ── Free Preview Questions (3 with truncated answers) ── */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {isPaid ? "Interview Questions & Answers" : "Preview Questions"}
        </h2>
        <div className="space-y-5">
          {freeQuestions.map((item, i) => (
            <QACard
              key={`free-${i}`}
              question={item.question}
              answer={isPaid ? item.answer : truncateAnswer(item.answer)}
              index={i + 1}
              truncated={!isPaid}
            />
          ))}
        </div>
      </section>

      {/* ── Paid Section ── */}
      {isPaid ? (
        <>
          {/* Remaining questions */}
          <section className="space-y-5">
            {paidQuestions.map((item, i) => (
              <QACard
                key={`paid-${i}`}
                question={item.question}
                answer={item.answer}
                index={FREE_QUESTION_COUNT + i + 1}
              />
            ))}
          </section>

          {/* Concern Tips */}
          {concernTips.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                💡 Tips for Your Biggest Concern
              </h2>
              <Card className="space-y-3">
                {concernTips.map((tip, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 mt-0.5 text-accent font-semibold text-sm">→</span>
                    <p className="text-[15px] leading-[1.7] text-foreground">{tip}</p>
                  </div>
                ))}
              </Card>
            </section>
          )}

          {/* Mistakes to Avoid */}
          {mistakesToAvoid.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                ⚠️ Common Mistakes to Avoid
              </h2>
              <Card className="space-y-3">
                {mistakesToAvoid.map((tip, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 mt-0.5 text-danger font-semibold text-sm">✕</span>
                    <p className="text-[15px] leading-[1.7] text-muted">{tip}</p>
                  </div>
                ))}
              </Card>
            </section>
          )}

          {/* Questions for Employer */}
          {questionsForEmployer.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                🎯 Questions to Ask the Interviewer
              </h2>
              <Card className="space-y-3">
                {questionsForEmployer.map((q, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 mt-0.5 text-primary font-semibold text-sm">{i + 1}.</span>
                    <p className="text-[15px] leading-[1.7] text-foreground">{q}</p>
                  </div>
                ))}
              </Card>
            </section>
          )}

          {/* Delivery footer */}
          <section className="text-center py-4">
            <Card className="space-y-4 py-6">
              <p className="text-2xl">🎉</p>
              <h3 className="text-lg font-semibold text-foreground">You&apos;re ready!</h3>
              <p className="text-muted max-w-md mx-auto text-[15px] leading-relaxed">
                Practice these answers out loud. The more you rehearse, the more confident you&apos;ll be. Good luck with your interview!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <ButtonLink href={toolPath} variant="secondary">
                  Build Another Guide
                </ButtonLink>
              </div>
            </Card>
          </section>
        </>
      ) : (
        /* ── Blurred preview + Paywall ── */
        <section className="space-y-6">
          <div className="relative">
            {/* Blurred cards */}
            <div className="space-y-5 opacity-25 select-none pointer-events-none blur-sm filter">
              {paidQuestions.slice(0, 3).map((_, i) => (
                <Card key={i} className="space-y-4">
                  <div className="h-5 w-3/4 rounded-lg bg-muted/20" />
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-muted/15" />
                    <div className="h-3 w-5/6 rounded bg-muted/15" />
                  </div>
                  <div className="rounded-2xl bg-surface-strong p-4 space-y-2">
                    <div className="h-3 w-full rounded bg-muted/15" />
                    <div className="h-3 w-4/5 rounded bg-muted/15" />
                    <div className="h-3 w-3/4 rounded bg-muted/15" />
                  </div>
                </Card>
              ))}
            </div>

            {/* Paywall Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Card className="max-w-md mx-4 text-center space-y-5 py-8 shadow-lg border-primary/15">
                <div className="h-16 w-16 mx-auto bg-surface-strong rounded-full flex items-center justify-center text-2xl shadow-md">
                  🔒
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">
                    You&apos;re almost ready.
                  </h3>
                  <p className="text-muted text-[15px] leading-relaxed max-w-sm mx-auto">
                    Unlock your full interview guide and go in confident.
                  </p>
                </div>

                {/* Benefits list */}
                <div className="text-left space-y-2.5 px-4">
                  {[
                    `✔ 10 tailored questions`,
                    `✔ Strong sample answers`,
                    `✔ What to say (step-by-step)`,
                    `✔ Questions to ask the employer`,
                    `✔ Mistakes to avoid`,
                  ].map((benefit) => (
                    <div key={benefit} className="flex gap-2.5 items-center">
                      <span className="text-foreground text-[15px] font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                {isLoggedIn ? (
                  <UnlockButton generationId={id} locale={locale} />
                ) : (
                  <div className="space-y-2">
                    <ButtonLink
                      href={signInPath}
                      className="w-full"
                    >
                      Unlock Now — R49
                    </ButtonLink>
                    <p className="text-xs text-muted">
                      You&apos;ll need to sign in or create a free account
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

/* ── Q&A Card Component ── */

function QACard({
  question,
  answer,
  index,
  truncated,
}: {
  question: string;
  answer: string;
  index: number;
  truncated?: boolean;
}) {
  return (
    <Card className="space-y-4 border-l-4 border-l-primary leading-relaxed">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold">
          {index}
        </span>
        <h3 className="text-lg font-semibold text-foreground sm:text-xl pt-0.5">
          {question}
        </h3>
      </div>
      <div className="rounded-2xl bg-surface-strong p-4 ml-10 space-y-1.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {truncated ? "Short Preview" : "Sample Answer"}
        </p>
        <p className="text-foreground text-[15px] leading-[1.75]">
          &quot;{answer}&quot;
        </p>
        {truncated && (
          <p className="text-xs text-muted pt-1 italic">
            Full answer available in the complete guide
          </p>
        )}
      </div>
    </Card>
  );
}
