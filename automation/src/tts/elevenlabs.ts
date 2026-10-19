/**
 * Optional ElevenLabs narration provider.
 *
 * Opt-in and credential-free by default: with no `ELEVENLABS_API_KEY` in the
 * environment, `available()` is false and the CLI silently falls back to macOS
 * `say`. Nothing here reads the network, the key or the filesystem until
 * `synthesize()` is called, so the tests exercise the whole class — selection
 * logic, request shape, error handling — without any credential.
 */
import fs from "node:fs";
import path from "node:path";
import type { SynthesisRequest, TtsProvider } from "./index";

export interface ElevenLabsOptions {
  apiKey?: string;
  /** ElevenLabs voice id. Must come from the account; never guessed. */
  voiceId?: string;
  modelId?: string;
  baseUrl?: string;
}

export class MissingCredentialsError extends Error {
  constructor() {
    super(
      "ElevenLabs narration needs ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID. " +
        "Leave them unset to narrate locally with macOS `say`.",
    );
    this.name = "MissingCredentialsError";
  }
}

export class ElevenLabsProvider implements TtsProvider {
  readonly id = "elevenlabs";

  private readonly apiKey?: string;
  private readonly voiceId?: string;
  private readonly modelId: string;
  private readonly baseUrl: string;

  constructor(options: ElevenLabsOptions = {}) {
    this.apiKey = options.apiKey ?? process.env.ELEVENLABS_API_KEY;
    this.voiceId = options.voiceId ?? process.env.ELEVENLABS_VOICE_ID;
    this.modelId = options.modelId ?? process.env.ELEVENLABS_MODEL_ID ?? "eleven_multilingual_v2";
    this.baseUrl = options.baseUrl ?? "https://api.elevenlabs.io";
  }

  /** False unless both a key and a voice are configured, so tests never hit it. */
  available(): boolean {
    return Boolean(this.apiKey && this.voiceId);
  }

  /** The request this provider would issue. Pure, so it can be asserted on. */
  requestFor(text: string): { url: string; headers: Record<string, string>; body: string } {
    if (!this.available()) throw new MissingCredentialsError();
    return {
      url: `${this.baseUrl}/v1/text-to-speech/${this.voiceId}`,
      headers: {
        "xi-api-key": this.apiKey!,
        "content-type": "application/json",
        accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: this.modelId,
        voice_settings: { stability: 0.45, similarity_boost: 0.75 },
      }),
    };
  }

  async synthesize({ text, outPath }: SynthesisRequest): Promise<void> {
    const request = this.requestFor(text);
    const response = await fetch(request.url, {
      method: "POST",
      headers: request.headers,
      body: request.body,
    });
    if (!response.ok) {
      throw new Error(`ElevenLabs returned ${response.status} ${response.statusText}`);
    }
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, Buffer.from(await response.arrayBuffer()));
  }
}
