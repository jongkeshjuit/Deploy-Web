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
                            ? "bg-gray-800 text-white py-3 px-4 rounded flex items-center space-x-2"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}
                >
                    <FaUser size={20} />
                    <span>Users</span>
                </NavLink>
                {/* products */}
                <NavLink
                    to="/admin/products"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-800 text-white py-3 px-4 rounded flex items-center space-x-2"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}
                >
                    <FaBoxOpen size={20} />
                    <span>Products</span>
                </NavLink>
                {/* orders */}
                <NavLink
                    to="/admin/orders"
                    className={({ isActive }) => isActive
                        ? "bg-gray-800 text-white py-3 px-4 rounded flex items-center space-x-2"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}
                >
                    <FaClipboardList size={20} />
                    <span>Orders</span>
                </NavLink>
                {/* shop */}
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-gray-800 text-white py-3 px-4 rounded flex items-center space-x-2"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}
                >
                    <FaStore size={20} />
                    <span>Shop</span>
                </NavLink>
            </nav>
            <div className='mt-6'>
                <button
                    onClick={handleLogout}
                    className='w-full bg-red-500 text-white py-3 px-4 rounded flex items-center space-x-2'>
                    <FaSignOutAlt size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    )
}

export default AdminSidebar;

