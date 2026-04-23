import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  DEFAULT_LOCALE,
  PUBLIC_LOCALE_PREFIX_ENABLED,
  getInternalLocalePath,
  isLocale,
  stripLocaleFromPathname,
} from "@/lib/site";

function getPathSegments(pathname: string) {
  return pathname.split("/").filter(Boolean);
}

export function proxy(request: NextRequest) {
  if (PUBLIC_LOCALE_PREFIX_ENABLED) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const firstSegment = getPathSegments(pathname)[0];

  if (firstSegment && isLocale(firstSegment)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = stripLocaleFromPathname(pathname);

    return NextResponse.redirect(redirectUrl, 308);
  }

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = getInternalLocalePath(DEFAULT_LOCALE, pathname);

  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|manifest.json|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
