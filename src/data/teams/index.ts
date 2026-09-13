import type { Team } from "@/types";
import { cataloniaTeams } from "./catalonia";
import { madridTeams } from "./madrid";
import { otherTeams } from "./others";
import { historicalTeams } from "./historical";

export const teams: Team[] = [...cataloniaTeams, ...madridTeams, ...otherTeams, ...historicalTeams];
