import type { SVGProps } from "react";

export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M8 2v4M16 2v4M3 9h18" />
      <rect x="3" y="4.5" width="18" height="16.5" rx="3" />
    </svg>
  );
}

export function StatusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M6 12h12M6 7h12M6 17h7" />
      <rect x="3" y="3" width="18" height="18" rx="4" />
    </svg>
  );
}

export function CompassIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Z" />
      <path d="m15.8 8.2-2.4 7.2-7.2 2.4 2.4-7.2 7.2-2.4Z" />
    </svg>
  );
}

export function BellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M6 17h12l-1.2-1.4A3 3 0 0 1 16 13.7V10a4 4 0 1 0-8 0v3.7a3 3 0 0 1-.8 1.9L6 17Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}
