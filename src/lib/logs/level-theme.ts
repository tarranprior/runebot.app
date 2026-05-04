import type { LogLevel } from "@/lib/logs/types";

export const LOG_LEVEL_TEXT_STYLES: Record<LogLevel, string> = {
  DEBUG: "text-foreground/48 dark:text-foreground/42",
  INFO: "text-[#6a74f6] dark:text-[#8d96ff]",
  SUCCESS: "text-[#5a66ef] dark:text-[#9ba3ff]",
  WARNING: "text-[#4b58dc] dark:text-[#aeb5ff]",
  ERROR: "text-[#3d49c7] dark:text-[#c2c8ff]",
  CRITICAL: "text-[#323ca8] dark:text-[#d1d5ff]",
  UNKNOWN: "text-foreground/60",
};

export const LOG_LEVEL_FILTER_THEME = {
  debug: {
    label: "Debug",
    activeClassName:
      "bg-foreground/[0.07] text-foreground/60 dark:bg-white/[0.08] dark:text-foreground/54",
  },
  info: {
    label: "Info",
    activeClassName:
      "bg-[#5865f2]/14 text-[#4f5bdd] dark:bg-[#5865f2]/24 dark:text-[#cfd4ff]",
  },
  success: {
    label: "Success",
    activeClassName:
      "bg-[#5865f2]/22 text-[#4450ca] dark:bg-[#5865f2]/30 dark:text-[#d6daff]",
  },
  warning: {
    label: "Warning",
    activeClassName:
      "bg-[#5865f2]/30 text-[#3642b3] dark:bg-[#5865f2]/36 dark:text-[#e0e3ff]",
  },
  error: {
    label: "Error",
    activeClassName:
      "bg-[#3f49c7] text-white dark:bg-[#5a66ef] dark:text-white",
  },
} as const;
