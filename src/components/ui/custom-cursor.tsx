"use client";

import { useEffect, useState } from "react";
import { useCustomCursor } from "@/components/providers/custom-cursor-provider";

export function CustomCursor() {
  const { isCursorEnabled, displayedCursor, lastPointerPosition } = useCustomCursor();
  const [isDesktop, setIsDesktop] = useState(false);

  const setCursorClasses = (enabled: boolean) => {
    const html = document.documentElement;
    const body = document.body;

    if (enabled) {
      html.classList.add("custom-cursor-enabled");
      body.classList.add("custom-cursor-enabled");
      return;
    }

    html.classList.remove("custom-cursor-enabled");
    body.classList.remove("custom-cursor-enabled");
  };

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    setIsDesktop(hasFinePointer);
  }, []);

  useEffect(() => {
    if (!isCursorEnabled || !isDesktop) {
      setCursorClasses(false);
      return;
    }

    setCursorClasses(true);

    return () => {
      setCursorClasses(false);
    };
  }, [isCursorEnabled, isDesktop]);

  const isCursorRenderable =
    isCursorEnabled && isDesktop && Boolean(displayedCursor) && Boolean(lastPointerPosition);

  if (!isCursorRenderable || !lastPointerPosition) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{
        left: lastPointerPosition.x - displayedCursor.hotspotX,
        top: lastPointerPosition.y - displayedCursor.hotspotY,
      }}
    >
      <img
        src={displayedCursor.src}
        alt=""
        width={displayedCursor.width}
        height={displayedCursor.height}
        draggable={false}
        style={{ display: "block" }}
      />
    </div>
  );
}

