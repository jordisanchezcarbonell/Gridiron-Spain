import type { Locale } from "@/types/common";
import type { Team } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import { t } from "@/lib/i18n/text";
import { TeamLogo } from "./TeamLogo";
import { Badge } from "@/components/ui/Badge";

export function TeamHero({ team, locale, dict }: { team: Team; locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink-2" />
      <div aria-hidden className="pointer-events-none absolute inset-0 grain" />
      <div aria-hidden className="pointer-events-none absolute inset-0 yardlines opacity-15" />

      <div className="container-content relative py-10 md:py-14 lg:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
          {/* Logo */}
          <div className="relative hidden shrink-0 sm:block">
            <div className="absolute -inset-2 bg-surface/50 backdrop-blur-sm" />
            <div className="relative">
              <TeamLogo team={team} size={112} />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Location kicker - broadcast style */}
            <div className="mb-4 inline-flex items-center">
              <span className="flex h-6 items-center bg-accent px-2.5 font-mono text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-white">
                {team.city}
              </span>
              <span className="flex h-6 items-center bg-surface px-2.5 font-mono text-[0.5625rem] font-medium uppercase tracking-[0.15em] text-muted">
                {team.autonomousCommunity}
              </span>
            </div>

            {/* Team name */}
            <h1 className="display display-lg">{team.name}</h1>

            {/* Summary */}
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-paper-2">{t(team.summary, locale)}</p>

            {/* Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge tone={team.status === "active" ? "turf" : "outline"}>{dict.status[team.status]}</Badge>
              {team.disciplines.map((d) => (
                <Badge key={d} tone="neutral">{dict.discipline[d]}</Badge>
              ))}
              {team.categories.map((c) => (
                <Badge key={c} tone="outline">{dict.category[c]}</Badge>
              ))}
            </div>
          </div>

          {/* Founded year - scoreboard style */}
          {team.foundedYear && (
            <div className="hidden shrink-0 text-right md:block">
              <div className="inline-block bg-surface px-4 py-3">
                <p className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted">
                  {locale === "es" ? "Fundado" : "Founded"}
                </p>
                <p className="mt-1 font-display text-4xl font-black leading-none text-paper">{team.foundedYear}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
    </section>
  );
}
