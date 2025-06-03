import { useParams, useSearchParams } from "react-router-dom";
import { collections } from "../assets/dummyData";
import ProductGrid from "../components/Products/ProductGrid";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import { useRef, useState, useEffect } from "react";

function GenderCollection() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const collection = collections.find((c) => c.id === id);
  if (!collection) return <h2>Collection not found!</h2>;

  const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState(
    collection?.products || []
  );

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOutsideClick = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  // Thêm useEffect để xử lý filtering
  useEffect(() => {
    if (!collection) return;

    // Lấy các tham số filter từ URL
    const color = searchParams.get("color")?.split(",") || [];
    const size = searchParams.get("size")?.split(",") || [];
    const price = searchParams.get("price")?.split(",") || [];
    const material = searchParams.get("material")?.split(",") || [];
    const category = searchParams.get("category")?.split(",") || [];
    const sortBy = searchParams.get("sort") || "default";

    // Bước 1: Lọc sản phẩm
    let filtered = [...collection.products];

    if (color.length > 0) {
      filtered = filtered.filter((product) =>
        product.colors.some((c) => color.includes(c))
      );
    }

    if (size.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes.some((s) => size.includes(s))
      );
    }

    if (material.length > 0) {
      filtered = filtered.filter((product) =>
        material.includes(product.material)
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((product) =>
        category.includes(product.category)
      );
    }

    if (price.length > 0) {
      filtered = filtered.filter((product) => {
        return price.some((priceRange) => {
          const productPrice = product.price;
          switch (priceRange) {
            case "under-500":
              return productPrice < 500000;
            case "500-1000":
              return productPrice >= 500000 && productPrice <= 1000000;
            case "1000-1500":
              return productPrice >= 1000000 && productPrice <= 1500000;
            case "above-1500":
              return productPrice > 1500000;
            default:
              return true;
          }
        });
      });
    }

    // Bước 2: Sắp xếp sản phẩm đã lọc
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Giữ nguyên thứ tự mặc định
        break;
    }

    setFilteredAndSortedProducts(filtered);
  }, [collection, searchParams]); // Re-run khi collection hoặc searchParams thay đổi

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full px-[50px]">
        <h2 className="text-2xl text-left font-medium mb-6 mt-10">
          {collection.name}
        </h2>
      </div>
      {/* filter sidebar */}
      <div className="w-full px-[50px] flex justify-between">
        <button
          onClick={toggleSidebar}
          className="filter-button flex items-center gap-2 rounded-full border border-gray-300 px-4 py-1.5 hover:bg-gray-50 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
          Filters
        </button>

        {/* overlay */}
        <div
          className={`fixed inset-0 w-screen h-full bg-black/75 z-50 transition-[opacity,visibility] duration-200 ease-in-out ${
            isSidebarOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />
        {/* filter sidebar */}
        <div
          ref={sidebarRef}
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 z-50 left-0 w-80 overflow-y-auto transition-transform duration-300 ease-in-out bg-white`}
        >
          <FilterSidebar />
        </div>

        {/* sort options */}
        <div>
          <SortOptions />{" "}
        </div>
      </div>

      {/* Hiển thị số lượng sản phẩm */}
      <p className="text-black text-[20px] font-medium my-2 px-[50px]">
        {filteredAndSortedProducts.length} sản phẩm
      </p>

      {/* Hiển thị "Không tìm thấy sản phẩm" nếu không có kết quả */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="w-full px-[50px] text-center py-10">
          <p className="text-gray-500">
            Không tìm thấy sản phẩm phù hợp với bộ lọc đã chọn
          </p>
        </div>
      ) : (
        <div className="w-full px-[50px]">
          <ProductGrid product={filteredAndSortedProducts} />
        </div>
      )}
    </div>
  );
}

export default GenderCollection;
