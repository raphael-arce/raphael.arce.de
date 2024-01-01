import React, { useEffect } from "react";
import useMapStore from "./store.ts";

export function useMapResizeObserver(mapRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(([mapElement]) => {
      const oldWidth = useMapStore.getState().width;
      const newWidth = Math.round(mapElement.contentRect.width);

      if (oldWidth === newWidth) {
        return;
      }

      useMapStore.getState().setWidth(newWidth);
    });

    resizeObserver.observe(mapRef.current);

    return () => {
      resizeObserver.unobserve(mapRef.current!);
    };
  }, []);
}
