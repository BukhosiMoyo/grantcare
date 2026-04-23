import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/site";
import { BuilderClient } from "./builder-client";

export const metadata: Metadata = {
  title: "Build Interview Guide",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function BuilderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  return <BuilderClient locale={locale} />;
}
