/**
 * Language check.
 *
 * Clips are narrated in Spanish by a Spanish voice, but part of the research
 * corpus is written in English (`research/teams/navy-midshipmen.md`). Feeding
 * English prose to a Spanish narrator produces a clip that is wrong in both
 * languages, so the mismatch is caught before anything is rendered.
 *
 * Deliberately a stopword ratio rather than a dependency: it only has to tell
 * two languages apart on a few sentences of sports prose.
 */
const SPANISH = new Set([
  "el", "la", "los", "las", "de", "del", "que", "y", "en", "con", "por", "para",
  "una", "un", "es", "su", "al", "se", "más", "pero", "como", "tras", "este",
  "esta", "sus", "ya", "no", "sin", "sobre", "entre", "cuando", "desde", "hasta",
]);

const ENGLISH = new Set([
  "the", "of", "and", "to", "in", "is", "for", "with", "on", "at", "by", "from",
  "that", "this", "it", "as", "are", "was", "were", "their", "they", "has",
  "have", "but", "not", "after", "before", "who", "which", "will", "would",
]);

export interface LanguageGuess {
  language: "es" | "en" | "unknown";
  spanishHits: number;
  englishHits: number;
}

export function detectLanguage(text: string): LanguageGuess {
  const words = text.toLowerCase().match(/[a-záéíóúüñ]+/g) ?? [];
  let spanishHits = 0;
  let englishHits = 0;
  for (const word of words) {
    if (SPANISH.has(word)) spanishHits += 1;
    if (ENGLISH.has(word)) englishHits += 1;
  }
  if (spanishHits === englishHits) return { language: "unknown", spanishHits, englishHits };
  return {
    language: spanishHits > englishHits ? "es" : "en",
    spanishHits,
    englishHits,
  };
}
