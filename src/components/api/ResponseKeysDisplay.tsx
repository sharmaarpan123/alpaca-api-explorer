
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ResponseKey {
  status: string;
  description: string;
  example: any;
}

interface ResponseKeysDisplayProps {
  responseKeys: ResponseKey[];
}

const ResponseKeysDisplay: React.FC<ResponseKeysDisplayProps> = ({ responseKeys }) => {
  return (
    <Card className="shadow-sm border-gray-200">
      <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
        <h3 className="font-medium text-sm">RESPONSES</h3>
      </div>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-200">
          {responseKeys.map((key, index) => (
            <div key={index} className="p-3 hover:bg-gray-50">
              <div className="flex items-center mb-1">
                <div className={`w-14 text-center rounded-full px-2 text-xs font-medium ${
                  key.status.startsWith('2') ? 'bg-green-100 text-green-800' : 
                  key.status.startsWith('4') ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {key.status}
                </div>
                <div className="ml-2 text-sm">{key.description}</div>
              </div>
              {key.example && (
                <div className="mt-2 text-xs font-mono bg-gray-100 p-2 rounded">
                  {JSON.stringify(key.example, null, 2)}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponseKeysDisplay;
