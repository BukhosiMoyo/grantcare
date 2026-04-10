export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function assertDatabaseConfigured() {
  if (!isDatabaseConfigured()) {
    throw new Error("DATABASE_URL is not configured.");
  }
}

export function isProductionServer() {
  return process.env.NODE_ENV === "production";
}

export function isAuthSecretConfigured() {
  return Boolean(process.env.AUTH_SECRET);
}

export function isSiteUrlConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SITE_URL);
}

export function isReminderEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.REMINDER_FROM_EMAIL);
}

export function getCronSecret() {
  return process.env.CRON_SECRET ?? "";
}

export function canRunReminderProcessing() {
  return (
    isDatabaseConfigured() &&
    isAuthSecretConfigured() &&
    isSiteUrlConfigured() &&
    isReminderEmailConfigured()
  );
}

export function getLaunchReadiness() {
  return [
    { key: "DATABASE_URL", label: "Database", ready: isDatabaseConfigured() },
    { key: "AUTH_SECRET", label: "Auth secret", ready: isAuthSecretConfigured() },
    { key: "NEXT_PUBLIC_SITE_URL", label: "Site URL", ready: isSiteUrlConfigured() },
    { key: "RESEND_API_KEY", label: "Reminder email", ready: isReminderEmailConfigured() },
    { key: "CRON_SECRET", label: "Cron secret", ready: Boolean(getCronSecret()) },
  ];
}
