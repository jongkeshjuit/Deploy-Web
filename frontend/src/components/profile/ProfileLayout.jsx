import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="bg-white mx-[200px] my-[50px] ">
      <h2 className="text-base sm:text-2xl font-medium mb-3 sm:mb-4 text-center md:text-left md:mb-10">
        THÔNG TIN TÀI KHOẢN
      </h2>
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto w-full gap-1">
        {/* Sidebar */}
        <aside className="md:w-[25%] border-gray-200 pr-0 md:pr-4 mb-3 md:mb-0 flex-shrink-0">
          <nav className="flex flex-row md:flex-col gap-2 text-[15px] justify-center md:justify-start">
            <NavLink
              to="info"
              className={({ isActive }) =>
                `text-lg hover:underline text-center md:text-left ${isActive ? "font-medium" : "font-normal"
                }`
              }
              end
            >
              Hồ sơ cá nhân
            </NavLink>
            <NavLink
              to="orders"
              className={({ isActive }) =>
                `text-lg hover:underline px-2 py-1 md:px-0 md:py-0 text-center md:text-left ${isActive ? "font-medium" : "font-normal"
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
