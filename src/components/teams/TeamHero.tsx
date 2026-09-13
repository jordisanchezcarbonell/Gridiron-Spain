import type { Locale } from "@/types/common";
import type { Team } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import { t, formatMonthYear } from "@/lib/i18n/text";
import { TeamLogo } from "./TeamLogo";
import { Badge } from "@/components/ui/Badge";
import { VerificationBadge } from "@/components/ui/VerificationBadge";

export function TeamHero({ team, locale, dict }: { team: Team; locale: Locale; dict: Dictionary }) {
  return (
    <section className="grain relative overflow-hidden border-b border-line">
      <div className="container-content flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between md:py-16">
        <div className="flex items-start gap-6">
          <TeamLogo team={team} size={96} className="hidden sm:grid" />
          <div>
            <p className="kicker mb-3">
              {team.city} · {team.autonomousCommunity}
            </p>
            <h1 className="display display-md">{team.name}</h1>
            <p className="mt-4 max-w-2xl text-lg text-paper-2">{t(team.summary, locale)}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge tone={team.status === "active" ? "turf" : "outline"}>{dict.status[team.status]}</Badge>
              {team.disciplines.map((d) => (
                <Badge key={d}>{dict.discipline[d]}</Badge>
              ))}
              {team.categories.map((c) => (
                <Badge key={c} tone="outline">
                  {dict.category[c]}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="shrink-0">
          <VerificationBadge
            size="md"
            status={team.verificationStatus}
            label={dict.verification[team.verificationStatus]}
            lastVerifiedLabel={dict.verification.lastVerified}
            lastVerified={team.lastVerifiedAt ? formatMonthYear(team.lastVerifiedAt, locale) : undefined}
          />
        </div>
      </div>
    </section>
  );
}
