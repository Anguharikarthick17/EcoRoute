import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  calculateHaversineDistance,
  filterStopsByRadius,
  optimizePickupRoute,
} from "../lib/route-optimizer.ts";
import type { PickupStop } from "../lib/route-optimizer.ts";

describe("Multi-Stop Route Optimizer & Fuel Economy Unit Tests", () => {
  const coimbatoreBase = {
    name: "Coimbatore Scrap Merchant Yard Base",
    latitude: 11.0168,
    longitude: 76.9558,
  };

  const sampleStops: PickupStop[] = [
    {
      id: "stop_1",
      sellerName: "Rajesh Kumar",
      address: "Eachanari Road, Coimbatore",
      latitude: 10.9329,
      longitude: 76.9771,
      category: "Appliances",
      weightKg: 45.0,
      estimatedPrice: 1800,
    },
    {
      id: "stop_2",
      sellerName: "Karthick A.",
      address: "Sundarapuram Junction, Coimbatore",
      latitude: 10.9612,
      longitude: 76.9723,
      category: "Paper & Cardboard",
      weightKg: 28.0,
      estimatedPrice: 380,
    },
    {
      id: "stop_3",
      sellerName: "Rathinam Tech Campus Resident",
      address: "Pollachi Main Road, Eachanari",
      latitude: 10.9288,
      longitude: 76.9802,
      category: "Copper",
      weightKg: 4.5,
      estimatedPrice: 3200,
    },
  ];

  describe("calculateHaversineDistance", () => {
    it("returns 0 km for identical coordinates", () => {
      const dist = calculateHaversineDistance(coimbatoreBase, coimbatoreBase);
      assert.equal(dist, 0);
    });

    it("calculates accurate distance between Coimbatore center and Eachanari (~9.6 km)", () => {
      const dist = calculateHaversineDistance(coimbatoreBase, {
        latitude: 10.9329,
        longitude: 76.9771,
      });
      assert.ok(dist >= 9.0 && dist <= 10.5, `Expected ~9.6 km, got ${dist}`);
    });
  });

  describe("filterStopsByRadius", () => {
    it("filters stops within a 15 km radius of base", () => {
      const filtered = filterStopsByRadius(coimbatoreBase, sampleStops, 15);
      assert.equal(filtered.length, 3);
    });

    it("excludes distant stops when radius is small (e.g. 5 km)", () => {
      const filtered = filterStopsByRadius(coimbatoreBase, sampleStops, 5);
      assert.equal(filtered.length, 0);
    });

    it("returns all stops if radius is 0 or negative", () => {
      const all = filterStopsByRadius(coimbatoreBase, sampleStops, 0);
      assert.equal(all.length, sampleStops.length);
    });
  });

  describe("optimizePickupRoute", () => {
    it("handles empty stops gracefully with zeroed metrics", () => {
      const result = optimizePickupRoute(coimbatoreBase, []);
      assert.equal(result.totalDistanceKm, 0);
      assert.equal(result.orderedStops.length, 0);
      assert.equal(result.distanceSavedKm, 0);
      assert.equal(result.fuelSavedLitres, 0);
    });

    it("clusters stops and achieves significant distance savings over naive round trips", () => {
      const result = optimizePickupRoute(coimbatoreBase, sampleStops);

      // Verify all stops are included in the tour
      assert.equal(result.orderedStops.length, 3);

      // Total distance should be strictly less than naive independent round trips
      assert.ok(
        result.totalDistanceKm < result.naiveDistanceKm,
        `Tour distance (${result.totalDistanceKm}) should be less than naive distance (${result.naiveDistanceKm})`
      );

      // Distance saved must be positive
      assert.ok(result.distanceSavedKm > 0, `Distance saved must be positive: ${result.distanceSavedKm}`);

      // Fuel saved must be positive
      assert.ok(result.fuelSavedLitres > 0, `Fuel saved must be positive: ${result.fuelSavedLitres}`);

      // CO2 saved follows 2.68 kg / L factor
      assert.ok(result.co2SavedKg > 0, `CO2 saved must be positive: ${result.co2SavedKg}`);

      // Efficiency gain percent should be substantial (e.g. > 20%)
      assert.ok(
        result.efficiencyGainPercent > 20,
        `Expected > 20% efficiency gain, got ${result.efficiencyGainPercent}%`
      );
    });
  });
});
