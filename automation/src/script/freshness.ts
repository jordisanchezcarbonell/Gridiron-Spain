/**
 * Actuality.
 *
 * A clip built from a 16-day-old briefing was shipping with an `AHORA` chip.
 * The facts were sourced and true; the framing was not. Nothing here changes
 * what a clip says — it changes what it *claims to be*.
 */

/** How current the source material is. */
export type Freshness = "breaking" | "current" | "recent" | "archive";

export interface FreshnessVerdict {
  freshness: Freshness;
  ageDays: number;
  /** Kicker that is true for this age. */
  kicker: string;
  /** True only when a present-tense news framing is honest. */
  allowsUrgency: boolean;
  /** Shown under the kicker so the date is never hidden. */
  dateNote: string;
}

/** Words that assert the material is happening now. */
export const URGENCY_WORDS = ["ahora", "hoy", "ultima hora", "última hora", "en directo", "breaking"];

const DAY_MS = 86_400_000;

export function daysBetween(sourceDate: string, today: string): number {
  const a = Date.parse(`${sourceDate}T00:00:00Z`);
  const b = Date.parse(`${today}T00:00:00Z`);
  if (Number.isNaN(a) || Number.isNaN(b)) return Number.POSITIVE_INFINITY;
  return Math.round((b - a) / DAY_MS);
}

/**
 * Classifies the source by age and hands back a kicker that is true.
 *
 * The thresholds are deliberately tight for sport: a result is "now" for a day
 * and current for about a weekend. After that, presenting it as breaking news
 * is a lie regardless of how well sourced the facts are.
 */
export function classifyFreshness(sourceDate: string, today: string): FreshnessVerdict {
  const ageDays = daysBetween(sourceDate, today);

  if (ageDays <= 1) {
    return {
      freshness: "breaking",
      ageDays,
      kicker: "AHORA",
      allowsUrgency: true,
      dateNote: sourceDate,
    };
  }
  if (ageDays <= 4) {
    return {
      freshness: "current",
      ageDays,
      kicker: "ESTA SEMANA",
      allowsUrgency: true,
      dateNote: sourceDate,
    };
  }
  if (ageDays <= 21) {
    return {
      freshness: "recent",
      ageDays,
      kicker: "EL DATO",
      allowsUrgency: false,
      dateNote: `${sourceDate} · hace ${ageDays} días`,
    };
  }
  return {
    freshness: "archive",
    ageDays,
    kicker: "ARCHIVO",
    allowsUrgency: false,
    dateNote: `${sourceDate} · hace ${ageDays} días`,
  };
}

/** Urgency language found in narration that the source's age does not support. */
export function urgencyViolations(texts: string[], verdict: FreshnessVerdict): string[] {
  if (verdict.allowsUrgency) return [];

  const fold = (text: string): string =>
    text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Keyed by the accent-folded phrase: "ultima hora" and "última hora" are the
  // same violation, and reporting it twice would be noise.
  const found = new Map<string, string>();
  for (const text of texts) {
    const folded = fold(text);
    for (const word of URGENCY_WORDS) {
      const plain = fold(word);
      if (found.has(plain)) continue;
      if (new RegExp(`\\b${plain}\\b`).test(folded)) found.set(plain, word);
    }
  }
  return [...found.values()];
}
