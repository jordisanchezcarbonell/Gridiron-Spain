import Link from "next/link";
import type { Locale } from "@/types/common";
import type { Competition, Team } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import { href } from "@/lib/i18n/routes";
import { t } from "@/lib/i18n/text";
import { TeamLogo } from "./TeamLogo";
import { Badge } from "@/components/ui/Badge";
import { VerificationBadge } from "@/components/ui/VerificationBadge";

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
      className="card card-hover group flex h-full flex-col gap-4 p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <TeamLogo team={team} size={56} />
        <VerificationBadge status={team.verificationStatus} label={dict.verification[team.verificationStatus]} />
      </div>
      <div>
        <h3 className="font-display text-2xl font-extrabold uppercase leading-none text-paper group-hover:text-gold">
          {team.name}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {team.city} · {team.autonomousCommunity}
          {team.foundedYear ? ` · ${team.foundedYear}` : ""}
        </p>
      </div>
      <p className="line-clamp-3 text-sm text-paper-2">{t(team.summary, locale)}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
        <Badge tone={team.status === "active" ? "turf" : "outline"}>{dict.status[team.status]}</Badge>
        {team.disciplines.map((d) => (
          <Badge key={d}>{dict.discipline[d]}</Badge>
        ))}
        {current.slice(0, 1).map((c) => (
          <Badge key={c.id} tone="gold">
            {c.shortName ?? c.name}
          </Badge>
        ))}
      </div>
    </Link>
  );
}
