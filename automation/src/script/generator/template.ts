/**
 * The deterministic template writer — the module's original behaviour, wrapped
 * in the generator interface.
 *
 * It composes narration only from sentences that already exist in the source,
 * so it can never invent anything; the cost is that it reads like a document
 * being read aloud. It remains the default until the Claude adapter is approved.
 */
import { buildScript } from "../build";
import { formatSpec } from "../../formats";
import { generatedAssets } from "../../render/ffmpeg";
import { estimateClipSeconds, eventKeyFor, fingerprintNarration } from "./assemble";
import type {
  Claim,
  EditorialPackage,
  GenerationOutcome,
  GenerationRequest,
  ScriptGenerator,
} from "./types";

export class TemplateScriptGenerator implements ScriptGenerator {
  readonly id = "template";
  readonly model = null;

  constructor(private readonly now: () => string = () => new Date().toISOString().slice(0, 10)) {}

  available(): boolean {
    return true;
  }

  async generate(request: GenerationRequest): Promise<GenerationOutcome> {
    const { item } = request;
    const script = buildScript(item);

    const estimated = estimateClipSeconds(script.scenes, request.wordsPerMinute);
    if (estimated < request.minDurationSec || estimated > request.maxDurationSec) {
      return {
        ok: false,
        reason: "duration-out-of-band",
        detail: `template script estimates ${estimated.toFixed(1)}s, outside ${request.minDurationSec}-${request.maxDurationSec}s`,
      };
    }

    // Every sentence is lifted verbatim, so each one is a verified claim
    // pointing at the evidence item it came from.
    const claims: Claim[] = script.scenes
      .filter((s) => s.kind === "beat")
      .map((scene) => {
        const match = request.evidence.find((e) => scene.narration.includes(e.text));
        return {
          text: scene.narration,
          kind: "verified" as const,
          evidenceIndices: match ? [match.index] : [],
        };
      });

    const editorial: EditorialPackage = {
      slug: item.slug,
      format: item.format,
      script,
      sourcePath: item.provenance.briefingPath,
      sourceDate: item.provenance.briefingDate,
      generatedAt: this.now(),
      confidence: item.confidence,
      claims,
      evidence: request.evidence,
      references: item.sources,
      mediaRights: generatedAssets().map((a) => ({
        path: a.path,
        license: a.license,
        rightsHolder: a.rightsHolder,
      })),
      generator: this.id,
      model: null,
      promptVersion: `template-${formatSpec(item.format).id}`,
      usage: null,
      scriptFingerprint: fingerprintNarration(script.scenes),
      eventKey: eventKeyFor(item.title, item.provenance.briefingDate),
    };

    return { ok: true, result: { script, editorial } };
  }
}
