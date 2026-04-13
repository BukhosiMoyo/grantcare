import { buildSitemapXml, getSitemapEntries } from "@/lib/sitemap";

export const revalidate = 3600;

export async function GET() {
  const entries = await getSitemapEntries();
  const xml = buildSitemapXml(entries);

  return new Response(xml, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
