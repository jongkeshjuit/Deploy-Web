// src/dummyData.js
import linenWomenBanner from "../assets/images/linen/banner-linen-collection-men.jpg";

function generateProducts(prefix, startIndex) {
  const products = [];
  const categories = [
    "Áo phông",
    "Áo sơ mi",
    "Quần tây",
    "Quần short",
    "Áo khoác",
  ];

  for (let i = 0; i < 20; i++) {
    products.push({
      _id: `${prefix}${i + 1}`,
      name: `${prefix} Product ${i + 1}`,
      price: Math.floor(Math.random() * 2000000 + 500000),
      discountPrice: Math.floor(Math.random() * 2000000 + 500000),
      category: categories[Math.floor(Math.random() * categories.length)],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["red", "blue", "green", "yellow", "purple"],
      material: "cotton",
      description: "This is a description for the product",
      images: [
        {
          url: `https://picsum.photos/500/500?random=${startIndex + i}`,
          altText: `${prefix} Product ${i + 1}`,
        },
        {
          url: `https://picsum.photos/500/500?random=${startIndex + i + 75}`,
          altText: `${prefix} Product ${i + 1}`,
        },
        {
          url: `https://picsum.photos/500/500?random=${startIndex + i + 150}`,
          altText: `${prefix} Product ${i + 1}`,
        },
        {
          url: `https://picsum.photos/500/500?random=${startIndex + i + 225}`,
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
    description: "Bộ sưu tập mùa hè 2025 mang đến làn gió mới với những thiết kế trẻ trung, năng động và đầy màu sắc, sử dụng chất liệu nhẹ mát, thoáng khí, phù hợp cho mọi hoạt động ngày hè – từ dạo phố, đi biển đến những buổi hẹn hò đầy cảm hứng.",
    products: generateProducts("Summer", 1),
  },
  {
    id: "winter",
    name: "Winter Collection",
    bannerUrl: "https://picsum.photos/500/500?random=100",
    description: "Bộ sưu tập mùa đông 2025 là sự kết hợp giữa vẻ đẹp hiện đại và cảm giác ấm áp, với những thiết kế dày dặn, phom dáng ôm vừa vặn, gam màu trung tính sang trọng cùng các chất liệu như len, dạ, lông và nỉ cao cấp – mang đến cho bạn phong cách tinh tế và tự tin trong những ngày đông lạnh giá.",
    products: generateProducts("Winter", 21),
  },
  {
    id: "autumn",
    name: "Autumn Collection",
    bannerUrl: "https://picsum.photos/500/500?random=111",
    description: "Bộ sưu tập mùa thu 2025 mang đến hơi thở dịu dàng và sâu lắng của thời khắc chuyển mùa, với những thiết kế tinh tế, gam màu ấm áp như nâu đất, cam cháy, be nhạt cùng chất liệu mềm mại, giữ ấm nhẹ nhàng – lý tưởng cho những buổi chiều se lạnh đầy cảm xúc và phong cách.",
    products: generateProducts("Autumn", 41),
  },
  {
    id: "man",
    name: "Đồ nam",
    bannerUrl: "https://picsum.photos/500/500?random=200",
    products: generateProducts("Linen", 61),
  },
  {
    id: "women",
    name: "Đồ nữ",
    bannerUrl: "https://picsum.photos/500/500?random=200",
    products: generateProducts("Casual", 81),
  },
];
