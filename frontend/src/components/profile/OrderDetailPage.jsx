import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrders } from "./OrderContext";

const OrderDetailPage = () => {
  const { orders } = useOrders();
  const navigate = useNavigate();
  const { id } = useParams();
  const order = orders?.find((o) => o._id === id);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-8 mt-4">
        <button
          className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
          onClick={() => navigate(-1)}
        >
          ← Quay lại danh sách đơn hàng
        </button>
        <div className="text-red-500 font-semibold">
          Không tìm thấy đơn hàng!
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-8 mt-4">
      <button
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
        onClick={() => navigate(-1)}
      >
        ← Quay lại danh sách đơn hàng
      </button>
      <h3 className="text-xl font-bold mb-4">Chi tiết đơn hàng #{order._id}</h3>
      <div className="mb-2 text-gray-700 text-sm">
        <span className="font-semibold">Ngày tạo:</span>{" "}
        {new Date(order.createAt).toLocaleString("vi-VN")}
      </div>
      <div className="mb-2 text-gray-700 text-sm">
        <span className="font-semibold">Trạng thái giao hàng:</span>{" "}
        {order.deliveryStatus === "delivered"
          ? "Giao hàng thành công"
          : order.deliveryStatus === "shipping"
          ? "Đang giao hàng"
          : "Đang chuẩn bị hàng"}
      </div>
      <div className="mb-2 text-gray-700 text-sm">
        <span className="font-semibold">Thanh toán:</span>{" "}
        {order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
      </div>
      <div className="mb-2 text-gray-700 text-sm">
        <span className="font-semibold">Tổng tiền:</span>{" "}
        {order.totalPrice.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </div>
      <div className="mb-2 text-gray-700 text-sm">
        <span className="font-semibold">Sản phẩm:</span>
        <ul className="list-disc ml-6 mt-1">
          {order.oderItems.map((item, idx) => (
            <li key={idx} className="mb-1">
              <span className="font-medium">{item.product.name}</span> (x
              {item.quantity}) -{" "}
              {item.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetailPage;
