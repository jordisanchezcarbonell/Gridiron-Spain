import type { Article } from "@/types";

const NCAA = "[[src:espn-cfb-scoreboard-2026-10-31]] [[src:cbs-cfb-scoreboard-2026-10-31]]";
const NFL = "[[src:espn-nfl-scoreboard-2026-week-8]] [[src:cbs-nfl-scoreboard-2026-week-8]]";
const AP = "[[src:espn-cfb-rankings-week10-2026]] [[src:cbs-ap-poll-week10-2026]]";
const CFP = "[[src:espn-cfp-first-rankings-2026]]";

export const finde20261031: Article = {
  id: "finde-2026-10-31",
  slug: "lo-mas-importante-semana-nfl-college-2026-11-05",
  title: {
    es: "Lo más importante de la semana: la NFL llega a Madrid, Lamar Jackson se lesiona y Miami lidera el CFP",
    en: "The week's biggest stories: the NFL reaches Madrid, Lamar Jackson is hurt and Miami top the CFP",
  },
  subtitle: {
    es: "Burrow y Penix llegan al Bernabéu en direcciones opuestas, Baltimore se queda sin sus dos quarterbacks y el primer ranking del playoff universitario abre la polémica.",
    en: "Burrow and Penix reach the Bernabéu heading in opposite directions, Baltimore lose their top two quarterbacks and the first college playoff ranking sparks debate.",
  },
  excerpt: {
    es: "Del 29 de octubre al 5 de noviembre: Bengals y Falcons a tres días de Madrid, la lesión de Lamar Jackson, el primer ranking del CFP, la caída de Ohio State y el despido de Mike Norvell. Marcadores contrastados en ESPN y CBS.",
    en: "29 October to 5 November: the Bengals and Falcons three days out from Madrid, Lamar Jackson's injury, the first CFP ranking, Ohio State's fall and Mike Norvell's firing. Scores confirmed on ESPN and CBS.",
  },
  seo: {
    title: {
      es: "NFL y college: lo más importante de la semana (5 de noviembre)",
      en: "NFL and college football: the week's biggest stories (5 November)",
    },
    description: {
      es: "Falcons–Bengals en Madrid, la lesión de Lamar Jackson, Miami n.º 1 en el primer ranking del CFP y USC tumba a Ohio State. El resumen de la semana, con fuentes.",
      en: "Falcons–Bengals in Madrid, Lamar Jackson's injury, Miami No. 1 in the first CFP ranking and USC topple Ohio State. The week in review, with sources.",
    },
  },
  heroImage: {
    url: "/images/editorial/college-football-stadium.png",
    alt: { es: "Estadio universitario lleno durante un partido de fútbol americano al atardecer. Imagen editorial genérica.", en: "A full college stadium during an American football game at dusk. Generic editorial image." },
    width: 1672,
    height: 941,
    photographer: "Gridiron Spain · imagen editorial generada",
    license: "Uso editorial de Gridiron Spain",
  },
  authorId: "jordi-sanchez",
  category: "nfl",
  tags: ["NFL", "NCAA", "Resultados", "NFL Madrid", "Bengals", "Falcons", "Ravens", "CFP", "2026"],
  relatedTeamIds: [],
  relatedCompetitionIds: ["nfl", "ncaa-fbs"],
  availableLocales: ["es", "en"],
  publishedAt: "2026-11-05",
  updatedAt: "2026-11-05",
  status: "published",
  verificationStatus: "verified",
  lastVerifiedAt: "2026-11-05",
  readingTimeMinutes: 7,
  sourceIds: [
    "espn-nfl-scoreboard-2026-week-8", "cbs-nfl-scoreboard-2026-week-8",
    "bengals-titans-recap-2026", "espn-bucs-falcons-no-completion-2026", "nfl-bucs-zero-completion-2026",
    "falcons-bucs-breakdown-2026", "broncos-chiefs-cover4-2026",
    "ap-penix-stefanski-2026", "ajc-falcons-branch-ebukam-2026", "bengals-injury-report-week-9-2026", "bengals-quick-hits-madrid-2026",
    "ravens-lamar-thumb-2026", "ap-lamar-surgery-2026", "espn-fagnano-start-2026", "nfl-fagnano-start-2026",
    "nfl-roundup-2026-11-04", "cbs-trade-tracker-2026", "nbc-trade-tracker-2026", "yahoo-bears-seahawks-2026",
    "espn-cfb-scoreboard-2026-10-31", "cbs-cfb-scoreboard-2026-10-31",
    "espn-usc-ohio-state-2026", "usc-ohio-state-recap-2026", "notre-dame-navy-recap-2026",
    "espn-cfb-rankings-week10-2026", "cbs-ap-poll-week10-2026",
    "espn-cfp-first-rankings-2026", "s247-yurachek-miami-2026", "si-cfp-three-things-2026", "nbc-cfp-reaction-2026",
    "espn-cfb-coaching-carousel-2026", "wctv-fsu-norvell-2026",
  ],
  content: [
    {
      type: "paragraph",
      text: {
        es: "La NFL ya está en Madrid. A tres días del Falcons–Bengals del Bernabéu, la semana deja además a uno de los grandes quarterbacks de la liga pendiente de cirugía, un primer ranking del playoff universitario que no ha convencido a todos y un entrenador despedido con una factura millonaria. Esto es lo que hay que saber.",
        en: "The NFL has arrived in Madrid. Three days before Falcons–Bengals at the Bernabéu, the week has also left one of the league's great quarterbacks facing surgery, a first college playoff ranking that has not convinced everyone and a head coach fired at a huge cost. Here is what you need to know.",
      },
    },

    {
      type: "heading",
      level: 2,
      id: "madrid",
      text: { es: "Madrid: Burrow llega lanzado, Penix busca redimirse", en: "Madrid: Burrow arrives flying, Penix seeks redemption" },
    },
    {
      type: "paragraph",
      text: {
        es: `Los Bengals (5-2) ganaron 43-36 a los Titans en la prórroga, y Joe Burrow entró corriendo desde la 9 para el touchdown de la victoria. Completó 38 de 48 pases para 462 yardas y cinco touchdowns, y es el segundo jugador de la historia de la NFL que suma al menos 450 yardas, cinco touchdowns de pase y uno de carrera en un mismo partido. Tee Higgins (155 yardas) y Ja'Marr Chase (141) pasaron los dos de las cien. Cincinnati llega con tres victorias seguidas. ${NFL} [[src:bengals-titans-recap-2026]]`,
        en: `The Bengals (5-2) beat the Titans 43-36 in overtime, with Joe Burrow running in from the 9 for the winning touchdown. He went 38 of 48 for 462 yards and five touchdowns, and became only the second player in NFL history with at least 450 passing yards, five passing touchdowns and a rushing touchdown in one game. Tee Higgins (155 yards) and Ja'Marr Chase (141) both topped 100. Cincinnati arrive on a three-game winning streak. ${NFL} [[src:bengals-titans-recap-2026]]`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Los Falcons (3-5) perdieron 16-0 en Tampa bajo una lluvia intensa. Michael Penix Jr. completó 8 de 24 pases para 125 yardas y lanzó cuatro intercepciones, después de 144 pases seguidos sin ninguna, mientras Bijan Robinson, líder de la NFL en yardas de carrera, solo tuvo 19 carreras. Los Buccaneers ni siquiera necesitaron pasar: Baker Mayfield falló sus tres intentos y Tampa Bay ganó con 324 yardas de carrera, récord del club. Es el primer equipo que gana sin completar un pase desde los Bills de 1974. Kevin Stefanski salió en defensa de su quarterback: «¿Puede Mike jugar mejor? Claro, él lo sabe y jugará mejor». ${NFL} [[src:espn-bucs-falcons-no-completion-2026]] [[src:nfl-bucs-zero-completion-2026]] [[src:falcons-bucs-breakdown-2026]] [[src:ap-penix-stefanski-2026]]`,
        en: `The Falcons (3-5) lost 16-0 in Tampa in driving rain. Michael Penix Jr. went 8 of 24 for 125 yards with four interceptions, after 144 straight passes without one, while Bijan Robinson, the NFL's leading rusher, got only 19 carries. The Buccaneers did not even need to pass: Baker Mayfield missed all three attempts and Tampa Bay won with 324 rushing yards, a club record. They are the first team to win without a completion since the 1974 Bills. Kevin Stefanski stood by his quarterback: "Can Mike play better? Of course, and he knows that and he will play better." ${NFL} [[src:espn-bucs-falcons-no-completion-2026]] [[src:nfl-bucs-zero-completion-2026]] [[src:falcons-bucs-breakdown-2026]] [[src:ap-penix-stefanski-2026]]`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: "En la enfermería, Atlanta no tendrá al receptor Zachariah Branch ni al defensive end Samson Ebukam, los dos con problemas en el isquiotibial, pero recupera a James Pearce Jr., que jugará por primera vez esta temporada tras ocho partidos de sanción. [[src:ajc-falcons-branch-ebukam-2026]] Burrow y Chase no aparecen en el parte de lesionados de los Bengals; el cornerback DJ Turner II, con molestias en el talón, ya entrenó sin limitaciones el jueves en la Ciudad del Fútbol de Las Rozas, la sede de la selección española. [[src:bengals-injury-report-week-9-2026]] [[src:bengals-quick-hits-madrid-2026]]",
        en: "On the injury front, Atlanta will be without receiver Zachariah Branch and defensive end Samson Ebukam, both with hamstring problems, but get back James Pearce Jr., who will play for the first time this season after an eight-game suspension. [[src:ajc-falcons-branch-ebukam-2026]] Burrow and Chase are not on the Bengals' injury report; cornerback DJ Turner II, who has a heel problem, was a full participant on Thursday at the Ciudad del Fútbol in Las Rozas, the Spanish national team's base. [[src:bengals-injury-report-week-9-2026]] [[src:bengals-quick-hits-madrid-2026]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "El partido es el domingo 8 de noviembre a las 15:30. Televisión, entradas y cómo llegar al estadio, en nuestra [[link:articles/nfl-madrid-2026-falcons-bengals-guia|guía del partido]].",
        en: "The game is on Sunday 8 November at 3:30 pm Spanish time. TV, tickets and getting to the stadium are in our [[link:articles/nfl-madrid-2026-falcons-bengals-guia|game guide]].",
      },
    },

    {
      type: "heading",
      level: 2,
      id: "lamar",
      text: { es: "Lamar Jackson duró una jugada y Baltimore busca quarterback", en: "Lamar Jackson lasted one play and Baltimore need a quarterback" },
    },
    {
      type: "paragraph",
      text: {
        es: `Jackson volvía tras perderse tres partidos por una lesión de tobillo y se hizo daño en el pulgar derecho en la primera jugada ofensiva ante los Bills, al chocar su mano con Greg Rousseau mientras lanzaba. Lo operarán e irá a la lista de lesionados. Al preguntarle si puede ser el final de su temporada, su entrenador, Jesse Minter, respondió: «Potencialmente». Tyler Huntley, su sustituto, también se lesionó, y el novato no drafteado Joe Fagnano debutó en un 36-10 que deja a los Ravens 4-4 y con tres derrotas seguidas: 10 de 21 pases para 91 yardas, una intercepción y un balón perdido. ${NFL} [[src:ravens-lamar-thumb-2026]] [[src:ap-lamar-surgery-2026]]`,
        en: `Jackson was back after missing three games with an ankle injury and hurt his right thumb on the first offensive snap against the Bills, when his hand hit Greg Rousseau as he threw. He will have surgery and go on injured reserve. Asked whether it could end his season, head coach Jesse Minter said: "Potentially." His replacement Tyler Huntley was hurt too, and undrafted rookie Joe Fagnano made his debut in a 36-10 defeat that leaves the Ravens 4-4 after three straight losses: 10 of 21 for 91 yards, an interception and a lost fumble. ${NFL} [[src:ravens-lamar-thumb-2026]] [[src:ap-lamar-surgery-2026]]`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: "Fagnano será titular contra los Jaguars en el Thursday Night, en la madrugada del viernes en España (02:15), y es el segundo quarterback novato no drafteado que empieza un partido con los Ravens. [[src:espn-fagnano-start-2026]] [[src:nfl-fagnano-start-2026]] Según Adam Schefter (ESPN) e Ian Rapoport (NFL Network), Huntley se pierde el resto de la temporada y Baltimore ha acordado el traspaso de Jacoby Brissett desde Arizona. Ninguno de los dos extremos es oficial a estas alturas: la operación se cerraría este fin de semana y no se conoce la compensación. [[src:nfl-roundup-2026-11-04]] [[src:cbs-trade-tracker-2026]]",
        en: "Fagnano will start against the Jaguars on Thursday Night Football, 2:15 am on Friday in Spain, and is only the second undrafted rookie quarterback to start for the Ravens. [[src:espn-fagnano-start-2026]] [[src:nfl-fagnano-start-2026]] According to Adam Schefter (ESPN) and Ian Rapoport (NFL Network), Huntley will miss the rest of the season and Baltimore have agreed to trade for Arizona's Jacoby Brissett. Neither is official at this point: the deal is expected to be completed this weekend and the compensation is not known. [[src:nfl-roundup-2026-11-04]] [[src:cbs-trade-tracker-2026]]",
      },
    },

    {
      type: "heading",
      level: 2,
      id: "nfl",
      text: { es: "El resto de la NFL: Chicago golpea en Seattle y Denver remonta a los Chiefs", en: "Around the NFL: Chicago land a blow in Seattle and Denver rally past the Chiefs" },
    },
    {
      type: "paragraph",
      text: {
        es: `Los Bears cerraron la jornada ganando 34-17 en Seattle al vigente campeón de la Super Bowl en el Monday Night. D'Andre Swift anotó tres touchdowns de carrera y Jeffery Simmons debutó con seis placajes y un sack, solo cuatro días después de que Chicago lo traspasara desde Tennessee a cambio de dos primeras rondas (2027 y 2028) y una cuarta. Los Bears van 6-2 y los Seahawks, 4-4; Sam Darnold no jugará el domingo contra Arizona. ${NFL} [[src:yahoo-bears-seahawks-2026]] [[src:cbs-trade-tracker-2026]] [[src:nfl-roundup-2026-11-04]]`,
        en: `The Bears closed the week by winning 34-17 in Seattle against the reigning Super Bowl champions on Monday Night. D'Andre Swift ran for three touchdowns and Jeffery Simmons debuted with six tackles and a sack, just four days after Chicago acquired him from Tennessee for two first-round picks (2027 and 2028) and a fourth. The Bears are 6-2 and the Seahawks 4-4; Sam Darnold will not play on Sunday against Arizona. ${NFL} [[src:yahoo-bears-seahawks-2026]] [[src:cbs-trade-tracker-2026]] [[src:nfl-roundup-2026-11-04]]`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Los Chiefs ganaban 24-13 en el último cuarto en Denver y perdieron 28-24. Bo Nix lanzó dos pases de touchdown en cuarto down y Malcolm Roach cerró el partido con una captura a Patrick Mahomes en cuarto y gol desde la yarda 6. Los Broncos (6-2) suman cuatro victorias seguidas y lideran la AFC Oeste por primera vez esta temporada. ${NFL} [[src:broncos-chiefs-cover4-2026]]`,
        en: `The Chiefs led 24-13 in the fourth quarter in Denver and lost 28-24. Bo Nix threw two fourth-down touchdown passes and Malcolm Roach ended it by sacking Patrick Mahomes on fourth-and-goal from the 6. The Broncos (6-2) have won four straight and lead the AFC West for the first time this season. ${NFL} [[src:broncos-chiefs-cover4-2026]]`,
      },
    },
    {
      type: "list",
      items: [
        { es: "Lions 19 — Vikings 15: primera derrota de Minnesota (6-1).", en: "Lions 19 — Vikings 15: Minnesota's first loss (6-1)." },
        { es: "Steelers 27 — Browns 6. Pittsburgh, 6-2.", en: "Steelers 27 — Browns 6. Pittsburgh, 6-2." },
        { es: "Jaguars 42 — Colts 7.", en: "Jaguars 42 — Colts 7." },
        { es: "Cardinals 33 — Cowboys 30, en la prórroga.", en: "Cardinals 33 — Cowboys 30, in overtime." },
        { es: "Raiders 38 — Jets 33.", en: "Raiders 38 — Jets 33." },
        { es: "Patriots 24 — Dolphins 19.", en: "Patriots 24 — Dolphins 19." },
        { es: "Rams 24 — Chargers 9. Los Chargers siguen sin ganar (0-7).", en: "Rams 24 — Chargers 9. The Chargers are still winless (0-7)." },
        { es: "Commanders 27 — Eagles 10. Philadelphia cae a 2-6 y, según Mike Garafolo y Schefter, Joe Milton III sustituirá a Tanner McKee como titular. [[src:nfl-roundup-2026-11-04]]", en: "Commanders 27 — Eagles 10. Philadelphia fall to 2-6 and, according to Mike Garafolo and Schefter, Joe Milton III will replace Tanner McKee as starter. [[src:nfl-roundup-2026-11-04]]" },
        { es: "Packers 27 — Panthers 19, el jueves. Micah Parsons volvió a entrenarse, con limitaciones, por primera vez desde su lesión de rodilla de diciembre de 2025. [[src:nfl-roundup-2026-11-04]]", en: "Packers 27 — Panthers 19, on Thursday. Micah Parsons returned to practice, on a limited basis, for the first time since his December 2025 knee injury. [[src:nfl-roundup-2026-11-04]]" },
      ],
    },
    {
      type: "paragraph",
      text: {
        es: `Y queda mercado: la fecha límite de traspasos es el martes 10 de noviembre a las 22:00, hora de España. ${NFL} [[src:nfl-roundup-2026-11-04]] [[src:nbc-trade-tracker-2026]]`,
        en: `And the market is still open: the trade deadline is Tuesday 10 November at 10 pm Spanish time. ${NFL} [[src:nfl-roundup-2026-11-04]] [[src:nbc-trade-tracker-2026]]`,
      },
    },

    {
      type: "heading",
      level: 2,
      id: "cfp",
      text: { es: "College: Miami, n.º 1 en un ranking que abre el debate", en: "College: Miami No. 1 in a ranking that opens the debate" },
    },
    {
      type: "paragraph",
      text: {
        es: `El comité del College Football Playoff publicó el martes su primer ranking: Miami, Georgia, Utah e Indiana ocupan los cuatro primeros puestos, seguidos de Alabama, Kentucky, Texas, UCLA, BYU, Ole Miss, Notre Dame y Ohio State. Es la primera vez que Miami (8-0) es n.º 1 en esta clasificación y el presidente del comité, Hunter Yurachek, dijo que la decisión fue unánime. ${CFP} [[src:s247-yurachek-miami-2026]]`,
        en: `The College Football Playoff committee released its first ranking on Tuesday: Miami, Georgia, Utah and Indiana fill the top four, followed by Alabama, Kentucky, Texas, UCLA, BYU, Ole Miss, Notre Dame and Ohio State. It is the first time Miami (8-0) have been No. 1 in these rankings, and committee chair Hunter Yurachek said the decision was unanimous. ${CFP} [[src:s247-yurachek-miami-2026]]`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `La discusión está más abajo. Notre Dame es 4.ª en la encuesta AP y 11.ª para el comité, porque, según Yurachek, «no tiene esa victoria de prestigio ahora mismo». Indiana, 4.ª, tampoco ha ganado a nadie del top 25. Y Alabama es 5.ª, ocho puestos por delante de una Tennessee que le ganó 26-10. El ranking no es definitivo: la clasificación final se conoce el 6 de diciembre, y si hoy se repartieran las plazas, Boise State entraría como mejor campeón de fuera de las grandes conferencias y dejaría sin sitio a Ohio State. ${CFP} ${AP} [[src:si-cfp-three-things-2026]] [[src:nbc-cfp-reaction-2026]]`,
        en: `The argument is further down. Notre Dame are 4th in the AP poll and 11th for the committee because, according to Yurachek, they "don't have that signature win right now". Indiana, in 4th, have not beaten a top-25 team either. And Alabama are 5th, eight places ahead of a Tennessee side that beat them 26-10. None of this is final: the final ranking comes on 6 December, and if places were awarded today Boise State would get in as the best champion from outside the major conferences, leaving Ohio State without a spot. ${CFP} ${AP} [[src:si-cfp-three-things-2026]] [[src:nbc-cfp-reaction-2026]]`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Ese debate se juega en el campo este sábado: Notre Dame recibe a Miami en South Bend a las 19:30, hora de la costa este, ya la madrugada del domingo en España (01:30). ${CFP} [[src:s247-yurachek-miami-2026]]`,
        en: `That debate moves to the field this Saturday: Notre Dame host Miami in South Bend at 7:30 pm Eastern, 1:30 am on Sunday in Spain. ${CFP} [[src:s247-yurachek-miami-2026]]`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `La gran sorpresa del sábado pasado llegó en el Coliseum: USC, sin clasificar, ganó 30-18 a Ohio State, entonces n.º 2 de la AP, que juega sin su quarterback titular, Julian Sayin, lesionado. Los Buckeyes cayeron al 11 de la AP y al 12 del comité, y USC es 18.ª y 20.ª. ${NCAA} ${AP} [[src:espn-usc-ohio-state-2026]] [[src:usc-ohio-state-recap-2026]] [[src:si-cfp-three-things-2026]] ${CFP}`,
        en: `Last Saturday's big shock came at the Coliseum: unranked USC beat Ohio State 30-18, then No. 2 in the AP poll and playing without injured starting quarterback Julian Sayin. The Buckeyes dropped to 11th in the AP and 12th with the committee, while USC are 18th and 20th. ${NCAA} ${AP} [[src:espn-usc-ohio-state-2026]] [[src:usc-ohio-state-recap-2026]] [[src:si-cfp-three-things-2026]] ${CFP}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Miami pasó apuros en North Carolina (38-35), Georgia ganó 27-8 a Florida e Indiana volvió a necesitar la prórroga para ganar 23-16 a Minnesota. Utah (49-25 a Cincinnati) y UCLA (27-0 a Nevada) siguen invictos, y Syracuse ganó 30-27 a la n.º 19 SMU, un partido que contamos [[link:articles/syracuse-sorprende-a-smu-2026|aquí]]. En Foxborough, Navy llegó a ganar 13-7 a Notre Dame antes de caer 35-13. ${NCAA} [[src:notre-dame-navy-recap-2026]]`,
        en: `Miami were pushed hard at North Carolina (38-35), Georgia beat Florida 27-8 and Indiana again needed overtime to beat Minnesota 23-16. Utah (49-25 over Cincinnati) and UCLA (27-0 over Nevada) stay unbeaten, and Syracuse beat No. 19 SMU 30-27, a game we covered [[link:articles/syracuse-sorprende-a-smu-2026|here]]. In Foxborough, Navy led Notre Dame 13-7 before losing 35-13. ${NCAA} [[src:notre-dame-navy-recap-2026]]`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Fuera del campo, Florida State despidió el domingo a Mike Norvell tras un 3-5 esta temporada. Se va con un balance de 41-39 en siete años, apenas tres después de un campeonato de la ACC con 13-0. Rick Stockstill será entrenador interino, y la emisora local WCTV calcula que la universidad le debe algo más de 46 millones de dólares. Es otra baja en un otoño de despidos: antes cayeron Mike Locksley (Maryland), Dave Doeren (NC State) y Dave Aranda (Baylor). [[src:espn-cfb-coaching-carousel-2026]] [[src:wctv-fsu-norvell-2026]]`,
        en: `Off the field, Florida State fired Mike Norvell on Sunday after a 3-5 start. He leaves with a 41-39 record over seven years, just three years after a 13-0 ACC title season. Rick Stockstill will be interim head coach, and local station WCTV calculates the school owes him just over $46 million. It is another casualty in an autumn of firings: Mike Locksley (Maryland), Dave Doeren (NC State) and Dave Aranda (Baylor) went before him. [[src:espn-cfb-coaching-carousel-2026]] [[src:wctv-fsu-norvell-2026]]`,
      },
    },
  ],
};
