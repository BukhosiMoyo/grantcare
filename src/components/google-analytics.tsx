"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { getPublicAnalyticsUrl, isPublicAnalyticsPath } from "@/lib/public-analytics";

const GOOGLE_ANALYTICS_ID = "G-TBHC3MZHGN";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    "ga-disable-G-TBHC3MZHGN"?: boolean;
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const configured = useRef(false);
  const previousPage = useRef<string | undefined>(undefined);
  const publicPath = isPublicAnalyticsPath(pathname);

  useEffect(() => {
    const productionHost = window.location.hostname === "grantcare.co.za";
    window["ga-disable-G-TBHC3MZHGN"] = !publicPath || !productionHost;
    if (!publicPath) previousPage.current = undefined;
    if (!ready || !publicPath || !productionHost) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      // gtag consumes the standard arguments object, not a data-layer array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    if (!configured.current) {
      window.gtag("js", new Date());
      window.gtag("config", GOOGLE_ANALYTICS_ID, {
        send_page_view: false,
        page_location: getPublicAnalyticsUrl(window.location.href, window.location.origin),
        page_referrer: getPublicAnalyticsUrl(document.referrer, window.location.origin) ?? "",
      });
      configured.current = true;
    }
    if (previousPage.current === pathname) return;

    window.gtag("event", "page_view", {
      page_location: getPublicAnalyticsUrl(window.location.href, window.location.origin),
      page_path: pathname,
      page_title: document.title,
      page_referrer: previousPage.current
        ? new URL(previousPage.current, window.location.origin).toString()
        : getPublicAnalyticsUrl(document.referrer, window.location.origin) ?? "",
    });
    previousPage.current = pathname;
  }, [pathname, publicPath, ready]);

  if (!publicPath) return null;

  return (
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      />
  );
}
