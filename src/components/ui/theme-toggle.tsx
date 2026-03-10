"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Tooltip } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        disabled
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface/70 text-foreground/60 cursor-pointer"
      >
        <span className="h-4 w-4 rounded-full bg-foreground/35" />
      </button>
    );
  }

  const isDark = resolvedTheme !== "light";

  return (
      <button
        type="button"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface/70 text-foreground transition hover:bg-surface cursor-pointer"
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
  );
}
