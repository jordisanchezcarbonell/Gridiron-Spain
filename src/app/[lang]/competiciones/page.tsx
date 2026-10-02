import type { Metadata } from "next";
import Link from "next/link";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { t } from "@/lib/i18n/text";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";

export async function generateMetadata({ params }: PageProps<"/[lang]/competiciones">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, title: dict.competitions.title, description: dict.competitions.intro, routeKey: "competitions" });
}

export default async function CompetitionsPage({ params }: PageProps<"/[lang]/competiciones">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const competitions = await getRepository().getCompetitions();
  const groups: Array<{ key: string; title: string; items: typeof competitions }> = [
    { key: "national", title: locale === "es" ? "España" : "Spain", items: competitions.filter((c) => c.country === "ES" && c.status === "active") },
    { key: "europe", title: locale === "es" ? "Europa" : "Europe", items: competitions.filter((c) => c.country !== "ES" && c.country !== "US" && c.status === "active") },
    { key: "us", title: locale === "es" ? "Estados Unidos" : "United States", items: competitions.filter((c) => c.country === "US") },
    { key: "historical", title: locale === "es" ? "Históricas" : "Historical", items: competitions.filter((c) => c.status === "historical") },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.common.breadcrumbHome, url: href(locale, "home") },
          { name: dict.nav.competitions, url: href(locale, "competitions") },
        ])}
      />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink-2" />
        <div aria-hidden className="pointer-events-none absolute inset-0 grain" />
        <div aria-hidden className="pointer-events-none absolute inset-0 yardlines opacity-15" />

        <div className="container-content relative py-12 md:py-16 lg:py-20">
          <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.nav.competitions }]} />

          {/* Kicker */}
          <div className="mb-6 mt-6 inline-flex items-center">
            <span className="flex h-7 items-center bg-accent px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white">
              {dict.nav.competitions}
            </span>
            <div className="h-7 w-10 bg-gradient-to-r from-accent/60 to-transparent" />
          </div>

          <h1 className="display display-lg max-w-4xl">{dict.competitions.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper-2">{dict.competitions.intro}</p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap gap-8">
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 h-full w-1 bg-accent" />
              <span className="block font-display text-4xl font-black leading-none text-paper">{competitions.filter((c) => c.status === "active").length}</span>
              <span className="mt-1 block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                {locale === "es" ? "competiciones activas" : "active competitions"}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
      </section>

      <div className="container-content space-y-14 py-12 md:py-14">
        {groups
          .filter((g) => g.items.length > 0)
          .map((group) => (
            <section key={group.key} aria-labelledby={`group-${group.key}`}>
              <header className="mb-6">
                <div className="inline-flex items-center">
                  <span className="flex h-8 items-center bg-surface-2 px-3 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-paper">
                    {group.title}
                  </span>
                </div>
              </header>
              <ul className="grid gap-5 md:grid-cols-2">
                {group.items.map((c) => (
                  <li key={c.id}>
                    <Link href={href(locale, "competitions", c.slug)} className="group flex h-full flex-col gap-3 border border-line bg-surface p-5 transition-colors hover:border-accent">
                      <div className="flex items-start justify-between gap-3"><Badge tone="gold">{dict.levels[c.level]}</Badge></div>
                      <h3 className="font-display text-2xl font-extrabold uppercase leading-none text-paper transition-colors group-hover:text-accent">
                        {c.name}
                      </h3>
                      <p className="text-sm text-muted">
                        {c.organizer}
                        {c.foundedYear ? ` · ${c.foundedYear}` : ""}
                        {c.endedYear ? `–${c.endedYear}` : ""} · {dict.discipline[c.discipline]}
                      </p>
                      <p className="line-clamp-3 text-sm text-paper-2">{t(c.description, locale)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
      </div>
    </>
  );
}
