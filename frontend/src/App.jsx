import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// user
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import MyOdersPage from "./components/profile/MyOdersPage";

import ProfileLayout from "./components/profile/ProfileLayout";
import ProfileInfo from "./components/profile/ProfileInfo";
import OrderDetailPage from "./components/profile/OrderDetailPage";
import { OrderProvider } from "./components/profile/OrderContext";
import { CartProvider } from "./components/Cart/CartContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Collection from "./pages/Collection";
import { Toaster } from "sonner";
import ProductDetails from "./components/Products/ProductDetails";
import Information from "./pages/Information";
import About from "./components/information/About";
import Sponsorship from "./components/information/Sponsorship";
import Policy from "./pages/Policy";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { Provider } from "react-redux";
import store from "./redux/store";
import GoogleCallback from "./pages/GoogleCallback";
import GenderCollection from "./pages/GenderCollection";
import CheckoutBuyNow from "./pages/CheckoutBuyNow";
// ==================================================
// admin
import AdminHomePage from "./pages/AdminHomePage";
import AdminLayout from "./components/Admin/AdminLayout";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";
import CollectionManagement from "./components/Admin/CollectionManagement";
import EditCollection from "./components/Admin/EditCollection";
// ==================================================
import PublicOnlyRoute from "./components/Auth/PublicOnlyRoute";
import PrivateRoute from "./components/Auth/PrivateRoute";
import axios from 'axios';
axios.defaults.withCredentials = true;
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CartProvider>
          <OrderProvider>
            <Toaster position="top-right" duration={2000} />
            <Routes>
              <Route path="/" element={<UserLayout />}>
                <Route index element={<Home />} />

                {/* Public only routes (redirect to home if logged in) */}
                <Route element={<PublicOnlyRoute />}>
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                </Route>

                <Route path="collections/:id" element={<Collection />} />
                <Route path="gendercollections/:id" element={<GenderCollection />} />
                <Route path="product/:id" element={<ProductDetails />} />
                <Route path="cart" element={<Cart />} />

                {/* Protected routes (require authentication) */}
                <Route element={<PrivateRoute />}>
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="checkout-buy-now" element={<CheckoutBuyNow />} />
                  <Route path="profile" element={<ProfileLayout />}>
                    <Route index element={<ProfileInfo />} />
                    <Route path="info" element={<ProfileInfo />} />
                    <Route path="orders" element={<MyOdersPage />} />
                    <Route path="orders/:id" element={<OrderDetailPage />} />
                  </Route>
                </Route>

                <Route path="auth/success" element={<GoogleCallback />} />
                <Route path="information" element={<Information />}>
                  <Route path="about" element={<About />} />
                  <Route path="sponsorship" element={<Sponsorship />} />
                </Route>
                <Route path="policy" element={<Policy />} />
              </Route>

              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminHomePage />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="products" element={<ProductManagement />} />
                <Route path="products/:id" element={<EditProductPage />} />
                <Route path="orders" element={<OrderManagement />} />
                <Route path="collections" element={<CollectionManagement />} />
                <Route path="collections/:id" element={<EditCollection />} />
              </Route>
            </Routes>
          </OrderProvider>
        </CartProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
