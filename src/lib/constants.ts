export const TOTAL_FRAMES = 240;
export const LOCK_FRAME = 155;
export const SCROLL_HEIGHT = 4000;
export const FRAME_DIR = "/frames/buto-mimarlik-villa-mimarisi-sahne-";
export const FRAME_EXT = ".webp";

export function getFrameUrl(index: number): string {
  return `${FRAME_DIR}${String(index + 1).padStart(4, "0")}${FRAME_EXT}`;
}
