import type { Metadata } from "next";
import Link from "next/link";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { t, formatDate } from "@/lib/i18n/text";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { SourceList } from "@/components/articles/SourceList";
import { PROFILE_GROUPS, playerSlug } from "@/lib/players";
import type { Locale, PlayerGroup, PlayerSpotlight, Ranking, Team } from "@/types";
import type { Dictionary } from "@/dictionaries/es";

const SCOPES = ["ncaa", "spain", "europe"] as const;
/** Player spotlights shown next to the rankings of the same scope. */
const PLAYER_GROUPS: Record<(typeof SCOPES)[number], PlayerGroup[]> = {
  ncaa: ["ncaa-star", "ncaa-prospect"],
  spain: ["spain-lnfa", "spain-national-team", "spain-prospect", "spain-nfl", "spain-ncaa"],
  europe: ["europe"],
};

export async function generateMetadata({ params }: PageProps<"/[lang]/rankings">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, title: dict.rankings.title, description: dict.rankings.intro, routeKey: "rankings" });
}

export default async function RankingsPage({ params }: PageProps<"/[lang]/rankings">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const repo = getRepository();
  const [rankings, players, teams] = await Promise.all([repo.getRankings(), repo.getPlayerSpotlights(), repo.getTeams()]);
  const sourceIds = Array.from(new Set([...rankings.flatMap((r) => r.sourceIds), ...players.flatMap((p) => p.sourceIds)]));
  const sources = await repo.getSourcesByIds(sourceIds);
  const lastVerified = rankings.map((r) => r.lastVerifiedAt ?? "").sort().at(-1);

  const nav = SCOPES.filter((s) => rankings.some((r) => r.scope === s)).map((s) => ({ id: s, label: dict.rankings[s] }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: dict.common.breadcrumbHome, url: href(locale, "home") },
            { name: dict.nav.rankings, url: href(locale, "rankings") },
          ]),
          ...rankings
            .filter((r) => r.groups.length === 1)
            .map((r) =>
              itemListJsonLd(
                t(r.title, locale),
                r.groups[0].entries.map((e) => {
                  const team = e.teamId ? teams.find((x) => x.id === e.teamId) : undefined;
                  return { name: e.name, url: team ? href(locale, "teams", team.slug) : undefined };
                }),
              ),
            ),
        ]}
      />
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink-2" />
        <div aria-hidden className="pointer-events-none absolute inset-0 grain" />
        <div aria-hidden className="pointer-events-none absolute inset-0 yardlines opacity-15" />
        <div className="container-content relative py-12 md:py-16 lg:py-20">
          <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.nav.rankings }]} />
          <div className="mb-6 mt-6 inline-flex items-center">
            <span className="flex h-7 items-center bg-accent px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white">
              {dict.nav.rankings}
            </span>
            <div className="h-7 w-10 bg-gradient-to-r from-accent/60 to-transparent" />
          </div>
          <h1 className="display display-lg max-w-4xl">{dict.rankings.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper-2">{dict.rankings.intro}</p>
          <nav aria-label={dict.nav.rankings} className="mt-10 flex flex-wrap gap-2">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="flex h-8 items-center border border-line bg-surface px-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted transition-colors hover:border-accent hover:text-accent">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
      </section>

      <div className="container-content py-12 md:py-14">
        {SCOPES.map((scope) => {
          const list = rankings.filter((r) => r.scope === scope);
          const groups = PLAYER_GROUPS[scope].filter((g) => players.some((p) => p.group === g));
          if (list.length === 0 && groups.length === 0) return null;
          const sideBySide = list.length === 1;
          const playerBlocks = groups.map((group) => (
            <div key={group}>
              <h3 className="display display-sm mb-4">{dict.rankings.playerGroups[group]}</h3>
              <ul className={sideBySide ? "grid gap-3" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"}>
                {players
                  .filter((p) => p.group === group)
                  .map((p) => (
                    <PlayerCard key={p.id} player={p} teams={teams} locale={locale} />
                  ))}
              </ul>
            </div>
          ));
          return (
            <section key={scope} id={scope} className="mb-16 scroll-mt-24">
              <ScopeHeader label={dict.rankings[scope]} />
              {sideBySide ? (
                <div className="grid items-start gap-10 xl:grid-cols-2">
                  <RankingTable ranking={list[0]} teams={teams} locale={locale} dict={dict} />
                  <div className="grid content-start gap-10">{playerBlocks}</div>
                </div>
              ) : (
                <>
                  <div className="grid gap-8 xl:grid-cols-2">
                    {list.map((r) => (
                      <RankingTable key={r.id} ranking={r} teams={teams} locale={locale} dict={dict} />
                    ))}
                  </div>
                  {playerBlocks.length > 0 && <div className="mt-12 grid gap-10">{playerBlocks}</div>}
                </>
              )}
            </section>
          );
        })}

        <SourceList
          sources={sources}
          locale={locale}
          title={dict.common.sources}
          accessedLabel={dict.articles.accessed}
          lastVerified={lastVerified}
          lastVerifiedLabel={dict.verification.lastVerified}
        />
      </div>
    </>
  );
}

