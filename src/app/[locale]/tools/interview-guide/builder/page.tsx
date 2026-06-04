import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/site";
import { BuilderClient } from "./builder-client";
import { getInterviewGuideCopy } from "../copy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) return {};
  const copy = getInterviewGuideCopy(locale);

  return {
    title: copy.builderMetadataTitle,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function BuilderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  return <BuilderClient locale={locale} />;
}
