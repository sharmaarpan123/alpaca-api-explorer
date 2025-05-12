import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { Link } from 'react-router-dom';

// Map HTTP methods to color classes
const methodStyles: Record<string, string> = {
  GET: 'bg-blue-100 text-blue-800',
  POST: 'bg-green-100 text-green-800',
};

// Reusable API Card component
const ApiCard: React.FC<{
  method: string;
  path: string;
  title: string;
  description: string;
  link: string;
}> = ({ method, path, title, description, link }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center mb-2">
        <span className={`${methodStyles[method] || ''} text-xs font-medium px-2.5 py-1 rounded`}>{method}</span>
        <CardTitle className="ml-3 text-lg">{path}</CardTitle>
      </div>
      <CardDescription>{title}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-600">{description}</p>
    </CardContent>
    <CardFooter>
      <Link to={link}>
        <Button variant="outline" size="sm">Try it</Button>
      </Link>
    </CardFooter>
  </Card>
);

// API Reference Data
const apiSections = [
  
  {
    title: 'Assets',
    apis: [
      {
        method: 'GET',
        path: '/v2/assets',
        title: 'Get a list of all assets',
        description: 'Retrieve a list of assets available for trading.',
        link: '/api/assets/list-assets',
      },
      {
        method: 'GET',
        path: '/v2/assets/{symbol}',
        title: 'Get a specific asset by symbol',
        description: 'Retrieve detailed information about a specific asset.',
        link: '/api/assets/get-asset',
      },
    ],
  },
  {
    title: 'Orders',
    apis: [
      {
        method: 'POST',
        path: '/v2/orders',
        title: 'Create a new order',
        description: 'Submit a new order for an asset.',
        link: '/api/orders/create-order',
      },
      {
        method: 'GET',
        path: '/v2/orders',
        title: 'List all orders',
        description: 'Get a list of your orders with filtering options.',
        link: '/api/orders/get-orders',
      },
    ],
  },
];

const ApiReference: React.FC = () => {
  return (
   
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">API Reference</h1>
        {apiSections.map((section) => (
          <div className="mb-10" key={section.title}>
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {section.apis.map((api) => (
                <ApiCard key={api.path} {...api} />
              ))}
            </div>
          </div>
        ))}
      </div>
   
  );
};

export default ApiReference;
