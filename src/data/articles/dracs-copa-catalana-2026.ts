import type { Article } from "@/types";

const FCFA = "[[src:fcfa-copa-catalana-2026-27]]";
const IG = "[[src:ig-final-copa-catalana-2026]]";
const FEFA = "[[src:fefa-copa-espana-2026-previa]]";

/**
 * Short news piece. The federation has published the score but no match
 * report, so there are no scorers or quarter scores here: add them, with
 * their source, when a report appears.
 */
export const dracsCopaCatalana2026: Article = {
  id: "dracs-copa-catalana-2026",
  slug: "badalona-dracs-copa-catalana-2026-terrassa-reds",
  title: {
    es: "Los Dracs ganan su 16.ª Copa Catalana, y esta vez por solo cinco puntos",
    en: "The Dracs win their 16th Copa Catalana, this time by only five points",
  },
  subtitle: {
    es: "Badalona venció 22-17 a los Terrassa Reds en la final. Es la más ajustada de las cuatro que han jugado, y el 19 de diciembre defiende en casa la Copa de España.",
    en: "Badalona beat the Terrassa Reds 22-17 in the final. It is the closest of the four they have played, and on 19 December they defend the Copa de España at home.",
  },
  excerpt: {
    es: "Badalona Dracs 22-17 Terrassa Reds en la final de la Copa Catalana 2026. Los Reds, que habían perdido las tres finales anteriores por 46-0, 32-0 y 45-27, se quedaron a cinco puntos.",
    en: "Badalona Dracs 22-17 Terrassa Reds in the 2026 Copa Catalana final. The Reds, who had lost the three previous finals 46-0, 32-0 and 45-27, came within five points.",
  },
  seo: {
    title: {
      es: "Badalona Dracs 22-17 Terrassa Reds: final de la Copa Catalana 2026",
      en: "Badalona Dracs 22-17 Terrassa Reds: 2026 Copa Catalana final",
    },
    description: {
      es: "Los Badalona Dracs ganan la Copa Catalana 2026 al vencer 22-17 a los Terrassa Reds. Es su 16.º título y la final más ajustada entre ambos. Próxima cita: final de la Copa de España.",
      en: "The Badalona Dracs win the 2026 Copa Catalana, beating the Terrassa Reds 22-17. It is their 16th title and the closest final between the two. Next: the Copa de España final.",
    },
  },
  authorId: "jordi-sanchez",
  category: "competiciones",
  tags: ["Badalona Dracs", "Terrassa Reds", "Copa Catalana", "FCFA", "Copa de España", "2026"],
  relatedTeamIds: ["badalona-dracs", "terrassa-reds"],
  relatedCompetitionIds: ["copa-espana"],
  availableLocales: ["es", "en"],
  publishedAt: "2026-11-22",
  updatedAt: "2026-11-22",
  status: "published",
  verificationStatus: "verified",
  lastVerifiedAt: "2026-11-22",
  readingTimeMinutes: 3,
  sourceIds: [
    "fcfa-copa-catalana-2026-27",
    "fcfa-copa-catalana-2025-26",
    "fcfa-final-copa-catalana-2024-previa",
    "monterrassa-final-copa-catalana-2024",
    "ig-final-copa-catalana-2026",
    "fefa-copa-espana-2026-previa",
    "fefa-ficha-dracs-2026-11",
  ],
  content: [
    {
      type: "callout",
      title: { es: "Lo esencial", en: "The essentials" },
      text: {
        es: `Los Badalona Dracs ganaron la Copa Catalana el sábado 21 de noviembre al vencer 22-17 a los Terrassa Reds en la final, jugada en Montigalà. ${FCFA} ${IG} Es su 16.º título en la competición: la federación catalana les contaba 15 tras la edición de 2025. ${FCFA}`,
        en: `The Badalona Dracs won the Copa Catalana on Saturday 21 November, beating the Terrassa Reds 22-17 in the final, played at Montigalà. ${FCFA} ${IG} It is their 16th title in the competition: the Catalan federation credited them with 15 after the 2025 edition. ${FCFA}`,
      },
    },
    { type: "score", teamA: "Badalona Dracs", scoreA: 22, teamB: "Terrassa Reds", scoreB: 17, status: { es: "Final · 21-11-2026 · Copa Catalana", en: "Final · 21 Nov 2026 · Copa Catalana" } },

    { type: "heading", level: 2, id: "la-mas-ajustada", text: { es: "La final más ajustada entre los dos", en: "The closest final between the two" } },
    {
      type: "paragraph",
      text: {
        es: `Dracs y Reds se han encontrado en cuatro finales de la Copa Catalana, todas ganadas por Badalona, y nunca habían estado tan cerca. ${FCFA}`,
        en: `The Dracs and the Reds have met in four Copa Catalana finals, all won by Badalona, and they had never been this close. ${FCFA}`,
      },
    },
    {
      type: "list",
      items: [
        { es: "2021: Dracs 46-0 Reds. [[src:fcfa-final-copa-catalana-2024-previa]]", en: "2021: Dracs 46-0 Reds. [[src:fcfa-final-copa-catalana-2024-previa]]" },
        { es: "2024: Dracs 32-0 Reds. [[src:monterrassa-final-copa-catalana-2024]]", en: "2024: Dracs 32-0 Reds. [[src:monterrassa-final-copa-catalana-2024]]" },
        { es: "2025: Dracs 45-27 Reds. [[src:fcfa-copa-catalana-2025-26]]", en: "2025: Dracs 45-27 Reds. [[src:fcfa-copa-catalana-2025-26]]" },
        { es: `2026: Dracs 22-17 Reds. ${FCFA}`, en: `2026: Dracs 22-17 Reds. ${FCFA}` },
      ],
    },
    {
      type: "paragraph",
      text: {
        es: `Los Dracs no pierden esta competición desde 2010. [[src:fcfa-final-copa-catalana-2024-previa]] ${FCFA} Los Reds siguen sin estrenar su palmarés, pero han pasado de no anotar en sus dos primeras finales a perder por cinco puntos. La federación todavía no ha publicado la crónica del partido, así que aún no hay anotadores ni parciales confirmados; los añadiremos cuando se publiquen.`,
        en: `The Dracs have not lost this competition since 2010. [[src:fcfa-final-copa-catalana-2024-previa]] ${FCFA} The Reds are still waiting for their first title, but they have gone from failing to score in their first two finals to losing by five points. The federation has not yet published a match report, so there are no confirmed scorers or quarter scores; we will add them when they are published.`,
      },
    },

    { type: "heading", level: 2, id: "copa-de-espana", text: { es: "Lo siguiente: la final de la Copa de España", en: "Next: the Copa de España final" } },
    {
      type: "paragraph",
      text: {
        es: `Los [[link:teams/badalona-dracs|Dracs]] tienen otro título en juego antes de que empiece la liga. Son los campeones vigentes de la [[link:competitions/copa-de-espana|Copa de España]], que ganaron la temporada pasada con un 40-0 a L'Hospitalet Pioners, y este año esperan directamente en la final: el 19 de diciembre en el Municipal de Montigalà. ${FEFA}`,
        en: `The [[link:teams/badalona-dracs|Dracs]] have another title at stake before the league starts. They are the holders of the [[link:competitions/copa-de-espana|Copa de España]], which they won last season with a 40-0 over L'Hospitalet Pioners, and this year they go straight to the final: 19 December at the Municipal de Montigalà. ${FEFA}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `El rival sale de la única semifinal, que jugaron este domingo 22 de noviembre en Santiago de Compostela los Black Ravens y los Mallorca Voltors. ${FEFA} La FEFA no ha publicado todavía el resultado, pero su calendario ya lista la final como Badalona Dracs - Mallorca Voltors, a las 19:00. [[src:fefa-ficha-dracs-2026-11]] Los Dracs suman ocho Copas de España, una menos que Pioners, el club con más títulos. ${FEFA}`,
        en: `Their opponents come from the only semi-final, played this Sunday 22 November in Santiago de Compostela between the Black Ravens and the Mallorca Voltors. ${FEFA} FEFA has not yet published the result, but its calendar already lists the final as Badalona Dracs v Mallorca Voltors, at 19:00. [[src:fefa-ficha-dracs-2026-11]] The Dracs have eight Copa de España titles, one fewer than Pioners, the most successful club. ${FEFA}`,
      },
    },
  ],
};
