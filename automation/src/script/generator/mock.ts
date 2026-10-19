/**
 * Deterministic generator for tests and offline runs.
 *
 * It costs nothing and never touches the network, but it is not a stub that
 * returns canned text: it runs the real assembly, grounding and duration
 * checks, so a test exercises the whole path a provider response would take.
 * Output depends only on the request, so two runs are byte-identical.
 */
import { assemble, spokenSeconds, type RawScript } from "./assemble";
import { PROMPT_VERSION } from "./prompt";
import type { GenerationOutcome, GenerationRequest, ScriptGenerator, TokenUsage } from "./types";

/** Fixed date so packages generated in tests do not change daily. */
export const MOCK_DATE = "2026-01-01";

export interface MockOptions {
  /** Force a specific failure, to exercise the rejection paths. */
  failWith?: RawScript | "malformed" | "ungrounded";
  now?: string;
}

export class MockScriptGenerator implements ScriptGenerator {
  readonly id = "mock";
  readonly model = "mock-model";

  constructor(private readonly options: MockOptions = {}) {}

  available(): boolean {
    return true;
  }

  async generate(request: GenerationRequest): Promise<GenerationOutcome> {
    const raw = this.compose(request);
    const text = [raw.hook, ...raw.beats, raw.conclusion].join(" ");
    const usage: TokenUsage = {
      // Deterministic, derived from the material rather than measured.
      inputTokens: Math.round(request.evidence.map((e) => e.text).join(" ").length / 4),
      outputTokens: Math.round(text.length / 4),
      cacheReadTokens: 0,
      cacheWriteTokens: 0,
      estimatedCostUsd: 0,
    };

    return assemble({
      request,
      raw,
      generator: this.id,
      model: this.model,
      promptVersion: `mock-${PROMPT_VERSION}`,
      usage,
      now: this.options.now ?? MOCK_DATE,
    });
  }

  /**
   * Builds a script from the evidence, packing beats until the clip reaches
   * the middle of the target band. The wording is the evidence's own, so the
   * grounding check passes for the same reason the template generator's does.
   */
  private compose(request: GenerationRequest): RawScript {
    if (this.options.failWith === "malformed") {
      return { hook: "", beats: [], conclusion: "", claims: [] };
    }
    if (this.options.failWith === "ungrounded") {
      return {
        hook: request.item.title,
        beats: ["El marcador final fue 99-0 en la prorroga."],
        conclusion: "Queda decidido",
        claims: [
          { text: "El marcador final fue 99-0 en la prorroga.", kind: "verified", evidenceIndices: [0] },
        ],
      };
    }
    if (typeof this.options.failWith === "object") return this.options.failWith;

    const hook = request.item.title;
    const target = (request.minDurationSec + request.maxDurationSec) / 2;
    const fixedOverhead =
      spokenSeconds(hook, request.wordsPerMinute) + 2.0 + 1.0 + 3.4 + 2.5;

    const beats: string[] = [];
    let spent = fixedOverhead;
    for (const evidence of request.evidence) {
      if (evidence.text === hook) continue;
      const cost = spokenSeconds(evidence.text, request.wordsPerMinute) + 0.55;
      if (beats.length > 0 && spent + cost > target) break;
      beats.push(evidence.text);
      spent += cost;
      if (beats.length >= 6) break;
    }

    const conclusion = `Eso deja a ${firstSubject(hook)} con la atencion puesta en lo que viene`;

    return {
      hook,
      beats,
      conclusion,
      claims: [
        ...beats.map((text, i) => ({
          text,
          kind: "verified" as const,
          evidenceIndices: [request.evidence.find((e) => e.text === text)?.index ?? i],
        })),
        { text: conclusion, kind: "inference" as const, evidenceIndices: [] },
      ],
    };
  }
}

/** First proper noun of the headline, used to close the clip without new facts. */
function firstSubject(title: string): string {
  const match = title.match(/\b[A-ZÁÉÍÓÚÑ][\wáéíóúñ'-]+/);
  return match ? match[0] : "el equipo";
}
