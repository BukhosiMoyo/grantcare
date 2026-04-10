import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  DEFAULT_LOCALE,
  LEGACY_LOCALE_COOKIE_NAME,
  LOCALE_COOKIE_NAME,
  isLocale,
} from "@/lib/site";

export default async function RootPage() {
  const cookieStore = await cookies();
  const preferredLocale =
    cookieStore.get(LOCALE_COOKIE_NAME)?.value ??
    cookieStore.get(LEGACY_LOCALE_COOKIE_NAME)?.value;
  const locale = isLocale(preferredLocale) ? preferredLocale : DEFAULT_LOCALE;

  redirect(`/${locale}`);
}
