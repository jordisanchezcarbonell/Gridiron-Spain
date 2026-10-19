/**
 * Buffer publishing — PREPARED BUT DISABLED.
 *
 * Nothing in this file performs network I/O. There is no HTTP client, no token
 * read and no MCP call: the integration exists only as a typed draft shape plus
 * a guard, so the wiring can be reviewed before anything can leave the machine.
 *
 * Enabling it requires all three, in this order:
 *   1. the editor's written approval, recorded in AGENTS.md;
 *   2. flipping `BUFFER_PUBLISHING_ENABLED` in `automation/src/config.ts`;
 *   3. replacing `publish()` with a real Buffer MCP call.
 *
 * `BUFFER_PUBLISHING_ENABLED` is intentionally a compile-time constant rather
 * than an environment variable, so no `.env`, CLI flag or scheduled routine can
 * turn publishing on by accident.
 */
import fs from "node:fs";
import path from "node:path";
import type { RenderResult, VideoScript } from "../types";
import { BUFFER_PUBLISHING_ENABLED } from "../config";

/** The payload a Buffer MCP `create_post` call would receive. */
export interface BufferDraft {
  /** Buffer profile ids; resolved at publish time, never hardcoded. */
  profileIds: string[];
  text: string;
  mediaPath: string;
  subtitlePath: string;
  /** ISO 8601, or omitted to leave the post in Buffer's queue. */
  scheduledAt?: string;
  /** Carried through so a published clip can be traced back to its briefing. */
  provenance: {
    briefingPath: string;
    briefingDate: string;
    line: number;
    confidence: string;
    sources: string[];
  };
}

export class PublishingDisabledError extends Error {
  constructor() {
    super(
      "Buffer publishing is disabled. Approve it in AGENTS.md and flip BUFFER_PUBLISHING_ENABLED in automation/src/config.ts first.",
    );
    this.name = "PublishingDisabledError";
  }
}

/** Caption text. Facts come from the script; nothing new is written here. */
export function buildCaption(script: VideoScript): string {
  const hashtags = ["#futbolamericano", "#primerdown", script.format === "news" ? "#noticias" : "#historia"];
  return [script.title, "", hashtags.join(" ")].join("\n");
}

/** Builds the draft a reviewer can inspect. Pure: no network, no credentials. */
export function buildDraft(
  script: VideoScript,
  result: RenderResult,
  profileIds: string[] = [],
): BufferDraft {
  return {
    profileIds,
    text: buildCaption(script),
    mediaPath: result.videoPath,
    subtitlePath: result.srtPath,
    provenance: {
      briefingPath: script.provenance.briefingPath,
      briefingDate: script.provenance.briefingDate,
      line: script.provenance.line,
      confidence: script.confidence,
      sources: script.sources.map((s) => s.url),
    },
  };
}

/** Writes the draft next to the video so it can be reviewed before any approval. */
export function writeDraft(draft: BufferDraft, outDir: string, slug: string): string {
  fs.mkdirSync(outDir, { recursive: true });
  const file = path.join(outDir, `${slug}.buffer-draft.json`);
  fs.writeFileSync(file, `${JSON.stringify(draft, null, 2)}\n`, "utf8");
  return file;
}

/**
 * The publish seam. Always throws while publishing is disabled.
 * Kept so the call site and its tests exist before the capability does.
 */
// The parameter documents the future call signature; nothing may consume it
// while publishing is disabled.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function publish(_draft: BufferDraft): Promise<never> {
  throw new PublishingDisabledError();
}

export function publishingEnabled(): boolean {
  return BUFFER_PUBLISHING_ENABLED;
}
