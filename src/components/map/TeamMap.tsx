"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MapPin } from "./map-data";

const SPAIN_CENTER: [number, number] = [40.2, -3.5];
const TILE_URL = process.env.NEXT_PUBLIC_MAP_TILE_URL ?? "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTRIBUTION =
  process.env.NEXT_PUBLIC_MAP_TILE_ATTRIBUTION ??
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

function pinIcon(pin: MapPin) {
  const modifier =
    pin.status === "historical" || pin.status === "inactive"
      ? " gs-pin--historical"
      : pin.precision === "city"
        ? " gs-pin--city"
        : "";
  return L.divIcon({
    className: "",
    html: `<span class="gs-pin${modifier}" role="img" aria-label="${pin.name}"></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -8],
  });
}

function FitBounds({ pins }: { pins: MapPin[] }) {
  const map = useMap();
  useEffect(() => {
    if (pins.length === 0) return;
    const bounds = L.latLngBounds(pins.map((p) => [p.latitude, p.longitude] as [number, number]));
    map.fitBounds(bounds.pad(0.25), { maxZoom: 8 });
  }, [map, pins]);
  return null;
}

export type TeamMapLabels = {
  viewProfile: string;
  cityLevel: string;
  status: Record<MapPin["status"], string>;
};

export function TeamMap({
  pins,
  labels,
  height = "70vh",
  interactive = true,
}: {
  pins: MapPin[];
  labels: TeamMapLabels;
  height?: string;
  interactive?: boolean;
}) {
  const icons = useMemo(() => new Map(pins.map((p) => [p.id, pinIcon(p)])), [pins]);

  return (
    <MapContainer
      center={SPAIN_CENTER}
      zoom={6}
      minZoom={5}
      maxZoom={16}
      scrollWheelZoom={interactive}
      dragging={interactive}
      zoomControl={interactive}
      style={{ height, width: "100%" }}
      className="rounded-card border border-line"
    >
      {/*
        Standard OSM tiles, darkened with CSS (see globals.css). OSM's tile
        usage policy is fine for a small project; swap TILE_URL for a
        provider with an API key (MapTiler, Stadia, CARTO) before heavy traffic.
      */}
      <TileLayer attribution={TILE_ATTRIBUTION} url={TILE_URL} maxZoom={19} />
      <FitBounds pins={pins} />
      {pins.map((pin) => (
        <Marker key={pin.id} position={[pin.latitude, pin.longitude]} icon={icons.get(pin.id)}>
          <Popup>
            <div className="min-w-48 p-3">
              <p className="font-display text-lg font-extrabold uppercase leading-none text-paper">{pin.name}</p>
              <p className="mt-1 text-xs text-muted">
                {pin.city} · {pin.community}
              </p>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-2">
                {labels.status[pin.status]}
                {pin.competitionLabel ? ` · ${pin.competitionLabel}` : ""}
                {pin.precision === "city" ? ` · ${labels.cityLevel}` : ""}
              </p>
              <a
                href={pin.href}
                className="mt-3 inline-block font-display text-sm font-bold uppercase tracking-[0.08em] text-gold"
              >
                {labels.viewProfile} →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
