import { useParams, useSearchParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { getProducts } from "../services/productService";
import ProductGrid from "../components/Products/ProductGrid";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";

function GenderCollection() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [collection, setCollection] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchCollectionAndProducts = async () => {
      try {
        // Lấy thông tin bộ sưu tập từ API
        const res = await axios.get(`/api/collections/${id}`);
        setCollection(res.data);

        // Lấy sản phẩm theo gender (và các filter khác)
        const filters = { gender: id };
        const color = searchParams.get("color");
        const size = searchParams.get("size");
        const material = searchParams.get("material");
        const category = searchParams.get("category");
        const sortBy = searchParams.get("sort");
        if (color) filters.colors = color;
        if (size) filters.sizes = size;
        if (material) filters.material = material;
        if (category) filters.category = category;
        if (sortBy) filters.sortBy = sortBy;
        const response = await getProducts(filters);
        const products = response.products || [];
        setProducts(products);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải dữ liệu bộ sưu tập");
        setLoading(false);
      }
    };
    fetchCollectionAndProducts();
  }, [id, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOutsideClick = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  if (loading) return <div className="text-center mt-10">Đang tải...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!collection) return <h2>Không tìm thấy bộ sưu tập!</h2>;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full px-4 md:px-[50px]">
        <h2 className="text-xl md:text-2xl text-left font-medium mb-4 md:mb-6 mt-6 md:mt-10">
          {collection.name}
        </h2>
        {collection.bannerUrl && (
          <img
            src={collection.bannerUrl}
            alt={collection.name}
            className="w-full object-cover rounded mb-4"
          />
        )}
        {collection.description && (
          <p className="text-base md:text-lg text-gray-700 mb-4">{collection.description}</p>
        )}
      </div>
      {/* filter sidebar */}
      <div className="w-full px-4 md:px-[50px] flex justify-between items-center">
        <button
          onClick={toggleSidebar}
          className="filter-button flex items-center gap-2 rounded-full border border-gray-300 px-3 md:px-4 py-1 md:py-1.5 hover:bg-gray-50 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 md:w-5 md:h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
          <span className="text-sm md:text-base">Filters</span>
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
          } fixed inset-y-0 z-50 left-0 w-[280px] md:w-80 overflow-y-auto transition-transform duration-300 ease-in-out bg-white`}
        >
          <FilterSidebar />
        </div>
        {/* sort options */}
        <div>
          <SortOptions />
        </div>
      </div>
      {/* Hiển thị số lượng sản phẩm */}
      <p className="text-black text-base md:text-[20px] font-medium my-2 px-4 md:px-[50px]">
        {products.length} sản phẩm
      </p>
      {/* Hiển thị "Không tìm thấy sản phẩm" nếu không có kết quả */}
      {products.length === 0 ? (
        <div className="w-full px-4 md:px-[50px] text-center py-6 md:py-10">
          <p className="text-gray-500 text-sm md:text-base">
            Không tìm thấy sản phẩm phù hợp với bộ lọc đã chọn
          </p>
        </div>
      ) : (
        <div className="w-full px-4 md:px-[50px]">
          <ProductGrid products={products} />
        </div>
      )}
    </div>
  );
}

export default GenderCollection;
