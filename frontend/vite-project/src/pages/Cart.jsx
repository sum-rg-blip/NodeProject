import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { user, setAuthOpen } = useAuth();
  const { cart, inc, dec, remove, total, confirmOrder } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setAuthOpen(true);
      navigate("/products");
    }
  }, [user]);

  if (!user) return null;

   return (
    <div className="container section">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="orders-list">
            {cart.map((item) => (
              <div className="order-item" key={item.id} style={{ gap: "1rem" }}>
                <div
                  className="order-details"
                  style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                >
                  <img
                    src={item.image}
                    alt={item.brand}
                    style={{ width: 80, height: 80, objectFit: "contain" }}
                  />

                  <div>
                    <p><strong>{item.brand}</strong></p>
                    <p>${item.price}</p>

                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 8 }}>
                      <button onClick={() => dec(item.id)}>-</button>
                      <span style={{ fontWeight: 700 }}>{item.qty}</span>
                      <button onClick={() => inc(item.id)}>+</button>
                      <button onClick={() => remove(item.id)}>Remove</button>
                    </div>
                  </div>
                </div>

                <p style={{ fontWeight: 800 }}>
                  ${(Number(item.price) * item.qty).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: "2rem" }}>
            Total: ${total.toFixed(2)}
          </h3>

          <button
            className="btn-pill btn-outline"
            style={{ marginTop: "1rem" }}
            onClick={() => {
              confirmOrder();
              navigate("/checkout");
            }}
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  );
}

