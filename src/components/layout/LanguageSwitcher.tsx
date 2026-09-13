"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/types/common";
import { locales, localeLabels } from "@/lib/i18n/config";
import { translatePathname } from "@/lib/i18n/routes";
import { cx } from "@/lib/utils";

/** Segmented ES | EN control; the current locale is highlighted. */
export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() ?? `/${locale}`;

  return (
    <nav aria-label={label} className="flex overflow-hidden rounded-sm border border-line-strong font-mono text-[0.7rem] uppercase tracking-[0.14em]">
      {locales.map((target) => {
        const active = target === locale;
        return (
          <Link
            key={target}
            href={translatePathname(pathname, target)}
            hrefLang={target}
            lang={target}
            aria-current={active ? "true" : undefined}
            aria-label={localeLabels[target]}
            title={localeLabels[target]}
            onClick={() => {
              document.cookie = `gs-locale=${target}; path=/; max-age=31536000; samesite=lax`;
            }}
            className={cx(
              "px-2.5 py-1.5 transition-colors",
              active ? "bg-gold text-ink" : "text-muted hover:bg-surface-2 hover:text-paper",
            )}
          >
            {target}
          </Link>
        );
      })}
    </nav>
  );
}
