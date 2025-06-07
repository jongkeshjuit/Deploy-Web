import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    color: [],
    size: [],
    price: [],
    material: [],
    category: [],
  });

  const color = [
    { name: "Red", value: "red" },
    { name: "Blue", value: "blue" },
    { name: "Green", value: "green" },
    { name: "Yellow", value: "yellow" },
    { name: "Black", value: "black" },
    { name: "White", value: "white" },
    { name: "Brown", value: "brown" },
    { name: "Pink", value: "pink" },
  ];

  const size = ["S", "M", "L", "XL", "XXL"];

  const price = [
    { name: "Dưới 500.000đ", value: "under-500" },
    { name: "500.000đ - 1.000.000đ", value: "500-1000" },
    { name: "1.000.000đ - 1.500.000đ", value: "1000-1500" },
    { name: "Trên 1.500.000đ", value: "above-1500" },
  ];
  const materials = [
    { name: "Cotton", value: "cotton" },
    { name: "Linen (Vải lanh)", value: "linen" },
    { name: "Polyester", value: "polyester" },
    { name: "Jean / Denim", value: "denim" },
    { name: "Da (Leather)", value: "leather" },
    { name: "Lụa (Silk)", value: "silk" },
    { name: "Len (Wool)", value: "wool" },
    { name: "Nỉ (Fleece)", value: "fleece" },
  ];

  const categories = [
    { name: "Áo phông", value: "Áo phông" },
    { name: "Áo sơ mi", value: "Áo sơ mi" },
    { name: "Quần tây", value: "Quần tây" },
    { name: "Quần short", value: "Quần short" },
    { name: "Áo khoác", value: "Áo khoác" },
  ];
  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    setFilters({
      color: params.color ? params.color.split(",") : [],
      size: params.size ? params.size.split(",") : [],
      price: params.price ? params.price.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      category: params.category ? params.category.split(",") : [],
    });
  }, [searchParams]);

  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters };

    if (newFilters[type].includes(value)) {
      newFilters[type] = newFilters[type].filter((v) => v !== value);
    } else {
      newFilters[type] = [...newFilters[type], value];
    }

    setFilters(newFilters);

    // Update URL params
    const newParams = {};
    Object.entries(newFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        newParams[key] = values.join(",");
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
          {color.map((c) => (
            <button
              key={c.value}
              onClick={() => handleFilterChange("color", c.value)}
              className={`w-8 h-8 rounded-full border-2 cursor-pointer transition hover:scale-105 ${
                filters.color.includes(c.value)
                  ? "border-black"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: c.value }}
              title={c.name}
            />
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
              className={`w-10 h-10 flex items-center justify-center border ${
                filters.size.includes(s)
                  ? " border-black"
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
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 accent-black text-black focus:ring-black"
                checked={filters.price.includes(p.value)}
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
          {materials.map((m) => (
            <label
              key={m.value}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 accent-black text-black focus:ring-black"
                checked={filters.material.includes(m.value)}
                onChange={() => handleFilterChange("material", m.value)}
              />
              <span className="ml-2 text-gray-600 group-hover:text-gray-900">
                {m.name}
              </span>
            </label>
          ))}
        </div>{" "}
      </div>

      {/* Danh mục */}
      <div className="mb-6">
        <label className="block font-medium text-gray-700 mb-3">Danh mục</label>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat.value}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 accent-black text-black focus:ring-black"
                checked={filters.category.includes(cat.value)}
                onChange={() => handleFilterChange("category", cat.value)}
              />
              <span className="ml-2 text-gray-600 group-hover:text-gray-900">
                {cat.name}
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
                const label = (() => {
                  switch (type) {
                    case "color":
                      return color.find((c) => c.value === value)?.name;
                    case "size":
                      return value;
                    case "price":
                      return price.find((p) => p.value === value)?.name;
                    case "material":
                      return materials.find((m) => m.value === value)?.name;
                    case "category":
                      return categories.find((c) => c.value === value)?.name;
                    default:
                      return value;
                  }
                })();

                return (
                  <button
                    key={`${type}-${value}`}
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
