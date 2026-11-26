import assert from "node:assert/strict";
import test from "node:test";
import { csvCell, interestSchema, normalizePhone, safeInterestSource, interestConsentText } from "../src/lib/interest-schema";

const valid = { topic: "bank_account", contactChannel: "phone", contactValue: "082 123 4567", consent: true, website: "", sourcePath: "/guides/how-to-use-sassa-status-check-for-r350" };

test("equivalent South African phone formats produce the same contact", () => {
  for (const value of ["082 123 4567", "+27 (82) 123-4567", "27821234567"]) {
    assert.equal(normalizePhone(value), "+27821234567");
    assert.equal(interestSchema.parse({ ...valid, contactValue: value }).contactValue, "+27821234567");
  }
  for (const value of ["123", "+441234567890", "0821234567<script>"]) assert.equal(interestSchema.safeParse({ ...valid, contactValue: value }).success, false);
});

test("consent is explicit; invalid topics, channels and honeypot submissions are rejected", () => {
  for (const patch of [{ consent: false }, { consent: "true" }, { topic: "loan" }, { contactChannel: "sms" }, { website: "spam" }, { contactValue: "" }]) {
    assert.equal(interestSchema.safeParse({ ...valid, ...patch }).success, false);
  }
});

test("email is validated and normalized without treating it as verified", () => {
  const parsed = interestSchema.parse({ ...valid, contactChannel: "email", contactValue: " Demo@Example.invalid " });
  assert.equal(parsed.contactValue, "demo@example.invalid");
  assert.equal(interestSchema.safeParse({ ...valid, contactChannel: "email", contactValue: "not-an-email" }).success, false);
});

test("source attribution discards personal queries, fragments and untrusted routes", () => {
  assert.equal(safeInterestSource("/payment-dates?email=private@example.invalid#code"), "/payment-dates");
  for (const path of ["https://elsewhere.example/", "//elsewhere.example", "/admin", "/guides/private@example.invalid", "/guides/" + "a".repeat(250), null]) assert.equal(safeInterestSource(path), "/interests");
});

test("permission text is topic and channel specific and excludes partner disclosure", () => {
  assert.match(interestConsentText("payment_updates", "email"), /by email about grant payment updates/);
  assert.match(interestConsentText("bank_account", "phone"), /phone or WhatsApp about bank-account options/);
  assert.match(interestConsentText("bank_account", "phone"), /not be shared.*unless I separately agree/);
});

test("CSV output neutralizes spreadsheet formulas and escapes quotes", () => {
  assert.equal(csvCell('=HYPERLINK("evil")'), '"\'=HYPERLINK(""evil"")"');
  assert.equal(csvCell('a,"b"'), '"a,""b"""');
});
