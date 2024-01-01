import React, { useEffect } from "react";
import { type Map } from "./store.ts";

export function useMapResizeObserver(
  mapRef: React.RefObject<HTMLDivElement>,
  mapStore: Map,
) {
  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(([mapElement]) => {
      const newWidth = Math.round(mapElement.contentRect.width);

      if (mapStore.width === newWidth) {
        return;
      }

      mapStore.setWidth(newWidth);
    });

    resizeObserver.observe(mapRef.current);

    return () => {
      resizeObserver.unobserve(mapRef.current!);
    };
  }, []);
}
