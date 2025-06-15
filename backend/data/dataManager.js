// backend/data/dataManager.js
const users = require('./users');
const products = require('./products');
const collections = require('./collections');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Cấu hình Cloudinary (nếu sử dụng)
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

class DataManager {
  constructor() {
    this.users = users;
    this.products = products;
    this.collections = collections;
  }

  // ================== USER MANAGEMENT ==================
  getUsers() {
    return this.users;
  }

  createSampleUsers() {
    // Làm sạch dữ liệu users hiện có (xóa _id, id không hợp lệ)
    const cleanedUsers = this.users.map(user => {
      const { _id, id, ...cleanUser } = user; // Xóa _id và id
      return {
        ...cleanUser,
        // Đảm bảo có đầy đủ các trường bắt buộc
        name: cleanUser.name || 'Unknown User',
        email: cleanUser.email || `user${Date.now()}@example.com`,
        password: cleanUser.password || '123456',
        role: cleanUser.role || 'customer'
      };
    });

    // Tạo thêm users mẫu nếu cần
    const additionalUsers = [
      {
        name: "Sample Customer 1",
        email: "customer1@example.com",
        password: "123456",
        role: "customer",
        gender: "male",
        phone: "0901234567",
        address: "123 Nguyen Hue St",
        city: "Ho Chi Minh",
        district: "District 1",
        ward: "Ben Nghe Ward",
        birth: new Date('1995-06-15')
      },
      {
        name: "Sample Customer 2", 
        email: "customer2@example.com",
        password: "123456",
        role: "customer",
        gender: "female",
        phone: "0907654321",
        address: "456 Le Loi St",
        city: "Ho Chi Minh",
        district: "District 3", 
        ward: "Ward 1",
        birth: new Date('1992-08-22')
      }
    ];

    return [...cleanedUsers, ...additionalUsers];
  }

  // ================== COLLECTION MANAGEMENT ==================
  getCollections() {
    return this.collections;
  }

  createSampleCollections() {
    const sampleCollections = [
      {
        id: "summer",
        name: "Summer Collection",
        bannerUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
        description: "Bộ sưu tập mùa hè 2025 mang đến làn gió mới với những thiết kế trẻ trung, năng động và đầy màu sắc, sử dụng chất liệu nhẹ mát, thoáng khí, phù hợp cho mọi hoạt động ngày hè.",
        products: []
      },
      {
        id: "winter", 
        name: "Winter Collection",
        bannerUrl: "https://images.unsplash.com/photo-1544966503-7cc4ac7b6201?w=800&h=600&fit=crop",
        description: "Bộ sưu tập mùa đông 2025 là sự kết hợp giữa vẻ đẹp hiện đại và cảm giác ấm áp, với những thiết kế dày dặn, phom dáng ôm vừa vặn.",
        products: []
      },
      {
        id: "autumn",
        name: "Autumn Collection", 
        bannerUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop",
        description: "Bộ sưu tập mùa thu 2025 mang đến hơi thở dịu dàng và sâu lắng của thời khắc chuyển mùa.",
        products: []
      },
      {
        id: "spring",
        name: "Spring Collection",
        bannerUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop", 
        description: "Bộ sưu tập mùa xuân 2025 tươi mới với sắc màu rực rỡ và thiết kế nhẹ nhàng.",
        products: []
      }
    ];

    return sampleCollections;
  }

  // ================== PRODUCT MANAGEMENT ==================
  getProducts() {
    return this.products;
  }

