import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { successResponse, errorResponse } from "../lib/api-response.ts";

describe("API Response & Safe Error Handling Unit Tests", () => {
  describe("successResponse", () => {
    it("returns default 200 status with structured body", async () => {
      const res = successResponse({ id: "item_123" }, "Item created successfully");
      assert.equal(res.status, 200);

      const json = await res.json();
      assert.equal(json.success, true);
      assert.equal(json.message, "Item created successfully");
      assert.deepEqual(json.data, { id: "item_123" });
    });

    it("supports custom HTTP status (e.g. 201 Created)", async () => {
      const res = successResponse({ id: "item_123" }, "Created", { status: 201 });
      assert.equal(res.status, 201);
    });
  });

  describe("errorResponse - Sanitization & Security", () => {
    it("masks internal database errors containing connection strings", async () => {
      const sensitiveError = new Error(
        "Connection terminated unexpectedly at postgresql://postgres:secretpassword@db.supabase.co:5432/ecoroute"
      );
      const res = errorResponse(sensitiveError, "Database error", 500);
      assert.equal(res.status, 500);

      const json = await res.json();
      assert.equal(json.success, false);
      // Ensure raw database URL is NOT leaked in the response message
      assert.ok(!json.message.includes("secretpassword"));
      assert.ok(!json.message.includes("postgresql://"));
      assert.equal(json.message, "Database error");
    });

    it("masks internal file path strings from stack messages", async () => {
      const internalPathError = new Error(
        "ENOENT: no such file or directory, open '/Users/angu/Downloads/EcoRoute-main/prisma/schema.prisma'"
      );
      const res = errorResponse(internalPathError, "Resource could not be loaded", 500);
      const json = await res.json();
      assert.ok(!json.message.includes("/Users/"));
      assert.ok(!json.message.includes("schema.prisma"));
    });

    it("formats Zod validation error with 400 and structured error array", async () => {
      const zodLikeError = {
        name: "ZodError",
        errors: [
          { path: ["email"], message: "Invalid email address format" },
          { path: ["weightKg"], message: "Expected positive number" },
        ],
      };
      const res = errorResponse(zodLikeError);
      assert.equal(res.status, 400);

      const json = await res.json();
      assert.equal(json.success, false);
      assert.equal(json.code, "VALIDATION_ERROR");
      assert.equal(json.message, "Validation failed for provided input.");
      assert.equal(Array.isArray(json.errors), true);
      assert.equal(json.errors.length, 2);
    });
  });
});
