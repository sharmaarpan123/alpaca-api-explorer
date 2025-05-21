
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Menu, User, Search } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white border-b border-gray-800">
      <div className="max-w-full mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="/deviden-logo.png"
                alt="DevideN"
              />
              <span className="ml-3 text-xl font-semibold text-white">API Explorer</span>
            </Link>
            
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                <Link 
                  to="/" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Home
                </Link>
                {/* <Link 
                  to="/api-reference" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  API Reference
                </Link> */}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            
            
            <div className="hidden md:block">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-gray-700 text-white flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                    {/* <span className="ml-2 text-gray-300">{user?.name || user?.email}</span> */}
                  </button>
                  
                  {isMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Link to="/login">
                    <Button variant="outline" className="mr-2 text-gray-300 border-gray-700 bg-gray-800 hover:bg-gray-700">Sign in</Button>
                  </Link>
                </div>
              )}
            </div>
            
            <div className="md:hidden flex items-center">
              {isAuthenticated ? (
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center p-2"
                >
                  <div className="h-8 w-8 rounded-full bg-gray-700 text-white flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                </button>
              ) : (
                <Link to="/login">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Sign in</Button>
                </Link>
              )}
              
              {isMenuOpen && (
                <div className="origin-top-right absolute right-2 top-14 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <Link 
                    to="/" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/api-reference" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    API Reference
                  </Link>
                  {isAuthenticated && (
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
