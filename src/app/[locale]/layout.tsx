import { notFound } from "next/navigation";
import { IBM_Plex_Mono, Noto_Sans } from "next/font/google";
import "../globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { GoogleAnalytics } from "@/components/google-analytics";
import { SiteSchema } from "@/components/site-schema";
import { getPublicLocales, isPublicLocale, type Locale } from "@/lib/site";

const bodyFont = Noto_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export function generateStaticParams() {
  return getPublicLocales().map((locale) => ({ locale: locale.code }));
}

export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isPublicLocale(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${bodyFont.variable} ${monoFont.variable}`}
    >
      <body suppressHydrationWarning>
        <SiteSchema locale={locale} />
        <GoogleAnalytics />
        <div className="flex min-h-screen flex-col" data-locale={locale}>
          <SiteHeader locale={locale as Locale} />
          <main className="shell flex flex-1 flex-col gap-12 py-6 sm:py-10">{children}</main>
          <SiteFooter locale={locale as Locale} />
        </div>
      </body>
    </html>
  );
}
