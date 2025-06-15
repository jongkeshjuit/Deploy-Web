const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET /api/payment/check?orderCode=...&amount=...&phone=...
router.get("/check", async (req, res) => {
  const { orderCode, amount, phone } = req.query;
  if (!orderCode || !amount || !phone) {
    return res.status(400).json({
      error: true,
      message: "Thiếu tham số orderCode, amount hoặc phone",
    });
  }
  const API_URL =
    "https://script.google.com/macros/s/AKfycbxMRUJYZWJdNtr4k2pcD4-T7OR8k4nz8jPnDFCm2F6ChwEYP3IT6v-x0OnZIfmmPKdl/exec";
  try {
    const response = await axios.get(API_URL);
    const transactions = response.data;
    // Log giao dịch lấy được
    console.log("[API/payment/check] transactions:", transactions);
    // Log nội dung đối chiếu
    console.log("[API/payment/check] Đối chiếu với:", {
      orderCode,
      amount,
      phone,
    });
    res.json({ transactions });
  } catch (err) {
    console.error("[API/payment/check] Lỗi:", err);
    res.status(500).json({
      error: true,
      message: "Không thể xác thực thanh toán. Vui lòng thử lại sau!",
    });
  }
});

module.exports = router;
