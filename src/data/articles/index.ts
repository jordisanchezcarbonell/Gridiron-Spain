import type { Article } from "@/types";
import { historiaEspana } from "./historia-espana";
import { badalonaDracs } from "./badalona-dracs";
import { lhospitaletPioners } from "./lhospitalet-pioners";
import { barcelonaDragons } from "./barcelona-dragons";
import { madridBravos } from "./madrid-bravos";
import { collegeFootball } from "./college-football";
import { whyAnnapolis } from "./why-annapolis";
import { footballEnBarcelona } from "./football-en-barcelona";
import { texasOhioState } from "./texas-ohio-state";
import { navyUniforme1926 } from "./navy-uniforme-1926";

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
  collegeFootball,
  whyAnnapolis,
  footballEnBarcelona,
  texasOhioState,
  navyUniforme1926,
];
