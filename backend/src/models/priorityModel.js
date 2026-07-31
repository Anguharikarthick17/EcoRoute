const { memoryStore } = require("../config/database");

class PriorityModel {
  static async findAll() {
    return memoryStore.priorities;
  }

  static async create(priorityData) {
    const newPriority = { id: `p-${Date.now()}`, status: "QUEUED", ...priorityData };
    memoryStore.priorities.push(newPriority);
    return newPriority;
  }
}

module.exports = PriorityModel;
