/**
 * Original sports graphics, drawn from figures the evidence already states.
 *
 * No photography, no club marks, no broadcast stills — nothing that would need
 * a licence. A scoreboard or a ranking ladder is our own geometry rendered
 * from numbers the grounding check has already tied to the source, so it adds
 * nothing factually and everything visually.
 */
import { branding, safeBox, typography } from "../config";
import { numericMentions, type NumericMention } from "../script/numeric";

export type GraphicKind = "scoreboard" | "rank" | "none";

export interface SceneGraphic {
  kind: GraphicKind;
  /** Rendered SVG fragment, positioned by the caller. */
  svg: string;
  /** Height the fragment occupies, so the caption can be placed under it. */
  height: number;
}

function esc(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * A scoreboard built from a `score` mention.
 *
 * Team names are only drawn when the caller supplies them from the caption —
 * the graphic never invents a fixture.
 */
export function scoreboardSvg(
  score: NumericMention,
  y: number,
  accent: string,
  teams?: [string, string],
): SceneGraphic {
  const [home, away] = score.value.split("-");
  const height = 220;
  const w = safeBox.width;
  const x = safeBox.x;
  const mid = x + w / 2;

  const label = (text: string, cx: number) =>
    `  <text x="${cx}" y="${y + 52}" font-family="${typography.stack}" font-size="30" fill="${branding.muted}" text-anchor="middle" letter-spacing="3">${esc(text.toUpperCase().slice(0, 12))}</text>`;

  return {
    kind: "scoreboard",
    height,
    svg: [
      `  <rect x="${x}" y="${y}" width="${w}" height="${height}" rx="22" fill="${branding.backgroundAlt}" opacity="0.92"/>`,
      `  <rect x="${x}" y="${y}" width="${w}" height="6" rx="3" fill="${accent}"/>`,
      teams ? label(teams[0], x + w * 0.25) : "",
      teams ? label(teams[1], x + w * 0.75) : "",
      `  <text x="${x + w * 0.25}" y="${y + 160}" font-family="${typography.stack}" font-weight="bold" font-size="96" fill="${branding.foreground}" text-anchor="middle">${esc(home)}</text>`,
      `  <text x="${mid}" y="${y + 150}" font-family="${typography.stack}" font-weight="bold" font-size="56" fill="${accent}" text-anchor="middle">–</text>`,
      `  <text x="${x + w * 0.75}" y="${y + 160}" font-family="${typography.stack}" font-weight="bold" font-size="96" fill="${branding.foreground}" text-anchor="middle">${esc(away)}</text>`,
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

/**
 * A ranking ladder: where the subject sits, and the move that got it there.
 *
 * `from` is drawn only when the evidence supplies a movement, so the graphic
 * cannot imply a climb that was never stated.
 */
export function rankLadderSvg(
  position: string,
  y: number,
  accent: string,
  movedBy?: string,
): SceneGraphic {
  const height = 210;
  const w = safeBox.width;
  const x = safeBox.x;

  const rungs = [];
  for (let i = 0; i < 5; i++) {
    const ry = y + 34 + i * 30;
    const lit = i >= 3;
    rungs.push(
      `  <rect x="${x + w - 190}" y="${ry}" width="${120 - i * 14}" height="12" rx="6" fill="${lit ? accent : branding.foreground}" opacity="${lit ? 0.9 : 0.16}"/>`,
    );
  }

  return {
    kind: "rank",
    height,
    svg: [
      `  <rect x="${x}" y="${y}" width="${w}" height="${height}" rx="22" fill="${branding.backgroundAlt}" opacity="0.92"/>`,
      `  <rect x="${x}" y="${y}" width="${w}" height="6" rx="3" fill="${accent}"/>`,
      `  <text x="${x + 40}" y="${y + 70}" font-family="${typography.stack}" font-size="28" fill="${branding.muted}" letter-spacing="4">PUESTO</text>`,
      `  <text x="${x + 40}" y="${y + 162}" font-family="${typography.stack}" font-weight="bold" font-size="104" fill="${branding.foreground}">#${esc(position)}</text>`,
      movedBy
        ? `  <text x="${x + 210}" y="${y + 162}" font-family="${typography.stack}" font-weight="bold" font-size="40" fill="${accent}">▲ ${esc(movedBy)}</text>`
        : "",
      ...rungs,
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

/**
 * Chooses a graphic for a caption, from the numbers it already states.
 *
 * Returns `none` when the caption carries no figure worth drawing — a card of
 * plain prose stays plain rather than acquiring decoration that means nothing.
 */
export function graphicFor(
  caption: string,
  accent: string,
  y: number,
  evidenceText: string,
): SceneGraphic {
  const mentions = numericMentions(caption);

  const score = mentions.find((m) => m.kind === "score");
  if (score) {
    return scoreboardSvg(score, y, accent, teamsFrom(caption));
  }

  const rank = mentions.find((m) => m.kind === "rank");
  if (rank) {
    // A movement is drawn only if the evidence states one.
    const moved = numericMentions(evidenceText).find(
      (m) => m.kind === "count" && m.unit === "puesto",
    );
    return rankLadderSvg(rank.value, y, accent, moved?.value);
  }

  return { kind: "none", height: 0, svg: "" };
}

/** Spanish articles and particles that are never a team name. */
const NOT_A_NAME = new Set([
  "los", "las", "el", "la", "un", "una", "de", "del", "y", "en", "a", "al",
]);

/**
 * Pulls two team names out of a caption that states a score.
 *
 * Only used as scoreboard labels. The first pass took the caption's opening
 * word, which on "Los Gators de Florida…" is the article — the board read
 * "LOS vs OLE MISS". Articles are skipped, and if a side cannot be identified
 * the board is drawn without names rather than with a guess.
 */
export function teamsFrom(caption: string): [string, string] | undefined {
  const capitalised = (text: string): string[] =>
    (text.match(/[A-ZÁÉÍÓÚÑ][\wÁÉÍÓÚÑáéíóúñ.'-]*/g) ?? []).filter(
      (w) => !NOT_A_NAME.has(w.toLowerCase()),
    );

  const scoreAt = /\d+\s*[-–]\s*\d+/.exec(caption);
  if (!scoreAt) return undefined;

  const before = caption.slice(0, scoreAt.index);
  const names = capitalised(before);
  if (names.length < 2) return undefined;

  // The subject opens the sentence; the opponent is named just before the
  // score ("… tras aplastar a Ole Miss 52-28" -> Ole Miss).
  const subject = names[0];
  const tail = names.slice(1);
  const opponent =
    tail.length >= 2 && /^(ole|new|san|los|las|kansas|green|tampa)$/i.test(tail.at(-2) ?? "")
      ? `${tail.at(-2)} ${tail.at(-1)}`
      : tail.at(-1);

  if (!opponent || opponent.toLowerCase() === subject.toLowerCase()) return undefined;
  return [subject, opponent];
}
