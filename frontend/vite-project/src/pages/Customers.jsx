import React, { useEffect, useMemo, useState } from "react";
import { FiMoreVertical, FiTrash2, FiCheckCircle } from "react-icons/fi";
import { MdOutlineMedicalServices } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const API_BASE = "http://localhost:5000";

const CustomerList = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [activeSection, setActiveSection] = useState("orders");
  const [rows, setRows] = useState([]);

  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loadingConfirm, setLoadingConfirm] = useState(false);

  const mapOrderToRow = (order) => {
    const firstProduct = order?.products?.[0];
    const qty = (order?.products || []).reduce((s, p) => s + (p.quantity || 0), 0);

    return {
      orderId: order?._id,
      patientId: order?._id ? `#${String(order._id).slice(-6).toUpperCase()}` : "#NEW",
      name: order?.user?.name || "Unknown User",
      email: order?.user?.email || "N/A",
      treatment:
        order?.products?.length > 1
          ? `${firstProduct?.name || "Item"} + ${order.products.length - 1} more`
          : firstProduct?.name || "Item",
      quantity: `${qty} pcs`,
      amount: `${Number(order?.totalAmount || 0).toFixed(2)} USD`,
      status: order?.status || "Ordered",
    };
  };

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE}/api/orders`, {
          headers: { "x-auth-token": token },
        });
        const data = await res.json().catch(() => []);
        if (!res.ok) return;
        setRows((data || []).map(mapOrderToRow));
      } catch (e) {
        // ignore
      }
    };
    load();
  }, [token]);

  const handleConfirmClick = (row) => {
    if (row.status === "Confirmed") {
      alert("This order is already confirmed.");
      setOpenMenuIndex(null);
      return;
    }
    setSelected(row);
    setShowConfirm(true);
    setOpenMenuIndex(null);
  };

  const confirmOrder = async () => {
    if (!selected?.orderId) return;

    try {
      setLoadingConfirm(true);

      const res = await fetch(`${API_BASE}/api/orders/${selected.orderId}/confirm`, {
        method: "PATCH",
        headers: { "x-auth-token": token },
      });
      

      const updated = await res.json().catch(() => null);
      if (!res.ok) throw new Error(updated?.message || "Confirm failed");

      setRows((prev) =>
        prev.map((r) => (r.orderId === selected.orderId ? mapOrderToRow(updated) : r))
      );

      setShowConfirm(false);
      navigate(`/order-details/${selected.orderId}`);
    } catch (e) {
      alert(e.message || "Confirm failed");
    } finally {
      setLoadingConfirm(false);
    }
  };

  const handleDelete = async (row) => {
    if (!row?.orderId) return;
    if (!window.confirm("Ma hubtaa inaad tirtirto?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/orders/${row.orderId}`, {
        method: "DELETE",
        headers: { "x-auth-token": token },
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || "Delete failed");

      setRows((prev) => prev.filter((r) => r.orderId !== row.orderId));
      setOpenMenuIndex(null);
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  };

  const modalInfo = useMemo(() => selected, [selected]);

  return (
    <div className="flex">
      <div className="w-24 bg-gray-800 min-h-screen">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>

      <div className="flex-1 p-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-[600px] max-w-6xl mx-auto mt-8">
          <div className="overflow-x-auto">
            <table className="w-full border-b table-auto">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="p-4 text-left text-sm text-gray-500 w-1/4">Patient</th>
                  <th className="p-4 text-left text-sm text-gray-500 w-1/4">Treatment</th>
                  <th className="p-4 text-left text-sm text-gray-500 w-1/6">Amount</th>
                  <th className="p-4 text-left text-sm text-gray-500 w-1/6">Status</th>
                  <th className="p-4 w-12"></th>
                </tr>
              </thead>
            </table>
          </div>

          <div className="overflow-y-auto flex-1">
            <table className="w-full table-auto">
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td className="p-6 text-center text-gray-500" colSpan={5}>
                      No orders yet. Create an order from Cart.
                    </td>
                  </tr>
                ) : (
                  rows.map((p, index) => (
                    <tr key={p.orderId} className="border-b hover:bg-gray-50 transition">
                      <td className="p-4 w-1/4">
                        <div className="font-semibold text-gray-800 truncate">{p.name}</div>
                        <div className="text-sm text-gray-500 truncate">{p.email}</div>
                        <div className="text-xs text-gray-400 truncate">{p.patientId}</div>
                      </td>

                      <td className="p-4 w-1/4">
                        <div className="flex items-center gap-2 font-medium text-gray-700 truncate">
                          <MdOutlineMedicalServices className="text-gray-400" />
                          {p.treatment}
                        </div>
                        <div className="text-sm text-gray-500 truncate">Qty: {p.quantity}</div>
                      </td>

                      <td className="p-4 font-semibold text-gray-700 w-1/6 truncate">{p.amount}</td>

                      <td className="p-4 w-1/6">
                        <span
                          className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-semibold ${
                            p.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>

                      <td className="p-4 relative w-12">
                        <button
                          onClick={() => setOpenMenuIndex(index)}
                          className="p-2 rounded-lg hover:bg-gray-100"
                        >
                          <FiMoreVertical />
                        </button>

                        {openMenuIndex === index && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg z-10">
                            {p.status !== "Confirmed" ? (
                              <button
                                onClick={() => handleConfirmClick(p)}
                                className="w-full px-4 py-3 text-left flex items-center gap-2 hover:bg-green-50 text-green-600"
                              >
                                <FiCheckCircle /> Confirm
                              </button>
                            ) : (
                              <button
                                disabled
                                className="w-full px-4 py-3 text-left flex items-center gap-2 text-gray-400 cursor-not-allowed"
                              >
                                <FiCheckCircle /> Confirmed
                              </button>
                            )}

                            <button
                              onClick={() => handleDelete(p)}
                              className="w-full px-4 py-3 text-left flex items-center gap-2 hover:bg-red-50 text-red-600"
                            >
                              <FiTrash2 /> Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showConfirm && modalInfo && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">Confirm Order</h2>

              <div className="space-y-2 text-sm text-gray-700">
                <p><b>Name:</b> {modalInfo.name}</p>
                <p><b>Treatment:</b> {modalInfo.treatment}</p>
                <p><b>Quantity:</b> {modalInfo.quantity}</p>
                <p><b>Amount:</b> {modalInfo.amount}</p>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-5 py-2 rounded-lg bg-gray-200"
                  disabled={loadingConfirm}
                >
                  Cancel
                </button>

                <button
                  onClick={confirmOrder}
                  className="px-5 py-2 rounded-lg bg-green-600 text-white disabled:opacity-60"
                  disabled={loadingConfirm}
                >
                  {loadingConfirm ? "Confirming..." : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
