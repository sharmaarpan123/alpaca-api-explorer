
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';

interface ParamField {
  type: string;
  description: string;
}

interface ParamsObject {
  [key: string]: ParamField;
}

interface ApiEndpointProps {
  title: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  description: string;
  requiresAuth?: boolean;
  requestBody?: Record<string, any>;
  queryParams?: ParamsObject;
  pathParams?: ParamsObject;
  children?: React.ReactNode;
}

const ApiEndpoint: React.FC<ApiEndpointProps> = ({
  title,
  method,
  endpoint,
  description,
  requiresAuth = true,
  requestBody,
  queryParams,
  pathParams,
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
  const [paramValues, setParamValues] = useState<Record<string, string>>({});

  const handleParamChange = (key: string, value: string) => {
    setParamValues(prev => ({ ...prev, [key]: value }));
  };

  const constructEndpointUrl = () => {
    let url = `https://paper-api.alpaca.markets${endpoint}`;
    
    // Replace path parameters
    if (pathParams) {
      Object.keys(pathParams).forEach(param => {
        const value = paramValues[param] || `{${param}}`;
        url = url.replace(`{${param}}`, value);
      });
    }
    
    // Add query parameters
    if (queryParams && Object.keys(paramValues).length > 0) {
      const queryString = Object.keys(queryParams)
        .filter(key => paramValues[key])
        .map(key => `${key}=${encodeURIComponent(paramValues[key])}`)
        .join('&');
      
      if (queryString) {
        url = `${url}?${queryString}`;
      }
    }
    
    return url;
  };

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
              { id: 'AAPL', name: 'Apple Inc', exchange: 'NASDAQ', status: 'active', tradable: true, marginable: true, shortable: true, easy_to_borrow: true },
              { id: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', status: 'active', tradable: true, marginable: true, shortable: true, easy_to_borrow: true }
            ]
          } : {}),
          ...(endpoint.includes('orders') ? {
            orders: [
              { id: 'ord_123', symbol: 'AAPL', side: 'buy', qty: 10, type: 'market', time_in_force: 'day', status: 'filled' },
              { id: 'ord_456', symbol: 'MSFT', side: 'sell', qty: 5, type: 'limit', time_in_force: 'gtc', status: 'open' }
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard.",
    });
  };

  const renderCurlCommand = () => {
    const baseUrl = constructEndpointUrl();
    let command = `curl --request ${method} \\\n`;
    command += `  --url '${baseUrl}' \\\n`;
    command += `  --header 'accept: application/json'`;
    
    if (requiresAuth) {
      command += ` \\\n  --header 'Authorization: Bearer ${token || '[YOUR_TOKEN]'}'`;
    }
    
    if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && requestBody) {
      command += ` \\\n  --header 'Content-Type: application/json' \\\n`;
      command += `  --data '${requestPayload}'`;
    }
    
    return command;
  };

  return (
    <div className="mb-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <div className="flex items-center">
          <span className={`${getMethodColor(method)} text-xs font-medium px-2.5 py-1 rounded`}>
            {method}
          </span>
          <h2 className="text-lg font-medium ml-3">{endpoint}</h2>
        </div>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <Tabs defaultValue="documentation" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
              <TabsTrigger value="request">Request</TabsTrigger>
              <TabsTrigger value="response">Response</TabsTrigger>
            </TabsList>
            
            <TabsContent value="documentation">
              <Card>
                <CardHeader>
                  <CardTitle>API Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {children || (
                    <div className="text-gray-600">
                      <p className="mb-4">This endpoint allows you to interact with {title.toLowerCase()}.</p>
                      
                      {requiresAuth && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-1">Authentication</h4>
                          <p>This endpoint requires authentication. Include your bearer token in the request header.</p>
                        </div>
                      )}
                      
                      {pathParams && Object.keys(pathParams).length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Path Parameters</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {Object.entries(pathParams).map(([key, param]) => (
                                  <tr key={key}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{param.type}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{param.description}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      
                      {queryParams && Object.keys(queryParams).length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Query Parameters</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {Object.entries(queryParams).map(([key, param]) => (
                                  <tr key={key}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{param.type}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{param.description}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      
                      {requestBody && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Request Body</h4>
                          <pre className="bg-gray-50 p-4 rounded-md text-sm overflow-auto">
                            {JSON.stringify(requestBody, null, 2)}
                          </pre>
                        </div>
                      )}
                      
                      <div className="mt-6">
                        <h4 className="font-semibold mb-2">Response</h4>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded">200</span>
                          <span>An array of asset objects</span>
                        </div>
                      </div>
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
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">URL</h4>
                    <div className="flex items-center bg-gray-50 p-3 rounded-md">
                      <span className="text-sm font-mono flex-1 break-all">{constructEndpointUrl()}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(constructEndpointUrl())}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {pathParams && Object.keys(pathParams).length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Path Parameters</h4>
                      <div className="space-y-3">
                        {Object.entries(pathParams).map(([key, param]) => (
                          <div key={key} className="grid grid-cols-1 gap-2">
                            <label className="text-sm font-medium">{key} <span className="text-xs text-gray-500">({param.type})</span></label>
                            <Input 
                              placeholder={param.description} 
                              value={paramValues[key] || ''}
                              onChange={(e) => handleParamChange(key, e.target.value)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {queryParams && Object.keys(queryParams).length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Query Parameters</h4>
                      <div className="space-y-3">
                        {Object.entries(queryParams).map(([key, param]) => (
                          <div key={key} className="grid grid-cols-1 gap-2">
                            <label className="text-sm font-medium">{key} <span className="text-xs text-gray-500">({param.type})</span></label>
                            <Input 
                              placeholder={param.description} 
                              value={paramValues[key] || ''}
                              onChange={(e) => handleParamChange(key, e.target.value)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Headers</h4>
                    <pre className="bg-gray-50 p-4 rounded-md text-sm overflow-auto">
                      {JSON.stringify({
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        ...(requiresAuth ? {'Authorization': `Bearer ${token || '[YOUR_TOKEN]'}`} : {})
                      }, null, 2)}
                    </pre>
                  </div>
                  
                  {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Request Body</h4>
                      <textarea
                        className="w-full h-40 font-mono text-sm p-4 border rounded-md bg-gray-50"
                        value={requestPayload}
                        onChange={(e) => setRequestPayload(e.target.value)}
                      />
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">cURL</h4>
                    <div className="relative">
                      <pre className="bg-gray-900 text-white p-4 rounded-md text-sm overflow-auto">
                        {renderCurlCommand()}
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute top-2 right-2 text-white bg-gray-800 hover:bg-gray-700"
                        onClick={() => copyToClipboard(renderCurlCommand())}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <Button onClick={handleApiCall} disabled={isLoading} className="w-full">
                    {isLoading ? 'Sending...' : 'Try It!'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="response">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Response</span>
                    {response && (
                      <div className="flex items-center">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded mr-2">
                          200
                        </span>
                        <span className="text-sm text-gray-500">application/json</span>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center items-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : error ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                      <p className="font-medium">Error</p>
                      <p>{error}</p>
                    </div>
                  ) : response ? (
                    <div className="relative">
                      <pre className="bg-gray-50 p-4 rounded-md text-sm overflow-auto">
                        {JSON.stringify(response, null, 2)}
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-gray-500 p-8 text-center border rounded-md bg-gray-50">
                      <p className="mb-2">Click "Try It!" to send a request</p>
                      <p className="text-sm">Or choose an example from the dropdown</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Credentials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1">API Key ID</label>
                  <Input type="text" placeholder="APCA-API-KEY-ID" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">API Secret Key</label>
                  <Input type="password" placeholder="APCA-API-SECRET-KEY" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Language</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" className="justify-start">Shell</Button>
                <Button variant="outline" size="sm" className="justify-start">Node</Button>
                <Button variant="outline" size="sm" className="justify-start">Ruby</Button>
                <Button variant="outline" size="sm" className="justify-start">Python</Button>
                <Button variant="outline" size="sm" className="justify-start">PHP</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApiEndpoint;
