// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const Product = require("./models/Product");
// const User = require("./models/User");
// const products = require("./data/products"); // Dữ liệu sản phẩm mẫu
// const users = require("./data/users"); // Dữ liệu người dùng mẫu (nếu có)
// const cart = require("./models/cart"); // Nếu cần sử dụng Cart
// const bcrypt = require("bcryptjs");

// // Load env vars
// dotenv.config();

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Import data
// const importData = async () => {
//   try {
//     // Xóa dữ liệu hiện có
//     await Product.deleteMany();
//     await User.deleteMany();
//     await cart.deleteMany();

//     console.log("Data deleted successfully");

//     // Tạo admin user
//     const adminUser = await User.create({
//       name: "Admin User",
//       email: "admin@example.com",
//       password: "123456",
//       role: "admin",
//     });

//     console.log("Admin user created");

//     // Thêm user Id vào mỗi sản phẩm
//     const sampleProducts = products.map((product) => {
//       return { ...product, user: adminUser._id };
//     });

//     // Import sản phẩm vào database
//     await Product.insertMany(sampleProducts);

//     console.log("Data imported successfully");
//     process.exit();
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// // Destroy data
// const destroyData = async () => {
//   try {
//     await Product.deleteMany();
//     await User.deleteMany();

//     console.log("Data destroyed successfully");
//     process.exit();
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// // Xử lý tham số dòng lệnh để quyết định import hay destroy
// if (process.argv[2] === "-d") {
//   destroyData();
// } else {
//   importData();
// }

// backend/seeder.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Collection = require("./models/Collection");
const dataManager = require("./data/dataManager");

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

