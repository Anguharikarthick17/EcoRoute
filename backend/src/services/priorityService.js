const PriorityModel = require("../models/priorityModel");

class PriorityService {
  static async getPriorityQueue() {
    return await PriorityModel.findAll();
  }

  static async assignPriority(itemId, priorityLevel, reason) {
    if (!itemId || !priorityLevel) throw new Error("Item ID and Priority Level are required");
    return await PriorityModel.create({ itemId, priorityLevel, reason });
  }
}

module.exports = PriorityService;
