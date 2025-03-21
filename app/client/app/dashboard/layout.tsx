"use client";
import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar - Drawer for small screens, Static for large screens */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform md:relative md:translate-x-0 md:w-1/5`}>
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Header with Hamburger Button */}
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Content */}
        <main className="p-4 flex-1 bg-gray-100 overflow-y-auto">{children}</main>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
}
