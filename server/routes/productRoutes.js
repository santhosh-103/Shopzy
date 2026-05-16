const express = require("express");
const admin = require("../middleware/adminMiddleware");
const {
  addProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  searchProducts,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, admin, addProduct);

router.get("/", getProducts);

router.get("/search/product", searchProducts);

router.get("/:id", getSingleProduct);

router.delete("/:id", protect, admin, deleteProduct);

router.put("/:id", protect, admin, updateProduct);
module.exports = router;