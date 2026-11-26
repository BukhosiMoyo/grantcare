import assert from "node:assert/strict";
import test from "node:test";

test("interest persistence, deduplication, suppression, reporting and retention", { skip: !process.env.INTEREST_TEST_DATABASE_URL }, async (t) => {
  const url = new URL(process.env.INTEREST_TEST_DATABASE_URL!);
  assert.ok(["localhost", "127.0.0.1"].includes(url.hostname));
  assert.equal(url.pathname, "/grantcare_interest_test", "Database tests may only use the disposable test database.");
  process.env.DATABASE_URL = url.toString();
  process.env.DATABASE_URL_UNPOOLED = url.toString();
  process.env.AUTH_SECRET = "disposable-interest-test-secret-not-for-production";
  const { db } = await import("../src/lib/prisma");
  const { saveInterest, withdrawInterest, changeInterestStatus, getInterestReport, cleanupInterests, InterestRateLimitError } = await import("../src/lib/interests");
  const input = { topic: "bank_account" as const, contactChannel: "email" as const, contactValue: "interest-test@example.invalid", sourcePath: "/guides/how-to-use-sassa-status-check-for-r350" };
  try {
    let code = "";
    await t.test("concurrent resubmissions create one record and one withdrawal receipt", async () => {
      const replies = await Promise.all([0, 1, 2].map((i) => saveInterest(input, `test-network-${i}`)));
      assert.equal(await db.interestLead.count(), 1);
      assert.equal(replies.filter((reply) => reply.withdrawalCode).length, 1);
      code = replies.find((reply) => reply.withdrawalCode)!.withdrawalCode!;
      const lead = await db.interestLead.findFirstOrThrow();
      assert.equal(lead.status, "new");
      assert.equal(lead.confirmedAt, null);
      assert.notEqual(lead.withdrawalHash, code);
      assert.match(lead.consentText, /not be shared/);
    });
    await t.test("personal confirmation is separate from a submission", async () => {
      const lead = await db.interestLead.findFirstOrThrow();
      await changeInterestStatus(lead.id, "confirmed", "test-admin");
      const updated = await db.interestLead.findUniqueOrThrow({ where: { id: lead.id } });
      assert.ok(updated.confirmedAt);
      assert.equal(updated.confirmedBy, "test-admin");
      assert.equal((await getInterestReport()).confirmed, 1);
    });
    await t.test("withdrawal erases the contact and cannot be reversed by replaying a form", async () => {
      assert.equal(await withdrawInterest(code), 1);
      const record = await db.interestLead.findFirstOrThrow();
      assert.equal(record.contactValue, "");
      assert.equal((await changeInterestStatus(record.id, "confirmed", "test-admin")).count, 0);
      assert.equal((await saveInterest(input, "test-network-new")).withdrawalCode, null);
      assert.equal((await getInterestReport()).submitted, 0);
      assert.equal(await withdrawInterest(code), 0);
    });
    await t.test("repeat contact submissions are rate limited", async () => {
      await saveInterest(input, "test-network-last");
      await assert.rejects(() => saveInterest(input, "test-network-limit"), InterestRateLimitError);
    });
    await t.test("expiry cleanup deletes expired records and counters", async () => {
      await db.interestLead.updateMany({ data: { expiresAt: new Date(0) } });
      await db.interestRateLimit.updateMany({ data: { expiresAt: new Date(0) } });
      const result = await cleanupInterests();
      assert.equal(result.expiredInterests, 1);
      assert.equal(await db.interestLead.count(), 0);
      assert.equal(await db.interestRateLimit.count(), 0);
    });
  } finally { await db.$disconnect(); }
});
