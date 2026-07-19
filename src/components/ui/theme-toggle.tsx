"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
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
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface/70 text-foreground/60",
          className,
        )}
      >
        <span className="h-4 w-4 rounded-full bg-foreground/35" />
      </button>
    );
  }

  const currentTheme = theme === "light" || theme === "dark" ? theme : "system";
  const nextTheme =
    currentTheme === "system"
      ? "light"
      : currentTheme === "light"
        ? "dark"
        : "system";

  const labels = {
    system: "Use system theme",
    light: "Switch to light mode",
    dark: "Switch to dark mode",
  } as const;

  return (
    <button
      type="button"
      aria-label={labels[nextTheme]}
      title={labels[nextTheme]}
      onClick={() => setTheme(nextTheme)}
      className={cn(
        "inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-surface-border bg-surface/70 text-foreground transition hover:bg-surface",
        className,
      )}
    >
      {nextTheme === "system" ? (
        <Monitor className="h-4 w-4" />
      ) : nextTheme === "light" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
