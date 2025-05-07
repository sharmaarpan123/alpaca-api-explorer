
import React from 'react';
import { Card } from '@/components/ui/card';

const EndpointNotFound: React.FC = () => {
  return (
    <Card className="p-4 text-center">
      <h2 className="text-xl font-semibold mb-2">Endpoint Not Found</h2>
      <p className="text-gray-600">The API endpoint you're looking for doesn't exist.</p>
    </Card>
  );
};

export default EndpointNotFound;
