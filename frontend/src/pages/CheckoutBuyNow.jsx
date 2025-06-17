import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createCheckoutSession,
  clearCheckout,
} from "../redux/slices/checkoutSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import {
  BANK_INFO,
  generateVietQRUrl,
  generateOrderCode,
  QR_FALLBACK_SVG,
  fetchRecentTransactionsAndCheckPayment,
} from "../utils/bankInfo";
import axios from "axios";

const CheckoutBuyNow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { buyNowItem } = useSelector((state) => state.checkout);
  const { userInfo } = useSelector((state) => state.auth);

  const cartItems = buyNowItem ? [buyNowItem] : [];

  // Check login status and redirect if needed
  useEffect(() => {
    if (!userInfo) {
      // Save current path for redirect after login
      const returnUrl = encodeURIComponent(location.pathname);
      toast.error("Vui lòng đăng nhập để tiếp tục mua hàng!");
      navigate(`/login?returnUrl=${returnUrl}`);
      return;
    }
  }, [userInfo, navigate, location]);

  // Redirect if no buy now item
  useEffect(() => {
    if (!buyNowItem) {
      toast.error("Không có sản phẩm để mua ngay");
      navigate("/");
    }
  }, [buyNowItem, navigate]);

  const getTotalPrice = () => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  // Helper function to parse address from user profile
  const parseAddress = (addressString) => {
    if (!addressString)
      return { address: "", city: "", district: "", ward: "" };

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

  // Initialize form with user data
  const initializeFormData = () => {
    const user = userInfo || {};
    const parsedAddress = parseAddress(user.address);
    let birth = "";
    if (user.birth) {
      const d = new Date(user.birth);
      if (!isNaN(d.getTime())) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        birth = `${yyyy}-${mm}-${dd}`;
      }
    }
    return {
      fullName: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: parsedAddress.address,
      city: user.city || parsedAddress.city || "",
      district: user.district || parsedAddress.district || "",
      ward: user.ward || parsedAddress.ward || "",
      postalCode: "700000",
      country: "Vietnam",
      paymentMethod: "cod",
      notes: "",
      birth,
    };
  };

  // Form state
  const [formData, setFormData] = useState(initializeFormData());
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const [paymentCheckResult, setPaymentCheckResult] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Kiểm tra thông tin khi chuyển sang phương thức chuyển khoản
    if (name === "paymentMethod" && value === "bank_transfer") {
      const requiredFields = [
        { field: "fullName", label: "Họ và tên" },
        { field: "email", label: "Email" },
        { field: "phone", label: "Số điện thoại" },
        { field: "address", label: "Địa chỉ" },
        { field: "city", label: "Thành phố" },
        { field: "district", label: "Quận/Huyện" },
        { field: "ward", label: "Phường/Xã" },
      ];

      const missingFields = requiredFields.filter(
        ({ field }) => !formData[field] || formData[field].trim() === ""
      );

      if (missingFields.length > 0) {
        toast.error(
          `Vui lòng cập nhật đầy đủ thông tin: ${missingFields
            .map(({ label }) => label)
            .join(", ")} trong hồ sơ cá nhân!`
        );
      }
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim())
      newErrors.fullName = "Vui lòng cập nhật tên trong hồ sơ";
    if (!formData.email.trim())
      newErrors.email = "Vui lòng cập nhật email trong hồ sơ";
    if (!formData.phone.trim())
      newErrors.phone = "Vui lòng cập nhật số điện thoại trong hồ sơ";
    if (!formData.address.trim())
      newErrors.address = "Vui lòng cập nhật địa chỉ trong hồ sơ";

    // Kiểm tra định dạng email
    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Email trong hồ sơ không hợp lệ";
      }
    }

    // Kiểm tra định dạng số điện thoại
    if (formData.phone && formData.phone.trim()) {
      const phoneRegex = /^[0-9]{10,11}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
        newErrors.phone = "Số điện thoại trong hồ sơ không hợp lệ";
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error(
        "Vui lòng nhập đầy đủ thông tin giao hàng trong hồ sơ cá nhân!"
      );
    }
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Vui lòng kiểm tra lại thông tin đơn hàng!");
      return;
    }

    const requiredFields = [
      "address",
      "city",
      "district",
      "ward",
      "postalCode",
      "country",
    ];
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        toast.error(`Thiếu thông tin: ${field}`);
        return;
      }
    }

    setIsProcessing(true);
    try {
      const orderData = {
        checkoutItems: cartItems.map((item) => ({
          ...item,
          productId: item.productId,
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          district: formData.district,
          ward: formData.ward,
          postalCode: formData.postalCode,
          country: formData.country,
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          notes: formData.notes,
        },
        paymentMethod: formData.paymentMethod,
        totalPrice: getTotalPrice() + 50000,
      };

      const response = await dispatch(
        createCheckoutSession(orderData)
      ).unwrap();

      if (response) {
        // Finalize checkout
        try {
          const token =
            localStorage.getItem("userToken") || localStorage.getItem("token");
          const finalizeRes = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/checkout/${
              response._id
            }/finalize`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("✅ Finalized checkout:", finalizeRes.data);
        } catch (finalizeError) {
          console.error("❌ Lỗi khi finalize checkout:", finalizeError);
          toast.error("Đặt hàng thành công nhưng có lỗi khi xử lý tồn kho!");
        }

        // Clear checkout data
        dispatch(clearCheckout());

        // Handle payment method specific actions
        if (formData.paymentMethod === "bank_transfer") {
          toast.success(
            "Đặt hàng thành công! Đơn hàng đã được ghi nhận là ĐÃ THANH TOÁN."
          );
          setIsPaymentVerified(true);
          return;
        } else {
          toast.success("Đặt hàng thành công!");
          navigate("/");
        }
      }
    } catch (error) {
      console.log("[DEBUG] error:", error);
      toast.error(error.message || "Có lỗi xảy ra khi đặt hàng!");
    } finally {
      setIsProcessing(false);
    }
  };

  // Check payment status
  const handleCheckPayment = async () => {
    // Kiểm tra thông tin ProfileInfo trước khi cho phép kiểm tra thanh toán
    if (!validateForm()) {
      toast.error(
        "Vui lòng cập nhật đầy đủ thông tin giao hàng trong hồ sơ cá nhân trước khi kiểm tra thanh toán!"
      );
      return;
    }

    // Kiểm tra các trường bắt buộc
    const requiredFields = [
      { field: "fullName", label: "Họ và tên" },
      { field: "email", label: "Email" },
      { field: "phone", label: "Số điện thoại" },
      { field: "address", label: "Địa chỉ" },
      { field: "city", label: "Thành phố" },
      { field: "district", label: "Quận/Huyện" },
      { field: "ward", label: "Phường/Xã" },
    ];

    const missingFields = requiredFields.filter(
      ({ field }) => !formData[field] || formData[field].trim() === ""
    );

    if (missingFields.length > 0) {
      toast.error(
        `Vui lòng cập nhật đầy đủ thông tin: ${missingFields
          .map(({ label }) => label)
          .join(", ")} trong hồ sơ cá nhân!`
      );
      return;
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Email không hợp lệ!");
      return;
    }

    // Kiểm tra định dạng số điện thoại
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      toast.error("Số điện thoại không hợp lệ!");
      return;
    }

    setIsCheckingPayment(true);
    setPaymentCheckResult(null);
    setIsPaymentVerified(false);
    const orderCode = generateOrderCode();
    const amount = getTotalPrice() + 50000;
    const phone = userInfo?.phone || formData.phone || "";
    const result = await fetchRecentTransactionsAndCheckPayment(
      orderCode,
      amount,
      phone
    );
    setIsCheckingPayment(false);
    if (result) {
      setIsPaymentVerified(true);
      setPaymentCheckResult({
        success: true,
        message: "Đã xác nhận thanh toán thành công!",
      });
      toast.success("Đã xác nhận thanh toán thành công!");
    } else {
      setIsPaymentVerified(false);
      setPaymentCheckResult({
        success: false,
        message:
          "Chưa tìm thấy giao dịch phù hợp. Vui lòng kiểm tra lại sau khi chuyển khoản!",
      });
      toast.error("Chưa tìm thấy giao dịch phù hợp.");
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return null; // Will be redirected by useEffect
  }

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center py-6 mx-20 sm:px-4">
      <div className="flex flex-col items-start md:flex-row gap-6 md:gap-8 w-full">
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

          {/* Bank Transfer Information */}
          {formData.paymentMethod === "bank_transfer" && (
            <div className="space-y-4 mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
              <h3 className="font-bold text-lg mb-3">THÔNG TIN CHUYỂN KHOẢN</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-semibold">Ngân hàng:</span>{" "}
                    {BANK_INFO.bankName}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Số tài khoản:</span>{" "}
                    {BANK_INFO.accountNumber}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Tên tài khoản:</span>{" "}
                    {BANK_INFO.accountName}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Số tiền:</span>
                    <span className="font-bold text-red-600 ml-1">
                      {(getTotalPrice() + 50000).toLocaleString("vi-VN")} VND
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">
                      Nội dung chuyển khoản:
                    </span>
                    <div className="font-mono text-xs bg-white p-2 border rounded mt-1">
                      {generateOrderCode()}{" "}
                      {userInfo?.phone || formData.phone || ""}
                    </div>
                  </div>
                </div>

                {/* VietQR Code */}
                <div className="flex flex-col items-center">
                  <div className="text-sm font-semibold mb-2">
                    Quét mã QR để chuyển khoản
                  </div>
                  <div className="bg-white p-4 border border-gray-300 rounded">
                    <img
                      src={generateVietQRUrl(
                        getTotalPrice() + 50000,
                        generateOrderCode(),
                        userInfo?.phone || formData.phone || ""
                      )}
                      alt="VietQR Code"
                      className="w-56 h-56 object-contain"
                      onError={(e) => {
                        e.target.src = QR_FALLBACK_SVG;
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-600 mt-2 text-center">
                    Sử dụng app ngân hàng để quét mã QR
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-4">
                <div className="text-sm text-yellow-800">
                  <div className="font-semibold mb-1">📋 Lưu ý quan trọng:</div>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>
                      Vui lòng chuyển khoản đúng số tiền và nội dung như trên
                    </li>
                    <li>
                      Đơn hàng sẽ được xác nhận sau khi chúng tôi nhận được tiền
                    </li>
                    <li>Thời gian xử lý: {BANK_INFO.contact.processingTime}</li>
                    <li>
                      Liên hệ hotline: {BANK_INFO.contact.hotline} nếu cần hỗ
                      trợ
                    </li>
                  </ul>
                </div>
              </div>

              {/* Payment Check Button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleCheckPayment}
                  disabled={isCheckingPayment}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors flex items-center"
                >
                  {isCheckingPayment ? (
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  ) : (
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-7 4h12l-1 1H6l-1-1z"
                      />
                    </svg>
                  )}
                  Kiểm tra thanh toán
                </button>
                {paymentCheckResult && (
                  <div
                    className={`mt-2 text-sm ${
                      paymentCheckResult.success
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {paymentCheckResult.message}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Shipping Information for COD */}
          {formData.paymentMethod === "cod" && (
            <div className="space-y-4 mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
              <h3 className="font-bold text-lg mb-3">THÔNG TIN GIAO HÀNG</h3>
              <div className="text-sm">
                <span className="font-semibold">Họ và tên:</span>
                <span className="ml-2">{formData.fullName}</span>
              </div>
              <div className="text-sm">
                <span className="font-semibold">Địa chỉ giao hàng:</span>
                <span className="ml-2">
                  {formData.address}, {formData.ward}, {formData.district},{" "}
                  {formData.city}
                </span>
              </div>
              <div className="text-sm">
                <span className="font-semibold">Số điện thoại:</span>
                <span className="ml-2">{formData.phone}</span>
              </div>
              <div className="text-sm">
                <span className="font-semibold">Phương thức thanh toán:</span>
                <span className="ml-2 text-green-600 font-medium">
                  Thanh toán khi giao hàng
                </span>
              </div>
              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-3">
                <div className="text-sm text-yellow-800">
                  <div className="font-semibold mb-1">📋 Lưu ý:</div>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Bạn sẽ thanh toán khi nhận được hàng</li>
                    <li>Vui lòng kiểm tra hàng trước khi thanh toán</li>
                    <li>Đơn hàng sẽ được giao trong vòng 2-3 ngày làm việc</li>
                    <li>Phí vận chuyển: 50.000 VND</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={
              isProcessing ||
              (formData.paymentMethod === "bank_transfer" && !isPaymentVerified)
            }
            className="w-full sm:w-48 h-12 bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg uppercase transition-colors duration-150 mt-2"
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

export default CheckoutBuyNow;
