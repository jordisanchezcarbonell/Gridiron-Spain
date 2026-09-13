"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/types/common";
import { translatePathname } from "@/lib/i18n/routes";

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() ?? `/${locale}`;
  const target: Locale = locale === "es" ? "en" : "es";
  const targetHref = translatePathname(pathname, target);

  return (
    <Link
      href={targetHref}
      hrefLang={target}
      lang={target}
      aria-label={`${label}: ${target === "es" ? "Español" : "English"}`}
      onClick={() => {
        document.cookie = `gs-locale=${target}; path=/; max-age=31536000; samesite=lax`;
      }}
      className="rounded-sm border border-line-strong px-2.5 py-1 font-mono text-xs uppercase tracking-[0.14em] text-muted hover:border-gold hover:text-gold"
    >
      {target}
    </Link>
  );
}
