/**
 * Builds one personalised outreach email per club from
 * docs/outreach/contactos-clubes.local.json (git-ignored) and the team data.
 * Output: docs/outreach/correos-clubes.local.md (git-ignored).
 * Run with: npx tsx scripts/outreach-drafts.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { teams } from "../src/data/teams";
import { buildPendingList } from "../src/lib/pending";

type Contact = { teamId: string; name: string; email: string | null; contactForm: string | null; instagram: string | null; source: string; notes: string };

const BASE = "https://primer-down.vercel.app";
const contacts: Contact[] = JSON.parse(readFileSync("docs/outreach/contactos-clubes.local.json", "utf8"));
const pending = buildPendingList({ teams, articles: [], seasons: [], competitions: [], nationalTeams: [], players: [], rankings: [] });

const ASK: Record<string, string> = {
  "Año de fundación": "el año de fundación",
  "Historia del club": "la historia del club (aunque sea un texto interno)",
  "Logo (con permiso del club)": "permiso para mostrar vuestro escudo",
  "Web oficial": "vuestra web oficial, si la tenéis",
  "Verificar el campo con el club o el ayuntamiento": "el nombre y la ubicación exacta del campo donde jugáis",
  "Coordenadas exactas del campo (ahora centro de la ciudad)": "el nombre y la ubicación exacta del campo donde jugáis",
  "Confirmar si el club sigue activo": "si el club sigue compitiendo esta temporada",
};

const out: string[] = ["# Correos a clubes (borradores, NO subir a git)", "", `Generado el ${new Date().toISOString().slice(0, 10)}. Revisar antes de enviar.`, ""];
let n = 0;
for (const c of contacts) {
  const team = teams.find((t) => t.id === c.teamId);
  if (!team) continue;
  const url = `${BASE}/es/equipos/${team.slug}?utm_source=email&utm_medium=outreach&utm_campaign=clubes`;
  const tasks = pending.find((p) => p.id === team.id)?.tasks ?? [];
  const asks = Array.from(new Set(tasks.map((t) => ASK[t]).filter(Boolean))).slice(0, 3);
  const channel = c.email ? `Email: ${c.email}` : c.contactForm ? `Formulario: ${c.contactForm}` : c.instagram ? `Instagram (DM): ${c.instagram}` : "SIN CONTACTO";
  n++;
  out.push(
    `## ${n}. ${team.name}`,
    "",
    `- **Canal:** ${channel}`,
    `- **Fuente del contacto:** ${c.source}`,
    ...(c.notes ? [`- **Notas:** ${c.notes}`] : []),
    "",
    `**Asunto:** ${team.name} en Primer Down, el archivo del fútbol americano en España`,
    "",
    "```",
    `Hola, equipo de ${team.name}:`,
    "",
    "Soy Jordi Sánchez, de Barcelona. Estoy construyendo Primer Down, un archivo independiente del fútbol americano en España: fichas de equipos, mapa, selección, rankings y una agenda semanal, todo con fuentes verificables.",
    "",
    `Ya tenéis vuestra ficha publicada: ${url}`,
    "",
    "La hemos hecho solo con lo que hemos podido contrastar (FEFA, vuestra web y prensa). Si veis algún error, decídmelo y lo corrijo.",
    ...(asks.length > 0 ? ["", `Nos falta confirmar ${asks.length === 1 ? asks[0] : `${asks.slice(0, -1).join(", ")} y ${asks.at(-1)}`}. Si nos lo podéis pasar, lo añadimos con vuestro crédito.`] : []),
    "",
    "Y si la ficha os parece bien, nos ayudaría mucho que la enlazaseis desde vuestra web o vuestras redes: así quien busque el club en Google encuentra también su historia.",
    "",
    "Es un proyecto independiente, sin relación con la FEFA ni con ningún club, y no os pedimos nada más.",
    "",
    "Gracias y mucha suerte esta temporada,",
    "",
    "Jordi Sánchez",
    "Primer Down · Barcelona",
    "https://primer-down.vercel.app",
    "```",
    "",
  );
}
writeFileSync("docs/outreach/correos-clubes.local.md", out.join("\n"));
console.log(`${n} borradores en docs/outreach/correos-clubes.local.md`);
