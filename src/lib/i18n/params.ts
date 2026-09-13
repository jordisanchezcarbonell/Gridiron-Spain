import { notFound } from "next/navigation";
import type { Locale } from "@/types/common";
import { isLocale } from "./config";

/** Narrow the [lang] param or 404. */
export function resolveLocale(lang: string): Locale {
  if (!isLocale(lang)) notFound();
  return lang;
}
