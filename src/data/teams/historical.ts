import type { Team } from "@/types";

const V = "2026-09-12";

/** Professional franchises that no longer exist. Kept for the archive and the map. */
export const historicalTeams: Team[] = [
  {
    id: "barcelona-dragons-nfle",
    slug: "barcelona-dragons",
    name: "Barcelona Dragons (World League / NFL Europe)",
    shortName: "Dragons",
    city: "Barcelona",
    province: "Barcelona",
    autonomousCommunity: "Cataluña",
    country: "ES",
    foundedYear: 1991,
    foldedYear: 2003,
    status: "historical",
    disciplines: ["tackle"],
    categories: ["senior-men"],
    currentCompetitions: [],
    venue: {
      name: { es: "Estadi Olímpic Lluís Companys (Montjuïc); Mini Estadi en la etapa final", en: "Estadi Olímpic Lluís Companys (Montjuïc); Mini Estadi in the final period" },
      coordinates: { latitude: 41.3648, longitude: 2.1556, precision: "venue" },
      verificationStatus: "verified",
    },
    summary: {
      es: "Franquicia fundadora de la World League of American Football (1991) y después de NFL Europe. Campeona del World Bowl de 1997 en Montjuïc; la liga suspendió sus operaciones tras la temporada 2003.",
      en: "Founding franchise of the World League of American Football (1991) and later NFL Europe. World Bowl champion in 1997 at Montjuïc; the league suspended its operations after the 2003 season.",
    },
    history: [
      {
        es: "Los Dragons jugaron su primer partido el 24 de marzo de 1991 en el Estadi Olímpic Lluís Companys y compitieron durante doce temporadas. [[src:elf-dragons-are-back-2021]] Ganaron el World Bowl de 1997 ante Rhein Fire en Barcelona y disputaron también las finales de 1991, 1999 y 2001. [[src:nfle-dragons-suspended-2003]]",
        en: "The Dragons played their first game on 24 March 1991 at the Estadi Olímpic Lluís Companys and competed for twelve seasons. [[src:elf-dragons-are-back-2021]] They won the 1997 World Bowl against Rhein Fire in Barcelona and also reached the 1991, 1999 and 2001 finals. [[src:nfle-dragons-suspended-2003]]",
      },
      {
        es: "NFL Europe League suspendió la franquicia tras la temporada 2003 alegando cinco años de caída de asistencia, con una media de 6.868 espectadores en 2003, y el fracaso de la alianza con el FC Barcelona para revertirla. [[src:nfle-dragons-suspended-2003]]",
        en: "NFL Europe League suspended the franchise after the 2003 season, citing five years of declining attendance, averaging 6,868 in 2003, and the failure of the FC Barcelona partnership to reverse it. [[src:nfle-dragons-suspended-2003]]",
      },
    ],
    honours: [
      { title: { es: "Campeón World Bowl", en: "World Bowl champion" }, competitionId: "nfl-europe", year: 1997, sourceIds: ["nfle-dragons-suspended-2003"], verificationStatus: "verified" },
      ...[1991, 1999, 2001].map((year) => ({ title: { es: "Finalista World Bowl", en: "World Bowl finalist" }, competitionId: "nfl-europe", year, sourceIds: ["nfle-dragons-suspended-2003"], verificationStatus: "verified" as const })),
    ],
    sourceIds: ["elf-dragons-are-back-2021", "nfle-dragons-suspended-2003", "wiki-dragons-nfle", "wiki-world-bowl-97", "wiki-jack-bicknell"],
    relatedArticleSlugs: ["barcelona-dragons"],
    verificationStatus: "verified",
    lastVerifiedAt: V,
    researchNotes: { es: "Fecha exacta del traslado al Mini Estadi, marcadores de las finales perdidas y la etapa de Jack Bicknell dependen de fuentes secundarias.", en: "Exact date of the move to the Mini Estadi, scores of the lost finals and Jack Bicknell's tenure rely on secondary sources." },
  },
  {
    id: "barcelona-dragons-elf",
    slug: "barcelona-dragons-elf",
    name: "Barcelona Dragons (European League of Football)",
    shortName: "Dragons ELF",
    city: "Barcelona",
    province: "Barcelona",
    autonomousCommunity: "Cataluña",
    country: "ES",
    foundedYear: 2021,
    foldedYear: 2024,
    status: "historical",
    disciplines: ["tackle"],
    categories: ["senior-men"],
    currentCompetitions: [],
    venue: {
      name: { es: "Estadi Municipal de Reus (2021), Terrassa (2023) y Badalona (2024)", en: "Estadi Municipal de Reus (2021), Terrassa (2023) and Badalona (2024)" },
      coordinates: { latitude: 41.4563, longitude: 2.2368, precision: "venue" },
      verificationStatus: "partial",
    },
    summary: {
      es: "Equipo fundador de la European League of Football (2021-2024) que recuperó el nombre de los Dragons mediante un acuerdo de derechos con la NFL, sin continuidad legal con la franquicia histórica. Abandonó la liga en diciembre de 2024.",
      en: "Founding European League of Football team (2021-2024) that revived the Dragons name through a naming-rights deal with the NFL, with no legal continuity with the historic franchise. Left the league in December 2024.",
    },
    history: [
      {
        es: "La franquicia nació como Gladiators Football y el 24 de marzo de 2021 anunció que usaría el nombre Barcelona Dragons, posible gracias al acuerdo del 9 de marzo de 2021 entre la ELF y la NFL sobre los nombres de los antiguos equipos de NFL Europe. Su primera sede fue el Estadi Municipal de Reus. [[src:elf-dragons-are-back-2021]]",
        en: "The franchise was born as Gladiators Football and on 24 March 2021 announced it would use the Barcelona Dragons name, made possible by the 9 March 2021 agreement between the ELF and the NFL over the names of former NFL Europe teams. Its first home was the Estadi Municipal de Reus. [[src:elf-dragons-are-back-2021]]",
      },
      {
        es: "En 2024 jugó en Badalona bajo la propiedad del grupo Elite Sports Equity, y el 4 de diciembre de 2024 la ELF confirmó que el equipo dejaba la liga. [[src:catalannews-dragons-2024]] [[src:football-austria-elf-2025-teams]]",
        en: "In 2024 it played in Badalona under the Elite Sports Equity ownership group, and on 4 December 2024 the ELF confirmed the team was leaving the league. [[src:catalannews-dragons-2024]] [[src:football-austria-elf-2025-teams]]",
      },
    ],
    honours: [],
    sourceIds: ["elf-dragons-are-back-2021", "catalannews-dragons-2024", "football-austria-elf-2025-teams", "wiki-dragons-elf", "elf-new-franchise-2024"],
    relatedArticleSlugs: ["barcelona-dragons"],
    verificationStatus: "partial",
    lastVerifiedAt: V,
    researchNotes: { es: "Balances por temporada y estadios de 2022-2023 proceden de Wikipedia; motivo formal de la salida sin comunicado oficial legible.", en: "Season records and 2022-2023 stadiums come from Wikipedia; the formal reason for leaving has no readable official statement." },
  },
];
