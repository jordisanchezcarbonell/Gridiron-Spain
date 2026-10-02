import type { Team } from "@/types";
import { cataloniaTeams } from "./catalonia";
import { madridTeams } from "./madrid";
import { otherTeams } from "./others";
import { historicalTeams } from "./historical";
import { regionalTeams } from "./regions";

export const teams: Team[] = [...cataloniaTeams, ...madridTeams, ...otherTeams, ...regionalTeams, ...historicalTeams];
