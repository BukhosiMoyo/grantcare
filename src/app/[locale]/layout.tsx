import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
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
    <div className="flex min-h-screen flex-col" data-locale={locale}>
      <SiteHeader locale={locale as Locale} />
      <main className="shell flex flex-1 flex-col gap-12 py-6 sm:py-10">{children}</main>
      <SiteFooter locale={locale as Locale} />
    </div>
  );
}
