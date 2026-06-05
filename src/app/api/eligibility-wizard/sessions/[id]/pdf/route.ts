import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { getEligibilityAnswerLabel, type EligibilityQuestionKey } from "@/lib/eligibility-wizard";
import { db } from "@/lib/prisma";

type SavedEligibilityOutput = {
  result?: {
    title?: string;
    status?: string;
    reason?: string;
    blockers?: string[];
    checklist?: Array<{ key: string; label: string }>;
  };
  completedKeys?: string[];
};

type SavedEligibilityInput = {
  answers?: Record<string, string>;
};

function cleanPdfText(value: string) {
  return value
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .trim();
}

function wrapLine(line: string, length = 88) {
  const words = line.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;

    if (next.length > length) {
      if (current) {
        lines.push(current);
      }
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines.length > 0 ? lines : [""];
}

function createPdf(lines: string[]) {
  const escapedLines = lines.flatMap((line) => wrapLine(line)).map(cleanPdfText);
  const content = [
    "BT",
    "/F1 11 Tf",
    "14 TL",
    "72 760 Td",
    ...escapedLines.slice(0, 48).map((line) => `(${line}) Tj T*`),
    "ET",
  ].join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${Buffer.byteLength(content, "ascii")} >>\nstream\n${content}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf, "ascii"));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, "ascii");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(pdf, "ascii");
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const { id } = await params;
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

  const input = generation.inputData as SavedEligibilityInput;
  const output = generation.outputData as SavedEligibilityOutput;
  const result = output.result;
  const completedKeys = new Set(output.completedKeys ?? []);

  const lines = [
    "GrantCare Eligibility Summary",
    "",
    `Grant: ${result?.title ?? "Unknown"}`,
    `Result: ${result?.status ?? "unknown"}`,
    result?.reason ? `Reason: ${result.reason}` : "",
    "",
    "Answers",
    ...Object.entries(input.answers ?? {}).map(
      ([key, value]) => `${key}: ${getEligibilityAnswerLabel(key as EligibilityQuestionKey, value)}`,
    ),
    "",
    "Checklist",
    ...((result?.checklist ?? []).map((item) =>
      `${completedKeys.has(item.key) ? "[x]" : "[ ]"} ${item.label}`,
    )),
    "",
    "GrantCare gives general guidance only. SASSA makes the final decision.",
  ].filter(Boolean);

  const pdf = createPdf(lines);

  return new NextResponse(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="grantcare-eligibility-${id}.pdf"`,
    },
  });
}

