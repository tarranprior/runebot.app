"use client";

import { useEffect, useState } from "react";
import { useCustomCursor } from "@/components/providers/custom-cursor-provider";

export function CustomCursor() {
  const { isCursorEnabled, selectedCursor, lastPointerPosition } = useCustomCursor();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if device has fine pointer (desktop)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    setIsDesktop(hasFinePointer);
  }, []);

  useEffect(() => {
    if (!isCursorEnabled || !isDesktop) {
      document.body.style.cursor = "";
      document.body.classList.remove("custom-cursor-enabled");
      return;
    }

    document.body.style.cursor = "none";
    document.body.classList.add("custom-cursor-enabled");

    return () => {
      document.body.style.cursor = "";
      document.body.classList.remove("custom-cursor-enabled");
    };
  }, [isCursorEnabled, isDesktop]);

  const isCursorRenderable =
    isCursorEnabled && isDesktop && Boolean(selectedCursor) && Boolean(lastPointerPosition);

  if (!isCursorRenderable || !lastPointerPosition) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{
        left: lastPointerPosition.x - selectedCursor.hotspotX,
        top: lastPointerPosition.y - selectedCursor.hotspotY,
      }}
    >
      <img
        src={selectedCursor.src}
        alt=""
        width={selectedCursor.width}
        height={selectedCursor.height}
        draggable={false}
        style={{ display: "block" }}
      />
    </div>
  );
}

