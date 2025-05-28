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
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-2 sm:p-4 md:p-8 mt-2 sm:mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-sm sm:text-base">
      {/* Cột trái: Sản phẩm trong đơn hàng */}
      <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-gray-200 pr-0 md:pr-4 pb-4 md:pb-0">
        <h4 className="font-bold text-sm sm:text-base mb-2 sm:mb-4">
          Đơn hàng của bạn
        </h4>
        <div className="divide-y divide-gray-200">
          {order.oderItems.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 py-2 sm:py-4"
            >
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded border"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-xs sm:text-sm">
                  {item.product.name}
                </div>
                <div className="text-gray-600 text-xs">
                  Giá:{" "}
                  {item.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
                <div className="text-gray-600 text-xs">
                  Số lượng: {item.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Cột giữa: Địa chỉ giao hàng và thanh toán */}
      <div className="md:col-span-1 flex flex-col gap-4 md:gap-6">
        <div className="bg-gray-50 rounded border border-gray-200 p-2 sm:p-4">
          <div className="font-semibold mb-1 text-xs sm:text-sm">
            Địa chỉ giao hàng
          </div>
          <div className="text-xs sm:text-sm">
            {order.shippingAddress?.detail}
          </div>
          <div className="text-xs sm:text-sm">
            {order.shippingAddress?.city}, {order.shippingAddress?.country}
          </div>
        </div>
        <div className="bg-gray-50 rounded border border-gray-200 p-2 sm:p-4">
          <div className="font-semibold mb-2 text-xs sm:text-sm">
            Thanh toán
          </div>
          <div className="mb-1 text-gray-700 text-xs sm:text-sm">
            <span className="font-semibold">Trạng thái:</span>{" "}
            {order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
          </div>
          <div className="mb-1 text-gray-700 text-xs sm:text-sm">
            <span className="font-semibold">Ngày tạo:</span>{" "}
            {new Date(order.createAt).toLocaleString("vi-VN")}
          </div>
          <div className="mb-1 text-gray-700 text-xs sm:text-sm">
            <span className="font-semibold">Trạng thái giao hàng:</span>{" "}
            {order.deliveryStatus === "delivered"
              ? "Giao hàng thành công"
              : order.deliveryStatus === "shipping"
              ? "Đang giao hàng"
              : "Đang chuẩn bị hàng"}
          </div>
        </div>
      </div>
      {/* Cột phải: Tổng đơn hàng */}
      <div className="md:col-span-1 border-t md:border-t-0 md:border-l border-gray-200 pl-0 md:pl-4 pt-4 md:pt-0 flex flex-col gap-4 md:gap-6">
        <div className="bg-gray-50 rounded border border-gray-200 p-2 sm:p-4">
          <div className="font-bold mb-2 text-xs sm:text-sm">TỔNG ĐƠN HÀNG</div>
          <div className="flex justify-between text-xs mb-1">
            <span>Tổng cộng</span>
            <span>
              {order.totalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          {/* Có thể thêm phí vận chuyển, mã giảm giá nếu muốn */}
          <div className="flex justify-between text-xs mb-1">
            <span>Phí vận chuyển</span>
            <span>50.000 VND</span>
          </div>
          <div className="flex justify-between text-sm font-semibold mt-2">
            <span>TỔNG</span>
            <span>
              {(order.totalPrice + 50000).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
        </div>
        <button
          className="w-full bg-black text-white py-2 sm:py-3 rounded font-semibold hover:bg-gray-900 transition text-xs sm:text-sm"
          onClick={() => navigate(-1)}
        >
          Quay lại danh sách đơn hàng
        </button>
      </div>
    </div>
  );
};

export default OrderDetailPage;
