import { readFile } from "node:fs/promises";
import process from "node:process";

import { loadEnvConfig } from "@next/env";

import { syncPaymentPeriod, type PaymentPeriodSyncInput } from "../src/lib/publishing";

loadEnvConfig(process.cwd());

async function readInput(pathArg?: string) {
  if (!pathArg || pathArg === "-") {
    const chunks: Buffer[] = [];

    for await (const chunk of process.stdin) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }

    return Buffer.concat(chunks).toString("utf8");
  }

  return readFile(pathArg, "utf8");
}

async function main() {
  const raw = await readInput(process.argv[2]);
  const input = JSON.parse(raw) as PaymentPeriodSyncInput;
  const result = await syncPaymentPeriod(input);
  console.log(JSON.stringify({ ok: true, result }, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
