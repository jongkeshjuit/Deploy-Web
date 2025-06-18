import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeFromCart,
  updateCartItemQuantity,
  fetchCart,
  clearCartServer,
} from "../redux/slices/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const { userInfo, guestId } = useSelector((state) => state.auth);
  const { cart, loading, error } = useSelector((state) => state.cart);
  const [shippingCost, setShippingCost] = useState(0);

  const userId = userInfo ? userInfo._id : null;
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Auth state:", { userInfo, guestId });
    console.log("User ID:", userId);
    console.log("User structure:", userInfo);

    // Kiểm tra localStorage
    const userFromStorage = localStorage.getItem("userInfo");
    const tokenFromStorage = localStorage.getItem("userToken");

    console.log("UserInfo from localStorage:", userFromStorage);
    console.log("Token from localStorage:", tokenFromStorage);

    if (userFromStorage) {
      try {
        const parsedUser = JSON.parse(userFromStorage);
        console.log("Parsed user:", parsedUser);
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
      }
    }
  }, [userInfo, guestId, userId]);
  // Fetch cart khi component mount
  useEffect(() => {
    if (userId || guestId) {
      dispatch(fetchCart({ userId, guestId }));
    }
  }, [dispatch, userId, guestId]);

  const calculateShippingCost = (city) => {
    if (!city) return 30000; // Mặc định là 30.000 VND nếu chưa có thành phố
    return city.trim().toLowerCase().includes("hồ chí minh") ? 0 : 30000;
  };

  const getShippingCost = () => {
    return calculateShippingCost(userInfo?.city);
  };

  const getTotalAmount = () => {
    return getTotalPrice() + getShippingCost();
  };

  const getTotalPrice = () => {
    if (!cart?.products || cart.products.length === 0) return 0;

    return cart.products.reduce((total, item) => {
      const product = item.productId || item.product;
      const price = product?.discountPrice || product?.price || item.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    if (!userInfo) {
      navigate("/login?redirect=checkout");
      return;
    }
    navigate("/checkout");
  };

  const handleAddToCart = (productId, quantity, size, color, delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          size,
          color,
          userId,
          guestId,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, size, color, userId, guestId }));
  };

  const handleClearCart = () => {
    if (userId || guestId) {
      dispatch(clearCartServer({ userId, guestId }));
    } else {
      dispatch(clearCart());
    }
  };

  // Xử lý trường hợp error
  if (error && error !== "Cart not found") {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          <p>Có lỗi xảy ra: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // Xử lý trường hợp cart chưa được khởi tạo hoặc cart not found (coi như giỏ hàng trống)
  if (!cart || !cart.products || error === "Cart not found") {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 text-gray-400 mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <p className="text-gray-500 mb-4">Giỏ hàng của bạn đang trống</p>
          <Link
            to="/"
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium mb-8">
        Giỏ hàng ({cart.products?.length || 0})
      </h1>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : cart.products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 text-gray-400 mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <p className="text-gray-500 mb-4">Giỏ hàng của bạn đang trống</p>
          <Link
            to="/"
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.products.map((item, index) => {
              // SỬA: Xử lý cả hai cấu trúc dữ liệu có thể có
              const product = item.productId || item.product;
              const productId = product?._id || item.productId;

              // Nếu không có thông tin sản phẩm, bỏ qua item này
              if (!product) {
                console.warn("Missing product data for cart item:", item);
                return null;
              }

              return (
                <div
                  key={`${productId}-${item.size}-${item.color}-${index}`}
                  className="flex gap-4 p-4 bg-white border border-[#DCDCDC]"
                >
                  {/* Product image */}
                  <Link
                    to={`/product/${productId}`}
                    className="w-32 flex-shrink-0"
                  >
                    <img
                      src={
                        product.images?.[0]?.url ||
                        item.image ||
                        "/placeholder-image.jpg"
                      }
                      alt={product.name || item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.jpg";
                      }}
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    {/* Product details */}
                    <div className="flex justify-between items-start">
                      <div>
                        <Link
                          to={`/product/${productId}`}
                          className="text-xl font-medium hover:underline"
                        >
                          {product.name || item.name}
                        </Link>
                        <div className="text-lg text-gray-500 mt-1">
                          <p>Màu: {item.color?.name || "N/A"}</p>
                          <p>Size: {item.size}</p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleRemoveFromCart(productId, item.size, item.color)
                        }
                        className="text-red-500 hover:text-red-600"
                      >
                        Xóa
                      </button>
                    </div>
                    {/* Price and quantity */}
                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleAddToCart(
                              productId,
                              item.quantity,
                              item.size,
                              item.color,
                              -1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleAddToCart(
                              productId,
                              item.quantity,
                              item.size,
                              item.color,
                              1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      {/* Price */}
                      <div className="text-right">
                        <p className="font-medium">
                          {(
                            (product.discountPrice ||
                              product.price ||
                              item.price ||
                              0) * item.quantity
                          ).toLocaleString("vi-VN")}{" "}
                          VND
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#DCDCDC] p-6 sticky top-4">
              <h2 className="text-2xl font-medium mb-4">Tổng đơn hàng</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{getTotalPrice().toLocaleString("vi-VN")} VND</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span>
                    {getShippingCost() === 0 ? (
                      <span className="text-green-600 font-bold">Miễn phí</span>
                    ) : (
                      <span>
                        {getShippingCost().toLocaleString("vi-VN")} VND
                      </span>
                    )}
                  </span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Tổng tiền</span>
                    <span>{getTotalAmount().toLocaleString("vi-VN")} VND</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="block w-full py-2 px-4 bg-red-500 text-white text-center hover:bg-red-400"
                >
                  Thanh toán
                </button>
                <button
                  onClick={handleClearCart}
                  className="block w-full py-2 px-4 border border-black text-black text-center hover:bg-gray-100"
                >
                  Xóa giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
