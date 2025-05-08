
import React from 'react';

interface BaseUrlCardProps {
  baseUrl?: string;
}

const BaseUrlCard: React.FC<BaseUrlCardProps> = ({ baseUrl = "https://api.deviden.com" }) => {
  return (
    <div className="bg-gray-900 text-gray-200 border-gray-800 shadow-sm rounded-md">
      <div className="py-2 px-3 border-b border-gray-800">
        <h3 className="text-gray-200 text-sm font-medium">URL</h3>
      </div>
      <div className="py-2 px-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Base URL</span>
            <span className="text-xs text-gray-300 font-mono overflow-hidden overflow-ellipsis">{baseUrl}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseUrlCard;
