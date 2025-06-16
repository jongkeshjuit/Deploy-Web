import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000";

const AdminHomePage = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
  });

  // Get auth token from Redux state
  const { userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch orders
        const ordersResponse = await axios.get(`${API_URL}/api/admin/orders`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        const ordersData = ordersResponse.data;
        setOrders(ordersData);

        // Fetch products
        const productsResponse = await axios.get(`${API_URL}/api/admin/products`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        const productsData = productsResponse.data;
        setProducts(productsData);

        // Calculate statistics
        const totalRevenue = ordersData.reduce((acc, order) => {
          if (order.paymentStatus === "Paid") {
            return acc + order.totalPrice;
          }
          return acc;
        }, 0);

        setStats({
          totalRevenue,
          totalOrders: ordersData.length,
          totalProducts: productsData.length,
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchData();
  }, [userToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Bảng điều khiển</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Doanh thu</h2>
          <p className="text-2xl">{formatCurrency(stats.totalRevenue)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Tổng đơn hàng</h2>
          <p className="text-2xl">{stats.totalOrders}</p>
          <Link to="/admin/orders" className="text-blue-500 hover:underline">
            Quản lý đơn hàng
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Tổng sản phẩm</h2>
          <p className="text-2xl">{stats.totalProducts}</p>
          <Link to="/admin/products" className="text-blue-500 hover:underline">
            Quản lý sản phẩm
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Đơn hàng gần nhất</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-600 border border-gray-100 border-collapse">
            <thead className="text-xs text-black uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-3 py-3">
                  Mã đơn hàng
                </th>
                <th scope="col" className="px-3 py-3">
                  Người dùng
                </th>
                <th scope="col" className="px-3 py-3">
                  Tổng tiền
                </th>
                <th scope="col" className="px-3 py-3">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.slice(0, 5).map((order) => (
                  <tr key={order._id} className="border-b border-gray-100">
                    <td className="px-3 py-3">{order._id}</td>
                    <td className="px-3 py-3">{order.user?.name || "N/A"}</td>
                    <td className="px-3 py-3">{formatCurrency(order.totalPrice)}</td>
                    <td className="px-3 py-3">{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-3 py-3 text-center">
                    Không có đơn hàng
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
