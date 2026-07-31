const ItemService = require("../services/itemService");
const logger = require("../config/logger");

class ItemController {
  static async getItems(req, res, next) {
    try {
      const items = await ItemService.getAllItems();
      res.status(200).json({ success: true, data: items });
    } catch (error) {
      next(error);
    }
  }

  static async getItemById(req, res, next) {
    try {
      const item = await ItemService.getItemById(req.params.id);
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  }

  static async createItem(req, res, next) {
    try {
      const item = await ItemService.createItem(req.body);
      logger.info(`E-Waste Item listed: ${item.deviceName}`);
      res.status(201).json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  }

  static async purchaseItem(req, res, next) {
    try {
      const item = await ItemService.purchaseItem(req.params.id);
      logger.info(`E-Waste Item purchased: ${item.id}`);
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ItemController;
