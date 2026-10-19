/**
 * Frame templates as SVG, rasterised to PNG.
 *
 * The ffmpeg on this machine is built without freetype/libass, so neither
 * `drawtext` nor `subtitles` exists (verified by rendering, not by
 * `ffmpeg -h filter=…`, which reports unknown filters as present). Text is
 * therefore drawn here and the clip is assembled from finished frames.
 *
 * Everything is generated geometry and type — no third-party media — so a
 * render carries no rights exposure.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import type { Cue, TemplateId } from "../types";
import { branding, safeArea, safeBox, typography, video } from "../config";
import { graphicFor } from "./graphics";

/** XML-escapes text so quotes and ampersands in headlines cannot break the SVG. */
export function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export interface FrameSpec {
  template: TemplateId;
  kicker: string;
  accent: string;
  /** Date or other meta shown next to the kicker. */
  meta: string;
  /** Source attribution, shown small under news captions. */
  sourceLabel?: string;
  numberBeats: boolean;
  /** Evidence text, so a graphic can only draw figures the source states. */
  evidenceText?: string;
}

/**
 * How far through a card's entry animation a frame is: 0 at the start, 1 once
 * the card has settled. Only the caption and its graphic move; the chrome is
 * identical in every frame of the clip.
 *
 * This replaced a cross-fade between whole flat frames. Because each frame
 * carried its own chrome — and its own point in a push-in — the transition
 * visibly doubled the accent bar and the brand lockup, which reads as a glitch
 * rather than as motion.
 */
export interface EntryProgress {
  t: number;
}

/**
 * Yard-line motif: our own geometry, evoking a gridiron without using anyone's
 * footage or marks. Drawn faint so it never competes with the type.
 */
function fieldMotif(accent: string): string {
  const lines: string[] = [];
  for (let i = 0; i < 9; i++) {
    const y = 300 + i * 170;
    lines.push(
      `  <line x1="0" y1="${y}" x2="${video.width}" y2="${y - 90}" stroke="${accent}" stroke-width="2" opacity="0.07"/>`,
    );
  }
  for (let i = 0; i < 5; i++) {
    const y = 360 + i * 320;
    lines.push(
      `  <line x1="${video.width - 300}" y1="${y}" x2="${video.width}" y2="${y - 52}" stroke="${branding.foreground}" stroke-width="3" opacity="0.05"/>`,
    );
  }
  return lines.join("\n");
}

/** Top accent bar plus the progress indicator. */
function topChrome(accent: string, progress: number): string {
  const filled = Math.max(0, Math.min(1, progress)) * video.width;
  return `  <rect x="0" y="0" width="${video.width}" height="10" fill="${accent}"/>
  <rect x="0" y="10" width="${video.width}" height="6" fill="${branding.foreground}" opacity="0.12"/>
  <rect x="0" y="10" width="${filled.toFixed(1)}" height="6" fill="${accent}" opacity="0.95"/>`;
}

/** Kicker chip and the meta line beside it. */
function kickerRow(spec: FrameSpec, beatLabel?: string): string {
  const chipWidth = Math.max(210, spec.kicker.length * 26 + 84);
  const chipY = safeArea.top - 10;
  const parts = [
    `  <rect x="${safeBox.x}" y="${chipY}" width="${chipWidth}" height="74" rx="37" fill="${spec.accent}"/>`,
    `  <text x="${safeBox.x + chipWidth / 2}" y="${chipY + 50}" font-family="${typography.stack}" font-weight="bold" font-size="${typography.kickerSize}" fill="${branding.foreground}" text-anchor="middle" letter-spacing="5">${escapeXml(spec.kicker)}</text>`,
  ];
  if (beatLabel) {
    parts.push(
      `  <text x="${safeBox.x + chipWidth + 32}" y="${chipY + 50}" font-family="${typography.stack}" font-weight="bold" font-size="${typography.kickerSize}" fill="${branding.muted}" letter-spacing="3">${escapeXml(beatLabel)}</text>`,
    );
  }
  if (spec.meta) {
    parts.push(
      `  <text x="${safeBox.x}" y="${chipY + 126}" font-family="${typography.stack}" font-size="${typography.metaSize}" fill="${branding.muted}" letter-spacing="2">${escapeXml(spec.meta)}</text>`,
    );
  }
  return parts.join("\n");
}

