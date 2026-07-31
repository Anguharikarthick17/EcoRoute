const express = require("express");
const router = express.Router();
const ItemController = require("../controllers/itemController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.get("/", ItemController.getItems);
router.get("/:id", ItemController.getItemById);
router.post("/", authenticateToken, ItemController.createItem);
router.post("/:id/purchase", authenticateToken, ItemController.purchaseItem);

module.exports = router;
