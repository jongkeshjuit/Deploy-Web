import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="bg-white flex flex-col">
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-[5%] w-full py-4 sm:py-6 gap-1 sm:gap-6">
        {/* Sidebar */}
        <aside className="md:w-1/5 border-b md:border-b-0 md:border-r border-gray-200 pr-0 md:pr-4 mb-3 md:mb-0 flex-shrink-0">
          <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-center md:text-left">
            Tư cách thành viên
          </h2>
          <nav className="flex flex-row md:flex-col gap-1 text-gray-700 text-[15px] justify-center md:justify-start">
            <NavLink
              to="info"
              className={({ isActive }) =>
                `hover:underline px-2 py-1 md:px-0 md:py-0 text-center md:text-left ${
                  isActive ? "font-bold" : "font-normal"
                }`
              }
              end
            >
              Hồ sơ cá nhân
            </NavLink>
            <NavLink
              to="orders"
              className={({ isActive }) =>
                `hover:underline px-2 py-1 md:px-0 md:py-0 text-center md:text-left ${
                  isActive ? "font-bold" : "font-normal"
                }`
              }
            >
              Lịch sử đơn hàng
            </NavLink>
          </nav>
        </aside>
        {/* Main content */}
        <main className="flex-1 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
