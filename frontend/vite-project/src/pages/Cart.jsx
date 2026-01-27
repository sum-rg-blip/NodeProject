import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const navigate = useNavigate();

  // ✅ get EVERYTHING from context
  const { cart, inc, dec, remove, total } = useCart();

  return (
    <div className="container section">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="orders-list">
            {cart.map((item) => (
              <div className="order-item" key={item.id}>
                
                {/* LEFT SIDE */}
                <div className="order-details">
                  <strong>{item.brand}</strong>
                  <p>${item.price}</p>

                  <div className="qty-controls">
                    <button onClick={() => dec(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => inc(item.id)}>+</button>
                    <button
                      className="btn-remove"
                      onClick={() => remove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <strong>
                  ${(Number(item.price) * item.qty).toFixed(2)}
                </strong>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: "2rem" }}>
            Total: ${total.toFixed(2)}
          </h3>

          <button
            className="btn-pill btn-outline"
            onClick={() => navigate("/checkout")}
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  );
}
