const externalPowerRankings = {
  nfl: {
    sourceId: "nfelo-nfl-power-rankings",
    provider: "nfelo",
    url: "https://www.nfeloapp.com/nfl-power-ratings/",
  },
} as const;

export function getExternalPowerRanking(competitionId: string) {
  return externalPowerRankings[competitionId as keyof typeof externalPowerRankings];
}
