import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { getEmailTemplateApiCopy, getRequestLocale } from "../copy";

const InputSchema = z.object({
  emailType: z.string(),
  jobTitle: z.string().min(2),
  companyName: z.string().min(2),
  experienceLevel: z.string(),
  tone: z.string(),
  length: z.string(),
  userName: z.string().min(2),
});

const OutputSchema = z.object({
  subjectOptions: z.array(z.string()).describe("3 professional subject line options"),
  shortEmail: z.string().describe("A clean, concise, 5-7 lines max email matching the user's criteria"),
  detailedEmail: z.string().describe("A slightly expanded, highly professional version providing more context"),
  tips: z.array(z.string()).describe("2-3 brief tips on how to send this email properly (e.g. checking spelling, attaching CV as PDF)"),
});

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are a professional career assistant that writes high-quality job-related emails.

Your goal is to generate emails that sound natural, polite, and professional — as if written by a real person, not AI.

Rules:
- Use clear, simple, professional English
- Avoid robotic or overly formal phrases
- Do NOT use clichés like "I am writing to express my interest" unless rewritten naturally
- Keep sentences smooth and conversational but still professional
- Tailor tone based on the user's experience level (especially for entry-level candidates)
- If the user has no experience, highlight willingness to learn, reliability, and attitude
- Keep emails concise and easy to read
- Always structure emails properly: Greeting, Opening, Body, Closing, Signature

Formatting rules:
- Always include proper spacing (line breaks)
- Make the email ready to copy and paste into Gmail or Outlook
- Avoid placeholders if you can naturally integrate the inputs provided (Job Title, Company Name)

Context:
- Many users are from South Africa and may be applying for entry-level jobs, internships, or general work
- Focus on helping them sound confident and professional, even with limited experience

Tone Instructions:
- Adjust wording and phrasing to exactly reflect the selected tone.

Important Feature:
- Personalise the email with the given company name and job title in a natural, seamless way.`;

export async function POST(req: Request) {
  const locale = getRequestLocale(req);
  const copy = getEmailTemplateApiCopy(locale);

  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: copy.apiMissing }, { status: 500 });
    }

    const session = await auth();
    const userId = session?.user?.id;

    const json = await req.json();
    const data = InputSchema.parse(json);

    const typeLabels = copy.typeLabels as Record<string, string>;
    const experienceLabels = copy.experienceLabels as Record<string, string>;
    const toneLabels = copy.toneLabels as Record<string, string>;
    const typeLabel = typeLabels[data.emailType] ?? data.emailType;
    const expLabel = experienceLabels[data.experienceLevel] ?? data.experienceLevel;
    const toneLabel = toneLabels[data.tone] ?? data.tone;

    const userPrompt = `Based on the following user details:

Email Type: ${typeLabel}
Job Title: ${data.jobTitle}
Company Name: ${data.companyName}
Experience Level: ${expLabel}
Tone: ${toneLabel}
Length Preference: ${data.length}
User Name: ${data.userName}

Generate a complete job-related email pack.

Requirements:
1. Provide 3 strong, relevant subject line options.
2. Write TWO versions of the email:
   - A short version (basic, concise, 5-7 lines max)
   - A detailed version (expanded slightly with more context)
3. Adjust tone based on the user's choice and experience level.
4. Keep the email natural and realistic (not robotic).
5. Make sure the email is easy to read and ready to send.
6. Provide 2-3 quick tips for sending this email properly.${copy.outputLanguageInstruction}`;

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
        toolType: "email_template",
        inputData: data as never,
        outputData: object as never,
        isPaid: !pricingEnabled,
      }
    });

    return NextResponse.json({ id: generation.id });
  } catch (error) {
    console.error("[generate-email]", error);
    return NextResponse.json({ error: copy.failedGenerate }, { status: 500 });
  }
}
