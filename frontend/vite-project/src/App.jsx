// src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";

// Pages
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PharmacLogin from "./pages/Login";
import CustomerList from "./pages/Customers";
import DashboardPage from "./pages/DashboardPage";
import OrderDetails from "./pages/OrderDetails";
import Messages from "./pages/Messages";

// Context
import { useCart } from "./context/CartContext";

// Styles
import "./index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function App() {
  const { addToCart } = useCart();
  const location = useLocation();

  // Admin pages where navbar/footer should be hidden
  const adminPaths = [
    "/dashboard",
    "/customer",
    "/order-details",
    "/message",
    "/loginAdmin",
  ];
  const hideNavbar = adminPaths.includes(location.pathname);

  const initiateOrder = (product) => {
    addToCart(product);
  };

  return (
    <>
      {!hideNavbar && <Navbar type="public" />}
      <AuthModal />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home onOrder={initiateOrder} />} />
        <Route path="/home" element={<Home onOrder={initiateOrder} />} /> {/* ✅ FIX */}
        <Route path="/products" element={<ProductsPage onOrder={initiateOrder} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        {/* Admin Pages */}
        <Route path="/loginAdmin" element={<PharmacLogin />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/customer" element={<CustomerList />} />
        <Route path="/order-details/:id" element={<OrderDetails />} />
        <Route path="/message" element={<Messages />} />
      </Routes>

      {!hideNavbar && <Footer type="public" />}
    </>
  );
}
