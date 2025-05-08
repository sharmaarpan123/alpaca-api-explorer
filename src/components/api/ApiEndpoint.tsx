
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { ProgrammingLanguage } from './CodeSnippet';
import EndpointHeader from './EndpointHeader';
import CredentialsCard from './CredentialsCard';
import BaseUrlCard from './BaseUrlCard';
import { constructEndpointUrl } from './utils/urlUtils';
import ApiEndpointRequest from './ApiEndpointRequest';
import ApiEndpointCodeSnippet from './ApiEndpointCodeSnippet';
import ResponseKeysDisplay from './ResponseKeysDisplay';

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

  const endpointUrl = constructEndpointUrl(endpoint, pathParams, queryParams, paramValues);

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
    } catch (err) {
      console.error('API call error:', err);
      setError('An error occurred while making the API request');
    } finally {
      setIsLoading(false);
    }
  };

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(requiresAuth ? {'Authorization': `Bearer ${token || apiKeyId || '[YOUR_TOKEN]'}`} : {})
  };

  const getResponseKeys = () => {
    if (endpoint.includes('assets')) {
      return [
        { status: '200', description: 'An Asset object', example: { id: 'AAPL', name: 'Apple Inc', exchange: 'NASDAQ' } },
        { status: '404', description: 'Not Found', example: null }
      ];
    } else if (endpoint.includes('orders')) {
      return [
        { status: '200', description: 'Order details', example: { id: 'ord_123', symbol: 'AAPL', side: 'buy' } },
        { status: '404', description: 'Not Found', example: null }
      ];
    }
    return [
      { status: '200', description: 'Success', example: { success: true } },
      { status: '404', description: 'Not Found', example: null }
    ];
  };

  return (
    <div className="mb-4">
      <EndpointHeader 
        title={title}
        method={method}
        endpoint={endpoint}
        description={description}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Left Side - Request Details and Response Keys */}
        <div className="col-span-1">
          <div className="space-y-3">
            <ApiEndpointRequest
              endpointUrl={endpointUrl}
              pathParams={pathParams}
              queryParams={queryParams}
              paramValues={paramValues}
              onParamChange={handleParamChange}
              requiresAuth={requiresAuth}
              token={token}
              apiKeyId={apiKeyId}
              method={method}
              requestPayload={requestPayload}
              setRequestPayload={setRequestPayload}
            />
            
            <ResponseKeysDisplay responseKeys={getResponseKeys()} />
          </div>
        </div>
        
        {/* Right Side - Code Snippet and Response */}
        <div className="col-span-1">
          <div className="space-y-3">
            <CredentialsCard
              apiKeyId={apiKeyId}
              apiSecretKey={apiSecretKey}
              setApiKeyId={setApiKeyId}
              setApiSecretKey={setApiSecretKey}
            />
            
            <BaseUrlCard baseUrl="https://api.deviden.com" />

            <ApiEndpointCodeSnippet 
              method={method}
              endpointUrl={endpointUrl}
              headers={headers}
              requestPayload={['POST', 'PUT', 'PATCH'].includes(method) ? requestPayload : undefined}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              isLoading={isLoading}
              onTryItClick={handleApiCall}
              error={error}
              response={response}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiEndpoint;