  // Hàm upload ảnh lên Cloudinary (tùy chọn)
  async uploadImageToCloudinary(imageUrl, folder = 'wukudada-products') {
    try {
      if (!process.env.CLOUDINARY_CLOUD_NAME) {
        console.log('⚠️ Cloudinary chưa được cấu hình, sử dụng URL gốc từ Unsplash');
        return imageUrl;
      }

      console.log(`📤 Đang upload: ${imageUrl}`);
      const result = await cloudinary.uploader.upload(imageUrl, {
        folder: folder,
        public_id: `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        overwrite: true,
        resource_type: "image",
        transformation: [
          { width: 500, height: 600, crop: "fill" },
          { quality: "auto", format: "auto" }
        ]
      });

      console.log(`✅ Upload thành công: ${result.secure_url}`);
      return result.secure_url;
    } catch (error) {
      console.error(`❌ Lỗi upload ảnh: ${error.message}`);
      console.log(`🔄 Fallback: sử dụng URL gốc từ Unsplash`);
      return imageUrl; // Fallback về URL gốc từ Unsplash
    }
  }

  // Xử lý ảnh cho products (có thể upload hoặc giữ nguyên)
  async processProductImages(products, uploadToCloudinary = false) {
    console.log(`🔄 Đang xử lý ${products.length} sản phẩm...`);
    
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      
      if (uploadToCloudinary && product.images && product.images.length > 0) {
        console.log(`📷 Xử lý ảnh cho sản phẩm: ${product.name}`);
        
        for (let j = 0; j < product.images.length; j++) {
          const currentUrl = product.images[j].url;
          product.images[j].url = await this.uploadImageToCloudinary(currentUrl);
          
          // Thêm delay nhỏ để tránh rate limit
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    }

    return products;
  }

  // Tạo products với ảnh sample từ Unsplash
  createSampleProducts() {
    // Làm sạch dữ liệu products hiện có
    const cleanedProducts = this.products.map(product => {
      const { _id, ...cleanProduct } = product; // Xóa _id để MongoDB tự tạo
      return cleanProduct;
    });

    const sampleProducts = [
      {
        name: "Áo Thun Nam Basic Premium",
        description: "Áo thun nam basic chất liệu cotton cao cấp, form regular fit thoải mái, phù hợp mặc hàng ngày và dạo phố.",
        price: 350000,
        discountPrice: 299000,
        countInStock: 100,
        sku: `AT-NAM-${Date.now()}-001`,
        // sku: `AT-NAM-PREMIUM-${Date.now()}`, 
        category: "Áo phông",
        brand: "Wukudada",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Đen", "Trắng", "Xám", "Navy"],
        collection: "summer",
        material: "100% Cotton",
        gender: "Men",
        images: [
          {
            url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
            altText: "Áo thun nam basic đen"
          },
          {
            url: "https://images.unsplash.com/photo-1583743814966-8936f37f27bf?w=500&h=600&fit=crop", 
            altText: "Áo thun nam basic trắng"
          }
        ],
        isFeatured: true,
        isPublished: true,
        rating: 4.5,
        numReviews: 125,
        tags: ["basic", "cotton", "nam", "hàng ngày"],
        metaTitle: "Áo Thun Nam Basic Premium - Wukudada",
        metaDescription: "Áo thun nam basic cotton cao cấp, form regular fit thoải mái",
        metaKeywords: ["áo thun nam", "basic", "cotton"],
        dimensions: {
          length: 70,
          width: 52, 
          height: 1,
          weight: 0.25
        }
      },
      {
        name: "Váy Midi Nữ Elegant", 
        description: "Váy midi nữ thiết kế thanh lịch, chất liệu chiffon mềm mại, form A-line tôn dáng, phù hợp dự tiệc.",
        price: 750000,
        discountPrice: 649000,
        countInStock: 50,
        sku: `V-NU-${Date.now()}-002`,
        category: "Váy",
        brand: "Wukudada", 
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Đen", "Navy", "Đỏ đô"],
        collection: "autumn",
        material: "100% Chiffon",
        gender: "Women",
        images: [
          {
            url: "https://images.unsplash.com/photo-1566479179817-7c3c8c86e2e1?w=500&h=600&fit=crop",
            altText: "Váy midi nữ elegant đen"
          }
        ],
        isFeatured: true,
        isPublished: true,
        rating: 4.8,
        numReviews: 89,
        tags: ["váy", "midi", "elegant", "chiffon"],
        metaTitle: "Váy Midi Nữ Elegant - Wukudada",
        metaDescription: "Váy midi nữ chiffon mềm mại, form A-line tôn dáng",
        metaKeywords: ["váy midi", "elegant", "chiffon"],
        dimensions: {
          length: 85,
          width: 45,
          height: 1, 
          weight: 0.3
        }
      },
      {
        name: "Quần Jean Nam Slim Fit",
        description: "Quần jean nam form slim fit, chất liệu denim cao cấp co giãn nhẹ, tôn dáng và thoải mái.",
        price: 850000,
        discountPrice: 749000,
        countInStock: 75,
        sku: `QJ-NAM-${Date.now()}-003`,
        category: "Quần jean", 
        brand: "Wukudada",
        sizes: ["28", "29", "30", "31", "32", "33", "34"],
        colors: ["Xanh đậm", "Đen", "Xanh nhạt"],
        collection: "winter",
        material: "98% Cotton, 2% Spandex",
        gender: "Men",
        images: [
          {
            url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
            altText: "Quần jean nam slim fit xanh đậm"
          }
        ],
        isFeatured: false,
        isPublished: true,
        rating: 4.6,
        numReviews: 156,
        tags: ["jean", "slim fit", "nam", "denim"],
        metaTitle: "Quần Jean Nam Slim Fit - Wukudada", 
        metaDescription: "Quần jean nam slim fit denim cao cấp, tôn dáng",
        metaKeywords: ["quần jean nam", "slim fit", "denim"],
        dimensions: {
          length: 105,
          width: 38,
          height: 2,
          weight: 0.6
        }
      }
    ];

    return [...cleanedProducts, ...sampleProducts];
  }

  // ================== MAIN PROCESSING METHODS ==================
  
  // Lấy tất cả dữ liệu đã xử lý
  async getAllData(options = {}) {
    const {
      uploadImages = false,
      includeExistingData = true,
      createSamples = true
    } = options;

    console.log('🚀 DataManager: Bắt đầu xử lý dữ liệu...');

    // Lấy users
    const users = includeExistingData ? this.getUsers() : [];
    const finalUsers = createSamples ? this.createSampleUsers() : users;

    // Lấy collections  
    const collections = includeExistingData ? this.getCollections() : [];
    const finalCollections = createSamples ? this.createSampleCollections() : collections;

    // Lấy và xử lý products
    const products = includeExistingData ? this.getProducts() : [];
    const sampleProducts = createSamples ? this.createSampleProducts() : [];
    const allProducts = [...products, ...sampleProducts];
    
    const finalProducts = await this.processProductImages(allProducts, uploadImages);

    console.log('✅ DataManager: Hoàn thành xử lý dữ liệu');
    console.log(`📊 Thống kê: ${finalUsers.length} users, ${finalCollections.length} collections, ${finalProducts.length} products`);

    return {
      users: finalUsers,
      collections: finalCollections, 
      products: finalProducts
    };
  }

  // Phương thức lưu vào file JSON (backup)
  async saveToFile(data, filename = 'processed-data.json') {
    try {
      const filePath = path.join(__dirname, filename);
      await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`💾 Đã lưu dữ liệu vào: ${filePath}`);
    } catch (error) {
      console.error(`❌ Lỗi lưu file: ${error.message}`);
    }
  }
}

module.exports = new DataManager();