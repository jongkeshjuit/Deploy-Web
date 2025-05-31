import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ product, onClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {product.map((product, index) => (
        <Link
          key={index}
          to={`/product/${product._id}`}
          className="block group"
          onClick={onClick}
        >
          {/* Phần ảnh */}
          <div className="flex flex-col justify-between w-full aspect-[3/4]">
            <div className="h-[80%] overflow-hidden">
              <img
                src={product.images[0].url}
                alt={product.images[0].altText || product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Phần mô tả */}
            <div className="flex flex-col gap-1 p-4">
              <h3 className="text-sm group-hover:underline transition-colors duration-300">
                {product.name}
              </h3>
              <p className="text-black font-medium text-lg">
                ${product.price}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
