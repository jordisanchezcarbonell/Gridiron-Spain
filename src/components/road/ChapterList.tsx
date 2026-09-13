import Link from "next/link";
import type { Locale } from "@/types/common";
import type { RoadChapter } from "@/types";
import type { Dictionary } from "@/dictionaries/es";
import { href } from "@/lib/i18n/routes";
import { t } from "@/lib/i18n/text";
import { Badge } from "@/components/ui/Badge";

export function ChapterList({ chapters, locale, dict }: { chapters: RoadChapter[]; locale: Locale; dict: Dictionary }) {
  return (
    <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {chapters.map((chapter) => {
        const inner = (
          <>
            <div className="flex items-start justify-between gap-3">
              <span className="font-display text-5xl font-black leading-none text-line-strong">
                {String(chapter.number).padStart(2, "0")}
              </span>
              <Badge tone={chapter.status === "published" ? "turf" : "outline"}>
                {dict.road.chapterStatus[chapter.status]}
              </Badge>
            </div>
            <h3 className="mt-4 font-display text-2xl font-extrabold uppercase leading-none text-paper">
              {t(chapter.title, locale)}
            </h3>
            <p className="mt-2 text-sm text-muted">{t(chapter.summary, locale)}</p>
          </>
        );
        return (
          <li key={chapter.slug}>
            {chapter.articleSlug && chapter.status === "published" ? (
              <Link href={href(locale, "articles", chapter.articleSlug)} className="card card-hover group flex h-full flex-col p-5">
                {inner}
              </Link>
            ) : (
              <div className="card flex h-full flex-col p-5 opacity-80">{inner}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