/** Brand lockup, kept above the bottom safe area. */
function brandLockup(accent: string): string {
  const baseY = video.height - safeArea.bottom + 120;
  return `  <rect x="${safeBox.x}" y="${baseY - 58}" width="64" height="6" fill="${accent}"/>
  <text x="${safeBox.x}" y="${baseY}" font-family="${typography.stack}" font-weight="bold" font-size="${typography.wordmarkSize}" fill="${branding.foreground}" letter-spacing="6">${escapeXml(branding.wordmark)}</text>
  <text x="${safeBox.x}" y="${baseY + 44}" font-family="${typography.stack}" font-size="${typography.metaSize}" fill="${branding.muted}" letter-spacing="1">${escapeXml(branding.byline)}</text>
  <text x="${safeBox.x}" y="${baseY + 86}" font-family="${typography.stack}" font-size="${typography.metaSize}" fill="${branding.muted}" opacity="0.8">${escapeXml(branding.handle)}</text>`;
}

interface TextBlock {
  lines: string[];
  fontSize: number;
  /** Vertical centre of the block. */
  centerY: number;
  align: "start" | "middle";
  weight: "bold" | "600";
  /** Word to pick out in the accent colour, by position among the words. */
  activeWordIndex?: number;
}

/**
 * Renders one line, tinting the word being spoken.
 *
 * `offset` is the index of this line's first word within the whole card, so a
 * card that wraps still highlights the right word. The tint is a fill change
 * only: no size or weight shift, because reflowing type under a moving
 * highlight is harder to read than the plain card it replaced.
 */
function lineContent(line: string, offset: number, activeIndex: number | undefined, accent: string): string {
  const words = line.split(/\s+/).filter(Boolean);
  if (activeIndex === undefined) return escapeXml(line);
  if (activeIndex < offset || activeIndex >= offset + words.length) return escapeXml(line);

  return words
    .map((word, i) => {
      const text = escapeXml(word);
      const space = i === 0 ? "" : " ";
      return offset + i === activeIndex
        ? `${space}<tspan fill="${accent}">${text}</tspan>`
        : `${space}${text}`;
    })
    .join("");
}

/** Draws a text block with a readability panel behind it. */
function textBlock(block: TextBlock, accent: string, panel: boolean): string {
  const lineHeight = Math.round(block.fontSize * typography.lineHeightRatio);
  const blockHeight = block.lines.length * lineHeight;
  const firstBaseline = block.centerY - blockHeight / 2 + block.fontSize * 0.82;
  const x = block.align === "start" ? safeBox.x : safeBox.centerX;

  const out: string[] = [];
  if (panel) {
    const padX = 36;
    const padY = 30;
    out.push(
      `  <rect x="${safeBox.x - padX / 2}" y="${(block.centerY - blockHeight / 2 - padY).toFixed(0)}" width="${safeBox.width + padX}" height="${(blockHeight + padY * 2).toFixed(0)}" rx="28" fill="${branding.background}" opacity="0.72"/>`,
    );
    out.push(
      `  <rect x="${safeBox.x - padX / 2}" y="${(block.centerY - blockHeight / 2 - padY).toFixed(0)}" width="8" height="${(blockHeight + padY * 2).toFixed(0)}" rx="4" fill="${accent}"/>`,
    );
  }
  out.push(
    `  <g font-family="${typography.stack}" font-weight="${block.weight}" font-size="${block.fontSize}" fill="${branding.foreground}" text-anchor="${block.align}">`,
  );
  let wordOffset = 0;
  block.lines.forEach((line, i) => {
    const content = lineContent(line, wordOffset, block.activeWordIndex, accent);
    out.push(
      `    <text x="${x}" y="${(firstBaseline + i * lineHeight).toFixed(0)}" stroke="#05080F" stroke-width="7" paint-order="stroke">${content}</text>`,
    );
    wordOffset += line.split(/\s+/).filter(Boolean).length;
  });
  out.push("  </g>");
  return out.join("\n");
}

