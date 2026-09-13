import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLocale, locales, localeTags } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/json-ld";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${dict.site.tagline}`,
      template: `%s — ${site.name}`,
    },
    description: dict.site.description,
    applicationName: site.name,
    authors: [{ name: site.author.name, url: site.author.url }],
    creator: site.author.name,
    alternates: {
      types: {
        "application/rss+xml": `${site.url}/${lang}/feed.xml`,
        "application/feed+json": `${site.url}/${lang}/feed.json`,
      },
    },
    openGraph: { siteName: site.name, type: "website", locale: localeTags[lang].replace("-", "_") },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0b0d10",
  colorScheme: "dark",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={localeTags[lang]} className={`${display.variable} ${sans.variable} ${mono.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd(lang)]} />
        <Header locale={lang} dict={dict} />
        <main id="content" className="flex-1">
          {children}
        </main>
        <Footer locale={lang} dict={dict} />
      </body>
    </html>
  );
}
