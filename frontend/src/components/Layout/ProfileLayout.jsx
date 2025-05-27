import React from "react";
import { Link, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto w-full py-6 sm:py-10 gap-1 sm:gap-8 px-2 sm:px-4 md:px-0">
        {/* Sidebar */}
        <aside className=" md:w-1/5 border-b md:border-b-0 md:border-r border-gray-200 pr-0 md:pr-6 mb-4 md:mb-0 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center md:text-left">
            Tư cách thành viên
          </h2>
          <nav className="flex flex-row md:flex-col gap-2 text-gray-700 text-base justify-center md:justify-start">
            <Link
              to="info"
              className="hover:underline font-semibold px-2 py-1 md:px-0 md:py-0 text-center md:text-left"
            >
              Hồ sơ cá nhân
            </Link>
            <Link
              to="orders"
              className="hover:underline font-semibold px-2 py-1 md:px-0 md:py-0 text-center md:text-left"
            >
              Lịch sử đơn hàng
            </Link>
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
