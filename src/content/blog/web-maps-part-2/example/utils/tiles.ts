import type { Map } from "../store.ts";

function getTileUrl({
  zoom,
  tx,
  ty,
}: {
  zoom: number;
  tx: number;
  ty: number;
}) {
  return `https://tile.osm.org/${zoom}/${tx}/${ty}.png`;
}

function getTileStyle({
  tx,
  x,
  ty,
  y,
}: {
  tx: number;
  x: number;
  ty: number;
  y: number;
}) {
  // prettier-ignore
  return `position:absolute;left:${tx * 256 - x}px;top:${ty * 256 - y}px;user-drag:none;user-select:none;-moz-user-select:none;-webkit-user-drag:none;-webkit-user-select:none;-ms-user-select:none;`;
}

export function getTiles(store: Map) {
  const axisSize = 256 * Math.pow(2, store.zoom);
  // prettier-ignore
  const x = (axisSize * (store.center.lon / 360 + 0.5) - store.width / 2) | 0;
  // prettier-ignore
  const y = (axisSize * (1 - Math.log(Math.tan(Math.PI * (0.25 + store.center.lat / 360))) / Math.PI)) / 2 - store.height / 2 | 0;

  const tiles = [];

  for (let ty = (y / 256) | 0; ty * 256 < y + store.height; ty++) {
    for (let tx = (x / 256) | 0; tx * 256 < x + store.width; tx++) {
      tiles.push([
        getTileUrl({ zoom: store.zoom, tx, ty }),
        getTileStyle({ tx, x, ty, y }),
      ]);
    }
  }

  return tiles;
}
