import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    color: [],
    size: [],
    price: [],
    material: [],
    category: [],
  });
  const [colorOptions, setColorOptions] = useState([]);
  const [materialOptions, setMaterialOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const size = ["S", "M", "L", "XL", "XXL"];

  const price = [
    { name: "Dưới 500.000đ", value: "under-500" },
    { name: "500.000đ - 1.000.000đ", value: "500-1000" },
    { name: "1.000.000đ - 1.500.000đ", value: "1000-1500" },
    { name: "Trên 1.500.000đ", value: "above-1500" },
  ];

  useEffect(() => {
    // Lấy tất cả sản phẩm để sinh filter động
    const fetchOptions = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        const products = res.data.products || [];

        // Lấy tất cả màu sắc
        const colorSet = new Set();
        const materialSet = new Set();
        const categorySet = new Set();

        products.forEach((p) => {
          // Xử lý màu sắc mới với cấu trúc {name, code}
          (p.colors || []).forEach((c) => {
            if (typeof c === 'object' && c.name && c.code) {
              colorSet.add(JSON.stringify({ name: c.name, code: c.code }));
            }
          });
          if (p.material) materialSet.add(p.material);
          if (p.category) categorySet.add(p.category);
        });

        // Chuyển đổi colorSet thành mảng các object
        const colors = Array.from(colorSet).map(c => JSON.parse(c));
        setColorOptions(colors);
        setMaterialOptions(Array.from(materialSet));
        setCategoryOptions(Array.from(categorySet));
      } catch (err) {
        console.error("Error fetching filter options:", err);
        setColorOptions([]);
        setMaterialOptions([]);
        setCategoryOptions([]);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    const params = Object.fromEntries(searchParams);

    // Xử lý đặc biệt cho color
    let colors = [];
    if (params.color) {
      const colorNames = params.color.split(",");
      colors = colorNames.map(name => {
        const colorOption = colorOptions.find(c => c.name === name);
        return colorOption || { name, code: "#000000" }; // fallback nếu không tìm thấy
      });
    }

    setFilters({
      color: colors,
      size: params.size ? params.size.split(",") : [],
      price: params.price ? params.price.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      category: params.category ? params.category.split(",") : [],
    });
  }, [searchParams]);

  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters };

    if (type === "price") {
      newFilters.price = [value];
    } else if (type === "color") {
      const colorStr = JSON.stringify(value);
      if (newFilters.color.some(c => JSON.stringify(c) === colorStr)) {
        newFilters.color = newFilters.color.filter(c => JSON.stringify(c) !== colorStr);
      } else {
        newFilters.color = [...newFilters.color, value];
      }
    } else {
      if (newFilters[type].includes(value)) {
        newFilters[type] = newFilters[type].filter((v) => v !== value);
      } else {
        newFilters[type] = [...newFilters[type], value];
      }
    }

    setFilters(newFilters);

    // Update URL params
    const newParams = {};
    Object.entries(newFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        if (key === "color") {
          newParams[key] = encodeURIComponent(JSON.stringify(values));
        } else {
          newParams[key] = values.join(",");
        }
      }
    });
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setFilters({
      color: [],
      size: [],
      price: [],
      material: [],
      category: [],
    });
    setSearchParams({});
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium">Bộ lọc</h3>
        {Object.values(filters).some((arr) => arr.length > 0) && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Xóa tất cả
          </button>
        )}
      </div>

      {/* Màu sắc */}
      <div className="mb-6">
        <label className="block font-medium text-gray-700 mb-3">Màu sắc</label>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <button
              key={color.name}
              onClick={() => handleFilterChange("color", color)}
              className={`w-8 h-8 rounded-full border-2 cursor-pointer transition hover:scale-105 ${filters.color.some(c => c.name === color.name) ? "border-black" : "border-gray-300"
                }`}
              style={{ backgroundColor: color.code }}
              title={color.name}
            ></button>
          ))}
        </div>
      </div>

      {/* Kích thước */}
      <div className="mb-6">
        <label className="block font-medium text-gray-700 mb-3">
          Kích thước
        </label>
        <div className="flex flex-wrap gap-2">
          {size.map((s) => (
            <button
              key={s}
              onClick={() => handleFilterChange("size", s)}
              className={`w-10 h-10 flex items-center justify-center border ${filters.size.includes(s)
                ? "border-black"
                : "border-gray-300 hover:border-black"
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Giá */}
      <div className="mb-6">
        <label className="block font-medium text-gray-700 mb-3">Giá</label>
        <div className="space-y-2">
          {price.map((p) => (
            <label
              key={p.value}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="radio"
                name="price"
                className="w-4 h-4 rounded border-gray-300 accent-black text-black focus:ring-black"
                checked={filters.price[0] === p.value}
                onChange={() => handleFilterChange("price", p.value)}
              />
              <span className="ml-2 text-gray-600 group-hover:text-gray-900">
                {p.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Chất liệu */}
      <div className="mb-6">
        <label className="block font-medium text-gray-700 mb-3">
          Chất liệu
        </label>
        <div className="space-y-2">
          {materialOptions.map((m, idx) => (
            <label
              key={m + "-" + idx}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 accent-black text-black focus:ring-black"
                checked={filters.material.includes(m)}
                onChange={() => handleFilterChange("material", m)}
              />
              <span className="ml-2 text-gray-600 group-hover:text-gray-900">
                {m}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Danh mục */}
      <div className="mb-6">
        <label className="block font-medium text-gray-700 mb-3">Danh mục</label>
        <div className="space-y-2">
          {categoryOptions.map((cat, idx) => (
            <label
              key={cat + "-" + idx}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 accent-black text-black focus:ring-black"
                checked={filters.category.includes(cat)}
                onChange={() => handleFilterChange("category", cat)}
              />
              <span className="ml-2 text-gray-600 group-hover:text-gray-900">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {Object.values(filters).some((arr) => arr.length > 0) && (
        <div className="mt-8 pt-6 border-t">
          <h4 className="font-medium text-gray-700 mb-3">Bộ lọc đã chọn</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([type, values]) =>
              values.map((value) => {
                let label = value;
                if (type === "price") {
                  label = price.find((p) => p.value === value)?.name || value;
                } else if (type === "color") {
                  label = value.name;
                } else if (type === "material") {
                  label = value;
                } else if (type === "category") {
                  label = value;
                }

                return (
                  <button
                    key={`${type}-${JSON.stringify(value)}`}
                    onClick={() => handleFilterChange(type, value)}
                    className="px-2 py-1 rounded-full bg-amber-100 text-amber-800 text-sm flex items-center gap-1 hover:bg-amber-200"
                  >
                    {label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;
