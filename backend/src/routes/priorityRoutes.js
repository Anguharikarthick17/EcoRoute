const express = require("express");
const router = express.Router();
const PriorityController = require("../controllers/priorityController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.get("/queue", authenticateToken, PriorityController.getPriorityQueue);
router.post("/assign", authenticateToken, PriorityController.assignPriority);

module.exports = router;
