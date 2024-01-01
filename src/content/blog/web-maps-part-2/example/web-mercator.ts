import type { LatLon, Point } from "./types.ts";

export const WebMercator = {
  MAX_LATITUDE: 85.0511287798,

  getCappedLat(lat: number) {
    return Math.max(Math.min(this.MAX_LATITUDE, lat), -this.MAX_LATITUDE);
  },

  /**
   *  Converts a geo-coordinate into a point
   *
   *                   longitude
   * x = axisSize * (----------- + 0.5)
   *                     360
   *
   *                                                 latitude
   *                        log( tan( PI * ( 0,25 + ---------- ) ) )
   *                                                   360                 1
   * y = axisSize * ( 1 - ------------------------------------------ ) *  ---
   *                                         PI                            2
   *
   *
   */
  // prettier-ignore
  project({ lat, lon }: LatLon, worldSurface: number): Point {
    const cappedLat = this.getCappedLat(lat);

    return {
      x: worldSurface * (lon / 360 + 0.5),
      y: (worldSurface * (1 - Math.log(Math.tan(Math.PI * (0.25 + cappedLat / 360))) / Math.PI)) / 2,
    };
  },

  /**
   * Converts a point into a geo-coordinate at given world surface
   *
   *                     x
   * longitude = ((-------------) - 0,5) * 360
   *                 axisSize
   *
   *                                               2y
   *                              PI * ( 1 - ------------ )
   *                     atan ( e^              axisSize   )
   * latitude = 360 * ( --------------------------------------  -  0,25 )
   *                                    PI
   */
  // prettier-ignore
  unproject({ x, y }: Point, axisSize: number): LatLon {
    const lat = 360 * (Math.atan(Math.exp(Math.PI * (1 - (2 * y) / axisSize))) / Math.PI - 0.25);
    const cappedLat = this.getCappedLat(lat);

    return {
      lon: 360 * (x / axisSize - 0.5),
      lat: cappedLat,
    };
  },
};
