
import React from 'react';
import { CardHeader, CardContent, CardTitle } from '@/components/ui/card';

interface ResponseKey {
  status: string;
  description: string;
  example: any;
}

interface ResponseKeysDisplayProps {
  responseKeys: ResponseKey[];
}

const ResponseKeysDisplay: React.FC<ResponseKeysDisplayProps> = ({ responseKeys }) => {
  const formatJson = (json: any) => {
    if (!json) return 'null';
    return JSON.stringify(json, null, 2);
  };

  return (
    <>
      <CardHeader className="py-3 px-4 border-b border-gray-200">
        <CardTitle className="text-sm font-medium">Response Format</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {responseKeys.map((key, index) => (
            <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
              <div className={`px-3 py-2 ${key.status.startsWith('2') ? 'bg-green-50' : 'bg-red-50'} border-b border-gray-200`}>
                <span className={`text-xs font-medium ${key.status.startsWith('2') ? 'text-green-700' : 'text-red-700'}`}>
                  {key.status} - {key.description}
                </span>
              </div>
              <pre className="text-xs p-3 overflow-x-auto bg-gray-50 m-0">
                {formatJson(key.example)}
              </pre>
            </div>
          ))}
        </div>
      </CardContent>
    </>
  );
};

export default ResponseKeysDisplay;
