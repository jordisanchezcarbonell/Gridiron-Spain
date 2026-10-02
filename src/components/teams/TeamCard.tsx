import Link from "next/link";
import type { Locale } from "@/types/common";
import type { Competition, Team } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import { href } from "@/lib/i18n/routes";
import { t } from "@/lib/i18n/text";
import { TeamLogo } from "./TeamLogo";
import { Badge } from "@/components/ui/Badge";

export function TeamCard({
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
  const current = team.currentCompetitions
    .map((ref) => competitions.find((c) => c.id === ref.competitionId))
    .filter(Boolean) as Competition[];

  return (
    <Link
      href={href(locale, "teams", team.slug)}
      className="card card-hover group flex h-full flex-col p-5"
    >
      {/* Header with logo and status */}
      <div className="flex items-start justify-between gap-3">
        <TeamLogo team={team} size={48} />
        <Badge tone={team.status === "active" ? "turf" : "outline"}>{dict.status[team.status]}</Badge>
      </div>

      {/* Team name and location */}
      <div className="mt-4">
        <h3 className="font-display text-xl font-black uppercase leading-none text-paper transition-colors group-hover:text-accent md:text-2xl">
          {team.name}
        </h3>
        <p className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
          {team.city} · {team.autonomousCommunity}
          {team.foundedYear ? ` · ${team.foundedYear}` : ""}
        </p>
      </div>

      {/* Summary */}
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-paper-2">{t(team.summary, locale)}</p>

      {/* Metadata grid */}
      <div className="mt-auto grid gap-2.5 border-t border-line pt-4">
        <CardMeta label={dict.teams.discipline}>
          {team.disciplines.map((d) => <Badge key={d} tone="neutral">{dict.discipline[d]}</Badge>)}
        </CardMeta>
        {team.categories.length > 0 && (
          <CardMeta label={dict.teams.category}>
            {team.categories.map((category) => <Badge key={category} tone="outline">{dict.category[category]}</Badge>)}
          </CardMeta>
        )}
        {current.slice(0, 1).map((c) => (
          <CardMeta key={c.id} label={dict.teams.competition}>
            <Badge tone="accent">{c.shortName ?? c.name}</Badge>
          </CardMeta>
        ))}
      </div>
    </Link>
  );
}

function CardMeta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="w-20 font-mono text-[0.5625rem] uppercase tracking-[0.1em] text-muted-2">{label}</span>
      <div className="flex flex-wrap gap-1">{children}</div>
    </div>
  );
}
