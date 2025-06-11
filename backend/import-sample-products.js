const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const fs = require("fs");

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

// Import sample products
const importSampleProducts = async () => {
  try {
    console.log("🚀 Bắt đầu import sản phẩm mẫu...");

    // Đọc file JSON
    const rawData = fs.readFileSync("./sample-products.json", "utf8");
    const sampleProducts = JSON.parse(rawData);

    console.log(`📦 Tìm thấy ${sampleProducts.length} sản phẩm mẫu`);

    // Xóa tất cả sản phẩm hiện có
    console.log("🗑️  Xóa tất cả sản phẩm hiện có...");
    await Product.deleteMany({});
    console.log("✅ Đã xóa sản phẩm cũ");

    // Chuyển đổi dữ liệu từ MongoDB JSON format sang JavaScript object
    const processedProducts = sampleProducts.map((product) => {
      const processedProduct = { ...product };

      // Xử lý các trường có định dạng MongoDB JSON
      if (product.price && product.price.$numberInt) {
        processedProduct.price = parseInt(product.price.$numberInt);
      }
      if (product.discountPrice && product.discountPrice.$numberInt) {
        processedProduct.discountPrice = parseInt(
          product.discountPrice.$numberInt
        );
      }
      if (product.countInStock && product.countInStock.$numberInt) {
        processedProduct.countInStock = parseInt(
          product.countInStock.$numberInt
        );
      }
      if (product.rating && product.rating.$numberDouble) {
        processedProduct.rating = parseFloat(product.rating.$numberDouble);
      }
      if (product.numReviews && product.numReviews.$numberInt) {
        processedProduct.numReviews = parseInt(product.numReviews.$numberInt);
      }

      // Xử lý dimensions
      if (product.dimensions) {
        const dims = {};
        Object.keys(product.dimensions).forEach((key) => {
          const value = product.dimensions[key];
          if (value.$numberInt) {
            dims[key] = parseInt(value.$numberInt);
          } else if (value.$numberDouble) {
            dims[key] = parseFloat(value.$numberDouble);
          } else {
            dims[key] = value;
          }
        });
        processedProduct.dimensions = dims;
      }

      // Xóa _id để MongoDB tự tạo
      delete processedProduct._id;

      return processedProduct;
    });

    // Import sản phẩm vào database
    console.log("📝 Đang import sản phẩm...");
    const result = await Product.insertMany(processedProducts);

    console.log(`✅ Import thành công ${result.length} sản phẩm!`);

    // Hiển thị thống kê
    const stats = await Product.aggregate([
      {
        $group: {
          _id: "$collection",
          count: { $sum: 1 },
          avgPrice: { $avg: "$price" },
        },
      },
      { $sort: { count: -1 } },
    ]);

    console.log("\n📊 Thống kê sản phẩm theo collection:");
    stats.forEach((stat) => {
      console.log(
        `- ${stat._id}: ${stat.count} sản phẩm, giá TB: ${Math.round(
          stat.avgPrice
        ).toLocaleString()}đ`
      );
    });

    const categoryStats = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    console.log("\n📊 Thống kê sản phẩm theo danh mục:");
    categoryStats.forEach((stat) => {
      console.log(`- ${stat._id}: ${stat.count} sản phẩm`);
    });

    console.log("\n🎉 Hoàn thành import sản phẩm mẫu!");
    process.exit(0);
  } catch (error) {
    console.error(`❌ Lỗi khi import sản phẩm: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
};

// Run the import function
importSampleProducts();
