import Link from "next/link";
import type { Locale } from "@/types/common";
import type { Dictionary } from "@/dictionaries/es";
import { href } from "@/lib/i18n/routes";
import { site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const sections = [
    { href: href(locale, "history"), label: dict.nav.history },
    { href: href(locale, "teams"), label: dict.nav.teams },
    { href: href(locale, "map"), label: dict.nav.map },
    { href: href(locale, "nearYou"), label: dict.nav.nearYou },
    { href: href(locale, "guide"), label: dict.nav.guide },
    { href: href(locale, "articles"), label: dict.nav.stories },
    { href: href(locale, "competitions"), label: dict.nav.competitions },
    { href: href(locale, "agenda"), label: dict.nav.agenda },
    { href: href(locale, "rankings"), label: dict.nav.rankings },
    { href: href(locale, "players"), label: dict.nav.players },
    { href: href(locale, "nationalTeam"), label: dict.nav.nationalTeam },
  ];
  const project = [
    { href: href(locale, "roadToAnnapolis"), label: dict.nav.road },
    { href: href(locale, "about"), label: dict.nav.about },
    { href: href(locale, "mediaKit"), label: dict.nav.mediaKit },
  ];
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-line bg-ink-2 md:mt-28">
      {/* Accent bar */}
      <div className="h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />

      <div className="container-content grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:py-16">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">{dict.site.tagline}</p>
          <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-muted-2">{dict.footer.made}</p>
        </div>
        <FooterColumn title={dict.footer.sections} items={sections} />
        <FooterColumn title={dict.footer.project} items={project} />
        <div>
          <p className="mb-4 font-mono text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted">{dict.footer.contact}</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href={site.author.url} className="text-paper-2 transition-colors hover:text-accent" rel="noopener noreferrer">
                jordisanchezweb.es
              </a>
            </li>
            <li className="text-muted">{site.author.city}</li>
            <li className="flex items-center gap-3 pt-3">
              <a href={`/${locale}/feed.xml`} className="flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.18 15.64a2.18 2.18 0 1 1 0 4.36 2.18 2.18 0 0 1 0-4.36M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27zm0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93z" />
                </svg>
                {dict.feed.rss}
              </a>
              <a href={`/${locale}/feed.json`} className="flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 3h2v2H5v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5h2v2H5c-1.07-.27-2-.9-2-2v-4a2 2 0 0 0-2-2H0v-2h1a2 2 0 0 0 2-2V5a2 2 0 0 1 2-2m14 0a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1v2h-1a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2v-2h2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5h-2V3z" />
                </svg>
                {dict.feed.json}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-content flex flex-col gap-4 py-6 md:flex-row md:items-start md:justify-between">
          <p className="max-w-2xl text-xs leading-relaxed text-muted-2">{dict.footer.disclaimer}</p>
          <p className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-2">
            © {year} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: Array<{ href: string; label: string }> }) {
  return (
    <div>
      <p className="mb-4 font-mono text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted">{title}</p>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-paper-2 transition-colors hover:text-accent">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
