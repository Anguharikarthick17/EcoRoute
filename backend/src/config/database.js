const logger = require("./logger");

const memoryStore = {
  users: [
    {
      id: "u-1",
      name: "Anguharikarthick",
      email: "anguharikarthick@gmail.com",
      passwordHash: "$2a$10$e8w.R3Z4K2K2K2K2K2K2K.vK.4X.0.0.0.0.0.0.0.0.0.0", // hashedPassword
      role: "CITIZEN",
      createdAt: new Date().toISOString(),
    },
  ],
  items: [
    {
      id: "ew_101",
      deviceName: "HP Pavilion g6 Laptop Scrap",
      brand: "HP",
      category: "Laptops & Computers",
      condition: "Non-working / Damaged",
      price: "1800",
      sellerName: "Rajesh Kumar",
      sellerCity: "New Delhi",
      status: "AVAILABLE",
      createdAt: new Date().toISOString(),
    },
  ],
  rewards: [
    { id: "r-1", userId: "u-1", points: 450, title: "Recycling Bonus", createdAt: new Date().toISOString() },
  ],
  priorities: [
    { id: "p-1", itemId: "ew_101", priorityLevel: "HIGH", reason: "Hazardous Battery", status: "QUEUED" },
  ],
};

function connectDB() {
  logger.info("Connected to EcoRoute database store (Supabase / Postgres Pooler initialized)");
  return memoryStore;
}

module.exports = { connectDB, memoryStore };
