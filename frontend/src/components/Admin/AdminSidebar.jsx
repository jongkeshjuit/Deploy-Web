import React from 'react'
import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/");
    }
    return (
        <div className='p-6'>
            <div className='mb-3'>
                <Link to="/admin" className='text-2xl font-medium'>
                    Wukudada
                </Link>
            </div>
            <nav className='flex flex-col space-y-2'>
                {/* users */}
                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-800 text-white py-3 px-4 flex items-center space-x-2"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white py-3 px-4 flex items-center space-x-2"}
                >
                    <FaUser size={20} />
                    <span>Tài khoản</span>
                </NavLink>
                {/* products */}
                <NavLink
                    to="/admin/products"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-800 text-white py-3 px-4 flex items-center space-x-2"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white py-3 px-4 flex items-center space-x-2"}
                >
                    <FaBoxOpen size={20} />
                    <span>Sản phẩm  </span>
                </NavLink>
                {/* collections */}
                <NavLink
                    to="/admin/collections"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-800 text-white py-3 px-4 flex items-center space-x-2"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white py-3 px-4 flex items-center space-x-2"}
                >
                    <FaBoxOpen size={20} />
                    <span>Bộ sưu tập  </span>
                </NavLink>
                {/* orders */}
                <NavLink
                    to="/admin/orders"
                    className={({ isActive }) => isActive
                        ? "bg-gray-800 text-white py-3 px-4 flex items-center space-x-2"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white py-3 px-4 flex items-center space-x-2"}
                >
                    <FaClipboardList size={20} />
                    <span>Đơn hàng</span>
                </NavLink>
                {/* shop */}
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-800 text-white py-3 px-4 flex items-center space-x-2"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white py-3 px-4 flex items-center space-x-2"}
                >
                    <FaStore size={20} />
                    <span>Cửa hàng</span>
                </NavLink>
            </nav>
        </div>
    )
}

export default AdminSidebar;

