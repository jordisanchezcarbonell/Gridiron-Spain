/**
 * Context-aware numeric claims.
 *
 * A bare digit string says nothing about what a number *is*. Comparing claims
 * to evidence by digit string alone caused two opposite failures:
 *
 *  - **False positive.** "Estar en el Top 10 cambia el peso de cada partido"
 *    was rejected as an inference stating a figure, when `10` is part of a
 *    denomination the evidence already establishes, not a measurement.
 *  - **False negative.** "Ganaron por 8 puntos de ventaja" was accepted because
 *    the evidence contained `#8` — a league ranking. The digit matched; the
 *    meaning did not. A fabricated margin passed as sourced fact.
 *
 * So numbers are read *in context* and matched by role as well as value. This
 * is not a whitelist of permitted numbers: nothing is allowed because of what
 * it is, only because the evidence states the same number in the same role.
 */

/** What a number is being used as. */
export type NumericKind =
  /** A denomination: Top 10, #8, LNFA 2, División 1, Jornada 5. A name. */
  | "rank"
  /** A result: 52-28. */
  | "score"
  /** A year, a day, a season: 2026, 13 de diciembre, 2026-27. */
  | "date"
  /** 45%, "por ciento". */
  | "percentage"
  /** A counted thing: 13 puestos, 2 títulos, 29 equipos. Carries its unit. */
  | "count"
  /** A number with no role the text makes clear. */
  | "quantity";

export interface NumericMention {
  /** The number as written. */
  raw: string;
  /** Normalised comparison key. */
  value: string;
  kind: NumericKind;
  /** For a count, the thing counted — "8 puntos" is not "8 títulos". */
  unit?: string;
  /** A little surrounding text, for the error message. */
  context: string;
}

const MONTHS =
  "enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre";

/**
 * Words that, standing *before* a number, make it a denomination.
 *
 * These name a position or a competition tier. Note the asymmetry with counts:
 * "puesto 13" is a rank, while "13 puestos" is a quantity of positions moved.
 */
const RANK_BEFORE = new RegExp(
  "(?:" +
    [
      "top",
      "n\\.?º",
      "nº",
      "no\\.",
      "num\\.?",
      "puesto",
      "posicion",
      "posición",
      "division",
      "división",
      "serie",
      "grupo",
      "conferencia",
      "liga",
      "lnfa",
      "nfl",
      "semana",
      "week",
      "jornada",
      "ronda",
      "fase",
      "tier",
      "categoria",
      "categoría",
    ].join("|") +
    ")\\s*[#\\-–]?\\s*$",
  "i",
);

/**
 * Nouns that make "el 8 **del** X" a standing, not a quantity.
 *
 * Spanish names a ranking position with a bare article: *"entran en el 8 del
 * AP Poll"* is the same fact as *"el #8"*, written without the glyph. A live
 * run produced exactly that and was refused, so the construction is recognised
 * — but only when what follows names a ranking or is a proper noun, so
 * *"a 13 de la cima"* stays the fabricated relation it is.
 */
const RANK_CONTEXT_AFTER = new RegExp(
  "^\\s*(?:del|de|en)\\s+(?:la\\s+|el\\s+|los\\s+|las\\s+)?(?:" +
    [
      "poll",
      "ranking",
      "rankings",
      "clasificacion",
      "tabla",
      "liga",
      "conferencia",
      "division",
      "pais",
      "mundo",
      "campeonato",
      "torneo",
      "temporada",
    ].join("|") +
    ")\\b",
  "i",
);

/** A capitalised word right after "el N del" — "el 8 del AP Poll". */
const PROPER_NOUN_AFTER = /^\s*(?:del|de|en)\s+(?:la\s+|el\s+|los\s+|las\s+)?[A-ZÁÉÍÓÚÑ][\wÁÉÍÓÚÑáéíóúñ]*/;

/** The article that precedes a bare ordinal: "el 8", "al 8". */
const ARTICLE_BEFORE = /\b(?:el|al|del)\s*$/i;

/** Units that make a number a count of something. */
const COUNT_AFTER =
  /^\s*(puestos?|posiciones?|t[ií]tulos?|victorias?|derrotas?|partidos?|equipos?|jugadores?|a[ñn]os?|temporadas?|jornadas?|yardas?|touchdowns?|puntos?|goles?|copas?|finales?|veces|d[ií]as?|semanas?|meses?)\b/i;

