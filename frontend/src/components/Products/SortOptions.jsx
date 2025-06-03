import React from 'react'
import { useSearchParams } from 'react-router-dom';

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    // Tạo một object mới từ tất cả các params hiện tại
    const currentParams = {};
    searchParams.forEach((value, key) => {
      currentParams[key] = value;
    });

    // Cập nhật hoặc thêm mới param sort
    if (sortBy === 'default') {
      delete currentParams.sort;
    } else {
      currentParams.sort = sortBy;
    }

    // Set lại tất cả params
    setSearchParams(currentParams);
  }

  return (
    <div className='flex items-center justify-end'>
      <select
        id="sort"
        onChange={handleSortChange}
        value={searchParams.get('sort') || 'default'}
        className='border border-gray-300 text-sm p-2 cursor-pointer'
      >
        <option value="default">Mặc định</option>
        <option value="price-asc">Giá: Tăng dần</option>
        <option value="price-desc">Giá: Giảm dần</option>
        <option value="name-asc">Tên: A-Z</option>
        <option value="name-desc">Tên: Z-A</option>
      </select>
    </div>
  )
}

export default SortOptions