const express = require("express");

const {
  addToCart,
  getCartItems,
  removeCartItem,
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Add To Cart
router.post("/", protect, addToCart);
router.get("/", protect, getCartItems);
router.delete("/:id", protect, removeCartItem);

module.exports = router;