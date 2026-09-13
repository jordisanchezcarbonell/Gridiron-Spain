import type { Metadata } from "next";
import Link from "next/link";
import { resolveLocale } from "@/lib/i18n/params";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { href } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { getRepository } from "@/lib/repositories";
import { t } from "@/lib/i18n/text";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { VerificationBadge } from "@/components/ui/VerificationBadge";

export async function generateMetadata({ params }: PageProps<"/[lang]/competiciones">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, title: dict.competitions.title, description: dict.competitions.intro, routeKey: "competitions" });
}

export default async function CompetitionsPage({ params }: PageProps<"/[lang]/competiciones">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const competitions = await getRepository().getCompetitions();
  const groups: Array<{ key: string; title: string; items: typeof competitions }> = [
    { key: "national", title: locale === "es" ? "España" : "Spain", items: competitions.filter((c) => c.country === "ES" && c.status === "active") },
    { key: "europe", title: locale === "es" ? "Europa" : "Europe", items: competitions.filter((c) => c.country !== "ES" && c.country !== "US" && c.status === "active") },
    { key: "us", title: locale === "es" ? "Estados Unidos" : "United States", items: competitions.filter((c) => c.country === "US") },
    { key: "historical", title: locale === "es" ? "Históricas" : "Historical", items: competitions.filter((c) => c.status === "historical") },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.common.breadcrumbHome, url: href(locale, "home") },
          { name: dict.nav.competitions, url: href(locale, "competitions") },
        ])}
      />
      <section className="grain border-b border-line">
        <div className="container-content py-14 md:py-20">
          <Breadcrumbs items={[{ name: dict.common.breadcrumbHome, href: href(locale, "home") }, { name: dict.nav.competitions }]} />
          <h1 className="display display-md">{dict.competitions.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-paper-2">{dict.competitions.intro}</p>
        </div>
      </section>
      <div className="container-content space-y-14 py-12">
        {groups
          .filter((g) => g.items.length > 0)
          .map((group) => (
            <section key={group.key} aria-labelledby={`group-${group.key}`}>
              <h2 id={`group-${group.key}`} className="display display-sm mb-6">
                {group.title}
              </h2>
              <ul className="grid gap-5 md:grid-cols-2">
                {group.items.map((c) => (
                  <li key={c.id}>
                    <Link href={href(locale, "competitions", c.slug)} className="card card-hover group flex h-full flex-col gap-3 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <Badge tone="gold">{dict.levels[c.level]}</Badge>
                        <VerificationBadge status={c.verificationStatus} label={dict.verification[c.verificationStatus]} />
                      </div>
                      <h3 className="font-display text-2xl font-extrabold uppercase leading-none text-paper group-hover:text-gold">
                        {c.name}
                      </h3>
                      <p className="text-sm text-muted">
                        {c.organizer}
                        {c.foundedYear ? ` · ${c.foundedYear}` : ""}
                        {c.endedYear ? `–${c.endedYear}` : ""} · {dict.discipline[c.discipline]}
                      </p>
                      <p className="line-clamp-3 text-sm text-paper-2">{t(c.description, locale)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
      </div>
    </>
  );
}
