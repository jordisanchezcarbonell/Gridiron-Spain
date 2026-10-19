/**
 * Narration providers.
 *
 * `say` is the default: fully local, offline, no API key and no third-party
 * rights questions. A hosted voice (ElevenLabs) can be added later behind the
 * same interface without touching the pipeline.
 */
import type { Scene } from "../types";

export interface SynthesisRequest {
  text: string;
  /** Absolute path of the audio file to write (`.aiff`). */
  outPath: string;
}

export interface TtsProvider {
  readonly id: string;
  /** True when the provider can run on this machine right now. */
  available(): boolean;
  synthesize(request: SynthesisRequest): Promise<void>;
}

export type NarratedScene = Scene & { audioPath: string; durationSec: number };
