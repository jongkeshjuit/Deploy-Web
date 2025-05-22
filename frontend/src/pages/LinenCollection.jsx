import React from 'react';

const LinenCollection = () => {
    const linenProducts = [
        {
            id: 1,
            name: 'Pure Linen Bedsheet',
            price: '$129.99',
            image: '/images/linen-bedsheet.jpg',
            description: 'Luxurious 100% pure linen bedsheet for ultimate comfort'
        },
        {
            id: 2,
            name: 'Linen Duvet Cover',
            price: '$159.99',
            image: '/images/linen-duvet.jpg',
            description: "Breathable linen duvet cover for a peaceful night's sleep"
        },
        {
            id: 3,
            name: 'Linen Pillowcase Set',
            price: '$49.99',
            image: '/images/linen-pillowcase.jpg',
            description: 'Set of two pure linen pillowcases'
        },
        {
            id: 4,
            name: 'Linen Table Runner',
            price: '$39.99',
            image: '/images/linen-runner.jpg',
            description: 'Elegant table runner made from premium linen'
        }
    ];
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Linen Collection</h1>

            {/* Collection Description */}
            <div className="max-w-2xl mx-auto mb-12 text-center">
                <p className="text-gray-600 text-lg">
                    Discover our premium linen collection, crafted from the finest natural fibers.
                    Each piece is designed to bring comfort and elegance to your home.
                </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {linenProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="aspect-w-1 aspect-h-1">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-64 object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-gray-900">{product.price}</span>
                                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LinenCollection; 