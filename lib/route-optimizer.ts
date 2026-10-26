/**
 * EcoRoute Multi-Stop Route Optimization & Fuel Economy Engine
 *
 * Implements nearest-neighbor / clustered routing for local scrap dealers
 * (Pazhaya Paper / Inam Kadai merchants) collecting household scrap.
 * Computes travel mileage, distance saved vs independent round-trips,
 * fuel consumption, and CO2 emissions reduction.
 */

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
}

export interface PickupStop {
  id: string;
  sellerName: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  weightKg: number;
  estimatedPrice: number;
  timeSlot?: string;
}

export interface RouteOptimizationResult {
  baseLocation: GeoCoordinate & { name: string };
  orderedStops: PickupStop[];
  totalDistanceKm: number;
  estimatedDurationMins: number;
  naiveDistanceKm: number;
  distanceSavedKm: number;
  fuelSavedLitres: number;
  co2SavedKg: number;
  efficiencyGainPercent: number;
}

/**
 * Calculates great-circle distance between two GPS coordinates using Haversine formula (km).
 */
export function calculateHaversineDistance(
  coord1: GeoCoordinate,
  coord2: GeoCoordinate
): number {
  const EARTH_RADIUS_KM = 6371;
  const dLat = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const dLon = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const lat1 = (coord1.latitude * Math.PI) / 180;
  const lat2 = (coord2.latitude * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(EARTH_RADIUS_KM * c * 100) / 100;
}

/**
 * Filter pickup stops by radial distance from a center point.
 */
export function filterStopsByRadius(
  center: GeoCoordinate,
  stops: PickupStop[],
  radiusKm: number
): PickupStop[] {
  if (radiusKm <= 0) return [...stops];
  return stops.filter((stop) => {
    const dist = calculateHaversineDistance(center, {
      latitude: stop.latitude,
      longitude: stop.longitude,
    });
    return dist <= radiusKm;
  });
}

/**
 * Sequences pickup stops into an optimized single-circuit route using a greedy nearest-neighbor algorithm.
 * Compares the sequential route against the naive alternative (individual round-trips from base to each seller).
 *
 * Fuel assumption: Standard Light Commercial Vehicle (e.g. Tata Ace mini-truck) consuming ~8.5 km/L diesel.
 * CO2 emission factor: ~2.68 kg CO2 per litre of diesel burned (CPCB guidelines).
 */
export function optimizePickupRoute(
  base: GeoCoordinate & { name: string },
  stops: PickupStop[],
  fuelKmPerLitre: number = 8.5
): RouteOptimizationResult {
  if (stops.length === 0) {
    return {
      baseLocation: base,
      orderedStops: [],
      totalDistanceKm: 0,
      estimatedDurationMins: 0,
      naiveDistanceKm: 0,
      distanceSavedKm: 0,
      fuelSavedLitres: 0,
      co2SavedKg: 0,
      efficiencyGainPercent: 0,
    };
  }

  // Calculate naive distance: separate round-trips from base to each stop
  let naiveTotal = 0;
  for (const s of stops) {
    const d = calculateHaversineDistance(base, {
      latitude: s.latitude,
      longitude: s.longitude,
    });
    naiveTotal += d * 2; // to stop and back to base
  }

  // Greedy Nearest Neighbor tour
  const unvisited = [...stops];
  const tour: PickupStop[] = [];
  let currentPos: GeoCoordinate = { latitude: base.latitude, longitude: base.longitude };
  let tourDistance = 0;

  while (unvisited.length > 0) {
    let nearestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < unvisited.length; i++) {
      const dist = calculateHaversineDistance(currentPos, {
        latitude: unvisited[i].latitude,
        longitude: unvisited[i].longitude,
      });
      if (dist < minDistance) {
        minDistance = dist;
        nearestIndex = i;
      }
    }

    const nextStop = unvisited.splice(nearestIndex, 1)[0];
    tour.push(nextStop);
    tourDistance += minDistance;
    currentPos = { latitude: nextStop.latitude, longitude: nextStop.longitude };
  }

  // Return to base from last stop
  const returnToBaseDist = calculateHaversineDistance(currentPos, {
    latitude: base.latitude,
    longitude: base.longitude,
  });
  tourDistance += returnToBaseDist;

  const totalDistanceKm = Math.round(tourDistance * 100) / 100;
  const naiveDistanceKm = Math.round(naiveTotal * 100) / 100;
  const distanceSavedKm = Math.max(0, Math.round((naiveDistanceKm - totalDistanceKm) * 100) / 100);

  // Speed estimation: average 18 km/h in dense Indian urban traffic + 6 mins handling per stop
  const travelTimeMins = (totalDistanceKm / 18) * 60;
  const handlingTimeMins = tour.length * 6;
  const estimatedDurationMins = Math.round(travelTimeMins + handlingTimeMins);

  const fuelSavedLitres = Math.round((distanceSavedKm / fuelKmPerLitre) * 100) / 100;
  const co2SavedKg = Math.round(fuelSavedLitres * 2.68 * 100) / 100;
  const efficiencyGainPercent =
    naiveDistanceKm > 0
      ? Math.round((distanceSavedKm / naiveDistanceKm) * 1000) / 10
      : 0;

  return {
    baseLocation: base,
    orderedStops: tour,
    totalDistanceKm,
    estimatedDurationMins,
    naiveDistanceKm,
    distanceSavedKm,
    fuelSavedLitres,
    co2SavedKg,
    efficiencyGainPercent,
  };
}
