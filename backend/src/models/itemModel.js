const { memoryStore } = require("../config/database");

class ItemModel {
  static async findAll() {
    return memoryStore.items;
  }

  static async findById(id) {
    return memoryStore.items.find((item) => item.id === id);
  }

  static async create(itemData) {
    const newItem = { id: `ew_${Date.now()}`, status: "AVAILABLE", createdAt: new Date().toISOString(), ...itemData };
    memoryStore.items.push(newItem);
    return newItem;
  }

  static async updateStatus(id, status) {
    const item = memoryStore.items.find((i) => i.id === id);
    if (item) {
      item.status = status;
    }
    return item;
  }
}

module.exports = ItemModel;
