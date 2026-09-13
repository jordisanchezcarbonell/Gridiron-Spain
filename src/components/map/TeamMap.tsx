"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MapPin } from "./map-data";

const SPAIN_CENTER: [number, number] = [40.2, -3.5];
import { TILE_ATTRIBUTION, TILE_URL, USING_OSM } from "./tiles";
const CLUSTER_RADIUS_PX = 34;
const CLUSTER_MAX_ZOOM = 11;

export type TeamMapLabels = {
  viewProfile: string;
  cityLevel: string;
  clusterHint: string;
  status: Record<MapPin["status"], string>;
};

type Cluster = { key: string; pins: MapPin[]; latitude: number; longitude: number };

function pinClass(pin: MapPin, hovered: boolean, selected: boolean) {
  const parts = ["gs-pin"];
  if (pin.status === "historical" || pin.status === "inactive") parts.push("gs-pin--historical");
  else if (pin.precision === "city") parts.push("gs-pin--city");
  if (hovered) parts.push("gs-pin--hover");
  if (selected) parts.push("gs-pin--selected");
  return parts.join(" ");
}

function pinIcon(pin: MapPin, hovered: boolean, selected: boolean) {
  return L.divIcon({
    className: "",
    html: `<span class="${pinClass(pin, hovered, selected)}" role="img" aria-label="${pin.name}">${pin.monogram}</span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -18],
  });
}

function clusterIcon(count: number, label: string) {
  return L.divIcon({
    className: "",
    html: `<span class="gs-pin gs-pin--cluster" role="img" aria-label="${count} ${label}">${count}</span>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

/** Greedy pixel-distance clustering, recomputed on every zoom/move. */
function buildClusters(map: L.Map, pins: MapPin[], zoom: number): Cluster[] {
  if (zoom >= CLUSTER_MAX_ZOOM) {
    return pins.map((p) => ({ key: p.id, pins: [p], latitude: p.latitude, longitude: p.longitude }));
  }
  const points = pins.map((p) => ({ pin: p, pt: map.project([p.latitude, p.longitude], zoom) }));
  const clusters: Array<{ pins: MapPin[]; pts: L.Point[] }> = [];
  for (const { pin, pt } of points) {
    const target = clusters.find((c) => c.pts.some((q) => q.distanceTo(pt) < CLUSTER_RADIUS_PX));
    if (target) {
      target.pins.push(pin);
      target.pts.push(pt);
    } else {
      clusters.push({ pins: [pin], pts: [pt] });
    }
  }
  return clusters.map((c) => ({
    key: c.pins.map((p) => p.id).join("+"),
    pins: c.pins,
    latitude: c.pins.reduce((s, p) => s + p.latitude, 0) / c.pins.length,
    longitude: c.pins.reduce((s, p) => s + p.longitude, 0) / c.pins.length,
  }));
}

function FitBounds({ pins }: { pins: MapPin[] }) {
  const map = useMap();
  const key = pins.map((p) => p.id).join("|");
  useEffect(() => {
    if (pins.length === 0) return;
    const bounds = L.latLngBounds(pins.map((p) => [p.latitude, p.longitude] as [number, number]));
    map.fitBounds(bounds.pad(0.25), { maxZoom: 8 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, key]);
  return null;
}

function FlyToSelected({ pins, selectedId }: { pins: MapPin[]; selectedId: string | null }) {
  const map = useMap();
  useEffect(() => {
    if (!selectedId) return;
    const pin = pins.find((p) => p.id === selectedId);
    if (!pin) return;
    const zoom = Math.max(map.getZoom(), CLUSTER_MAX_ZOOM);
    map.flyTo([pin.latitude, pin.longitude], zoom, { duration: 0.6 });
  }, [map, pins, selectedId]);
  return null;
}

function Markers({
  pins,
  labels,
  hoveredId,
  selectedId,
  onSelect,
  onHover,
}: {
  pins: MapPin[];
  labels: TeamMapLabels;
  hoveredId: string | null;
  selectedId: string | null;
  onSelect?: (id: string | null) => void;
  onHover?: (id: string | null) => void;
}) {
  const map = useMap();
  const [zoom, setZoom] = useState(() => map.getZoom());
  useMapEvents({ zoomend: () => setZoom(map.getZoom()) });

  const clusters = useMemo(() => buildClusters(map, pins, zoom), [map, pins, zoom]);
  const selected = selectedId ? pins.find((p) => p.id === selectedId) : undefined;

  return (
    <>
      {clusters.map((cluster) => {
        if (cluster.pins.length > 1) {
          return (
            <Marker
              key={cluster.key}
              position={[cluster.latitude, cluster.longitude]}
              icon={clusterIcon(cluster.pins.length, labels.clusterHint)}
              eventHandlers={{
                click: () => {
                  const bounds = L.latLngBounds(cluster.pins.map((p) => [p.latitude, p.longitude] as [number, number]));
                  map.flyToBounds(bounds.pad(0.4), { maxZoom: 13, duration: 0.6 });
                },
              }}
            />
          );
        }
        const pin = cluster.pins[0];
        return (
          <Marker
            key={pin.id}
            position={[pin.latitude, pin.longitude]}
            icon={pinIcon(pin, hoveredId === pin.id, selectedId === pin.id)}
            zIndexOffset={selectedId === pin.id || hoveredId === pin.id ? 1000 : 0}
            eventHandlers={{
              click: () => onSelect?.(pin.id),
              mouseover: () => onHover?.(pin.id),
              mouseout: () => onHover?.(null),
            }}
          />
        );
      })}
      {selected && (
        <Popup
          position={[selected.latitude, selected.longitude]}
          offset={[0, -18]}
          eventHandlers={{ remove: () => onSelect?.(null) }}
        >
          <PinCard pin={selected} labels={labels} />
        </Popup>
      )}
    </>
  );
}

function PinCard({ pin, labels }: { pin: MapPin; labels: TeamMapLabels }) {
  const inactive = pin.status !== "active";
  return (
    <div className="flex w-64 flex-col gap-2.5 p-3.5">
      <div className="flex items-center gap-2.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border border-line-strong bg-surface-2 font-display text-base font-black text-paper-2">
          {pin.monogram}
        </span>
        <div className="min-w-0">
          <p className="font-display text-xl font-extrabold uppercase leading-none text-paper">{pin.name}</p>
          <p className="mt-1 text-xs text-muted">
            {pin.city} · {pin.community}
            {pin.foundedYear ? ` · ${pin.foundedYear}` : ""}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em]">
        <span className={`rounded-sm border px-1.5 py-0.5 ${inactive ? "border-line-strong text-muted" : "border-turf/30 bg-turf/15 text-turf"}`}>
          {labels.status[pin.status]}
        </span>
        {pin.competitionLabel && (
          <span className="rounded-sm border border-gold/30 bg-gold/15 px-1.5 py-0.5 text-gold">{pin.competitionLabel}</span>
        )}
        {pin.disciplines.map((d) => (
          <span key={d} className="rounded-sm border border-line bg-surface-2 px-1.5 py-0.5 text-paper-2">
            {d}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-line pt-2.5">
        <span className="truncate font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-2">
          {pin.precision === "city" ? labels.cityLevel : (pin.venueName ?? "")}
        </span>
        <a href={pin.href} className="shrink-0 font-display text-sm font-bold uppercase tracking-[0.08em] text-gold hover:text-gold-2">
          {labels.viewProfile} →
        </a>
      </div>
    </div>
  );
}

export function TeamMap({
  pins,
  labels,
  height = "70vh",
  interactive = true,
  hoveredId = null,
  selectedId = null,
  onSelect,
  onHover,
}: {
  pins: MapPin[];
  labels: TeamMapLabels;
  height?: string;
  interactive?: boolean;
  hoveredId?: string | null;
  selectedId?: string | null;
  onSelect?: (id: string | null) => void;
  onHover?: (id: string | null) => void;
}) {
  return (
    <MapContainer
      center={SPAIN_CENTER}
      zoom={6}
      minZoom={5}
      maxZoom={17}
      scrollWheelZoom={interactive}
      dragging={interactive}
      zoomControl={interactive}
      style={{ height, width: "100%" }}
      className={`rounded-card border border-line ${USING_OSM ? "map-osm" : ""}`}
    >
      <TileLayer attribution={TILE_ATTRIBUTION} url={TILE_URL} maxZoom={19} />
      <FitBounds pins={pins} />
      <FlyToSelected pins={pins} selectedId={selectedId} />
      <Markers
        pins={pins}
        labels={labels}
        hoveredId={hoveredId}
        selectedId={selectedId}
        onSelect={onSelect}
        onHover={onHover}
      />
    </MapContainer>
  );
}
