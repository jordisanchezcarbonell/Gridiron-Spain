import "server-only";
import type { Locale } from "@/types/common";
import { es, type Dictionary } from "@/dictionaries/es";
import { en } from "@/dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
