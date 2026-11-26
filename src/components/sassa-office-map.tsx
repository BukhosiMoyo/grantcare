"use client";

import { ExternalLink, MapPin } from "@/components/lucide-icons";
import { getOfficeMapEmbedUrl, getOfficeOpenMapUrl } from "@/lib/office-map";
import type { SassaOfficeSearchResult } from "@/lib/sassa-offices";

export function SassaOfficeMap({offices,selectedSlug}:{offices:SassaOfficeSearchResult[];selectedSlug?:string}) {
  const office=offices.find(entry=>entry.slug===selectedSlug)??offices[0];
  const embedUrl=office?getOfficeMapEmbedUrl(office):null;
  const mapUrl=office?getOfficeOpenMapUrl(office):null;
  if(!office || !embedUrl) return <div className="rounded-2xl border border-border bg-surface p-6 text-base text-muted" role="status">Choose a location with available map coordinates.</div>;
  return (
    <section aria-label="Selected office map" className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm" data-office-map>
      <div className="flex items-start gap-3 border-b border-border p-4 sm:p-5">
        <span className="rounded-xl bg-surface-strong p-2.5 text-primary"><MapPin className="h-5 w-5" /></span>
        <div className="min-w-0"><h2 className="text-lg font-semibold">{office.name}</h2><p className="mt-1 text-base text-muted">{office.city}, {office.province}</p></div>
      </div>
      <iframe key={office.slug} title={`Map: ${office.name}, ${office.city}`} src={embedUrl} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="block h-80 w-full border-0 sm:h-[26rem]" allowFullScreen />
      <div className="space-y-3 border-t border-border p-4 sm:p-5">
        <p className="text-base leading-7 text-foreground">{office.address}</p>
        <p className="text-sm leading-6 text-muted">Map pins are approximate. Confirm the office address before travelling.</p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <a href={mapUrl??undefined} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 py-2 text-base font-semibold text-primary hover:bg-surface-muted"><ExternalLink className="h-4 w-4" />Open larger map</a>
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="text-sm text-muted underline underline-offset-4">© OpenStreetMap contributors</a>
        </div>
      </div>
    </section>
  );
}
