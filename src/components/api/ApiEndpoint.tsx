import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';
import CodeSnippet, { ProgrammingLanguage } from './CodeSnippet';
import LanguageSelector from './LanguageSelector';

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
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>('shell');
  const [apiKeyId, setApiKeyId] = useState<string>('');
  const [apiSecretKey, setApiSecretKey] = useState<string>('');

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

  const generateCodeSnippet = (language: ProgrammingLanguage): string => {
    const url = constructEndpointUrl();
    const headers: Record<string, string> = {
      'accept': 'application/json',
      ...(requiresAuth ? {'Authorization': `Bearer ${token || apiKeyId || '[YOUR_TOKEN]'}`} : {})
    };
    
    if (['POST', 'PUT', 'PATCH'].includes(method) && requestBody) {
      headers['Content-Type'] = 'application/json';
    }
    
    switch (language) {
      case 'shell':
        let curl = `curl --request ${method} \\\n`;
        curl += `  --url '${url}' \\\n`;
        
        Object.entries(headers).forEach(([key, value]) => {
          curl += `  --header '${key}: ${value}' \\\n`;
        });
        
        if (['POST', 'PUT', 'PATCH'].includes(method) && requestBody) {
          curl += `  --data '${requestPayload}'`;
        }
        
        return curl;
        
      case 'node':
        let nodeCode = "const axios = require('axios');\n\n";
        nodeCode += "const options = {\n";
        nodeCode += `  method: '${method}',\n`;
        nodeCode += `  url: '${url}',\n`;
        nodeCode += "  headers: {\n";
        
        Object.entries(headers).forEach(([key, value], index, array) => {
          nodeCode += `    '${key}': '${value}'${index < array.length - 1 ? ',' : ''}\n`;
        });
        
        nodeCode += "  }";
        
        if (['POST', 'PUT', 'PATCH'].includes(method) && requestBody) {
          nodeCode += ",\n  data: " + requestPayload;
        }
        
        nodeCode += "\n};\n\n";
        nodeCode += "axios.request(options).then(function (response) {\n";
        nodeCode += "  console.log(response.data);\n";
        nodeCode += "}).catch(function (error) {\n";
        nodeCode += "  console.error(error);\n";
        nodeCode += "});";
        
        return nodeCode;
        
      case 'python':
        let pythonCode = "import requests\n\n";
        pythonCode += `url = "${url}"\n\n`;
        pythonCode += "headers = {\n";
        
        Object.entries(headers).forEach(([key, value], index, array) => {
          pythonCode += `    "${key}": "${value}"${index < array.length - 1 ? ',' : ''}\n`;
        });
        
        pythonCode += "}\n\n";
        
        if (['POST', 'PUT', 'PATCH'].includes(method) && requestBody) {
          pythonCode += `payload = ${requestPayload}\n\n`;
          pythonCode += `response = requests.${method.toLowerCase()}(url, headers=headers, json=payload)\n`;
        } else {
          pythonCode += `response = requests.${method.toLowerCase()}(url, headers=headers)\n`;
        }
        
        pythonCode += "\nprint(response.text)";
        
        return pythonCode;
        
      case 'ruby':
        let rubyCode = "require 'uri'\nrequire 'net/http'\nrequire 'json'\n\n";
        rubyCode += `url = URI("${url}")\n\n`;
        rubyCode += "http = Net::HTTP.new(url.host, url.port)\n";
        rubyCode += "http.use_ssl = true\n\n";
        rubyCode += `request = Net::HTTP::${method.charAt(0).toUpperCase() + method.slice(1).toLowerCase()}.new(url)\n`;
        
        Object.entries(headers).forEach(([key, value]) => {
          rubyCode += `request["${key}"] = "${value}"\n`;
        });
        
        if (['POST', 'PUT', 'PATCH'].includes(method) && requestBody) {
          rubyCode += `request.body = ${requestPayload}\n`;
        }
        
        rubyCode += "\nresponse = http.request(request)\n";
        rubyCode += "puts response.read_body";
        
        return rubyCode;
        
      case 'php':
        let phpCode = "<?php\n\n";
        phpCode += "$curl = curl_init();\n\n";
        phpCode += "curl_setopt_array($curl, [\n";
        phpCode += `  CURLOPT_URL => "${url}",\n`;
        phpCode += "  CURLOPT_RETURNTRANSFER => true,\n";
        phpCode += "  CURLOPT_ENCODING => \"\",\n";
        phpCode += "  CURLOPT_MAXREDIRS => 10,\n";
        phpCode += "  CURLOPT_TIMEOUT => 30,\n";
        phpCode += "  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,\n";
        phpCode += `  CURLOPT_CUSTOMREQUEST => "${method}",\n`;
        
        if (['POST', 'PUT', 'PATCH'].includes(method) && requestBody) {
          phpCode += `  CURLOPT_POSTFIELDS => ${requestPayload},\n`;
        }
        
        phpCode += "  CURLOPT_HTTPHEADER => [\n";
        
        Object.entries(headers).forEach(([key, value], index, array) => {
          phpCode += `    "${key}: ${value}"${index < array.length - 1 ? ',' : ''}\n`;
        });
        
        phpCode += "  ],\n";
        phpCode += "]);\n\n";
        phpCode += "$response = curl_exec($curl);\n";
        phpCode += "$err = curl_error($curl);\n\n";
        phpCode += "curl_close($curl);\n\n";
        phpCode += "if ($err) {\n";
        phpCode += "  echo \"cURL Error #:\" . $err;\n";
        phpCode += "} else {\n";
        phpCode += "  echo $response;\n";
        phpCode += "}\n";
        
        return phpCode;
        
      default:
        return `// Code snippet for ${language} not implemented yet`;
    }
  };

  return (
    <div className="mb-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1">{title}</h1>
        <div className="flex items-center">
          <span className={`${getMethodColor(method)} text-xs font-medium px-2 py-0.5 rounded`}>
            {method}
          </span>
          <h2 className="text-base font-medium ml-2">{endpoint}</h2>
        </div>
        <p className="text-gray-600 mt-1 text-sm">{description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-1 lg:col-span-2">
          <Tabs defaultValue="documentation" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-3 w-full justify-start h-9 p-1">
              <TabsTrigger value="documentation" className="text-xs h-7">Documentation</TabsTrigger>
              <TabsTrigger value="request" className="text-xs h-7">Request</TabsTrigger>
              <TabsTrigger value="response" className="text-xs h-7">Response</TabsTrigger>
            </TabsList>
            
            <TabsContent value="documentation" className="pt-1">
              <Card className="shadow-sm">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-base">API Details</CardTitle>
                </CardHeader>
                <CardContent className="py-3 px-4 text-sm">
                  {children || (
                    <div className="text-gray-600">
                      <p className="mb-3">This endpoint allows you to interact with {title.toLowerCase()}.</p>
                      
                      {requiresAuth && (
                        <div className="mb-3">
                          <h4 className="font-semibold mb-1">Authentication</h4>
                          <p>This endpoint requires authentication. Include your bearer token in the request header.</p>
                        </div>
                      )}
                      
                      {pathParams && Object.keys(pathParams).length > 0 && (
                        <div className="mb-3">
                          <h4 className="font-semibold mb-1">Path Parameters</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-xs">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {Object.entries(pathParams).map(([key, param]) => (
                                  <tr key={key}>
                                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">{key}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{param.type}</td>
                                    <td className="px-3 py-2 text-xs text-gray-500">{param.description}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      
                      {queryParams && Object.keys(queryParams).length > 0 && (
                        <div className="mb-3">
                          <h4 className="font-semibold mb-1">Query Parameters</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-xs">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {Object.entries(queryParams).map(([key, param]) => (
                                  <tr key={key}>
                                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">{key}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{param.type}</td>
                                    <td className="px-3 py-2 text-xs text-gray-500">{param.description}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      
                      {requestBody && (
                        <div className="mb-3">
                          <h4 className="font-semibold mb-1">Request Body</h4>
                          <pre className="bg-gray-50 p-3 rounded-md text-xs overflow-auto">
                            {JSON.stringify(requestBody, null, 2)}
                          </pre>
                        </div>
                      )}
                      
                      <div className="mt-4">
                        <h4 className="font-semibold mb-1">Response</h4>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">200</span>
                          <span className="text-xs">An array of asset objects</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="request" className="pt-1">
              <Card className="shadow-sm">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-base">Request Details</CardTitle>
                </CardHeader>
                <CardContent className="py-3 px-4 text-sm space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">URL</h4>
                    <div className="flex items-center bg-gray-50 p-2 rounded-md">
                      <span className="text-xs font-mono flex-1 break-all">{constructEndpointUrl()}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(constructEndpointUrl())}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  {pathParams && Object.keys(pathParams).length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Path Parameters</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {Object.entries(pathParams).map(([key, param]) => (
                          <div key={key} className="space-y-1">
                            <label className="text-xs font-medium">{key} <span className="text-xs text-gray-500">({param.type})</span></label>
                            <Input 
                              placeholder={param.description} 
                              value={paramValues[key] || ''}
                              onChange={(e) => handleParamChange(key, e.target.value)}
                              className="h-8 text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {queryParams && Object.keys(queryParams).length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Query Parameters</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {Object.entries(queryParams).map(([key, param]) => (
                          <div key={key} className="space-y-1">
                            <label className="text-xs font-medium">{key} <span className="text-xs text-gray-500">({param.type})</span></label>
                            <Input 
                              placeholder={param.description} 
                              value={paramValues[key] || ''}
                              onChange={(e) => handleParamChange(key, e.target.value)}
                              className="h-8 text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-semibold mb-2">Headers</h4>
                    <pre className="bg-gray-50 p-2 rounded-md text-xs overflow-auto">
                      {JSON.stringify({
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        ...(requiresAuth ? {'Authorization': `Bearer ${token || apiKeyId || '[YOUR_TOKEN]'}`} : {})
                      }, null, 2)}
                    </pre>
                  </div>
                  
                  {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
                    <div>
                      <h4 className="font-semibold mb-2">Request Body</h4>
                      <textarea
                        className="w-full h-32 font-mono text-xs p-2 border rounded-md bg-gray-50"
                        value={requestPayload}
                        onChange={(e) => setRequestPayload(e.target.value)}
                      />
                    </div>
                  )}
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Code Snippet</h4>
                      <LanguageSelector 
                        selectedLanguage={selectedLanguage} 
                        onLanguageChange={setSelectedLanguage}
                      />
                    </div>
                    <CodeSnippet 
                      language={selectedLanguage}
                      code={generateCodeSnippet(selectedLanguage)}
                    />
                  </div>
                  
                  <Button onClick={handleApiCall} disabled={isLoading} className="w-full h-9 text-sm">
                    {isLoading ? 'Sending...' : 'Try It!'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="response" className="pt-1">
              <Card className="shadow-sm">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="flex justify-between items-center text-base">
                    <span>Response</span>
                    {response && (
                      <div className="flex items-center">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded mr-2">
                          200
                        </span>
                        <span className="text-xs text-gray-500">application/json</span>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-3 px-4">
                  {isLoading ? (
                    <div className="flex justify-center items-center p-6">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    </div>
                  ) : error ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md text-xs">
                      <p className="font-medium">Error</p>
                      <p>{error}</p>
                    </div>
                  ) : response ? (
                    <div className="relative">
                      <pre className="bg-gray-50 p-3 rounded-md text-xs overflow-auto max-h-96">
                        {JSON.stringify(response, null, 2)}
                      </pre>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute top-2 right-2 h-6 w-6 p-0"
                        onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-gray-500 p-6 text-center border rounded-md bg-gray-50 text-xs">
                      <p className="mb-1">Click "Try It!" to send a request</p>
                      <p className="text-xs">Or choose an example from the dropdown</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="col-span-1">
          <Card className="bg-gray-900 text-gray-200 border-gray-800 shadow-sm mb-4">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-gray-200 text-base">Language</CardTitle>
            </CardHeader>
            <CardContent className="py-3 px-4">
              <div className="grid grid-cols-5 gap-1">
                <Button 
                  variant={selectedLanguage === "shell" ? "default" : "outline"}
                  size="sm" 
                  className={`justify-center h-7 text-xs ${selectedLanguage !== "shell" ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700" : ""}`}
                  onClick={() => setSelectedLanguage("shell")}
                >
                  Shell
                </Button>
                <Button 
                  variant={selectedLanguage === "node" ? "default" : "outline"}  
                  size="sm"
                  className={`justify-center h-7 text-xs ${selectedLanguage !== "node" ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700" : ""}`}
                  onClick={() => setSelectedLanguage("node")}
                >
                  Node
                </Button>
                <Button 
                  variant={selectedLanguage === "ruby" ? "default" : "outline"}  
                  size="sm"
                  className={`justify-center h-7 text-xs ${selectedLanguage !== "ruby" ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700" : ""}`}
                  onClick={() => setSelectedLanguage("ruby")}
                >
                  Ruby
                </Button>
                <Button 
                  variant={selectedLanguage === "php" ? "default" : "outline"}  
                  size="sm"
                  className={`justify-center h-7 text-xs ${selectedLanguage !== "php" ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700" : ""}`}
                  onClick={() => setSelectedLanguage("php")}
                >
                  PHP
                </Button>
                <Button 
                  variant={selectedLanguage === "python" ? "default" : "outline"}  
                  size="sm"
                  className={`justify-center h-7 text-xs ${selectedLanguage !== "python" ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700" : ""}`}
                  onClick={() => setSelectedLanguage("python")}
                >
                  Python
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 text-gray-200 border-gray-800 shadow-sm mb-4">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-gray-200 text-base">Credentials</CardTitle>
            </CardHeader>
            <CardContent className="py-3 px-4">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium block mb-1 text-gray-300">API Key ID</label>
                  <Input 
                    type="text" 
                    placeholder="APCA-API-KEY-ID" 
                    className="bg-gray-800 h-8 text-xs border-gray-700 text-gray-200 focus:ring-blue-500"
                    value={apiKeyId}
                    onChange={(e) => setApiKeyId(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1 text-gray-300">API Secret Key</label>
                  <Input 
                    type="password" 
                    placeholder="APCA-API-SECRET-KEY" 
                    className="bg-gray-800 h-8 text-xs border-gray-700 text-gray-200 focus:ring-blue-500"
                    value={apiSecretKey}
                    onChange={(e) => setApiSecretKey(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
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
        </div>
      </div>
    </div>
  );
};

export default ApiEndpoint;
