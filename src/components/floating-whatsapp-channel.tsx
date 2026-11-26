"use client";

import { usePathname } from "next/navigation";
import { X } from "@/components/lucide-icons";
import { useState } from "react";
import { WhatsAppIcon, getWhatsAppChannelCopy } from "@/components/whatsapp-channel";
import { WHATSAPP_CHANNEL } from "@/lib/official-resources";
import { isPublicAnalyticsPath } from "@/lib/public-analytics";
import { stripLocaleFromPathname, type Locale } from "@/lib/site";

export function FloatingWhatsAppChannel({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  if (!pathname || dismissed || !isPublicAnalyticsPath(pathname) || stripLocaleFromPathname(pathname).startsWith("/interests")) return null;
  const copy = getWhatsAppChannelCopy(locale);

  return (
    <aside aria-label={copy.channel} data-floating-whatsapp className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex max-w-[calc(100vw-2rem)] items-center gap-1 rounded-full border border-white/20 bg-primary text-white shadow-lg print:hidden">
      <a href={WHATSAPP_CHANNEL.href} target="_blank" rel="noopener noreferrer" aria-label={locale === "en" ? "Join our WhatsApp channel" : copy.updates} className="focus-ring flex min-h-12 items-center gap-2 rounded-full py-3 pl-4 pr-2 text-base font-semibold !text-white transition-colors hover:bg-primary-strong">
        <WhatsAppIcon className="h-5 w-5" />
        <span className="text-sm sm:text-base">{locale === "en" ? <><span className="sm:hidden">Join WhatsApp channel</span><span className="hidden sm:inline">Join our WhatsApp channel</span></> : copy.updates}</span>
      </a>
      <button type="button" onClick={() => setDismissed(true)} aria-label={locale === "en" ? "Dismiss WhatsApp channel invitation" : copy.channel + " ×"} className="focus-ring mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full !text-white transition-colors hover:bg-primary-strong">
        <X className="h-5 w-5" />
      </button>
    </aside>
  );
}
