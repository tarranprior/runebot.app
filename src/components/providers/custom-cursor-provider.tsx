"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { CursorConfig, getRandomCursor, CURSORS } from "@/lib/cursors";
import { preloadCursors, preloadCursor } from "@/lib/cursor-preloader";

type CursorContextType = {
  isCursorEnabled: boolean;
  selectedCursor: CursorConfig;
  lastPointerPosition: { x: number; y: number } | null;
  isLoadingCursor: boolean;
  setCursorEnabled: (enabled: boolean) => Promise<void>;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CustomCursorProvider({ children }: { children: ReactNode }) {
  const [isCursorEnabled, setCursorEnabledState] = useState(false);
  const [selectedCursor, setSelectedCursor] = useState<CursorConfig>(() =>
    getRandomCursor()
  );
  const [lastPointerPosition, setLastPointerPosition] = useState<{ x: number; y: number } | null>(null);
  const [isLoadingCursor, setIsLoadingCursor] = useState(false);

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

  const setCursorEnabled = useCallback(async (enabled: boolean) => {
    if (enabled) {
      setIsLoadingCursor(true);
      try {
        const newCursor = getRandomCursor();
        // Ensure the cursor is loaded before switching
        await preloadCursor(newCursor.src);
        setSelectedCursor(newCursor);
        setCursorEnabledState(true);
      } catch (error) {
        console.error("Failed to load cursor:", error);
      } finally {
        setIsLoadingCursor(false);
      }
    } else {
      setCursorEnabledState(false);
    }
  }, []);

  return (
    <CursorContext.Provider
      value={{ isCursorEnabled, selectedCursor, lastPointerPosition, isLoadingCursor, setCursorEnabled }}
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
