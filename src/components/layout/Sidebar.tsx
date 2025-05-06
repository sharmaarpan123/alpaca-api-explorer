
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define types for API endpoints
interface ApiEndpoint {
  id: string;
  name: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description?: string;
}

interface ApiGroup {
  id: string;
  name: string;
  endpoints: ApiEndpoint[];
}

// Mock API structure based on typical API explorer
const API_STRUCTURE: ApiGroup[] = [
  {
    id: 'auth',
    name: 'Authentication',
    endpoints: [
      { 
        id: 'login', 
        name: 'Login', 
        path: '/auth/login', 
        method: 'POST',
        description: 'Authenticate and get access token'
      },
      { 
        id: 'refresh', 
        name: 'Refresh Token', 
        path: '/auth/refresh', 
        method: 'POST',
        description: 'Refresh access token'
      },
      { 
        id: 'logout', 
        name: 'Logout', 
        path: '/auth/logout', 
        method: 'POST',
        description: 'Invalidate tokens'
      },
    ]
  },
  {
    id: 'assets',
    name: 'Assets',
    endpoints: [
      { 
        id: 'list-assets', 
        name: 'List Assets', 
        path: '/v2/assets', 
        method: 'GET',
        description: 'Get a list of all assets'
      },
      { 
        id: 'get-asset', 
        name: 'Get Asset', 
        path: '/v2/assets/{symbol}', 
        method: 'GET',
        description: 'Get an asset by symbol'
      }
    ]
  },
  {
    id: 'orders',
    name: 'Orders',
    endpoints: [
      { 
        id: 'create-order', 
        name: 'Create Order', 
        path: '/v2/orders', 
        method: 'POST',
        description: 'Submit a new order'
      },
      { 
        id: 'get-orders', 
        name: 'List Orders', 
        path: '/v2/orders', 
        method: 'GET',
        description: 'Get a list of orders'
      },
      { 
        id: 'get-order', 
        name: 'Get Order', 
        path: '/v2/orders/{order_id}', 
        method: 'GET',
        description: 'Get an order by ID'
      },
      { 
        id: 'delete-order', 
        name: 'Cancel Order', 
        path: '/v2/orders/{order_id}', 
        method: 'DELETE',
        description: 'Cancel an open order'
      }
    ]
  }
];

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    auth: true, // Auto expand auth section for example
  });

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  return (
    <aside className={cn(
      "api-explorer-sidebar bg-white border-r border-gray-200 h-full",
      isOpen ? "open" : ""
    )}>
      <nav className="px-4 py-5">
        <div className="mb-8">
          <div className="text-sm text-gray-500 uppercase font-medium mb-2">API Reference</div>
          <div className="space-y-1">
            {API_STRUCTURE.map(group => (
              <div key={group.id} className="mb-2">
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex justify-between items-center px-2 py-2 text-left text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900"
                >
                  <span>{group.name}</span>
                  {expandedGroups[group.id] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                {expandedGroups[group.id] && (
                  <div className="ml-4 mt-1 space-y-1">
                    {group.endpoints.map(endpoint => (
                      <Link
                        key={endpoint.id}
                        to={`/api/${group.id}/${endpoint.id}`}
                        className="block pl-4 pr-2 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                      >
                        <div className="flex items-center">
                          <span className={cn(
                            "inline-block w-16 text-xs font-medium rounded px-2 py-1 mr-2",
                            endpoint.method === 'GET' && 'bg-blue-100 text-blue-800',
                            endpoint.method === 'POST' && 'bg-green-100 text-green-800',
                            endpoint.method === 'PUT' && 'bg-yellow-100 text-yellow-800',
                            endpoint.method === 'PATCH' && 'bg-purple-100 text-purple-800',
                            endpoint.method === 'DELETE' && 'bg-red-100 text-red-800',
                          )}
                          >
                            {endpoint.method}
                          </span>
                          <span>{endpoint.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
