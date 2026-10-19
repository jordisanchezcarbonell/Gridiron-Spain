/**
 * Written form -> spoken form, with a map back.
 *
 * The aligner's alphabet is lowercase `a-z` plus apostrophe and hyphen, and
 * the narrator says "trece", not "13". So the text handed to the model is a
 * *pronunciation* of the approved script, never a replacement for it: every
 * spoken token records which written word it came from, and the timings are
 * folded back onto the written words before anything is displayed.
 *
 * That is what keeps a recogniser from rewriting a figure or a name. The
 * subtitles can only ever show the words the editorial gates approved.
 */

/** Spanish numerals, enough for scores, ranks and counts in sport. */
const UNITS = [
  "cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho",
  "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciseis",
  "diecisiete", "dieciocho", "diecinueve", "veinte",
];

const TENS: Record<number, string> = {
  30: "treinta", 40: "cuarenta", 50: "cincuenta", 60: "sesenta",
  70: "setenta", 80: "ochenta", 90: "noventa",
};

const HUNDREDS: Record<number, string> = {
  100: "cien", 200: "doscientos", 300: "trescientos", 400: "cuatrocientos",
  500: "quinientos", 600: "seiscientos", 700: "setecientos",
  800: "ochocientos", 900: "novecientos",
};

/** Spells a number the way it is read aloud in Spanish. */
export function numberToSpanish(value: number): string {
  const n = Math.trunc(Math.abs(value));
  if (n <= 20) return UNITS[n];
  if (n < 30) return `veinti${UNITS[n - 20]}`;
  if (n < 100) {
    const tens = Math.floor(n / 10) * 10;
    const unit = n % 10;
    return unit === 0 ? TENS[tens] : `${TENS[tens]} y ${UNITS[unit]}`;
  }
  if (n < 1000) {
    const hundreds = Math.floor(n / 100) * 100;
    const rest = n % 100;
    const head = hundreds === 100 && rest > 0 ? "ciento" : HUNDREDS[hundreds];
    return rest === 0 ? head : `${head} ${numberToSpanish(rest)}`;
  }
  // Beyond a thousand, read digit by digit rather than guess a reading.
  return String(n).split("").map((d) => UNITS[Number(d)]).join(" ");
}

/** Strips accents; the aligner's alphabet has none. */
export function foldAccents(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export interface SpokenForm {
  /** Tokens in the aligner's alphabet. */
  tokens: string[];
  /** `owner[i]` is the index of the written word `tokens[i]` came from. */
  owner: number[];
  /** The written words, unchanged. */
  written: string[];
}

/** Expands one written word into the tokens a narrator would say. */
export function speakWord(word: string): string[] {
  let text = word;

  // A score reads as two numbers: "52-28" -> cincuenta y dos / veintiocho.
  text = text.replace(/(\d+)\s*[-–]\s*(\d+)/g, (_m, a, b) =>
    ` ${numberToSpanish(Number(a))} ${numberToSpanish(Number(b))} `,
  );
  // "#8" and "8" both read as the bare numeral.
  text = text.replace(/#\s*(\d+)/g, (_m, n) => ` ${numberToSpanish(Number(n))} `);
  text = text.replace(/\d+/g, (m) => ` ${numberToSpanish(Number(m))} `);

  return foldAccents(text)
    .toLowerCase()
    .replace(/[^a-z'\- ]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Builds the spoken form of a written word list, keeping the mapping.
 *
 * A written word that produces no pronounceable token — standalone
 * punctuation, say — simply owns no tokens, and is reported as unlocated
 * rather than given a made-up time.
 */
export function toSpokenForm(written: string[]): SpokenForm {
  const tokens: string[] = [];
  const owner: number[] = [];

  written.forEach((word, index) => {
    for (const token of speakWord(word)) {
      tokens.push(token);
      owner.push(index);
    }
  });

  return { tokens, owner, written };
}

/** Splits narration into the words the subtitles will show. */
export function writtenWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}
