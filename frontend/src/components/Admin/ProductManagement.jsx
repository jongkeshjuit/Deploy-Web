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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const userToken =
          localStorage.getItem("userToken") || localStorage.getItem("token");
        await axios.delete(`${API_URL}/api/products/${id}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setProducts(products.filter((p) => p._id !== id));
        alert("Xóa sản phẩm thành công!");
      } catch (err) {
        alert("Xóa sản phẩm thất bại!");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý sản phẩm</h2>
        <Link
          to="/admin/products/new"
          className="bg-black text-white px-4 py-2 hover:bg-gray-700 cursor-pointer"
        >
          Thêm sản phẩm
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-gray-500 border border-gray-100 border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-3 py-3">Tên sản phẩm</th>
              <th className="px-3 py-3">Giá</th>
              <th className="px-3 py-3">SKU</th>
              <th className="px-3 py-3">Thao tác</th>
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
                      className="inline-flex items-center bg-black text-white px-3 py-1 mr-2 hover:bg-gray-700 cursor-pointer"
                    >
                      Sửa sản phẩm
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="inline-flex items-center text-black px-3 py-1 border border-black hover:border-gray-700 hover:text-gray-700 cursor-pointer"
                    >
                      Xóa sản phẩm
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
