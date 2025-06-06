import React from 'react'

const OrderManagement = () => {

    const orders = [
        {
            _id: '1',
            user: {
                _id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com',
            },
            phone: '0909090909',
            address: '1234567890',
            paymentMethod: 'cash',
            products: [
                {
                    _id: '1',
                    name: 'Product 1',
                    price: 100000,
                    quantity: 1,
                },
            ],
            total: 100000,
            status: 'pending',

        },
        {
            _id: '2',
            user: {
                _id: '2',
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
            },
            phone: '0909090909',
            address: '1234567890',
            paymentMethod: 'cash',
            products: [
                {
                    _id: '2',
                    name: 'Product 2',
                    price: 100000,
                    quantity: 1,
                },
            ],
            total: 100000,
            status: 'pending',

        },

    ]

    const handleStatusChange = (orderId, status) => {
        console.log(`Order ID: ${orderId}, Status: ${status}`);
    }

    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className='text-3xl font-bold mb-6'>Order Management</h2>
            <div className='overflow-x-auto'>
                <table className='min-w-full text-left text-gray-600 border border-gray-100 border-collapse'>
                    <thead className='text-xs text-black uppercase bg-gray-100'>
                        <tr>
                            <th className='px-4 py-3'>Order ID</th>
                            <th className='px-4 py-3'>User</th>
                            <th className='px-4 py-3'>Phone</th>
                            <th className='px-4 py-3'>Address</th>
                            <th className='px-4 py-3'>Payment Method</th>
                            <th className='px-4 py-3'>Products</th>
                            <th className='px-4 py-3'>Total</th>
                            <th className='px-4 py-3'>Status</th>
                            <th className='px-4 py-3'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} className='border-b border-gray-100'>
                                    <td className='p-4 font-medium whitespace-nowrap'>#{order._id}</td>
                                    <td className='p-4 '>{order.user.name}</td>
                                    <td className='p-4'>{order.phone}</td>
                                    <td className='p-4'>{order.address}</td>
                                    <td className='p-4'>{order.paymentMethod}</td>
                                    <td className='p-4'>{order.products.map((product) => product.name).join(', ')}</td>
                                    <td className='p-4'>{order.total}</td>
                                    <td className='p-4'>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            className='p-1 border border-gray-300 rounded-md'>
                                            <option value='pending'>Pending</option>
                                            <option value='processing'>Processing</option>
                                            <option value='shipped'>Shipped</option>
                                            <option value='delivered'>Delivered</option>
                                            <option value='cancelled'>Cancelled</option>
                                        </select>
                                    </td>
                                    <td className='p-4'>
                                        <button
                                            onClick={() => handleStatusChange(order._id, 'Delivered')}
                                            className='bg-blue-500 text-white px-4 py-1 border border-gray-300 rounded-md hover:bg-blue-600'>
                                            Mark as Delivered
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={10} className='px-4 text-center'>No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderManagement