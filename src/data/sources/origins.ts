import type { Source } from "@/types/common";

const A = "2026-09-13";

/**
 * Sources on the origins of football in Madrid and Valencia and the
 * 1991-1995 league era. Mostly secondary: contemporary press pages are
 * listed in docs/research-pending.md and must be pulled by hand before any
 * of these facts can be marked verified.
 */
export const originsSources: Source[] = [
  { id: "panteras-historia", title: "Historia de Madrid Panteras", publisher: "Madrid Panteras Football Team (web de archivo del club)", url: "https://www.madridpanteras.com/palmares/", accessedAt: A, sourceType: "archive", notes: { es: "Web retrospectiva mantenida por antiguos miembros del club.", en: "Retrospective site maintained by former club members." } },
  { id: "panteras-1989-90", title: "Temporada 89-90", publisher: "Madrid Panteras Football Team (web de archivo del club)", url: "https://www.madridpanteras.com/palmares/temporada-89-90/", accessedAt: A, sourceType: "archive" },
  { id: "panteras-sfl-1991-92", title: "I Liga SFL (temporada 91-92)", publisher: "Madrid Panteras Football Team (web de archivo del club)", url: "https://www.madridpanteras.com/palmares/temporada-91-92/i-liga-sfl/", accessedAt: A, sourceType: "archive" },
  { id: "wiki-osos-madrid-es", title: "Osos de Madrid", publisher: "Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Osos_de_Madrid", accessedAt: A, sourceType: "encyclopedia" },
  { id: "wiki-panteras", title: "Madrid Panteras", publisher: "Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Madrid_Panteras", accessedAt: A, sourceType: "encyclopedia" },
  { id: "wiki-toros", title: "Madrid Toros", publisher: "Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Madrid_Toros", accessedAt: A, sourceType: "encyclopedia" },
  { id: "wiki-lnfa-es", title: "Liga Nacional de Fútbol Americano", publisher: "Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Liga_Nacional_de_F%C3%BAtbol_Americano", accessedAt: A, sourceType: "encyclopedia" },
  { id: "wiki-lnfa-1995-es", title: "LNFA 1995", publisher: "Wikipedia (es)", url: "https://es.wikipedia.org/wiki/LNFA_1995", accessedAt: A, sourceType: "encyclopedia" },
  { id: "wiki-liga-catalana", title: "Liga Catalana de Fútbol Americano", publisher: "Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Liga_Catalana_de_F%C3%BAtbol_Americano", accessedAt: A, sourceType: "encyclopedia" },
  { id: "wiki-boxers", title: "Barcelona Boxers", publisher: "Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Barcelona_Boxers", accessedAt: A, sourceType: "encyclopedia" },
  { id: "enciclopedia-boxers", title: "Barcelona Bóxers", publisher: "Esportpedia · enciclopedia.cat", url: "https://www.enciclopedia.cat/esportpedia/barcelona-boxers", accessedAt: A, sourceType: "encyclopedia" },
  { id: "viquipedia-historia-catalunya", title: "Història del futbol americà a Catalunya", publisher: "Viquipèdia (ca)", url: "https://ca.wikipedia.org/wiki/Hist%C3%B2ria_del_futbol_americ%C3%A0_a_Catalunya", accessedAt: A, sourceType: "encyclopedia" },
  { id: "cuadernos-futbol-americano", title: "Los diferentes códigos del fútbol (II). Fútbol \"americano\"", publisher: "Cuadernos de Fútbol (CIHEFE)", url: "https://cuadernosdefutbol.com/articulo/los-diferentes-codigos-del-futbol-ii-futbol-%E2%80%9Camericano%E2%80%9D/1010", accessedAt: A, sourceType: "press" },
  { id: "telescopio-madrid-pioneros", title: "La Base de Torrejón, los Camioneros de Coslada y los Osos de Rivas, pioneros del fútbol americano madrileño", publisher: "El Telescopio Digital", url: "http://eltelescopiodigital.com/index.php/es/zona-este/117088-la-base-de-torrejon-los-camioneros-de-coslada-y-los-osos-de-rivas-pioneros-del-futbol-americano-madrileno.html", accessedAt: A, sourceType: "press" },
  { id: "madridactual-guia-2017", title: "Guía del football americano en la Comunidad de Madrid", publisher: "Madridactual", url: "https://www.madridactual.es/deportes/polideportivo/guia-del-football-americano-en-la-comunidad-de-madrid-20170813-758137.html", publishedAt: "2017-08-13", accessedAt: A, sourceType: "press" },
  { id: "rivas-registro-osos", title: "Agrupación Deportiva de Fútbol Americano Osos Rivas de Madrid (registro de asociaciones)", publisher: "Ayuntamiento de Rivas-Vaciamadrid", url: "https://www.rivasciudad.es/asociacion/agrupacion-deportiva-de-futbol-americano-osos-rivas-de-madrid/", accessedAt: A, sourceType: "official-document" },
];
