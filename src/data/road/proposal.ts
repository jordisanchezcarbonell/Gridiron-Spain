import type { LocalizedString } from "@/types";

export const roadProposal: {
  status: LocalizedString;
  intro: LocalizedString;
  contact: { name: string; city: LocalizedString; email: string; website: string };
  deliverables: Array<{ title: LocalizedString; text: LocalizedString }>;
  support: LocalizedString;
  guidance: LocalizedString;
  boundaries: LocalizedString;
  terms: LocalizedString;
  independence: LocalizedString;
} = {
  status: { es: "Proyecto en preparación · Colaboración pendiente de acuerdo", en: "Project in planning · Collaboration subject to agreement" },
  intro: {
    es: "Preparamos una primera experiencia de Navy Football desde la perspectiva de dos aficionados europeos, para contarla en español e inglés.",
    en: "We are preparing a first Navy Football experience from the perspective of two European fans, to tell it in Spanish and English.",
  },
  contact: { name: "Jordi Sánchez", city: { es: "Barcelona, España", en: "Barcelona, Spain" }, email: "jordigw@gmail.com", website: "https://www.jordisanchezweb.es/" },
  deliverables: [
    { title: { es: "3 vídeos verticales", en: "3 vertical videos" }, text: { es: "Preparación y viaje, Annapolis y la experiencia de día de partido.", en: "Preparation and travel, Annapolis, and the game-day experience." } },
    { title: { es: "Fotografías editadas", en: "Edited photographs" }, text: { es: "Una selección fotográfica del viaje y de los espacios permitidos.", en: "A curated photographic selection from the trip and permitted spaces." } },
    { title: { es: "Artículo bilingüe", en: "Bilingual article" }, text: { es: "Una experiencia y guía práctica para visitantes europeos, en español e inglés.", en: "An experience report and practical guide for European visitors, in Spanish and English." } },
  ],
  support: { es: "Buscamos apoyo con dos entradas y, si fuera posible, una experiencia pública de prepartido.", en: "We’re seeking support with two game tickets and, if available, a public pregame experience." },
  guidance: { es: "También agradeceríamos orientación sobre actividades abiertas a visitantes o una introducción al contacto adecuado.", en: "We would also appreciate guidance on visitor-open activities or an introduction to the appropriate contact." },
  boundaries: { es: "No solicitamos acreditaciones de prensa ni acceso a zonas restringidas.", en: "We are not requesting press credentials or access to restricted areas." },
  terms: { es: "Propuesta sujeta a acuerdo sobre alcance y calendario. La grabación y la fotografía estarán sujetas a normas y permisos de cada espacio; la reutilización por terceros se acordará por separado.", en: "Proposal subject to agreement on scope and timing. Recording and photography will follow each space's rules and permissions; third-party reuse rights will be agreed separately." },
  independence: { es: "Gridiron Spain es independiente de Navy Athletics y de la U.S. Naval Academy. Entradas, experiencias y colaboración no están confirmadas.", en: "Gridiron Spain is independent from Navy Athletics and the U.S. Naval Academy. Tickets, experiences and collaboration are not confirmed." },
};
