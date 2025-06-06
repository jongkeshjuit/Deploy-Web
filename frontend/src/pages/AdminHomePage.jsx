import React from 'react'
import { Link } from 'react-router-dom'

const AdminHomePage = () => {
    const orders = [
        {
            _id: 1,
            user: {
                name: "John Doe",
            },
            totalPrice: 100,
            status: "Pending",
        },
        {
            _id: 2,
            user: {
                name: "John Doe",
            },
            totalPrice: 100,
            status: "Processing",
        }
    ]
    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h1 className='text-2xl font-bold mb-6'>Admin Dashboard</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                <div className='bg-white p-6 rounded-lg shadow-md'>
                    <h2 className='text-lg font-semibold mb-4'>Revenue</h2>
                    <p className='text-2xl'>$1000</p>
                </div>
                <div className='bg-white p-6 rounded-lg shadow-md'>
                    <h2 className='text-lg font-semibold mb-4'>Total Orders</h2>
                    <p className='text-2xl'>{orders.length}</p>
                    <Link to="/admin/orders" className='text-blue-500 hover:underline'>Manage Orders</Link>
                </div>
                <div className='bg-white p-6 rounded-lg shadow-md'>
                    <h2 className='text-lg font-semibold mb-4'>Total Products</h2>
                    <p className='text-2xl'>200</p>
                    <Link to="/admin/products" className='text-blue-500 hover:underline'>Manage Products</Link>
                </div>
            </div>
            <div className='mt-6'>
                <h2 className='text-lg font-bold mb-4'>Recent Orders</h2>
                <div className='overflow-x-auto'>
                    <table className='min-w-full text-left text-gray-600 border border-gray-100 border-collapse'>
                        <thead className='text-xs text-black uppercase bg-gray-100'>
                            <tr>
                                <th scope='col' className='px-3 py-3'>Order ID</th>
                                <th scope='col' className='px-3 py-3'>User</th>
                                <th scope='col' className='px-3 py-3'>Total Price</th>
                                <th scope='col' className='px-3 py-3'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr
                                        key={order._id} className='border-b border-gray-100'>
                                        <td className='px-3 py-3'>{order._id}</td>
                                        <td className='px-3 py-3'>{order.user.name}</td>
                                        <td className='px-3 py-3'>{order.totalPrice}</td>
                                        <td className='px-3 py-3'>{order.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className='px-3 py-3 text-center'>No orders found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminHomePage