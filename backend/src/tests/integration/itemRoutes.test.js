const request = require("supertest");
const app = require("../../app");

describe("Item Routes Integration Tests", () => {
  it("GET /api/items - should return list of e-waste items", async () => {
    const res = await request(app).get("/api/items");
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("GET /api/health - should return health OK status", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe("OK");
  });
});
