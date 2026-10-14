import type { AgendaWeek } from "@/types";
import { agenda20261003 } from "./2026-10-03";
import { agenda20261010 } from "./2026-10-10";
import { agenda20261017 } from "./2026-10-17";

/** Weekly agendas, one file per weekend. Refreshed every Monday (docs/rankings-refresh.md). */
export const agendaWeeks: AgendaWeek[] = [agenda20261017, agenda20261010, agenda20261003];
