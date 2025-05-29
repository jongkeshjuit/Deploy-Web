import React from "react";
import { Link } from "react-router-dom";

const FeaturedCollection = ({ collections }) => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 gap-8">
        {collections.map((col) => {
          const featured = col.products.filter((p) => p.featured);
          if (featured.length === 0) return null;

          return (
            <div
              key={col.id}
              className="bg-gray-50 featured-collection overflow-hidden"
            >
              <Link to={`/collections/${col.id}`}>
                <div className="relative">
                  <img
                    src={col.bannerUrl}
                    alt={col.name}
                    className="w-full h-[750px] object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h2 className="text-2xl font-bold text-white">
                      {col.name}
                    </h2>
                  </div>
                </div>
              </Link>
              <div className="px-[50px] pt-5">
                <h3 className="text-lg font-semibold text-center mb-4">
                  Featured Products
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {featured.map((p) => (
                    <Link
                      key={p._id}
                      to={`/product/${p._id}`}
                      className="group cursor-pointer"
                    >
                      <div className="aspect-square overflow-hidden mb-2">
                        <img
                          src={p.images[0].url}
                          alt={p.images[0].altText || p.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <p className="font-medium text-sm truncate">{p.name}</p>
                      <p className="text-sm text-gray-600">${p.price}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedCollection;
