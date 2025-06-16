import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categoryGroups = {
    all: "Tất cả",
    tops: {
      label: "Áo",
      categories: ["Áo sơ mi", "Áo hoodie", "Áo blazer", "Áo vest", "Áo sweater", "Áo henley", "Áo khoác", "Áo thun", "Áo polo"]
    },
    bottoms: {
      label: "Quần",
      categories: ["Quần short", "Quần jogger", "Quần cargo", "Quần legging", "Quần palazzo", "Quần jean", "Quần tây", "Quần culottes"]
    },
    dresses: {
      label: "Váy & Đầm",
      categories: ["Chân váy", "Đầm maxi", "Váy liền"]
    },
    accessories: {
      label: "Phụ kiện",
      categories: ["Túi xách", "Ví", "Thắt lưng", "Mũ", "Khăn"]
    }
  };

  const categoryOptions = [
    { value: "all", label: "Tất cả" },
    { value: "tops", label: "Áo" },
    { value: "bottoms", label: "Quần" },
    { value: "dresses", label: "Váy & Đầm" },
    { value: "accessories", label: "Phụ kiện" }
  ];

  const genderOptions = [
    { value: "all", label: "Tất cả" },
    { value: "man", label: "Nam" },
    { value: "woman", label: "Nữ" },
    { value: "unisex", label: "Unisex" }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products?limit=100`);
        setProducts(res.data.products || []);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      try {
        const userToken =
          localStorage.getItem("userToken") || localStorage.getItem("token");
        await axios.delete(`${API_URL}/api/products/${id}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setProducts(products.filter((p) => p._id !== id));
        alert("Xóa sản phẩm thành công!");
      } catch (err) {
        alert("Xóa sản phẩm thất bại!");
      }
    }
  };

  const getFilteredProducts = () => {
    let filtered = [...products];

    // Lọc theo từ khóa tìm kiếm
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query)
      );
    }

    // Lọc theo danh mục
    if (selectedCategory !== "all") {
      const group = categoryGroups[selectedCategory];
      if (group) {
        filtered = filtered.filter(product =>
          group.categories.includes(product.category)
        );
      }
    }

    // Lọc theo giới tính
    if (selectedGender !== "all") {
      filtered = filtered.filter(product =>
        product.gender === selectedGender
      );
    }

    return filtered;
  };

  const getGenderLabel = (gender) => {
    switch (gender) {
      case "man": return "Nam";
      case "woman": return "Nữ";
      case "unisex": return "Unisex";
      default: return gender;
    }
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Quản lý sản phẩm</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên hoặc SKU..."
              className="border border-gray-300 rounded px-3 py-1 min-w-[250px]"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1"
            >
              {categoryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1"
            >
              {genderOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Link
          to="/admin/products/new"
          className="bg-black text-white px-4 py-2 hover:bg-gray-700 cursor-pointer"
        >
          Thêm sản phẩm
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-gray-500 border border-gray-100 border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-3 py-3">Tên sản phẩm</th>
              <th className="px-3 py-3">Danh mục</th>
              <th className="px-3 py-3">Giới tính</th>
              <th className="px-3 py-3">Giá</th>
              <th className="px-3 py-3">SKU</th>
              <th className="px-3 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  Đang tải...
                </td>
              </tr>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr
                  key={product._id}
                  className="bg-white border-b border-gray-100"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="p-4">
                    {product.category}
                  </td>
                  <td className="p-4">
                    {getGenderLabel(product.gender)}
                  </td>
                  <td className="p-4">{product.price.toLocaleString('vi-VN')} VND</td>
                  <td className="p-4">{product.sku}</td>
                  <td className="p-4">
                    <Link
                      to={`/admin/products/${product._id}`}
                      className="inline-flex items-center bg-black text-white px-3 py-1 mr-2 hover:bg-gray-700 cursor-pointer"
                    >
                      Sửa sản phẩm
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="inline-flex items-center text-black px-3 py-1 border border-black hover:border-gray-700 hover:text-gray-700 cursor-pointer"
                    >
                      Xóa sản phẩm
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  {selectedCategory === "all" && selectedGender === "all"
                    ? "Không tìm thấy sản phẩm nào"
                    : `Không tìm thấy sản phẩm ${selectedCategory !== "all" ? `thuộc danh mục ${categoryGroups[selectedCategory]?.label}` : ''} ${selectedGender !== "all" ? `dành cho ${getGenderLabel(selectedGender).toLowerCase()}` : ''}`
                  }
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
