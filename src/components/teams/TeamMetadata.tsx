import Link from "next/link";
import type { Locale } from "@/types/common";
import type { Competition, Team } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import { href } from "@/lib/i18n/routes";
import { t } from "@/lib/i18n/text";

type Row = { label: string; value: React.ReactNode };

export function TeamMetadata({
  team,
  competitions,
  locale,
  dict,
}: {
  team: Team;
  competitions: Competition[];
  locale: Locale;
  dict: Dictionary;
}) {
  const pending = <span className="text-muted-2">{dict.verification.unverified}</span>;

  const rows: Row[] = [
    { label: dict.teams.city, value: team.city },
    { label: dict.teams.founded, value: team.foundedYear ?? pending },
    { label: dict.teams.status, value: dict.status[team.status] },
    {
      label: dict.teams.currentSeason,
      value:
        team.currentCompetitions.length > 0 ? (
          <ul className="space-y-1">
            {team.currentCompetitions.map((ref) => {
              const c = competitions.find((x) => x.id === ref.competitionId);
              if (!c) return null;
              return (
                <li key={`${ref.competitionId}-${ref.season}`}>
                  <Link href={href(locale, "competitions", c.slug)} className="text-gold hover:text-gold-2">
                    {c.name}
                  </Link>
                  {ref.tier ? ` · ${ref.tier}` : ""}
                  {ref.season ? ` · ${ref.season}` : ""}
                </li>
              );
            })}
          </ul>
        ) : (
          pending
        ),
    },
    { label: dict.teams.disciplines, value: team.disciplines.map((d) => dict.discipline[d]).join(" · ") },
    {
      label: dict.teams.categories,
      value: team.categories.length ? team.categories.map((c) => dict.category[c]).join(" · ") : pending,
    },
    {
      label: dict.teams.venue,
      value: team.venue?.name ? (
        <>
          {t(team.venue.name, locale)}
          {team.venue.address && <span className="block text-sm text-muted">{team.venue.address}</span>}
        </>
      ) : (
        pending
      ),
    },
    {
      label: dict.teams.website,
      value: team.website ? (
        <a href={team.website} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-2">
          {team.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
        </a>
      ) : (
        pending
      ),
    },
  ];

  const socials = Object.entries(team.socialLinks ?? {}).filter(([, url]) => Boolean(url));
  if (socials.length) {
    rows.push({
      label: dict.teams.social,
      value: (
        <ul className="flex flex-wrap gap-3">
          {socials.map(([network, url]) => (
            <li key={network}>
              <a href={url} target="_blank" rel="noopener noreferrer" className="capitalize text-gold hover:text-gold-2">
                {network}
              </a>
            </li>
          ))}
        </ul>
      ),
    });
  }

  return (
    <dl className="card divide-y divide-line">
      {rows.map((row) => (
        <div key={row.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[9rem_1fr]">
          <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-2">{row.label}</dt>
          <dd className="text-sm text-paper">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
