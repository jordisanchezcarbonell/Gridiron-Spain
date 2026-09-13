import type { Locale } from "@/types/common";
import type { AutonomousCommunity } from "@/types/team";
import { slugify } from "./utils";

/** Autonomous communities: slug for URLs and localized display names. */
export const regionNames: Record<AutonomousCommunity, { es: string; en: string }> = {
  Andalucía: { es: "Andalucía", en: "Andalusia" },
  Aragón: { es: "Aragón", en: "Aragon" },
  Asturias: { es: "Asturias", en: "Asturias" },
  Cantabria: { es: "Cantabria", en: "Cantabria" },
  "Castilla-La Mancha": { es: "Castilla-La Mancha", en: "Castilla-La Mancha" },
  "Castilla y León": { es: "Castilla y León", en: "Castile and León" },
  Cataluña: { es: "Cataluña", en: "Catalonia" },
  "Comunidad Valenciana": { es: "Comunidad Valenciana", en: "Valencian Community" },
  Extremadura: { es: "Extremadura", en: "Extremadura" },
  Galicia: { es: "Galicia", en: "Galicia" },
  "Islas Baleares": { es: "Islas Baleares", en: "Balearic Islands" },
  "Islas Canarias": { es: "Islas Canarias", en: "Canary Islands" },
  "La Rioja": { es: "La Rioja", en: "La Rioja" },
  Madrid: { es: "Comunidad de Madrid", en: "Madrid" },
  Murcia: { es: "Región de Murcia", en: "Murcia" },
  Navarra: { es: "Navarra", en: "Navarre" },
  "País Vasco": { es: "País Vasco", en: "Basque Country" },
  Ceuta: { es: "Ceuta", en: "Ceuta" },
  Melilla: { es: "Melilla", en: "Melilla" },
};

export function regionSlug(community: AutonomousCommunity): string {
  return slugify(community);
}

export function regionName(community: AutonomousCommunity, locale: Locale): string {
  return regionNames[community]?.[locale] ?? community;
}

export function regionFromSlug(slug: string): AutonomousCommunity | null {
  const match = (Object.keys(regionNames) as AutonomousCommunity[]).find((c) => regionSlug(c) === slug);
  return match ?? null;
}
