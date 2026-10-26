import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  hashPassword,
  comparePassword,
  signToken,
  verifyToken,
} from "../lib/auth.ts";
import type { JWTPayload } from "../lib/auth.ts";

describe("Authentication & Authorization Security Unit Tests", () => {
  const testPassword = "SecurePassword@2026!";

  describe("Password Hashing & Verification (bcryptjs)", () => {
    it("hashes password and verifies match correctly", async () => {
      const hash = await hashPassword(testPassword);
      assert.ok(hash && hash.length > 20);
      assert.notEqual(hash, testPassword);

      const isMatch = await comparePassword(testPassword, hash);
      assert.equal(isMatch, true);
    });

    it("fails comparison when incorrect password is provided", async () => {
      const hash = await hashPassword(testPassword);
      const isMatch = await comparePassword("WrongPassword123", hash);
      assert.equal(isMatch, false);
    });

    it("generates unique salt per hash invocation for same password", async () => {
      const hash1 = await hashPassword(testPassword);
      const hash2 = await hashPassword(testPassword);
      assert.notEqual(hash1, hash2);
    });
  });

  describe("JWT Token Management & Role Verification", () => {
    const citizenPayload: JWTPayload = {
      userId: "usr_citizen_101",
      email: "citizen@ecoroute.gov.in",
      role: "CITIZEN",
      citizenId: "DL-2026-4021",
      name: "Suresh Raman",
    };

    const recyclerPayload: JWTPayload = {
      userId: "usr_dealer_202",
      email: "dealer@ecoroute.gov.in",
      role: "RECYCLER",
      citizenId: "CPCB-REC-2026-8812",
      name: "Kovai Metal Scrap Yard",
    };

    it("signs and successfully verifies citizen JWT token", () => {
      const token = signToken(citizenPayload);
      assert.ok(typeof token === "string" && token.split(".").length === 3);

      const decoded = verifyToken(token);
      assert.ok(decoded !== null);
      assert.equal(decoded.userId, citizenPayload.userId);
      assert.equal(decoded.email, citizenPayload.email);
      assert.equal(decoded.role, "CITIZEN");
      assert.equal(decoded.name, citizenPayload.name);
    });

    it("signs and verifies recycler/dealer JWT token with CPCB license", () => {
      const token = signToken(recyclerPayload);
      const decoded = verifyToken(token);
      assert.ok(decoded !== null);
      assert.equal(decoded.role, "RECYCLER");
      assert.equal(decoded.citizenId, "CPCB-REC-2026-8812");
    });

    it("rejects tampered or forged JWT tokens", () => {
      const validToken = signToken(citizenPayload);
      const parts = validToken.split(".");
      // Tamper signature part
      const tamperedToken = `${parts[0]}.${parts[1]}.tampered_signature_payload`;

      const result = verifyToken(tamperedToken);
      assert.equal(result, null);
    });

    it("rejects garbage string tokens", () => {
      const result = verifyToken("not_a_valid_jwt_token");
      assert.equal(result, null);
    });
  });
});
