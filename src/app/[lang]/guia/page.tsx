import type { Metadata } from "next";
import Link from "next/link";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { t } from "@/lib/i18n/text";
import { guideSections, glossary } from "@/data/guide";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";

export async function generateMetadata({ params }: PageProps<"/[lang]/guia">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, title: dict.guide.title, description: dict.guide.intro, routeKey: "guide" });
}

export default async function GuidePage({ params }: PageProps<"/[lang]/guia">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: glossary.map((g) => ({
      "@type": "Question",
      name: t(g.term, locale),
      acceptedAnswer: { "@type": "Answer", text: t(g.definition, locale) },
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: dict.common.breadcrumbHome, url: href(locale, "home") },
            { name: dict.nav.guide, url: href(locale, "guide") },
          ]),
          faq,
        ]}
      />
      <section className="grain border-b border-line">
        <div className="container-content py-14 md:py-20">
          <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.nav.guide }]} />
          <p className="kicker mb-4">{dict.nav.guide}</p>
          <h1 className="display display-md max-w-4xl">{dict.guide.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-paper-2">{dict.guide.intro}</p>
          <nav aria-label={dict.nav.guide} className="mt-8 flex flex-wrap gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em]">
            {guideSections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="rounded-full border border-line-strong px-3 py-1.5 text-muted hover:border-gold hover:text-gold">
                {t(s.title, locale)}
              </a>
            ))}
            <a href="#glosario" className="rounded-full border border-line-strong px-3 py-1.5 text-muted hover:border-gold hover:text-gold">
              {dict.guide.glossary}
            </a>
          </nav>
        </div>
      </section>

      <div className="container-content grid gap-12 py-14 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0">
          {guideSections.map((section, i) => (
            <section key={section.id} id={section.id} className={i > 0 ? "rule mt-12 pt-10" : ""} aria-labelledby={`${section.id}-title`}>
              <p className="kicker mb-2">{String(i + 1).padStart(2, "0")}</p>
              <h2 id={`${section.id}-title`} className="display display-sm mb-5">
                {t(section.title, locale)}
              </h2>
              <div className="prose-editorial max-w-prose">
                {section.paragraphs.map((p, j) => (
                  <p key={j}>{t(p, locale)}</p>
                ))}
              </div>
            </section>
          ))}

          <section id="glosario" className="rule mt-12 pt-10" aria-labelledby="glosario-title">
            <p className="kicker mb-2">{String(guideSections.length + 1).padStart(2, "0")}</p>
            <h2 id="glosario-title" className="display display-sm mb-2">
              {dict.guide.glossary}
            </h2>
            <p className="mb-6 text-muted">{dict.guide.glossaryIntro}</p>
            <dl className="card divide-y divide-line">
              {glossary.map((g) => (
                <div key={t(g.term, "es")} className="grid gap-1 px-5 py-4 sm:grid-cols-[14rem_1fr]">
                  <dt className="font-display text-lg font-bold uppercase leading-tight text-paper">{t(g.term, locale)}</dt>
                  <dd className="text-sm text-paper-2">{t(g.definition, locale)}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <p className="kicker mb-2">{dict.near.title}</p>
            <p className="text-sm text-muted">{dict.home.nearYouSub}</p>
            <ButtonLink href={href(locale, "nearYou")} variant="secondary" size="sm" className="mt-4">
              {dict.near.cta}
            </ButtonLink>
          </div>
          <div className="card p-5">
            <p className="kicker mb-2 text-muted-2">{dict.nav.competitions}</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={href(locale, "competitions", "lnfa")} className="text-gold hover:text-gold-2">
                  LNFA →
                </Link>
              </li>
              <li>
                <Link href={href(locale, "competitions", "spanish-flag-bowl")} className="text-gold hover:text-gold-2">
                  Spanish Flag Bowl →
                </Link>
              </li>
              <li>
                <Link href={href(locale, "history")} className="text-gold hover:text-gold-2">
                  {dict.nav.history} →
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
