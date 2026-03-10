/**
 * Cursor preloader utility
 * Ensures .cur files are loaded before being displayed
 */

const preloadedCursors = new Set<string>();
const loadingPromises = new Map<string, Promise<void>>();

/**
 * Preload a single cursor file
 */
export function preloadCursor(src: string): Promise<void> {
  // Already preloaded
  if (preloadedCursors.has(src)) {
    return Promise.resolve();
  }

  // Currently loading
  if (loadingPromises.has(src)) {
    return loadingPromises.get(src)!;
  }

  // Start new load
  const promise = new Promise<void>((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      preloadedCursors.add(src);
      loadingPromises.delete(src);
      resolve();
    };

    img.onerror = () => {
      loadingPromises.delete(src);
      reject(new Error(`Failed to load cursor: ${src}`));
    };

    img.src = src;
  });

  loadingPromises.set(src, promise);
  return promise;
}

/**
 * Preload multiple cursor files
 */
export function preloadCursors(sources: string[]): Promise<void[]> {
  return Promise.all(sources.map(preloadCursor));
}

/**
 * Check if a cursor is already preloaded
 */
export function isCursorPreloaded(src: string): boolean {
  return preloadedCursors.has(src);
}
