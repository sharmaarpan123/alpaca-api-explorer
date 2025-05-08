
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      <div className="container mx-auto max-w-4xl py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6 text-deviden-darkblue">API Explorer</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            An interactive platform to explore and test API endpoints.
            {isAuthenticated ? ' Start exploring!' : ' Sign in to get started.'}
          </p>
          
          {!isAuthenticated && (
            <div className="mt-6">
              <Link to="/login">
                <Button className="mr-4">Sign In</Button>
              </Link>
              
            </div>
          )}
        </section>
        
        {isAuthenticated && (
          <section className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Welcome back, </h2>
            <p className="text-gray-600 mb-4">
              You're now logged in and can access all API endpoints. Your session will expire in 4 days, but we'll automatically refresh it for you.
            </p>
            <Link to="/api-reference">
              <Button>Explore API Endpoints</Button>
            </Link>
          </section>
        )}
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Assets</h3>
            <p className="text-gray-600 mb-4">Explore and retrieve asset information with full details.</p>
            <Link to="/api/assets/list-assets" className="text-deviden-blue hover:underline text-sm">
              View Assets Endpoints →
            </Link>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Orders</h3>
            <p className="text-gray-600 mb-4">Manage orders with create, read, and cancel operations.</p>
            <Link to="/api/orders/create-order" className="text-deviden-blue hover:underline text-sm">
              View Orders Endpoints →
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
