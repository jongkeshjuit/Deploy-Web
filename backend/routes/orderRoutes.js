const express = require("express");
const Order = require("../models/Order");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   GET /api/orders/my-orders
// @desc    Get logged in user's orders
// @access  Private
router.get("/my-orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post("/", authMiddleware, async (req, res) => {
  try {
    // Nhận toàn bộ dữ liệu form và cartItems từ frontend
    const { formData, cartItems, totalPrice } = req.body;
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }
    // Validate thông tin giao hàng
    if (
      !formData ||
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.district ||
      !formData.ward
    ) {
      return res.status(400).json({ message: "Thiếu thông tin giao hàng" });
    }
    // Chuẩn hóa dữ liệu orderItems từ cartItems
    const orderItems = cartItems.map((item) => ({
      productId: item.product._id,
      name: item.product.name,
      image: item.product.images?.[0]?.url || "",
      price: item.product.discountPrice || item.product.price,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
    }));
    // Địa chỉ giao hàng
    const shippingAddress = {
      address: formData.address,
      city: formData.city,
      district: formData.district,
      ward: formData.ward,
      postalCode: formData.postalCode,
      country: formData.country,
      notes: formData.notes,
    };
    // Xử lý trạng thái thanh toán phía backend
    let isPaid = false;
    let paidAt = null;
    let paymentStatus = "Pending";
    if (formData.paymentMethod === "bank_transfer") {
      isPaid = true;
      paidAt = new Date();
      paymentStatus = "Paid";
    }
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod: formData.paymentMethod,
      totalPrice,
      isPaid,
      paidAt,
      paymentStatus,
      status: "Processing",
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
