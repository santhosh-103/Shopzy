const express = require("express");

const {
  placeOrder,
  getUserOrders,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Place Order
router.post("/", protect, placeOrder);
router.get("/", protect, getUserOrders);

module.exports = router;