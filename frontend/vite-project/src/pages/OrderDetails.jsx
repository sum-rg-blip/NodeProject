import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiUser,
  FiMail,
  FiPackage,
  FiDollarSign,
  FiCheckCircle,
} from "react-icons/fi";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Haddii page-ka si toos ah loo furo
  if (!state) {
    return (
      <div className="p-10 text-center text-gray-500">
        No order details found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">
          Order Details
        </h1>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* STATUS */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-semibold text-gray-800">
              {state.patientId}
            </p>
          </div>

          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
            <FiCheckCircle />
            Confirmed
          </span>
        </div>

        <hr />

        {/* PATIENT INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-3">
            <FiUser className="text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Patient Name</p>
              <p className="font-medium text-gray-800">
                {state.name}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <FiMail className="text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">
                {state.email}
              </p>
            </div>
          </div>
        </div>

        <hr />

        {/* TREATMENT */}
        <div className="flex gap-3">
          <FiPackage className="text-gray-400 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Treatment</p>
            <p className="font-medium text-gray-800">
              {state.treatment}
            </p>
            <p className="text-sm text-gray-500">
              Quantity: {state.quantity}
            </p>
          </div>
        </div>

        <hr />

        {/* AMOUNT */}
        <div className="flex gap-3">
          <FiDollarSign className="text-gray-400 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="text-xl font-semibold text-gray-800">
              {state.amount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
