"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { CursorConfig, getRandomCursor } from "@/lib/cursors";

type CursorContextType = {
  isCursorEnabled: boolean;
  selectedCursor: CursorConfig;
  lastPointerPosition: { x: number; y: number } | null;
  setCursorEnabled: (enabled: boolean) => void;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CustomCursorProvider({ children }: { children: ReactNode }) {
  const [isCursorEnabled, setCursorEnabledState] = useState(false);
  const [selectedCursor, setSelectedCursor] = useState<CursorConfig>(() =>
    getRandomCursor()
  );
  const [lastPointerPosition, setLastPointerPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      setLastPointerPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  const setCursorEnabled = useCallback((enabled: boolean) => {
    setCursorEnabledState(enabled);
    if (enabled) {
      // Randomize cursor each time user enables the custom cursor
      setSelectedCursor(getRandomCursor());
    }
  }, []);

  return (
    <CursorContext.Provider
      value={{ isCursorEnabled, selectedCursor, lastPointerPosition, setCursorEnabled }}
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
