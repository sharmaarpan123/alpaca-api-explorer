import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Define types for API endpoints
interface ApiEndpoint {
  id: string;
  name: string;
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  description?: string;
}

interface ApiGroup {
  id: string;
  name: string;
  endpoints: ApiEndpoint[];
}

// Mock API structure based on example API explorer
const API_STRUCTURE: ApiGroup[] = [
  {
    id: "users",
    name: "Users",
    endpoints: [
      {
        id: "clock",
        name: "Clock",
        path: "/api/v1/user/clock",
        method: "POST",
        description: "Get server time information",
      },
      {
        id: "get-account-number",
        name: "Get Account Number",
        path: "/api/v1/user/get-account-number",
        method: "POST",
        description: "Get user account number",
      },
      {
        id: "get-accounts",
        name: "Get Accounts",
        path: "/api/v1/user/account",
        method: "POST",
        description: "Get user account details",
      },
    ],
  },
  {
    id: "stocks",
    name: "Stocks",
    endpoints: [
      {
        id: "assets",
        name: "Assets",
        path: "/api/v1/stock/assets",
        method: "POST",
        description: "Get list of available assets",
      },
      {
        id: "assets-details",
        name: "Assets Details",
        path: "/api/v1/stock/assetsDetails",
        method: "POST",
        description: "Get detailed information about a specific asset",
      },
      {
        id: "quotes-latest",
        name: "Quotes Latest",
        path: "/api/v1/stock/quotes/latest",
        method: "POST",
        description: "Get latest quotes for assets",
      },
      {
        id: "quotes-history",
        name: "Quotes History",
        path: "/api/v1/stock/quotes",
        method: "POST",
        description: "Get historical quotes for an asset",
      },
      {
        id: "bars-info",
        name: "Bars Info",
        path: "/api/v1/stock/bars",
        method: "POST",
        description: "Get bar data for an asset",
      },
      {
        id: "bars-latest",
        name: "Bars Latest",
        path: "/api/v1/stock/bars/latest",
        method: "POST",
        description: "Get latest bar data for an asset",
      },
    ],
  },
  {
    id: "orders",
    name: "Orders",
    endpoints: [
      {
        id: "order-buy",
        name: "Order Buy",
        path: "/api/v1/order/orders",
        method: "POST",
        description: "Place a buy order",
      },
      {
        id: "pending-order-list",
        name: "Pending Order List",
        path: "/api/v1/order/lists",
        method: "POST",
        description: "Get list of pending orders",
      },
      {
        id: "delete-all-pending-orders",
        name: "Delete All Pending Orders",
        path: "/api/v1/order/deleteAllOrders",
        method: "POST",
        description: "Delete all pending orders",
      },
      {
        id: "order-details",
        name: "Order Details",
        path: "/api/v1/order/orderDetails",
        method: "POST",
        description: "Get details of a specific order",
      },
      {
        id: "delete-pending-order",
        name: "Delete Pending Order",
        path: "/api/v1/order/deleteOrder",
        method: "POST",
        description: "Delete a specific pending order",
      },
      {
        id: "replace-orders",
        name: "Replace Orders",
        path: "/api/v1/order/replaceOrder",
        method: "POST",
        description: "Replace an existing order",
      },
      {
        id: "open-position",
        name: "Open Position",
        path: "/api/v1/order/positions",
        method: "POST",
        description: "Get list of open positions",
      },
      {
        id: "open-position-symbol",
        name: "Open Position by Symbol",
        path: "/api/v1/order/positionsSymbolOrAsset",
        method: "POST",
        description: "Get open position for a specific symbol",
      },
      {
        id: "close-all-position",
        name: "Close All Position",
        path: "/api/v1/order/closeAllPosition",
        method: "POST",
        description: "Close all open positions",
      },
      {
        id: "close-position-symbol",
        name: "Close Position by Symbol",
        path: "/api/v1/order/closePositionSymbolOrAssets",
        method: "POST",
        description: "Close position for a specific symbol",
      },
      {
        id: "order-history",
        name: "Order History",
        path: "/api/v1/order/portfolio/history",
        method: "POST",
        description: "Get order history",
      },
      {
        id: "account-activities",
        name: "Account Activities",
        path: "/api/v1/order/account/activities",
        method: "POST",
        description: "Get account activities",
      },
      {
        id: "account-activities-type",
        name: "Account Activities Type",
        path: "/api/v1/order/account/activitiesType",
        method: "POST",
        description: "Get account activities by type",
      },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {
      assets: true, // Auto expand assets section for example
    }
  );

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const isActive = (category: string, endpoint: string) => {
    return location.pathname === `/api/${category}/${endpoint}`;
  };

  return (
    <aside
      className={cn(
        "w-72 bg-gray-900 text-gray-200 overflow-y-auto transition-all",
        isOpen ? "block" : "hidden md:block"
      )}
    >
      <nav className="p-4">
        <div className="mb-8">
          <div className="text-sm text-gray-400 uppercase font-medium px-4 py-2">
            API Reference
          </div>
          <div className="space-y-1">
            {API_STRUCTURE.map((group) => (
              <div key={group.id} className="mb-1">
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex justify-between items-center px-4 py-2 text-left text-sm font-medium text-gray-300 rounded-md hover:bg-gray-800"
                >
                  <span>{group.name}</span>
                  {expandedGroups[group.id] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>

                {expandedGroups[group.id] && (
                  <div className="mt-1 space-y-1">
                    {group.endpoints.map((endpoint) => (
                      <Link
                        key={endpoint.id}
                        to={`/api/${group.id}/${endpoint.id}`}
                        className={cn(
                          "block pl-6 pr-4 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white rounded-md",
                          isActive(group.id, endpoint.id) &&
                            "bg-gray-800 text-white"
                        )}
                      >
                        <div className="flex items-center">
                          <span
                            className={cn(
                              "inline-block w-16 text-xs font-medium rounded px-2 py-1 mr-2 text-center",
                              endpoint.method === "GET" &&
                                "bg-blue-900 text-blue-300",
                              endpoint.method === "POST" &&
                                "bg-green-900 text-green-300",
                              endpoint.method === "PUT" &&
                                "bg-yellow-900 text-yellow-300",
                              endpoint.method === "PATCH" &&
                                "bg-purple-900 text-purple-300",
                              endpoint.method === "DELETE" &&
                                "bg-red-900 text-red-300"
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
