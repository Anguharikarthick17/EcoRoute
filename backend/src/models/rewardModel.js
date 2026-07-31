const { memoryStore } = require("../config/database");

class RewardModel {
  static async findByUserId(userId) {
    return memoryStore.rewards.filter((r) => r.userId === userId);
  }

  static async addPoints(userId, points, title) {
    const entry = { id: `r-${Date.now()}`, userId, points, title, createdAt: new Date().toISOString() };
    memoryStore.rewards.push(entry);
    return entry;
  }
}

module.exports = RewardModel;
