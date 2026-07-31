const RewardModel = require("../models/rewardModel");

class RewardService {
  static async getUserRewards(userId) {
    const rewards = await RewardModel.findByUserId(userId);
    const totalPoints = rewards.reduce((acc, curr) => acc + curr.points, 0);
    return { userId, totalPoints, history: rewards };
  }

  static async awardPoints(userId, points, title) {
    if (!points || points <= 0) throw new Error("Invalid points amount");
    return await RewardModel.addPoints(userId, points, title);
  }
}

module.exports = RewardService;
