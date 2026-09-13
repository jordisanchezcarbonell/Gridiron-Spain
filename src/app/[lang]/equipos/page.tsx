import type { Metadata } from "next";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { TeamFilters } from "@/components/teams/TeamFilters";

export async function generateMetadata({ params }: PageProps<"/[lang]/equipos">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const title =
    locale === "es" ? "Equipos de fútbol americano en España" : "American football teams in Spain";
  return buildMetadata({ locale, title, description: dict.teams.intro, routeKey: "teams" });
}

export default async function TeamsPage({ params }: PageProps<"/[lang]/equipos">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const repo = getRepository();
  const [teams, competitions] = await Promise.all([repo.getTeams(), repo.getCompetitions()]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.common.breadcrumbHome, url: href(locale, "home") },
          { name: dict.nav.teams, url: href(locale, "teams") },
        ])}
      />
      <section className="grain border-b border-line">
        <div className="container-content py-14 md:py-20">
          <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.nav.teams }]} />
          <h1 className="display display-md">{dict.teams.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-paper-2">{dict.teams.intro}</p>
          <p className="mt-3 max-w-2xl text-sm text-muted">{dict.verification.explain}</p>
        </div>
      </section>
      <div className="container-content py-12">
        <TeamFilters teams={teams} competitions={competitions} locale={locale} dict={dict} />
      </div>
    </>
  );
}
