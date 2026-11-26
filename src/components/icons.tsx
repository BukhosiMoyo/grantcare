import type { SVGProps } from "react";

// Keep existing callers on the same API while using the Lucide icon family.
export {
  ChevronRight as ArrowRightIcon, Plus as PlusIcon,
  CalendarDays as CalendarIcon, ClipboardList as StatusIcon,
  Compass as CompassIcon, MapPin as MapPinIcon, Bell as BellIcon,
  Bookmark as BookmarkIcon, ExternalLink as LinkIcon, Share2 as ShareIcon,
  User as UserIcon, ShieldCheck as ShieldCheckIcon, FileCheck as FileCheckIcon,
  User as ChildIcon, HeartPulse as HeartPulseIcon, Wallet as WalletIcon,
  Sparkles as SparkIcon, ChevronRight as ChevronRightIcon,
} from "./lucide-icons";

export function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="#4285F4" d="M21.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.4a4.6 4.6 0 0 1-2 3v2.5h3.3c1.9-1.8 3-4.4 3-7.5Z" />
      <path fill="#34A853" d="M12 22c2.7 0 5-0.9 6.7-2.4l-3.3-2.5c-.9.6-2.1 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3v2.6A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.4 14a6 6 0 0 1 0-3.8V7.5H3a10 10 0 0 0 0 9.1l3.4-2.6Z" />
      <path fill="#EA4335" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A9.7 9.7 0 0 0 12 2 10 10 0 0 0 3 7.5l3.4 2.7C7.2 7.8 9.4 5.9 12 5.9Z" />
    </svg>
  );
}
