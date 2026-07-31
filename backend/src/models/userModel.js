const { memoryStore } = require("../config/database");

class UserModel {
  static async findByEmail(email) {
    return memoryStore.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  static async findById(id) {
    return memoryStore.users.find((u) => u.id === id);
  }

  static async create(userData) {
    const newUser = { id: `u-${Date.now()}`, ...userData, createdAt: new Date().toISOString() };
    memoryStore.users.push(newUser);
    return newUser;
  }
}

module.exports = UserModel;
