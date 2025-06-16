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
    const fetchOptions = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        const products = res.data.products || [];

        const uniqueColors = new Map();
        const materialSet = new Set();
        const categorySet = new Set();

        products.forEach((product) => {
          (product.colors || []).forEach((color) => {
            if (color.name && color.code) {
              uniqueColors.set(color.code, {
                name: color.name,
                code: color.code
              });
            }
          });
          if (product.material) materialSet.add(product.material);
          if (product.category) categorySet.add(product.category);
        });

        setColorOptions(Array.from(uniqueColors.values()));
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

    let colors = [];
    if (params.color) {
      const colorCodes = params.color.split(",");
      colors = colorCodes
        .map(code => {
          // Chuẩn hóa mã màu
          const normalizedCode = code.startsWith("#") ? code.toUpperCase() : `#${code.toUpperCase()}`;
          const foundColor = colorOptions.find(c => c.code.toUpperCase() === normalizedCode);
          return foundColor ? { name: foundColor.name, code: foundColor.code } : null;
        })
        .filter(Boolean);
    }

    setFilters({
      color: colors,
      size: params.size ? params.size.split(",") : [],
      price: params.price ? [params.price] : [],
      material: params.material ? params.material.split(",") : [],
      category: params.category ? params.category.split(",") : [],
    });
  }, [searchParams, colorOptions]);

  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters };

    if (type === "price") {
      newFilters.price = [value];
    } else if (type === "color") {
      const existingColor = newFilters.color.find(c => c.code.toUpperCase() === value.code.toUpperCase());
      if (existingColor) {
        newFilters.color = newFilters.color.filter(c => c.code.toUpperCase() !== value.code.toUpperCase());
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

    // Cập nhật URL params
    const newParams = { ...Object.fromEntries(searchParams) };

    // Update filter params
    Object.entries(newFilters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        if (key === "color") {
          // Gửi mã màu không có dấu # và in hoa
          newParams[key] = values.map(c => c.code.replace("#", "").toUpperCase()).join(",");
        } else if (key === "price" && values.length === 1) {
          newParams[key] = values[0];
        } else {
          newParams[key] = values.join(",");
        }
      } else {
        delete newParams[key];
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

    // Preserve non-filter params
    const newParams = { ...Object.fromEntries(searchParams) };
    Object.keys(filters).forEach(key => {
      delete newParams[key];
    });
    setSearchParams(newParams);
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

      <div className="mb-6">
        <label className="block font-medium text-gray-700 mb-3">Màu sắc</label>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <button
              key={color.code}
              onClick={() => handleFilterChange("color", color)}
              className={`w-8 h-8 rounded-full border-2 cursor-pointer ${filters.color.some(c => c.code === color.code)
                ? "border-black"
                : "border-gray-300"
                }`}
              style={{ backgroundColor: color.code }}
              title={color.name}
            >
              {/* {filters.color.some(c => c.code === color.code) && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full border-2 border-white" />
              )} */}
            </button>
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
            {/* Màu sắc đã chọn */}
            {filters.color.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {filters.color.map((color) => (
                  <button
                    key={color.code}
                    onClick={() => handleFilterChange("color", color)}
                    className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-sm flex items-center gap-1 hover:bg-gray-200"
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color.code }}
                    />
                    <span>{color.name}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                ))}
              </div>
            )}

            {/* Kích thước đã chọn */}
            {filters.size.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {filters.size.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleFilterChange("size", s)}
                    className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-sm flex items-center gap-1 hover:bg-gray-200"
                  >
                    <span>{s}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                ))}
              </div>
            )}

            {/* Giá đã chọn */}
            {filters.price.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {filters.price.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleFilterChange("price", p)}
                    className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-sm flex items-center gap-1 hover:bg-gray-200"
                  >
                    <span>{price.find(item => item.value === p)?.name || p}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                ))}
              </div>
            )}

            {/* Chất liệu đã chọn */}
            {filters.material.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {filters.material.map((m) => (
                  <button
                    key={m}
                    onClick={() => handleFilterChange("material", m)}
                    className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-sm flex items-center gap-1 hover:bg-gray-200"
                  >
                    <span>{m}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                ))}
              </div>
            )}

            {/* Danh mục đã chọn */}
            {filters.category.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {filters.category.map((c) => (
                  <button
                    key={c}
                    onClick={() => handleFilterChange("category", c)}
                    className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-sm flex items-center gap-1 hover:bg-gray-200"
                  >
                    <span>{c}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;
