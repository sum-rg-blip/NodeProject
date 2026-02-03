import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardContent from "../components/DashboardContent";
import CustomerList from "./Customers";
import TopNavbar from "../components/TopNavbar";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Sidebar */}
      <div className="w-24">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Top Navbar */}
        <TopNavbar />

        {/* Dashboard Content */}
        <DashboardContent activeSection={activeSection} />

        {/* Customers */}
        {activeSection === "patients" && (
          <div className="mt-6">
            <CustomerList />
          </div>
        )}
      </div>
    </div>
  );
}