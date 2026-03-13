"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
};

export function CountUp({ value, suffix = "", durationMs = 900, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (!isInView) {
      return;
    }

    const startValue = 0;
    const endValue = Math.max(0, Math.floor(value));
    const startedAt = performance.now();
    let animationFrame = 0;

    const tick = (timestamp: number) => {
      const elapsed = timestamp - startedAt;
      const progress = Math.min(1, elapsed / durationMs);
      const nextValue = Math.round(startValue + (endValue - startValue) * progress);
      setDisplayValue(nextValue);

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [durationMs, isInView, prefersReducedMotion, value]);

  const visibleValue = prefersReducedMotion ? Math.max(0, Math.floor(value)) : displayValue;

  const formattedValue = useMemo(
    () => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(visibleValue),
    [visibleValue],
  );

  return (
    <span ref={ref} className={className}>
      {formattedValue}
      {suffix}
    </span>
  );
}
