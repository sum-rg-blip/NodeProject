import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineMessage,
  AiOutlineLogout,
} from "react-icons/ai";
import { HiOutlineClipboardList } from "react-icons/hi";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", icon: <AiOutlineHome size={24} />, label: "Dashboard" },
    { path: "/customer", icon: <AiOutlineUser size={24} />, label: "Patient" },
    // { path: "/order-details", icon: <HiOutlineClipboardList size={24} />, label: "Orders" },
    { path: "/message", icon: <AiOutlineMessage size={24} />, label: "Messages" },
    { path: "/", icon: <AiOutlineLogout size={24} />, label: "Logout", logout: true },
  ];

  const handleClick = (item) => {
    if (item.logout) {
      navigate("/");
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="flex flex-col items-center py-6 space-y-6 bg-gray-800 w-20">
      {menuItems.map((item) => (
        <button
          key={item.path}
          onClick={() => handleClick(item)}
          className={`flex flex-col items-center justify-center p-2 rounded-lg w-full hover:bg-gray-700 ${
            location.pathname === item.path ? "bg-gray-700" : ""
          }`}
        >
          <div className="text-teal-400">{item.icon}</div>
          <span className="text-xs mt-1 text-gray-100">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