function stripAccents(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Finds every number in `text` and decides what role it plays.
 *
 * Ordering matters: a percentage is unmistakable, a year beats a score, and a
 * denomination beats a bare quantity.
 */
export function numericMentions(text: string): NumericMention[] {
  const mentions: NumericMention[] = [];
  // A number, optionally joined to another by a dash (scores, seasons, ranges).
  const pattern = /\d+(?:[.,]\d+)*(?:\s*[-–]\s*\d+(?:[.,]\d+)*)?/g;

  for (const match of text.matchAll(pattern)) {
    const raw = match[0].trim();
    const start = match.index ?? 0;
    const before = text.slice(Math.max(0, start - 24), start);
    const after = text.slice(start + match[0].length, start + match[0].length + 24);
    const context = `${before}${raw}${after}`.trim();

    const beforeFolded = stripAccents(before).toLowerCase();
    const beforeTail = beforeFolded.replace(/[^a-z0-9.#\-–\s]/g, "");
    const parts = raw.split(/\s*[-–]\s*/).map((p) => p.replace(/[.,]$/, ""));
    const isPair = parts.length === 2;

    // 1. Percentage — the symbol or the words leave no doubt.
    if (/^\s*(%|\s*por\s+ciento)/i.test(after) || /%\s*$/.test(before)) {
      mentions.push({ raw, value: parts[0], kind: "percentage", context });
      continue;
    }

    // 2. Date — a year, an ISO date, a season span, or a day before a month.
    const looksLikeYear = (p: string) => /^\d{4}$/.test(p) && Number(p) >= 1900 && Number(p) <= 2100;
    const followedByMonth = new RegExp(`^\\s*(?:de\\s+)?(?:${MONTHS})`, "i").test(after);
    const seasonSpan = isPair && looksLikeYear(parts[0]) && /^\d{2,4}$/.test(parts[1]);
    if (looksLikeYear(parts[0]) || seasonSpan || followedByMonth) {
      mentions.push({ raw, value: parts.join("-"), kind: "date", context });
      continue;
    }

    // 3. Score — two numbers joined by a dash that are not a date.
    if (isPair) {
      mentions.push({ raw, value: `${parts[0]}-${parts[1]}`, kind: "score", context });
      continue;
    }

    // 4. Denomination — a position or tier named before the number, the `#`
    //    glyph, an ordinal mark, or the bare-article construction
    //    "el 8 del AP Poll".
    const bareOrdinal =
      !isPair &&
      ARTICLE_BEFORE.test(beforeTail) &&
      (RANK_CONTEXT_AFTER.test(stripAccents(after)) || PROPER_NOUN_AFTER.test(after));

    if (
      RANK_BEFORE.test(beforeTail) ||
      /#\s*$/.test(before) ||
      /^\s*[ºª]/.test(after) ||
      bareOrdinal
    ) {
      mentions.push({ raw, value: parts[0], kind: "rank", context });
      continue;
    }

    // 5. Count — the thing being counted follows.
    const unitMatch = COUNT_AFTER.exec(stripAccents(after));
    if (unitMatch) {
      mentions.push({
        raw,
        value: parts[0],
        kind: "count",
        unit: singular(unitMatch[1].toLowerCase()),
        context,
      });
      continue;
    }

    mentions.push({ raw, value: parts[0], kind: "quantity", context });
  }

  return mentions;
}

/** Crude singular so "2 títulos" and "1 título" compare equal. */
function singular(word: string): string {
  const folded = stripAccents(word);
  if (folded.endsWith("es") && folded.length > 4) return folded.slice(0, -2);
  if (folded.endsWith("s") && folded.length > 3) return folded.slice(0, -1);
  return folded;
}

/** Identity used for matching: role, value, and the unit when there is one. */
export function mentionKey(mention: NumericMention): string {
  return mention.kind === "count"
    ? `count:${mention.value}:${mention.unit ?? ""}`
    : `${mention.kind}:${mention.value}`;
}

/**
 * Whether the evidence states this number in this role.
 *
 * A `rank` 8 does not back a `count` of 8 points: the evidence says Florida is
 * eighth, not that it won by eight. That asymmetry is the whole point.
 *
 * A bare `quantity` is the hard case, because the text gives it no role — the
 * classifier cannot tell "los 13 que subió" (faithful, vaguer) from "a 13 de
 * la cima" (a different fact wearing the same digit). So the leniency is
 * granted only to a **verified** claim, which is separately required to share
 * wording with the evidence it cites. An inference offering a roleless number
 * must match a roleless number in the source.
 */
export function isBacked(
  mention: NumericMention,
  evidenceKeys: Set<string>,
  claimKind: "verified" | "inference" = "inference",
): boolean {
  if (evidenceKeys.has(mentionKey(mention))) return true;

  if (mention.kind === "quantity" && claimKind === "verified") {
    for (const key of evidenceKeys) {
      const [, value] = key.split(":");
      if (value === mention.value) return true;
    }
  }

  return false;
}

/** Every role-and-value key the evidence establishes. */
export function evidenceKeysOf(texts: string[]): Set<string> {
  const keys = new Set<string>();
  for (const text of texts) {
    for (const mention of numericMentions(text)) keys.add(mentionKey(mention));
  }
  return keys;
}

/** Human-readable role, for an error a person has to act on. */
export function describeKind(mention: NumericMention): string {
  switch (mention.kind) {
    case "rank":
      return "a ranking or denomination";
    case "score":
      return "a result";
    case "date":
      return "a date";
    case "percentage":
      return "a percentage";
    case "count":
      return `a count of ${mention.unit ?? "things"}`;
    default:
      return "a figure";
  }
}
