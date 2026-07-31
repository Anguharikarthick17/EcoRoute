const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorMiddleware");

const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const rewardRoutes = require("./routes/rewardRoutes");
const priorityRoutes = require("./routes/priorityRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", service: "EcoRoute REST API", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/priority", priorityRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
