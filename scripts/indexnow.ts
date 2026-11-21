/**
 * Submit URLs to IndexNow (Bing, Yandex, Seznam, Naver).
 *
 *   npm run indexnow                 -> every URL in the live sitemap
 *   npm run indexnow -- <url> <url>  -> only those URLs
 *
 * The key below is public by design: IndexNow checks that
 * https://<host>/<key>.txt serves the same value (public/<key>.txt).
 * Run it after the deploy is live, never before.
 */
const HOST = "primerdown.jordisanchezweb.es";
const KEY = "bbfb2d09ed6fac8aa77fb2edca4086f2";
const ORIGIN = `https://${HOST}`;

async function sitemapUrls(): Promise<string[]> {
  const response = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!response.ok) throw new Error(`sitemap.xml: HTTP ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

async function main() {
  const args = process.argv.slice(2);
  const urlList = args.length > 0 ? args : await sitemapUrls();
  const foreign = urlList.filter((url) => !url.startsWith(`${ORIGIN}/`));
  if (foreign.length > 0) throw new Error(`URLs outside ${HOST}: ${foreign.join(", ")}`);
  if (urlList.length === 0) throw new Error("No URLs to submit");

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }),
  });
  // 200 = accepted, 202 = accepted, key validation pending.
  console.log(`IndexNow: HTTP ${response.status} for ${urlList.length} URL(s)`);
  if (!response.ok) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
