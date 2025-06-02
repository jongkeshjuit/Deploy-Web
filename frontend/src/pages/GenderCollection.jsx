import { useParams } from "react-router-dom";
import { collections } from "../assets/dummyData";
import ProductGrid from "../components/Products/ProductGrid";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "./SortOptions";
import { useRef, useState, useEffect } from "react";

function GenderCollection() {
  const { id } = useParams();
  const collection = collections.find((c) => c.id === id);
  if (!collection) return <h2>Collection not found!</h2>;

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

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full px-[50px]">
        <h2 className="text-2xl text-left font-medium mb-6 mt-10">{collection.name}</h2>
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
          <SortOptions />
        </div>
      </div>

      <div className="w-full px-[50px]">
        <ProductGrid product={collection.products} />
      </div>
    </div>
  );
}

export default GenderCollection;
