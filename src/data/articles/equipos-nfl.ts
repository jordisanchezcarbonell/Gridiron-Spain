import type { Article } from "@/types";

export const equiposNfl: Article = {
  id: "equipos-nfl",
  slug: "equipos-nfl",
  title: {
    es: "Los 32 equipos de la NFL: conferencias, divisiones y ciudades",
    en: "The 32 NFL teams: conferences, divisions and cities",
  },
  subtitle: {
    es: "AFC y NFC, las ocho divisiones de cuatro equipos y dónde juega cada uno como local, con su ciudad y su estado. Temporada 2026.",
    en: "AFC and NFC, the eight four-team divisions and where each team plays its home games, with city and state. 2026 season.",
  },
  excerpt: {
    es: "Guía de referencia de la NFL: los 32 equipos repartidos en dos conferencias y ocho divisiones, la ciudad y el estado de cada uno y por qué la división marca el calendario y el camino a los play-offs.",
    en: "An NFL reference guide: the 32 teams split into two conferences and eight divisions, each team's city and state, and why the division shapes the schedule and the road to the playoffs.",
  },
  seo: {
    title: {
      es: "Los 32 equipos de la NFL: divisiones, ciudades y estados",
      en: "The 32 NFL teams: conferences, divisions and cities",
    },
    description: {
      es: "Los 32 equipos de la NFL por conferencia y división, con la ciudad y el estado de cada uno. Cómo afectan las divisiones al calendario y a los play-offs.",
      en: "The 32 NFL teams by conference and division, with each team's city and state. How the divisions shape the schedule and the playoffs.",
    },
  },
  authorId: "jordi-sanchez",
  category: "nfl",
  tags: ["NFL", "Equipos NFL", "AFC", "NFC", "Divisiones", "Guía"],
  relatedTeamIds: [],
  relatedCompetitionIds: ["nfl"],
  availableLocales: ["es", "en"],
  publishedAt: "2026-10-29",
  updatedAt: "2026-10-29",
  status: "published",
  verificationStatus: "verified",
  lastVerifiedAt: "2026-10-29",
  readingTimeMinutes: 5,
  sourceIds: [
    "equipos-nfl-nfl-teams",
    "equipos-nfl-nfl-division-standings-2026",
    "equipos-nfl-wikipedia-nfl",
    "equipos-nfl-nfl-ops-schedule",
    "equipos-nfl-nfl-playoff-picture-2026",
    "madrid26-bengals-press-release",
    "madrid26-mediaset-season-launch",
    "dazn-nfl-game-pass-2026",
  ],
  content: [
    {
      type: "callout",
      title: { es: "En resumen", en: "In short" },
      text: {
        es: "La NFL tiene 32 equipos divididos en dos conferencias de 16, la AFC (American Football Conference) y la NFC (National Football Conference). [[src:equipos-nfl-nfl-teams]] Cada conferencia tiene cuatro divisiones de cuatro equipos: Este, Norte, Sur y Oeste. [[src:equipos-nfl-nfl-division-standings-2026]]",
        en: "The NFL has 32 teams split into two conferences of 16, the AFC (American Football Conference) and the NFC (National Football Conference). [[src:equipos-nfl-nfl-teams]] Each conference has four four-team divisions: East, North, South and West. [[src:equipos-nfl-nfl-division-standings-2026]]",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "Las listas siguen el reparto por divisiones de la clasificación oficial de la NFL para 2026. [[src:equipos-nfl-nfl-division-standings-2026]] Junto a cada equipo va la localidad y el estado donde juega como local, que no siempre coinciden con el nombre del equipo. [[src:equipos-nfl-wikipedia-nfl]]",
        en: "The lists follow the division split in the NFL's official 2026 standings. [[src:equipos-nfl-nfl-division-standings-2026]] Next to each team is the city and state where it plays its home games, which do not always match the team's name. [[src:equipos-nfl-wikipedia-nfl]]",
      },
    },
    { type: "heading", level: 2, id: "afc", text: { es: "AFC: American Football Conference", en: "AFC: American Football Conference" } },
    { type: "heading", level: 3, id: "afc-este", text: { es: "AFC Este", en: "AFC East" } },
    {
      type: "list",
      items: [
        { es: "Buffalo Bills: Orchard Park, Nueva York", en: "Buffalo Bills: Orchard Park, New York" },
        { es: "Miami Dolphins: Miami Gardens, Florida", en: "Miami Dolphins: Miami Gardens, Florida" },
        { es: "New England Patriots: Foxborough, Massachusetts", en: "New England Patriots: Foxborough, Massachusetts" },
        { es: "New York Jets: East Rutherford, Nueva Jersey", en: "New York Jets: East Rutherford, New Jersey" },
      ],
    },
    { type: "heading", level: 3, id: "afc-norte", text: { es: "AFC Norte", en: "AFC North" } },
    {
      type: "list",
      items: [
        { es: "Baltimore Ravens: Baltimore, Maryland", en: "Baltimore Ravens: Baltimore, Maryland" },
        { es: "Cincinnati Bengals: Cincinnati, Ohio", en: "Cincinnati Bengals: Cincinnati, Ohio" },
        { es: "Cleveland Browns: Cleveland, Ohio", en: "Cleveland Browns: Cleveland, Ohio" },
        { es: "Pittsburgh Steelers: Pittsburgh, Pensilvania", en: "Pittsburgh Steelers: Pittsburgh, Pennsylvania" },
      ],
    },
    { type: "heading", level: 3, id: "afc-sur", text: { es: "AFC Sur", en: "AFC South" } },
    {
      type: "list",
      items: [
        { es: "Houston Texans: Houston, Texas", en: "Houston Texans: Houston, Texas" },
        { es: "Indianapolis Colts: Indianápolis, Indiana", en: "Indianapolis Colts: Indianapolis, Indiana" },
        { es: "Jacksonville Jaguars: Jacksonville, Florida", en: "Jacksonville Jaguars: Jacksonville, Florida" },
        { es: "Tennessee Titans: Nashville, Tennessee", en: "Tennessee Titans: Nashville, Tennessee" },
      ],
    },
    { type: "heading", level: 3, id: "afc-oeste", text: { es: "AFC Oeste", en: "AFC West" } },
    {
      type: "list",
      items: [
        { es: "Denver Broncos: Denver, Colorado", en: "Denver Broncos: Denver, Colorado" },
        { es: "Kansas City Chiefs: Kansas City, Misuri", en: "Kansas City Chiefs: Kansas City, Missouri" },
        { es: "Las Vegas Raiders: Paradise, Nevada", en: "Las Vegas Raiders: Paradise, Nevada" },
        { es: "Los Angeles Chargers: Inglewood, California", en: "Los Angeles Chargers: Inglewood, California" },
      ],
    },
    { type: "heading", level: 2, id: "nfc", text: { es: "NFC: National Football Conference", en: "NFC: National Football Conference" } },
    { type: "heading", level: 3, id: "nfc-este", text: { es: "NFC Este", en: "NFC East" } },
    {
      type: "list",
      items: [
        { es: "Dallas Cowboys: Arlington, Texas", en: "Dallas Cowboys: Arlington, Texas" },
        { es: "New York Giants: East Rutherford, Nueva Jersey", en: "New York Giants: East Rutherford, New Jersey" },
        { es: "Philadelphia Eagles: Filadelfia, Pensilvania", en: "Philadelphia Eagles: Philadelphia, Pennsylvania" },
        { es: "Washington Commanders: Landover, Maryland", en: "Washington Commanders: Landover, Maryland" },
      ],
    },
    { type: "heading", level: 3, id: "nfc-norte", text: { es: "NFC Norte", en: "NFC North" } },
    {
      type: "list",
      items: [
        { es: "Chicago Bears: Chicago, Illinois", en: "Chicago Bears: Chicago, Illinois" },
        { es: "Detroit Lions: Detroit, Míchigan", en: "Detroit Lions: Detroit, Michigan" },
        { es: "Green Bay Packers: Green Bay, Wisconsin", en: "Green Bay Packers: Green Bay, Wisconsin" },
        { es: "Minnesota Vikings: Mineápolis, Minnesota", en: "Minnesota Vikings: Minneapolis, Minnesota" },
      ],
    },
    { type: "heading", level: 3, id: "nfc-sur", text: { es: "NFC Sur", en: "NFC South" } },
    {
      type: "list",
      items: [
        { es: "Atlanta Falcons: Atlanta, Georgia", en: "Atlanta Falcons: Atlanta, Georgia" },
        { es: "Carolina Panthers: Charlotte, Carolina del Norte", en: "Carolina Panthers: Charlotte, North Carolina" },
        { es: "New Orleans Saints: Nueva Orleans, Luisiana", en: "New Orleans Saints: New Orleans, Louisiana" },
        { es: "Tampa Bay Buccaneers: Tampa, Florida", en: "Tampa Bay Buccaneers: Tampa, Florida" },
      ],
    },
    { type: "heading", level: 3, id: "nfc-oeste", text: { es: "NFC Oeste", en: "NFC West" } },
    {
      type: "list",
      items: [
        { es: "Arizona Cardinals: Glendale, Arizona", en: "Arizona Cardinals: Glendale, Arizona" },
        { es: "Los Angeles Rams: Inglewood, California", en: "Los Angeles Rams: Inglewood, California" },
        { es: "San Francisco 49ers: Santa Clara, California", en: "San Francisco 49ers: Santa Clara, California" },
        { es: "Seattle Seahawks: Seattle, Washington", en: "Seattle Seahawks: Seattle, Washington" },
      ],
    },
    { type: "heading", level: 2, id: "por-estado", text: { es: "Equipos de la NFL por estado", en: "NFL teams by state" } },
    {
      type: "paragraph",
      text: {
        es: "Contando dónde está el estadio de cada equipo, los 32 se reparten entre 23 estados. Florida y California tienen tres cada uno, y cinco estados tienen dos. [[src:equipos-nfl-wikipedia-nfl]]",
        en: "Counting where each team's stadium is, the 32 are spread across 23 states. Florida and California have three each, and five states have two. [[src:equipos-nfl-wikipedia-nfl]]",
      },
    },
    {
      type: "list",
      items: [
        { es: "Florida (3): Miami Dolphins, Jacksonville Jaguars y Tampa Bay Buccaneers.", en: "Florida (3): Miami Dolphins, Jacksonville Jaguars and Tampa Bay Buccaneers." },
        { es: "California (3): Los Angeles Chargers, Los Angeles Rams y San Francisco 49ers.", en: "California (3): Los Angeles Chargers, Los Angeles Rams and San Francisco 49ers." },
        { es: "Nueva Jersey (2): New York Jets y New York Giants.", en: "New Jersey (2): New York Jets and New York Giants." },
        { es: "Maryland (2): Baltimore Ravens y Washington Commanders.", en: "Maryland (2): Baltimore Ravens and Washington Commanders." },
        { es: "Ohio (2): Cincinnati Bengals y Cleveland Browns.", en: "Ohio (2): Cincinnati Bengals and Cleveland Browns." },
        { es: "Pensilvania (2): Pittsburgh Steelers y Philadelphia Eagles.", en: "Pennsylvania (2): Pittsburgh Steelers and Philadelphia Eagles." },
        { es: "Texas (2): Houston Texans y Dallas Cowboys.", en: "Texas (2): Houston Texans and Dallas Cowboys." },
        { es: "Un equipo: Nueva York (Buffalo Bills), Massachusetts (New England Patriots), Indiana (Indianapolis Colts), Tennessee (Tennessee Titans), Colorado (Denver Broncos), Misuri (Kansas City Chiefs), Nevada (Las Vegas Raiders), Illinois (Chicago Bears), Míchigan (Detroit Lions), Wisconsin (Green Bay Packers), Minnesota (Minnesota Vikings), Georgia (Atlanta Falcons), Carolina del Norte (Carolina Panthers), Luisiana (New Orleans Saints), Arizona (Arizona Cardinals) y Washington (Seattle Seahawks).", en: "One team: New York (Buffalo Bills), Massachusetts (New England Patriots), Indiana (Indianapolis Colts), Tennessee (Tennessee Titans), Colorado (Denver Broncos), Missouri (Kansas City Chiefs), Nevada (Las Vegas Raiders), Illinois (Chicago Bears), Michigan (Detroit Lions), Wisconsin (Green Bay Packers), Minnesota (Minnesota Vikings), Georgia (Atlanta Falcons), North Carolina (Carolina Panthers), Louisiana (New Orleans Saints), Arizona (Arizona Cardinals) and Washington (Seattle Seahawks)." },
      ],
    },
    {
      type: "callout",
      title: { es: "Nombre y estadio no siempre coinciden", en: "Name and stadium don't always match" },
      text: {
        es: "Los New York Jets y los New York Giants comparten el MetLife Stadium en East Rutherford, Nueva Jersey, y los Washington Commanders juegan en Landover, Maryland. Los Rams y los Chargers comparten el SoFi Stadium de Inglewood, California. [[src:equipos-nfl-wikipedia-nfl]] El estado de Washington, donde juegan los Seattle Seahawks, no tiene nada que ver con los Commanders.",
        en: "The New York Jets and New York Giants share MetLife Stadium in East Rutherford, New Jersey, and the Washington Commanders play in Landover, Maryland. The Rams and Chargers share SoFi Stadium in Inglewood, California. [[src:equipos-nfl-wikipedia-nfl]] Washington state, home of the Seattle Seahawks, has nothing to do with the Commanders.",
      },
    },
    { type: "heading", level: 2, id: "calendario-playoffs", text: { es: "Para qué sirven las divisiones: calendario y play-offs", en: "What the divisions are for: schedule and playoffs" } },
    {
      type: "paragraph",
      text: {
        es: "Cada equipo juega 17 partidos de temporada regular en 18 semanas, con una jornada de descanso. [[src:equipos-nfl-wikipedia-nfl]] La división pesa mucho en ese calendario, según la fórmula oficial de la liga: [[src:equipos-nfl-nfl-ops-schedule]]",
        en: "Each team plays 17 regular-season games over 18 weeks, with one bye week. [[src:equipos-nfl-wikipedia-nfl]] The division carries a lot of weight in that schedule, according to the league's official formula: [[src:equipos-nfl-nfl-ops-schedule]]",
      },
    },
    {
      type: "list",
      items: [
        { es: "Seis partidos contra sus tres rivales de división, uno en casa y otro fuera contra cada uno. [[src:equipos-nfl-nfl-ops-schedule]]", en: "Six games against its three division rivals, home and away against each. [[src:equipos-nfl-nfl-ops-schedule]]" },
        { es: "Cuatro partidos contra una división entera de su misma conferencia, que va rotando. [[src:equipos-nfl-nfl-ops-schedule]]", en: "Four games against a whole division from its own conference, on a rotation. [[src:equipos-nfl-nfl-ops-schedule]]" },
        { es: "Cuatro partidos contra una división entera de la otra conferencia, también en rotación. [[src:equipos-nfl-nfl-ops-schedule]]", en: "Four games against a whole division from the other conference, also on a rotation. [[src:equipos-nfl-nfl-ops-schedule]]" },
        { es: "Dos partidos contra las otras dos divisiones de su conferencia, emparejados según la posición en la división la temporada anterior. [[src:equipos-nfl-nfl-ops-schedule]]", en: "Two games against the other two divisions in its conference, matched by the previous season's division finish. [[src:equipos-nfl-nfl-ops-schedule]]" },
        { es: "El partido 17, contra un rival de la otra conferencia de una división a la que no se enfrenta ese año, también según la clasificación anterior. [[src:equipos-nfl-nfl-ops-schedule]]", en: "The 17th game, against an opponent from the other conference in a division it doesn't otherwise face that year, also based on the previous standings. [[src:equipos-nfl-nfl-ops-schedule]]" },
      ],
    },
    {
      type: "paragraph",
      text: {
        es: "Con esa rotación, cada equipo se enfrenta a los otros 31 al menos una vez cada cuatro años. [[src:equipos-nfl-nfl-ops-schedule]] A los play-offs de 2026 llegan siete equipos por conferencia, [[src:equipos-nfl-nfl-playoff-picture-2026]] y entre ellos están los cuatro campeones de división, a los que se suman tres comodines. [[src:equipos-nfl-wikipedia-nfl]] Ganar la división, por tanto, garantiza la plaza.",
        en: "With that rotation, every team plays each of the other 31 at least once every four years. [[src:equipos-nfl-nfl-ops-schedule]] Seven teams per conference reach the 2026 playoffs, [[src:equipos-nfl-nfl-playoff-picture-2026]] including the four division champions, joined by three wild cards. [[src:equipos-nfl-wikipedia-nfl]] Winning the division therefore guarantees a spot.",
      },
    },
    { type: "heading", level: 2, id: "espana", text: { es: "Y desde España", en: "And from Spain" } },
    {
      type: "paragraph",
      text: {
        es: "El 8 de noviembre de 2026 el Santiago Bernabéu acoge el Atlanta Falcons–Cincinnati Bengals de la Semana 9, con los Falcons como locales. [[src:madrid26-bengals-press-release]] Es un cruce entre conferencias: los Falcons son de la NFC Sur y los Bengals de la AFC Norte. [[src:equipos-nfl-nfl-division-standings-2026]] Lo contamos todo en nuestra guía del partido.",
        en: "On 8 November 2026 the Santiago Bernabéu hosts Atlanta Falcons–Cincinnati Bengals in Week 9, with the Falcons as the home team. [[src:madrid26-bengals-press-release]] It is an interconference game: the Falcons play in the NFC South and the Bengals in the AFC North. [[src:equipos-nfl-nfl-division-standings-2026]] Our game guide has all the details.",
      },
    },
    {
      type: "paragraph",
      text: {
        es: "Para seguir a cualquiera de los 32, Mediaset emite más de 50 partidos gratis en Cuatro, Be Mad y Mediaset Infinity, [[src:madrid26-mediaset-season-launch]] y NFL Game Pass, dentro de DAZN, tiene todos los partidos de la temporada. [[src:dazn-nfl-game-pass-2026]]",
        en: "To follow any of the 32, Mediaset shows over 50 free-to-air games on Cuatro, Be Mad and Mediaset Infinity, [[src:madrid26-mediaset-season-launch]] and NFL Game Pass, inside DAZN, carries every game of the season. [[src:dazn-nfl-game-pass-2026]]",
      },
    },
  ],
};
