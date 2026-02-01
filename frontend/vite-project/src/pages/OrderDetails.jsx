import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { FiArrowLeft } from "react-icons/fi";

const API_BASE = "http://localhost:5000";

export default function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ /order-details/:id
  const { token } = useAuth();

  const [activeSection, setActiveSection] = useState("orders");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/orders/${id}`, {
          headers: { "x-auth-token": token },
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.message || "Failed to load order");
        setOrder(data);
      } catch (e) {
        setErr(e.message || "Failed to load order");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, token]);

  const rows = useMemo(() => {
    const userName = order?.user?.name || "Unknown";
    return (order?.products || []).map((p, idx) => ({
      id: idx,
      name: userName,
      product: p?.name || "-",
      amount: ((Number(p?.price || 0) * Number(p?.quantity || 0)) || 0).toFixed(2),
    }));
  }, [order]);

  return (
    <div className="flex">
      <div className="w-24 bg-gray-800 min-h-screen">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto mt-8">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-gray-100"
              type="button"
            >
              <FiArrowLeft size={18} />
            </button>

            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Order Details</h1>
              <p className="text-sm text-gray-500">
                Status: <span className="font-semibold">{order?.status || "-"}</span>
              </p>
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-500">
              Loading...
            </div>
          ) : err ? (
            <div className="bg-white rounded-2xl shadow p-10 text-center text-red-600">
              {err}
            </div>
          ) : !order ? (
            <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-500">
              No order details found
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="text-gray-700">
                    <div className="font-semibold">{order.user?.name}</div>
                    <div className="text-sm text-gray-500">{order.user?.email}</div>
                  </div>

                  <div className="text-sm text-gray-500">
                    Total:{" "}
                    <span className="text-gray-800 font-semibold">
                      {Number(order.totalAmount || 0).toFixed(2)} USD
                    </span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 text-left text-sm text-gray-500">Name</th>
                      <th className="p-4 text-left text-sm text-gray-500">Product</th>
                      <th className="p-4 text-left text-sm text-gray-500">Qty</th>
                      <th className="p-4 text-left text-sm text-gray-500">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(order.products || []).map((p, idx) => {
                      const lineAmount =
                        (Number(p?.price || 0) * Number(p?.quantity || 0)) || 0;

                      return (
                        <tr key={idx} className="border-t">
                          <td className="p-4 font-medium text-gray-800">
                            {order.user?.name}
                          </td>
                          <td className="p-4 text-gray-700">{p?.name}</td>
                          <td className="p-4 text-gray-700">{p?.quantity || 0}</td>
                          <td className="p-4 font-semibold text-gray-800">
                            {lineAmount.toFixed(2)} USD
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="p-6 border-t flex justify-end">
                <div className="text-gray-700">
                  <span className="text-sm text-gray-500">Grand Total: </span>
                  <span className="text-lg font-semibold text-gray-900">
                    {Number(order.totalAmount || 0).toFixed(2)} USD
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
