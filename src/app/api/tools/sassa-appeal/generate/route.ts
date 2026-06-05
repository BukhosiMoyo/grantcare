import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { auth } from "@/auth";
import { buildAppealPack, calculateAppealDeadlines, parseAppealDate } from "@/lib/appeals";
import { syncAppealReminderJobs } from "@/lib/appeal-reminders";
import { db } from "@/lib/prisma";
import { getRequestLocale, getSassaAppealApiCopy } from "../copy";

const InputSchema = z.object({
  grantType: z.string(),
  rejectionReason: z.string(),
  decisionDate: z.string().trim().min(1),
  declinedMonth: z.string().trim().optional(),
  defense: z.string().min(5),
  fullName: z.string().min(2),
  idNumber: z.string().length(13),
  wantsReminder: z.enum(["yes", "no"]).default("no"),
});

const OutputSchema = z.object({
  appealLetter: z.string().describe("The formal appeal letter draft"),
  warnings: z.array(z.string()).describe("1-2 warnings/tips specific to this grant appeal"),
});

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are a professional legal drafter specializing in South African Social Security Agency (SASSA) and Independent Tribunal for Social Assistance Appeals (ITSAA) cases.

Your goal is to write a formal, legally sound appeal letter on behalf of a citizen whose grant was rejected.

Rules for the Letter:
- Tone must be highly formal, polite, and factual.
- The letter is a user-prepared draft for submission and must not claim to be issued, approved, or signed by SASSA, DSD, or ITSAA.
- Address it to:
  The Independent Tribunal for Social Assistance Appeals (ITSAA)
  Department of Social Development
  Pretoria, South Africa
- State the applicant's Full Name and ID Number clearly at the top.
- State exactly which Grant was rejected and the SASSA rejection reason.
- Formally state the user's defense, fleshing it out into a professional argument. If their input is brief or colloquial, expand it into professional language.
- Explicitly state what required documents the applicant is attaching as proof.
- End with a formal sign-off (e.g. Yours faithfully).
- Do NOT use placeholders. Generate a complete, ready-to-review, ready-to-print draft letter.

Rules for Required Documents:
- Refer only to the document categories supplied by GrantCare in the user prompt.
- Do not invent official forms or contact details.`;

export async function POST(req: Request) {
  const locale = getRequestLocale(req);
  const copy = getSassaAppealApiCopy(locale);

  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: copy.apiMissing }, { status: 500 });
    }

    const session = await auth();
    const userId = session?.user?.id;

    const json = await req.json();
    const data = InputSchema.parse(json);
    const decisionDate = parseAppealDate(data.decisionDate);

    if (!decisionDate) {
      return NextResponse.json({ error: copy.failedGenerate }, { status: 400 });
    }

    const grantLabels = copy.grantLabels as Record<string, string>;
    const reasonLabels = copy.reasonLabels as Record<string, string>;
    const grantLabel = grantLabels[data.grantType] ?? data.grantType;
    const reasonLabel = reasonLabels[data.rejectionReason] ?? data.rejectionReason;

    const userPrompt = `Based on the following details:

Applicant Name: ${data.fullName}
ID Number: ${data.idNumber}
Grant Type: ${grantLabel}
Rejection Reason: ${reasonLabel}
Decision Date: ${data.decisionDate}
Declined Month: ${data.declinedMonth || "Not applicable"}
User's Correction Details (in their words): "${data.defense}"

Generate the appeal letter and specific warnings.${copy.outputLanguageInstruction}`;

    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT,
      schema: OutputSchema,
      prompt: userPrompt,
    });

    const pack = buildAppealPack({
      appealLetter: object.appealLetter,
      decisionDate,
      declinedMonth: data.declinedMonth || null,
      fullName: data.fullName,
      grantType: data.grantType,
      idNumber: data.idNumber,
      locale,
      rejectionReason: data.rejectionReason,
      warnings: object.warnings,
    });

    const generation = await db.toolGeneration.create({
      data: {
        userId: userId ?? null,
        toolType: "sassa_appeal",
        inputData: data as never,
        outputData: {
          ...pack,
          reminder: {
            saved: false,
            signInRequired: data.wantsReminder === "yes" && !userId,
          },
        } as never,
        isPaid: false,
      }
    });

    if (userId && data.wantsReminder === "yes") {
      const deadlines = calculateAppealDeadlines(decisionDate, data.grantType);
      const appealCase = await db.appealCase.create({
        data: {
          decisionDate,
          declinedMonth: data.declinedMonth || null,
          finalDeadline: deadlines.finalDeadline,
          grantType: data.grantType,
          rejectionReason: data.rejectionReason,
          remindersEnabled: true,
          targetDeadline: deadlines.targetDeadline,
          toolGenerationId: generation.id,
          userId,
        },
      });

      await syncAppealReminderJobs({
        appealCaseId: appealCase.id,
        finalDeadline: deadlines.finalDeadline,
        generationId: generation.id,
        grantType: data.grantType,
        locale,
        rejectionReason: data.rejectionReason,
        userId,
      });

      await db.toolGeneration.update({
        where: { id: generation.id },
        data: {
          outputData: {
            ...pack,
            reminder: {
              appealCaseId: appealCase.id,
              saved: true,
              signInRequired: false,
            },
          } as never,
        },
      });
    }

    return NextResponse.json({ id: generation.id });
  } catch (error) {
    console.error("[generate-sassa-appeal]", error);
    return NextResponse.json({ error: copy.failedGenerate }, { status: 500 });
  }
}
