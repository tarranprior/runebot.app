"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type SiteNoticeProps = {
  /**
   * Unique stable identifier for this notice (e.g., "privacy-policy-2026-05-17").
   * Used as the key for localStorage dismissal persistence.
   */
  noticeId: string;

  /**
   * Short title/heading for the notice.
   */
  title: string;

  /**
   * Main message text.
   */
  message: string;

  /**
   * Label for the primary action button (e.g., "Read Privacy Policy").
   */
  actionLabel?: string;

  /**
   * URL/href for the primary action (e.g., "/privacy").
   */
  actionUrl?: string;

  /**
   * Label for the dismiss button (default: "OK").
   */
  dismissLabel?: string;

  /**
   * Optional callback when the notice is dismissed.
   */
  onDismiss?: () => void;

  /**
   * Optional additional className for the outer wrapper.
   */
  className?: string;
};

/**
 * Reusable site-wide notice/banner component for announcements and policy updates.
 * Renders as a bottom-floating card with optional action and dismiss button.
 * Persists dismissal in localStorage so the same notice does not reappear.
 */
export function SiteNotice({
  noticeId,
  title,
  message,
  actionLabel,
  actionUrl,
  dismissLabel = "OK",
  onDismiss,
  className,
}: SiteNoticeProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Defer state initialization to avoid hydration mismatch
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const isDismissed = localStorage.getItem(`runebot:notice:dismissed:${noticeId}`) === "1";
        setIsVisible(!isDismissed);
      } catch {
        // localStorage unavailable (private mode, etc.); show notice by default
        setIsVisible(true);
      }
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [noticeId]);

  const handleDismiss = () => {
    try {
      localStorage.setItem(`runebot:notice:dismissed:${noticeId}`, "1");
    } catch {
      // localStorage unavailable; silently continue
    }
    setIsVisible(false);
    onDismiss?.();
  };

  if (!mounted || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={cn("fixed bottom-0 left-0 right-0 z-40 w-full px-4 py-4 sm:px-6 sm:py-6", className)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 overflow-hidden rounded-[28px] border border-[rgba(29,30,40,0.12)] bg-[rgba(243,243,246,0.86)] px-5 py-4 shadow-[0_10px_30px_rgba(29,30,40,0.15)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(17,17,19,0.82)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.30)]">
            {/* Content */}
            <div className="flex-1">
              <h3 className="text-base font-semibold text-foreground">
                {title}
              </h3>
              <div className="mt-1 text-sm text-foreground/70">
                <ReactMarkdown
                  components={{
                    p: ({ ...props }) => <p className="text-foreground/70" {...props} />,
                    a: ({ href, children, ...props }) => (
                      <a
                        href={href}
                        onClick={handleDismiss}
                        className="text-accent underline-offset-2 transition hover:underline"
                        {...(href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        {...props}
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {message}
                </ReactMarkdown>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              {actionUrl && actionLabel && (
                <Link
                  href={actionUrl}
                  onClick={handleDismiss}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90"
                >
                  {actionLabel}
                </Link>
              )}

              <button
                type="button"
                onClick={handleDismiss}
                aria-label={dismissLabel}
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-surface-border bg-surface/70 px-4 py-2.5 text-sm font-medium text-foreground/80 transition hover:bg-surface hover:text-foreground dark:border-white/10 dark:bg-white/5 dark:text-foreground/80 dark:hover:bg-white/10 dark:hover:text-foreground"
              >
                {dismissLabel}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
