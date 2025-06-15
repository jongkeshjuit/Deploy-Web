const express = require("express");
const router = express.Router();
const Collection = require("../models/Collection");
const Product = require("../models/Product");

// Lấy tất cả bộ sưu tập
router.get("/", async (req, res) => {
  try {
    const collections = await Collection.find();
    // Với mỗi collection, tìm các sản phẩm thuộc collection đó
    const collectionsWithProducts = await Promise.all(
      collections.map(async (col) => {
        const products = await Product.find({
          collection: col.id,
          isPublished: true
        });
        return { ...col.toObject(), products };
      })
    );
    res.json(collectionsWithProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy bộ sưu tập theo MongoDB _id
router.get("/:id", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection)
      return res.status(404).json({ message: "Không tìm thấy bộ sưu tập" });

    // Tìm các sản phẩm thuộc collection này
    const products = await Product.find({
      collection: collection.id,
      isPublished: true
    });
    res.json({ ...collection.toObject(), products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy sản phẩm theo collection id (tự nhập)
router.get("/:id/products", async (req, res) => {
  try {
    const { color, size, material, category, price, sortBy } = req.query;
    console.log("Filter params received:", {
      color, size, material, category, price, sortBy,
    });

    const query = { collection: req.params.id }; // Sử dụng id tự nhập

    if (color) query.colors = { $in: color.split(",") };
    if (size) query.sizes = { $in: size.split(",") };
    if (material) {
      const materials = material.split(",");
      query.material = materials.length > 1 ? { $in: materials } : material;
    }
    if (category) {
      const categories = category.split(",");
      query.category = categories.length > 1 ? { $in: categories } : category;
    }
    if (price) {
      if (price.startsWith("under-")) {
        query.price = { $lt: Number(price.replace("under-", "")) * 1000 };
      } else if (price.startsWith("above-")) {
        query.price = { $gt: Number(price.replace("above-", "")) * 1000 };
      } else if (price.includes("-")) {
        const [min, max] = price.split("-").map(Number);
        query.price = { $gte: min * 1000, $lte: max * 1000 };
      }
    }

    let sortOptions = {};
    switch (sortBy) {
      case "price_asc": sortOptions = { price: 1 }; break;
      case "price_desc": sortOptions = { price: -1 }; break;
      case "newest": sortOptions = { createdAt: -1 }; break;
      case "name_asc": sortOptions = { name: 1 }; break;
      case "name_desc": sortOptions = { name: -1 }; break;
    }

    const products = await Product.find(query).sort(sortOptions);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tạo mới bộ sưu tập
router.post("/", async (req, res) => {
  try {
    const { id, name, bannerUrl, description, status } = req.body;
    const collection = new Collection({
      id,
      name,
      bannerUrl,
      description,
      status: status || "active"
    });
    await collection.save();
    res.status(201).json(collection);
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      return res.status(400).json({
        message: "ID bộ sưu tập đã tồn tại, vui lòng chọn ID khác"
      });
    }
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật bộ sưu tập theo _id
router.put("/:id", async (req, res) => {
  try {
    const { name, bannerUrl, description, status } = req.body;
    const updated = await Collection.findByIdAndUpdate(
      req.params.id,
      { name, bannerUrl, description, status },
      { new: true, runValidators: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Không tìm thấy bộ sưu tập" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa bộ sưu tập theo _id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Collection.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Không tìm thấy bộ sưu tập" });
    res.json({ message: "Đã xóa bộ sưu tập" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
