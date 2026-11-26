-- Additive deployment for existing installations; no existing table is changed.
BEGIN;
DO $$ BEGIN
  CREATE TYPE "InterestTopic" AS ENUM ('bank_account', 'mobile_data', 'payment_updates');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE "InterestStatus" AS ENUM ('new', 'contacted', 'confirmed', 'withdrawn');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS "InterestLead" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "topic" "InterestTopic" NOT NULL,
  "contactChannel" TEXT NOT NULL,
  "contactValue" TEXT NOT NULL,
  "contactHash" TEXT NOT NULL,
  "sourcePath" TEXT NOT NULL,
  "consentVersion" TEXT NOT NULL,
  "consentText" TEXT NOT NULL,
  "consentedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "withdrawalHash" TEXT NOT NULL,
  "status" "InterestStatus" NOT NULL DEFAULT 'new',
  "confirmedAt" TIMESTAMP(3),
  "confirmedBy" TEXT,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "InterestLead_withdrawalHash_key" ON "InterestLead"("withdrawalHash");
CREATE UNIQUE INDEX IF NOT EXISTS "InterestLead_contactHash_topic_key" ON "InterestLead"("contactHash", "topic");
CREATE INDEX IF NOT EXISTS "InterestLead_status_createdAt_idx" ON "InterestLead"("status", "createdAt");
CREATE INDEX IF NOT EXISTS "InterestLead_topic_createdAt_idx" ON "InterestLead"("topic", "createdAt");
CREATE INDEX IF NOT EXISTS "InterestLead_expiresAt_idx" ON "InterestLead"("expiresAt");
CREATE TABLE IF NOT EXISTS "InterestRateLimit" (
  "key" TEXT NOT NULL PRIMARY KEY,
  "count" INTEGER NOT NULL DEFAULT 1,
  "expiresAt" TIMESTAMP(3) NOT NULL
);
CREATE INDEX IF NOT EXISTS "InterestRateLimit_expiresAt_idx" ON "InterestRateLimit"("expiresAt");
COMMIT;
