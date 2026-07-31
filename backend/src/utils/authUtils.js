const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authConfig = require("../config/auth");

function generateToken(payload) {
  return jwt.sign(payload, authConfig.jwtSecret, { expiresIn: authConfig.jwtExpiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, authConfig.jwtSecret);
}

async function hashPassword(password) {
  return await bcrypt.hash(password, authConfig.bcryptSaltRounds);
}

async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
};
