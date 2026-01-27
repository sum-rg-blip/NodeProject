import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, setAuthOpen } = useAuth();

  // ✅ Load from localStorage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Persist on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    if (!user) {
      alert("Please login or register first");
      setAuthOpen(true);
      return false;
    }

    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });

    return true;
  };

  const inc = (id) =>
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
    );

  const dec = (id) =>
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0)
    );

  const remove = (id) =>
    setCart((prev) => prev.filter((p) => p.id !== id));

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const total = cart.reduce(
    (sum, p) => sum + Number(p.price) * p.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, inc, dec, remove, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
