
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ApiReference: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">API Reference</h1>
        
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded">POST</span>
                  <CardTitle className="ml-3 text-lg">/auth/login</CardTitle>
                </div>
                <CardDescription>Authenticate and retrieve access token</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Log in with your credentials to receive an access token for API requests.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/api/auth/login">
                  <Button variant="outline" size="sm">Try it</Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded">POST</span>
                  <CardTitle className="ml-3 text-lg">/auth/refresh</CardTitle>
                </div>
                <CardDescription>Refresh expired access token</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Refresh an expired access token using your refresh token.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/api/auth/refresh">
                  <Button variant="outline" size="sm">Try it</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Assets</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">GET</span>
                  <CardTitle className="ml-3 text-lg">/v2/assets</CardTitle>
                </div>
                <CardDescription>Get a list of all assets</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Retrieve a list of assets available for trading.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/api/assets/list-assets">
                  <Button variant="outline" size="sm">Try it</Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">GET</span>
                  <CardTitle className="ml-3 text-lg">/v2/assets/{"{symbol}"}</CardTitle>
                </div>
                <CardDescription>Get a specific asset by symbol</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Retrieve detailed information about a specific asset.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/api/assets/get-asset">
                  <Button variant="outline" size="sm">Try it</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Orders</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded">POST</span>
                  <CardTitle className="ml-3 text-lg">/v2/orders</CardTitle>
                </div>
                <CardDescription>Create a new order</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Submit a new order for an asset.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/api/orders/create-order">
                  <Button variant="outline" size="sm">Try it</Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">GET</span>
                  <CardTitle className="ml-3 text-lg">/v2/orders</CardTitle>
                </div>
                <CardDescription>List all orders</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Get a list of your orders with filtering options.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/api/orders/get-orders">
                  <Button variant="outline" size="sm">Try it</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApiReference;
