import React, { createContext, useContext, useState, useEffect } from "react";

// Tạo context
const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Mock data giống trong MyOdersPage
    const deliveryStatuses = ["preparing", "shipping", "delivered"];
    const getRandomStatus = () =>
      deliveryStatuses[Math.floor(Math.random() * deliveryStatuses.length)];
    const mockOders = [
      {
        _id: "12345",
        createAt: new Date(),
        shippingAddress: {
          city: "Ho Chi Minh",
          country: "Viet Nam",
          detail: "123 Main St, Ho Chi Minh, Viet Nam",
        },
        oderItems: [
          {
            product: {
              name: "Product 1",
              imageUrl: "https://via.placeholder.com/150",
            },
            quantity: 2,
            price: 100,
          },
          {
            product: {
              name: "Product 2",
              imageUrl: "https://via.placeholder.com/150",
            },
            quantity: 1,
            price: 50,
          },
        ],
        totalPrice: 250,
        isPaid: true,
        deliveryStatus: getRandomStatus(),
      },
      {
        _id: "23456",
        createAt: new Date(),
        shippingAddress: {
          city: "Ha Noi",
          country: "Viet Nam",
          detail: "456 Main St, Ha Noi, Viet Nam",
        },
        oderItems: [
          {
            product: {
              name: "Product 3",
              imageUrl: "https://via.placeholder.com/150",
            },
            quantity: 3,
            price: 80,
          },
        ],
        totalPrice: 240,
        isPaid: false,
        deliveryStatus: getRandomStatus(),
      },
      {
        _id: "34567",
        createAt: new Date(),
        shippingAddress: {
          city: "Da Nang",
          country: "Viet Nam",
          detail: "789 Main St, Da Nang, Viet Nam",
        },
        oderItems: [
          {
            product: {
              name: "Product 4",
              imageUrl: "https://via.placeholder.com/150",
            },
            quantity: 1,
            price: 120,
          },
          {
            product: {
              name: "Product 5",
              imageUrl: "https://via.placeholder.com/150",
            },
            quantity: 2,
            price: 60,
          },
        ],
        totalPrice: 240,
        isPaid: true,
        deliveryStatus: getRandomStatus(),
      },
      {
        _id: "45678",
        createAt: new Date(),
        shippingAddress: {
          city: "Can Tho",
          country: "Viet Nam",
          detail: "101 Main St, Can Tho, Viet Nam",
        },
        oderItems: [
          {
            product: {
              name: "Product 6",
              imageUrl: "https://via.placeholder.com/150",
            },
            quantity: 2,
            price: 90,
          },
        ],
        totalPrice: 180,
        isPaid: false,
        deliveryStatus: getRandomStatus(),
      },
      {
        _id: "56789",
        createAt: new Date(),
        shippingAddress: {
          city: "Nha Trang",
          country: "Viet Nam",
          detail: "202 Main St, Nha Trang, Viet Nam",
        },
        oderItems: [
          {
            product: {
              name: "Product 7",
              imageUrl: "https://via.placeholder.com/150",
            },
            quantity: 1,
            price: 200,
          },
        ],
        totalPrice: 200,
        isPaid: true,
        deliveryStatus: getRandomStatus(),
      },
      {
        _id: "67890",
        createAt: new Date(),
        shippingAddress: {
          city: "Vung Tau",
          country: "Viet Nam",
          detail: "303 Main St, Vung Tau, Viet Nam",
        },
        oderItems: [
          {
            product: {
              name: "Product 8",
              imageUrl: "https://via.placeholder.com/150",
            },
            quantity: 2,
            price: 110,
          },
        ],
        totalPrice: 220,
        isPaid: false,
        deliveryStatus: getRandomStatus(),
      },
    ];
    setTimeout(() => setOrders(mockOders), 500);
  }, []);

  return (
    <OrderContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
