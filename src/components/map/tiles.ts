/** Tile provider configuration shared by the map and the pages that preconnect to it. */
export const DEFAULT_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
export const TILE_URL = process.env.NEXT_PUBLIC_MAP_TILE_URL ?? DEFAULT_TILE_URL;
export const TILE_ATTRIBUTION =
  process.env.NEXT_PUBLIC_MAP_TILE_ATTRIBUTION ??
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
export const USING_OSM = TILE_URL === DEFAULT_TILE_URL;
export const TILE_ORIGIN = new URL(TILE_URL.replace(/\{[^}]+\}/g, "x")).origin;
