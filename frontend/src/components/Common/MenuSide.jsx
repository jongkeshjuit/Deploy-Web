import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GrClose, GrMenu } from "react-icons/gr";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000";

const MenuSide = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isWomanSubMenuOpen, setIsWomanSubMenuOpen] = useState(false);
  const [manCategories, setManCategories] = useState([]);
  const [womanCategories, setWomanCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Lấy danh sách sản phẩm nam
        const manResponse = await axios.get(`${API_URL}/api/products`, {
          params: { gender: "man" },
        });
        // Lấy danh sách sản phẩm nữ
        const womanResponse = await axios.get(`${API_URL}/api/products`, {
          params: { gender: "woman" },
        });

        // Lọc và loại bỏ các danh mục trùng lặp
        const manCategories = [
          ...new Set(manResponse.data.products.map((p) => p.category)),
        ];
        const womanCategories = [
          ...new Set(womanResponse.data.products.map((p) => p.category)),
        ];

        setManCategories(manCategories);
        setWomanCategories(womanCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSubMenuOpen(false);
    setIsWomanSubMenuOpen(false);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const toggleWomanSubMenu = () => {
    setIsWomanSubMenuOpen(!isWomanSubMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsSubMenuOpen(false);
    setIsWomanSubMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="relative z-50">
        <button
          onClick={toggleMenu}
          className="flex items-center gap-2.5 cursor-pointer"
          aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
        >
          {isMenuOpen ? (
            <GrClose className="text-[20px]" />
          ) : (
            <GrMenu className="text-[20px]" />
          )}
          <div className="overflow-hidden h-[20px] relative">
            <div
              className={`flex flex-col transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "-translate-y-[20px]" : "translate-y-0"
              }`}
            >
              <span className="text-[14px] font-normal h-[20px] hidden md:flex items-center justify-center">
                Menu
              </span>
              <span className="text-[14px] font-normal h-[20px] hidden md:flex items-center justify-center">
                Đóng
              </span>
            </div>
          </div>
        </button>
      </div>
      {/* Nền tối */}
      <div
        className={`fixed inset-0 w-screen h-full bg-black/75 z-30 transition-[opacity,visibility] duration-200 ease-in-out ${
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={closeMenu}
      />
      {/* Menu chính */}
      <div
        className={`fixed top-0 left-0 w-[300px] h-full bg-white shadow-lg z-40 transition-all duration-300 ease-in-out transform overflow-y-auto ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-4 mt-[88px]">
          {/* Đồ Nam với submenu */}
          <div className="relative">
            <div className="flex items-center justify-between pl-[50px] pr-[20px]">
              <Link
                to="gendercollections/man"
                className="text-[20px] font-normal hover:underline underline-offset-4"
                onClick={closeMenu}
              >
                Đồ Nam
              </Link>
              <button
                onClick={toggleSubMenu}
                className="text-[16px] font-normal hover:text-gray-600 transition-transform duration-200"
                style={{
                  transform: isSubMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                ▼
              </button>
            </div>
            {/* Submenu danh mục */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isSubMenuOpen ? "opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex-col gap-2 mt-2 pl-[70px] pr-[20px]">
                {manCategories.map((category, index) => (
                  <Link
                    key={index}
                    to={`gendercollections/man?category=${encodeURIComponent(
                      category
                    )}`}
                    className="text-[16px] font-normal text-gray-600 hover:text-black hover:underline underline-offset-2 py-1"
                    onClick={closeMenu}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Đồ Nữ với submenu */}
          <div className="relative">
            <div className="flex items-center justify-between pl-[50px] pr-[20px]">
              <Link
                to="gendercollections/women"
                className="text-[20px] font-normal hover:underline underline-offset-4"
                onClick={closeMenu}
              >
                Đồ Nữ
              </Link>
              <button
                onClick={toggleWomanSubMenu}
                className="text-[16px] font-normal hover:text-gray-600 transition-transform duration-200"
                style={{
                  transform: isWomanSubMenuOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              >
                ▼
              </button>
            </div>

            {/* Submenu danh mục */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isWomanSubMenuOpen ? "opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex-col gap-2 mt-2 pl-[70px] pr-[20px]">
                {womanCategories.map((category, index) => (
                  <Link
                    key={index}
                    to={`gendercollections/women?category=${encodeURIComponent(
                      category
                    )}`}
                    className="text-[16px] font-normal text-gray-600 hover:text-black hover:underline underline-offset-2 py-1"
                    onClick={closeMenu}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuSide;
