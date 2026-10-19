/**
 * Editorial package persistence.
 *
 * One JSON file per generated clip, written next to the MP4. It is the record
 * an editor reads to approve a clip and the record that proves, after the fact,
 * where every sentence came from.
 */
import fs from "node:fs";
import path from "node:path";
import type { EditorialPackage } from "./generator/types";
import type { EvaluationReport } from "./evaluate";

export interface StoredPackage extends EditorialPackage {
  /** The independent quality pass, stored alongside what it judged. */
  evaluation: EvaluationReport;
}

export function packagePath(outDir: string, slug: string): string {
  return path.join(outDir, `${slug}.editorial.json`);
}

export function writePackage(
  pkg: EditorialPackage,
  evaluation: EvaluationReport,
  outDir: string,
): string {
  fs.mkdirSync(outDir, { recursive: true });
  const file = packagePath(outDir, pkg.slug);
  const stored: StoredPackage = { ...pkg, evaluation };
  fs.writeFileSync(file, `${JSON.stringify(stored, null, 2)}\n`, "utf8");
  return file;
}

export function readPackage(file: string): StoredPackage {
  return JSON.parse(fs.readFileSync(file, "utf8")) as StoredPackage;
}

/** A short, human-readable digest for the run report. */
export function summarize(pkg: StoredPackage): string {
  const verified = pkg.claims.filter((c) => c.kind === "verified").length;
  const inferred = pkg.claims.filter((c) => c.kind === "inference").length;
  const spoken = pkg.script.scenes.map((s) => s.narration).join(" ").split(/\s+/).length;
  return [
    `${pkg.generator}${pkg.model ? ` (${pkg.model})` : ""} · prompt ${pkg.promptVersion}`,
    `${verified} verified / ${inferred} inferred claims · ${pkg.references.length} refs · ${spoken} words`,
    `quality ${pkg.evaluation.score}/100${pkg.evaluation.ok ? "" : " (FAILED)"}`,
  ].join(" · ");
}

/**
 * Writes a rejected script so the failure can be read afterwards.
 *
 * A clip refused by the quality gate used to leave nothing behind: no package,
 * no dump (`--dump-cli-response` only fires when *parsing* fails), so the only
 * evidence of what the model wrote was a one-line message in the run report.
 * This closes that gap without shipping anything.
 */
export function writeRejection(
  pkg: EditorialPackage,
  findings: { dimension: string; severity: string; message: string }[],
  outDir: string,
): string {
  const dir = path.join(outDir, ".rejected");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${pkg.slug}.rejected.json`);
  fs.writeFileSync(
    file,
    `${JSON.stringify(
      {
        rejectedAt: pkg.generatedAt,
        slug: pkg.slug,
        format: pkg.format,
        generator: pkg.generator,
        model: pkg.model,
        promptVersion: pkg.promptVersion,
        findings,
        // The script as written, so the wording can be judged by a person.
        scenes: pkg.script.scenes.map((s) => ({ id: s.id, kind: s.kind, narration: s.narration })),
        claims: pkg.claims,
        evidence: pkg.evidence,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  return file;
}
