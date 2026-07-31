const PriorityService = require("../services/priorityService");
const logger = require("../config/logger");

class PriorityController {
  static async getPriorityQueue(req, res, next) {
    try {
      const queue = await PriorityService.getPriorityQueue();
      res.status(200).json({ success: true, data: queue });
    } catch (error) {
      next(error);
    }
  }

  static async assignPriority(req, res, next) {
    try {
      const { itemId, priorityLevel, reason } = req.body;
      const priority = await PriorityService.assignPriority(itemId, priorityLevel, reason);
      logger.info(`Priority assigned for item ${itemId}: ${priorityLevel}`);
      res.status(201).json({ success: true, data: priority });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PriorityController;
