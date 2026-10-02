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
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink-2" />
        <div aria-hidden className="pointer-events-none absolute inset-0 grain" />
        <div aria-hidden className="pointer-events-none absolute inset-0 yardlines opacity-15" />

        <div className="container-content relative py-12 md:py-16 lg:py-20">
          <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.nav.guide }]} />

          {/* Kicker */}
          <div className="mb-6 mt-6 inline-flex items-center">
            <span className="flex h-7 items-center bg-accent px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white">
              {dict.nav.guide}
            </span>
            <div className="h-7 w-10 bg-gradient-to-r from-accent/60 to-transparent" />
          </div>

          <h1 className="display display-lg max-w-4xl">{dict.guide.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper-2">{dict.guide.intro}</p>

          {/* Section navigation */}
          <nav aria-label={dict.nav.guide} className="mt-10 flex flex-wrap gap-2">
            {guideSections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="flex h-8 items-center border border-line bg-surface px-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted transition-colors hover:border-accent hover:text-accent">
                {t(s.title, locale)}
              </a>
            ))}
            <a href="#glosario" className="flex h-8 items-center border border-line bg-surface px-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted transition-colors hover:border-accent hover:text-accent">
              {dict.guide.glossary}
            </a>
          </nav>
        </div>

        {/* Bottom accent bar */}
        <div className="h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
      </section>

      <div className="container-content grid gap-12 py-14 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0">
          {guideSections.map((section, i) => (
            <section key={section.id} id={section.id} className={i > 0 ? "mt-12 border-t border-line pt-10" : ""} aria-labelledby={`${section.id}-title`}>
              <header className="mb-5">
                <div className="inline-flex items-center">
                  <span className="flex h-7 items-center bg-accent px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="h-7 w-2 bg-accent/60" />
                  <div className="h-7 w-1 bg-accent/30" />
                </div>
              </header>
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

          <section id="glosario" className="mt-12 border-t border-line pt-10" aria-labelledby="glosario-title">
            <header className="mb-5">
              <div className="inline-flex items-center">
                <span className="flex h-7 items-center bg-surface-2 px-3 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-paper">
                  {String(guideSections.length + 1).padStart(2, "0")}
                </span>
              </div>
            </header>
            <h2 id="glosario-title" className="display display-sm mb-2">
              {dict.guide.glossary}
            </h2>
            <p className="mb-6 text-muted">{dict.guide.glossaryIntro}</p>
            <dl className="divide-y divide-line border border-line bg-surface">
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
          <div className="relative border border-line bg-surface p-5">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
            <span className="mb-2 inline-flex h-6 items-center bg-accent px-2.5 font-mono text-[0.5625rem] font-semibold uppercase tracking-[0.15em] text-white">
              {dict.near.title}
            </span>
            <p className="text-sm text-muted">{dict.home.nearYouSub}</p>
            <ButtonLink href={href(locale, "nearYou")} variant="secondary" size="sm" className="mt-4">
              {dict.near.cta}
            </ButtonLink>
          </div>
          <div className="border border-line bg-surface p-5">
            <span className="mb-2 inline-flex h-6 items-center bg-surface-2 px-2.5 font-mono text-[0.5625rem] font-semibold uppercase tracking-[0.15em] text-muted">
              {dict.nav.competitions}
            </span>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={href(locale, "competitions", "lnfa")} className="inline-flex items-center gap-1 text-accent hover:text-accent-bright">
                  LNFA
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="square" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href={href(locale, "competitions", "spanish-flag-bowl")} className="inline-flex items-center gap-1 text-accent hover:text-accent-bright">
                  Spanish Flag Bowl
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="square" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href={href(locale, "history")} className="inline-flex items-center gap-1 text-accent hover:text-accent-bright">
                  {dict.nav.history}
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="square" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
