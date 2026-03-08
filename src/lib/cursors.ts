/**
 * Available cursor images and configurations.
 * Each cursor config defines hotspot offsets so the visual cursor aligns with the click point.
 */

export type CursorConfig = {
  id: string;
  src: string;
  width: number;
  height: number;
  hotspotX: number;
  hotspotY: number;
  flipX?: boolean;
};

/**
 * Cursor library - add or remove cursors here.
 * The system will randomly select from this list when the custom cursor is enabled.
 */
export const CURSORS: CursorConfig[] = [
  {
    id: "zamorak_godsword",
    src: "/images/cursors/zamorak_godsword.png",
    width: 36,
    height: 36,
    hotspotX: 4,
    hotspotY: 4,
    flipX: true,
  },
  {
    id: "dragon_dagger",
    src: "/images/cursors/dragon_dagger.png",
    width: 32,
    height: 32,
    hotspotX: 3,
    hotspotY: 3,
    flipX: true,
  },
  {
    id: "dragon_dagger_p",
    src: "/images/cursors/dragon_dagger_p.png",
    width: 32,
    height: 32,
    hotspotX: 3,
    hotspotY: 3,
    flipX: true,
  },
  {
    id: "dragon_scimitar",
    src: "/images/cursors/dragon_scimitar.png",
    width: 34,
    height: 34,
    hotspotX: 4,
    hotspotY: 4,
    flipX: true,
  },
];

/**
 * Get a random cursor from the library.
 */
export function getRandomCursor(): CursorConfig {
  return CURSORS[Math.floor(Math.random() * CURSORS.length)];
}

/**
 * Get a cursor by id, or return the first one as fallback.
 */
export function getCursorById(id: string): CursorConfig {
  return CURSORS.find((c) => c.id === id) || CURSORS[0];
}
