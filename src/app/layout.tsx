import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { IBM_Plex_Mono, Noto_Sans } from "next/font/google";
import "./globals.css";

import { SITE_URL } from "@/lib/site";
import {
  DEFAULT_LOCALE,
  LEGACY_LOCALE_COOKIE_NAME,
  LOCALE_COOKIE_NAME,
  isLocale,
} from "@/lib/site";

const bodyFont = Noto_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GrantCare",
    template: "%s | GrantCare",
  },
  description:
    "Independent grant-help platform for payment dates, status guidance, eligibility help, reminders, and multilingual support.",
  applicationName: "GrantCare",
  icons: {
    shortcut: [{ url: "/favicon.png", type: "image/png" }],
    icon: [{ url: "/grantcare-icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#174c3c",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const localePreference =
    cookieStore.get(LOCALE_COOKIE_NAME)?.value ??
    cookieStore.get(LEGACY_LOCALE_COOKIE_NAME)?.value;
  const htmlLang = isLocale(localePreference) ? localePreference : DEFAULT_LOCALE;

  return (
    <html
      lang={htmlLang}
      data-scroll-behavior="smooth"
      className={`${bodyFont.variable} ${monoFont.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
