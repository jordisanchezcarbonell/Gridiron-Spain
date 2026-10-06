import type { Ranking, RankingEntry } from "@/types";

// [team, country, wins, losses, points for, points against]
type Row = [string, string, number, number, number, number];

function rows(list: Row[], notes: Record<string, { es: string; en: string }> = {}, ids: Record<string, string> = {}): RankingEntry[] {
  return list.map(([name, country, w, l, pf, pa], i) => ({
    rank: i + 1,
    teamId: ids[name],
    name: `${name} (${country})`,
    detail: `${w}-${l} · ${pf}-${pa}`,
    note: notes[name],
  }));
}

export const europeRankings: Ranking[] = [
  {
    id: "efa-2026-standings",
    slug: "efa-2026",
    scope: "europe",
    kind: "standings",
    title: { es: "EFA 2026 · Clasificación final", en: "EFA 2026 · Final standings" },
    description: {
      es: "Primera temporada de la European Football Alliance, la liga creada por antiguas franquicias de la ELF. Nordic Storm ganó la final 48-28 a Munich Ravens el 29 de agosto de 2026 en Innsbruck. Madrid Bravos, miembro fundador, se retiró antes de competir. Para 2027 la liga suma su primera franquicia de expansión, London Guard, que jugará en el estadio del Leyton Orient.",
      en: "First season of the European Football Alliance, the league created by former ELF franchises. Nordic Storm won the final 48-28 over Munich Ravens on 29 August 2026 in Innsbruck. Madrid Bravos, a founding member, withdrew before playing. For 2027 the league adds its first expansion franchise, London Guard, who will play at Leyton Orient's stadium.",
    },
    asOf: "2026-08-29",
    competitionId: "efa",
    groups: [
      {
        entries: rows(
          [
            ["Nordic Storm", "DEN", 9, 1, 411, 141],
            ["Munich Ravens", "GER", 9, 1, 397, 228],
            ["Frankfurt Galaxy", "GER", 4, 6, 233, 314],
            ["Paris Musketeers", "FRA", 4, 6, 215, 300],
            ["Raiders Tirol", "AUT", 2, 8, 264, 362],
            ["Prague Lions", "CZE", 2, 8, 223, 398],
          ],
          {
            "Nordic Storm": { es: "Campeón: 48-28 en la final", en: "Champion: won the final 48-28" },
            "Munich Ravens": { es: "Finalista", en: "Runner-up" },
          },
        ),
      },
    ],
    method: { es: "Balance victorias-derrotas · puntos a favor-en contra en liga regular.", en: "Win-loss record · regular-season points for-against." },
    sourceIds: ["elfdata-efa-2026", "sn-nordic-storm-final-2026", "gridiron-mag-efa-2026", "afi-london-guard-efa-2027", "sportstravel-london-guard-efa-2027"],
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-06",
  },
  {
    id: "afle-2026-standings",
    slug: "afle-2026",
    scope: "europe",
    kind: "standings",
    title: { es: "AFLE 2026 · Clasificación final", en: "AFLE 2026 · Final standings" },
    description: {
      es: "American Football League Europe, la segunda liga nacida de la crisis de la ELF, con ocho equipos. Vienna Vikings ganaron la Gold Bowl 68-5 a Panthers Wrocław el 6 de septiembre de 2026 en Duisburgo. Varios españoles ex-Bravos jugaron en ella. Para 2027 la liga confirmó a Warsaw Eagles como noveno equipo.",
      en: "American Football League Europe, the second league born from the ELF crisis, with eight teams. Vienna Vikings won the Gold Bowl 68-5 over Panthers Wrocław on 6 September 2026 in Duisburg. Several Spanish ex-Bravos played in it. For 2027 the league confirmed Warsaw Eagles as its ninth team.",
    },
    asOf: "2026-09-06",
    competitionId: "afle",
    groups: [
      {
        entries: rows(
          [
            ["Vienna Vikings", "AUT", 11, 1, 562, 180],
            ["Panthers Wrocław", "POL", 10, 2, 446, 249],
            ["Rhein Fire", "GER", 10, 2, 518, 198],
            ["London Warriors", "GBR", 6, 6, 327, 414],
            ["Berlin Thunder", "GER", 5, 7, 357, 368],
            ["Alpine Rams", "SUI", 3, 9, 258, 446],
            ["Paris Lights", "FRA", 3, 9, 236, 428],
            ["Firenze Red Lions", "ITA", 0, 12, 195, 616],
          ],
          {
            "Vienna Vikings": { es: "Campeón: Gold Bowl 68-5", en: "Champion: Gold Bowl 68-5" },
            "Panthers Wrocław": { es: "Finalista", en: "Runner-up" },
          },
        ),
      },
    ],
    method: {
      es: "Tabla tomada de Wikipedia porque la clasificación oficial no estaba accesible; el resultado de la final es oficial de la liga (Wikipedia da 62-5).",
      en: "Table taken from Wikipedia because the official standings were unavailable; the final score is the league's official one (Wikipedia gives 62-5).",
    },
    sourceIds: ["wiki-afle-2026", "afle-gold-bowl-2026", "afle-warsaw-eagles-2027"],
    verificationStatus: "partial",
    lastVerifiedAt: "2026-10-06",
  },
  {
    id: "elf-2025-standings",
    slug: "elf-2025",
    scope: "europe",
    kind: "standings",
    title: { es: "ELF 2025 · Última temporada", en: "ELF 2025 · Final season" },
    description: {
      es: "La última temporada de la European League of Football antes de su insolvencia. Stuttgart Surge ganó la final 24-17 a Vienna Vikings el 7 de septiembre de 2025. Madrid Bravos (8-4) cayó en wildcard ante Stuttgart, pero su QB Reid Sinnett fue MVP de la liga.",
      en: "The European League of Football's last season before insolvency. Stuttgart Surge beat Vienna Vikings 24-17 in the final on 7 September 2025. Madrid Bravos (8-4) lost to Stuttgart in the wildcard round, but their QB Reid Sinnett was league MVP.",
    },
    asOf: "2025-09-07",
    competitionId: "elf",
    groups: [
      { name: { es: "Conferencia Este", en: "East Conference" }, entries: rows([["Vienna Vikings", "AUT", 11, 1, 463, 232], ["Prague Lions", "CZE", 7, 5, 357, 240], ["Panthers Wrocław", "POL", 5, 7, 372, 376], ["Fehérvár Enthroners", "HUN", 1, 11, 184, 509]], { "Vienna Vikings": { es: "Finalista", en: "Runner-up" } }) },
      { name: { es: "Conferencia Sur", en: "South Conference" }, entries: rows([["Munich Ravens", "GER", 11, 1, 436, 269], ["Madrid Bravos", "ESP", 8, 4, 507, 297], ["Raiders Tirol", "AUT", 6, 6, 417, 300], ["Helvetic Mercenaries", "SUI", 0, 12, 137, 647]], { "Madrid Bravos": { es: "Eliminado en wildcard (17-41 ante Stuttgart)", en: "Lost in the wildcard round (17-41 against Stuttgart)" } }, { "Madrid Bravos": "madrid-bravos" }) },
      { name: { es: "Conferencia Oeste", en: "West Conference" }, entries: rows([["Stuttgart Surge", "GER", 10, 2, 517, 193], ["Paris Musketeers", "FRA", 7, 5, 459, 177], ["Frankfurt Galaxy", "GER", 6, 6, 383, 367], ["Cologne Centurions", "GER", 0, 12, 69, 739]], { "Stuttgart Surge": { es: "Campeón", en: "Champion" } }) },
      { name: { es: "Conferencia Norte", en: "North Conference" }, entries: rows([["Nordic Storm", "DEN", 10, 2, 432, 201], ["Rhein Fire", "GER", 8, 4, 348, 214], ["Hamburg Sea Devils", "GER", 3, 9, 196, 396], ["Berlin Thunder", "GER", 3, 9, 312, 432]]) },
    ],
    method: { es: "Balance victorias-derrotas · puntos a favor-en contra en liga regular.", en: "Win-loss record · regular-season points for-against." },
    sourceIds: ["elfdata-elf-2025", "wiki-elf-2025", "gridiron-mag-elf-honours-2025"],
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-02",
  },
];
