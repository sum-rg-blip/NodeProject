import React, { useState } from "react";
import { HiBell, HiOutlineSearch, HiUserCircle } from "react-icons/hi";

export default function TopNavbar() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 shadow-md rounded-lg mb-6">
      {/* Left: Logo + Search */}
      <div className="flex items-center space-x-3">
        <div className="text-teal-600 font-bold text-xl">MyDashboard</div>
        <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1">
          <HiOutlineSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent focus:outline-none text-gray-700 dark:text-gray-200"
          />
        </div>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <HiBell className="text-gray-700 dark:text-gray-200 text-xl" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
            3
          </span>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <HiUserCircle className="text-gray-700 dark:text-gray-200 text-2xl" />
        </button>
      </div>
    </div>
  );
}