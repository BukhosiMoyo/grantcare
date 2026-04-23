import Link from "next/link";
import { notFound } from "next/navigation";
import { buildLocalePath, isLocale } from "@/lib/site";

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
      <header className="builder-header">
        <Link href={buildLocalePath(locale, "/tools/sassa-appeal")} className="builder-logo">
          GrantCare
        </Link>
      </header>
      <div className="builder-body flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
