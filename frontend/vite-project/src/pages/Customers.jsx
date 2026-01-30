import React, { useState } from "react";
import { FiMoreVertical, FiTrash2, FiCheckCircle } from "react-icons/fi";
import { MdOutlineMedicalServices } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const CustomerList = () => {
  const navigate = useNavigate();

  // ✅ Sidebar state
  const [activeSection, setActiveSection] = useState("dashboard");

  // Patients data
  const [patients, setPatients] = useState([
    {
      name: "Abu Bin Ishtiyak",
      patientId: "#P6985",
      email: "info@softnio.com",
      treatment: "Omidon 10mg",
      quantity: "10pcs",
      amount: "78.55 USD",
      status: "Pending",
    },
    {
      name: "Ashley Lawson",
      patientId: "#P6986",
      email: "ashley@softnio.com",
      treatment: "Zimax 50mg",
      quantity: "12pcs",
      amount: "90.20 USD",
      status: "Pending",
    },
    {
      name: "Joe Larson",
      patientId: "#P6987",
      email: "larson@example.com",
      treatment: "Furosemide",
      quantity: "1 bottle",
      amount: "43.98 USD",
      status: "Pending",
    },
    {
      name: "Jane Montgomery",
      patientId: "#P6988",
      email: "jane84@example.com",
      treatment: "Isoniazid Syrup",
      quantity: "2 bottle",
      amount: "80.26 USD",
      status: "Pending",
    },
    {
      name: "Frances Burns",
      patientId: "#P6989",
      email: "frances@example.com",
      treatment: "Pantonix 20mg",
      quantity: "8pcs",
      amount: "120.20 USD",
      status: "Pending",
    },
  ]);

  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // ✅ Open confirm modal
  const handleConfirmClick = (patient) => {
    setSelectedPatient(patient);
    setShowConfirm(true);
    setOpenMenuIndex(null);
  };

  // ✅ Confirm order
  const confirmOrder = () => {
    setPatients((prev) =>
      prev.map((p) =>
        p.patientId === selectedPatient.patientId
          ? { ...p, status: "Confirmed" }
          : p
      )
    );
    setShowConfirm(false);
    navigate("/order-details", { state: selectedPatient });
  };

  // ✅ Delete patient
  const handleDelete = (index) => {
    if (window.confirm("Ma hubtaa inaad tirtirto?")) {
      const newPatients = [...patients];
      newPatients.splice(index, 1);
      setPatients(newPatients);
    }
    setOpenMenuIndex(null);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-24 bg-gray-800 min-h-screen">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-[600px] max-w-6xl mx-auto mt-8">
          {/* Table Head */}
          <div className="overflow-x-auto">
            <table className="w-full border-b table-auto">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="p-4 text-left text-sm text-gray-500 w-1/4">
                    Patient
                  </th>
                  <th className="p-4 text-left text-sm text-gray-500 w-1/4">
                    Treatment
                  </th>
                  <th className="p-4 text-left text-sm text-gray-500 w-1/6">
                    Amount
                  </th>
                  <th className="p-4 text-left text-sm text-gray-500 w-1/6">
                    Status
                  </th>
                  <th className="p-4 w-12"></th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Scrollable Table Body */}
          <div className="overflow-y-auto flex-1">
            <table className="w-full table-auto">
              <tbody>
                {patients.map((p, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition">
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
                      <div className="text-sm text-gray-500 truncate">
                        Qty: {p.quantity}
                      </div>
                    </td>

                    <td className="p-4 font-semibold text-gray-700 w-1/6 truncate">{p.amount}</td>

                    <td className="p-4 w-1/6">
                      <span
                        className={`inline-flex items-center justify-center
                          px-4 py-1.5 rounded-full text-sm font-semibold
                          ${
                            p.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          } truncate`}
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
                          <button
                            onClick={() => handleConfirmClick(p)}
                            className="w-full px-4 py-3 text-left flex items-center gap-2 hover:bg-green-50 text-green-600"
                          >
                            <FiCheckCircle /> Confirm
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="w-full px-4 py-3 text-left flex items-center gap-2 hover:bg-red-50 text-red-600"
                          >
                            <FiTrash2 /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Confirm Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">Confirm Order</h2>

              <div className="space-y-2 text-sm text-gray-700">
                <p><b>Name:</b> {selectedPatient.name}</p>
                <p><b>Treatment:</b> {selectedPatient.treatment}</p>
                <p><b>Quantity:</b> {selectedPatient.quantity}</p>
                <p><b>Amount:</b> {selectedPatient.amount}</p>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-5 py-2 rounded-lg bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmOrder}
                  className="px-5 py-2 rounded-lg bg-green-600 text-white"
                >
                  Confirm
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
