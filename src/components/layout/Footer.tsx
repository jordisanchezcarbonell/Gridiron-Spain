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
    { href: href(locale, "articles"), label: dict.nav.stories },
    { href: href(locale, "competitions"), label: dict.nav.competitions },
  ];
  const project = [
    { href: href(locale, "roadToAnnapolis"), label: dict.nav.road },
    { href: href(locale, "about"), label: dict.nav.about },
    { href: href(locale, "mediaKit"), label: dict.nav.mediaKit },
  ];
  const year = new Date().getFullYear();

  return (
    <footer className="rule mt-24 bg-ink-2">
      <div className="container-content grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-sm text-sm text-muted">{dict.site.tagline}</p>
          <p className="mt-3 text-sm text-muted-2">{dict.footer.made}</p>
        </div>
        <FooterColumn title={dict.footer.sections} items={sections} />
        <FooterColumn title={dict.footer.project} items={project} />
        <div>
          <p className="kicker mb-4 text-muted-2">{dict.footer.contact}</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={site.author.url} className="text-paper-2 hover:text-gold" rel="noopener noreferrer">
                jordisanchezweb.es
              </a>
            </li>
            <li className="text-muted">{site.author.city}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-content flex flex-col gap-3 py-6 text-xs text-muted-2">
          <p className="max-w-3xl">{dict.footer.disclaimer}</p>
          <p>
            © {year} {site.name}.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: Array<{ href: string; label: string }> }) {
  return (
    <div>
      <p className="kicker mb-4 text-muted-2">{title}</p>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-paper-2 hover:text-gold">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
