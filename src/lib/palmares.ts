import type { Final, FinalSide } from "@/types";

export const PALMARES_COLUMNS = [
  { key: "lnfa", match: (f: Final) => f.competitionId === "lnfa" },
  { key: "copa", match: (f: Final) => f.competitionId === "copa-espana" },
  { key: "lnfa2", match: (f: Final) => f.competitionId === "lnfa-2" },
  { key: "femenina", match: (f: Final) => f.competitionId === "lnfa-femenina" },
  { key: "flagOpen", match: (f: Final) => f.competitionId === "spanish-flag-bowl" && f.category === "open" },
  { key: "flagFem", match: (f: Final) => f.competitionId === "spanish-flag-bowl" && f.category === "femenina" },
] as const;

export type PalmaresKey = (typeof PALMARES_COLUMNS)[number]["key"];

export type PalmaresRow = {
  side: FinalSide;
  counts: Record<PalmaresKey, number>;
  total: number;
};

const sideKey = (s: FinalSide) => s.teamId ?? `name:${s.name}`;

/** Titles per club across national competitions, ordered by LNFA, then Copa, then total. */
export function buildPalmares(finals: Final[]): PalmaresRow[] {
  const rows = new Map<string, PalmaresRow>();
  for (const f of finals) {
    if (!f.champion) continue;
    const column = PALMARES_COLUMNS.find((c) => c.match(f));
    if (!column) continue;
    const key = sideKey(f.champion);
    const row = rows.get(key) ?? { side: f.champion, counts: { lnfa: 0, copa: 0, lnfa2: 0, femenina: 0, flagOpen: 0, flagFem: 0 }, total: 0 };
    row.counts[column.key] += 1;
    row.total += 1;
    rows.set(key, row);
  }
  return [...rows.values()].sort((a, b) => b.counts.lnfa - a.counts.lnfa || b.counts.copa - a.counts.copa || b.total - a.total);
}
