import type { Locale } from "@/types/common";
import { Badge } from "@/components/ui/Badge";

type Props = {
  locale: Locale;
  url: string;
};

const copy = {
  es: {
    kicker: "Power ranking NFL",
    title: "El ranking de fuerza de nfelo",
    description: "Consulta la clasificación en directo de los 32 equipos de la NFL, elaborada por nfelo con su modelo Elo y métricas avanzadas.",
    cta: "Ver el power ranking en nfelo",
    note: "Se abre en nfelo. Gridiron Spain no reproduce ni calcula esta clasificación.",
  },
  en: {
    kicker: "NFL power ranking",
    title: "nfelo's team-strength ranking",
    description: "Consult the live ranking of all 32 NFL teams, produced by nfelo with its Elo model and advanced metrics.",
    cta: "View the power ranking on nfelo",
    note: "Opens on nfelo. Gridiron Spain does not republish or calculate these ratings.",
  },
};

export function NfeloPowerRanking({ locale, url }: Props) {
  const text = copy[locale];

  return (
    <section className="card mb-14 overflow-hidden border-gold/30 bg-[linear-gradient(135deg,rgba(223,177,66,0.12),rgba(18,23,27,0.9)_58%)] p-6 md:p-8" aria-labelledby="nfelo-power-ranking-title">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="kicker text-gold">{text.kicker}</p>
        <Badge tone="outline">nfelo</Badge>
      </div>
      <h2 id="nfelo-power-ranking-title" className="display display-sm mt-4 max-w-xl">{text.title}</h2>
      <p className="mt-4 max-w-2xl text-paper-2">{text.description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center rounded-sm bg-gold px-5 py-2.5 font-display text-base font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-gold-2">
        {text.cta}<span aria-hidden="true">↗</span>
      </a>
      <p className="mt-4 text-sm text-muted">{text.note}</p>
    </section>
  );
}
