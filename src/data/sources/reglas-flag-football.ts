import type { Source } from "@/types/common";

const A = "2026-11-06";
const FEFA = "Federación Española de Fútbol Americano";

/** Sources for the flag football rules guide. */
export const reglasFlagFootballSources: Source[] = [
  { id: "fefa-reglamento-flag-2023", title: "Reglamento oficial flag (Reglamento Flag Football 2023, 5 vs 5 / sin contacto, traducción de las reglas de IFAF)", publisher: FEFA, url: "https://www.fefa.es/download/47895/?tmstv=1717486906", accessedAt: A, sourceType: "federation" },
  { id: "fefa-descargas-flag", title: "Descargas flag football", publisher: FEFA, url: "https://www.fefa.es/descargas-flag-football/", accessedAt: A, sourceType: "federation" },
  { id: "fefa-convocatoria-sfb-2026", title: "Convocatoria oficial Spanish Flag Bowl 2026", publisher: FEFA, url: "https://www.fefa.es/download/57373/?tmstv=1778750113", accessedAt: A, sourceType: "federation" },
  { id: "nfl-flag-rules-2025", title: "NFL Flag Football Rule Book: Regular Season Rules 2025", publisher: "NFL", url: "https://static.www.nfl.com/image/upload/league/gxtdqh8hcquhezyzssfo.pdf", accessedAt: A, sourceType: "league-official" },
  { id: "olympics-flag-faq-la28", title: "Flag Football: FAQs about the sport set to debut at Los Angeles 2028", publisher: "Olympics.com", url: "https://www.olympics.com/en/news/flag-football-faq-sport-debut-los-angeles-2028", accessedAt: A, sourceType: "other" },
];
