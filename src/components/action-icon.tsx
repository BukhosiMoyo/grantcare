import { Bookmark, CalendarDays, CircleCheck, ClipboardList, Compass, ExternalLink, FileText, MapPin, Phone, Mail, ShieldCheck, User, Wallet } from "@/components/lucide-icons";

/** A meaningful default for shared navigation buttons; callers can supply their own. */
export function ActionIcon({ href, className = "action-icon" }: { href?: string; className?: string }) {
  const path = href ?? "";
  const Icon = /^tel:/.test(path) ? Phone : /^mailto:/.test(path) ? Mail : /^https?:/.test(path) ? ExternalLink
    : /payment-dates|december-schedule/.test(path) ? CalendarDays : /sassa-office-locator/.test(path) ? MapPin
    : /eligibility|claim-checker/.test(path) ? ShieldCheck : /status/.test(path) ? ClipboardList
    : /sign-in|sign-up|dashboard|account/.test(path) ? User : /guides/.test(path) ? Bookmark
    : /grant-amounts/.test(path) ? Wallet : /grants|news/.test(path) ? FileText : path.startsWith("#") ? Compass : CircleCheck;
  return <Icon className={className} />;
}
