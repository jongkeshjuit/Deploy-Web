const mongoose = require("mongoose");
const fs = require("fs");
const Product = require("./models/Product");
const User = require("./models/User");
const dotenv = require("dotenv");

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

const importSampleData = async () => {
  try {
    // Đọc dữ liệu từ file JSON
    const sampleProducts = JSON.parse(
      fs.readFileSync("./sample-products.json", "utf-8")
    );

    // Tạo admin user nếu chưa có
    let adminUser = await User.findOne({ email: "admin@example.com" });
    if (!adminUser) {
      adminUser = await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: "123456",
        role: "admin",
      });
      console.log("Admin user created");
    }

    // Thêm user Id vào mỗi sản phẩm và convert ObjectId
    const productsToInsert = sampleProducts.map((product) => {
      // Xóa _id từ MongoDB format để tạo mới
      const { _id, ...productData } = product;

      // Convert MongoDB number types thành JavaScript numbers
      if (productData.price && productData.price.$numberInt) {
        productData.price = parseInt(productData.price.$numberInt);
      }
      if (productData.discountPrice && productData.discountPrice.$numberInt) {
        productData.discountPrice = parseInt(
          productData.discountPrice.$numberInt
        );
      }
      if (productData.countInStock && productData.countInStock.$numberInt) {
        productData.countInStock = parseInt(
          productData.countInStock.$numberInt
        );
      }
      if (productData.rating && productData.rating.$numberDouble) {
        productData.rating = parseFloat(productData.rating.$numberDouble);
      }
      if (productData.numReviews && productData.numReviews.$numberInt) {
        productData.numReviews = parseInt(productData.numReviews.$numberInt);
      }

      // Convert dimensions
      if (productData.dimensions) {
        Object.keys(productData.dimensions).forEach((key) => {
          if (productData.dimensions[key].$numberInt) {
            productData.dimensions[key] = parseInt(
              productData.dimensions[key].$numberInt
            );
          }
          if (productData.dimensions[key].$numberDouble) {
            productData.dimensions[key] = parseFloat(
              productData.dimensions[key].$numberDouble
            );
          }
        });
      }

      return {
        ...productData,
        user: adminUser._id,
      };
    });

    // Import sản phẩm vào database
    const insertedProducts = await Product.insertMany(productsToInsert);
    console.log(`${insertedProducts.length} sản phẩm đã được thêm thành công!`);

    // In ra thống kê
    console.log("\n=== THỐNG KÊ SẢN PHẨM ===");
    console.log(`Tổng số sản phẩm: ${insertedProducts.length}`);

    const collections = [...new Set(insertedProducts.map((p) => p.collection))];
    console.log(`Số collection: ${collections.length}`);
    console.log(`Collections: ${collections.join(", ")}`);

    const categories = [...new Set(insertedProducts.map((p) => p.category))];
    console.log(`Số category: ${categories.length}`);
    console.log(`Categories: ${categories.join(", ")}`);

    process.exit(0);
  } catch (error) {
    console.error(`Lỗi: ${error.message}`);
    process.exit(1);
  }
};

const clearProducts = async () => {
  try {
    await Product.deleteMany({});
    console.log("Đã xóa tất cả sản phẩm");
    process.exit(0);
  } catch (error) {
    console.error(`Lỗi: ${error.message}`);
    process.exit(1);
  }
};

// Xử lý tham số dòng lệnh
if (process.argv[2] === "-clear") {
  clearProducts();
} else {
  importSampleData();
}
