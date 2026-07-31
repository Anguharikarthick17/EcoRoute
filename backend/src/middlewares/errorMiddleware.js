const logger = require("../config/logger");

function errorHandler(err, req, res, next) {
  logger.error(`Error: ${err.message}`, { stack: err.stack, path: req.path });

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
}

module.exports = { errorHandler };
