import useMapStore from "./store.ts";
import { getTiles } from "./utils/tiles.ts";
import { getCursorPosition, handlePan } from "./utils/pan.ts";
import { useRef } from "react";
import type { Point } from "./types.ts";
import { useMapResizeObserver } from "./hooks/useMapResizeObserver.ts";
import { useTouchListeners } from "./hooks/useTouchListeners.ts";

let panBegin: Point | undefined = undefined;

export default function PanMap() {
  const mapStore = useMapStore((state) => state);
  const mapRef = useRef<HTMLDivElement>(null);
  const tiles = getTiles(mapStore);

  useMapResizeObserver(mapRef);
  useTouchListeners(mapRef);

  return (
    <div className="not-prose">
      <div className="flex h-full w-full justify-center">
        <div
          className="absolute z-10 h-[300px] w-[300px] cursor-pointer sm:w-[400px]"
          ref={mapRef}
          onMouseDown={(e) => {
            if (panBegin || e.button !== 0) {
              return;
            }

            panBegin = getCursorPosition(e);
          }}
          onMouseMove={(e) => {
            if (!panBegin) {
              return;
            }

            const panEnd = getCursorPosition(e);

            handlePan({ panBegin, panEnd });

            panBegin = panEnd;
          }}
          onMouseUp={(e) => {
            if (e.button !== 0) {
              return;
            }

            panBegin = undefined;
          }}
        />
      </div>

      <div
        className="mx-auto"
        style={{
          width: mapStore.width,
          height: mapStore.height,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {tiles.map(([tileUrl, tileStyle]) => (
          <div
            key={tileUrl}
            dangerouslySetInnerHTML={{
              __html: `<img
            src=${tileUrl}
            style=${tileStyle}
            draggable={false}
            alt="Tile displaying a part of a map"
          />`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
