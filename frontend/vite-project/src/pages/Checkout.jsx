import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  // store return reasons per product
  const [returnReasons, setReturnReasons] = useState({});
  const [returned, setReturned] = useState({});

  if (cart.length === 0) {
    return (
      <div className="container section text-center">
        <h2>No confirmed orders</h2>
      </div>
    );
  }

  const handleReturn = (id) => {
    if (!returnReasons[id] || returnReasons[id].trim() === "") {
      alert("Please provide a reason to return this product.");
      return;
    }

    setReturned((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="container section">
      <h2>Order Confirmed ✅</h2>

      <div className="orders-list">
        {cart.map((item) => (
          <div className="order-item" key={item.id}>
            {/* LEFT SIDE */}
            <div className="order-details">
              <img
                src={item.image}
                alt={item.brand}
                style={{ width: 80, height: 80, objectFit: "contain" }}
              />

              <div>
                <p><strong>{item.brand}</strong></p>
                <p>Qty: {item.qty}</p>
                <p>${item.price}</p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div style={{ width: "40%" }}>
              {returned[item.id] ? (
                <p style={{ color: "green", fontWeight: "600" }}>
                  Returned ✔
                </p>
              ) : (
                <>
                  <textarea
                    placeholder="Reason to return"
                    value={returnReasons[item.id] || ""}
                    onChange={(e) =>
                      setReturnReasons({
                        ...returnReasons,
                        [item.id]: e.target.value,
                      })
                    }
                    style={{ width: "100%", minHeight: 70 }}
                  />

                  <button
                    className="btn-pill btn-outline"
                    style={{ marginTop: 10 }}
                    onClick={() => handleReturn(item.id)}
                  >
                    Return
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "2rem" }}>
        Total Paid: ${total.toFixed(2)}
      </h3>
    <button
    className="btn-pill btn-outline"
    style={{ marginTop: "2rem" }}
    onClick={() => {
        clearCart();
        navigate("/products");
    }}
    >
    Back to Products
</button>

    </div>
  );
}
