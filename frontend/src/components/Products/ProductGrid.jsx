import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products, onClick }) => {
  if (!Array.isArray(products)) {
    return <div className="text-center p-4">Không có sản phẩm nào.</div>;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="block group"
          onClick={onClick}
        >
          {/* Phần ảnh */}
          <div className="flex flex-col justify-between w-full aspect-[3/4]">
            <div className="h-[80%] overflow-hidden">
              <img
                src={
                  product.images[0]?.url || "https://via.placeholder.com/500"
                }
                alt={product.images[0]?.altText || product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Phần mô tả */}
            <div className="flex flex-col gap-1 p-4">
              <h3 className="text-sm group-hover:underline transition-colors duration-300">
                {product.name}
              </h3>
              <div>
                {product.discountPrice ? (
                  <>
                    <p className="text-gray-500 line-through text-sm">
                      {product.price.toLocaleString("vi-VN")} VND
                    </p>
                    <p className="text-red-600 font-medium">
                      {product.discountPrice.toLocaleString("vi-VN")} VND
                    </p>
                  </>
                ) : (
                  <p className="text-black font-medium">
                    {product.price.toLocaleString("vi-VN")} VND
                  </p>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
