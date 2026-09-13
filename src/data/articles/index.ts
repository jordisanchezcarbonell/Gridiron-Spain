import type { Article } from "@/types";
import { historiaEspana } from "./historia-espana";
import { badalonaDracs } from "./badalona-dracs";
import { lhospitaletPioners } from "./lhospitalet-pioners";
import { barcelonaDragons } from "./barcelona-dragons";
import { madridBravos } from "./madrid-bravos";
import { collegeFootball } from "./college-football";
import { whyAnnapolis } from "./why-annapolis";

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
];
