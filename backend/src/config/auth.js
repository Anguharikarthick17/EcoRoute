module.exports = {
  jwtSecret: process.env.JWT_SECRET || "ecoroute_super_secret_jwt_key_2026",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  bcryptSaltRounds: 10,
};
