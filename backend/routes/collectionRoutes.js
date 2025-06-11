const express = require("express");
const router = express.Router();
const Collection = require("../models/Collection");
const Product = require("../models/Product");

// Lấy tất cả bộ sưu tập
router.get("/", async (req, res) => {
  try {
    const collections = await Collection.find().populate("products");
    res.json(collections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy bộ sưu tập theo id
router.get("/:id", async (req, res) => {
  try {
    const collection = await Collection.findOne({ id: req.params.id }).populate(
      "products"
    );
    if (!collection)
      return res.status(404).json({ message: "Không tìm thấy bộ sưu tập" });
    res.json(collection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy sản phẩm theo collection id
router.get("/:id/products", async (req, res) => {
  try {
    const { color, size, material, category, price, sortBy } = req.query;
    console.log("Filter params received:", {
      color,
      size,
      material,
      category,
      price,
      sortBy,
    });
    const query = { collection: req.params.id }; // Filter nhiều giá trị (dạng mảng)
    if (color) {
      const colors = color.split(",");
      query.colors = { $in: colors };
    }
    if (size) {
      const sizes = size.split(",");
      query.sizes = { $in: sizes };
    }
    if (material) {
      const materials = material.split(",");
      query.material = materials.length > 1 ? { $in: materials } : material;
    }
    if (category) {
      const categories = category.split(",");
      query.category = categories.length > 1 ? { $in: categories } : category;
    }
    // Filter theo price
    if (price) {
      if (price.startsWith("under-")) {
        const max = Number(price.replace("under-", ""));
        query.price = { $lt: max * 1000 };
      } else if (price.startsWith("above-")) {
        const min = Number(price.replace("above-", ""));
        query.price = { $gt: min * 1000 };
      } else if (price.includes("-")) {
        const [min, max] = price.split("-").map(Number);
        query.price = { $gte: min * 1000, $lte: max * 1000 };
      }
    }
    let sortOptions = {};
    if (sortBy) {
      switch (sortBy) {
        case "price_asc":
          sortOptions = { price: 1 };
          break;
        case "price_desc":
          sortOptions = { price: -1 };
          break;
        case "newest":
          sortOptions = { createdAt: -1 };
          break;
        case "name_asc":
          sortOptions = { name: 1 };
          break;
        case "name_desc":
          sortOptions = { name: -1 };
          break;
        default:
          sortOptions = {};
      }
    }
    console.log("Final query:", query);
    console.log("Sort options:", sortOptions);
    const products = await Product.find(query).sort(sortOptions);
    console.log("Products found:", products.length);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tạo mới bộ sưu tập
router.post("/", async (req, res) => {
  try {
    const { id, name, bannerUrl, description, products } = req.body;
    const collection = new Collection({
      id,
      name,
      bannerUrl,
      description,
      products,
    });
    await collection.save();
    res.status(201).json(collection);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật bộ sưu tập
router.put("/:id", async (req, res) => {
  try {
    const updated = await Collection.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Không tìm thấy bộ sưu tập" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa bộ sưu tập
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Collection.findOneAndDelete({ id: req.params.id });
    if (!deleted)
      return res.status(404).json({ message: "Không tìm thấy bộ sưu tập" });
    res.json({ message: "Đã xóa bộ sưu tập" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
