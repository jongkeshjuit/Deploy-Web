import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products?limit=100`);
        setProducts(res.data.products || []);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handelDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // Gọi API xóa sản phẩm ở đây nếu muốn
      console.log("Deleted product with id:", id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-gray-500 border border-gray-100 border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Price</th>
              <th className="px-3 py-3">SKU</th>
              <th className="px-3 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="bg-white border-b border-gray-100"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="p-4">{product.price} VND</td>
                  <td className="p-4">{product.sku}</td>
                  <td className="p-4">
                    <Link
                      to={`/admin/products/${product._id}`}
                      className="inline-flex items-center bg-blue-500 text-white px-3 py-1 rounded-full mr-2 hover:bg-blue-600 cursor-pointer"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handelDelete(product._id)}
                      className="inline-flex items-center bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
