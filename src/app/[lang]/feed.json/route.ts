import { isLocale, locales } from "@/lib/i18n/config";
import { getRepository } from "@/lib/repositories";
import { jsonFeed, toFeedItems } from "@/lib/feed";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return new Response("Not found", { status: 404 });
  const articles = await getRepository().getArticles();
  return Response.json(jsonFeed(toFeedItems(articles, lang), lang), {
    headers: { "Content-Type": "application/feed+json; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
