import Link from "next/link";
import type { Locale } from "@/types/common";
import type { Dictionary } from "@/dictionaries/es";
import { href } from "@/lib/i18n/routes";
import { Wordmark } from "./Wordmark";
import { MobileNav } from "./MobileNav";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items = [
    { href: href(locale, "history"), label: dict.nav.history },
    { href: href(locale, "teams"), label: dict.nav.teams },
    { href: href(locale, "map"), label: dict.nav.map },
    { href: href(locale, "articles"), label: dict.nav.stories },
    { href: href(locale, "competitions"), label: dict.nav.competitions },
    { href: href(locale, "roadToAnnapolis"), label: dict.nav.road, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur supports-[backdrop-filter]:bg-ink/70">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-sm focus:bg-gold focus:px-3 focus:py-2 focus:text-ink"
      >
        {dict.nav.skipToContent}
      </a>
      <div className="container-content flex h-16 items-center justify-between gap-6">
        <Link href={href(locale, "home")} className="flex items-center gap-3" aria-label={dict.site.name}>
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                item.highlight
                  ? "font-display text-sm font-bold uppercase tracking-[0.1em] text-gold hover:text-gold-2"
                  : "font-display text-sm font-bold uppercase tracking-[0.1em] text-paper-2 hover:text-gold"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} label={dict.nav.switchLanguage} />
          <MobileNav
            items={[
              ...items,
              { href: href(locale, "guide"), label: dict.nav.guide },
              { href: href(locale, "nearYou"), label: dict.nav.nearYou },
              { href: href(locale, "about"), label: dict.nav.about },
              { href: href(locale, "mediaKit"), label: dict.nav.mediaKit },
            ]}
            openLabel={dict.nav.menu}
            closeLabel={dict.nav.close}
          />
        </div>
      </div>
    </header>
  );
}
