import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { getRequestLocale, getSassaAppealApiCopy } from "../copy";

const InputSchema = z.object({
  grantType: z.string(),
  rejectionReason: z.string(),
  defense: z.string().min(5),
  fullName: z.string().min(2),
  idNumber: z.string().length(13),
});

const OutputSchema = z.object({
  appealLetter: z.string().describe("The formal appeal letter draft"),
  requiredDocuments: z.array(z.string()).describe("A list of 3-5 specific supporting documents the user MUST attach to this appeal (e.g. Affidavit, Bank Statements)"),
  warnings: z.array(z.string()).describe("1-2 warnings/tips specific to this grant appeal (e.g. 'You only have 90 days from the rejection date to submit this')"),
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
- Based on the rejection reason, list exactly what they need to attach (e.g. If UIF registered -> "Affidavit from Police stating you have not worked", "Department of Labour UI-19 form", etc).
- If alternative income -> "3 months stamped bank statements".`;

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

    const grantLabels = copy.grantLabels as Record<string, string>;
    const reasonLabels = copy.reasonLabels as Record<string, string>;
    const grantLabel = grantLabels[data.grantType] ?? data.grantType;
    const reasonLabel = reasonLabels[data.rejectionReason] ?? data.rejectionReason;

    const userPrompt = `Based on the following details:

Applicant Name: ${data.fullName}
ID Number: ${data.idNumber}
Grant Type: ${grantLabel}
Rejection Reason: ${reasonLabel}
User's Defense (in their words): "${data.defense}"

Generate the appeal letter, required documents list, and specific warnings.${copy.outputLanguageInstruction}`;

    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT,
      schema: OutputSchema,
      prompt: userPrompt,
    });

    const generation = await db.toolGeneration.create({
      data: {
        userId: userId ?? null,
        toolType: "sassa_appeal",
        inputData: data as never,
        outputData: object as never,
        isPaid: false,
      }
    });

    return NextResponse.json({ id: generation.id });
  } catch (error) {
    console.error("[generate-sassa-appeal]", error);
    return NextResponse.json({ error: copy.failedGenerate }, { status: 500 });
  }
}
