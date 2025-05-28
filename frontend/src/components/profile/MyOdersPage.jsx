import React from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "./OrderContext";

const MyOdersPage = () => {
  const { orders } = useOrders();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 text-sm">
      <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 text-center sm:text-left">
        Đơn hàng của tôi
      </h2>
      <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
        <div className="w-full min-w-[520px] sm:min-w-[700px]">
          <table className="min-w-full text-left text-gray-500 text-[11px] sm:text-xs md:text-sm">
            <thead className="bg-gray-100 text-[10px] sm:text-xs uppercase text-gray-700">
              <tr>
                <th className="py-1 px-1 sm:px-4 sm:py-3 whitespace-nowrap">
                  Mã đơn
                </th>
                <th className="py-1 px-1 sm:px-4 sm:py-3 whitespace-nowrap">
                  Ngày tạo
                </th>
                <th className="py-1 px-1 sm:px-4 sm:py-3 whitespace-nowrap">
                  Sản phẩm
                </th>
                <th className="py-1 px-1 sm:px-4 sm:py-3 whitespace-nowrap">
                  Tổng tiền
                </th>
                <th className="py-1 px-1 sm:px-4 sm:py-3 whitespace-nowrap">
                  Giao hàng
                </th>
                <th className="py-1 px-1 sm:px-4 sm:py-3 whitespace-nowrap">
                  Thanh toán
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/profile/orders/${order._id}`)}
                  >
                    <td className="py-2 px-2 sm:px-4 sm:py-4 font-medium text-gray-900 whitespace-nowrap text-xs sm:text-sm">
                      #{order._id}
                    </td>
                    <td className="py-2 px-4 text-xs sm:text-sm">
                      {new Date(order.createAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="py-2 px-4 text-xs sm:text-sm">
                      {order.oderItems.map((item, index) => (
                        <div key={index}>
                          {item.product.name} (x{item.quantity})
                        </div>
                      ))}
                    </td>
                    <td className="py-2 px-4 text-xs sm:text-sm">
                      {order.totalPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td className="py-2 px-4">
                      <span
                        className={`flex items-center gap-1 w-max
                          ${
                            order.deliveryStatus === "delivered"
                              ? "bg-green-100 text-green-700"
                              : order.deliveryStatus === "shipping"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                          px-2 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap`}
                      >
                        {order.deliveryStatus === "delivered"
                          ? "Giao hàng thành công"
                          : order.deliveryStatus === "shipping"
                          ? "Đang giao hàng"
                          : "Đang chuẩn bị hàng"}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <span
                        className={`flex items-center gap-1 w-max
                          ${
                            order.isPaid
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                          px-2 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap`}
                      >
                        {order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-4 px-4 text-gray-500 text-xs sm:text-sm"
                  >
                    Không có đơn hàng nào
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
export default MyOdersPage;
