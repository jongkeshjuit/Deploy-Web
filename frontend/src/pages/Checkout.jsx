import React, { useState, useEffect } from "react";
import { useCart } from "../components/Cart/CartContext";
import { useSelector, useDispatch } from "react-redux";
import { createCheckoutSession } from "../redux/slices/checkoutSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { loading, error } = useSelector((state) => state.checkout);

  // Hardcoded user data from ProfileInfo
  const hardcodedUserInfo = {
    email: "nguyen.vana@example.com",
    name: "Nguyễn Văn A",
    phone: "0987654321",
    address: "123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM",
    birth: "1990-05-15",
    gender: "male",
  };
  // Helper function to parse address from user profile
  const parseAddress = (addressString) => {
    if (!addressString)
      return { address: "", city: "", district: "", ward: "" };

    // Try to parse Vietnamese address format: "street, district, city"
    const parts = addressString.split(",").map((part) => part.trim());

    if (parts.length >= 3) {
      return {
        address: parts[0] || "",
        district: parts[1] || "",
        city: parts[2] || "",
        ward: parts.length > 3 ? parts.slice(1, -2).join(", ") : "",
      };
    } else if (parts.length === 2) {
      return {
        address: parts[0] || "",
        city: parts[1] || "",
        district: "",
        ward: "",
      };
    } else {
      return {
        address: addressString,
        city: "",
        district: "",
        ward: "",
      };
    }
  };
  // Initialize form with hardcoded user data
  const initializeFormData = () => {
    const parsedAddress = parseAddress(hardcodedUserInfo?.address);

    return {
      // Shipping Information
      fullName: hardcodedUserInfo?.name || "",
      email: hardcodedUserInfo?.email || "",
      phone: hardcodedUserInfo?.phone || "",
      address: parsedAddress.address,
      city: parsedAddress.city,
      district: parsedAddress.district,
      ward: parsedAddress.ward,
      postalCode: "",
      country: "Vietnam",

      // Payment Information - default to credit card to match the new design
      paymentMethod: "credit_card",

      // Additional notes
      notes: "",
    };
  };

  // Form state
  const [formData, setFormData] = useState(initializeFormData());

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false); // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      toast.error("Giỏ hàng của bạn đang trống!");
      navigate("/cart");
    }
  }, [cartItems, navigate]);
  // Handle input changes (only for payment method and notes)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Check if user profile has required information
    if (!formData.fullName.trim())
      newErrors.fullName = "Vui lòng cập nhật tên trong hồ sơ";
    if (!formData.email.trim())
      newErrors.email = "Vui lòng cập nhật email trong hồ sơ";
    if (!formData.phone.trim())
      newErrors.phone = "Vui lòng cập nhật số điện thoại trong hồ sơ";
    if (!formData.address.trim())
      newErrors.address = "Vui lòng cập nhật địa chỉ trong hồ sơ";
    if (!formData.city.trim())
      newErrors.city = "Vui lòng cập nhật thành phố trong hồ sơ";
    if (!formData.district.trim())
      newErrors.district = "Vui lòng cập nhật quận/huyện trong hồ sơ";
    if (!formData.ward.trim())
      newErrors.ward = "Vui lòng cập nhật phường/xã trong hồ sơ";

    // Email validation (only if email exists)
    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Email trong hồ sơ không hợp lệ";
      }
    }

    // Phone validation (only if phone exists)
    if (formData.phone && formData.phone.trim()) {
      const phoneRegex = /^[0-9]{10,11}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
        newErrors.phone = "Số điện thoại trong hồ sơ không hợp lệ";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error(
        "Vui lòng cập nhật đầy đủ thông tin trong hồ sơ để tiến hành thanh toán"
      );
      return;
    }

    // For demo purposes, we'll skip the login check since we're using hardcoded data
    // In a real application, you would check for authentication here

    setIsProcessing(true);

    try {
      // Prepare checkout data
      const checkoutData = {
        checkoutItems: cartItems.map((item) => ({
          productId: item.product._id,
          name: item.product.name,
          image: item.product.images?.[0]?.url || "",
          price: item.product.discountPrice || item.product.price,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
        })),
        shippingAddress: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          district: formData.district,
          ward: formData.ward,
          postalCode: formData.postalCode,
          country: formData.country,
          notes: formData.notes,
        },
        paymentMethod: formData.paymentMethod,
        totalPrice: getTotalPrice(),
      };

      // Create checkout session
      const result = await dispatch(createCheckoutSession({ checkoutData }));

      if (createCheckoutSession.fulfilled.match(result)) {
        toast.success("Đơn hàng đã được tạo thành công!");
        clearCart(); // Clear the cart after successful checkout
        navigate("/profile/orders"); // Redirect to orders page
      } else {
        throw new Error(result.payload || "Không thể tạo đơn hàng");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Có lỗi xảy ra khi xử lý đơn hàng");
    } finally {
      setIsProcessing(false);
    }
  };

  // Calculate shipping cost (free for now)
  const shippingCost = 0;
  const totalAmount = getTotalPrice() + shippingCost;

  if (cartItems.length === 0) {
    return null; // Will be redirected by useEffect
  }
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center py-6 mx-20 sm:px-4">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full ">
        {/* Payment Method & Form */}
        <div className="flex-1 border p-4 sm:p-6 md:p-8 bg-white min-w-0">
          <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 uppercase tracking-wide">
            PHƯƠNG THỨC THANH TOÁN
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6 gap-4 sm:gap-8">
            <label className="flex items-center font-medium text-base">
              <input
                type="radio"
                name="paymentMethod"
                value="credit_card"
                checked={formData.paymentMethod === "credit_card"}
                onChange={handleInputChange}
                className="mr-2 accent-black"
              />
              <span className="text-sm sm:text-base">Thẻ Tín Dụng/Ghi Nợ</span>
            </label>
            <label className="flex items-center font-medium text-base">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleInputChange}
                className="mr-2 accent-black"
              />
              <span className="text-sm sm:text-base">
                Thanh toán khi giao hàng
              </span>
            </label>
            <label className="flex items-center font-medium text-base">
              <input
                type="radio"
                name="paymentMethod"
                value="bank_transfer"
                checked={formData.paymentMethod === "bank_transfer"}
                onChange={handleInputChange}
                className="mr-2 accent-black"
              />
              <span className="text-sm sm:text-base">
                Chuyển khoản ngân hàng
              </span>
            </label>
          </div>

          {/* Credit Card Fields */}
          {formData.paymentMethod === "credit_card" && (
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div>
                <label className="block font-bold text-xs sm:text-sm mb-1">
                  MÃ SỐ THẺ*
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Vui lòng nhập mã số thẻ của bạn"
                  className="w-full border border-gray-300 rounded px-2 py-2 sm:px-3 focus:outline-none focus:border-black text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-xs sm:text-sm mb-1">
                  NGÀY HẾT HẠN*
                </label>
                <input
                  type="text"
                  name="cardExpiry"
                  placeholder="Vui lòng nhập tên của bạn"
                  className="w-full border border-gray-300 rounded px-2 py-2 sm:px-3 focus:outline-none focus:border-black text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-xs sm:text-sm mb-1">
                  MÃ BẢO MẬT*
                </label>
                <input
                  type="text"
                  name="cardCVC"
                  placeholder="3 digit"
                  className="w-full border border-gray-300 rounded px-2 py-2 sm:px-3 focus:outline-none focus:border-black text-sm"
                />
                <div className="flex space-x-2 mt-1">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/349/349221.png"
                    alt="Visa"
                    className="h-5"
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/349/349228.png"
                    alt="Mastercard"
                    className="h-5"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-xs sm:text-sm mb-1">
                  HỌ VÀ TÊN*
                </label>
                <input
                  type="text"
                  name="cardName"
                  placeholder="Vui lòng nhập tên của bạn"
                  className="w-full border border-gray-300 rounded px-2 py-2 sm:px-3 focus:outline-none focus:border-black text-sm"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isProcessing || loading}
            className="w-full sm:w-48 h-12 bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg uppercase rounded transition-colors duration-150 mt-2"
            style={{ letterSpacing: 1 }}
          >
            ĐẶT HÀNG
          </button>
        </div>

        {/* Order Summary */}
        <div className="flex-1 border p-4 sm:p-6 md:p-8 bg-white max-w-full md:max-w-md mt-8 md:mt-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
            <span className="font-bold uppercase text-base sm:text-lg tracking-wide">
              TỔNG ĐƠN HÀNG
            </span>
            <span className="font-bold text-sm sm:text-base">
              {cartItems.length} SẢN PHẨM
            </span>
          </div>
          <div className="mb-2 flex justify-between text-xs sm:text-sm">
            <span>Tổng cộng</span>
            <span>{getTotalPrice().toLocaleString("vi-VN")} VND</span>
          </div>
          <div className="mb-2 flex justify-between text-xs sm:text-sm">
            <span>Phí vận chuyển</span>
            <span>50.000 VND</span>
          </div>
          <div className="border-t border-black my-2"></div>
          <div className="mb-2 flex justify-between items-center text-base sm:text-lg font-bold">
            <span>TỔNG</span>
            <span>{(getTotalPrice() + 50000).toLocaleString("vi-VN")} VND</span>
          </div>
          <div className="text-xs text-gray-500 mb-2">
            Đã bao gồm thuế giá trị gia tăng
            <span className="float-right">
              {Math.round((getTotalPrice() + 50000) / 11).toLocaleString(
                "vi-VN"
              )}{" "}
              VND
            </span>
          </div>
          <div className="border-t border-black my-2"></div>
          <div className="mb-2 flex justify-between items-center text-xs sm:text-base font-bold">
            <span>TỔNG ĐƠN ĐẶT HÀNG</span>
            <span>{(getTotalPrice() + 50000).toLocaleString("vi-VN")} VND</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
