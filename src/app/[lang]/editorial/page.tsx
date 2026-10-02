import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resolveLocale } from "@/lib/i18n/params";
import { href } from "@/lib/i18n/routes";
import { getRepository } from "@/lib/repositories";
import { buildPendingList, type PendingItem } from "@/lib/pending";
import { Badge } from "@/components/ui/Badge";

/**
 * Internal editorial to-do list. Exists only on the local dev server: in a
 * production build it returns 404 and is never prerendered or indexed.
 */
const ENABLED = process.env.NODE_ENV !== "production";

export const metadata: Metadata = { title: "Pendientes editoriales", robots: { index: false, follow: false } };

const KIND_LABEL: Record<PendingItem["kind"], string> = {
  team: "Equipos",
  "national-team": "Selecciones",
  season: "Temporadas",
  competition: "Competiciones",
  article: "Historias",
  player: "Jugadores",
  ranking: "Rankings",
};

export default async function EditorialPage({ params }: PageProps<"/[lang]/editorial">) {
  if (!ENABLED) notFound();
  const locale = resolveLocale((await params).lang);
  const repo = getRepository();
  const [teams, articles, seasons, competitions, nationalTeams, players, rankings] = await Promise.all([
    repo.getTeams(),
    repo.getArticles({ includeDrafts: true }),
    repo.getSeasons(),
    repo.getCompetitions(),
    repo.getNationalTeams(),
    repo.getPlayerSpotlights(),
    repo.getRankings(),
  ]);
  const items = buildPendingList({ teams, articles, seasons, competitions, nationalTeams, players, rankings });
  const kinds = Object.keys(KIND_LABEL) as PendingItem["kind"][];
  const totalTasks = items.reduce((n, i) => n + i.tasks.length, 0);

  return (
    <div className="container-content py-12 md:py-16">
      <p className="kicker text-signal">Solo en local · no se publica</p>
      <h1 className="display display-lg mt-2">Pendientes editoriales</h1>
      <p className="mt-4 max-w-2xl text-paper-2">
        {items.length} fichas con {totalTasks} tareas, generadas a partir de los datos. Cuando verifiques algo, actualiza el archivo en <code className="font-mono text-sm">src/data</code> y desaparecerá de esta lista.
      </p>
      <nav className="mt-8 flex flex-wrap gap-2">
        {kinds
          .filter((k) => items.some((i) => i.kind === k))
          .map((k) => (
            <a key={k} href={`#${k}`} className="flex h-8 items-center border border-line bg-surface px-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted hover:border-accent hover:text-accent">
              {KIND_LABEL[k]} · {items.filter((i) => i.kind === k).length}
            </a>
          ))}
      </nav>

      {kinds.map((k) => {
        const list = items.filter((i) => i.kind === k);
        if (list.length === 0) return null;
        return (
          <section key={k} id={k} className="mt-12 scroll-mt-24">
            <h2 className="display display-sm mb-4">{KIND_LABEL[k]}</h2>
            <ul className="divide-y divide-line border border-line bg-surface">
              {list.map((item) => (
                <li key={item.id} className="grid gap-2 px-5 py-4 md:grid-cols-[16rem_1fr]">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge tone={item.status === "unverified" ? "signal" : item.status === "partial" ? "gold" : "turf"}>{item.status}</Badge>
                      <span className="font-mono text-[0.625rem] text-muted-2">{item.tasks.length}</span>
                    </div>
                    {item.link ? (
                      <Link href={href(locale, item.link.route, ...item.link.segments)} className="mt-2 block font-display text-lg font-bold text-paper hover:text-accent">
                        {item.title}
                      </Link>
                    ) : (
                      <p className="mt-2 font-display text-lg font-bold text-paper">{item.title}</p>
                    )}
                    <p className="font-mono text-[0.625rem] text-muted-2">{item.id}</p>
                  </div>
                  <div>
                    {item.tasks.length > 0 && (
                      <ul className="list-disc space-y-1 pl-5 text-sm text-paper-2">
                        {item.tasks.map((task) => (
                          <li key={task}>{task}</li>
                        ))}
                      </ul>
                    )}
                    {item.note && <p className="mt-2 text-xs leading-relaxed text-muted">{item.note}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
