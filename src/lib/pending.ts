import type { Article, Competition, NationalTeam, PlayerSpotlight, Ranking, Season, Team } from "@/types";

export type PendingItem = {
  kind: "team" | "article" | "season" | "competition" | "national-team" | "player" | "ranking";
  id: string;
  title: string;
  /** Route segments for linking, when the entity has a public page. */
  link?: { route: "teams" | "articles" | "competitions" | "nationalTeam" | "players" | "rankings"; segments: string[] };
  status: "partial" | "unverified" | "verified";
  /** Concrete things to chase, most important first. */
  tasks: string[];
  note?: string;
};

/**
 * Editorial to-do list built from the data itself: everything not fully
 * verified, plus fields that are missing or approximate. Spanish only — it is
 * an internal tool.
 */
export function buildPendingList(input: {
  teams: Team[];
  articles: Article[];
  seasons: Season[];
  competitions: Competition[];
  nationalTeams: NationalTeam[];
  players: PlayerSpotlight[];
  rankings: Ranking[];
}): PendingItem[] {
  const items: PendingItem[] = [];

  for (const t of input.teams) {
    const tasks: string[] = [];
    if (t.status === "unknown") tasks.push("Confirmar si el club sigue activo");
    if (!t.foundedYear && t.status !== "historical") tasks.push("Año de fundación");
    if (!t.logo) tasks.push("Logo (con permiso del club)");
    if (!t.venue?.coordinates) tasks.push("Sede y coordenadas");
    else if (t.venue.coordinates.precision === "city") tasks.push("Coordenadas exactas del campo (ahora centro de la ciudad)");
    if (t.venue && t.venue.verificationStatus !== "verified") tasks.push("Verificar el campo con el club o el ayuntamiento");
    if (!t.website && t.status === "active") tasks.push("Web oficial");
    if (!t.history || t.history.length === 0) tasks.push("Historia del club");
    for (const c of t.currentCompetitions) if (c.verificationStatus !== "verified") tasks.push(`Confirmar participación en ${c.competitionId} ${c.season ?? ""}`.trim());
    for (const h of t.honours) if (h.verificationStatus !== "verified") tasks.push(`Confirmar título: ${h.title.es} ${h.year}`);
    if (t.verificationStatus === "verified" && tasks.length === 0) continue;
    items.push({ kind: "team", id: t.id, title: t.name, link: { route: "teams", segments: [t.slug] }, status: t.verificationStatus, tasks, note: t.researchNotes?.es });
  }

  for (const a of input.articles) {
    const placeholders = a.content.filter((b) => b.type === "placeholder");
    const tasks = placeholders.flatMap((b) => (b.type === "placeholder" ? [b.topic.es, ...(b.pending ?? []).map((p) => p.es)] : []));
    if (!a.heroImage) tasks.push("Imagen principal");
    if (a.heroImagePending) tasks.push(`Imagen: ${a.heroImagePending.es}`);
    if (a.verificationStatus === "verified" && tasks.length === 0) continue;
    items.push({ kind: "article", id: a.id, title: a.title.es, link: { route: "articles", segments: [a.slug] }, status: a.verificationStatus, tasks });
  }

  for (const s of input.seasons) {
    if (s.verificationStatus === "verified") continue;
    const competition = input.competitions.find((c) => c.id === s.competitionId);
    items.push({
      kind: "season",
      id: s.id,
      title: s.name.es,
      link: competition ? { route: "competitions", segments: [competition.slug, s.slug] } : undefined,
      status: s.verificationStatus,
      tasks: ["Contrastar clasificación y resultados con la FEFA"],
    });
  }

  for (const c of input.competitions) {
    if (c.verificationStatus === "verified") continue;
    items.push({ kind: "competition", id: c.id, title: c.name, link: { route: "competitions", segments: [c.slug] }, status: c.verificationStatus, tasks: ["Fuente oficial para los datos de la competición"] });
  }

  for (const n of input.nationalTeams) {
    const games = [...n.results, ...n.upcoming, ...(n.pastCampaigns ?? []).flatMap((c) => c.games)].filter((g) => g.verificationStatus !== "verified");
    const tasks = games.map((g) => `Partido ${g.date} contra ${g.opponent}${g.note ? ` — ${g.note.es}` : ""}`);
    if (!n.roster && n.discipline === "tackle") tasks.push("Convocatoria oficial");
    if (n.verificationStatus === "verified" && tasks.length === 0) continue;
    items.push({ kind: "national-team", id: n.id, title: `Selección · ${n.name.es}`, link: { route: "nationalTeam", segments: [n.id] }, status: n.verificationStatus, tasks });
  }

  for (const p of input.players) {
    if (p.verificationStatus === "verified") continue;
    items.push({ kind: "player", id: p.id, title: p.name, status: p.verificationStatus, tasks: ["Segunda fuente para el dato destacado"], note: p.note.es });
  }

  for (const r of input.rankings) {
    if (r.verificationStatus === "verified") continue;
    items.push({ kind: "ranking", id: r.id, title: r.title.es, link: { route: "rankings", segments: [] }, status: r.verificationStatus, tasks: ["Sustituir fuentes secundarias por la oficial"] });
  }

  const order = { unverified: 0, partial: 1, verified: 2 };
  return items.sort((a, b) => order[a.status] - order[b.status] || b.tasks.length - a.tasks.length);
}
