import { itemService } from "../../services/itemService";

describe("Frontend itemService Unit Tests", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, data: [{ id: "1", deviceName: "Laptop" }] }),
      })
    );
  });

  it("should fetch e-waste items successfully", async () => {
    const res = await itemService.getItems();
    expect(res.success).toBe(true);
    expect(res.data.length).toBe(1);
    expect(res.data[0].deviceName).toBe("Laptop");
  });
});
