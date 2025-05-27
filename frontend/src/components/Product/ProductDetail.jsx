import React, { useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { IoMdHeartEmpty } from "react-icons/io";
import { PiShoppingCartSimple } from "react-icons/pi";

const ProductDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const product = location.state?.productData;

    const [selectedSize, setSelectedSize] = useState(product?.details.sizes[0] || 'M');
    const [selectedColor, setSelectedColor] = useState(product?.details.colors[0]);
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="container mx-auto px-[50px] py-8">
                <p className="text-center text-xl">Không tìm thấy sản phẩm</p>
            </div>
        );
    }

    // Find the featured product that matches the selected color
    const selectedVariant = product.featuredProducts.find(p => p.color === selectedColor) || product.featuredProducts[0];

    return (
        <div className="container mx-auto px-[50px] py-8">
            {/* Product Section */}
            <div className="flex justify-between">
                {/* Image Gallery */}
                <div className="space-y-4 w-[60%]">
                    <div className="grid grid-cols-2 w-full bg-gray-100 overflow-hidden">
                        {product.featuredProducts.map((variant) => (
                            <img
                                src={variant.image}
                                alt={variant.name}
                                className="w-full h-full object-cover"
                            />
                        ))}
                    </div>
                    {/* Product Description */}
                    <div className="space-y-4 pt-6 border-t">
                        <h3 className="font-medium">Mô tả sản phẩm</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Product Features */}
                    <div className="space-y-4 pt-6 border-t">
                        <h3 className="font-medium">Đặc điểm nổi bật</h3>
                        <ul className="space-y-2 text-gray-600">
                            {product.details.features.map((feature, index) => (
                                <li key={index}>• {feature}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-4 pt-6 border-t">
                        <h3 className="font-medium">Chi tiết sản phẩm</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>• Chất liệu: {product.details.material}</li>
                            <li>• Xuất xứ: {product.details.origin}</li>
                            <li>• Kiểu dáng: {product.details.style}</li>
                            <li>• Hướng dẫn bảo quản: {product.details.care}</li>
                        </ul>
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col space-y-6 w-[35%] sticky top-[120px] self-start h-[calc(100vh-120px)]">
                    <div className="overflow-y-auto h-full pr-4 space-y-6">
                        <div>
                            <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
                            <p className="text-2xl font-medium text-gray-900">{product.price}</p>
                        </div>

                        {/* Color Selection */}
                        <div>
                            <h3 className="text-sm font-medium mb-3">Màu sắc</h3>
                            <div className="flex gap-3">
                                {product.details.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`px-4 py-2 border rounded-lg
                                            ${selectedColor === color
                                                ? 'border-black bg-black text-white'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div>
                            <h3 className="text-sm font-medium mb-3">Kích thước</h3>
                            <div className="flex gap-3">
                                {product.details.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-10 h-10 flex items-center justify-center border
                                            ${selectedSize === size
                                                ? 'border-black bg-black text-white'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div>
                            <h3 className="text-sm font-medium mb-3">Số lượng</h3>
                            <div className="flex items-center bg-gray-100 rounded-full w-fit font-medium">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2"
                                >
                                    -
                                </button>
                                <span className="px-4 py-2">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-2"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <button className="w-full bg-black text-white py-3 hover:bg-gray-900 flex items-center justify-center gap-2 rounded-full">
                            <PiShoppingCartSimple className="text-xl" />
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>

            {/* Featured Products from the same collection */}
            <div className="mt-16">
                <h2 className="text-2xl font-medium mb-6">Sản phẩm cùng bộ sưu tập</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {product.featuredProducts.map((featuredProduct) => (
                        <div key={featuredProduct.id} className="group cursor-pointer">
                            <div className="aspect-square bg-gray-100 overflow-hidden mb-4">
                                <img
                                    src={featuredProduct.image}
                                    alt={featuredProduct.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="font-medium mb-1">{featuredProduct.name}</h3>
                            <p className="text-gray-900">{featuredProduct.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail; 