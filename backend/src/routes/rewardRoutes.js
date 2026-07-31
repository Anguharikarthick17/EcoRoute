const express = require("express");
const router = express.Router();
const RewardController = require("../controllers/rewardController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.get("/my-rewards", authenticateToken, RewardController.getUserRewards);
router.post("/award", authenticateToken, RewardController.awardPoints);

module.exports = router;
