import type { Article } from "@/types";

const CIH = "[[src:cuadernos-futbol-americano]]";
const ROK = "[[src:rok-quienes-somos]]";
const CAM = "[[src:camioneros-historia-club]]";
const NFL = "[[src:commanders-bernabeu-2025]]";

export const antesDe1988: Article = {
  id: "antes-de-1988",
  slug: "el-futbol-americano-no-llego-a-espana-en-1988",
  title: {
    es: "El fútbol americano no llegó a España en 1988",
    en: "American football did not arrive in Spain in 1988",
  },
  subtitle: {
    es: "Treinta años antes del primer partido entre clubes españoles, el Bernabéu ya había acogido uno ante cien mil personas. Lo jugaban dos bases aéreas estadounidenses, y durante tres décadas este deporte existió en España sin que los españoles participaran.",
    en: "Thirty years before the first game between Spanish clubs, the Bernabéu had already hosted one in front of a hundred thousand people. It was played by two American air bases, and for three decades the sport existed in Spain without Spaniards taking part.",
  },
  excerpt: {
    es: "Nuestro propio archivo situaba el origen en 1988. Al contrastarlo con la revista del CIHEFE, con la NFL y con cuatro clubes, resultó que la historia empieza en 1956 y pasa por el Santiago Bernabéu en 1958. Esto es lo que hemos encontrado, y lo que hemos tenido que corregir.",
    en: "Our own archive placed the origin in 1988. Checking it against the CIHEFE journal, the NFL and four clubs, it turned out the story begins in 1956 and passes through the Santiago Bernabéu in 1958. This is what we found, and what we had to correct.",
  },
  heroImage: {
    url: "/images/editorial/campo-vacio-atardecer.png",
    alt: {
      es: "Campo de fútbol americano vacío al atardecer, visto desde la banda, con los postes al fondo.",
      en: "An empty American football field at dusk, seen from the sideline, with the goal posts in the distance.",
    },
    width: 1280,
    height: 720,
    photographer: "Primer Down · imagen editorial generada",
    license: "Uso editorial de Primer Down",
  },
  heroImagePending: {
    es: "Las imágenes de la exhibición del Bernabéu de 1958 están en el NO-DO n.º 829, en la Filmoteca de RTVE. Pendiente de gestionar la cita o el permiso de uso.",
    en: "Footage of the 1958 Bernabéu exhibition is in NO-DO no. 829, in RTVE's film archive. Citation or usage permission still to be arranged.",
  },
  authorId: "jordi-sanchez",
  category: "historia",
  tags: ["Historia", "Orígenes", "Torrejón de Ardoz", "Santiago Bernabéu", "1958", "NO-DO"],
  relatedTeamIds: ["alcobendas-cavaliers", "badalona-dracs", "camioneros-coslada", "osos-rivas"],
  relatedCompetitionIds: [],
  availableLocales: ["es", "en"],
  publishedAt: "2026-10-18",
  updatedAt: "2026-10-18",
  status: "published",
  verificationStatus: "partial",
  lastVerifiedAt: "2026-10-18",
  readingTimeMinutes: 7,
  sourceIds: [
    "cuadernos-futbol-americano", "commanders-bernabeu-2025",
    "rok-quienes-somos", "camioneros-historia-club", "dracs-historia-club", "osos-historia",
    "fcfa-historia",
  ],
  content: [
    {
      type: "callout",
      title: { es: "Esto empieza con un error nuestro", en: "This starts with a mistake of ours" },
      text: {
        es: "Hasta el 18 de octubre de 2026 este archivo publicaba, en cuatro sitios distintos y sin matizar, que el primer partido de fútbol americano disputado en España fue el 19 de marzo de 1988. Un club nos hizo dudar, contrastamos, y resultó que no era cierto. Lo hemos corregido. Este reportaje es lo que apareció al tirar del hilo.",
        en: "Until 18 October 2026 this archive published, in four different places and without qualification, that the first American football game played in Spain was on 19 March 1988. A club made us doubt it, we checked, and it turned out not to be true. We have corrected it. This piece is what emerged when we pulled the thread.",
      },
    },
    {
      type: "heading",
      level: 2,
      id: "instituto",
      text: { es: "Un instituto dentro de una base aérea", en: "A high school inside an air base" },
    },
    {
      type: "paragraph",
      text: {
        es: `En 1953, los Pactos de Madrid llevaron fuerzas estadounidenses a la base aérea de Torrejón de Ardoz. Con ellas llegó un instituto: el Madrid High School, dependiente del Departamento de Defensa, para escolarizar a los hijos del personal destinado allí. ${ROK}`,
        en: `In 1953, the Pacts of Madrid brought American forces to the Torrejón de Ardoz air base. With them came a school: Madrid High School, run by the Department of Defense, for the children of the personnel stationed there. ${ROK}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Tres años después, en 1956, un profesor llamado Joseph E. Blackstead organizó allí una competición interna de flag football con cuatro equipos de alumnos: Sabres, Bloodhounds, Mustangs y Dragons. ${CIH} ${ROK} Ese es, hasta donde hemos podido documentar, el primer fútbol americano organizado en territorio español. No lo jugaba ningún español.`,
        en: `Three years later, in 1956, a teacher called Joseph E. Blackstead organised an internal flag football competition there with four student teams: Sabres, Bloodhounds, Mustangs and Dragons. ${CIH} ${ROK} That is, as far as we have been able to document, the first organised American football on Spanish soil. No Spaniard was playing it.`,
      },
    },
    {
      type: "heading",
      level: 2,
      id: "bernabeu",
      text: { es: "Cien mil personas en el Bernabéu", en: "A hundred thousand people at the Bernabéu" },
    },
    {
      type: "paragraph",
      text: {
        es: `En noviembre de 1958, tras un Real Madrid-Valencia de liga, el césped del Santiago Bernabéu acogió una exhibición de fútbol americano entre los Tigers de la base estadounidense de Toul, en Francia, y los Taconeers de la de Giebelstadt, en Alemania. Ganaron los Taconeers por 20-6. ${CIH} ${NFL} ${CAM}`,
        en: `In November 1958, after a Real Madrid-Valencia league match, the turf of the Santiago Bernabéu hosted an American football exhibition between the Tigers from the US base at Toul, France, and the Taconeers from Giebelstadt, Germany. The Taconeers won 20-6. ${CIH} ${NFL} ${CAM}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Hubo banda militar de las Fuerzas Armadas estadounidenses y animadoras. Y hubo, según la revista del Centro de Investigaciones de Historia y Estadística del Fútbol Español, unos cien mil espectadores: los que se habían quedado en el estadio después del partido del Madrid. ${CIH} Esa misma fuente lo describe como el debut público del football fuera de las bases militares.`,
        en: `There was a United States Armed Forces military band and cheerleaders. And there were, according to the journal of the Spanish football history and statistics research centre, some hundred thousand spectators: those who had stayed in the stadium after the Madrid match. ${CIH} That same source describes it as the sport's public debut outside the military bases.`,
      },
    },
    {
      type: "callout",
      title: { es: "La fecha no está cerrada", en: "The date is not settled" },
      text: {
        es: "Cuadernos de Fútbol sitúa la exhibición el 15 de noviembre de 1958. La web oficial de los Washington Commanders y el club Camioneros de Coslada la sitúan el 16. Un día de diferencia que no hemos podido resolver, y que preferimos publicar antes que esconder. Las imágenes existen: están en el NO-DO n.º 829, en la Filmoteca de RTVE.",
        en: "Cuadernos de Fútbol dates the exhibition to 15 November 1958. The Washington Commanders' official site and the club Camioneros de Coslada date it to the 16th. A one-day difference we have not been able to resolve, and which we prefer to publish rather than hide. The footage exists: it is in NO-DO no. 829, in RTVE's film archive.",
      },
    },
    {
      type: "heading",
      level: 2,
      id: "liga-de-bases",
      text: { es: "Una liga entre cuatro bases", en: "A league between four bases" },
    },
    {
      type: "paragraph",
      text: {
        es: `Lo del Bernabéu no fue un hecho aislado. En 1959 se disputó en Sevilla, en el campo de Santa Clara, un campeonato de flag entre cuatro institutos de base: Knights, Sevilla High School Toros, Zaragoza HS Zebras y Rota HS Admirals, con Jim Leary en la dirección deportiva y Don Mitchell de entrenador. ${ROK} En 1962 esos mismos cuatro nombres competían ya en tackle. ${CIH}`,
        en: `The Bernabéu game was not an isolated event. In 1959 a flag championship was played in Seville, at the Santa Clara ground, between four base high schools: Knights, Sevilla High School Toros, Zaragoza HS Zebras and Rota HS Admirals, with Jim Leary as sporting director and Don Mitchell as coach. ${ROK} By 1962 those same four names were competing in tackle. ${CIH}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Durante casi tres décadas el fútbol americano existió en España encerrado en ese circuito. Como lo resume Camioneros de Coslada en su propia historia: el deporte estuvo recluido en las bases, con los Raiders de Torrejón de Ardoz y los Knights del instituto disputando ligas colegiales contra otras bases, y los españoles sin pintar nada en ello. ${CAM}`,
        en: `For almost three decades American football existed in Spain locked inside that circuit. As Camioneros de Coslada puts it in their own history: the sport was confined to the bases, with the Raiders of Torrejón de Ardoz and the high school Knights playing school leagues against other bases, and Spaniards playing no part in it. ${CAM}`,
      },
    },
    {
      type: "heading",
      level: 2,
      id: "1988",
      text: { es: "Y entonces, 1988", en: "And then, 1988" },
    },
    {
      type: "paragraph",
      text: {
        es: `En diciembre de 1987, en una reunión en Badalona, Pere Moliner, el entrenador italiano Alfonso Genchi —por entonces en el Red Eagles de Catanzaro— y Ramón Ventura, primer presidente de la Federació Catalana, acordaron organizar un partido. ${"[[src:dracs-historia-club]]"} Se jugó el 19 de marzo de 1988 en el Campo de Rugby Universitario de Barcelona: Badalona Drags contra los Palermo Cardinals. Ganaron los sicilianos. ${"[[src:dracs-historia-club]]"} ${"[[src:fcfa-historia]]"}`,
        en: `In December 1987, at a meeting in Badalona, Pere Moliner, the Italian coach Alfonso Genchi — then at Red Eagles of Catanzaro — and Ramón Ventura, first president of the Catalan federation, agreed to put on a game. ${"[[src:dracs-historia-club]]"} It was played on 19 March 1988 at the Campo de Rugby Universitario in Barcelona: Badalona Drags against Palermo Cardinals. The Sicilians won. ${"[[src:dracs-historia-club]]"} ${"[[src:fcfa-historia]]"}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Tampoco ese marcador está cerrado: Badalona Dracs publica 12-8 y Camioneros de Coslada, 12-18. ${"[[src:dracs-historia-club]]"} ${CAM} Lo que sí está claro es lo que significó. Ese fue el primer partido que jugó un club español, y de él salió todo lo demás: los Pioners de l'Hospitalet, los Búfals del Poblenou, los Barcelona Boxers, la federación catalana, la liga.`,
        en: `That score is not settled either: Badalona Dracs publish 12-8 and Camioneros de Coslada 12-18. ${"[[src:dracs-historia-club]]"} ${CAM} What is clear is what it meant. That was the first game played by a Spanish club, and everything else came out of it: Pioners de l'Hospitalet, Búfals del Poblenou, Barcelona Boxers, the Catalan federation, the league.`,
      },
    },
    {
      type: "heading",
      level: 2,
      id: "dos-origenes",
      text: { es: "Dos orígenes, no uno", en: "Two origins, not one" },
    },
    {
      type: "paragraph",
      text: {
        es: `La versión que circula en España empieza en 1988, y no es falsa: es incompleta. Hay dos orígenes distintos y la confusión viene de llamarlos igual. El fútbol americano llegó a territorio español en los años cincuenta, dentro del circuito militar estadounidense. El fútbol americano español —clubes españoles, jugadores españoles, federación propia— nació en 1988.`,
        en: `The version told in Spain starts in 1988, and it is not false: it is incomplete. There are two separate origins and the confusion comes from calling them the same thing. American football arrived on Spanish soil in the 1950s, inside the American military circuit. Spanish American football — Spanish clubs, Spanish players, its own federation — was born in 1988.`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `Lo interesante es dónde se tocan las dos historias. A finales de los ochenta empezó a invitarse a españoles a ver partidos en Torrejón, sobre todo en el Corredor del Henares y en El Encinar de los Reyes. ${CAM} Y cuando en 1989 nació el primer equipo madrileño, los Madrid Bears que hoy son Osos Rivas, lo hizo con la ayuda de militares de esa misma base. ${"[[src:osos-historia]]"}`,
        en: `What is interesting is where the two stories touch. In the late 1980s Spaniards began to be invited to watch games at Torrejón, especially in the Corredor del Henares and El Encinar de los Reyes. ${CAM} And when the first Madrid team was born in 1989 — the Madrid Bears who are today Osos Rivas — it was with the help of military personnel from that same base. ${"[[src:osos-historia]]"}`,
      },
    },
    {
      type: "paragraph",
      text: {
        es: `El club que queda de aquella época sigue jugando. Royal Oaks Knights nació en 1972, cuando el distrito escolar del Madrid High School se dividió en dos y una mitad se asentó en el barrio residencial de Royal Oaks, hoy el Encinar de los Reyes. ${ROK} En 2026 ganó cinco títulos y llevó un equipo sub-15 a los NFL FLAG Championships de Indianápolis.`,
        en: `The club that remains from that era is still playing. Royal Oaks Knights was born in 1972, when the Madrid High School district split in two and one half settled in the Royal Oaks residential neighbourhood, today El Encinar de los Reyes. ${ROK} In 2026 it won five titles and took an under-15 team to the NFL FLAG Championships in Indianapolis.`,
      },
    },
    {
      type: "callout",
      title: { es: "Qué falta por cerrar", en: "What is still open" },
      text: {
        es: "El día exacto de la exhibición del Bernabéu, 15 o 16 de noviembre de 1958. El marcador del Dracs-Palermo, 12-8 o 12-18. Y si el partido del 15 de octubre de 1960 entre Knights y Zaragoza Zebras fue, como sostiene el club, el primero de tackle en España. Si sabes algo de esto, o tienes documentación de aquellos años, escríbenos: jordigw@gmail.com.",
        en: "The exact day of the Bernabéu exhibition, 15 or 16 November 1958. The Dracs-Palermo score, 12-8 or 12-18. And whether the 15 October 1960 game between Knights and Zaragoza Zebras was, as the club holds, the first tackle game in Spain. If you know anything about this, or hold documents from those years, write to us: jordigw@gmail.com.",
      },
    },
  ],
};
