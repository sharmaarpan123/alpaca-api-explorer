
import { useAuth } from "@/contexts/AuthContext";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoading } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-md bg-gray-300 h-10 w-40 mb-3"></div>
          <div className="text-gray-500 text-sm">Loading application...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
