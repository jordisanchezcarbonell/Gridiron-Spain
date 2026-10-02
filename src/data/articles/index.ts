import type { Article } from "@/types";
import { historiaEspana } from "./historia-espana";
import { badalonaDracs } from "./badalona-dracs";
import { lhospitaletPioners } from "./lhospitalet-pioners";
import { barcelonaDragons } from "./barcelona-dragons";
import { madridBravos } from "./madrid-bravos";
import { royalOaksKnights } from "./royal-oaks-knights";
import { collegeFootball } from "./college-football";
import { whyAnnapolis } from "./why-annapolis";
import { footballEnBarcelona } from "./football-en-barcelona";
import { texasOhioState } from "./texas-ohio-state";
import { navyUniforme1926 } from "./navy-uniforme-1926";
import { ncaafWeek4_2026 } from "./ncaaf-week-4-2026";
import { nflEstadoSemana3 } from "./nfl-estado-semana-3-2026";
import { navyVsAirForce2026 } from "./navy-vs-air-force-2026";
import { knightsNflIndianapolis } from "./knights-nfl-indianapolis";
import { nflMadrid2026Guia } from "./nfl-madrid-2026-guia";

/**
 * Article registry. Add a new file per article and register it here.
 * Order does not matter: the repository sorts by publishedAt.
 */
export const articles: Article[] = [
  historiaEspana,
  badalonaDracs,
  lhospitaletPioners,
  barcelonaDragons,
  madridBravos,
  royalOaksKnights,
  collegeFootball,
  whyAnnapolis,
  footballEnBarcelona,
  texasOhioState,
  navyUniforme1926,
  ncaafWeek4_2026,
  nflEstadoSemana3,
  navyVsAirForce2026,
  knightsNflIndianapolis,
  nflMadrid2026Guia,
];
