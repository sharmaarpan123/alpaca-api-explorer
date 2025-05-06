
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoading } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-md bg-gray-300 h-12 w-48 mb-4"></div>
          <div className="text-gray-500">Loading application...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="api-explorer-layout">
      <div className="api-explorer-header">
        <Header toggleSidebar={toggleSidebar} />
      </div>
      <Sidebar isOpen={sidebarOpen} />
      <main className="api-explorer-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
