import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { analyzeScrapImage, classifyDeviceImage } from "../lib/ai.ts";

describe("Scrap Valuation & AI Vision Unit Tests", () => {
  describe("analyzeScrapImage - Counterfeit / Non-Scrap Detection", () => {
    it("rejects selfie image with low authenticity score", async () => {
      const result = await analyzeScrapImage("", "my_selfie_camera.jpg");
      assert.equal(result.isRealScrap, false);
      assert.equal(result.authenticityScore, 18.5);
      assert.equal(result.askingPrice, "0");
      assert.equal(result.priceRange, "₹0");
      assert.ok(result.reasonIfFake?.includes("non-scrap"));
    });

    it("rejects food / pet photo uploads", async () => {
      const foodResult = await analyzeScrapImage("", "delicious_food_lunch.png");
      assert.equal(foodResult.isRealScrap, false);

      const petResult = await analyzeScrapImage("", "cute_dog_playing.jpeg");
      assert.equal(petResult.isRealScrap, false);
    });
  });

  describe("analyzeScrapImage - Scrap Material Classification & Pricing", () => {
    it("correctly identifies pure copper wire scrap and applies premium rate", async () => {
      const result = await analyzeScrapImage("", "copper_wire_coil_scrap.jpg");
      assert.equal(result.isRealScrap, true);
      assert.equal(result.category, "Copper Wire & Windings");
      assert.ok(result.authenticityScore > 98);
      assert.ok(Number(result.askingPrice) > 0);
      assert.ok(result.priceRange.includes("₹"));
      assert.ok(result.aiBadges.includes("High Purity Copper Core"));
      assert.ok(result.disclaimer.includes("AI estimates are approximate"));
    });

    it("correctly identifies washing machine heavy appliance scrap", async () => {
      const result = await analyzeScrapImage("", "old_washing_machine_motor.jpg");
      assert.equal(result.isRealScrap, true);
      assert.equal(result.category, "Washing Machines");
      assert.equal(result.estimatedWeight, "45.00");
      assert.ok(result.aiBadges.includes("Stainless Steel Drum"));
    });

    it("correctly identifies extruded aluminium scrap", async () => {
      const result = await analyzeScrapImage("", "aluminium_window_frames.png");
      assert.equal(result.isRealScrap, true);
      assert.equal(result.category, "Metals & Aluminium Scrap");
      assert.ok(result.material.includes("Aluminium"));
    });

    it("correctly identifies paper & cardboard recyclable scrap", async () => {
      const result = await analyzeScrapImage("", "cardboard_packaging_boxes.jpg");
      assert.equal(result.isRealScrap, true);
      assert.equal(result.category, "Paper & Cardboard Scrap");
      assert.equal(result.estimatedWeight, "15.00");
    });

    it("correctly identifies laptop scrap with precious metal motherboards", async () => {
      const result = await analyzeScrapImage("", "old_broken_laptop_motherboard.jpg");
      assert.equal(result.isRealScrap, true);
      assert.equal(result.category, "Laptops & Computers");
      assert.ok(result.aiBadges.includes("Gold Trace PCB"));
    });

    it("correctly identifies heavy lead-acid battery scrap", async () => {
      const result = await analyzeScrapImage("", "inverter_battery_ups_scrap.jpg");
      assert.equal(result.isRealScrap, true);
      assert.equal(result.category, "Batteries & Power Banks");
      assert.ok(result.material.includes("Lead Plates"));
    });
  });

  describe("classifyDeviceImage - Legacy Classification & Recommendation", () => {
    it("returns direct smelting recommendation for copper windings", async () => {
      const result = await classifyDeviceImage("", "Burnt copper wire motor winding");
      assert.equal(result.deviceCategory, "Copper Wire & Windings");
      assert.equal(result.suggestedRecyclingMethod, "Direct Smelting & Electrolytic Refining");
      assert.ok(result.confidenceScore >= 98);
    });

    it("returns magnetic shredding recommendation for heavy appliances", async () => {
      const result = await classifyDeviceImage("", "Damaged refrigerator body");
      assert.equal(result.deviceCategory, "Appliances & Heavy Scrap");
      assert.equal(result.suggestedRecyclingMethod, "Magnetic Sorting & Metal Shredding");
    });
  });
});
