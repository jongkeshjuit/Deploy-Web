import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity, selectedSize, selectedColor) => {
    setCartItems((prevItems) => {
      // Check if item already exists with same size and color
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.product._id === product._id &&
          item.size === selectedSize &&
          item.color === selectedColor
      );
      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        toast.success("Đã cập nhật số lượng trong giỏ hàng", {
          id: "cart-update",
        });
        return newItems;
      } else {
        // Add new item
        toast.success("Đã thêm vào giỏ hàng", {
          id: "cart-add",
        });
        return [
          ...prevItems,
          {
            product,
            quantity,
            size: selectedSize,
            color: selectedColor,
          },
        ];
      }
    });
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
      return newItems;
    });
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].quantity = newQuantity;
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Đã xóa giỏ hàng");
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product.discountPrice || item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
