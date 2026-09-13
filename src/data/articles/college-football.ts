import type { Article } from "@/types";

export const collegeFootball: Article = {
  id: "que-es-el-college-football",
  slug: "que-es-el-college-football",
  title: { es: "¿Qué es el college football? Una guía desde España", en: "What is college football? A guide from Spain" },
  subtitle: {
    es: "Por qué universidades llenan estadios de cien mil personas, qué es la NCAA y en qué se diferencia de la NFL y de la liga española.",
    en: "Why universities fill hundred-thousand-seat stadiums, what the NCAA is and how it differs from the NFL and the Spanish league.",
  },
  excerpt: {
    es: "Antes de viajar a Annapolis, una explicación honesta de cómo funciona el football universitario estadounidense para quien lo sigue desde Europa.",
    en: "Before travelling to Annapolis, an honest explanation of how American college football works for anyone following it from Europe.",
  },
  authorId: "jordi-sanchez",
  category: "ncaa",
  tags: ["NCAA", "college football", "guía", "Navy"],
  relatedTeamIds: [],
  relatedCompetitionIds: ["ncaa-fbs", "lnfa"],
  availableLocales: ["es", "en"],
  publishedAt: "2026-09-12",
  updatedAt: "2026-09-12",
  status: "researching",
  verificationStatus: "partial",
  lastVerifiedAt: "2026-09-12",
  readingTimeMinutes: 6,
  sourceIds: ["navy-history", "army-first-game", "westpoint-rivalry", "navy-stadium", "navy-towson-notes-2026", "american-conference-brand-2025", "fefa-calendario-2026-27"],
  content: [
    {
      type: "paragraph",
      text: {
        es: "En Estados Unidos el fútbol americano no empezó como deporte profesional sino universitario. El programa de la Academia Naval, por ejemplo, disputó su primer partido el 11 de diciembre de 1879, [[src:navy-history]] y el primer Army-Navy se jugó el 29 de noviembre de 1890 en West Point. [[src:army-first-game]] Décadas antes de que existiera la NFL, las universidades ya tenían rivalidades, himnos y estadios.",
        en: "In the United States, American football did not start as a professional sport but as a college one. The Naval Academy program, for instance, played its first game on 11 December 1879, [[src:navy-history]] and the first Army-Navy Game was played on 29 November 1890 at West Point. [[src:army-first-game]] Decades before the NFL existed, universities already had rivalries, anthems and stadiums.",
      },
    },
    {
      type: "heading",
      level: 2,
      text: { es: "Quién organiza qué", en: "Who runs what" },
    },
    {
      type: "paragraph",
      text: {
        es: "La NCAA agrupa a las universidades y su máximo nivel de football es la División I FBS, dividida en conferencias. Navy compite en la American Conference, que hasta julio de 2025 se llamaba American Athletic Conference. [[src:american-conference-brand-2025]] Los jugadores son estudiantes; en Navy, además, guardiamarinas que se graduarán como oficiales.",
        en: "The NCAA groups the universities and its top football level is Division I FBS, divided into conferences. Navy competes in the American Conference, known until July 2025 as the American Athletic Conference. [[src:american-conference-brand-2025]] The players are students; at Navy, they are also midshipmen who will graduate as officers.",
      },
    },
    {
      type: "placeholder",
      topic: { es: "Cómo funciona una temporada: calendario, playoffs, bowls", en: "How a season works: schedule, playoffs, bowls" },
      pending: [
        { es: "Formato del College Football Playoff en 2026 (fuente oficial NCAA/CFP)", en: "College Football Playoff format in 2026 (official NCAA/CFP source)" },
        { es: "Cómo se decide qué equipos juegan bowls", en: "How bowl participants are decided" },
      ],
    },
    {
      type: "heading",
      level: 2,
      text: { es: "Qué lo hace distinto", en: "What makes it different" },
    },
    {
      type: "paragraph",
      text: {
        es: "Un partido en casa de Navy incluye la entrada en formación de la Brigada de Guardiamarinas, un sobrevuelo militar tras el himno y, al final, el equipo cuadrado ante la Brigada mientras suena el alma mater. [[src:navy-towson-notes-2026]] El Navy-Marine Corps Memorial Stadium, inaugurado para la temporada de 1959, tiene capacidad para 34.000 personas. [[src:navy-stadium]] [[src:navy-towson-notes-2026]] Para comparar: la LNFA española se juega en campos municipales y su final de 2027 está prevista para el 22 de mayo. [[src:fefa-calendario-2026-27]]",
        en: "A Navy home game includes the Brigade of Midshipmen marching onto the field, a military flyover after the anthem and, at the end, the team standing before the Brigade while the alma mater plays. [[src:navy-towson-notes-2026]] Navy-Marine Corps Memorial Stadium, built for the 1959 season, holds 34,000 people. [[src:navy-stadium]] [[src:navy-towson-notes-2026]] For comparison: Spain's LNFA is played on municipal fields and its 2027 final is scheduled for 22 May. [[src:fefa-calendario-2026-27]]",
      },
    },
    {
      type: "placeholder",
      topic: { es: "Tradiciones, bandas y tailgating", en: "Traditions, bands and tailgating" },
      pending: [
        { es: "Documentar con fuentes oficiales de cada universidad, no con generalidades", en: "Document with each university's official sources, not generalities" },
      ],
    },
  ],
};
