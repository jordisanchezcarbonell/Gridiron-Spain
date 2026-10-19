/**
 * Prompt construction for the Claude adapter.
 *
 * `PROMPT_VERSION` is recorded in every editorial package: a script's wording
 * is only reproducible if you know which prompt produced it, so the version
 * must change whenever the text below changes.
 */
import type { GenerationRequest } from "./types";

export const PROMPT_VERSION = "2026-10-18.1";

/**
 * The JSON shape the model must return. Used as the structured-output schema,
 * so the response is validated at the API boundary rather than by parsing prose.
 */
export const SCRIPT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["hook", "beats", "conclusion", "claims"],
  properties: {
    hook: {
      type: "string",
      description:
        "Opening line, spoken first. One sentence. States what happened or poses the question the clip answers. No preamble and no greeting.",
    },
    beats: {
      type: "array",
      minItems: 1,
      maxItems: 6,
      description:
        "The body, one spoken beat per element. Each is one or two sentences a narrator can say in a single breath.",
      items: { type: "string" },
    },
    conclusion: {
      type: "string",
      description:
        "Closing line that lands the clip. States the takeaway or what happens next. Never a question, never a call to subscribe.",
    },
    claims: {
      type: "array",
      description:
        "Every factual assertion the script makes, in the order it is spoken.",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["text", "kind", "evidenceIndices"],
        properties: {
          text: { type: "string", description: "The assertion, as stated in the script." },
          kind: {
            type: "string",
            enum: ["verified", "inference"],
            description:
              "'verified' when the evidence states this directly. 'inference' when it is your reading of the evidence rather than something it says.",
          },
          evidenceIndices: {
            type: "array",
            items: { type: "integer" },
            description: "Indices of the evidence items that support this claim.",
          },
        },
      },
    },
  },
} as const;

export const SYSTEM_PROMPT = `Escribes guiones de vídeo vertical para Primer Down, un proyecto editorial independiente sobre fútbol americano en España, firmado por Gridiron Spain.

Tu trabajo es convertir material ya investigado en un guion que una persona quiera escuchar entero. Escribes para el oído: alguien está mirando el móvil y te oye hablar.

## La regla que no se negocia

Solo puedes afirmar lo que diga la evidencia que te paso. No inventas resultados, estadísticas, marcadores, fechas, nombres, citas ni declaraciones. Si la evidencia no da un dato, el guion no lo da. No rellenas con lo que "suele pasar" ni con lo que parece razonable.

Puedes reformular, ordenar y conectar lo que dice la evidencia. Eso es escribir. Lo que no puedes es añadir hechos nuevos.

Cada afirmación del guion va en \`claims\`, marcada:
- \`verified\`: la evidencia lo dice directamente. Solo estas pueden llevar números, marcadores o fechas.
- \`inference\`: es tu lectura de la evidencia, no algo que la evidencia afirme. Formúlalas con cautela ("apunta a", "deja a X con") y nunca con cifras nuevas.

Si no tienes material suficiente para un guion honesto, dilo en vez de rellenar.

## Cómo suena

Frases cortas. Voz activa. El dato concreto antes que el adjetivo. Nada de "en el mundo del deporte" ni "sin duda alguna" ni "prepárate para".

El gancho entra directo al hecho más fuerte que tengas. El cierre remata: qué significa o qué viene ahora. Ni pregunta retórica ni "dale a seguir".

No repitas la misma idea en dos beats. Si un beat no añade nada, no lo escribas: es mejor un guion de cuatro beats buenos que de seis con relleno.

## Idioma

Español de España. Los términos del deporte van como se usan aquí: quarterback, touchdown, playoff, draft. No traduzcas los nombres de equipos ni de competiciones.`;

/** Builds the user turn: the material, the constraints, and the length target. */
export function buildUserPrompt(request: GenerationRequest): string {
  const { item, evidence, minDurationSec, maxDurationSec, targetDurationSec, wordsPerMinute } =
    request;

  const targetWords = Math.round((targetDurationSec / 60) * wordsPerMinute);
  const minWords = Math.round((minDurationSec / 60) * wordsPerMinute);
  const maxWords = Math.round((maxDurationSec / 60) * wordsPerMinute);

  const formatBrief =
    item.format === "news"
      ? "Formato NEWS: una noticia de ahora. Entra por el hecho más reciente y cierra con lo que está en juego."
      : "Formato EXPLAINER: una historia o curiosidad. Entra por el detalle que engancha y cierra con por qué importa.";

  const evidenceBlock = evidence
    .map((e) => `[${e.index}] ${e.text}\n    (origen: ${e.origin})`)
    .join("\n");

  const references = item.sources.length
    ? item.sources.map((s) => `- ${s.label}: ${s.url}`).join("\n")
    : "(el documento no lista enlaces)";

  return `${formatBrief}

TITULAR DEL MATERIAL
${item.title}

EVIDENCIA (lo único que puedes afirmar)
${evidenceBlock}

REFERENCIAS DEL DOCUMENTO
${references}

LONGITUD
El guion se narra a ${wordsPerMinute} palabras por minuto. Apunta a unas ${targetWords} palabras habladas en total (gancho + beats + cierre), y en ningún caso menos de ${minWords} ni más de ${maxWords}. Cuenta las palabras antes de responder.

Escribe el guion.`;
}
