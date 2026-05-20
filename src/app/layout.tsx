import type { Metadata, Viewport } from "next";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "GrantCare",
    template: "%s | GrantCare",
  },
  description:
    "Independent SASSA grant help for payment dates, status checks, eligibility, reminders, and official contact routes in South Africa.",
  applicationName: "GrantCare",
  icons: {
    shortcut: [{ url: "/favicon.ico", sizes: "any" }],
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#174c3c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
