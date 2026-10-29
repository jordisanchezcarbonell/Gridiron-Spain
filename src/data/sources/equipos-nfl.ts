import type { Source } from "@/types/common";

const A = "2026-10-29";

/** Sources for the 32-team NFL reference guide (conferences, divisions, cities). */
export const equiposNflSources: Source[] = [
  { id: "equipos-nfl-nfl-teams", title: "NFL Teams", publisher: "NFL.com", url: "https://www.nfl.com/teams/", accessedAt: A, sourceType: "league-official", notes: { es: "Lista oficial de los 32 equipos, 16 por conferencia (AFC y NFC).", en: "Official list of the 32 teams, 16 per conference (AFC and NFC)." } },
  { id: "equipos-nfl-nfl-division-standings-2026", title: "2026 NFL Division Standings", publisher: "NFL.com", url: "https://www.nfl.com/standings/division/2026/REG", accessedAt: A, sourceType: "league-official", notes: { es: "Clasificación oficial por divisiones de la temporada 2026: reparto de los 32 equipos en las ocho divisiones.", en: "Official 2026 division standings: how the 32 teams are split across the eight divisions." } },
  { id: "equipos-nfl-nfl-ops-schedule", title: "Creating the NFL Schedule", publisher: "NFL Football Operations", url: "https://operations.nfl.com/gameday/nfl-schedule/creating-the-nfl-schedule/", accessedAt: A, sourceType: "league-official", notes: { es: "Fórmula oficial del calendario: seis partidos de división, rotación de divisiones y partido 17.", en: "Official scheduling formula: six division games, division rotation and the 17th game." } },
  { id: "equipos-nfl-nfl-playoff-picture-2026", title: "2026 Playoff Picture", publisher: "NFL.com", url: "https://www.nfl.com/standings/playoff-picture", accessedAt: A, sourceType: "league-official", notes: { es: "Confirma que siete equipos por conferencia llegan a los play-offs de 2026.", en: "Confirms seven teams per conference reach the 2026 playoffs." } },
  { id: "equipos-nfl-wikipedia-nfl", title: "National Football League", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/National_Football_League", accessedAt: A, sourceType: "encyclopedia", notes: { es: "Tabla de clubes con la localidad y el estado donde juega cada equipo como local; formato de 17 partidos en 18 semanas y de play-offs.", en: "Club table with the city and state where each team plays its home games; 17-game, 18-week format and playoff format." } },
];
