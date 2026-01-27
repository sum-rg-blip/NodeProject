import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  /* ---------------- CART ---------------- */
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  /* ---------------- ORDERS ---------------- */
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  /* ---------------- PERSIST ---------------- */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  /* ---------------- CART ACTIONS ---------------- */
  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    return true;
  };

  const inc = (id) =>
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
    );

  const dec = (id) =>
    setCart((prev) =>
      prev.map((i) =>
        i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
      )
    );

  const remove = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  /* ---------------- TOTAL ---------------- */
  const total = useMemo(() => {
    return cart.reduce(
      (sum, i) => sum + Number(i.price) * i.qty,
      0
    );
  }, [cart]);

  /* ---------------- CONFIRM ORDER ---------------- */
  const confirmOrder = () => {
    if (cart.length === 0) return;

    const confirmed = cart.map((item) => ({
      ...item,
      orderId: Date.now() + item.id,
      status: "CONFIRMED",
      returnReason: "",
    }));

    setOrders((prev) => [...prev, ...confirmed]);
    clearCart();
  };

  /* ---------------- RETURN ORDER ---------------- */
  const returnOrder = (orderId, reason) => {
    if (!reason || reason.trim() === "") {
      alert("Return reason is required");
      return false;
    }

    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === orderId
          ? { ...o, status: "RETURNED", returnReason: reason }
          : o
      )
    );

    return true;
  };

  /* ---------------- PROVIDER ---------------- */
  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        inc,
        dec,
        remove,
        total,
        confirmOrder,
        returnOrder,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ---------------- HOOK ---------------- */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
