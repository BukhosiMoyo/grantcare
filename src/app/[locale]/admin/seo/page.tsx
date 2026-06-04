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

const ZU_SEO_PAGE_COPY: Record<string, string> = {
  "Google Analytics & Performance": "Google Analytics nokusebenza",
  "SEO & Google Search Console": "SEO ne-Google Search Console",
  "Monitor your South African SASSA grant organic search performance directly from the admin dashboard. Analyze keyword visibility, click-through rates, and average rank positions for target audiences.":
    "Qapha ukusebenza kokusesha kwe-organic kwezibonelelo ze-SASSA zaseNingizimu Afrika ngqo kudeshibhodi ye-admin. Hlaziya ukubonakala kwamagama okusesha, amazinga okuchofoza, nezindawo ezimaphakathi zokukleliswa zezethameli eziqondiwe.",
};

function seoPageCopy(locale: Locale, text: string) {
  return locale === "zu" ? (ZU_SEO_PAGE_COPY[text] ?? text) : text;
}

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
        eyebrow={seoPageCopy(locale, "Google Analytics & Performance")}
        title={seoPageCopy(locale, "SEO & Google Search Console")}
      >
        <p className="max-w-3xl text-sm leading-relaxed text-muted">
          {seoPageCopy(locale, "Monitor your South African SASSA grant organic search performance directly from the admin dashboard. Analyze keyword visibility, click-through rates, and average rank positions for target audiences.")}
        </p>
      </Section>

      <SeoDashboard initialConfig={config} locale={locale} />
    </div>
  );
}
