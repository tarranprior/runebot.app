import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type LoadingOverlayProps = {
  /**
   * Controls visibility. When false the overlay is rendered but fully
   * transparent so opacity transitions work without conditional mounting.
   */
  active?: boolean;
  /**
   * overlay — sits absolutely over an existing positioned container.
   * standalone — fills its parent flex/grid cell; for empty loading pages.
   */
  variant?: "overlay" | "standalone";
  className?: string;
};

/**
 * Consistent loading indicator used across server-driven transitions.
 * Keeps existing content visible behind a subtle blur/dim while pending.
 */
export function LoadingOverlay({
  active = true,
  variant = "overlay",
  className,
}: LoadingOverlayProps) {
  const isOverlay = variant === "overlay";

  return (
    <div
      className={cn(
        "z-10 flex items-center justify-center bg-background/40 backdrop-blur-[2px] transition-opacity duration-150",
        isOverlay ? "absolute inset-0" : "flex-1",
        active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        className,
      )}
      aria-hidden={!active}
    >
      <Loader2 className="h-5 w-5 animate-spin text-accent" aria-hidden="true" />
    </div>
  );
}
