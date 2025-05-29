import React, { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

const Information = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.pathname === "/information" ||
      location.pathname === "/information/"
    ) {
      navigate("about", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">THÔNG TIN</h1>
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        {/* Sidebar */}
        <aside className="md:w-1/4 w-full mb-4 md:mb-0">
          <ul className="bg-white border rounded p-4 md:p-0 md:border-0 md:bg-transparent">
            <li>
              <NavLink
                to="about"
                className={({ isActive }) =>
                  `mb-2 block text-gray-700 hover:underline px-0 py-1 text-base${
                    isActive ? " font-bold" : "font-normal"
                  }`
                }
                end
              >
                Thông tin hoạt động
              </NavLink>
            </li>
            <li>
              <NavLink
                to="sponsorship"
                className={({ isActive }) =>
                  `mb-2 block text-gray-700 hover:underline px-0 py-1 text-base${
                    isActive ? " font-bold" : "font-normal"
                  }`
                }
              >
                Đại sứ Thương hiệu
              </NavLink>
            </li>
          </ul>
        </aside>
        {/* Main content */}
        <section className="flex-1 bg-white border rounded p-6 min-h-[300px]">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default Information;
