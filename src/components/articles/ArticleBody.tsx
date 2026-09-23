import Image from "next/image";
import type { Locale, Source } from "@/types/common";
import type { ContentBlock } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import { t } from "@/lib/i18n/text";
import { splitCitations } from "@/lib/content/citations";
import { Placeholder } from "@/components/ui/Placeholder";
import { ScoreCard } from "@/components/articles/ScoreCard";
import { ComebackTimeline } from "@/components/articles/ComebackTimeline";
import { StatHighlight } from "@/components/articles/StatHighlight";

/** Renders a paragraph with inline citation links. */
export function RichText({ text, sources }: { text: string; sources: Source[] }) {
  const parts = splitCitations(text, sources);
  return (
    <>
      {parts.map((part, i) =>
        part.kind === "text" ? (
          <span key={i}>{part.value}</span>
        ) : (
          <a key={i} href={`#src-${part.sourceId}`} className="cite" aria-label={`Source ${part.index}`}>
            [{part.index || "?"}]
          </a>
        ),
      )}
    </>
  );
}

export function ArticleBody({
  blocks,
  sources,
  locale,
  dict,
}: {
  blocks: ContentBlock[];
  sources: Source[];
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="prose-editorial">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading": {
            const Tag = block.level === 2 ? "h2" : "h3";
            return (
              <Tag key={i} id={block.id ?? `section-${i}`}>
                {t(block.text, locale)}
              </Tag>
            );
          }
          case "paragraph":
            return (
              <p key={i}>
                <RichText text={t(block.text, locale)} sources={sources} />
              </p>
            );
          case "list": {
            const Tag = block.ordered ? "ol" : "ul";
            return (
              <Tag key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <RichText text={t(item, locale)} sources={sources} />
                  </li>
                ))}
              </Tag>
            );
          }
          case "quote":
            return (
              <blockquote key={i}>
                <p>{t(block.text, locale)}</p>
                {block.attribution && (
                  <footer className="mt-2 font-sans text-sm text-muted">— {t(block.attribution, locale)}</footer>
                )}
              </blockquote>
            );
          case "callout":
            return (
              <aside key={i} className="card my-8 border-l-2 border-l-gold p-5 text-base">
                {block.title && <p className="kicker mb-2">{t(block.title, locale)}</p>}
                <p className="text-paper-2">
                  <RichText text={t(block.text, locale)} sources={sources} />
                </p>
              </aside>
            );
          case "image":
            return (
              <figure key={i} className="my-8">
                <div className="relative aspect-[3/2] overflow-hidden rounded-card border border-line">
                  <Image
                    src={block.media.url}
                    alt={t(block.media.alt, locale)}
                    fill
                    sizes="(min-width: 768px) 44rem, 100vw"
                    className="object-cover"
                  />
                </div>
                {(block.caption || block.media.photographer) && (
                  <figcaption className="mt-2 text-sm text-muted">
                    {block.caption ? t(block.caption, locale) : null}
                    {block.media.photographer ? ` · ${block.media.photographer}` : ""}
                    {block.media.license ? ` · ${block.media.license}` : ""}
                  </figcaption>
                )}
              </figure>
            );
          case "score":
            return <ScoreCard key={i} {...block} status={t(block.status, locale)} />;
          case "timeline":
            return (
              <ComebackTimeline
                key={i}
                items={block.items.map((item) => ({
                  score: item.score,
                  time: item.time ? t(item.time, locale) : undefined,
                  description: item.description ? t(item.description, locale) : undefined,
                }))}
              />
            );
          case "stat-highlight":
            return <StatHighlight key={i} from={block.from} to={block.to} text={t(block.text, locale)} />;
          case "placeholder":
            return (
              <Placeholder
                key={i}
                title={`${dict.articles.researching} · ${t(block.topic, locale)}`}
                text={dict.articles.researchingText}
                pendingLabel={dict.articles.pendingList}
                pending={block.pending?.map((p) => t(p, locale))}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
