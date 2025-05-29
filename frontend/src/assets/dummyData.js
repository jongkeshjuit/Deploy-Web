// src/dummyData.js
import linenWomenBanner from '../assets/images/linen/banner-linen-collection-men.jpg'

function generateProducts(prefix, startIndex) {
    const products = [];
    for (let i = 0; i < 20; i++) {
        products.push({
            _id: `${prefix}${i + 1}`,
            name: `${prefix} Product ${i + 1}`,
            price: +(Math.random() * 80 + 20).toFixed(2),
            discountPrice: +(Math.random() * 80 + 20).toFixed(2),

            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            colors: ['red', 'blue', 'green', 'yellow', 'purple'],
            material: 'cotton',
            description: 'This is a description for the product',
            images: [
                {
                    url: `https://picsum.photos/500/500?random=${startIndex + i}`,
                    altText: `${prefix} Product ${i + 1}`,
                },
                {
                    url: `https://picsum.photos/500/500?random=${startIndex + i}`,
                    altText: `${prefix} Product ${i + 1}`,
                },
                {
                    url: `https://picsum.photos/500/500?random=${startIndex + i}`,
                    altText: `${prefix} Product ${i + 1}`,
                },
                {
                    url: `https://picsum.photos/500/500?random=${startIndex + i}`,
                    altText: `${prefix} Product ${i + 1}`,
                },
            ],
            featured: i < 4, // 4 sản phẩm đầu là nổi bật
        });
    }
    return products;
}

export const collections = [
    {
        id: "summer",
        name: "Summer Collection",
        bannerUrl: linenWomenBanner,
        products: generateProducts("Summer", 1),
    },
    {
        id: "winter",
        name: "Winter Collection",
        bannerUrl: "https://picsum.photos/500/500?random=100",
        products: generateProducts("Winter", 21),
    },
    {
        id: "autumn",
        name: "Autumn Collection",
        bannerUrl: "https://via.placeholder.com/1000x300?text=Autumn+Collection",
        products: generateProducts("Autumn", 41),
    },
];
