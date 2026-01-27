import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [returns, setReturns] = useState({});

  if (cart.length === 0) {
    return (
      <div className="container section">
        <h2>No items to checkout</h2>
      </div>
    );
  }

  const handleConfirm = () => {
    clearCart();
    navigate("/thank-you");
  };

  return (
    <div className="container section">
      <h2>Order Confirmation</h2>

      <div className="orders-list">
        {cart.map((item) => (
          <div className="order-item" key={item.id}>
            <div className="order-details">
              <strong>{item.brand}</strong>
              <p>Qty: {item.qty}</p>
              <p>${item.price}</p>

              <textarea
                placeholder="Reason to return (optional)"
                value={returns[item.id] || ""}
                onChange={(e) =>
                  setReturns({
                    ...returns,
                    [item.id]: e.target.value,
                  })
                }
              />
            </div>

            <strong>
              ${(Number(item.price) * item.qty).toFixed(2)}
            </strong>
          </div>
        ))}
      </div>

      <h3>Total: ${total.toFixed(2)}</h3>

      <button className="btn-pill btn-outline" onClick={handleConfirm}>
        Confirm Order
      </button>
    </div>
  );
}
