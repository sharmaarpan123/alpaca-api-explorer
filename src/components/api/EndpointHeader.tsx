
import React from 'react';

interface EndpointHeaderProps {
  title: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  description: string;
}

const EndpointHeader: React.FC<EndpointHeaderProps> = ({
  title,
  method,
  endpoint,
  description
}) => {
  const getMethodColor = (method: string) => {
    const colors = {
      'GET': 'bg-blue-100 text-blue-800',
      'POST': 'bg-green-100 text-green-800',
      'PUT': 'bg-yellow-100 text-yellow-800',
      'PATCH': 'bg-purple-100 text-purple-800',
      'DELETE': 'bg-red-100 text-red-800'
    };
    return colors[method as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold mb-1">{title}</h1>
      <div className="flex items-center">
        <span className={`${getMethodColor(method)} text-xs font-medium px-2 py-0.5 rounded`}>
          {method}
        </span>
        <h2 className="text-base font-medium ml-2">{endpoint}</h2>
      </div>
      <p className="text-gray-600 mt-1 text-sm">{description}</p>
    </div>
  );
};

export default EndpointHeader;
