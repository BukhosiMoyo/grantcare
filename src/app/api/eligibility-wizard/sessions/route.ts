import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { getEligibilityResult } from "@/lib/eligibility-wizard";
import { isLocale } from "@/lib/site";

const RequestSchema = z.object({
  answers: z.record(z.string(), z.string()),
  completedKeys: z.array(z.string()).default([]),
});

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const localeHeader = req.headers.get("x-grantcare-locale");
  const locale = localeHeader && isLocale(localeHeader) ? localeHeader : "en";
  const body = RequestSchema.parse(await req.json());
  const result = getEligibilityResult(body.answers, locale);

  const generation = await db.toolGeneration.create({
    data: {
      userId: session.user.id,
      toolType: "eligibility_wizard",
      inputData: {
        locale,
        answers: body.answers,
      },
      outputData: {
        result,
        completedKeys: body.completedKeys,
      },
      isPaid: true,
    },
  });

  return NextResponse.json({ id: generation.id });
}

