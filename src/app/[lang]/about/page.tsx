import type { Metadata } from "next";
import Link from "next/link";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";

const copy = {
  es: {
    kicker: "Proyecto independiente · Barcelona",
    title: "Sobre el proyecto",
    lead: "Gridiron Spain nace en Barcelona para documentar el fútbol americano que se juega en España: sus equipos, su historia, sus competiciones y su cultura.",
    blocks: [
      {
        h: "Qué es",
        p: "No es un blog de noticias. Es un archivo en construcción: un directorio de equipos con fuentes, un mapa de dónde se juega, una cronología verificada y una colección de historias largas sobre cómo llegó este deporte a España y quién lo mantiene vivo.",
      },
      {
        h: "Cómo trabajamos",
        p: "Cada dato histórico relevante debe poder enlazar a una fuente: federaciones, clubes, ligas, prensa de la época, entrevistas o documentos. Cuando algo no se puede verificar lo decimos. Las fichas y artículos muestran su estado de verificación y la fecha de la última revisión.",
      },
      {
        h: "Quién lo hace",
        p: `Lo crea ${site.author.name}, desarrollador web en Barcelona y aficionado al football en todas sus formas: la liga española, el football europeo, la NCAA y la NFL. El proyecto tiene identidad propia y no representa a ninguna federación, liga, club ni organización.`,
      },
      {
        h: "Colaborar",
        p: "Si formas parte de un club y quieres ayudar a documentar su historia (fechas, escudos, fotografías, testimonios), o si tienes material de los primeros años del football en España, queremos hablar contigo.",
      },
    ],
    contactCta: "Contacto",
    mediaKit: "Media kit",
  },
  en: {
    kicker: "Independent project · Barcelona",
    title: "About the project",
    lead: "Gridiron Spain was born in Barcelona to document American football as it is played in Spain: its teams, history, competitions and culture.",
    blocks: [
      {
        h: "What it is",
        p: "Not a news blog. An archive under construction: a sourced team directory, a map of where the game is played, a verified timeline and a collection of long-form stories about how the sport arrived in Spain and who keeps it alive.",
      },
      {
        h: "How we work",
        p: "Every relevant historical fact must be able to link to a source: federations, clubs, leagues, contemporary press, interviews or documents. When something cannot be verified, we say so. Profiles and articles show their verification status and last review date.",
      },
      {
        h: "Who is behind it",
        p: `It is created by ${site.author.name}, a web developer in Barcelona and a fan of football in all its forms: the Spanish league, European football, the NCAA and the NFL. The project has its own identity and does not represent any federation, league, club or organisation.`,
      },
      {
        h: "Get involved",
        p: "If you belong to a club and want to help document its history (dates, crests, photographs, testimonies), or you hold material from the early years of football in Spain, we want to talk to you.",
      },
    ],
    contactCta: "Contact",
    mediaKit: "Media kit",
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const c = copy[locale];
  return buildMetadata({ locale, title: c.title, description: c.lead, routeKey: "about" });
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const c = copy[locale];

  return (
    <>
      <section className="grain border-b border-line">
        <div className="container-content py-14 md:py-20">
          <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.nav.about }]} />
          <p className="kicker mb-4">{c.kicker}</p>
          <h1 className="display display-md">{c.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-paper-2 md:text-xl">{c.lead}</p>
        </div>
      </section>
      <div className="container-content grid gap-12 py-14 md:grid-cols-[1fr_18rem]">
        <div className="space-y-10">
          {c.blocks.map((b) => (
            <section key={b.h}>
              <h2 className="display display-sm mb-3">{b.h}</h2>
              <p className="prose-editorial max-w-prose">{b.p}</p>
            </section>
          ))}
        </div>
        <aside className="card h-fit p-6 md:sticky md:top-24">
          <p className="kicker mb-3">{c.contactCta}</p>
          <p className="font-display text-2xl font-extrabold uppercase text-paper">{site.author.name}</p>
          <p className="text-sm text-muted">{site.author.city}</p>
          <a href={site.author.url} className="mt-3 block text-sm text-gold hover:text-gold-2" rel="noopener noreferrer">
            jordisanchezweb.es
          </a>
          <ButtonLink href={href(locale, "mediaKit")} variant="secondary" size="sm" className="mt-6">
            {c.mediaKit}
          </ButtonLink>
          <p className="mt-6 text-xs text-muted-2">
            <Link href={href(locale, "roadToAnnapolis")} className="hover:text-gold">
              Road to Annapolis →
            </Link>
          </p>
        </aside>
      </div>
    </>
  );
}
