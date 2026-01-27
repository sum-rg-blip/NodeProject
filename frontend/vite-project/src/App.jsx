import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";

import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import Contact from "./pages/Contact";
import About from "./pages/About";

import { useCart } from "./context/CartContext";

import "./App.css";

export default function App() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const initiateOrder = (product) => {
    const ok = addToCart(product);
    if (ok) navigate("/cart");
  };

  return (
    <>
      <Navbar />
      <AuthModal />

      <Routes>
        <Route path="/" element={<Home onOrder={initiateOrder} />} />
        <Route path="/home" element={<Home onOrder={initiateOrder} />} />
        <Route path="/products" element={<ProductsPage onOrder={initiateOrder} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </>
  );
}
