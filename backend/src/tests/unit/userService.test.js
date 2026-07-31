const UserService = require("../../services/userService");

describe("UserService Unit Tests", () => {
  it("should register a new user successfully", async () => {
    const userData = {
      name: "Test Recycler",
      email: `test_${Date.now()}@ecoroute.gov.in`,
      password: "securepassword123",
    };
    const result = await UserService.registerUser(userData);
    expect(result.user).toHaveProperty("id");
    expect(result.user.email).toBe(userData.email);
    expect(result).toHaveProperty("token");
  });

  it("should throw error if email is already registered", async () => {
    const userData = {
      name: "Duplicate User",
      email: "anguharikarthick@gmail.com",
      password: "password123",
    };
    await expect(UserService.registerUser(userData)).rejects.toThrow("Email already registered");
  });
});
