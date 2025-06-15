import React from "react";
import { Link } from "react-router-dom";

const AdminHomePage = () => {
  const orders = [
    {
      _id: 1,
      user: {
        name: "John Doe",
      },
      totalPrice: 100,
      status: "Pending",
    },
    {
      _id: 2,
      user: {
        name: "John Doe",
      },
      totalPrice: 100,
      status: "Processing",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Bảng điều khiển</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Doanh thu</h2>
          <p className="text-2xl">$1000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Tổng đơn hàng</h2>
          <p className="text-2xl">{orders.length}</p>
          <Link to="/admin/orders" className="text-blue-500 hover:underline">
            Quản lý đơn hàng
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Tổng sản phẩm</h2>
          <p className="text-2xl">200</p>
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
                orders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-100">
                    <td className="px-3 py-3">{order._id}</td>
                    <td className="px-3 py-3">{order.user.name}</td>
                    <td className="px-3 py-3">{order.totalPrice}</td>
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
