import { notFound } from "next/navigation";
import "../fonts.css";
import "../globals.css";

import { FloatingWhatsAppChannel } from "@/components/floating-whatsapp-channel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { GoogleAnalytics } from "@/components/google-analytics";
import { SiteSchema } from "@/components/site-schema";
import { getPublicLocales, isPublicLocale, type Locale } from "@/lib/site";


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
      className="grantcare-font"
    >
      <head><link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">{locale === "zu" ? "Yeqa uye kokuqukethwe" : "Skip to content"}</a>
        <SiteSchema locale={locale} />
        <GoogleAnalytics />
        <div className="flex min-h-screen flex-col" data-locale={locale}>
          <SiteHeader locale={locale as Locale} />
          <main id="main-content" className="shell site-main" tabIndex={-1}>{children}</main>
          <SiteFooter locale={locale as Locale} />
          <FloatingWhatsAppChannel locale={locale as Locale} />
        </div>
      </body>
    </html>
  );
}
