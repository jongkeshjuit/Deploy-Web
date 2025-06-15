import React, { useState } from 'react'
import { GrClose, GrMenu } from "react-icons/gr";
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    };
    return (
        <div className='min-h-screen flex flex-col md:flex-row relative'>
            {/* mobile toggle button */}
            <div className=' flex md:hidden p-4 bg-gray-800 text-white z-20'>
                <button onClick={toggleSidebar}>
                    <GrMenu size={24} />
                </button>
                <h1 className='ml-4 text-xl font-medium'>Bảng điều khiển</h1>
            </div>

            {/* overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className='fixed inset-0 bg-black/50 z-10 md:hidden'
                    onClick={toggleSidebar}
                >

                </div>
            )}

            {/* sidebar */}
            <div className={`bg-black w-64 min-h-screen text-white absolute md:relative transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:translate-x-0 md:static ease-in-out z-20`}>
                {/* sidebar */}
                <AdminSidebar />
            </div>

            {/* main content */}
            <div className='flex-grow p-6 overflow-auto'>
                <Outlet />
            </div>

        </div>
    )
}

export default AdminLayout