function ScopeHeader({ label }: { label: string }) {
  return (
    <header className="mb-6">
      <div className="inline-flex items-center">
        <span className="flex h-7 items-center bg-turf px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-ink">{label}</span>
        <div className="h-7 w-2 bg-turf/60" />
        <div className="h-7 w-1 bg-turf/30" />
      </div>
    </header>
  );
}

function TeamName({ teamId, name, teams, locale }: { teamId?: string; name: string; teams: Team[]; locale: Locale }) {
  const team = teamId ? teams.find((x) => x.id === teamId) : undefined;
  if (!team) return <>{name}</>;
  return (
    <Link href={href(locale, "teams", team.slug)} className="text-paper underline-offset-4 hover:text-accent hover:underline">
      {name}
    </Link>
  );
}

function Movement({ rank, previous }: { rank: number; previous?: number }) {
  if (previous === undefined) return <span className="text-muted-2">—</span>;
  const diff = previous - rank;
  if (diff === 0) return <span className="text-muted-2">=</span>;
  return <span className={diff > 0 ? "text-turf" : "text-signal"}>{diff > 0 ? `▲${diff}` : `▼${-diff}`}</span>;
}

function RankingTable({ ranking, teams, locale, dict }: { ranking: Ranking; teams: Team[]; locale: Locale; dict: Dictionary }) {
  const hasMovement = ranking.groups.some((g) => g.entries.some((e) => e.previousRank !== undefined));
  return (
    <article id={ranking.slug} className="relative min-w-0 scroll-mt-24 border border-line bg-surface">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={ranking.kind === "computed" ? "gold" : "outline"}>{dict.rankings[ranking.kind]}</Badge>
          <Badge>
            {dict.rankings.asOf} {formatDate(ranking.asOf, locale)}
          </Badge>
        </div>
        <h2 className="display display-sm mt-4">{t(ranking.title, locale)}</h2>
        <p className="mt-3 text-sm leading-relaxed text-paper-2">{t(ranking.description, locale)}</p>
      </div>
      {ranking.groups.map((group, gi) => (
        <div key={gi} className="overflow-x-auto border-t border-line">
          {group.name && <p className="px-5 pt-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted md:px-6">{t(group.name, locale)}</p>}
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted-2">
                <th scope="col" className="w-12 px-5 py-3 md:px-6">{dict.rankings.rank}</th>
                <th scope="col" className="py-3 pr-3">{dict.rankings.team}</th>
                <th scope="col" className="py-3 pr-3">{dict.rankings.record}</th>
                {hasMovement && <th scope="col" className="w-12 py-3 pr-5 text-right md:pr-6"><span className="sr-only">±</span></th>}
              </tr>
            </thead>
            <tbody>
              {group.entries.map((e) => (
                <tr key={`${e.rank}-${e.name}`} className="border-t border-line/60 align-top">
                  <td className="px-5 py-2.5 font-display text-lg font-black text-accent md:px-6">{e.rank}</td>
                  <td className="py-2.5 pr-3">
                    <TeamName teamId={e.teamId} name={e.name} teams={teams} locale={locale} />
                    {e.note && <span className="block text-xs text-muted">{t(e.note, locale)}</span>}
                  </td>
                  <td className="whitespace-nowrap py-2.5 pr-3 font-mono text-xs text-paper-2">{e.detail ?? "—"}</td>
                  {hasMovement && (
                    <td className="py-2.5 pr-5 text-right font-mono text-xs md:pr-6">
                      <Movement rank={e.rank} previous={e.previousRank} />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {ranking.method && (
        <p className="border-t border-line px-5 py-4 text-xs leading-relaxed text-muted md:px-6">
          <strong className="font-mono uppercase tracking-[0.12em] text-muted-2">{dict.rankings.method}: </strong>
          {t(ranking.method, locale)}
        </p>
      )}
    </article>
  );
}

function PlayerCard({ player, teams, locale }: { player: PlayerSpotlight; teams: Team[]; locale: Locale }) {
  return (
    <li className="flex h-full flex-col gap-2 border border-line bg-surface p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="accent">{player.position}</Badge>
        <Badge tone="outline">{player.league}</Badge>
      </div>
      <p className="font-display text-xl font-bold text-paper">
        {PROFILE_GROUPS.includes(player.group) ? (
          <Link href={href(locale, "players", playerSlug(player.name))} className="hover:text-accent">
            {player.name}
          </Link>
        ) : (
          player.name
        )}
      </p>
      <p className="text-sm text-paper-2">
        <TeamName teamId={player.teamId} name={player.team} teams={teams} locale={locale} />
        {player.hometown && <span className="text-muted"> · {player.hometown}</span>}
      </p>
      <p className="text-sm leading-relaxed text-muted">{t(player.note, locale)}</p>
    </li>
  );
}
