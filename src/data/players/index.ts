import type { PlayerSpotlight } from "@/types";
import { ncaaPlayers } from "./ncaa";
import { europePlayers } from "./europe";
import { spainPlayers } from "./spain";

export const playerSpotlights: PlayerSpotlight[] = [...spainPlayers, ...europePlayers, ...ncaaPlayers];
