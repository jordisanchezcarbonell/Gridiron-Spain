import type { Source } from "@/types/common";
import { navySources } from "./navy";
import { spainSources } from "./spain";
import { madridEuropeSources } from "./madrid-europe";
import { originsSources } from "./origins";
import { texasOhioStateSources } from "./texas-ohio-state";
import { week4Sources } from "./week4-2026";
import { nflWeek3Sources } from "./nfl-week-3-2026";
import { nfeloSources } from "./nfelo";
import { rankingsSources } from "./rankings-2026";
import { spainTeamsSources } from "./spain-teams-2026";
import { nflMadrid2026Sources } from "./nfl-madrid-2026";
import { agendaSources } from "./agenda-2026";

/**
 * Central source registry. Every team, article, timeline event and fact
 * references sources by id. Keep ids stable: they are used in inline
 * citations as [[src:ID]].
 */
export const sources: Source[] = [...spainSources, ...madridEuropeSources, ...originsSources, ...navySources, ...texasOhioStateSources, ...week4Sources, ...nflWeek3Sources, ...nfeloSources, ...rankingsSources, ...spainTeamsSources, ...nflMadrid2026Sources, ...agendaSources];
