import type { Ranking, RankingEntry, SeasonEntry } from "@/types";
import { seasons } from "@/data/seasons";
import { teams } from "@/data/teams";

/**
 * Primer Down's LNFA starting ranking for 2026-27.
 *
 * Computed only from the documented 2025-26 season (src/data/seasons):
 * regular-season win percentage (ties count as half a win) x 100, plus a
 * play-off bonus: champion +30, Spanish Bowl runner-up +20, semi-finalist +10.
 * Teams without a 2025-26 Serie A record (promoted clubs) are listed last.
 * Nothing here is an opinion poll; change the inputs, not the output.
 */
const BONUS = { champion: 30, runnerUp: 20, semifinal: 10 } as const;
// Semi-finalists of 2025-26 per "fefa-lnfa-semis-2026" (see the season's phases).
const SEMIFINALISTS_2026 = ["badalona-dracs", "osos-rivas", "las-rozas-black-demons", "terrassa-reds"];

function nameOf(entry: SeasonEntry) {
  return entry.teamId ? teams.find((t) => t.id === entry.teamId)?.name ?? entry.teamId : entry.name ?? "";
}

function recordLabel(r: NonNullable<SeasonEntry["record"]>) {
  return `${r.wins}-${r.losses}${r.ties ? `-${r.ties}` : ""}`;
}

function buildLnfaRanking(): RankingEntry[] {
  const previous = seasons.find((s) => s.id === "lnfa-2025-26");
  const next = seasons.find((s) => s.id === "lnfa-2026-27");
  if (!previous || !next) return [];

  const lastYear = new Map(previous.groups.flatMap((g) => g.entries).filter((e) => e.teamId).map((e) => [e.teamId!, e]));

  const scored = next.groups.flatMap((g) => g.entries).map((entry) => {
    const prev = entry.teamId ? lastYear.get(entry.teamId) : undefined;
    const r = prev?.record;
    if (!r) return { entry, score: -1, detail: undefined as string | undefined };
    const games = r.wins + r.losses + (r.ties ?? 0);
    let score = games ? ((r.wins + (r.ties ?? 0) / 2) / games) * 100 : 0;
    if (previous.champion?.teamId === entry.teamId) score += BONUS.champion;
    else if (previous.runnerUp?.teamId === entry.teamId) score += BONUS.runnerUp;
    else if (entry.teamId && SEMIFINALISTS_2026.includes(entry.teamId)) score += BONUS.semifinal;
    return { entry, score, detail: `${recordLabel(r)} · ${score.toFixed(1)} pts` };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .map(({ entry, score, detail }, i) => ({
      rank: i + 1,
      teamId: entry.teamId,
      name: nameOf(entry),
      detail: score < 0 ? undefined : detail,
      note:
        score < 0
          ? { es: "Ascendido: sin partidos de Serie A en 2025-26", en: "Promoted: no Serie A games in 2025-26" }
          : previous.champion?.teamId === entry.teamId
            ? { es: "Campeón Spanish Bowl XXXII", en: "Spanish Bowl XXXII champion" }
            : previous.runnerUp?.teamId === entry.teamId
              ? { es: "Finalista Spanish Bowl XXXII", en: "Spanish Bowl XXXII runner-up" }
              : entry.teamId && SEMIFINALISTS_2026.includes(entry.teamId)
                ? { es: "Semifinalista 2026", en: "2026 semi-finalist" }
                : undefined,
    }));
}

export const spainRankings: Ranking[] = [
  {
    id: "lnfa-preseason-2026-27",
    slug: "lnfa",
    scope: "spain",
    kind: "computed",
    title: { es: "Ranking LNFA de partida 2026-27", en: "LNFA starting ranking 2026-27" },
    description: {
      es: "Los diez equipos de la Serie A 2026-27 ordenados por lo que hicieron en la temporada 2025-26. Se actualizará cuando arranque la liga el 16 de enero de 2027.",
      en: "The ten 2026-27 Serie A teams ordered by what they did in 2025-26. It will be updated once the league starts on 16 January 2027.",
    },
    asOf: "2026-05-02",
    competitionId: "lnfa",
    // Recomputed from src/data/seasons: keep the 2026-27 results current during the league.
    refresh: { everyDays: 14, activeFrom: "2027-01-16", activeUntil: "2027-05-22" },
    method: {
      es: "Porcentaje de victorias en liga regular 2025-26 (empate = media victoria) × 100, más bonus de play-off: campeón +30, finalista +20, semifinalista +10. Los ascendidos sin partidos en Serie A van al final. Cálculo propio a partir de resultados oficiales de la FEFA.",
      en: "2025-26 regular-season win percentage (tie = half a win) × 100, plus a play-off bonus: champion +30, runner-up +20, semi-finalist +10. Promoted teams with no Serie A games go last. Our own calculation from official FEFA results.",
    },
    groups: [{ entries: buildLnfaRanking() }],
    sourceIds: ["fefa-calendario-2025-26", "fefa-lnfa-semis-2026", "fefa-spanish-bowl-2026", "fefa-calendario-2026-27"],
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-02",
  },
];
