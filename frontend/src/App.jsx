import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import LinenCollection from "./pages/LinenCollection";
import Auth from "./pages/Auth";
import SignupForm from "./pages/SignupForm";
import MyOdersPage from "./components/profile/MyOdersPage";
import ProfileLayout from "./components/Layout/ProfileLayout";
import ProfileInfo from "./components/profile/ProfileInfo";
import OrderDetailPage from "./components/profile/OrderDetailPage";
import { OrderProvider } from "./components/profile/OrderContext";
import ProductDetail from "./components/Product/ProductDetail";
import Information from "./pages/Information";
import About from "./components/information/About";
import Sponsorship from "./components/information/Sponsorship";

const App = () => {
  return (
    <BrowserRouter>
      <OrderProvider>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="linen" element={<LinenCollection />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<SignupForm />} />

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
          </Route>

          <Route>{/* admin layout */}</Route>
        </Routes>
      </OrderProvider>
    </BrowserRouter>
  );
};

export default App;
