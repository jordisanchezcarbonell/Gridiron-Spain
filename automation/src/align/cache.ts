/**
 * Alignment cache.
 *
 * Forced alignment loads a 1.2 GB model and takes seconds; a re-render that
 * changes only the visuals should not pay for it again. The key covers
 * everything that could change the answer - the audio bytes, the words, the
 * language and the aligner version - so a stale entry cannot be served.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import type { AlignmentResult } from "./types";

export function cacheDir(outDir: string): string {
  return path.join(outDir, ".alignment-cache");
}

/** Hash of the audio bytes, the words, the language and the aligner version. */
export function cacheKey(
  audioPath: string,
  words: string[],
  language: string,
  alignerVersion: string,
): string {
  const hash = crypto.createHash("sha256");
  hash.update(fs.readFileSync(audioPath));
  hash.update(" ");
  hash.update(words.join(" "));
  hash.update(" ");
  hash.update(language);
  hash.update(" ");
  hash.update(alignerVersion);
  return hash.digest("hex").slice(0, 32);
}

export function readCache(outDir: string, key: string): AlignmentResult | undefined {
  const file = path.join(cacheDir(outDir), `${key}.json`);
  if (!fs.existsSync(file)) return undefined;
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as AlignmentResult;
  } catch {
    return undefined;
  }
}

export function writeCache(outDir: string, key: string, result: AlignmentResult): string {
  const dir = cacheDir(outDir);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${key}.json`);
  fs.writeFileSync(file, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  return file;
}
