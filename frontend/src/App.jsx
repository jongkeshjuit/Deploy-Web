import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import MyOdersPage from "./components/profile/MyOdersPage";
import ProfileLayout from "./components/Layout/ProfileLayout";
import ProfileInfo from "./components/profile/ProfileInfo";
import OrderDetailPage from "./components/profile/OrderDetailPage";
import { OrderProvider } from "./components/profile/OrderContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Collection from "./pages/Collection";
import { Toaster } from "sonner";
import ProductDetails from "./components/Products/ProductDetails";
import Information from "./pages/Information";
import About from "./components/information/About";
import Sponsorship from "./components/information/Sponsorship";
import Policy from "./pages/Policy";

const App = () => {
  return (
    <BrowserRouter>
      <OrderProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="collections/:id" element={<Collection />} />
            <Route path="product/:id" element={<ProductDetails />} />

            <Route path="profile" element={<ProfileLayout />}>
              <Route index element={<ProfileInfo />} />
              <Route path="info" element={<ProfileInfo />} />
              <Route path="orders" element={<MyOdersPage />} />
              <Route path="orders/:id" element={<OrderDetailPage />} />
            </Route>
            <Route path="/information" element={<Information />}>
              <Route index element={<About />} />
              <Route path="about" element={<About />} />
              <Route path="sponsorship" element={<Sponsorship />} />
            </Route>
            <Route path="/policy" element={<Policy />} />
          </Route>

          <Route>{/* admin layout */}</Route>
        </Routes>
      </OrderProvider>
    </BrowserRouter>
  );
};

export default App;
