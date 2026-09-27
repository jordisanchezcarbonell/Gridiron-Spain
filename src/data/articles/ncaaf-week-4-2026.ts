import type { Article } from "@/types";

const texasImage = {
  url: "/images/texas-team-entrance-2007.jpg",
  alt: { es: "Equipo de Texas entrando al campo antes de un partido.", en: "Texas entering the field before a game." },
  photographer: "audreyhs17",
  source: "https://commons.wikimedia.org/wiki/File:Texas_team_entrance_vs_KSU_2007.jpg",
  license: "CC BY 2.0",
};

export const ncaafWeek4_2026: Article = {
  id: "ncaaf-week-4-2026", slug: "ncaaf-week-4-2026",
  title: { es: "NCAAF Week 4: caos en el Top 25 y varias sorpresas que cambian la temporada", en: "NCAAF Week 4: Top 25 chaos and surprises that change the season" },
  subtitle: { es: "Florida arrasa a Ole Miss, Wisconsin sorprende a Penn State, Oregon se impone a USC y Texas sobrevive en Knoxville.", en: "Florida overwhelms Ole Miss, Wisconsin stuns Penn State, Oregon beats USC and Texas survives in Knoxville." },
  excerpt: { es: "Una Week 4 llena de resultados que ponen a prueba a los equipos clasificados.", en: "A Week 4 full of results that put ranked teams to the test." },
  heroImage: {
    url: "/images/editorial/college-football-stadium.png",
    alt: { es: "Estadio universitario lleno durante un partido de fútbol americano al atardecer.", en: "A full college stadium during an American football game at dusk." },
    width: 1672,
    height: 941,
    photographer: "Gridiron Spain · imagen editorial generada",
    license: "Uso editorial de Gridiron Spain",
  },
  authorId: "jordi-sanchez", category: "ncaa", tags: ["NCAA", "Week 4", "Top 25", "2026"], relatedTeamIds: [], relatedCompetitionIds: ["ncaa-fbs"], availableLocales: ["es", "en"],
  publishedAt: "2026-09-27", updatedAt: "2026-09-27", status: "researching", verificationStatus: "partial", readingTimeMinutes: 8,
  sourceIds: ["week4-2026-florida", "week4-2026-wisconsin", "week4-2026-texas-am", "week4-2026-navy"],
  content: [
    { type: "paragraph", text: { es: "La cuarta semana fue una de las primeras pruebas serias para el Top 25 de 2026: Florida tumbó a Ole Miss, Wisconsin remontó a Penn State y varios equipos clasificados dejaron dudas. El resultado no fue una lista plana de marcadores, sino una jornada que cambió el tono de varias temporadas.", en: "Week 4 was one of the first serious tests for the 2026 Top 25: Florida knocked off Ole Miss, Wisconsin rallied past Penn State and several ranked teams were left with questions." } },
    { type: "heading", level: 2, text: { es: "Las grandes sorpresas de la semana", en: "The week’s biggest surprises" } },
    { type: "list", items: [{ es: "Florida #21 52 — Ole Miss #4 28", en: "Florida #21 52 — Ole Miss #4 28" }, { es: "Wisconsin 24 — Penn State #13 20", en: "Wisconsin 24 — Penn State #13 20" }, { es: "Wake Forest 30 — Louisville #16 27", en: "Wake Forest 30 — Louisville #16 27" }, { es: "Mississippi State #24 31 — Missouri #19 24", en: "Mississippi State #24 31 — Missouri #19 24" }] },
    { type: "heading", level: 2, text: { es: "Florida firma el gran golpe de la jornada", en: "Florida lands the week’s biggest blow" } },
    { type: "image", media: { ...texasImage, alt: { es: "Ambiente de fútbol americano universitario antes de un partido.", en: "College football atmosphere before a game." } }, caption: { es: "Placeholder editorial: sustituir por una imagen propia o licenciada de Florida–Ole Miss.", en: "Editorial placeholder: replace with an owned or licensed Florida–Ole Miss image." } },
    { type: "paragraph", text: { es: "Florida, nº21, derrotó 52-28 a Ole Miss, nº4, y se mantuvo invicto. Jadan Baugh corrió 29 veces para 142 yardas y tres touchdowns; los Gators sumaron 498 yardas totales. [[src:week4-2026-florida]]", en: "No. 21 Florida beat No. 4 Ole Miss 52–28 to remain unbeaten. Jadan Baugh carried 29 times for 142 yards and three touchdowns as the Gators totaled 498 yards. [[src:week4-2026-florida]]" } },
    { type: "heading", level: 2, text: { es: "Wisconsin remonta a Penn State", en: "Wisconsin rallies past Penn State" } },
    { type: "paragraph", text: { es: "Wisconsin ganó 24-20 en Penn State tras entrar en el último tramo 20-10 abajo. El pase de 72 yardas de Colton Joseph a Jacob Harris, con 1:13 por jugar, completó la remontada. [[src:week4-2026-wisconsin]]", en: "Wisconsin won 24–20 at Penn State after trailing 20–10 late. Colton Joseph’s 72-yard pass to Jacob Harris with 1:13 left completed the comeback. [[src:week4-2026-wisconsin]]" } },
    { type: "heading", level: 2, text: { es: "Texas sigue nº1, pero sufrió en Knoxville", en: "Texas remains No. 1, but suffered in Knoxville" } },
    { type: "paragraph", text: { es: "Texas venció 20-17 a Tennessee y conserva el 4-0. Tennessee recuperó un onside kick al final y tuvo una última posesión para empatar: una victoria trabajada, no un dominio.", en: "Texas beat Tennessee 20–17 to stay 4–0. Tennessee recovered a late onside kick and had one final possession to tie it: a hard-earned win, not domination." } },
    { type: "heading", level: 2, text: { es: "Georgia y Oregon no fallan", en: "Georgia and Oregon deliver" } },
    { type: "paragraph", text: { es: "Georgia ganó 41-13 a Oklahoma tras aprovechar cuatro turnovers y llegar 28-0 al descanso. Oregon venció 41-27 a USC después de un 27-27 al inicio del último cuarto, cerrando con 14 puntos sin respuesta.", en: "Georgia beat Oklahoma 41–13 after capitalizing on four turnovers and taking a 28–0 halftime lead. Oregon beat USC 41–27 after a 27–27 tie early in the fourth, closing with 14 unanswered points." } },
    { type: "heading", level: 2, text: { es: "Noche complicada para Texas A&M en Baton Rouge", en: "A difficult night for Texas A&M in Baton Rouge" } },
    { type: "paragraph", text: { es: "LSU derrotó 35-6 a Texas A&M. Los Aggies fueron limitados a 197 yardas, mientras LSU sumó 506; el tercer cuarto rompió definitivamente el partido y A&M queda 2-2. [[src:week4-2026-texas-am]]", en: "LSU beat Texas A&M 35–6. The Aggies were held to 197 yards while LSU gained 506; the third quarter settled the game and A&M falls to 2–2. [[src:week4-2026-texas-am]]" } },
    { type: "heading", level: 2, text: { es: "Navy deja escapar el partido contra UAB", en: "Navy lets the game slip against UAB" } },
    { type: "image", media: { ...texasImage, alt: { es: "Ambiente de fútbol americano universitario en un estadio.", en: "College football atmosphere in a stadium." } }, caption: { es: "Placeholder editorial: sustituir por una imagen propia o licenciada de Navy–UAB.", en: "Editorial placeholder: replace with an owned or licensed Navy–UAB image." } },
    { type: "paragraph", text: { es: "Navy perdió 24-20 ante UAB después de entrar 20-17 arriba en el último cuarto. Jackson Gutierrez, en su primera titularidad, corrió para 134 yardas y un touchdown; dos turnovers en el cuarto periodo resultaron decisivos. [[src:week4-2026-navy]]", en: "Navy lost 24–20 to UAB after entering the fourth quarter ahead 20–17. Jackson Gutierrez, making his first start, rushed for 134 yards and a touchdown; two fourth-quarter turnovers proved decisive. [[src:week4-2026-navy]]" } },
    { type: "paragraph", text: { es: "El siguiente foco será Navy @ Air Force, el 3 de octubre: un partido relevante dentro de la rivalidad de academias y del Commander-in-Chief’s Trophy. Gridiron Spain seguirá el camino hacia el Homecoming de Navy del 24 de octubre mediante Road to Annapolis.", en: "The next focus is Navy at Air Force on October 3: a meaningful game in the service-academy rivalry and the Commander-in-Chief’s Trophy. Gridiron Spain will follow the road to Navy’s October 24 Homecoming through Road to Annapolis." } },
    { type: "heading", level: 2, text: { es: "Lo que viene ahora", en: "What comes next" } },
    { type: "paragraph", text: { es: "Las historias a seguir son la respuesta de Ole Miss, el salto de Florida, la reacción de Texas A&M, el impulso de Oregon, la presión sobre Texas como nº1 y Navy–Air Force.", en: "The stories to follow are Ole Miss’ response, Florida’s rise, Texas A&M’s reaction, Oregon’s momentum, the pressure on No. 1 Texas and Navy–Air Force." } },
  ],
};
