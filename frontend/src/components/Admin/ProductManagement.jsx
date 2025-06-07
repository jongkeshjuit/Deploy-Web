import React from 'react'
import { Link } from 'react-router-dom'

const ProductManagement = () => {
    const products = [
        {
            _id: 1,
            name: "Shirt",
            price: 599000,
            sku: "1234567890",
        },
    ]
    const handelDelete = (id) => {
        // console.log(id)
        if (window.confirm("Are you sure you want to delete this product?")) {
            console.log("Deleted product with id:", id)
        }
    }
    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className='text-2xl font-bold mb-6'>Product Management</h2>
            <div className='overflow-x-auto'>
                <table className='min-w-full text-left text-gray-500 border border-gray-100 border-collapse'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
                        <tr>
                            <th className='px-3 py-3'>Name</th>
                            <th className='px-3 py-3'>Price</th>
                            <th className='px-3 py-3'>SKU</th>
                            <th className='px-3 py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product._id} className='bg-white border-b border-gray-100'>
                                    <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>{product.name}</td>
                                    <td className='p-4'>{product.price} VND</td>
                                    <td className='p-4'>{product.sku}</td>
                                    <td className='p-4'>
                                        <Link to={`/admin/products/${product._id}`} className='inline-flex items-center bg-blue-500 text-white px-3 py-1 rounded-full mr-2 hover:bg-blue-600 cursor-pointer'
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handelDelete(product._id)}
                                            className='inline-flex items-center bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 cursor-pointer'
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className='p-4 text-center'>No products found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductManagement