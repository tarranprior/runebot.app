"use client";

import { useState, useRef, useEffect, ReactNode, cloneElement, isValidElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

type Placement = "top" | "bottom" | "left" | "right";

type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
  delay?: number;
  placement?: Placement;
  disabled?: boolean;
  asChild?: boolean;
};

type TooltipPosition = {
  x: number;
  y: number;
  placement: Placement;
};

const ARROW_SIZE = 5;
const TOOLTIP_OFFSET = 10;

function calculatePosition(
  triggerRect: DOMRect,
  tooltipSize: { width: number; height: number },
  placement: Placement,
  offset: number
): TooltipPosition {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let x = 0;
  let y = 0;
  let finalPlacement = placement;

  const triggerCenterX = triggerRect.left + triggerRect.width / 2;
  const triggerCenterY = triggerRect.top + triggerRect.height / 2;

  switch (placement) {
    case "top": {
      x = triggerCenterX - tooltipSize.width / 2;
      y = triggerRect.top - tooltipSize.height - offset - ARROW_SIZE;

      // Fallback to bottom if not enough space
      if (y < 10) {
        finalPlacement = "bottom";
        y = triggerRect.bottom + offset + ARROW_SIZE;
      }
      break;
    }
    case "bottom": {
      x = triggerCenterX - tooltipSize.width / 2;
      y = triggerRect.bottom + offset + ARROW_SIZE;

      // Fallback to top if not enough space
      if (y + tooltipSize.height > viewportHeight - 10) {
        finalPlacement = "top";
        y = triggerRect.top - tooltipSize.height - offset - ARROW_SIZE;
      }
      break;
    }
    case "left": {
      x = triggerRect.left - tooltipSize.width - offset - ARROW_SIZE;
      y = triggerCenterY - tooltipSize.height / 2;

      // Fallback to right if not enough space
      if (x < 10) {
        finalPlacement = "right";
        x = triggerRect.right + offset + ARROW_SIZE;
      }
      break;
    }
    case "right": {
      x = triggerRect.right + offset + ARROW_SIZE;
      y = triggerCenterY - tooltipSize.height / 2;

      // Fallback to left if not enough space
      if (x + tooltipSize.width > viewportWidth - 10) {
        finalPlacement = "left";
        x = triggerRect.left - tooltipSize.width - offset - ARROW_SIZE;
      }
      break;
    }
  }

  // Horizontal boundary clamping
  if (x < 10) x = 10;
  if (x + tooltipSize.width > viewportWidth - 10) {
    x = viewportWidth - tooltipSize.width - 10;
  }

  // Vertical boundary clamping
  if (y < 10) y = 10;
  if (y + tooltipSize.height > viewportHeight - 10) {
    y = viewportHeight - tooltipSize.height - 10;
  }

  return { x, y, placement: finalPlacement };
}

function TooltipArrow({ placement }: { placement: Placement }) {
  // Modern rotated-square pointer design
  const arrowStyle = (placement: Placement): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: "absolute",
      width: "10px",
      height: "10px",
    };

    switch (placement) {
      case "top":
        return {
          ...baseStyle,
          bottom: "-5px",
          left: "50%",
          transform: "translateX(-50%) rotate(45deg)",
        };
      case "bottom":
        return {
          ...baseStyle,
          top: "-5px",
          left: "50%",
          transform: "translateX(-50%) rotate(45deg)",
        };
      case "left":
        return {
          ...baseStyle,
          left: "-5px",
          top: "50%",
          transform: "translateY(-50%) rotate(45deg)",
        };
      case "right":
        return {
          ...baseStyle,
          right: "-5px",
          top: "50%",
          transform: "translateY(-50%) rotate(45deg)",
        };
    }
  };

  return (
    <div
      style={arrowStyle(placement)}
      className="bg-white dark:bg-[#1e1f22]"
      aria-hidden="true"
    />
  );
}

export function Tooltip({
  children,
  content,
  delay = 300,
  placement = "top",
  disabled = false,
  asChild = false,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [positionReady, setPositionReady] = useState(false);
  const [position, setPosition] = useState<TooltipPosition>({
    x: 0,
    y: 0,
    placement,
  });
  const [mounted, setMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset positionReady when visibility changes
  useEffect(() => {
    if (!isVisible) {
      setPositionReady(false);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    }
  }, [isVisible]);

  const calculateAndSetPosition = () => {
    if (!triggerRef.current || !tooltipRef.current || disabled) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const newPosition = calculatePosition(
      triggerRect,
      {
        width: tooltipRect.width,
        height: tooltipRect.height,
      },
      placement,
      TOOLTIP_OFFSET
    );

    setPosition(newPosition);
    setPositionReady(true);
  };

  // Calculate position once tooltip mounts and is visible
  useEffect(() => {
    if (isVisible && !positionReady && tooltipRef.current) {
      // Use requestAnimationFrame to ensure measurements are available
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        calculateAndSetPosition();
      });

      return () => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    }
  }, [isVisible, positionReady, disabled, placement]);

  const handleMouseEnter = () => {
    if (disabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleFocus = () => {
    if (disabled) return;
    setIsVisible(true);
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible && positionReady) {
      const handleResize = () => {
        calculateAndSetPosition();
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleResize, true);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleResize, true);
      };
    }
  }, [isVisible, positionReady]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const visibleTooltip = isVisible && mounted && positionReady && (
    <AnimatePresence>
      <motion.div
        ref={tooltipRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          duration: 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="pointer-events-none fixed z-[9999]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        role="tooltip"
      >
        <div className="relative rounded-[6px] border border-black/[0.08] bg-white px-2 py-1.5 text-[13px] font-medium text-[#2e3338] shadow-[0_8px_24px_rgba(0,0,0,0.12)] dark:border-white/[0.08] dark:bg-[#1e1f22] dark:text-[#dbdee1] dark:shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
          {content}
          <TooltipArrow placement={position.placement} />
        </div>
      </motion.div>
    </AnimatePresence>
  );

  // Invisible tooltip for initial measurement while positionReady is false
  const invisibleTooltip = isVisible && mounted && !positionReady && (
    <div
      ref={tooltipRef}
      className="pointer-events-none fixed z-[9999] opacity-0"
      style={{
        left: "0px",
        top: "0px",
        pointerEvents: "none",
      }}
      role="tooltip"
    >
      <div className="relative rounded-[6px] border border-black/[0.08] bg-white px-2 py-1.5 text-[13px] font-medium text-[#2e3338] shadow-[0_8px_24px_rgba(0,0,0,0.12)] dark:border-white/[0.08] dark:bg-[#1e1f22] dark:text-[#dbdee1] dark:shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
        {content}
        <TooltipArrow placement={position.placement} />
      </div>
    </div>
  );

  const tooltipContent = (
    <>
      {visibleTooltip}
      {invisibleTooltip}
    </>
  );

  // When asChild is true, clone the child and add event handlers directly
  if (asChild && isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    const trigger = cloneElement(child, {
      ref: triggerRef,
      onMouseEnter: (e: React.MouseEvent) => {
        handleMouseEnter();
        child.props.onMouseEnter?.(e);
      },
      onMouseLeave: (e: React.MouseEvent) => {
        handleMouseLeave();
        child.props.onMouseLeave?.(e);
      },
      onFocus: (e: React.FocusEvent) => {
        handleFocus();
        child.props.onFocus?.(e);
      },
      onBlur: (e: React.FocusEvent) => {
        handleBlur();
        child.props.onBlur?.(e);
      },
    });

    return (
      <>
        {trigger}
        {mounted && createPortal(tooltipContent, document.body)}
      </>
    );
  }

  // Default: wrap in a div
  return (
    <>
      <div
        ref={triggerRef as React.RefObject<HTMLDivElement>}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="inline-block"
      >
        {children}
      </div>
      {mounted && createPortal(tooltipContent, document.body)}
    </>
  );
}
