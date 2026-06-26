// Geocoding + Distanz-Logik fuer die Standortsuche (POC).
// Schritt 1: Ort/PLZ -> Koordinaten (Nachschlagen in der PLZ-Tabelle).
// Schritt 2: Luftlinie (Haversine) zu jedem Standort -> die naechsten finden.

import { PLZ_COORDS, type PlzEntry } from '../data/plz-coords';

// Erd-Radius in km fuer die Haversine-Formel.
const EARTH_RADIUS_KM = 6371;

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

// Luftlinie zwischen zwei Geo-Punkten in Kilometern (Haversine-Formel).
function haversineKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const dLat = toRadians(bLat - aLat);
  const dLng = toRadians(bLng - aLng);
  const lat1 = toRadians(aLat);
  const lat2 = toRadians(bLat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

// Ort oder PLZ -> Koordinaten. Eine 5-stellige Zahl wird als PLZ gesucht,
// alles andere als Ortsname (Gross-/Kleinschreibung egal). Kein Treffer -> null.
export function geocode(query: string): PlzEntry | null {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return null;

  const isPlz = /^\d{5}$/.test(normalized);
  const match = PLZ_COORDS.find((entry) =>
    isPlz ? entry.plz === normalized : entry.city.toLowerCase() === normalized,
  );

  return match ?? null;
}

export type NearestResult<T> = {
  location: T;
  distanceKm: number;
};

// Die naechstgelegenen Standorte zu einem Punkt, sortiert nach Entfernung.
// Generisch: arbeitet mit allem, was lat/lng hat (z. B. Storyblok-Standorte).
// Default: die drei naechsten (Top-3 als Verbesserung ggue. dem Original).
export function findNearest<T extends { lat: number; lng: number }>(
  lat: number,
  lng: number,
  locations: T[],
  limit = 3,
): NearestResult<T>[] {
  return locations
    .map((location) => ({
      location,
      distanceKm: haversineKm(lat, lng, location.lat, location.lng),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit);
}

// Liste der bekannten Demo-Orte (fuer einen hilfreichen Hinweis bei Fehleingabe).
export function knownCities(): string[] {
  return [...new Set(PLZ_COORDS.map((entry) => entry.city))];
}
