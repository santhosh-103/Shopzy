const Order = require("../models/Order");

// PLACE ORDER
const placeOrder = async (req, res) => {
  try {
    const {
      orderItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
    } = req.body;

    const order = await Order.create({
      user: req.user.id,
      orderItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
    });

    res.status(201).json({
      message: "Order Placed",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).populate("orderItems.product");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
};