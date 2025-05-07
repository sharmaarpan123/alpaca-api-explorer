
import React from 'react';

interface HeadersDisplayProps {
  requiresAuth: boolean;
  token?: string;
  apiKeyId?: string;
}

const HeadersDisplay: React.FC<HeadersDisplayProps> = ({
  requiresAuth,
  token,
  apiKeyId
}) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(requiresAuth ? {'Authorization': `Bearer ${token || apiKeyId || '[YOUR_TOKEN]'}`} : {})
  };

  return (
    <div>
      <h4 className="font-semibold mb-2">Headers</h4>
      <pre className="bg-gray-50 p-2 rounded-md text-xs overflow-auto">
        {JSON.stringify(headers, null, 2)}
      </pre>
    </div>
  );
};

export default HeadersDisplay;
