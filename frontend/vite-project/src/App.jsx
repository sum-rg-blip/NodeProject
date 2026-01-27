import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';

import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';

import './App.css';

function App() {
  // user (later from backend)
  const [user, setUser] = useState(null);

  // cart
  const [cart, setCart] = useState([]);

  // auth modal (later)
  const [showAuth, setShowAuth] = useState(false);

  // ✅ THIS FUNCTION WAS MISSING — NOW IT EXISTS
  const initiateOrder = (product) => {
    if (!user) {
      alert('Please login or register first');
      setShowAuth(true);
      return;
    }

    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);

      if (found) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  return (
    <BrowserRouter>
      <Navbar user={user} cartCount={cart.length} />

      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home onOrder={initiateOrder} />} />
        <Route path="/home" element={<Home onOrder={initiateOrder} />} />

        {/* PRODUCTS = FULL PRODUCT PAGE */}
        <Route
          path="/products"
          element={<ProductsPage onOrder={initiateOrder} />}
        />

        {/* SHOP (optional separate page) */}
        <Route path="/shop" element={<Shop onOrder={initiateOrder} />} />

        {/* STATIC */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
