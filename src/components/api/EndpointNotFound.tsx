
import React from 'react';
import { Card } from '@/components/ui/card';

const EndpointNotFound: React.FC = () => {
  return (
    <Card className="p-3 text-center">
      <h2 className="text-lg font-semibold mb-1">Endpoint Not Found</h2>
      <p className="text-gray-600 text-sm">The API endpoint you're looking for doesn't exist.</p>
    </Card>
  );
};

export default EndpointNotFound;
