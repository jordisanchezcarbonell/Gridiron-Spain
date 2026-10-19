/**
 * Pre-render validations. A clip that fails any `error` is not rendered.
 *
 * Four independent rules, matching the editorial constraints:
 *  - sources:      a factual clip must carry at least one source link
 *  - duplicates:   the slug must not already be in the ledger
 *  - media-rights: every media asset needs an explicit licence and rights holder
 *  - duration:     measured length must sit inside the format's band
 */
import type { Cue, MediaAsset, RenderProbe, ValidationIssue, VideoScript } from "../types";
import { formatSpec } from "../formats";
import { findEntry, type Ledger } from "../ledger";
import { audio, captions, publishableConfidence, video } from "../config";
import { maxReadableChars } from "../render/svg";
import { detectLanguage } from "./language";

/** Licences that need no further paperwork. */
const SELF_CLEARING_LICENSES = ["generated", "own work", "public domain", "cc0"];

export function validateSources(script: VideoScript): ValidationIssue[] {
  if (script.sources.length > 0) return [];
  // Curiosity clips come from research docs that always record a `url`; a news
  // clip can legitimately be sourced by a briefing-level "SOURCES USED" block,
  // so this is a warning for curiosities and an error for news.
  const severity = script.format === "news" ? "error" : "warning";
  return [
    {
      rule: "sources",
      severity,
      message: `no source link on "${script.slug}"; a factual clip must cite where the facts came from`,
    },
  ];
}

export function validateConfidence(script: VideoScript): ValidationIssue[] {
  if ((publishableConfidence as readonly string[]).includes(script.confidence)) return [];
  return [
    {
      rule: "confidence",
      severity: "error",
      message: `confidence is ${script.confidence}; only ${publishableConfidence.join("/")} may be rendered`,
    },
  ];
}

export function validateDuplicates(script: VideoScript, ledger: Ledger): ValidationIssue[] {
  const seen = findEntry(ledger, script.slug);
  if (!seen) return [];
  if (seen.contentHash === script.contentHash) {
    return [
      {
        rule: "duplicates",
        severity: "error",
        message: `"${script.slug}" was already produced on ${seen.producedAt} (${seen.videoPath}) with identical content`,
      },
    ];
  }
  return [
    {
      rule: "duplicates",
      severity: "warning",
      message: `"${script.slug}" was produced on ${seen.producedAt}; content changed, so this is a re-cut`,
    },
  ];
}

