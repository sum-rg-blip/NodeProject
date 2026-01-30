import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [returns, setReturns] = useState({});

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">No items to checkout</h2>
      </div>
    );
  }

  const handleConfirm = () => {
    clearCart();
    navigate("/thank-you");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Order Confirmation</h2>

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            {/* LEFT SIDE */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <img
                src={item.image}
                alt={item.brand}
                className="w-20 h-20 object-contain rounded-lg bg-gray-50"
              />
              <div className="flex flex-col gap-1">
                <strong className="text-gray-900 font-semibold">{item.brand}</strong>
                <p className="text-gray-500">Qty: {item.qty}</p>
                <p className="text-gray-500">${item.price}</p>
              </div>
            </div>

            {/* RETURN TEXTAREA */}
            <div className="w-full md:w-1/3 mt-4 md:mt-0 flex flex-col">
              <textarea
                placeholder="Reason to return (optional)"
                value={returns[item.id] || ""}
                onChange={(e) =>
                  setReturns({
                    ...returns,
                    [item.id]: e.target.value,
                  })
                }
                className="w-full border border-gray-200 rounded-xl p-3 resize-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* TOTAL PRICE */}
            <strong className="text-gray-900 font-bold mt-4 md:mt-0">
              ${(Number(item.price) * item.qty).toFixed(2)}
            </strong>
          </div>
        ))}
      </div>

      {/* TOTAL & BUTTON */}
      <div className="mt-8 flex flex-col items-end gap-4">
        <h3 className="text-xl font-bold text-gray-900">
          Total: ${total.toFixed(2)}
        </h3>

        <button
          className="bg-black text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-900 transition"
          onClick={handleConfirm}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
