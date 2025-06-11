import React from "react";
import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    // Tạo một object mới từ tất cả các params hiện tại
    const currentParams = {};
    searchParams.forEach((value, key) => {
      currentParams[key] = value;
    });

    // Cập nhật hoặc thêm mới param sortBy
    if (sortBy === "default") {
      delete currentParams.sortBy;
    } else {
      currentParams.sortBy = sortBy;
    }

    // Set lại tất cả params
    setSearchParams(currentParams);
  };

  return (
    <div className="flex items-center justify-end">
      <select
        id="sort"
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || "default"}
        className="border border-gray-300 text-sm p-2 cursor-pointer"
      >
        <option value="default">Mặc định</option>
        <option value="price_asc">Giá: Tăng dần</option>
        <option value="price_desc">Giá: Giảm dần</option>
        <option value="name_asc">Tên: A-Z</option>
        <option value="name_desc">Tên: Z-A</option>
      </select>
    </div>
  );
};

export default SortOptions;
