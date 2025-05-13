import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { API_STRUCTURE } from '@/data/apiEndpoints';

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
