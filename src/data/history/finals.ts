import type { Final } from "@/types";

const P = ["fefa-palmares"];

/**
 * Spanish Bowl (LNFA final) archive, from FEFA's official honours table.
 * Runner-up, score and venue are filled where the table states them;
 * rows without them are still verified as to the champion.
 */
export const lnfaFinals: Final[] = [
  { competitionId: "lnfa", year: 1995, edition: 1, champion: { teamId: "madrid-panteras" }, runnerUp: { teamId: "barcelona-boxers" }, score: "55-28", venue: { es: "Estadio Olímpico de Madrid", en: "Estadio Olímpico de Madrid" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 1996, edition: 2, champion: { teamId: "madrid-panteras" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 1997, edition: 3, champion: { name: "Vilafranca Eagles" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 1998, edition: 4, champion: { teamId: "badalona-dracs" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 1999, edition: 5, champion: { teamId: "badalona-dracs" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2000, edition: 6, champion: { name: "Granollers Fénix" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2001, edition: 7, champion: { teamId: "osos-rivas" }, runnerUp: { name: "Zaragoza Lions" }, score: "21-7", venue: { es: "Zaragoza", en: "Zaragoza" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2002, edition: 8, champion: { teamId: "badalona-dracs" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2003, edition: 9, champion: { teamId: "badalona-dracs" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2004, edition: 10, champion: { teamId: "badalona-dracs" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2005, edition: 11, champion: { teamId: "lhospitalet-pioners" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2006, edition: 12, champion: { teamId: "valencia-firebats" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2007, edition: 13, champion: { teamId: "valencia-firebats" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2008, edition: 14, champion: { teamId: "lhospitalet-pioners" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2009, edition: 15, champion: { teamId: "valencia-firebats" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2010, edition: 16, champion: { teamId: "lhospitalet-pioners" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2011, edition: 17, champion: { teamId: "lhospitalet-pioners" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2012, edition: 18, champion: { teamId: "lhospitalet-pioners" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2013, edition: 19, champion: { teamId: "lhospitalet-pioners" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2014, edition: 20, champion: { teamId: "badalona-dracs" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2015, edition: 21, champion: { teamId: "valencia-firebats" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2016, edition: 22, champion: { teamId: "badalona-dracs" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2017, edition: 23, champion: { teamId: "badalona-dracs" }, runnerUp: { teamId: "reus-imperials" }, score: "56-14", venue: { es: "Camp Municipal Reddis, Reus", en: "Camp Municipal Reddis, Reus" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2018, edition: 24, champion: { teamId: "badalona-dracs" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2019, edition: 25, champion: { teamId: "badalona-dracs" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2020, edition: 26, note: { es: "Temporada suspendida por la COVID-19", en: "Season suspended because of COVID-19" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2021, edition: 27, champion: { teamId: "badalona-dracs" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2022, edition: 28, champion: { teamId: "osos-rivas" }, runnerUp: { teamId: "las-rozas-black-demons" }, score: "28-12", venue: { es: "Cerro del Telégrafo, Rivas-Vaciamadrid", en: "Cerro del Telégrafo, Rivas-Vaciamadrid" }, sourceIds: [...P, "fefa-osos-campeones-2022"], verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2023, edition: 29, champion: { teamId: "las-rozas-black-demons" }, runnerUp: { teamId: "osos-rivas" }, score: "22-13", venue: { es: "El Cantizal, Las Rozas", en: "El Cantizal, Las Rozas" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2024, edition: 30, champion: { teamId: "las-rozas-black-demons" }, runnerUp: { teamId: "osos-rivas" }, score: "27-23", venue: { es: "Estadio Vallehermoso, Madrid", en: "Estadio Vallehermoso, Madrid" }, sourceIds: P, verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2025, edition: 31, champion: { teamId: "las-rozas-black-demons" }, runnerUp: { teamId: "badalona-dracs" }, score: "36-14", sourceIds: [...P, "fefa-black-demons-tricampeones-2025"], verificationStatus: "verified" },
  { competitionId: "lnfa", year: 2026, edition: 32, champion: { teamId: "las-rozas-black-demons" }, runnerUp: { teamId: "badalona-dracs" }, score: "27-13", venue: { es: "Estadi Municipal de Badalona", en: "Estadi Municipal de Badalona" }, sourceIds: [...P, "fefa-spanish-bowl-2026"], verificationStatus: "verified" },
];

export const finals: Final[] = [...lnfaFinals];
