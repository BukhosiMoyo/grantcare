import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { requireAdmin } from "@/lib/auth-guards";
import { buildLocalePath, isLocale, type Locale } from "@/lib/site";
import { getGscConfig } from "@/lib/google-gsc";
import { SeoDashboard } from "@/components/admin/seo-dashboard";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "SEO & Search Console Admin",
};

interface AdminSeoPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AdminSeoPage({ params }: AdminSeoPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  // Ensure user is an admin
  await requireAdmin(locale as Locale, buildLocalePath(locale as Locale, "/admin/seo"));

  // Fetch initial GSC credentials status
  const config = await getGscConfig();

  return (
    <div className="space-y-6">
      <Section
        eyebrow="Google Analytics & Performance"
        title="SEO & Google Search Console"
      >
        <p className="max-w-3xl text-sm leading-relaxed text-muted">
          Monitor your South African SASSA grant organic search performance directly from the admin dashboard. 
          Analyze keyword visibility, click-through rates, and average rank positions for target audiences.
        </p>
      </Section>

      <SeoDashboard initialConfig={config} />
    </div>
  );
}
