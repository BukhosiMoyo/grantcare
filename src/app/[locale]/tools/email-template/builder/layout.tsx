import Link from "next/link";
import { notFound } from "next/navigation";
import { buildLocalePath, isLocale } from "@/lib/site";

/**
 * Immersive builder layout — hides site header & footer
 * to create a full-screen, Typeform-style experience.
 */
export default async function BuilderLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  return (
    <div className="builder-shell" data-locale={locale}>
      {/* Minimal branding — logo links back to landing */}
      <header className="builder-header">
        <Link href={buildLocalePath(locale, "/tools/email-template")} className="builder-logo">
          GrantCare
        </Link>
      </header>
      <div className="builder-body">
        {children}
      </div>
    </div>
  );
}
