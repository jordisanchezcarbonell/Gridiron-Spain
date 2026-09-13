import type { Metadata } from "next";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PrintButton } from "@/components/ui/PrintButton";

const copy = {
  es: {
    title: "Media kit",
    lead: "Proyecto independiente de fútbol americano desde Barcelona.",
    about: "Quiénes somos",
    aboutText:
      "Gridiron Spain documenta el fútbol americano en España: equipos, historia, competiciones y cultura. Es un proyecto editorial independiente creado en Barcelona, con fuentes verificables en cada pieza.",
    cover: "Qué cubrimos",
    coverItems: ["Football español", "Football europeo", "NCAA", "Cultura del football", "Viajes"],
    current: "Proyecto actual",
    currentText:
      "Barcelona → Annapolis. Dos aficionados europeos viajan en octubre de 2026 a su primer partido de college football: Navy Football en Annapolis. La serie documenta el antes, el viaje y el partido.",
    deliverables: "Entregables",
    deliverableItems: ["Vídeo vertical (60–90 s)", "Fotografía", "Artículos bilingües (ES/EN)", "Contenido para redes", "UGC reutilizable bajo condiciones acordadas"],
    opportunities: "Oportunidades de colaboración",
    opportunityItems: ["Alojamiento", "Viaje", "Game day", "Restauración", "Conectividad (eSIM)", "Equipamiento / ropa"],
    metrics: "Audiencia",
    metricsNote:
      "Todavía no publicamos métricas. Este espacio se completará con datos reales (seguidores, visualizaciones, engagement, demografía) cuando existan.",
    principles: "Principios",
    principleItems: [
      "Contenido patrocinado siempre identificado.",
      "Ninguna marca aparece como partner sin acuerdo real.",
      "No inventamos métricas ni audiencia.",
      "Credibilidad editorial por encima de ingresos.",
    ],
    contact: "Contacto",
    print: "Imprimir / guardar PDF",
  },
  en: {
    title: "Media kit",
    lead: "Independent American football project from Barcelona.",
    about: "About",
    aboutText:
      "Gridiron Spain documents American football in Spain: teams, history, competitions and culture. It is an independent editorial project created in Barcelona, with verifiable sources in every piece.",
    cover: "What we cover",
    coverItems: ["Spanish football", "European football", "NCAA", "Football culture", "Travel"],
    current: "Current project",
    currentText:
      "Barcelona → Annapolis. Two European fans travel in October 2026 to their first college football game: Navy Football in Annapolis. The series documents the build-up, the trip and the game.",
    deliverables: "Deliverables",
    deliverableItems: ["Vertical video (60–90 s)", "Photography", "Bilingual editorial (ES/EN)", "Social content", "UGC reusable under agreed terms"],
    opportunities: "Partnership opportunities",
    opportunityItems: ["Accommodation", "Travel", "Game day", "Food", "Connectivity (eSIM)", "Apparel / equipment"],
    metrics: "Audience",
    metricsNote:
      "We do not publish metrics yet. This space will be filled with real data (followers, views, engagement, demographics) once it exists.",
    principles: "Principles",
    principleItems: [
      "Sponsored content is always labelled.",
      "No brand appears as a partner without a real agreement.",
      "We never invent metrics or audience.",
      "Editorial credibility over revenue.",
    ],
    contact: "Contact",
    print: "Print / save as PDF",
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/media-kit">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const c = copy[locale];
  return buildMetadata({ locale, title: c.title, description: c.lead, routeKey: "mediaKit", noIndex: true });
}

export default async function MediaKitPage({ params }: PageProps<"/[lang]/media-kit">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const c = copy[locale];

  return (
    <div className="container-content py-12 print:py-0">
      <div className="print:hidden">
        <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.nav.mediaKit }]} />
      </div>
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
        <div>
          <p className="kicker mb-3">{site.name}</p>
          <h1 className="display display-md">{c.title}</h1>
          <p className="mt-3 text-lg text-paper-2">{c.lead}</p>
        </div>
        <PrintButton label={c.print} />
      </header>

      <div className="grid gap-10 py-10 md:grid-cols-2">
        <Block title={c.about}>
          <p className="text-paper-2">{c.aboutText}</p>
        </Block>
        <Block title={c.cover}>
          <Tags items={c.coverItems} />
        </Block>
        <Block title={c.current}>
          <p className="text-paper-2">{c.currentText}</p>
        </Block>
        <Block title={c.deliverables}>
          <List items={c.deliverableItems} />
        </Block>
        <Block title={c.opportunities}>
          <Tags items={c.opportunityItems} />
        </Block>
        <Block title={c.principles}>
          <List items={c.principleItems} />
        </Block>
        <Block title={c.metrics}>
          <div className="grid grid-cols-2 gap-3">
            {["Followers", "Views", "Engagement", "Demographics"].map((m) => (
              <div key={m} className="rounded-sm border border-dashed border-line-strong p-3">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-2">{m}</p>
                <p className="font-display text-2xl font-black text-line-strong">—</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">{c.metricsNote}</p>
        </Block>
        <Block title={c.contact}>
          <p className="font-display text-2xl font-extrabold uppercase text-paper">{site.author.name}</p>
          <p className="text-muted">{site.author.city}</p>
          <a href={site.author.url} className="text-gold" rel="noopener noreferrer">
            jordisanchezweb.es
          </a>
        </Block>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card p-6 print:border-0 print:p-0 print:shadow-none">
      <h2 className="kicker mb-3">{title}</h2>
      {children}
    </section>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="rounded-sm border border-line-strong px-3 py-1 font-display text-base font-bold uppercase text-paper">
          {item}
        </li>
      ))}
    </ul>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-5 text-paper-2">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
