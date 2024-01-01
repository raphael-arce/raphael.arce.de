import React from "react";
import useMapStore, { type Map } from "../store.ts";
import type { LatLon, Point } from "../types.ts";
import { WebMercator } from "./web-mercator.ts";

export function handleZoomIn(e: React.MouseEvent<HTMLDivElement>, map: Map) {
  if (map.zoom >= 18) {
    return;
  }

  const cursorPostion = getCursorPosition(e);

  const center = { x: map.width / 2, y: map.height / 2 };

  const midpoint = {
    x: (cursorPostion.x + center.x) / 2,
    y: (cursorPostion.y + center.y) / 2,
  };

  const differenceToCenter = {
    x: center.x - midpoint.x,
    y: center.y - midpoint.y,
  };

  const cartesianCoordinatesOldCenter = getCartesianCoordinates(
    map.center,
    map.zoom,
  );

  const cartesianCoordinatesNewCenter = {
    x: cartesianCoordinatesOldCenter.x - differenceToCenter.x,
    y: cartesianCoordinatesOldCenter.y - differenceToCenter.y,
  };

  const newCenter = WebMercator.unproject(
    cartesianCoordinatesNewCenter,
    256 * Math.pow(2, map.zoom),
  );

  const rounded = {
    lat: Math.round(newCenter.lat * 1000) / 1000,
    lon: Math.round(newCenter.lon * 1000) / 1000,
  };

  useMapStore.setState({
    zoom: map.zoom + 1,
    center: rounded,
  });
}

export function handleZoomOut(e: React.MouseEvent<HTMLDivElement>, map: Map) {
  if (map.zoom <= 10) {
    return;
  }

  const cursorPostion = getCursorPosition(e);

  const oldContainerCenter = { x: map.width / 2, y: map.height / 2 };

  const newContainerCenter = {
    x: 2 * oldContainerCenter.x - cursorPostion.x,
    y: 2 * oldContainerCenter.y - cursorPostion.y,
  };

  const differenceToCenter = {
    x: oldContainerCenter.x - newContainerCenter.x,
    y: oldContainerCenter.y - newContainerCenter.y,
  };

  const cartesianCoordinatesOldCenter = getCartesianCoordinates(
    map.center,
    map.zoom,
  );

  const cartesianCoordinatesNewCenter = {
    x: cartesianCoordinatesOldCenter.x - differenceToCenter.x,
    y: cartesianCoordinatesOldCenter.y - differenceToCenter.y,
  };

  const newCenter = WebMercator.unproject(
    cartesianCoordinatesNewCenter,
    256 * Math.pow(2, map.zoom),
  );

  useMapStore.setState({
    zoom: map.zoom - 1,
    center: newCenter,
  });
}

function getCartesianCoordinates(latLon: LatLon, zoomLevel: number) {
  const axisSize = 256 * Math.pow(2, zoomLevel);

  return WebMercator.project(latLon, axisSize);
}

function getCursorPosition(event: React.MouseEvent<HTMLDivElement>): Point {
  const target = event.target;

  const rect = (target as Element).getBoundingClientRect();

  const x = Math.round(event.clientX - rect.left);
  const y = Math.round(event.clientY - rect.top);

  return { x, y };
}
