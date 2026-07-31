const UserService = require("../services/userService");
const logger = require("../config/logger");

class UserController {
  static async register(req, res, next) {
    try {
      const result = await UserService.registerUser(req.body);
      logger.info(`User registered successfully: ${result.user.email}`);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const result = await UserService.loginUser(req.body);
      logger.info(`User logged in successfully: ${result.user.email}`);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      res.status(200).json({ success: true, data: req.user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
