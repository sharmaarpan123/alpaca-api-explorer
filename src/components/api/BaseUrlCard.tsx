
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BaseUrlCard: React.FC = () => {
  return (
    <Card className="bg-gray-900 text-gray-200 border-gray-800 shadow-sm">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-gray-200 text-base">URL</CardTitle>
      </CardHeader>
      <CardContent className="py-2 px-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-gray-400">Base URL</span>
          <span className="text-xs font-mono text-gray-300 break-all">https://paper-api.alpaca.markets</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BaseUrlCard;
