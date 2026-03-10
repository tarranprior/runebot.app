"use client";

import { useEffect, useState } from "react";
import { MousePointer2, Loader2 } from "lucide-react";
import { useCustomCursor } from "@/components/providers/custom-cursor-provider";
import { Tooltip } from "@/components/ui/tooltip";

export function CursorToggle() {
  const { isCursorEnabled, isLoadingCursor, setCursorEnabled } = useCustomCursor();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const handleToggle = async () => {
    await setCursorEnabled(!isCursorEnabled);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle custom cursor"
        disabled
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface/70 text-foreground/60"
      >
        <span className="h-4 w-4 rounded-full bg-foreground/35" />
      </button>
    );
  }

  return (
      <button
        type="button"
        aria-label={isCursorEnabled ? "Disable custom cursor" : "Enable custom cursor"}
        onClick={handleToggle}
        disabled={isLoadingCursor}
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface/70 transition hover:bg-surface ${
          isCursorEnabled ? "text-foreground" : "text-foreground/100"
        } ${isLoadingCursor ? "opacity-70 cursor-wait" : ""}`}
      >
        {isLoadingCursor ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <MousePointer2 className="h-4 w-4" />
        )}
      </button>
  );
}
