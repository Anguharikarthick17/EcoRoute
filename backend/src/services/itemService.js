const ItemModel = require("../models/itemModel");

class ItemService {
  static async getAllItems() {
    return await ItemModel.findAll();
  }

  static async getItemById(id) {
    const item = await ItemModel.findById(id);
    if (!item) throw new Error("Item not found");
    return item;
  }

  static async createItem(itemData) {
    if (!itemData.deviceName || !itemData.category) {
      throw new Error("Device name and category are required");
    }
    return await ItemModel.create(itemData);
  }

  static async purchaseItem(id) {
    const item = await ItemModel.findById(id);
    if (!item) throw new Error("Item not found");
    if (item.status === "SOLD") throw new Error("Item already sold");
    return await ItemModel.updateStatus(id, "SOLD");
  }
}

module.exports = ItemService;
