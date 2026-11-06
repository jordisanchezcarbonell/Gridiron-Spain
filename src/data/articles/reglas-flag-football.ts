import type { Article } from "@/types";

export const reglasFlagFootball: Article = {
  id: "reglas-flag-football",
  slug: "reglas-flag-football",
  title: {
    es: "Reglas del flag football: guía para empezar a jugar sin contacto",
    en: "Flag football rules: a beginner's guide to playing without contact",
  },
  subtitle: {
    es: "Campo, downs, blitz, zona de no carrera y puntuación: el 5x5 explicado para principiantes a partir del reglamento que publica la FEFA.",
    en: "Field, downs, blitz, no-run zone and scoring: 5-on-5 explained for beginners from the rulebook published by FEFA, Spain's federation.",
  },
  excerpt: {
    es: "Sin casco, sin hombreras y sin un solo placaje: cinco contra cinco, cuatro downs para cruzar el medio campo y siete segundos para que el quarterback suelte el balón. Así se juega al flag football en España.",
    en: "No helmet, no shoulder pads and not a single tackle: five on five, four downs to cross midfield and seven seconds for the quarterback to get rid of the ball. This is how flag football is played in Spain.",
  },
  seo: {
    title: {
      es: "Reglas del flag football: guía para principiantes",
      en: "Flag football rules: a beginner's guide",
    },
    description: {
      es: "Campo, downs, blitz, zona de no carrera y puntuación: las reglas del flag football 5x5 explicadas para principiantes, según el reglamento de FEFA.",
      en: "Field, downs, blitz, no-run zone and scoring: 5-on-5 flag football rules explained for beginners, based on the rulebook of Spain's federation.",
    },
  },
  authorId: "jordi-sanchez",
  category: "competiciones",
  tags: ["flag football", "reglas", "FEFA", "IFAF", "NFL FLAG", "Spanish Flag Bowl", "guía"],
  relatedTeamIds: ["valencia-firebats", "zaragoza-hurricanes"],
  relatedCompetitionIds: ["spanish-flag-bowl"],
  availableLocales: ["es", "en"],
  publishedAt: "2026-11-06",
  updatedAt: "2026-11-06",
  status: "published",
  verificationStatus: "verified",
  lastVerifiedAt: "2026-11-06",
  readingTimeMinutes: 6,
  sourceIds: [
    "fefa-reglamento-flag-2023",
    "fefa-descargas-flag",
    "fefa-convocatoria-sfb-2026",
    "fefa-palmares-flag",
    "fefa-flag-bowl-2026",
    "fefa-flag-mundial-2026",
    "fefa-flag-mexico-2026",
    "infobae-knights-nfl-2026",
    "nfl-flag-rules-2025",
    "olympics-flag-faq-la28",
    "fcfa-historia",
  ],
  content: [
    {
      type: "paragraph",
      text: {
        es: "Sin casco, sin hombreras y sin un solo placaje: en el flag football, un tirón a una cinta vale tanto como un tackle en la NFL.",
        en: "No helmet, no shoulder pads and not a single tackle: in flag football, a pull on a strip of fabric does the job of a tackle in the NFL.",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "Si te apetece probarlo, las reglas básicas se aprenden en una tarde. Aquí van las del 5x5, la modalidad de la Spanish Flag Bowl, tal como aparecen en el reglamento oficial de flag que publica la FEFA, la edición 2023 de las reglas de IFAF. [[src:fefa-descargas-flag]] [[src:fefa-reglamento-flag-2023]] [[src:fefa-convocatoria-sfb-2026]]",
        en: "If you fancy trying it, the basics can be learned in an afternoon. These are the rules of 5-on-5, the format of the Spanish Flag Bowl, as set out in the official flag rulebook published by FEFA, the 2023 edition of the IFAF rules. [[src:fefa-descargas-flag]] [[src:fefa-reglamento-flag-2023]] [[src:fefa-convocatoria-sfb-2026]]",
      },
    },
    { type: "heading", level: 2, id: "que-es", text: { es: "Qué es el flag football", en: "What flag football is" } },
    {
      type: "paragraph",
      text: {
        es: "Es football sin contacto y muy orientado al pase. Cada jugador lleva dos flags en la cintura, y arrancar uno de ellos al corredor sustituye al placaje. [[src:fefa-reglamento-flag-2023]]",
        en: "It is non-contact football with a heavy lean towards the pass. Each player wears two flags at the waist, and pulling one off the ball carrier replaces the tackle. [[src:fefa-reglamento-flag-2023]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "El reglamento lo deja claro: no se puede bloquear, placar ni chutar. Eso significa que tampoco hay kickoff, punt ni field goal. [[src:fefa-reglamento-flag-2023]]",
        en: "The rulebook is clear: no blocking, tackling or kicking. That also means no kickoff, no punt and no field goal. [[src:fefa-reglamento-flag-2023]]",
      },
    },
    { type: "heading", level: 2, id: "cifras", text: { es: "El partido en cifras", en: "The game in numbers" } },
    {
      type: "list",
      items: [
        { es: "Jugadores: 5 contra 5, con un máximo de 15 en el roster. [[src:fefa-reglamento-flag-2023]]", en: "Players: 5 on 5, with a maximum of 15 on the roster. [[src:fefa-reglamento-flag-2023]]" },
        { es: "Campo: 50 x 25 yardas (unos 45,75 x 22,90 m). [[src:fefa-reglamento-flag-2023]] [[src:nfl-flag-rules-2025]]", en: "Field: 50 x 25 yards (about 45.75 x 22.90 m). [[src:fefa-reglamento-flag-2023]] [[src:nfl-flag-rules-2025]]" },
        { es: "End zones: 10 yardas cada una (9,15 m). [[src:fefa-reglamento-flag-2023]] [[src:nfl-flag-rules-2025]]", en: "End zones: 10 yards each (9.15 m). [[src:fefa-reglamento-flag-2023]] [[src:nfl-flag-rules-2025]]" },
        { es: "Duración: 2 mitades de 20 minutos, con 2 minutos de descanso. [[src:fefa-reglamento-flag-2023]]", en: "Length: 2 halves of 20 minutes, with a 2-minute break. [[src:fefa-reglamento-flag-2023]]" },
        { es: "Reloj de jugada: 25 segundos. [[src:fefa-reglamento-flag-2023]]", en: "Play clock: 25 seconds. [[src:fefa-reglamento-flag-2023]]" },
      ],
    },
    {
      type: "paragraph",
      text: {
        es: "Las medidas pueden variar un poco: el organizador puede adaptar el campo al lugar de juego o a la edad de los jugadores. [[src:fefa-reglamento-flag-2023]]",
        en: "The measurements can vary a little: the organiser may adapt the field to the venue or to the players' age. [[src:fefa-reglamento-flag-2023]]",
      },
    },
    { type: "heading", level: 2, id: "ataque", text: { es: "Cómo avanza el ataque", en: "How the offense moves" } },
    { type: "heading", level: 3, text: { es: "Cuatro downs hasta el medio campo", en: "Four downs to midfield" } },
    {
      type: "paragraph",
      text: {
        es: "No hay que ganar 10 yardas como en la NFL. El ataque empieza en su propia yarda 5 y tiene 4 downs para cruzar el medio campo. [[src:fefa-reglamento-flag-2023]]",
        en: "There are no 10 yards to gain as in the NFL. The offense starts on its own 5-yard line and has 4 downs to cross midfield. [[src:fefa-reglamento-flag-2023]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "Si lo consigue, recibe una serie nueva de 4 downs para anotar. Si no, el rival arranca desde su propia yarda 5. [[src:fefa-reglamento-flag-2023]]",
        en: "If it gets there, it receives a new series of 4 downs to score. If not, the opponent starts from its own 5-yard line. [[src:fefa-reglamento-flag-2023]]",
      },
    },
    { type: "heading", level: 3, text: { es: "El quarterback tiene 7 segundos", en: "The quarterback has 7 seconds" } },
    {
      type: "paragraph",
      text: {
        es: "Es la regla que más cambia la forma de jugar. El quarterback dispone de 7 segundos para pasar o entregar el balón; si se le acaba el tiempo, se pierde el down. [[src:fefa-reglamento-flag-2023]]",
        en: "This is the rule that most changes how the game is played. The quarterback has 7 seconds to pass or hand off the ball; when time runs out, the down is lost. [[src:fefa-reglamento-flag-2023]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "Además, no puede correr más allá de la línea de scrimmage, salvo que otro jugador haya tenido antes el balón y se lo devuelva, o que un defensor lo haya tocado en el aire. [[src:fefa-reglamento-flag-2023]]",
        en: "The quarterback also cannot run beyond the line of scrimmage, unless another player has had the ball and returned it, or a defender has touched it in the air. [[src:fefa-reglamento-flag-2023]]",
      },
    },
    { type: "heading", level: 3, text: { es: "Carreras, entregas y pases", en: "Runs, handoffs and passes" } },
    {
      type: "list",
      items: [
        { es: "Hand-offs: se permiten varios, siempre detrás de la línea de scrimmage. [[src:fefa-reglamento-flag-2023]]", en: "Handoffs: several are allowed, always behind the line of scrimmage. [[src:fefa-reglamento-flag-2023]]" },
        { es: "Pases hacia atrás: valen mientras el balón no haya superado esa línea. [[src:fefa-reglamento-flag-2023]]", en: "Backward passes: legal as long as the ball has not gone past that line. [[src:fefa-reglamento-flag-2023]]" },
        { es: "Pase hacia delante: solo uno por jugada. [[src:fefa-reglamento-flag-2023]]", en: "Forward pass: only one per play. [[src:fefa-reglamento-flag-2023]]" },
      ],
    },
    { type: "heading", level: 3, text: { es: "La zona de no carrera", en: "The no-run zone" } },
    {
      type: "paragraph",
      text: {
        es: "Son las 5 yardas previas a cada goal line. Si el snap se hace ahí, el ataque está obligado a jugar un pase hacia delante. [[src:fefa-reglamento-flag-2023]]",
        en: "These are the 5 yards in front of each goal line. If the snap is taken there, the offense must run a forward pass play. [[src:fefa-reglamento-flag-2023]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "Correr en esa zona cuesta 5 yardas y la pérdida del down. Por eso, las últimas yardas se ganan con buenas rutas, no con potencia. [[src:fefa-reglamento-flag-2023]]",
        en: "Running there costs 5 yards and loss of down. That is why the last yards are won with good routes, not power. [[src:fefa-reglamento-flag-2023]]",
      },
    },
    { type: "heading", level: 2, id: "fin-jugada", text: { es: "Cuándo termina la jugada", en: "When the play ends" } },
    {
      type: "list",
      items: [
        { es: "Flag: el jugador con balón se queda con menos de dos. [[src:fefa-reglamento-flag-2023]]", en: "Flag: the player with the ball is left with fewer than two. [[src:fefa-reglamento-flag-2023]]" },
        { es: "Banda: el balón o el corredor salen fuera. [[src:fefa-reglamento-flag-2023]]", en: "Sideline: the ball or the ball carrier goes out of bounds. [[src:fefa-reglamento-flag-2023]]" },
        { es: "Suelo: el corredor toca el suelo con algo que no sea la mano o el pie. [[src:fefa-reglamento-flag-2023]]", en: "Ground: the ball carrier touches the ground with anything other than a hand or foot. [[src:fefa-reglamento-flag-2023]]" },
        { es: "Balón caído: un pase o un fumble tocan el suelo. [[src:fefa-reglamento-flag-2023]]", en: "Loose ball: a pass or a fumble hits the ground. [[src:fefa-reglamento-flag-2023]]" },
        { es: "Anotación: hay touchdown, safety o try conseguido. [[src:fefa-reglamento-flag-2023]]", en: "Score: a touchdown, a safety or a successful try. [[src:fefa-reglamento-flag-2023]]" },
      ],
    },
    {
      type: "paragraph",
      text: {
        es: "Fíjate en el cuarto punto: si el balón cae al suelo, la jugada muere ahí y no hay recuperación que valga. [[src:fefa-reglamento-flag-2023]]",
        en: "Note the fourth point: if the ball hits the ground, the play dies there and nobody can recover it. [[src:fefa-reglamento-flag-2023]]",
      },
    },
    { type: "heading", level: 2, id: "defensa", text: { es: "Cómo defender sin contacto", en: "How to defend without contact" } },
    { type: "heading", level: 3, text: { es: "El blitz", en: "The blitz" } },
    {
      type: "paragraph",
      text: {
        es: "Un máximo de dos jugadores pueden declararse blitzers. Tienen que estar a más de 7 yardas (6,40 m) de la línea de scrimmage y levantar una mano por encima de la cabeza al menos durante el último segundo antes del snap. [[src:fefa-reglamento-flag-2023]]",
        en: "A maximum of two players can declare themselves blitzers. They must be more than 7 yards (6.40 m) from the line of scrimmage and raise one hand above their head for at least the last second before the snap. [[src:fefa-reglamento-flag-2023]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "Esa señal les da derecho de paso hacia el quarterback, y el ataque tiene que respetar su carril. Los defensores situados a menos de 7 yardas esperan detrás de la línea hasta que haya un pase, una entrega o una entrega simulada. [[src:fefa-reglamento-flag-2023]]",
        en: "That signal gives them right of way towards the quarterback, and the offense has to respect their lane. Defenders lined up within 7 yards wait behind the line until there is a pass, a handoff or a fake handoff. [[src:fefa-reglamento-flag-2023]]",
      },
    },
    { type: "heading", level: 3, text: { es: "Lo que te van a pitar", en: "What will get flagged" } },
    {
      type: "list",
      items: [
        { es: "Flag guarding: taparte los flags con el cuerpo o el balón (5 yardas y pérdida de down). [[src:fefa-reglamento-flag-2023]]", en: "Flag guarding: covering your flags with your body or the ball (5 yards and loss of down). [[src:fefa-reglamento-flag-2023]]" },
        { es: "Diving: inclinarte o lanzarte hacia delante para evitar el tirón (misma sanción). [[src:fefa-reglamento-flag-2023]]", en: "Diving: leaning or throwing yourself forward to avoid the pull (same penalty). [[src:fefa-reglamento-flag-2023]]" },
        { es: "Contacto ilegal: tocar o sujetar a un rival a propósito (10 yardas, más pérdida de down o primer down automático). [[src:fefa-reglamento-flag-2023]]", en: "Illegal contact: deliberately touching or holding an opponent (10 yards, plus loss of down or an automatic first down). [[src:fefa-reglamento-flag-2023]]" },
      ],
    },
    {
      type: "paragraph",
      text: {
        es: "Ojo, corredores: no tenéis derecho de paso y sois los responsables de evitar el choque con los rivales. Girar sobre ti mismo sí vale, pero no lanzarte ni saltar. [[src:fefa-reglamento-flag-2023]]",
        en: "A warning for ball carriers: you have no right of way and it is up to you to avoid colliding with opponents. Spinning is fine, but diving and jumping are not. [[src:fefa-reglamento-flag-2023]]",
      },
    },
    { type: "heading", level: 2, id: "puntuacion", text: { es: "Cómo se puntúa", en: "How scoring works" } },
    {
      type: "list",
      items: [
        { es: "Touchdown: 6 puntos. [[src:fefa-reglamento-flag-2023]]", en: "Touchdown: 6 points. [[src:fefa-reglamento-flag-2023]]" },
        { es: "Try desde la yarda 5: 1 punto. [[src:fefa-reglamento-flag-2023]]", en: "Try from the 5-yard line: 1 point. [[src:fefa-reglamento-flag-2023]]" },
        { es: "Try desde la yarda 10: 2 puntos. [[src:fefa-reglamento-flag-2023]]", en: "Try from the 10-yard line: 2 points. [[src:fefa-reglamento-flag-2023]]" },
        { es: "Touchdown de la defensa en un try: 2 puntos. [[src:fefa-reglamento-flag-2023]]", en: "Defensive touchdown on a try: 2 points. [[src:fefa-reglamento-flag-2023]]" },
        { es: "Safety: 2 puntos para el rival (1 si ocurre en un try). [[src:fefa-reglamento-flag-2023]]", en: "Safety: 2 points to the opponent (1 if it happens on a try). [[src:fefa-reglamento-flag-2023]]" },
      ],
    },
    { type: "heading", level: 2, id: "equipacion", text: { es: "Qué necesitas para jugar", en: "What you need to play" } },
    {
      type: "paragraph",
      text: {
        es: "No hace falta protección de tackle; de hecho, cascos y hombreras están prohibidos. Tampoco se permiten tacos metálicos, afilados o de más de 1,25 cm. [[src:fefa-reglamento-flag-2023]]",
        en: "You don't need tackle gear; in fact, helmets and shoulder pads are banned. So are metal or sharp cleats and cleats longer than 1.25 cm. [[src:fefa-reglamento-flag-2023]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "El reglamento recomienda encarecidamente el protector bucal, y algunos torneos lo exigen. [[src:fefa-reglamento-flag-2023]] [[src:nfl-flag-rules-2025]] Antes de ir, pregunta a tu club si pone los flags y el balón.",
        en: "The rulebook strongly recommends a mouthguard, and some tournaments require one. [[src:fefa-reglamento-flag-2023]] [[src:nfl-flag-rules-2025]] Before you go, ask your club whether it provides flags and a ball.",
      },
    },
    { type: "heading", level: 2, id: "diferencias", text: { es: "¿Se juega igual en todas partes?", en: "Is it played the same everywhere?" } },
    {
      type: "paragraph",
      text: {
        es: "No del todo, y conviene saberlo antes de tu primer torneo. Estas son algunas diferencias entre el reglamento de la FEFA y el de NFL FLAG 2025: [[src:fefa-reglamento-flag-2023]] [[src:nfl-flag-rules-2025]]",
        en: "Not quite, and it is worth knowing before your first tournament. These are some differences between FEFA's rulebook and NFL FLAG's 2025 rules: [[src:fefa-reglamento-flag-2023]] [[src:nfl-flag-rules-2025]]",
      },
    },
    {
      type: "list",
      items: [
        { es: "Duración: 2 mitades de 20 minutos en FEFA; 20 minutos a reloj corrido y sin descanso en NFL FLAG.", en: "Length: 2 halves of 20 minutes under FEFA; 20 minutes on a running clock with no break under NFL FLAG." },
        { es: "Reloj de jugada: 25 segundos en FEFA; 30 en NFL FLAG.", en: "Play clock: 25 seconds under FEFA; 30 under NFL FLAG." },
        { es: "Roster: hasta 15 en FEFA; de 7 a 10 en NFL FLAG.", en: "Roster: up to 15 under FEFA; 7 to 10 under NFL FLAG." },
        { es: "Empate en eliminatoria: series desde el medio campo en FEFA; tries de 1 punto a muerte súbita en NFL FLAG.", en: "Tied knockout game: series from midfield under FEFA; sudden-death 1-point tries under NFL FLAG." },
      ],
    },
    {
      type: "paragraph",
      text: {
        es: "Cada torneo puede añadir sus propios matices. Antes de competir, lee siempre las normas del organizador.",
        en: "Each tournament can add its own details. Before you compete, always read the organiser's rules.",
      },
    },
    { type: "heading", level: 2, id: "espana", text: { es: "El flag en España", en: "Flag in Spain" } },
    {
      type: "paragraph",
      text: {
        es: "Aquí el flag ya tiene palmarés propio. La [[link:competitions/spanish-flag-bowl|Spanish Flag Bowl]] se numera desde 2001, y en la edición de 2026, en Calatayud, ganaron Valencia Firebats en Open e Ibi Butterflies en femenino. [[src:fefa-palmares-flag]] [[src:fefa-flag-bowl-2026]]",
        en: "Flag already has its own honours list here. The [[link:competitions/spanish-flag-bowl|Spanish Flag Bowl]] has been numbered since 2001, and the 2026 edition, in Calatayud, was won by Valencia Firebats in Open and Ibi Butterflies in the women's category. [[src:fefa-palmares-flag]] [[src:fefa-flag-bowl-2026]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "La competición se juega en categorías Senior (Open y Femenina) y Youth (U17, U15, U13 y U11). En Open y en Youth pueden participar deportistas de ambos sexos. [[src:fefa-convocatoria-sfb-2026]]",
        en: "The competition has Senior (Open and Women's) and Youth (U17, U15, U13 and U11) categories. Athletes of both sexes can take part in Open and Youth. [[src:fefa-convocatoria-sfb-2026]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "La [[link:nationalTeam|selección]] femenina fue octava en el Mundial de Düsseldorf 2026, donde cayó 26-27 ante México en cuartos. [[src:fefa-flag-mundial-2026]] [[src:fefa-flag-mexico-2026]] Y la cantera también compite fuera: los [[link:articles/knights-nfl-indianapolis|Royal Oaks Knights Sub-15]] viajaron a Indianapolis para jugar los NFL FLAG Championships. [[src:infobae-knights-nfl-2026]]",
        en: "Spain's women's [[link:nationalTeam|national team]] finished eighth at the 2026 World Championship in Düsseldorf, losing 26-27 to Mexico in the quarter-finals. [[src:fefa-flag-mundial-2026]] [[src:fefa-flag-mexico-2026]] Young players compete abroad too: the [[link:articles/knights-nfl-indianapolis|Royal Oaks Knights U-15]] travelled to Indianapolis for the NFL FLAG Championships. [[src:infobae-knights-nfl-2026]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "Además, el flag debutará como deporte olímpico en Los Ángeles 2028. [[src:olympics-flag-faq-la28]]",
        en: "And flag will make its Olympic debut at Los Angeles 2028. [[src:olympics-flag-faq-la28]]",
      },
    },
    { type: "heading", level: 2, id: "proximos-pasos", text: { es: "Próximos pasos", en: "Next steps" } },
    {
      type: "paragraph",
      text: {
        es: "Lo mejor para aprender estas reglas es pisar un campo. Busca un club en el [[link:map|mapa de equipos]] o entra en [[link:nearYou|Cerca de ti]] y pregunta si tiene equipo de flag.",
        en: "The best way to learn these rules is to step onto a field. Find a club on the [[link:map|team map]] or try [[link:nearYou|Near you]], and ask whether it has a flag team.",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "Si prefieres empezar desde la grada, mira en la [[link:agenda|agenda]] qué se juega. Y si te pica la curiosidad, en nuestra [[link:history|historia]] encontrarás casi cuatro décadas de football en España, desde que en 1987 nació en Badalona el primer equipo del país. [[src:fcfa-historia]]",
        en: "If you would rather start from the stands, check the [[link:agenda|schedule]] to see what's on. And if you are curious, our [[link:history|history]] section covers nearly four decades of football in Spain, since the country's first team was born in Badalona in 1987. [[src:fcfa-historia]]",
      },
    },
  ],
};
