import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [reasons, setReasons] = useState({});

  const submitOrder = () => {
    for (const item of cart) {
      if (reasons[item.id] === "") {
        alert("Return reason required");
        return;
      }
    }

    clearCart();
    navigate("/thank-you");
  };

  return (
    <div className="container section">
      <h2>Checkout</h2>

      {cart.map((item) => (
        <div key={item.id} className="checkout-item">
          <img src={item.image} alt={item.brand} />

          <div className="checkout-info">
            <h3>{item.brand}</h3>
            <p>Product ID: {item.id}</p>
            <p>${item.price}</p>

            <button className="return-btn">Return</button>
            <textarea
              placeholder="Reason for return (required)"
              value={reasons[item.id] || ""}
              onChange={(e) =>
                setReasons({ ...reasons, [item.id]: e.target.value })
              }
            />
          </div>
        </div>
      ))}

      <h3>Total: ${total.toFixed(2)}</h3>

      <button className="btn-confirm" onClick={submitOrder}>
        Place Order
      </button>
    </div>
  );
}
