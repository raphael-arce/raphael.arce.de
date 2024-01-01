import useMapStore from "./store.ts";
import { getTiles } from "./utils/tiles.ts";
import { handleZoomIn, handleZoomOut } from "./utils.ts";

let timeoutId: number;

export default function ZoomMap() {
  const mapStore = useMapStore((state) => state);
  const tiles = getTiles(mapStore);

  return (
    <div className="not-prose relative">
      <div className="flex h-full w-full justify-center">
        <div
          className="absolute z-10 h-[300px] w-[400px]"
          onClick={(e) => {
            if (timeoutId) {
              return;
            }

            timeoutId = setTimeout(() => {
              handleZoomIn(e, mapStore);
              timeoutId = 0;
            }, 200) as unknown as number;
          }}
          onDoubleClick={(e) => {
            clearTimeout(timeoutId);
            timeoutId = 0;

            setTimeout(() => handleZoomOut(e, mapStore), 200);
          }}
        ></div>
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
            style={{ width: 256, height: 256 }}
            dangerouslySetInnerHTML={{
              __html: `<img
            src=${tileUrl}
            width={256}
            height={256}
            //@ts-ignore
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
