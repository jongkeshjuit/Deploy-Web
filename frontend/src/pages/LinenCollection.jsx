import React from 'react';
import { Link } from 'react-router-dom';

const LinenCollection = () => {
    const linenProducts = [
        {
            id: 1,
            name: 'Áo Sơ Mi Linen Nam',
            price: '890.000₫',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80',
            description: 'Áo sơ mi linen cao cấp, thiết kế basic phù hợp mọi dịp',
            details: {
                material: 'Linen 100% tự nhiên',
                origin: 'Việt Nam',
                style: 'Regular fit',
                care: 'Giặt máy ở nhiệt độ thường, không tẩy',
                features: [
                    'Chất liệu thoáng mát',
                    'Thấm hút mồ hôi tốt',
                    'Độ bền cao',
                    'Phù hợp khí hậu nhiệt đới'
                ],
                sizes: ['S', 'M', 'L', 'XL'],
                colors: ['Trắng', 'Be', 'Xanh nhạt']
            },
            featuredProducts: [
                {
                    id: 101,
                    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80',
                    name: 'Áo Sơ Mi Linen Trắng',
                    price: '890.000₫',
                    color: 'Trắng'
                },
                {
                    id: 102,
                    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=500&q=80',
                    name: 'Áo Sơ Mi Linen Be',
                    price: '890.000₫',
                    color: 'Be'
                },
                {
                    id: 103,
                    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=500&q=80',
                    name: 'Áo Sơ Mi Linen Xanh Nhạt',
                    price: '890.000₫',
                    color: 'Xanh nhạt'
                }
            ]
        },
        {
            id: 2,
            name: 'Quần Linen Nữ Ống Rộng',
            price: '750.000₫',
            image: '/images/linen-duvet.jpg',
            description: 'Quần ống rộng linen cao cấp, phong cách hiện đại và thoải mái',
            details: {
                material: 'Linen blend (80% Linen, 20% Cotton)',
                origin: 'Việt Nam',
                style: 'Wide-leg fit',
                care: 'Giặt tay hoặc giặt máy nhẹ nhàng',
                features: [
                    'Thiết kế ống rộng thời trang',
                    'Lưng thun co giãn',
                    'Có túi hai bên',
                    'Phù hợp mọi dáng người'
                ],
                sizes: ['S', 'M', 'L'],
                colors: ['Đen', 'Be', 'Nâu nhạt']
            },
            featuredProducts: [
                {
                    id: 201,
                    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=500&q=80',
                    name: 'Quần Linen Ống Rộng Đen',
                    price: '750.000₫',
                    color: 'Đen'
                },
                {
                    id: 202,
                    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=500&q=80',
                    name: 'Quần Linen Ống Rộng Be',
                    price: '750.000₫',
                    color: 'Be'
                },
                {
                    id: 203,
                    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=500&q=80',
                    name: 'Quần Linen Ống Rộng Nâu',
                    price: '750.000₫',
                    color: 'Nâu nhạt'
                }
            ]
        },
        {
            id: 3,
            name: 'Váy Linen Maxi',
            price: '1.290.000₫',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80',
            description: 'Váy maxi linen thiết kế thanh lịch, phù hợp mùa hè',
            details: {
                material: 'Linen cao cấp nhập khẩu',
                origin: 'Pháp',
                style: 'Maxi dress',
                care: 'Giặt tay, phơi trong bóng râm',
                features: [
                    'Thiết kế xẻ tà tinh tế',
                    'Cổ V thanh lịch',
                    'Có lớp lót cotton',
                    'Phù hợp đi biển, dạo phố'
                ],
                sizes: ['S', 'M', 'L'],
                colors: ['Trắng', 'Hồng nhạt', 'Xanh mint']
            },
            featuredProducts: [
                {
                    id: 301,
                    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=500&q=80',
                    name: 'Váy Maxi Linen Trắng',
                    price: '1.290.000₫',
                    color: 'Trắng'
                },
                {
                    id: 302,
                    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=500&q=80',
                    name: 'Váy Maxi Linen Hồng',
                    price: '1.290.000₫',
                    color: 'Hồng nhạt'
                },
                {
                    id: 303,
                    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=500&q=80',
                    name: 'Váy Maxi Linen Mint',
                    price: '1.290.000₫',
                    color: 'Xanh mint'
                }
            ]
        },
        {
            id: 4,
            name: 'Áo Khoác Linen Unisex',
            price: '1.590.000₫',
            image: '/images/linen-runner.jpg',
            description: 'Áo khoác linen nhẹ nhàng, phong cách unisex hiện đại',
            details: {
                material: 'Linen premium blend',
                origin: 'Ý',
                style: 'Oversized fit',
                care: 'Giặt khô hoặc giặt tay nhẹ nhàng',
                features: [
                    'Thiết kế oversized hiện đại',
                    'Có túi hai bên và túi ngực',
                    'Cài cúc gỗ tự nhiên',
                    'Phù hợp nam nữ'
                ],
                sizes: ['S', 'M', 'L', 'XL'],
                colors: ['Đen', 'Be', 'Xám nhạt', 'Navy']
            },
            featuredProducts: [
                {
                    id: 401,
                    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=500&q=80',
                    name: 'Áo Khoác Linen Đen',
                    price: '1.590.000₫',
                    color: 'Đen'
                },
                {
                    id: 402,
                    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=500&q=80',
                    name: 'Áo Khoác Linen Be',
                    price: '1.590.000₫',
                    color: 'Be'
                },
                {
                    id: 403,
                    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=500&q=80',
                    name: 'Áo Khoác Linen Navy',
                    price: '1.590.000₫',
                    color: 'Navy'
                }
            ]
        }
    ];

    return (
        <div className="container mx-auto px-[50px] py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Bộ Sưu Tập Linen</h1>

            {/* Collection Description */}
            <div className="max-w-2xl mx-auto mb-12 text-center">
                <p className="text-gray-600 text-lg">
                    Khám phá bộ sưu tập linen cao cấp của chúng tôi, được chế tác từ những sợi tự nhiên tốt nhất.
                    Mỗi sản phẩm được thiết kế để mang lại sự thoải mái và sang trọng cho phong cách của bạn.
                </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {linenProducts.map((product) => (
                    <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        state={{ productData: product }}
                        className="bg-white flex flex-col"
                    >
                        <div className="aspect-w-3 aspect-h-4 relative overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
                            />
                            {/* Tag sản phẩm */}
                            {product.tag && (
                                <span className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 text-sm rounded">
                                    {product.tag}
                                </span>
                            )}
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">{product.name}</h3>
                            <div className="flex justify-between items-center mt-auto">
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-gray-900">{product.price}</span>
                                    {product.originalPrice && (
                                        <span className="text-sm text-gray-500 line-through">
                                            {product.originalPrice}
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // Add to cart logic here
                                    }}
                                    className="bg-black text-white px-6 py-3 hover:bg-gray-900 transition-all duration-300"
                                >
                                    Thêm vào giỏ
                                </button>
                            </div>
                            <p className="text-gray-600 mt-6 flex-grow text-sm">{product.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LinenCollection; 