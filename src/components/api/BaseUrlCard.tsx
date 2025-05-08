
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BaseUrlCardProps {
  baseUrl?: string;
}

const BaseUrlCard: React.FC<BaseUrlCardProps> = ({ baseUrl = "https://api.deviden.com" }) => {
  return (
    <Card className="bg-gray-900 text-gray-200 border-gray-800 shadow-sm">
      <CardHeader className="py-2 px-3">
        <CardTitle className="text-gray-200 text-sm">URL</CardTitle>
      </CardHeader>
      <CardContent className="py-2 px-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Base URL</span>
            <span className="text-xs text-gray-300 font-mono overflow-hidden overflow-ellipsis">{baseUrl}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BaseUrlCard;
