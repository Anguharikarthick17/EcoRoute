const RewardService = require("../services/rewardService");
const logger = require("../config/logger");

class RewardController {
  static async getUserRewards(req, res, next) {
    try {
      const data = await RewardService.getUserRewards(req.user.id);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  static async awardPoints(req, res, next) {
    try {
      const { userId, points, title } = req.body;
      const reward = await RewardService.awardPoints(userId, points, title);
      logger.info(`Points awarded to user ${userId}: ${points} pts`);
      res.status(201).json({ success: true, data: reward });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RewardController;
