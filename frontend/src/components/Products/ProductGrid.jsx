import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ product }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {product.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} className="block">
          <div className="w-full aspect-2/3 bg-gray-100">
            <img
              src={product.images[0].url}
              alt={product.images[0].altText || product.name}
              className="w-full object-cover"
            />
            <h3 className="text-sm mb-2">{product.name}</h3>
            <p className="text-gray-600 font-medium text-sm">
              $ {product.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
