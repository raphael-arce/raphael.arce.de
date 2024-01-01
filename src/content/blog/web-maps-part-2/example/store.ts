import { create } from "zustand";
import type { LatLon } from "./types.ts";

export type Map = {
  zoom: number;
  center: LatLon;
  width: number;
  height: number;
  maxZoom: number;
  minZoom: number;
};

const useMapStore = create<Map>(() => ({
  zoom: 14,
  center: {
    lat: 52.52,
    lon: 13.4,
  },
  width: 400,
  height: 300,
  maxZoom: 18,
  minZoom: 10,
}));

export type Store = typeof useMapStore;

export default useMapStore;
