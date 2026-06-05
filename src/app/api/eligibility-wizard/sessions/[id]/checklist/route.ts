import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";

const RequestSchema = z.object({
  completedKeys: z.array(z.string()),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const { id } = await params;
  const body = RequestSchema.parse(await req.json());
  const generation = await db.toolGeneration.findUnique({
    where: { id },
  });

  if (
    !generation ||
    generation.toolType !== "eligibility_wizard" ||
    generation.userId !== session.user.id
  ) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const outputData =
    generation.outputData && typeof generation.outputData === "object" && !Array.isArray(generation.outputData)
      ? generation.outputData
      : {};

  await db.toolGeneration.update({
    where: { id },
    data: {
      outputData: {
        ...outputData,
        completedKeys: body.completedKeys,
      },
    },
  });

  return NextResponse.json({ ok: true });
}

