const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { validateRegistration, validateLogin } = require("../middlewares/validationMiddleware");

router.post("/register", validateRegistration, UserController.register);
router.post("/login", validateLogin, UserController.login);
router.get("/profile", authenticateToken, UserController.getProfile);

module.exports = router;
