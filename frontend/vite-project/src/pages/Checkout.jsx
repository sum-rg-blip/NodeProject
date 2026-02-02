import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const { user, token, setAuthOpen } = useAuth();
  const { cart, total, confirmOrder } = useCart();
  const navigate = useNavigate();

  const [returns, setReturns] = useState({});
  const [loading, setLoading] = useState(false);
  const [thankYou, setThankYou] = useState(false);

  // Prompt login if not authenticated
  useEffect(() => {
    if (!user || !token) setAuthOpen(true);
  }, [user, token, setAuthOpen]);

  if (!user || !token) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">
          Please login to continue
        </h2>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">
          No items to checkout
        </h2>
      </div>
    );
  }

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await confirmOrder(); // ✅ Order goes to backend for admin
      setThankYou(true); // show thank-you message
      setTimeout(() => {
        navigate("/products"); // ✅ Redirect customer to products page
      }, 2000); // wait 2 sec so customer sees the thank-you
    } catch (e) {
      alert(e.message || "Order failed");
      if (String(e.message || "").toLowerCase().includes("token")) setAuthOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Order Confirmation
      </h2>

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition"
          >
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

            <div className="w-full md:w-1/3 mt-4 md:mt-0 flex flex-col">
              <textarea
                placeholder="Reason to return (optional)"
                value={returns[item.id] || ""}
                onChange={(e) =>
                  setReturns({ ...returns, [item.id]: e.target.value })
                }
                className="w-full border border-gray-200 rounded-xl p-3 resize-none focus:ring-2 focus:ring-black"
              />
            </div>

            <strong className="text-gray-900 font-bold mt-4 md:mt-0">
              ${(Number(item.price) * item.qty).toFixed(2)}
            </strong>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-4">
        <h3 className="text-xl font-bold text-gray-900">
          Total: ${total.toFixed(2)}
        </h3>

        <button
          className="bg-black text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-900 transition disabled:opacity-60"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm Order"}
        </button>

        {thankYou && (
          <p className="mt-4 text-green-600 font-semibold">
            Thank you! Your order has been placed.
          </p>
        )}
      </div>
    </div>
  );
}
