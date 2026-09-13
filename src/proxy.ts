import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/lib/i18n/config";

function detectLocale(request: NextRequest): string {
  const cookie = request.cookies.get("gs-locale")?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase().slice(0, 2))
    .filter(Boolean);
  for (const lang of preferred) {
    if (lang && isLocale(lang)) return lang;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: [
    // Everything except Next internals, metadata files and static assets.
    "/((?!_next|api|images|fonts|favicon\\.ico|robots\\.txt|sitemap\\.xml|opengraph-image|icon|manifest\\.webmanifest|.*\\..*).*)",
  ],
};