// Import data
const importData = async (options = {}) => {
  try {
    console.log("🚀 Bắt đầu import dữ liệu...");

    // Parse command line options
    const uploadImages = process.argv.includes('--upload-images');
    const skipClear = process.argv.includes('--skip-clear');
    const onlyProducts = process.argv.includes('--only-products');
    const onlyUsers = process.argv.includes('--only-users');
    const onlyCollections = process.argv.includes('--only-collections');

    console.log("⚙️ Tùy chọn:");
    console.log(`   - Upload images to Cloudinary: ${uploadImages ? '✅' : '❌'}`);
    console.log(`   - Skip clearing data: ${skipClear ? '✅' : '❌'}`);
    console.log(`   - Only products: ${onlyProducts ? '✅' : '❌'}`);
    console.log(`   - Only users: ${onlyUsers ? '✅' : '❌'}`);  
    console.log(`   - Only collections: ${onlyCollections ? '✅' : '❌'}`);

    // Xóa dữ liệu hiện có (trừ khi skip)
    if (!skipClear) {
      console.log("🗑️ Đang xóa dữ liệu cũ...");
      if (!onlyUsers && !onlyCollections) await Product.deleteMany();
      if (!onlyProducts && !onlyCollections) await User.deleteMany();
      if (!onlyProducts && !onlyUsers) await Collection.deleteMany();
      console.log("✅ Đã xóa dữ liệu cũ");
    }

    // Lấy dữ liệu từ DataManager
    const data = await dataManager.getAllData({
      uploadImages: uploadImages,
      includeExistingData: true,
      createSamples: true
    });

    let adminUser = null;

    // Import Users (nếu không chỉ products/collections)
    if (!onlyProducts && !onlyCollections) {
      console.log("👥 Đang import users...");
      
      // Tạo admin user trước
      adminUser = await User.create({
        name: "Admin User",
        email: "admin@example.com", 
        password: "123456",
        role: "admin",
      });
      console.log("👑 Admin user đã được tạo");

      // Import các users khác
      if (data.users.length > 0) {
        await User.insertMany(data.users);
        console.log(`✅ Đã import ${data.users.length} users`);
      }
    } else {
      // Nếu không import users, tìm admin user hiện có
      adminUser = await User.findOne({ email: "admin@example.com" });
      if (!adminUser) {
        console.log("⚠️ Không tìm thấy admin user, tạo mới...");
        adminUser = await User.create({
          name: "Admin User",
          email: "admin@example.com",
          password: "123456", 
          role: "admin",
        });
      }
    }

    // Import Collections (nếu không chỉ products/users)
    if (!onlyProducts && !onlyUsers) {
      console.log("🏷️ Đang import collections...");
      if (data.collections.length > 0) {
        await Collection.insertMany(data.collections);
        console.log(`✅ Đã import ${data.collections.length} collections`);
      }
    }

    // Import Products (nếu không chỉ users/collections)
    if (!onlyUsers && !onlyCollections) {
      console.log("📦 Đang import products...");
      
      // Thêm user ID vào tất cả products
      const productsWithUser = data.products.map(product => ({
        ...product,
        user: adminUser._id,
        // Xóa _id nếu có để MongoDB tự tạo
        _id: undefined
      }));

      if (productsWithUser.length > 0) {
        const insertedProducts = await Product.insertMany(productsWithUser);
        console.log(`✅ Đã import ${insertedProducts.length} products`);
      }
    }

    // Hiển thị thống kê cuối cùng
    await displayStatistics();

    // Lưu backup nếu cần
    if (uploadImages) {
      await dataManager.saveToFile(data, `backup-${Date.now()}.json`);
    }

    console.log("\n🎉 Import dữ liệu hoàn thành!");
    process.exit(0);

  } catch (error) {
    console.error(`❌ Lỗi: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
};

// Destroy data
const destroyData = async () => {
  try {
    const confirmArgs = ['--confirm', '-y', '--yes'];
    const isConfirmed = confirmArgs.some(arg => process.argv.includes(arg));
    
    if (!isConfirmed) {
      console.log("⚠️ Cảnh báo: Bạn sắp xóa TẤT CẢ dữ liệu!");
      console.log("Thêm --confirm để xác nhận: npm run seed:destroy -- --confirm");
      process.exit(1);
    }

    console.log("🗑️ Đang xóa tất cả dữ liệu...");
    
    await Product.deleteMany();
    await User.deleteMany(); 
    await Collection.deleteMany();

    console.log("✅ Đã xóa tất cả dữ liệu");
    process.exit(0);
  } catch (error) {
    console.error(`❌ Lỗi: ${error.message}`);
    process.exit(1);
  }
};

// Hiển thị thống kê
const displayStatistics = async () => {
  try {
    const [userCount, productCount, collectionCount] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(), 
      Collection.countDocuments()
    ]);

    console.log("\n📊 THỐNG KÊ DATABASE:");
    console.log(`   👥 Users: ${userCount}`);
    console.log(`   📦 Products: ${productCount}`);
    console.log(`   🏷️ Collections: ${collectionCount}`);

    // Thống kê products theo collection
    if (productCount > 0) {
      const productStats = await Product.aggregate([
        {
          $group: {
            _id: "$collection",
            count: { $sum: 1 },
            avgPrice: { $avg: "$price" }
          }
        },
        { $sort: { count: -1 } }
      ]);

      console.log("\n📈 THỐNG KÊ PRODUCTS THEO COLLECTION:");
      productStats.forEach(stat => {
        console.log(`   ${stat._id}: ${stat.count} sản phẩm (TB: ${Math.round(stat.avgPrice).toLocaleString()}đ)`);
      });
    }

  } catch (error) {
    console.error("Lỗi khi hiển thị thống kê:", error.message);
  }
};

// Xử lý tham số dòng lệnh
const action = process.argv[2];

switch (action) {
  case '-d':
  case '--destroy':
    destroyData();
    break;
  case '--stats':
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(async () => {
        await displayStatistics();
        process.exit(0);
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
      });
    break;
  default:
    importData();
    break;
}

/* 
CÁCH SỬ DỤNG:

1. Import tất cả dữ liệu (không upload ảnh):
   npm run seed
   
2. Import tất cả dữ liệu + upload ảnh lên Cloudinary:
   npm run seed -- --upload-images
   
3. Import chỉ products:
   npm run seed -- --only-products
   
4. Import chỉ users: 
   npm run seed -- --only-users
   
5. Import chỉ collections:
   npm run seed -- --only-collections
   
6. Import mà không xóa dữ liệu cũ:
   npm run seed -- --skip-clear
   
7. Xóa tất cả dữ liệu:
   npm run seed -- --destroy --confirm
   
8. Xem thống kê:
   npm run seed -- --stats

CẤU HÌNH CLOUDINARY (tùy chọn):
Thêm vào file .env:
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key  
CLOUDINARY_API_SECRET=your_api_secret
*/