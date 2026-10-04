"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/types/common";
import { quizQuestions, scoreQuiz } from "@/data/quiz/nfl-team";

type Props = {
  locale: Locale;
  /** Base path of the result pages, e.g. "/es/test-nfl". */
  resultBase: string;
  labels: { question: string; of: string };
};

/** One question at a time; the last answer navigates to the shareable result page. */
export function NflTeamQuiz({ locale, resultBase, labels }: Props) {
  const router = useRouter();
  const [answers, setAnswers] = useState<number[]>([]);
  const step = answers.length;
  const question = quizQuestions[step];

  const choose = (option: number) => {
    const next = [...answers, option];
    if (next.length === quizQuestions.length) router.push(`${resultBase}/${scoreQuiz(next)}`);
    else setAnswers(next);
  };

  if (!question) return null;

  return (
    <div className="border border-line bg-surface p-6 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
          {labels.question} {step + 1} {labels.of} {quizQuestions.length}
        </span>
        <span className="h-1 flex-1 bg-line">
          <span className="block h-1 bg-accent transition-all" style={{ width: `${(step / quizQuestions.length) * 100}%` }} />
        </span>
      </div>
      <h2 className="display display-sm mb-6">{question.text[locale] ?? question.text.es}</h2>
      <ul className="grid gap-3">
        {question.options.map((option, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => choose(i)}
              className="w-full border border-line-strong bg-ink-2 px-5 py-4 text-left text-paper transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:outline-none"
            >
              {option.text[locale] ?? option.text.es}
            </button>
          </li>
        ))}
      </ul>
      {step > 0 && (
        <button type="button" onClick={() => setAnswers(answers.slice(0, -1))} className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted hover:text-paper">
          ← {locale === "es" ? "Anterior" : "Back"}
        </button>
      )}
    </div>
  );
}
