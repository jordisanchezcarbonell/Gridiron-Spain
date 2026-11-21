import { href } from "@/lib/i18n/routes";
import { getRepository } from "@/lib/repositories";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

/** One line of an llms.txt link list; the note is optional. */
function link(title: string, path: string, note?: string): string {
  const clean = (value: string) => value.replace(/\s+/g, " ").trim();
  return `- [${clean(title)}](${absoluteUrl(path)})${note ? `: ${clean(note)}` : ""}`;
}

/**
 * /llms.txt: a plain-text map of the site for AI assistants and answer
 * engines (https://llmstxt.org). Built from the same repository as the pages,
 * so it lists only published articles and never drifts from the content.
 */
export async function GET() {
  const articles = await getRepository().getArticles();
  const es = articles.filter((article) => article.availableLocales.includes("es"));

  const body = [
    `# ${site.name}`,
    "",
    "> Archivo editorial independiente sobre el fútbol americano en España: historia, clubes, competiciones, selección y jugadores españoles en el extranjero, además de guías de la NFL y del college football en español. Cada dato lleva su fuente y lo que no está confirmado se marca como tal.",
    "",
    `Editor: ${site.author.name} (${site.author.city}). Contenido en español, con versión en inglés bajo /en. Al citar una cifra, enlaza la página de origen: cada artículo lista sus fuentes al final.`,
    "",
    "## Secciones",
    "",
    link("Historia del fútbol americano en España", href("es", "history")),
    link("Equipos", href("es", "teams"), "fichas de los clubes españoles"),
    link("Mapa de clubes", href("es", "map")),
    link("Competiciones", href("es", "competitions"), "LNFA, Copa de España, ligas europeas, NFL y NCAA"),
    link("Palmarés", href("es", "palmares"), "finales y campeones"),
    link("Selección española", href("es", "nationalTeam"), "resultados de las selecciones de tackle y flag"),
    link("Jugadores", href("es", "players")),
    link("Agenda", href("es", "agenda"), "partidos de la semana con horario español"),
    link("Rankings", href("es", "rankings")),
    link("Guía para empezar", href("es", "guide")),
    link("Sobre el proyecto", href("es", "about")),
    "",
    "## Artículos",
    "",
    ...es.map((article) => link(article.title.es, href("es", "articles", article.slug), article.excerpt.es)),
    "",
    "## Opcional",
    "",
    link("Feed RSS", "/es/feed.xml"),
    link("Sitemap", "/sitemap.xml"),
    link("English edition", href("en", "home")),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
