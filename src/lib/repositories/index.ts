import { cache } from "react";
import type { ContentRepository } from "./types";
import { LocalContentRepository } from "./local";

/**
 * Entry point used by pages and components.
 * Swap the implementation here when moving to Payload CMS or PostgreSQL.
 */
export const getRepository = cache((): ContentRepository => new LocalContentRepository());

export type { ContentRepository };
