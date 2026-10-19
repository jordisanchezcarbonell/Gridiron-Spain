/**
 * Optional single-pass repair.
 *
 * When a script is refused for a *fixable* reason — an unbacked figure, filler,
 * a fragment — the material is usually fine and only the wording is wrong.
 * Rather than discard the candidate, the generator may be given one more turn
 * with the findings attached.
 *
 * Deliberately narrow, because a repair loop is the easiest way to burn quota
 * and to talk a model past its own grader:
 *
 *  - **One attempt.** Never a loop. A failed repair is a rejection.
 *  - **It costs a generation**, counted against the same `--max-generations`
 *    ceiling as any other provider call.
 *  - **Only repairable reasons.** A refusal, a timeout or a provider error is
 *    not a wording problem and is never retried here.
 *  - **The whole script is revalidated from scratch**, by the same gates in the
 *    same order. Nothing is carried over from the failed attempt, so a repair
 *    cannot inherit a pass.
 *  - **Off by default.**
 */
import type { RadarItem } from "../types";
import type {
  GenerationOutcome,
  GenerationRequest,
  ScriptGenerator,
} from "./generator/types";
import type { EvaluationFinding } from "./evaluate";

/** Findings that describe wording, which a rewrite can plausibly fix. */
const REPAIRABLE_DIMENSIONS = new Set(["grounding", "language", "structure"]);

/**
 * Whether a second pass is worth a generation.
 *
 * An editorial finding is repairable; a provider failure is not, and neither
 * is a clip whose source material simply cannot carry the format.
 */
export function isRepairable(findings: EvaluationFinding[]): boolean {
  const errors = findings.filter((f) => f.severity === "error");
  if (errors.length === 0) return false;
  // One bad sentence is worth rewriting; a script failing in every dimension
  // is not a wording problem.
  if (errors.length > 4) return false;
  return errors.every((f) => REPAIRABLE_DIMENSIONS.has(f.dimension));
}

/**
 * Builds the request for the second pass.
 *
 * The findings are appended to the item's own material as instructions. The
 * evidence is unchanged — a repair may not introduce new facts, only use the
 * existing ones correctly.
 */
export function repairRequest(
  original: GenerationRequest,
  findings: EvaluationFinding[],
): GenerationRequest {
  const problems = findings
    .filter((f) => f.severity === "error")
    .map((f) => `- [${f.dimension}] ${f.message}`)
    .join("\n");

  const guidance = [
    "El guion anterior fue rechazado por la revisión editorial:",
    problems,
    "",
    "Reescríbelo entero corrigiendo esos puntos. No añadas hechos nuevos:",
    "usa solo la evidencia que ya tienes. Si una cifra no está respaldada,",
    "quítala en vez de buscar otra manera de decirla.",
  ].join("\n");

  const item: RadarItem = {
    ...original.item,
    body: [...original.item.body, guidance],
  };

  return { ...original, item };
}

export interface RepairOutcome {
  attempted: boolean;
  outcome?: GenerationOutcome;
}

/**
 * Runs the single repair pass, if the findings justify one and the budget
 * allows it. Returns `attempted: false` when it declined to spend the call.
 */
export async function attemptRepair(options: {
  request: GenerationRequest;
  findings: EvaluationFinding[];
  generator: ScriptGenerator;
  enabled: boolean;
  generationsRemaining: number;
}): Promise<RepairOutcome> {
  const { request, findings, generator, enabled, generationsRemaining } = options;

  if (!enabled) return { attempted: false };
  if (generationsRemaining < 1) return { attempted: false };
  if (!isRepairable(findings)) return { attempted: false };

  const outcome = await generator.generate(repairRequest(request, findings));
  return { attempted: true, outcome };
}
