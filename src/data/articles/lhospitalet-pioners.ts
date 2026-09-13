import type { Article } from "@/types";

export const lhospitaletPioners: Article = {
  id: "lhospitalet-pioners",
  slug: "lhospitalet-pioners",
  title: { es: "L'Hospitalet Pioners: el club que puso a España en Europa", en: "L'Hospitalet Pioners: the club that put Spain on the European map" },
  subtitle: {
    es: "Fundados en 1988, seis veces campeones de liga y, según su propia historia, los primeros en ganar un trofeo internacional.",
    en: "Founded in 1988, six-time league champions and, by their own account, the first to win an international trophy.",
  },
  excerpt: {
    es: "Uno de los cuatro clubes fundadores del football catalán, dominador de la LNFA entre 2010 y 2013 y referencia del deporte en el área de Barcelona.",
    en: "One of the four founding clubs of Catalan football, LNFA dominator between 2010 and 2013 and a reference for the sport around Barcelona.",
  },
  authorId: "jordi-sanchez",
  category: "equipos",
  tags: ["L'Hospitalet Pioners", "Cataluña", "LNFA"],
  relatedTeamIds: ["lhospitalet-pioners"],
  relatedCompetitionIds: ["lnfa", "copa-espana", "lnfa-femenina"],
  availableLocales: ["es", "en"],
  publishedAt: "2026-09-12",
  updatedAt: "2026-09-12",
  status: "researching",
  verificationStatus: "partial",
  lastVerifiedAt: "2026-09-12",
  readingTimeMinutes: 4,
  sourceIds: ["pioners-historia", "pioners-informacion", "fcfa-historia", "fefa-palmares", "fefa-team-pioners"],
  content: [
    {
      type: "paragraph",
      text: {
        es: "Los Pioners nacieron en 1988 en L'Hospitalet de Llobregat. Su primer presidente, Juan Jiménez, fue también su primer quarterback, y el club terminó tercero en la primera competición oficial de España aquel mismo año. [[src:pioners-historia]] Junto a Dracs, Búfals y Boxers, constituyó la Federació Catalana el 23 de octubre de 1988. [[src:fcfa-historia]]",
        en: "The Pioners were born in 1988 in L'Hospitalet de Llobregat. Their first president, Juan Jiménez, was also their first quarterback, and the club finished third in Spain's first official competition that same year. [[src:pioners-historia]] Together with Dracs, Búfals and Boxers, it constituted the Catalan federation on 23 October 1988. [[src:fcfa-historia]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "La FEFA les reconoce seis títulos de LNFA (2005, 2008, 2010, 2011, 2012 y 2013) y nueve Copas de España, la cifra más alta de la competición. [[src:fefa-palmares]] El club afirma haber sido el primer equipo español en ganar un trofeo internacional, el Etnabowl de 1996 en Italia, un dato que por ahora solo consta en su web. [[src:pioners-historia]]",
        en: "FEFA credits them with six LNFA titles (2005, 2008, 2010, 2011, 2012 and 2013) and nine Copas de España, the most in the competition. [[src:fefa-palmares]] The club states it was the first Spanish team to win an international trophy, the 1996 Etnabowl in Italy, a claim that for now appears only on its website. [[src:pioners-historia]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "Hoy juegan en el Complex Esportiu L'Hospitalet Nord y mantienen equipos senior masculino y femenino, flag y categorías inferiores hasta sub-11. [[src:pioners-informacion]] [[src:fefa-team-pioners]]",
        en: "Today they play at the Complex Esportiu L'Hospitalet Nord and run senior men's and women's teams, flag and youth categories down to under-11. [[src:pioners-informacion]] [[src:fefa-team-pioners]]",
      },
    },
    {
      type: "placeholder",
      topic: { es: "La era dorada (2005-2013) y Europa", en: "The golden era (2005-2013) and Europe" },
      pending: [
        { es: "Confirmar el Etnabowl de 1996 y las participaciones europeas con fuentes independientes", en: "Confirm the 1996 Etnabowl and European appearances with independent sources" },
        { es: "Entrevista con dirigentes y jugadores de la etapa 2010-2013", en: "Interview with officials and players from the 2010-2013 period" },
      ],
    },
  ],
};
