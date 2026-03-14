"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useEffect, useRef } from "react";
import { CursorConfig, getRandomCursor, CURSORS } from "@/lib/cursors";
import { preloadCursors, preloadCursor } from "@/lib/cursor-preloader";

type CursorContextType = {
  isCursorEnabled: boolean;
  selectedCursor: CursorConfig;
  displayedCursor: CursorConfig;
  lastPointerPosition: { x: number; y: number } | null;
  isLoadingCursor: boolean;
  isShuffling: boolean;
  setCursorEnabled: (enabled: boolean) => Promise<void>;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

function buildShuffleDelays(steps = 18, minDelay = 45, maxDelay = 210): number[] {
  return Array.from({ length: steps }, (_, index) => {
    const progress = index / Math.max(steps - 1, 1);
    const eased = progress * progress;
    return Math.round(minDelay + (maxDelay - minDelay) * eased);
  });
}

function getPreviewCursor(
  previousId: string,
  finalId: string,
  allowFinal: boolean,
): CursorConfig {
  const pool = CURSORS.filter(
    (cursor) => cursor.id !== previousId && (allowFinal || cursor.id !== finalId),
  );

  if (pool.length === 0) {
    return CURSORS.find((cursor) => cursor.id === finalId) ?? getRandomCursor();
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

export function CustomCursorProvider({ children }: { children: ReactNode }) {
  const [isCursorEnabled, setCursorEnabledState] = useState(false);
  const [selectedCursor, setSelectedCursor] = useState<CursorConfig>(() => getRandomCursor());
  const [displayedCursor, setDisplayedCursor] = useState<CursorConfig>(selectedCursor);
  const [lastPointerPosition, setLastPointerPosition] = useState<{ x: number; y: number } | null>(null);
  const [isLoadingCursor, setIsLoadingCursor] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const shuffleTimeoutsRef = useRef<number[]>([]);

  const clearShuffleTimeouts = useCallback(() => {
    for (const timeoutId of shuffleTimeoutsRef.current) {
      window.clearTimeout(timeoutId);
    }
    shuffleTimeoutsRef.current = [];
  }, []);

  // Preload all cursor assets on mount
  useEffect(() => {
    const cursorSources = CURSORS.map((cursor) => cursor.src);
    preloadCursors(cursorSources).catch((error) => {
      console.warn("Failed to preload some cursors:", error);
    });
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      setLastPointerPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  useEffect(() => {
    return () => {
      clearShuffleTimeouts();
    };
  }, [clearShuffleTimeouts]);

  const setCursorEnabled = useCallback(
    async (enabled: boolean) => {
      if (!enabled) {
        clearShuffleTimeouts();
        setIsShuffling(false);
        setIsLoadingCursor(false);
        setDisplayedCursor(selectedCursor);
        setCursorEnabledState(false);
        return;
      }

      if (isLoadingCursor || isShuffling) {
        return;
      }

      setIsLoadingCursor(true);
      setIsShuffling(true);
      setCursorEnabledState(true);

      const finalCursor = getRandomCursor();
      const shuffleDelays = buildShuffleDelays();
      let step = 0;
      let previousCursorId = displayedCursor.id;

      const runShuffleStep = () => {
        if (step >= shuffleDelays.length) {
          setDisplayedCursor(finalCursor);
          setSelectedCursor(finalCursor);
          setIsShuffling(false);
          setIsLoadingCursor(false);
          return;
        }

        const remainingSteps = shuffleDelays.length - step;
        const allowFinalInPreview = remainingSteps <= 2;
        const previewCursor = getPreviewCursor(
          previousCursorId,
          finalCursor.id,
          allowFinalInPreview,
        );

        previousCursorId = previewCursor.id;
        setDisplayedCursor(previewCursor);

        const timeoutId = window.setTimeout(runShuffleStep, shuffleDelays[step]);
        shuffleTimeoutsRef.current.push(timeoutId);
        step += 1;
      };

      try {
        await preloadCursor(finalCursor.src);
        clearShuffleTimeouts();
        runShuffleStep();
      } catch (error) {
        console.error("Failed to load cursor:", error);
        setDisplayedCursor(selectedCursor);
        setIsShuffling(false);
        setIsLoadingCursor(false);
        setCursorEnabledState(false);
      }
    },
    [clearShuffleTimeouts, displayedCursor.id, isLoadingCursor, isShuffling, selectedCursor],
  );

  return (
    <CursorContext.Provider
      value={{
        isCursorEnabled,
        selectedCursor,
        displayedCursor,
        lastPointerPosition,
        isLoadingCursor,
        isShuffling,
        setCursorEnabled,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCustomCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error("useCustomCursor must be used within CustomCursorProvider");
  }
  return context;
}
