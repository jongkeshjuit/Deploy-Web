const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

// Load env vars
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Clear all products
const clearAllProducts = async () => {
  try {
    console.log("Đang xóa tất cả sản phẩm...");

    const result = await Product.deleteMany({});

    console.log(`✅ Đã xóa thành công ${result.deletedCount} sản phẩm`);
    console.log("Database đã được làm sạch!");

    process.exit(0);
  } catch (error) {
    console.error(`❌ Lỗi khi xóa sản phẩm: ${error.message}`);
    process.exit(1);
  }
};

// Run the clear function
clearAllProducts();
