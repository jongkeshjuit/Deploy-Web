import React from 'react';
import { useCart } from '../components/Cart/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems
    } = useCart();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-medium mb-8">Giỏ hàng ({getTotalItems()})</h1>

            {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400 mb-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <p className="text-gray-500 mb-4">Giỏ hàng của bạn đang trống</p>
                    <Link
                        to="/"
                        className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800"
                    >
                        Tiếp tục mua sắm
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item, index) => (
                            <div
                                key={`${item.product._id}-${item.size}-${item.color}`}
                                className="flex gap-4 p-4 bg-white border border-[#DCDCDC]"
                            >
                                {/* Product image */}
                                <Link to={`/product/${item.product._id}`} className="w-32 flex-shrink-0">
                                    <img
                                        src={item.product.images[0].url}
                                        alt={item.product.name}
                                        className="w-full h-full object-cover "
                                    />
                                </Link>

                                <div className="flex-1 flex flex-col justify-between">
                                    {/* Product details */}
                                    <div className='flex justify-between items-start'>
                                        <div>
                                            <Link
                                                to={`/product/${item.product._id}`}
                                                className="text-xl font-medium hover:underline"
                                            >
                                                {item.product.name}
                                            </Link>
                                            <div className="text-lg text-gray-500 mt-1">
                                                <p>Màu: {item.color}</p>
                                                <p>Size: {item.size}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(index)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                    {/* Price and quantity */}
                                    <div className="flex items-center justify-between mt-4">
                                        {/* Quantity */}
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => updateQuantity(index, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(index, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>
                                        {/* Price */}
                                        <div className="text-right">
                                            <p className="font-medium">
                                                {((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString('vi-VN')} VND
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-[#DCDCDC] p-6 sticky top-4">
                            <h2 className="text-2xl font-medium mb-4">Tổng đơn hàng</h2>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span>Tạm tính</span>
                                    <span>{getTotalPrice().toLocaleString('vi-VN')} VND</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Phí vận chuyển</span>
                                    <span>Miễn phí</span>
                                </div>
                                <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between font-medium">
                                        <span>Tổng tiền</span>
                                        <span>{getTotalPrice().toLocaleString('vi-VN')} VND</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Link
                                    to="/checkout"
                                    className="block w-full py-2 px-4 bg-red-500 text-white text-center hover:bg-red-400"
                                >
                                    Thanh toán
                                </Link>
                                <button
                                    onClick={clearCart}
                                    className="block w-full py-2 px-4 border border-black text-black text-center hover:bg-gray-100"
                                >
                                    Xóa giỏ hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart; 