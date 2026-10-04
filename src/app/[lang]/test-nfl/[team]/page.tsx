import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { getRepository } from "@/lib/repositories";
import { t } from "@/lib/i18n/text";
import { quizResults } from "@/data/quiz/nfl-team";
import { RichText } from "@/components/articles/ArticleBody";
import { SourceList } from "@/components/articles/SourceList";
import { ShareResult } from "@/components/quiz/ShareResult";

export function generateStaticParams() {
  return quizResults.map((r) => ({ team: r.id }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/test-nfl/[team]">): Promise<Metadata> {
  const { lang, team } = await params;
  const locale = resolveLocale(lang);
  const result = quizResults.find((r) => r.id === team);
  if (!result) return {};
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    title: `${dict.quiz.result} ${result.name}`,
    description: `${t(result.tagline, locale)} · ${dict.quiz.title}`,
    routeKey: "quiz",
    segments: [team],
  });
}

export default async function QuizResultPage({ params }: PageProps<"/[lang]/test-nfl/[team]">) {
  const { lang, team } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);
  const result = quizResults.find((r) => r.id === team);
  if (!result) notFound();
  const sources = await getRepository().getSourcesByIds(result.sourceIds);

  return (
    <div className="container-prose py-12 md:py-16">
      <p className="kicker text-muted">{dict.quiz.result}</p>
      <div className="mt-3 border-l-4 bg-surface p-6 md:p-8" style={{ borderColor: result.color }}>
        <h1 className="display display-lg">{result.name}</h1>
        <p className="mt-2 font-display text-xl font-bold uppercase" style={{ color: result.color === "#0b162a" ? "#c83803" : result.color }}>
          {t(result.tagline, locale)}
        </p>
      </div>

      <h2 className="display display-sm mb-4 mt-10">{dict.quiz.why}</h2>
      <ul className="grid gap-4">
        {result.facts.map((fact, i) => (
          <li key={i} className="border-l-2 border-accent pl-4 text-lg leading-relaxed text-paper-2">
            <RichText text={t(fact, locale)} sources={sources} />
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-3">
        <ShareResult title={`${dict.quiz.result} ${result.name}`} labels={{ share: dict.quiz.share, copied: dict.quiz.copied }} />
        <Link href={href(locale, "quiz")} className="inline-flex items-center border border-line-strong px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-paper hover:border-accent hover:text-accent">
          {dict.quiz.again}
        </Link>
      </div>

      <h2 className="kicker mb-3 mt-12 text-muted">{dict.quiz.others}</h2>
      <ul className="flex flex-wrap gap-2">
        {quizResults
          .filter((r) => r.id !== result.id)
          .map((r) => (
            <li key={r.id}>
              <Link href={href(locale, "quiz", r.id)} className="block border border-line bg-surface px-3 py-2 text-sm text-paper-2 hover:border-accent hover:text-accent">
                {r.name}
              </Link>
            </li>
          ))}
      </ul>

      <p className="mt-8 text-sm text-muted">{dict.quiz.disclaimer}</p>
      <SourceList sources={sources} locale={locale} title={dict.common.sources} accessedLabel={dict.articles.accessed} />
    </div>
  );
}
