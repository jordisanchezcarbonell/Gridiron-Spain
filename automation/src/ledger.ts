/**
 * Dedup ledger.
 *
 * The radar itself has no programmatic dedup: it writes one file per day and
 * relies on a prose rule in the skill ("NO incluir contenido de días anteriores
 * como nuevo") plus the editor's judgement. A recurring storyline therefore shows
 * up in several briefings. This module keeps its own ledger so the same story is
 * never cut twice, without changing anything about how the radar works.
 *
 * The ledger is committed (not in `out/`) so dedup survives clean checkouts.
 */
import fs from "node:fs";
import path from "node:path";
import type { LedgerEntry } from "./types";
import { paths } from "./config";

export interface Ledger {
  entries: LedgerEntry[];
}

const EMPTY: Ledger = { entries: [] };

export function loadLedger(file: string = paths.ledger): Ledger {
  if (!fs.existsSync(file)) return { ...EMPTY };
  const raw = fs.readFileSync(file, "utf8").trim();
  if (!raw) return { ...EMPTY };
  const parsed = JSON.parse(raw) as Partial<Ledger>;
  return { entries: Array.isArray(parsed.entries) ? parsed.entries : [] };
}

export function saveLedger(ledger: Ledger, file: string = paths.ledger): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const sorted = [...ledger.entries].sort((a, b) =>
    a.producedAt === b.producedAt ? a.slug.localeCompare(b.slug) : a.producedAt.localeCompare(b.producedAt),
  );
  fs.writeFileSync(file, `${JSON.stringify({ entries: sorted }, null, 2)}\n`, "utf8");
}

export function findEntry(ledger: Ledger, slug: string): LedgerEntry | undefined {
  return ledger.entries.find((e) => e.slug === slug);
}

export function recordEntry(ledger: Ledger, entry: LedgerEntry): Ledger {
  return { entries: [...ledger.entries.filter((e) => e.slug !== entry.slug), entry] };
}
