import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const userToken =
          localStorage.getItem("userToken") || localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/api/admin/orders`, {
          headers: userToken ? { Authorization: `Bearer ${userToken}` } : {},
        });
        setOrders(res.data || []);
        setFilteredOrders(res.data || []);
      } catch (err) {
        setError("Không thể tải danh sách đơn hàng!");
        setOrders([]);
        setFilteredOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Hàm xử lý tìm kiếm
  useEffect(() => {
    const searchResults = orders.filter((order) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        order._id.toLowerCase().includes(searchLower) ||
        (order.user?.name || "").toLowerCase().includes(searchLower) ||
        (order.user?.email || "").toLowerCase().includes(searchLower) ||
        (order.status || "").toLowerCase().includes(searchLower) ||
        (order.paymentStatus || "").toLowerCase().includes(searchLower)
      );
    });
    setFilteredOrders(searchResults);
  }, [searchTerm, orders]);

  const handleStatusChange = async (orderId, status) => {
    try {
      const userToken =
        localStorage.getItem("userToken") || localStorage.getItem("token");
      await axios.put(
        `${API_URL}/api/admin/orders/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      // Sau khi cập nhật, reload lại danh sách đơn hàng
      const res = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: userToken ? { Authorization: `Bearer ${userToken}` } : {},
      });
      setOrders(res.data || []);
    } catch (err) {
      alert("Cập nhật trạng thái đơn hàng thất bại!");
    }
  };

  const handlePaymentStatusChange = async (orderId, paymentStatus) => {
    try {
      const userToken =
        localStorage.getItem("userToken") || localStorage.getItem("token");
      await axios.put(
        `${API_URL}/api/admin/orders/${orderId}`,
        { paymentStatus },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      // Reload lại danh sách đơn hàng
      const res = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: userToken ? { Authorization: `Bearer ${userToken}` } : {},
      });
      setOrders(res.data || []);
    } catch (err) {
      alert("Cập nhật trạng thái thanh toán thất bại!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Quản lý đơn hàng</h2>

      {/* Thanh tìm kiếm */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm theo mã đơn hàng, tên người dùng, email hoặc trạng thái..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-gray-600 border border-gray-100 border-collapse">
          <thead className="text-xs text-black uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-3">Mã đơn hàng</th>
              <th className="px-4 py-3">Người dùng</th>
              <th className="px-4 py-3">Số điện thoại</th>
              <th className="px-4 py-3">Địa chỉ</th>
              <th className="px-4 py-3">Phương thức thanh toán</th>
              <th className="px-4 py-3">Sản phẩm</th>
              <th className="px-4 py-3">Tổng tiền</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Trạng thái thanh toán</th>
              <th className="px-4 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={10} className="px-4 py-6 text-center">
                  Đang tải...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={10} className="px-4 py-6 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id} className="border-b border-gray-100">
                  <td className="p-4 font-medium whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="p-4 ">
                    {order.user?.name || order.user?.email || ""}
                  </td>
                  <td className="p-4">
                    {order.phone || order.shippingAddress?.phone || ""}
                  </td>
                  <td className="p-4">
                    {order.address || order.shippingAddress?.address || ""}
                  </td>
                  <td className="p-4">{order.paymentMethod}</td>
                  <td className="p-4">
                    {(order.products || order.orderItems || [])
                      .map((product) => product.name)
                      .join(", ")}
                  </td>
                  <td className="p-4">{order.total || order.totalPrice}</td>
                  <td className="p-4">
                    <select
                      value={order.status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="p-1 border border-gray-300"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <select
                      value={order.paymentStatus || "Unpaid"}
                      onChange={(e) =>
                        handlePaymentStatusChange(order._id, e.target.value)
                      }
                      className="p-1 border border-gray-300"
                    >
                      <option value="Unpaid">Unpaid</option>
                      <option value="Paid">Paid</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleStatusChange(order._id, "Delivered")}
                      className="bg-blue-500 text-white px-3 py-1 border border-gray-300 hover:bg-blue-600 cursor-pointer w-20"
                    >
                      Đã giao
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="px-4 text-center">
                  {searchTerm
                    ? "Không tìm thấy đơn hàng phù hợp"
                    : "Không có đơn hàng"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
