import type { Metadata } from "next";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { NflTeamQuiz } from "@/components/quiz/NflTeamQuiz";

export async function generateMetadata({ params }: PageProps<"/[lang]/test-nfl">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, title: dict.quiz.title, description: dict.quiz.intro, routeKey: "quiz" });
}

export default async function QuizPage({ params }: PageProps<"/[lang]/test-nfl">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.common.breadcrumbHome, url: href(locale, "home") },
          { name: dict.nav.quiz, url: href(locale, "quiz") },
        ])}
      />
      <div className="container-prose py-12 md:py-16">
        <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.nav.quiz }]} />
        <h1 className="display display-lg mb-5 mt-6">{dict.quiz.title}</h1>
        <p className="mb-10 text-lg leading-relaxed text-paper-2">{dict.quiz.intro}</p>
        <NflTeamQuiz locale={locale} resultBase={href(locale, "quiz")} labels={{ question: dict.quiz.question, of: dict.quiz.of }} />
        <p className="mt-6 text-sm text-muted">{dict.quiz.disclaimer}</p>
      </div>
    </>
  );
}
