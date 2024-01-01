import React, { useEffect } from "react";
import type { Point } from "../types.ts";
import { getTouchPosition, handlePan } from "../utils/pan.ts";

export function useTouchListeners(mapRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const src = mapRef.current;

    let panBegin: Point | undefined;

    const touchStartListener = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (panBegin) {
        return;
      }

      document.body.style.overflow = "hidden";

      panBegin = getTouchPosition(e);
    };

    const touchMoveListener = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!panBegin) {
        return;
      }

      const panEnd = getTouchPosition(e);

      handlePan({ panBegin, panEnd });

      panBegin = panEnd;
    };

    const touchEndListener = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      panBegin = undefined;

      document.body.style.overflow = "auto";
    };

    src.addEventListener("touchstart", touchStartListener);
    src.addEventListener("touchmove", touchMoveListener);
    src.addEventListener("touchend", touchEndListener);

    return () => {
      src.removeEventListener("touchstart", touchStartListener);
      src.removeEventListener("touchmove", touchMoveListener);
      src.removeEventListener("touchend", touchEndListener);
    };
  }, []);
}
