/** Lower-case and strip accents so "Barberà" matches "barbera". Shared by server and client. */
export function normalize(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}
