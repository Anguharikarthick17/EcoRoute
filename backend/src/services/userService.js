const UserModel = require("../models/userModel");
const { hashPassword, comparePassword, generateToken } = require("../utils/authUtils");

class UserService {
  static async registerUser({ name, email, password, role = "CITIZEN" }) {
    const existing = await UserModel.findByEmail(email);
    if (existing) {
      throw new Error("Email already registered");
    }
    const passwordHash = await hashPassword(password);
    const user = await UserModel.create({ name, email, passwordHash, role });
    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token };
  }

  static async loginUser({ email, password }) {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }
    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token };
  }
}

module.exports = UserService;
