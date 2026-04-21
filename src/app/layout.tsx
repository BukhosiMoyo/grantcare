import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Noto_Sans } from "next/font/google";
import "./globals.css";

import { GoogleAnalytics } from "@/components/google-analytics";
import { SiteSchema } from "@/components/site-schema";
import { getSiteUrl } from "@/lib/site-url";
import { DEFAULT_LOCALE } from "@/lib/site";

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
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "GrantCare",
    template: "%s | GrantCare",
  },
  description:
    "Independent SASSA grant help for payment dates, status checks, eligibility, reminders, and official contact routes in South Africa.",
  applicationName: "GrantCare",
  icons: {
    shortcut: [{ url: "/favicon.ico", sizes: "any" }],
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#174c3c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={DEFAULT_LOCALE}
      data-scroll-behavior="smooth"
      className={`${bodyFont.variable} ${monoFont.variable}`}
    >
      <body suppressHydrationWarning>
        <SiteSchema />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
