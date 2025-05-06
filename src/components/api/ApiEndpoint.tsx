
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface ApiEndpointProps {
  title: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  description: string;
  requiresAuth?: boolean;
  requestBody?: Record<string, any>;
  children?: React.ReactNode;
}

const ApiEndpoint: React.FC<ApiEndpointProps> = ({
  title,
  method,
  endpoint,
  description,
  requiresAuth = true,
  requestBody,
  children
}) => {
  const { isAuthenticated, token } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('documentation');
  const [requestPayload, setRequestPayload] = useState<string>(
    requestBody ? JSON.stringify(requestBody, null, 2) : '{}'
  );

  const handleApiCall = async () => {
    if (requiresAuth && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this endpoint",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      // In a real app, this would call your actual API
      // For now, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate successful response
      const mockResponse = {
        success: true,
        timestamp: new Date().toISOString(),
        data: {
          message: `${method} request to ${endpoint} was successful`,
          endpoint: endpoint,
          // Additional mock data based on endpoint
          ...(endpoint.includes('assets') ? {
            assets: [
              { id: 'AAPL', name: 'Apple Inc', exchange: 'NASDAQ' },
              { id: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ' }
            ]
          } : {}),
          ...(endpoint.includes('orders') ? {
            orders: [
              { id: 'ord_123', symbol: 'AAPL', side: 'buy', qty: 10 },
              { id: 'ord_456', symbol: 'MSFT', side: 'sell', qty: 5 }
            ]
          } : {})
        }
      };

      setResponse(mockResponse);
      setActiveTab('response');
    } catch (err) {
      console.error('API call error:', err);
      setError('An error occurred while making the API request');
    } finally {
      setIsLoading(false);
    }
  };

  const getMethodColor = (method: string) => {
    const colors = {
      'GET': 'bg-blue-100 text-blue-800',
      'POST': 'bg-green-100 text-green-800',
      'PUT': 'bg-yellow-100 text-yellow-800',
      'PATCH': 'bg-purple-100 text-purple-800',
      'DELETE': 'bg-red-100 text-red-800'
    };
    return colors[method as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="mb-10">
      <div className="mb-4">
        <div className="flex items-center">
          <span className={`${getMethodColor(method)} text-xs font-medium px-2.5 py-1 rounded`}>
            {method}
          </span>
          <h2 className="text-xl font-bold ml-3">{endpoint}</h2>
        </div>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>

      <Tabs defaultValue="documentation" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="request">Request</TabsTrigger>
          <TabsTrigger value="response">Response</TabsTrigger>
        </TabsList>
        
        <TabsContent value="documentation">
          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              {children || (
                <div className="text-gray-600">
                  <p>This endpoint allows you to interact with {title.toLowerCase()}.</p>
                  {requiresAuth && (
                    <div className="mt-4">
                      <h4 className="font-semibold">Authentication</h4>
                      <p>This endpoint requires authentication. Include your bearer token in the request header.</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="request">
          <Card>
            <CardHeader>
              <CardTitle>Request Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Headers</h4>
                <pre className="bg-gray-50 p-4 rounded-md text-sm overflow-auto">
                  {JSON.stringify({
                    'Content-Type': 'application/json',
                    ...(requiresAuth ? {'Authorization': `Bearer ${token || '[YOUR_TOKEN]'}`} : {})
                  }, null, 2)}
                </pre>
              </div>
              
              {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Request Body</h4>
                  <textarea
                    className="w-full h-40 font-mono text-sm p-4 border rounded-md bg-gray-50"
                    value={requestPayload}
                    onChange={(e) => setRequestPayload(e.target.value)}
                  />
                </div>
              )}
              
              <Button onClick={handleApiCall} disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Request'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="response">
          <Card>
            <CardHeader>
              <CardTitle>Response</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-deviden-blue"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                  <p className="font-medium">Error</p>
                  <p>{error}</p>
                </div>
              ) : response ? (
                <pre className="bg-gray-50 p-4 rounded-md text-sm overflow-auto">
                  {JSON.stringify(response, null, 2)}
                </pre>
              ) : (
                <div className="text-gray-500 p-4 text-center border rounded-md bg-gray-50">
                  Send a request to see the response here
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiEndpoint;
