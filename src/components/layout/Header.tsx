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
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur-md supports-[backdrop-filter]:bg-ink/80">
      {/* Broadcast-style accent bar at top */}
      <div className="h-0.5 bg-gradient-to-r from-accent via-accent to-transparent" />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-accent focus:px-3 focus:py-2 focus:text-white"
      >
        {dict.nav.skipToContent}
      </a>
      <div className="container-content flex h-14 items-center justify-between gap-4 md:h-16">
        <Link href={href(locale, "home")} className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-center lg:flex">
          <div className="flex items-center">
            {items.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 font-display text-[0.8125rem] font-bold uppercase tracking-[0.08em] transition-colors ${
                  item.highlight
                    ? "text-accent hover:text-accent-bright"
                    : "text-paper-2 hover:text-paper"
                } ${i === 0 ? "" : "before:absolute before:left-0 before:top-1/2 before:h-3 before:-translate-y-1/2 before:w-px before:bg-line"}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-2">
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
