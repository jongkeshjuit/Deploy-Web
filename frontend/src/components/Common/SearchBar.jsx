import React, { useState, useEffect } from "react";
import { GrSearch, GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import ProductGrid from "../Products/ProductGrid";
import axios from "axios";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:9000';

  const toggleSearch = () => setIsOpen((prev) => !prev);
  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchTerm.trim()) {
        try {
          setLoading(true);
          const response = await axios.get(`${API_URL}/api/products/search`, {
            params: { query: searchTerm }
          });

          setSearchResults(response.data.products || []);
        } catch (error) {
          console.error("Error searching products:", error);
          setSearchResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, API_URL]);

  // Disable body scroll when search is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleSearch}
          className="flex items-center gap-2.5 cursor-pointer z-10 relative"
          aria-label="Mở tìm kiếm"
        >
          <GrSearch className="text-[20px]" />
          <span className="text-sm hidden md:inline">Tìm kiếm</span>
        </button>
      )}

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white z-50 transition-transform duration-200 ease-in-out ${isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="flex flex-col w-full h-full overflow-y-auto">
          {/* Header tìm kiếm */}
          <div className="w-full bg-white sticky top-0 z-20">
            <div className="flex items-center justify-between gap-4 flex-wrap px-4 md:px-0">
              {/* Input tìm kiếm */}
              <div className="relative flex-1 min-w-[250px] max-w-[600px] mt-6 md:mt-10 mx-auto">
                <input
                  type="text"
                  placeholder="Tìm sản phẩm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-100 h-10 px-4 py-2 pl-7 pr-20 rounded-full w-full placeholder:text-gray-700 focus:outline-none text-sm md:text-base"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 p-2 rounded-full bg-gray-100 text-gray-500 text-xs md:text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    Xóa
                  </button>
                )}
              </div>

              {/* Nút đóng */}
              <button
                type="button"
                onClick={toggleSearch}
                className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                aria-label="Đóng tìm kiếm"
              >
                <GrClose className="text-[16px] text-gray-500" />
              </button>
            </div>

            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-center my-4">
                <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-gray-900"></div>
              </div>
            )}

            {/* Tiêu đề kết quả nếu có */}
            {searchResults.length > 0 && !loading && (
              <h3 className="text-base md:text-lg font-normal my-2 px-4 md:mx-[50px]">
                Kết quả tìm kiếm ({searchResults.length}):
              </h3>
            )}

            {/* No results message */}
            {searchTerm && !loading && searchResults.length === 0 && (
              <div className="text-center my-4 px-4 md:mx-[50px]">
                <p className="text-gray-500 text-sm md:text-base">Không tìm thấy sản phẩm nào cho "{searchTerm}"</p>
              </div>
            )}
          </div>

          {/* Danh sách kết quả */}
          {searchResults.length > 0 && !loading && (
            <div className="w-full px-4 md:px-[50px] mb-10">
              <ProductGrid
                products={searchResults}
                onClick={() => setIsOpen(false)}
              />
            </div>
          )}

          {/* Popular searches or suggestions when no search term */}
          {!searchTerm && !loading && (
            <div className="w-full px-4 md:px-[50px] mb-10">
              <h3 className="text-base md:text-lg font-normal my-2">Gợi ý tìm kiếm:</h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {['Áo phông', 'Quần jean', 'Áo khoác', 'Váy', 'Giày'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setSearchTerm(suggestion);
                    }}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-xs md:text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;