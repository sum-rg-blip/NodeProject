import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);
const API_BASE = "http://localhost:5000";

export function CartProvider({ children }) {
  const { token } = useAuth();

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  const total = useMemo(
    () => cart.reduce((sum, i) => sum + Number(i.price) * i.qty, 0),
    [cart]
  );

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const inc = (id) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  const dec = (id) => setCart((prev) => prev.map((i) => (i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i)));
  const remove = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const confirmOrder = async () => {
    if (!token) throw new Error("No token. Please login again.");
    if (cart.length === 0) throw new Error("Cart is empty");

    const payload = {
      products: cart.map((item) => ({
        name: item.brand,
        price: Number(item.price),
        image: item.image,
        quantity: item.qty,
      })),
      totalAmount: Number(total.toFixed(2)),
    };

    const res = await fetch(`${API_BASE}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token, // ✅ matches your middleware
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.message || "Order failed");

    clearCart();
    return data;
  };

  return (
    <CartContext.Provider value={{ cart, total, addToCart, inc, dec, remove, clearCart, confirmOrder }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
