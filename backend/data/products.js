const products = [
  // ========== ÁO PHÔNG NAM ==========
  {
    name: "Áo Thun Nam Basic Cotton",
    description: "Áo thun nam basic từ chất liệu cotton 100% thoáng mát, form regular fit thoải mái, phù hợp mặc hàng ngày.",
    price: 299000,
    discountPrice: 249000,
    countInStock: 50,
    sku: "AT-NAM-BASIC-001",
    category: "Áo phông",
    brand: "Wukudada",
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: "Đen",
    collection: "Summer Collection",
    material: "100% Cotton",
    gender: "Men",
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
        altText: "Áo thun nam đen basic"
      },
      {
        url: "https://images.unsplash.com/photo-1583743814966-8936f37f27bf?w=500&h=600&fit=crop",
        altText: "Áo thun nam đen - góc nghiêng"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.5,
    numReviews: 89,
    tags: ["basic", "cotton", "nam", "hàng ngày"],
    metaTitle: "Áo Thun Nam Basic Cotton - Thoải Mái Hàng Ngày",
    metaDescription: "Áo thun nam basic cotton 100%, form regular fit, màu đen cơ bản, phù hợp mọi phong cách.",
    metaKeywords: ["áo thun nam", "basic", "cotton", "đen"],
    dimensions: {
      length: 70,
      width: 52,
      height: 1,
      weight: 0.2
    }
  },

  // ========== THÊM SẢN PHẨM SUMMER COLLECTION ==========
  {
    name: "Áo Tank Top Nam Summer",
    description: "Áo tank top nam chất liệu cotton thấm hút mồ hôi, thiết kế đơn giản thoải mái cho mùa hè.",
    price: 199000,
    discountPrice: 169000,
    countInStock: 70,
    sku: "TT-NAM-SUM-016",
    category: "Áo phông",
    brand: "Wukudada",
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: "Trắng",
    collection: "Summer Collection",
    material: "100% Cotton",
    gender: "Men",
    images: [
      {
        url: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=500&h=600&fit=crop",
        altText: "Áo tank top nam trắng"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.3,
    numReviews: 54,
    tags: ["tank top", "summer", "nam", "cotton"],
    metaTitle: "Áo Tank Top Nam Summer - Mát Mẻ Thoải Mái",
    metaDescription: "Áo tank top nam cotton thoáng mát, thiết kế đơn giản cho mùa hè.",
    metaKeywords: ["tank top nam", "summer", "cotton", "trắng"],
    dimensions: {
      length: 65,
      width: 50,
      height: 1,
      weight: 0.15
    }
  },

  {
    name: "Quần Short Nữ Linen Summer",
    description: "Quần short nữ chất liệu linen thoáng mát, form A-line thoải mái, màu pastel dễ thương cho mùa hè.",
    price: 349000,
    discountPrice: 299000,
    countInStock: 45,
    sku: "QS-NU-LIN-017",
    category: "Quần short",
    brand: "Wukudada",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Pastel",
    collection: "Summer Collection",
    material: "100% Linen",
    gender: "Women",
    images: [
      {
        url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
        altText: "Quần short nữ linen pastel"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.6,
    numReviews: 78,
    tags: ["short", "linen", "nữ", "summer"],
    metaTitle: "Quần Short Nữ Linen - Mát Mẻ Mùa Hè",
    metaDescription: "Quần short nữ linen thoáng mát, form A-line thoải mái cho mùa hè.",
    metaKeywords: ["quần short nữ", "linen", "summer", "pastel"],
    dimensions: {
      length: 38,
      width: 34,
      height: 2,
      weight: 0.2
    }
  },

  // ========== THÊM SẢN PHẨM WINTER COLLECTION ==========
  {
    name: "Áo Len Nam Turtleneck",
    description: "Áo len nam cổ lọ ấm áp, chất liệu wool blend cao cấp, thiết kế sang trọng cho mùa đông.",
    price: 899000,
    discountPrice: 799000,
    countInStock: 25,
    sku: "AL-NAM-TN-018",
    category: "Áo khoác",
    brand: "Wukudada",
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: "Xám đậm",
    collection: "Winter Collection",
    material: "70% Wool, 30% Acrylic",
    gender: "Men",
    images: [
      {
        url: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500&h=600&fit=crop",
        altText: "Áo len nam turtleneck xám đậm"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.8,
    numReviews: 67,
    tags: ["len", "turtleneck", "nam", "winter"],
    metaTitle: "Áo Len Nam Turtleneck - Ấm Áp Mùa Đông",
    metaDescription: "Áo len nam cổ lọ wool blend, thiết kế sang trọng cho mùa đông.",
    metaKeywords: ["áo len nam", "turtleneck", "wool", "winter"],
    dimensions: {
      length: 68,
      width: 56,
      height: 3,
      weight: 0.45
    }
  },

  // ========== THÊM SẢN PHẨM AUTUMN COLLECTION ==========  
  {
    name: "Áo Cardigan Nữ Autumn",
    description: "Áo cardigan nữ mềm mại, màu nâu đất ấm áp, phù hợp layering cho mùa thu se lạnh.",
    price: 699000,
    discountPrice: 599000,
    countInStock: 30,
    sku: "AC-NU-AUT-019",
    category: "Áo khoác",
    brand: "Wukudada",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Nâu đất",
    collection: "Autumn Collection",
    material: "60% Acrylic, 40% Cotton",
    gender: "Women",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544966503-7cc4ac7b6201?w=500&h=600&fit=crop",
        altText: "Áo cardigan nữ nâu đất"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.7,
    numReviews: 89,
    tags: ["cardigan", "nữ", "autumn", "layering"],
    metaTitle: "Áo Cardigan Nữ Autumn - Ấm Áp Mùa Thu",
    metaDescription: "Áo cardigan nữ mềm mại, màu nâu đất cho mùa thu se lạnh.",
    metaKeywords: ["cardigan nữ", "autumn", "nâu đất", "layering"],
    dimensions: {
      length: 65,
      width: 52,
      height: 2,
      weight: 0.4
    }
  },
  {
    name: "Áo Thun Nam Polo Pique",
    description: "Áo polo nam chất liệu pique cao cấp, có cổ bẻ và túi ngực, thiết kế lịch sự phù hợp đi làm.",
    price: 449000,
    discountPrice: 399000,
    countInStock: 35,
    sku: "AT-NAM-POLO-002",
    category: "Áo phông",
    brand: "Wukudada",
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: "Trắng",
    collection: "Winter Collection",
    material: "Pique Cotton",
    gender: "Men",
    images: [
      {
        url: "https://images.unsplash.com/photo-1594938328870-28be026b5a06?w=500&h=600&fit=crop",
        altText: "Áo polo nam trắng"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.3,
    numReviews: 45,
    tags: ["polo", "formal", "nam", "công sở"],
    metaTitle: "Áo Polo Nam Pique - Lịch Sự Công Sở",
    metaDescription: "Áo polo nam chất liệu pique cao cấp, thiết kế lịch sự cho môi trường công sở.",
    metaKeywords: ["áo polo nam", "pique", "công sở", "trắng"],
    dimensions: {
      length: 72,
      width: 54,
      height: 1,
      weight: 0.25
    }
  },

  // ========== ÁO PHÔNG NỮ ==========
  {
    name: "Áo Thun Nữ Crop Top",
    description: "Áo thun nữ form crop top trendy, chất liệu cotton pha spandex co giãn nhẹ, phù hợp phối với quần high waist.",
    price: 249000,
    discountPrice: 199000,
    countInStock: 60,
    sku: "AT-NU-CROP-003",
    category: "Áo phông",
    brand: "Wukudada",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Hồng",
    collection: "Autumn Collection",
    material: "95% Cotton, 5% Spandex",
    gender: "Women",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=600&fit=crop",
        altText: "Áo crop top nữ màu hồng"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.7,
    numReviews: 76,
    tags: ["crop top", "trendy", "nữ", "thời trang"],
    metaTitle: "Áo Crop Top Nữ - Phong Cách Trẻ Trung",
    metaDescription: "Áo crop top nữ cotton co giãn, thiết kế trendy cho phong cách trẻ trung, năng động.",
    metaKeywords: ["crop top nữ", "cotton", "trendy", "hồng"],
    dimensions: {
      length: 45,
      width: 40,
      height: 1,
      weight: 0.15
    }
  },

  // ========== QUẦN JEAN NAM ==========
  {
    name: "Quần Jean Nam Slim Fit",
    description: "Quần jean nam form slim fit, chất liệu denim cao cấp co giãn nhẹ, tôn dáng và thoải mái khi vận động.",
    price: 699000,
    discountPrice: 599000,
    countInStock: 40,
    sku: "QJ-NAM-SLIM-004",
    category: "Quần jean",
    brand: "Wukudada",
    sizes: ["28", "29", "30", "31", "32", "33", "34"],
    color: "Xanh đậm",
    collection: "Denim Collection",
    material: "98% Cotton, 2% Spandex",
    gender: "Men",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
        altText: "Quần jean nam slim fit xanh đậm"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.6,
    numReviews: 92,
    tags: ["jean", "slim fit", "nam", "denim"],
    metaTitle: "Quần Jean Nam Slim Fit - Phong Cách Hiện Đại",
    metaDescription: "Quần jean nam slim fit chất lượng cao, form chuẩn tôn dáng, phù hợp mọi phong cách.",
    metaKeywords: ["quần jean nam", "slim fit", "denim", "xanh đậm"],
    dimensions: {
      length: 100,
      width: 35,
      height: 2,
      weight: 0.6
    }
  },

  // ========== QUẦN JEAN NỮ ==========
  {
    name: "Quần Jean Nữ High Waist",
    description: "Quần jean nữ cạp cao tôn dáng, form skinny ôm vừa vặn, phù hợp với mọi vóc dáng và độ tuổi.",
    price: 649000,
    discountPrice: 549000,
    countInStock: 45,
    sku: "QJ-NU-HIGH-005",
    category: "Quần jean",
    brand: "Wukudada",
    sizes: ["25", "26", "27", "28", "29", "30", "31"],
    color: "Xanh nhạt",
    collection: "Feminine Collection",
    material: "92% Cotton, 6% Polyester, 2% Elastane",
    gender: "Women",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551048632-d6b8ce3d07d1?w=500&h=600&fit=crop",
        altText: "Quần jean nữ high waist xanh nhạt"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.8,
    numReviews: 134,
    tags: ["jean", "high waist", "nữ", "skinny"],
    metaTitle: "Quần Jean Nữ High Waist - Tôn Dáng Hoàn Hảo",
    metaDescription: "Quần jean nữ cạp cao skinny fit, tôn dáng tuyệt đối cho phái đẹp.",
    metaKeywords: ["quần jean nữ", "high waist", "skinny", "xanh nhạt"],
    dimensions: {
      length: 95,
      width: 32,
      height: 2,
      weight: 0.5
    }
  },

  // ========== ÁO KHOÁC NAM ==========
  {
    name: "Áo Khoác Bomber Nam",
    description: "Áo khoác bomber nam phong cách streetwear, chất liệu polyester chống gió nhẹ, thiết kế năng động.",
    price: 899000,
    discountPrice: 749000,
    countInStock: 25,
    sku: "AK-NAM-BOMBER-006",
    category: "Áo khoác",
    brand: "Wukudada",
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: "Đen",
    collection: "Street Collection",
    material: "100% Polyester",
    gender: "Men",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop",
        altText: "Áo khoác bomber nam đen"
      }
    ],
    isFeatured: false,
    isPublished: true,
    rating: 4.4,
    numReviews: 58,
    tags: ["bomber", "streetwear", "nam", "khoác"],
    metaTitle: "Áo Khoác Bomber Nam - Phong Cách Streetwear",
    metaDescription: "Áo khoác bomber nam chất liệu cao cấp, thiết kế streetwear hiện đại.",
    metaKeywords: ["áo khoác bomber", "streetwear", "nam", "đen"],
    dimensions: {
      length: 65,
      width: 58,
      height: 3,
      weight: 0.4
    }
  },

  // ========== ÁO KHOÁC NỮ ==========
  {
    name: "Áo Blazer Nữ Công Sở",
    description: "Áo blazer nữ thiết kế thanh lịch cho môi trường công sở, chất liệu polyester pha viscose mềm mại.",
    price: 1299000,
    discountPrice: 1099000,
    countInStock: 20,
    sku: "AK-NU-BLAZER-007",
    category: "Áo khoác",
    brand: "Wukudada",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Xám",
    collection: "Office Collection",
    material: "70% Polyester, 30% Viscose",
    gender: "Women",
    images: [
      {
        url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
        altText: "Áo blazer nữ xám công sở"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.7,
    numReviews: 41,
    tags: ["blazer", "công sở", "nữ", "formal"],
    metaTitle: "Áo Blazer Nữ Công Sở - Thanh Lịch Chuyên Nghiệp",
    metaDescription: "Áo blazer nữ thiết kế thanh lịch, chất liệu cao cấp cho môi trường công sở.",
    metaKeywords: ["áo blazer nữ", "công sở", "thanh lịch", "xám"],
    dimensions: {
      length: 60,
      width: 48,
      height: 2,
      weight: 0.35
    }
  },

  // ========== VÁY NỮ ==========
  {
    name: "Váy Midi Nữ A-Line",
    description: "Váy midi nữ form A-line thanh lịch, chất liệu chiffon nhẹ nhàng, phù hợp dự tiệc và đi làm.",
    price: 799000,
    discountPrice: 649000,
    countInStock: 30,
    sku: "V-NU-MIDI-008",
    category: "Váy",
    brand: "Wukudada",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Navy",
    collection: "Elegant Collection",
    material: "100% Chiffon",
    gender: "Women",
    images: [
      {
        url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
        altText: "Váy midi nữ A-line navy"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.9,
    numReviews: 67,
    tags: ["váy", "midi", "nữ", "elegant"],
    metaTitle: "Váy Midi Nữ A-Line - Thanh Lịch Đa Dụng",
    metaDescription: "Váy midi nữ form A-line chất liệu chiffon, thiết kế thanh lịch phù hợp nhiều dịp.",
    metaKeywords: ["váy midi nữ", "A-line", "chiffon", "navy"],
    dimensions: {
      length: 85,
      width: 45,
      height: 1,
      weight: 0.25
    }
  },

  // ========== QUẦN SHORT NAM ==========
  {
    name: "Quần Short Nam Kaki",
    description: "Quần short nam chất liệu kaki thoáng mát, form regular fit thoải mái, phù hợp mùa hè và dạo phố.",
    price: 399000,
    discountPrice: 349000,
    countInStock: 55,
    sku: "QS-NAM-KAKI-009",
    category: "Quần short",
    brand: "Wukudada",
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: "Be",
    collection: "Summer Collection",
    material: "100% Cotton Kaki",
    gender: "Men",
    images: [
      {
        url: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=600&fit=crop",
        altText: "Quần short nam kaki màu be"
      }
    ],
    isFeatured: false,
    isPublished: true,
    rating: 4.2,
    numReviews: 73,
    tags: ["short", "kaki", "nam", "summer"],
    metaTitle: "Quần Short Nam Kaki - Thoải Mái Mùa Hè",
    metaDescription: "Quần short nam kaki thoáng mát, thiết kế đơn giản phù hợp mọi hoạt động.",
    metaKeywords: ["quần short nam", "kaki", "mùa hè", "be"],
    dimensions: {
      length: 50,
      width: 35,
      height: 2,
      weight: 0.3
    }
  },

  // ========== QUẦN SHORT NỮ ==========
  {
    name: "Quần Short Nữ Denim",
    description: "Quần short nữ chất liệu denim wash nhẹ, form high waist trendy, phối cùng áo crop top rất hợp.",
    price: 449000,
    discountPrice: 399000,
    countInStock: 40,
    sku: "QS-NU-DENIM-010",
    category: "Quần short",
    brand: "Wukudada",
    sizes: ["25", "26", "27", "28", "29", "30"],
    color: "Xanh wash",
    collection: "Casual Collection",
    material: "98% Cotton, 2% Elastane",
    gender: "Women",
    images: [
      {
        url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
        altText: "Quần short nữ denim xanh wash"
      }
    ],
    isFeatured: false,
    isPublished: true,
    rating: 4.5,
    numReviews: 86,
    tags: ["short", "denim", "nữ", "casual"],
    metaTitle: "Quần Short Nữ Denim - Phong Cách Casual",
    metaDescription: "Quần short nữ denim high waist, thiết kế trendy cho phong cách casual.",
    metaKeywords: ["quần short nữ", "denim", "high waist", "xanh"],
    dimensions: {
      length: 35,
      width: 32,
      height: 2,
      weight: 0.25
    }
  },

  // ========== ÁO SƠ MI NAM ==========
  {
    name: "Áo Sơ Mi Nam Công Sở",
    description: "Áo sơ mi nam công sở chất liệu cotton cao cấp, form slim fit lịch lãm, màu trắng cơ bản dễ phối đồ.",
    price: 599000,
    discountPrice: 499000,
    countInStock: 35,
    sku: "ASM-NAM-CS-011",
    category: "Áo sơ mi",
    brand: "Wukudada",
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: "Trắng",
    collection: "Business Collection",
    material: "100% Cotton",
    gender: "Men",
    images: [
      {
        url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=600&fit=crop",
        altText: "Áo sơ mi nam trắng công sở"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.6,
    numReviews: 95,
    tags: ["sơ mi", "công sở", "nam", "business"],
    metaTitle: "Áo Sơ Mi Nam Công Sở - Lịch Lãm Chuyên Nghiệp",
    metaDescription: "Áo sơ mi nam cotton cao cấp, form slim fit lịch lãm cho môi trường công sở.",
    metaKeywords: ["áo sơ mi nam", "công sở", "cotton", "trắng"],
    dimensions: {
      length: 75,
      width: 55,
      height: 1,
      weight: 0.3
    }
  },

  // ========== ÁO SƠ MI NỮ ==========
  {
    name: "Áo Sơ Mi Nữ Oversize",
    description: "Áo sơ mi nữ form oversize trendy, chất liệu cotton mềm mại, có thể mặc như áo khoác ngoài.",
    price: 549000,
    discountPrice: 459000,
    countInStock: 42,
    sku: "ASM-NU-OS-012",
    category: "Áo sơ mi",
    brand: "Wukudada",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Xanh pastel",
    collection: "Trendy Collection",
    material: "100% Cotton",
    gender: "Women",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop",
        altText: "Áo sơ mi nữ oversize xanh pastel"
      }
    ],
    isFeatured: false,
    isPublished: true,
    rating: 4.4,
    numReviews: 52,
    tags: ["sơ mi", "oversize", "nữ", "trendy"],
    metaTitle: "Áo Sơ Mi Nữ Oversize - Phong Cách Hiện Đại",
    metaDescription: "Áo sơ mi nữ oversize cotton, thiết kế hiện đại cho phong cách trẻ trung.",
    metaKeywords: ["áo sơ mi nữ", "oversize", "cotton", "xanh pastel"],
    dimensions: {
      length: 70,
      width: 60,
      height: 1,
      weight: 0.28
    }
  },

  // ========== QUẦN TÂY NAM ==========
  {
    name: "Quần Tây Nam Slim Fit",
    description: "Quần tây nam form slim fit lịch lãm, chất liệu wool pha polyester, phù hợp môi trường công sở và sự kiện.",
    price: 899000,
    discountPrice: 749000,
    countInStock: 28,
    sku: "QT-NAM-SLIM-013",
    category: "Quần tây",
    brand: "Wukudada",
    sizes: ["28", "29", "30", "31", "32", "33", "34"],
    color: "Đen",
    collection: "Formal Collection",
    material: "65% Wool, 35% Polyester",
    gender: "Men",
    images: [
      {
        url: "https://images.unsplash.com/photo-1594938328870-28be026b5a06?w=500&h=600&fit=crop",
        altText: "Quần tây nam slim fit đen"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.7,
    numReviews: 63,
    tags: ["quần tây", "slim fit", "nam", "formal"],
    metaTitle: "Quần Tây Nam Slim Fit - Lịch Lãm Đẳng Cấp",
    metaDescription: "Quần tây nam slim fit chất liệu wool cao cấp, thiết kế lịch lãm cho môi trường công sở.",
    metaKeywords: ["quần tây nam", "slim fit", "wool", "đen"],
    dimensions: {
      length: 105,
      width: 38,
      height: 2,
      weight: 0.7
    }
  },

  // ========== ÁO THUN TRẺ EM ==========
  {
    name: "Áo Thun Trẻ Em Hoạt Hình",
    description: "Áo thun trẻ em in hoạt hình dễ thương, chất liệu cotton organic an toàn cho da bé, màu sắc tươi vui.",
    price: 199000,
    discountPrice: 149000,
    countInStock: 80,
    sku: "AT-TE-HH-014",
    category: "Áo phông",
    brand: "Wukudada Kids",
    sizes: ["2-3T", "4-5T", "6-7T", "8-9T", "10-11T"],
    color: "Vàng",
    collection: "Kids Collection",
    material: "100% Organic Cotton",
    gender: "Unisex",
    images: [
      {
        url: "https://images.unsplash.com/photo-1503944583220-79d8926ad1ef?w=500&h=600&fit=crop",
        altText: "Áo thun trẻ em hoạt hình vàng"
      }
    ],
    isFeatured: true,
    isPublished: true,
    rating: 4.8,
    numReviews: 127,
    tags: ["trẻ em", "hoạt hình", "organic", "kids"],
    metaTitle: "Áo Thun Trẻ Em Hoạt Hình - An Toàn Cho Bé",
    metaDescription: "Áo thun trẻ em cotton organic, in hoạt hình dễ thương, an toàn cho làn da nhạy cảm của bé.",
    metaKeywords: ["áo thun trẻ em", "organic cotton", "hoạt hình", "vàng"],
    dimensions: {
      length: 45,
      width: 35,
      height: 1,
      weight: 0.12
    }
  },

  // ========== QUẦN JEAN TRẺ EM ==========
  {
    name: "Quần Jean Trẻ Em Straight",
    description: "Quần jean trẻ em form straight thoải mái, chất liệu denim mềm mại không gây khó chịu khi vận động.",
    price: 349000,
    discountPrice: 299000,
    countInStock: 45,
    sku: "QJ-TE-STR-015",
    category: "Quần jean",
    brand: "Wukudada Kids",
    sizes: ["2-3T", "4-5T", "6-7T", "8-9T", "10-11T"],
    color: "Xanh nhạt",
    collection: "Kids Casual",
    material: "98% Cotton, 2% Elastane",
    gender: "Unisex",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&h=600&fit=crop",
        altText: "Quần jean trẻ em straight xanh nhạt"
      }
    ],
    isFeatured: false,
    isPublished: true,
    rating: 4.5,
    numReviews: 89,
    tags: ["trẻ em", "jean", "straight", "kids"],
    metaTitle: "Quần Jean Trẻ Em Straight - Thoải Mái Vận Động",
    metaDescription: "Quần jean trẻ em denim mềm mại, form straight thoải mái cho bé hoạt động.",
    metaKeywords: ["quần jean trẻ em", "straight", "denim", "xanh nhạt"],
    dimensions: {
      length: 70,
      width: 28,
      height: 2,
      weight: 0.35
    }
  }
];

module.exports = products;