function document(body: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${video.width}" height="${video.height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0%" stop-color="${branding.backgroundAlt}"/>
      <stop offset="60%" stop-color="${branding.background}"/>
      <stop offset="100%" stop-color="#070C16"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${video.width}" height="${video.height}" fill="url(#bg)"/>
${body}
</svg>
`;
}

/**
 * One complete, opaque frame for a cue.
 *
 * Flattening the whole frame here means ffmpeg composites nothing per frame.
 * An earlier version looped a transparent card per cue across the entire clip
 * and gated each with `enable=`, which made ffmpeg alpha-blend every card over
 * every frame — minutes per clip.
 */
export function frameSvg(cue: Cue, spec: FrameSpec, entry: EntryProgress = { t: 1 }): string {
  const lines = cue.text.split("\n");
  const fontSize = cue.fontSize;
  // Ease-out: fast settle, no bounce.
  const e = 1 - Math.pow(1 - Math.max(0, Math.min(1, entry.t)), 3);
  const opacity = e.toFixed(3);
  const dy = (28 * (1 - e)).toFixed(1);

  // Chrome first, identical in every frame of the clip so nothing flickers.
  const parts: string[] = [fieldMotif(spec.accent), topChrome(spec.accent, cue.progress)];

  // The caption and its graphic are the only animated layer.
  const animated: string[] = [];
  const beatLabel =
    spec.numberBeats && cue.kind === "beat" && cue.beatIndex && cue.beatTotal
      ? `${cue.beatIndex}/${cue.beatTotal}`
      : undefined;

  if (cue.kind === "hook") {
    const centerY = safeBox.y + safeBox.height * 0.4;
    const blockHeight = lines.length * Math.round(fontSize * typography.lineHeightRatio);
    parts.push(kickerRow(spec));
    animated.push(
      `  <rect x="${safeBox.x}" y="${(centerY - blockHeight / 2 - 72).toFixed(0)}" width="150" height="10" fill="${spec.accent}"/>`,
    );
    animated.push(
      textBlock(
        { lines, fontSize, centerY, align: "start", weight: "bold", activeWordIndex: cue.activeWordIndex },
        spec.accent,
        false,
      ),
    );
  } else if (cue.kind === "outro") {
    const centerY = safeBox.y + safeBox.height * 0.42;
    parts.push(kickerRow(spec));
    animated.push(
      textBlock(
        { lines, fontSize, centerY, align: "middle", weight: "bold", activeWordIndex: cue.activeWordIndex },
        spec.accent,
        false,
      ),
    );
    if (spec.sourceLabel) {
      animated.push(
        `  <text x="${safeBox.centerX}" y="${(centerY + 170).toFixed(0)}" font-family="${typography.stack}" font-size="${typography.sourceSize}" fill="${branding.muted}" text-anchor="middle">${escapeXml(spec.sourceLabel)}</text>`,
      );
    }
  } else {
    parts.push(kickerRow(spec, beatLabel));

    // A graphic drawn from the figures this card already states.
    const graphic = graphicFor(
      cue.text.replace(/\n/g, " "),
      spec.accent,
      safeBox.y + 170,
      spec.evidenceText ?? "",
    );
    const hasGraphic = graphic.kind !== "none";
    if (hasGraphic) animated.push(graphic.svg);

    // With a graphic above it, the caption sits lower; alone, it centres.
    const centerY = hasGraphic
      ? safeBox.y + 170 + graphic.height + 40 + (lines.length * fontSize) / 2
      : safeBox.y + safeBox.height * 0.5;

    animated.push(
      textBlock(
        { lines, fontSize, centerY, align: "middle", weight: "bold", activeWordIndex: cue.activeWordIndex },
        spec.accent,
        !hasGraphic,
      ),
    );
    if (spec.sourceLabel) {
      const lineHeight = Math.round(fontSize * typography.lineHeightRatio);
      const y = centerY + (lines.length * lineHeight) / 2 + 60;
      animated.push(
        `  <text x="${safeBox.centerX}" y="${y.toFixed(0)}" font-family="${typography.stack}" font-size="${typography.sourceSize}" fill="${branding.muted}" text-anchor="middle">${escapeXml(spec.sourceLabel)}</text>`,
      );
    }
  }

  parts.push(
    `  <g opacity="${opacity}" transform="translate(0 ${dy})">`,
    animated.join("\n"),
    "  </g>",
  );

  parts.push(brandLockup(spec.accent));
  return document(parts.join("\n"));
}

/** True when an SVG rasteriser is installed. */
export function rasterizerAvailable(): boolean {
  try {
    execFileSync("rsvg-convert", ["--version"], { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

/**
 * Writes `svg` to disk and rasterises it. Frames are rendered oversized so the
 * renderer can push in on them without softening the type.
 */
export function rasterize(svg: string, pngPath: string, scale = 1): string {
  fs.mkdirSync(path.dirname(pngPath), { recursive: true });
  const svgPath = pngPath.replace(/\.png$/, ".svg");
  fs.writeFileSync(svgPath, svg, "utf8");
  execFileSync(
    "rsvg-convert",
    [
      "-w", String(Math.round(video.width * scale)),
      "-h", String(Math.round(video.height * scale)),
      "-o", pngPath,
      svgPath,
    ],
    { stdio: "pipe" },
  );
  return pngPath;
}

/** Longest caption line that still fits the safe box, for the legibility check. */
export { charsPerLine as maxReadableChars } from "../config";
