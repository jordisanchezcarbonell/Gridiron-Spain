import Image from "next/image";
import type { Media } from "@/types/common";

function Team({ name, score, logo }: { name: string; score: string | number; logo?: Media }) {
  return (
    <div className="flex items-center gap-3 py-3 first:border-b first:border-line">
      {logo && <Image src={logo.url} alt="" width={28} height={28} className="h-7 w-7 object-contain" />}
      <span className="min-w-0 flex-1 font-display text-2xl font-bold uppercase leading-none text-paper">{name}</span>
      <strong className="font-display text-4xl leading-none text-gold">{score}</strong>
    </div>
  );
}

export function ScoreCard({
  teamA,
  teamB,
  scoreA,
  scoreB,
  status,
  logoA,
  logoB,
}: {
  teamA: string;
  teamB: string;
  scoreA: string | number;
  scoreB: string | number;
  status: string;
  logoA?: Media;
  logoB?: Media;
}) {
  return (
    <section className="card my-10 overflow-hidden" aria-label={`${teamA} ${scoreA}, ${teamB} ${scoreB}`}>
      <div className="yardlines flex justify-center border-b border-line bg-ink-2 px-4 py-2">
        <span className="kicker">{status}</span>
      </div>
      <div className="px-5">
        <Team name={teamA} score={scoreA} logo={logoA} />
        <Team name={teamB} score={scoreB} logo={logoB} />
      </div>
    </section>
  );
}
