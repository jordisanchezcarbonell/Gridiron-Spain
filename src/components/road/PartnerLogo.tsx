import Image from "next/image";
import type { Locale } from "@/types/common";
import type { Partner } from "@/types";
import { t } from "@/lib/i18n/text";

/** Only ever receives confirmed partners (repository filters them). */
export function PartnerLogo({ partner, locale }: { partner: Partner; locale: Locale }) {
  const inner = partner.logo ? (
    <Image src={partner.logo} alt={partner.name} width={160} height={64} className="h-12 w-auto object-contain" />
  ) : (
    <span className="font-display text-xl font-bold uppercase text-paper">{partner.name}</span>
  );
  return (
    <figure className="card flex flex-col items-center gap-2 p-5 text-center">
      {partner.url ? (
        <a href={partner.url} target="_blank" rel="noopener noreferrer sponsored">
          {inner}
        </a>
      ) : (
        inner
      )}
      <figcaption className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-2">
        {t(partner.disclosure, locale)}
      </figcaption>
    </figure>
  );
}
