import React from "react";
import type { LatLon, Point } from "../types.ts";
import { WebMercator } from "./web-mercator.ts";
import useMapStore from "../store.ts";

export function handlePan({
  panBegin,
  panEnd,
}: {
  panBegin: Point;
  panEnd: Point;
}) {
  const map = useMapStore.getState();

  const panDifference = {
    x: panBegin.x - panEnd.x,
    y: panBegin.y - panEnd.y,
  };

  const cartesianCoordinatesOldCenter = getCartesianCoordinates(
    map.center,
    map.zoom,
  );

  const cartesianCoordinatesNewCenter = {
    x: cartesianCoordinatesOldCenter.x + panDifference.x,
    y: cartesianCoordinatesOldCenter.y + panDifference.y,
  };

  const newCenter = WebMercator.unproject(
    cartesianCoordinatesNewCenter,
    256 * Math.pow(2, map.zoom),
  );

  useMapStore.setState({
    center: {
      lon: newCenter.lon,
      lat: newCenter.lat,
    },
  });
}

function getCartesianCoordinates(latLon: LatLon, zoomLevel: number) {
  const axisSize = 256 * Math.pow(2, zoomLevel);

  return WebMercator.project(latLon, axisSize);
}

export function getCursorPosition(
  event: React.MouseEvent<HTMLDivElement>,
): Point {
  const target = event.target;

  const rect = (target as Element).getBoundingClientRect();

  const x = Math.round(event.clientX - rect.left);
  const y = Math.round(event.clientY - rect.top);

  return { x, y };
}

export function getTouchPosition(event: TouchEvent): Point {
  const touch = event.touches[0];

  const rect = (touch.target as Element).getBoundingClientRect();

  const x = Math.round(touch.clientX - rect.left);
  const y = Math.round(touch.clientY - rect.top);

  return { x, y };
}
