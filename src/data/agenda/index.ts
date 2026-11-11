import type { AgendaWeek } from "@/types";
import { agenda20261003 } from "./2026-10-03";
import { agenda20261010 } from "./2026-10-10";
import { agenda20261017 } from "./2026-10-17";
import { agenda20261024 } from "./2026-10-24";
import { agenda20261031 } from "./2026-10-31";
import { agenda20261114 } from "./2026-11-14";

/** Weekly agendas, one file per weekend. Refreshed every Monday (docs/rankings-refresh.md). */
export const agendaWeeks: AgendaWeek[] = [agenda20261114, agenda20261031, agenda20261024, agenda20261017, agenda20261010, agenda20261003];
