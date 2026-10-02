import type { Ranking } from "@/types";
import { ncaaRankings } from "./ncaa";
import { spainRankings } from "./spain";
import { europeRankings } from "./europe";

export const rankings: Ranking[] = [...ncaaRankings, ...spainRankings, ...europeRankings];
