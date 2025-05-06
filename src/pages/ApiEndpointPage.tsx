
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ApiEndpoint from '@/components/api/ApiEndpoint';
import { Card } from '@/components/ui/card';

// Mock API data - in a real app, this would come from your API documentation
const API_ENDPOINTS = {
  // Auth endpoints
  'auth/login': {
    title: 'Login',
    method: 'POST',
    path: '/auth/login',
    description: 'Authenticate and get access token',
    requiresAuth: false,
    requestBody: {
      email: 'user@example.com',
      password: 'yourpassword'
    }
  },
  'auth/refresh': {
    title: 'Refresh Token',
    method: 'POST',
    path: '/auth/refresh',
    description: 'Refresh access token',
    requiresAuth: false,
    requestBody: {
      refreshToken: 'your-refresh-token'
    }
  },
  'auth/logout': {
    title: 'Logout',
    method: 'POST',
    path: '/auth/logout',
    description: 'Invalidate tokens',
    requiresAuth: true,
    requestBody: {}
  },
  
  // Assets endpoints
  'assets/list-assets': {
    title: 'List Assets',
    method: 'GET',
    path: '/v2/assets',
    description: 'Get a list of all assets',
    requiresAuth: true
  },
  'assets/get-asset': {
    title: 'Get Asset',
    method: 'GET',
    path: '/v2/assets/{symbol}',
    description: 'Get an asset by symbol',
    requiresAuth: true
  },
  
  // Orders endpoints
  'orders/create-order': {
    title: 'Create Order',
    method: 'POST',
    path: '/v2/orders',
    description: 'Submit a new order',
    requiresAuth: true,
    requestBody: {
      symbol: 'AAPL',
      qty: 10,
      side: 'buy',
      type: 'market',
      time_in_force: 'day'
    }
  },
  'orders/get-orders': {
    title: 'List Orders',
    method: 'GET',
    path: '/v2/orders',
    description: 'Get a list of orders',
    requiresAuth: true
  },
  'orders/get-order': {
    title: 'Get Order',
    method: 'GET',
    path: '/v2/orders/{order_id}',
    description: 'Get an order by ID',
    requiresAuth: true
  },
  'orders/delete-order': {
    title: 'Cancel Order',
    method: 'DELETE',
    path: '/v2/orders/{order_id}',
    description: 'Cancel an open order',
    requiresAuth: true
  }
};

const ApiEndpointPage: React.FC = () => {
  const { category, endpoint } = useParams<{ category: string; endpoint: string }>();
  const endpointKey = category && endpoint ? `${category}/${endpoint}` : '';
  const apiData = API_ENDPOINTS[endpointKey as keyof typeof API_ENDPOINTS];
  
  if (!apiData) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Endpoint Not Found</h2>
            <p className="text-gray-600">The API endpoint you're looking for doesn't exist.</p>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <ApiEndpoint
          title={apiData.title}
          method={apiData.method as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'}
          endpoint={apiData.path}
          description={apiData.description}
          requiresAuth={apiData.requiresAuth}
          requestBody={apiData.requestBody}
        />
      </div>
    </Layout>
  );
};

export default ApiEndpointPage;
