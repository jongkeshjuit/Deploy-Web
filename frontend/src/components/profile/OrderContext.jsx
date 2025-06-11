import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken, removeAuthTokens } from "../../utils/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000";

// Tạo context
const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Hàm fetch đơn hàng từ API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getAuthToken();
      if (!token) {
        console.warn("No auth token found");
        console.log(
          "To test orders functionality, please login first or check localStorage for userToken"
        );
        console.log("Using fallback mock data for demo purposes");
        setOrders(getMockOrders());
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/api/orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Orders fetched successfully:", response.data);
      setOrders(response.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error); // Nếu token hết hạn hoặc không hợp lệ
      if (error.response?.status === 401) {
        console.warn("Token expired or invalid");
        removeAuthTokens();
        setOrders([]);
      } else {
        setError(
          error.response?.data?.message || "Có lỗi xảy ra khi tải đơn hàng"
        );

        // Fallback to mock data nếu server không có data
        if (error.response?.status === 500 || !error.response) {
          console.warn("Using fallback mock data");
          setOrders(getMockOrders());
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Mock data làm fallback
  const getMockOrders = () => {
    const deliveryStatuses = ["preparing", "shipping", "delivered"];
    const getRandomStatus = () =>
      deliveryStatuses[Math.floor(Math.random() * deliveryStatuses.length)];

    return [
      {
        _id: "mock-12345",
        createdAt: new Date().toISOString(),
        shippingAddress: {
          address: "123 Main St",
          city: "Ho Chi Minh",
          country: "Viet Nam",
          postalCode: "700000",
        },
        orderItems: [
          {
            productId: "prod1",
            name: "Áo Thun Nam Basic Cotton",
            image:
              "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
            quantity: 2,
            price: 299000,
            size: "M",
            color: "Đen",
          },
          {
            productId: "prod2",
            name: "Quần Jean Nam Slim Fit",
            image:
              "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop",
            quantity: 1,
            price: 750000,
            size: "32",
            color: "Xanh",
          },
        ],
        totalPrice: 1348000,
        isPaid: true,
        isDelivered: false,
        status: getRandomStatus(),
        paymentMethod: "Credit Card",
      },
      {
        _id: "mock-23456",
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        shippingAddress: {
          address: "456 Nguyen Hue St",
          city: "Ha Noi",
          country: "Viet Nam",
          postalCode: "100000",
        },
        orderItems: [
          {
            productId: "prod3",
            name: "Váy Midi Nữ Elegant",
            image:
              "https://images.unsplash.com/photo-1566479179817-7c3c8c86e2e1?w=500&h=600&fit=crop",
            quantity: 1,
            price: 680000,
            size: "M",
            color: "Đen",
          },
        ],
        totalPrice: 680000,
        isPaid: false,
        isDelivered: false,
        status: getRandomStatus(),
        paymentMethod: "Cash on Delivery",
      },
    ];
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Hàm refresh đơn hàng
  const refreshOrders = () => {
    fetchOrders();
  };

  // Hàm cập nhật một đơn hàng cụ thể
  const updateOrder = (orderId, updatedData) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, ...updatedData } : order
      )
    );
  };

  const value = {
    orders,
    loading,
    error,
    setOrders,
    refreshOrders,
    updateOrder,
    fetchOrders,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};