export function validateMediaRights(assets: MediaAsset[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  for (const asset of assets) {
    const license = asset.license.trim().toLowerCase();
    if (!license || !asset.rightsHolder.trim()) {
      issues.push({
        rule: "media-rights",
        severity: "error",
        message: `asset "${asset.path}" has no licence or rights holder; it cannot be used`,
      });
      continue;
    }
    if (SELF_CLEARING_LICENSES.some((l) => license.includes(l))) continue;
    if (!asset.writtenPermission) {
      issues.push({
        rule: "media-rights",
        severity: "error",
        message: `asset "${asset.path}" is licensed "${asset.license}" and needs written permission on file before use`,
      });
    }
  }
  return issues;
}

/**
 * Target band is 30-60s. Over the maximum is always an error: the clip would be
 * cut by the platform or lose the viewer.
 *
 * Under the target is an error for EXPLAINER, which draws on long-form research
 * and has the material to fill it. For NEWS it is a *warning* down to the
 * absolute floor: a radar briefing carries ~40 words per story, which narrates
 * to under 30s, and inflating the pauses to reach the target produces a slower,
 * worse clip. The shortfall is reported on every run rather than hidden.
 */
export function validateDuration(script: VideoScript, measuredSec: number): ValidationIssue[] {
  const spec = formatSpec(script.format);

  if (measuredSec > spec.maxDurationSec) {
    return [
      {
        rule: "duration",
        severity: "error",
        message: `${measuredSec.toFixed(1)}s exceeds the ${spec.maxDurationSec}s limit for ${spec.label}`,
      },
    ];
  }

  if (measuredSec < video.absoluteMinDurationSec) {
    return [
      {
        rule: "duration",
        severity: "error",
        message: `${measuredSec.toFixed(1)}s is under the ${video.absoluteMinDurationSec}s hard floor for ${spec.label}`,
      },
    ];
  }

  if (measuredSec < spec.minDurationSec) {
    return [
      {
        rule: "duration",
        severity: "error",
        message: `${measuredSec.toFixed(1)}s is under the ${spec.minDurationSec}s minimum for ${spec.label}`,
      },
    ];
  }

  return [];
}

/**
 * Legibility: no caption line may overflow the safe box, and no card may carry
 * more lines than the template reserves room for. Checked on the cues, so it
 * catches text that the wrapper could not break small enough.
 */
export function validateLegibility(cues: Cue[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  for (const cue of cues) {
    const isHook = cue.kind === "hook";
    // The fitter may have shrunk the type to fit a long word; judge the card at
    // the size it was actually set in, not the template default.
    const fontSize = cue.fontSize;
    const maxLines = isHook ? captions.hookMaxLines : captions.maxLines;
    const limit = maxReadableChars(fontSize);
    const lines = cue.text.split("\n");

    if (lines.length > maxLines) {
      issues.push({
        rule: "legibility",
        severity: "error",
        message: `cue ${cue.index} has ${lines.length} lines; the ${cue.kind} card holds ${maxLines}`,
      });
    }
    for (const line of lines) {
      if (line.length > limit) {
        issues.push({
          rule: "legibility",
          severity: "error",
          message: `cue ${cue.index} line "${line.slice(0, 28)}…" is ${line.length} chars; ${limit} fit the safe box at ${fontSize}px`,
        });
      }
    }
  }
  return issues;
}

/** Cues must not overlap, and none may flash by too fast to read. */
export function validateCueTiming(cues: Cue[], minCueSec: number): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  for (const [i, cue] of cues.entries()) {
    // Epsilon: a cue allocated exactly the floor must not fail on rounding.
    if (cue.endSec - cue.startSec < minCueSec - 0.005) {
      issues.push({
        rule: "legibility",
        severity: "warning",
        message: `cue ${cue.index} is on screen ${(cue.endSec - cue.startSec).toFixed(2)}s, under the ${minCueSec}s floor`,
      });
    }
    if (i > 0 && cue.startSec + 1e-6 < cues[i - 1].endSec) {
      issues.push({
        rule: "legibility",
        severity: "error",
        message: `cue ${cue.index} starts before cue ${cues[i - 1].index} ends`,
      });
    }
  }
  return issues;
}

/** Container-level checks on the finished file: codecs, size, audio, blanks. */
export function validateOutput(script: VideoScript, probe: RenderProbe): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const err = (rule: ValidationIssue["rule"], message: string) =>
    issues.push({ rule, severity: "error", message });

  if (probe.width !== video.width || probe.height !== video.height) {
    err("dimensions", `rendered ${probe.width}x${probe.height}, expected ${video.width}x${video.height}`);
  }
  if (probe.videoCodec !== "h264") err("codecs", `video codec is ${probe.videoCodec}, expected h264`);
  if (probe.audioCodec !== "aac") err("codecs", `audio codec is ${probe.audioCodec}, expected aac`);
  if (!probe.hasSubtitleTrack) err("codecs", "no subtitle track was muxed in");
  if (Math.abs(probe.fps - video.fps) > 0.5) {
    err("codecs", `frame rate is ${probe.fps.toFixed(2)}, expected ${video.fps}`);
  }

  if (probe.meanVolumeDb < audio.minMeanDb) {
    err("audio", `mean volume ${probe.meanVolumeDb.toFixed(1)} dB is below the ${audio.minMeanDb} dB floor`);
  }
  if (probe.maxVolumeDb > audio.maxPeakDb) {
    err("audio", `peak ${probe.maxVolumeDb.toFixed(1)} dB exceeds the ${audio.maxPeakDb} dB ceiling (clipping risk)`);
  }
  if (!Number.isFinite(probe.meanVolumeDb)) err("audio", "the clip has no measurable audio");

  if (probe.blankFrameRatio > 0.02) {
    err("blank-frames", `${(probe.blankFrameRatio * 100).toFixed(1)}% of the clip is blank picture`);
  }

  issues.push(...validateDuration(script, probe.durationSec));
  return issues;
}

/**
 * The narration must be in the clip's own locale. A Spanish voice reading an
 * English research document is wrong in both languages, and no amount of
 * production polish fixes it.
 */
export function validateLanguage(script: VideoScript): ValidationIssue[] {
  const narration = script.scenes
    .filter((s) => s.kind !== "outro")
    .map((s) => s.narration)
    .join(" ");
  const guess = detectLanguage(narration);
  if (guess.language === "unknown" || guess.language === script.locale) return [];
  return [
    {
      rule: "language",
      severity: "error",
      message:
        `narration looks like ${guess.language} (${guess.englishHits} en / ${guess.spanishHits} es stopwords) ` +
        `but the clip is ${script.locale}; the source document is not in the clip's language`,
    },
  ];
}

export interface ValidationReport {
  issues: ValidationIssue[];
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  ok: boolean;
}

export function report(issues: ValidationIssue[]): ValidationReport {
  const errors = issues.filter((i) => i.severity === "error");
  const warnings = issues.filter((i) => i.severity === "warning");
  return { issues, errors, warnings, ok: errors.length === 0 };
}

/** Everything checkable before any audio or video is rendered. */
export function validateBeforeRender(
  script: VideoScript,
  ledger: Ledger,
  assets: MediaAsset[],
): ValidationReport {
  return report([
    ...validateConfidence(script),
    ...validateLanguage(script),
    ...validateSources(script),
    ...validateDuplicates(script, ledger),
    ...validateMediaRights(assets),
  ]);
}
