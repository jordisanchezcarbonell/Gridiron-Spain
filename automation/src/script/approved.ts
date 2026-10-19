/**
 * Approved-script persistence.
 *
 * A script that clears both editorial gates is expensive — it cost a provider
 * call — and until now it was only kept if the render that followed also
 * succeeded. A dry run, which is the step that *proves* a script is good,
 * discarded it: the recommended workflow (plan, read, then render) therefore
 * forced a second paid generation to render something already approved.
 *
 * So approval is persisted at the moment it happens, and a persisted script
 * can be rendered later with no provider involved at all.
 */
import fs from "node:fs";
import path from "node:path";
import type { EditorialPackage } from "./generator/types";
import type { EvaluationReport } from "./evaluate";
import { ctaLine, KNOWN_CTA_LINES, timing } from "../config";
import { generatedAssets } from "../render/ffmpeg";

/** Bumped when the stored shape changes, so a stale file is refused. */
export const APPROVED_SCHEMA = 1;

export interface ApprovedScript {
  schema: number;
  approvedAt: string;
  /** The package exactly as the gates saw it. */
  editorial: EditorialPackage;
  evaluation: EvaluationReport;
}

export function approvedDir(outDir: string): string {
  return path.join(outDir, ".approved");
}

export function approvedPath(outDir: string, slug: string): string {
  return path.join(approvedDir(outDir), `${slug}.approved.json`);
}

/** Stores an approved script. Writing is idempotent per slug. */
export function writeApproved(
  editorial: EditorialPackage,
  evaluation: EvaluationReport,
  outDir: string,
): string {
  const dir = approvedDir(outDir);
  fs.mkdirSync(dir, { recursive: true });
  const file = approvedPath(outDir, editorial.slug);
  const stored: ApprovedScript = {
    schema: APPROVED_SCHEMA,
    approvedAt: editorial.generatedAt,
    editorial,
    evaluation,
  };
  fs.writeFileSync(file, `${JSON.stringify(stored, null, 2)}\n`, "utf8");
  return file;
}

export class ApprovedScriptError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApprovedScriptError";
  }
}

/**
 * Loads an approved script, refusing anything that is not one.
 *
 * The checks are deliberately loud: replaying a half-written or hand-edited
 * file would render words no gate ever saw.
 */
export function readApproved(file: string): ApprovedScript {
  if (!fs.existsSync(file)) {
    throw new ApprovedScriptError(`no approved script at ${file}`);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    throw new ApprovedScriptError(`${file} is not valid JSON`);
  }

  const stored = parsed as Partial<ApprovedScript>;
  if (stored.schema !== APPROVED_SCHEMA) {
    throw new ApprovedScriptError(
      `${file} has schema ${stored.schema ?? "none"}, expected ${APPROVED_SCHEMA}`,
    );
  }
  if (!stored.editorial?.script?.scenes?.length) {
    throw new ApprovedScriptError(`${file} carries no script scenes`);
  }
  if (!Array.isArray(stored.editorial.evidence)) {
    throw new ApprovedScriptError(`${file} carries no evidence to re-validate against`);
  }
  if (!stored.evaluation?.ok) {
    throw new ApprovedScriptError(`${file} was not approved; it records a failed evaluation`);
  }
  return stored as ApprovedScript;
}

/** Approved scripts on disk, newest first. */
export function listApproved(outDir: string): string[] {
  const dir = approvedDir(outDir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".approved.json"))
    .map((f) => path.join(dir, f))
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
}

/** Resolves a path that may be a file, a directory, or a bare slug. */
export function resolveApproved(target: string, outDir: string): string {
  if (fs.existsSync(target) && fs.statSync(target).isFile()) return target;
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    const found = fs
      .readdirSync(target)
      .filter((f) => f.endsWith(".approved.json"))
      .map((f) => path.join(target, f));
    if (found.length === 1) return found[0];
    throw new ApprovedScriptError(
      found.length === 0
        ? `no approved script in ${target}`
        : `${found.length} approved scripts in ${target}; name one`,
    );
  }
  const bySlug = approvedPath(outDir, target.replace(/\.approved\.json$/, ""));
  if (fs.existsSync(bySlug)) return bySlug;
  throw new ApprovedScriptError(`no approved script matching "${target}"`);
}

/**
 * Re-applies current *production* settings to an approved script.
 *
 * The split is deliberate. What the gates approved — the facts, the claims and
 * the evidence behind them — is returned untouched. What belongs to production
 * follows today's configuration, so a fix reaches scripts approved before it:
 *
 *  - **scene padding**, how long a card is held;
 *  - **the closing CTA**, which is our own template text and names the brand;
 *  - **the media-rights manifest**, which has to describe what *this* render
 *    draws rather than what an older one did.
 */
export function withCurrentPacing(approved: ApprovedScript): ApprovedScript {
  const scenes = approved.editorial.script.scenes.map((scene) => {
    switch (scene.kind) {
      case "hook":
        return { ...scene, padBeforeSec: timing.leadInSec, padAfterSec: timing.hookHoldSec };
      case "outro": {
        // The closing CTA is our own template text, not model output, and it
        // names the brand — so it tracks the brand rather than contradicting
        // the wordmark on screen. Only an exact known CTA is swapped.
        const refreshed = refreshCta(scene.narration);
        return {
          ...scene,
          narration: refreshed,
          caption: refreshCta(scene.caption),
          padBeforeSec: 0,
          padAfterSec: timing.outroHoldSec,
        };
      }
      default:
        return { ...scene, padBeforeSec: 0, padAfterSec: timing.beatGapSec };
    }
  });

  return {
    ...approved,
    editorial: {
      ...approved.editorial,
      script: { ...approved.editorial.script, scenes },
      mediaRights: generatedAssets().map((a) => ({
        path: a.path,
        license: a.license,
        rightsHolder: a.rightsHolder,
      })),
    },
  };
}

/** Replaces a previously used CTA with the current one, leaving all else. */
export function refreshCta(text: string): string {
  for (const known of KNOWN_CTA_LINES) {
    if (known !== ctaLine && text.trimEnd().endsWith(known)) {
      return text.trimEnd().slice(0, -known.length) + ctaLine;
    }
  }
  return text;
}
