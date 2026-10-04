import Link from "next/link";
import type { Locale } from "@/types/common";
import { href } from "@/lib/i18n/routes";

const copy = {
  es: { kicker: "Test", title: "¿Qué equipo de la NFL deberías seguir?", text: "Seis preguntas y te decimos cuál, entre los equipos con vínculo con España.", cta: "Hacer el test" },
  en: { kicker: "Quiz", title: "Which NFL team should you follow?", text: "Six questions to find yours among the teams with a link to Spain.", cta: "Take the quiz" },
};

/** Small call to action for the NFL team quiz. */
export function QuizPromo({ locale, className = "" }: { locale: Locale; className?: string }) {
  const c = copy[locale];
  return (
    <Link href={href(locale, "quiz")} className={`group block border border-gold/40 bg-gold/10 p-5 transition-colors hover:border-gold ${className}`}>
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-gold">{c.kicker}</p>
      <p className="mt-2 font-display text-xl font-black uppercase leading-tight text-paper">{c.title}</p>
      <p className="mt-2 text-sm text-paper-2">{c.text}</p>
      <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-gold group-hover:text-paper">{c.cta} →</p>
    </Link>
  );
}
