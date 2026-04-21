import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AdminNav } from "@/components/admin-nav";
import { requireAdmin } from "@/lib/auth-guards";
import { buildLocalePath, isLocale, type Locale } from "@/lib/site";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  await requireAdmin(locale as Locale, buildLocalePath(locale as Locale, "/admin"));

  return (
    <div className="space-y-6">
      <AdminNav locale={locale as Locale} />
      {children}
    </div>
  );
}
