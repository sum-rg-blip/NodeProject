import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardContent from "../components/DashboardContent";
import CustomerList from "./Customers";

export default function DashboardPage() {
  // State controlling which section to show
  const [activeSection, setActiveSection] = useState("dashboard"); // default "dashboard"

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-24 bg-gray-800">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Dashboard Content (Books etc.) */}
        <DashboardContent activeSection={activeSection} />

        {/* Show CustomerList only if "patients" icon clicked */}
        {activeSection === "patients" && (
          <div className="mt-6">
            <CustomerList />
          </div>
        )}
      </div>
    </div>
  );
}
