import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/lib/prisma";

const InputSchema = z.object({
  jobTitle: z.string().min(2),
  industry: z.string().min(1),
  experienceLevel: z.string(),
  concern: z.string().optional(),
});

const QASchema = z.object({
  question: z.string().describe("A realistic interview question for this role"),
  answer: z.string().describe("A confident, natural-sounding answer in 2-4 sentences. Must sound like a real South African job seeker speaking, not AI."),
});

const OutputSchema = z.object({
  questions: z.array(QASchema).describe("10 realistic interview questions with strong sample answers"),
  concernTips: z.array(z.string()).describe("3-5 specific tips addressing their biggest interview concern"),
  questionsForEmployer: z.array(z.string()).describe("3-5 smart questions the candidate should ask the employer"),
  mistakesToAvoid: z.array(z.string()).describe("4-5 common mistakes to avoid, specific to their situation"),
});

export const maxDuration = 30;

/* ── Concern label mapping ── */
const CONCERN_LABELS: Record<string, string> = {
  "dont-know-what-to-say": "I don't know what to say",
  "get-nervous": "I get nervous",
  "no-experience": "I don't have experience",
  "unknown-questions": "I don't know what questions they'll ask",
};

/* ── Experience label mapping ── */
const EXPERIENCE_LABELS: Record<string, string> = {
  "none": "No experience",
  "less-than-1": "Less than 1 year",
  "1-3": "1-3 years",
  "3-plus": "3+ years",
};

/* ═══════════════════════════════════════════
   SYSTEM PROMPT — The personality + rules
   ═══════════════════════════════════════════ */

const SYSTEM_PROMPT = `You are a professional interview coach helping job seekers prepare for real interviews in South Africa.

Your goal is NOT to give generic advice. Your goal is to help the user SOUND confident, natural, and realistic in an interview.

Rules:
- Always tailor answers to the user's experience level (especially if they have little or no experience)
- Use simple, clear, natural English (avoid corporate jargon)
- Make answers sound like a real person speaking, not AI
- Avoid overused phrases like "I am a hardworking individual"
- Where possible, include relatable examples (even basic ones)
- If the user has no experience, frame answers around willingness to learn, reliability, and attitude
- Keep answers concise but strong (2–4 sentences max)
- Always align answers with what employers actually want (reliability, communication, attitude, problem-solving)
- Make the answers sound like something a real South African job seeker would say in a confident but natural way

Context:
- Many users may be applying for entry-level jobs (retail, admin, call centre, general work)
- Some users may not have degrees or formal experience
- Focus on helping them succeed, not impress with complexity`;

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OpenAI API missing" }, { status: 500 });
  }

  try {
    const session = await auth();
    const userId = session?.user?.id;

    const json = await req.json();
    const data = InputSchema.parse(json);

    const concernLabel = data.concern ? CONCERN_LABELS[data.concern] ?? data.concern : null;
    const experienceLabel = EXPERIENCE_LABELS[data.experienceLevel] ?? data.experienceLevel;

    /* ═══════════════════════════════════════════
       MAIN GENERATION PROMPT — The engine
       ═══════════════════════════════════════════ */

    const userPrompt = `Based on the following user profile:

Job Title: ${data.jobTitle}
Industry: ${data.industry}
Experience Level: ${experienceLabel}
${concernLabel ? `Biggest Concern: ${concernLabel}` : ""}

Generate a personalised interview preparation guide.

Structure the response as follows:

1. Top Interview Questions (10)
- List 10 realistic questions for this role

2. Strong Sample Answers
- Provide high-quality, natural-sounding answers for each question
- Keep answers practical and believable based on the user's experience level

3. Tips Based on Their Biggest Concern
- Give specific advice addressing their fear or concern

4. Questions They Should Ask the Employer (3–5)

5. Common Mistakes to Avoid (specific to their situation)

Important:
- Make everything feel tailored to THIS user
- Avoid generic advice
- Keep language simple, clear, and confident`;

    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT,
      schema: OutputSchema,
      prompt: userPrompt,
    });

    const pricingSetting = await db.siteSetting.findUnique({
      where: { key: "tools_pricing_enabled" }
    });
    const pricingEnabled = pricingSetting?.value === "true";

    const generation = await db.toolGeneration.create({
      data: {
        userId: userId ?? null,
        toolType: "interview_guide",
        inputData: data as never,
        outputData: object as never,
        isPaid: !pricingEnabled,
      }
    });

    return NextResponse.json({ id: generation.id });
  } catch (error) {
    console.error("[generate-guide]", error);
    return NextResponse.json({ error: "Failed to generate guide" }, { status: 500 });
  }
}
