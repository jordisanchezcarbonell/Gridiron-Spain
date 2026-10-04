import type { Metadata } from "next";
import Link from "next/link";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { buildPalmares, PALMARES_COLUMNS } from "@/lib/palmares";
import { fefaFinalsGaps } from "@/data/history/finals-fefa";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { FinalsTable } from "@/components/history/FinalsTable";
import { SourceList } from "@/components/articles/SourceList";
import type { Final } from "@/types";

const SECTIONS = [
  { id: "lnfa", gapKey: undefined, match: (f: Final) => f.competitionId === "lnfa", label: { es: "LNFA · Spanish Bowl", en: "LNFA · Spanish Bowl" } },
  { id: "copa", gapKey: "copa-espana", match: (f: Final) => f.competitionId === "copa-espana", label: { es: "Copa de España", en: "Copa de España" } },
  { id: "lnfa-2", gapKey: "lnfa-2", match: (f: Final) => f.competitionId === "lnfa-2", label: { es: "LNFA 2", en: "LNFA 2" } },
  { id: "femenina", gapKey: "lnfa-femenina", match: (f: Final) => f.competitionId === "lnfa-femenina", label: { es: "LNFA Femenina", en: "LNFA Femenina" } },
  { id: "flag", gapKey: "spanish-flag-bowl-open", match: (f: Final) => f.competitionId === "spanish-flag-bowl" && f.category === "open", label: { es: "Spanish Flag Bowl Open", en: "Spanish Flag Bowl Open" } },
  { id: "flag-femenina", gapKey: "spanish-flag-bowl-femenina", match: (f: Final) => f.competitionId === "spanish-flag-bowl" && f.category === "femenina", label: { es: "Spanish Flag Bowl Femenina", en: "Spanish Flag Bowl Women" } },
] as const;

export async function generateMetadata({ params }: PageProps<"/[lang]/palmares">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, title: dict.palmares.title, description: dict.palmares.intro, routeKey: "palmares" });
}

export default async function PalmaresPage({ params }: PageProps<"/[lang]/palmares">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const repo = getRepository();
  const [finals, teams] = await Promise.all([repo.getFinals(), repo.getTeams()]);
  const national = finals.filter((f) => SECTIONS.some((s) => s.match(f)));
  const rows = buildPalmares(national);
  const byId = new Map(teams.map((t) => [t.id, t]));
  const sources = await repo.getSourcesByIds(Array.from(new Set(national.flatMap((f) => f.sourceIds))));
  const nameOf = (side: { teamId?: string; name?: string }) => (side.teamId ? byId.get(side.teamId)?.name : undefined) ?? side.name ?? "";

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: dict.common.breadcrumbHome, url: href(locale, "home") },
            { name: dict.nav.palmares, url: href(locale, "palmares") },
          ]),
          itemListJsonLd(
            dict.palmares.ranking,
            rows.slice(0, 20).map((r) => {
              const team = r.side.teamId ? byId.get(r.side.teamId) : undefined;
              return { name: nameOf(r.side), url: team ? href(locale, "teams", team.slug) : undefined };
            }),
          ),
        ]}
      />
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink-2" />
        <div aria-hidden className="pointer-events-none absolute inset-0 grain" />
        <div className="container-content relative py-12 md:py-16">
          <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.nav.palmares }]} />
          <h1 className="display display-lg mt-6 max-w-4xl">{dict.palmares.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper-2">{dict.palmares.intro}</p>
          <nav aria-label={dict.palmares.byCompetition} className="mt-8 flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="flex h-8 items-center border border-line bg-surface px-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted transition-colors hover:border-accent hover:text-accent">
                {s.label[locale]}
              </a>
            ))}
          </nav>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
      </section>

      <div className="container-content py-12 md:py-14">
        <section className="mb-16">
          <h2 className="display display-sm mb-2">{dict.palmares.ranking}</h2>
          <p className="mb-5 text-sm text-muted">{dict.palmares.rankingNote}</p>
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[40rem] text-sm">
              <thead>
                <tr className="border-b border-line bg-ink-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-2">
                  <th className="px-4 py-3 text-left font-normal">#</th>
                  <th className="px-4 py-3 text-left font-normal">{dict.palmares.club}</th>
                  {PALMARES_COLUMNS.map((c) => (
                    <th key={c.key} className="px-3 py-3 text-right font-normal">
                      {dict.palmares.columns[c.key]}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right font-normal text-gold">{dict.palmares.total}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => {
                  const team = r.side.teamId ? byId.get(r.side.teamId) : undefined;
                  return (
                    <tr key={team?.id ?? r.side.name} className="border-t border-line/60">
                      <td className="px-4 py-2.5 font-display text-base font-black text-accent">{i + 1}</td>
                      <td className="px-4 py-2.5">
                        {team ? (
                          <Link href={href(locale, "teams", team.slug)} className="font-display font-bold uppercase text-paper hover:text-gold">
                            {team.name}
                          </Link>
                        ) : (
                          <span className="text-paper-2">{r.side.name}</span>
                        )}
                      </td>
                      {PALMARES_COLUMNS.map((c) => (
                        <td key={c.key} className={`px-3 py-2.5 text-right font-mono ${r.counts[c.key] ? "text-paper" : "text-muted-2"}`}>
                          {r.counts[c.key] || "·"}
                        </td>
                      ))}
                      <td className="px-4 py-2.5 text-right font-display text-lg font-black text-gold">{r.total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <h2 className="display display-sm mb-6">{dict.palmares.byCompetition}</h2>
        {SECTIONS.map((s) => {
          const list = national.filter(s.match);
          const gaps = s.gapKey ? fefaFinalsGaps[s.gapKey] ?? [] : [];
          return (
            <section key={s.id} id={s.id} className="mb-12 scroll-mt-24">
              <h3 className="kicker mb-3 text-gold">
                {s.label[locale]} · {list.length}
              </h3>
              <FinalsTable finals={list} teams={teams} locale={locale} dict={dict} />
              {gaps.length > 0 && (
                <p className="mt-2 text-xs text-muted">
                  {dict.palmares.gaps}: {gaps.join(", ")}.
                </p>
              )}
            </section>
          );
        })}

        <SourceList sources={sources} locale={locale} title={dict.common.sources} accessedLabel={dict.articles.accessed} />
      </div>
    </>
  );
}
