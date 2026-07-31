require("dotenv").config();
const app = require("./app");
const logger = require("./config/logger");
const { connectDB } = require("./config/database");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  logger.info(`🚀 EcoRoute Backend Server listening on port ${PORT}`);
});
