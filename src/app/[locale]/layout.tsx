import { notFound } from "next/navigation";
import { Manrope } from "next/font/google";
import "../globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { GoogleAnalytics } from "@/components/google-analytics";
import { SiteSchema } from "@/components/site-schema";
import { getPublicLocales, isPublicLocale, type Locale } from "@/lib/site";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
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
      className={bodyFont.variable}
    >
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">{locale === "zu" ? "Yeqa uye kokuqukethwe" : "Skip to content"}</a>
        <SiteSchema locale={locale} />
        <GoogleAnalytics />
        <div className="flex min-h-screen flex-col" data-locale={locale}>
          <SiteHeader locale={locale as Locale} />
          <main id="main-content" className="shell site-main" tabIndex={-1}>{children}</main>
          <SiteFooter locale={locale as Locale} />
        </div>
      </body>
    </html>
  );
}
