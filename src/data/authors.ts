import type { Author } from "@/types";
import { site } from "@/lib/site";

export const authors: Author[] = [
  {
    id: "jordi-sanchez",
    name: site.author.name,
    role: { es: "Fundador y editor", en: "Founder and editor" },
    url: site.author.url,
  },
];
