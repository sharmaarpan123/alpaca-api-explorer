import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { toast } from 'sonner';
import { ProgrammingLanguage } from './CodeSnippet';
import EndpointHeader from './EndpointHeader';
import CredentialsCard from './CredentialsCard';
import BaseUrlCard from './BaseUrlCard';
import { constructEndpointUrl } from './utils/urlUtils';
import ApiEndpointRequest from './ApiEndpointRequest';
import ApiEndpointCodeSnippet from './ApiEndpointCodeSnippet';
import ResponseKeysDisplay from './ResponseKeysDisplay';
import { Card } from '@/components/ui/card';
import ApiEndpointTabs from './ApiEndpointTabs';
import axios from 'axios';

interface ParamField {
  type: string;
  description: string;
}

interface ParamsObject {
  [key: string]: ParamField;
}

interface RequestField {
  name: string;
  type: string;
  description?: string;
  required?: boolean;
  options?: string[];
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
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem('token');
  const { toast: uiToast } = useToast();
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
  const [activeTab, setActiveTab] = useState<string>("documentation");
  
  // Convert requestBody to requestFields format
  const generateRequestFields = (): RequestField[] => {
    if (!requestBody) return [];
    
    return Object.entries(requestBody).map(([key, value]) => {
      let type = typeof value;
      // Fix the type for arrays
      if (Array.isArray(value)) type = "object";
      
      // Handle special fields with known options
      const specialFields: Record<string, { type: string, options?: string[] }> = {
        'type': { 
          type: 'string', 
          options: ['market', 'limit'] 
        },
        'side': { 
          type: 'string', 
          options: ['buy', 'sell'] 
        },
        'purchaseType': { 
          type: 'string', 
          options: ['Money', 'Share'] 
        },
        'timeInForce': { 
          type: 'string', 
          options: ['day', 'gtc'] 
        },
        'scheduledType': { 
          type: 'string', 
          options: ['everyweek', 'everyday', 'everymonth'] 
        },
        'timeType': { 
          type: 'string', 
          options: ['First', 'Last'] 
        },
        'day': { 
          type: 'string', 
          options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] 
        },
        'time': {
          type: 'string',
          options: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00']
        }
      };
      
      const fieldInfo = specialFields[key] || { type };
      
      return {
        name: key,
        type: fieldInfo.type,
        options: fieldInfo.options,
        required: ['symbol', 'purchaseType', 'purchaseValue', 'side', 'type'].includes(key),
        description: getFieldDescription(key)
      };
    });
  };
  
  // Get field descriptions based on field name
  const getFieldDescription = (fieldName: string): string => {
    const descriptions: Record<string, string> = {
      'symbol': 'Asset symbol (e.g., AAPL for Apple)',
      'side': 'Order side (buy or sell)',
      'type': 'Order type (market or limit)',
      'purchaseType': 'Type of purchase (Money or Share)',
      'purchaseValue': 'Value for the purchase',
      'timezone': 'Timezone for the order (e.g., UTC)',
      'limitOrderPrice': 'Price for limit orders',
      'timeInForce': 'Time in force for limit orders (day or gtc)',
      'scheduled': 'Set to "scheduled" for scheduled orders',
      'scheduledType': 'Type of schedule (everyweek, everyday, everymonth)',
      'time': 'Time for scheduled orders',
      'timeType': 'First or Last occurrence for monthly scheduling',
      'day': 'Day of the week for scheduling',
      'value': 'Symbol or asset ID identifier',
      'limit': 'Number of results to return',
      'page': 'Page number for pagination',
      'order': 'Sort order (1 for ascending, -1 for descending)',
      'orderBy': 'Field to sort by',
      'from': 'Start date in YYYY-MM-DD format',
      'to': 'End date in YYYY-MM-DD format',
      'startTime': 'Start time in ISO format',
      'endTime': 'End time in ISO format',
      'date': 'Specific date in YYYY-MM-DD format',
      'multiplier': 'Timeframe multiplier',
      'timespan': 'Timeframe unit (minute, hour, day, etc.)'
    };
    
    return descriptions[fieldName] || '';
  };
  
  const requestFields = generateRequestFields();
  
  const handleParamChange = (key: string, value: string) => {
    setParamValues(prev => ({ ...prev, [key]: value }));
  };

  const endpointUrl = constructEndpointUrl(endpoint, pathParams, queryParams, paramValues);

  const handleApiCall = async () => {
    if (requiresAuth && !isAuthenticated && !apiKeyId) {
      toast.error("Authentication Required", {
        description: "Please provide API credentials to access this endpoint",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Set the active tab to "response" to show the user the results
      setActiveTab("response");
      
      // In a real app, this would call your actual API
      // For now, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let mockResponse;
      let parsedPayload: Record<string, any> = {};
      
      // Parse the request payload if it's present
      if (requestPayload) {
        try {
          parsedPayload = JSON.parse(requestPayload);
        } catch (e) {
          console.error("Error parsing request payload:", e);
          parsedPayload = {};
        }
      }

      // Generate a dynamic mock response based on the endpoint and method
      if (endpoint.includes('assets')) {
        mockResponse = {
          success: true,
          timestamp: new Date().toISOString(),
          data: {
            assets: [
              { id: 'AAPL', name: 'Apple Inc', exchange: 'NASDAQ', status: 'active', tradable: true, marginable: true, shortable: true, easy_to_borrow: true },
              { id: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', status: 'active', tradable: true, marginable: true, shortable: true, easy_to_borrow: true },
              { id: 'TSLA', name: 'Tesla Inc', exchange: 'NASDAQ', status: 'active', tradable: true, marginable: true, shortable: true, easy_to_borrow: true },
              { id: 'AMZN', name: 'Amazon.com Inc', exchange: 'NASDAQ', status: 'active', tradable: true, marginable: true, shortable: true, easy_to_borrow: true }
            ]
          }
        };
      } else if (endpoint.includes('orders')) {
        if (method === 'POST') {
          // Creating a new order
          mockResponse = {
            success: true,
            timestamp: new Date().toISOString(),
            data: {
              orderId: `order_${Math.random().toString(36).substring(2, 10)}`,
              status: 'pending',
              createdAt: new Date().toISOString(),
              ...parsedPayload
            }
          };
        } else {
          // Getting order list
          mockResponse = {
            success: true,
            timestamp: new Date().toISOString(),
            data: {
              orders: [
                { 
                  id: 'ord_123', 
                  symbol: parsedPayload.symbol || 'AAPL', 
                  side: parsedPayload.side || 'buy', 
                  qty: 10, 
                  type: parsedPayload.type || 'market', 
                  time_in_force: 'day', 
                  status: 'filled' 
                },
                { id: 'ord_456', symbol: 'MSFT', side: 'sell', qty: 5, type: 'limit', time_in_force: 'gtc', status: 'open' }
              ]
            }
          };
        }
      } else if (endpoint.includes('quotes')) {
        mockResponse = {
          success: true,
          timestamp: new Date().toISOString(),
          data: {
            quotes: [
              { 
                symbol: parsedPayload.symbol || 'AAPL',
                price: 178.32,
                bidPrice: 178.30,
                bidSize: 500,
                askPrice: 178.34,
                askSize: 700,
                timestamp: new Date().toISOString()
              }
            ]
          }
        };
      } else if (endpoint.includes('bars')) {
        mockResponse = {
          success: true,
          timestamp: new Date().toISOString(),
          data: {
            bars: [
              { 
                symbol: parsedPayload.symbol || 'AAPL',
                open: 177.50,
                high: 179.25,
                low: 176.80,
                close: 178.32,
                volume: 25000000,
                timestamp: new Date().toISOString()
              },
              { 
                symbol: parsedPayload.symbol || 'AAPL',
                open: 178.32,
                high: 180.15,
                low: 177.95,
                close: 179.10,
                volume: 22000000,
                timestamp: new Date(Date.now() + 3600000).toISOString()
              }
            ]
          }
        };
      } else {
        // Default generic response
        mockResponse = {
          success: true,
          timestamp: new Date().toISOString(),
          data: {
            message: `${method} request to ${endpoint} was successful`,
            endpoint: endpoint,
            params: paramValues,
            body: parsedPayload
          }
        };
      }

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Side - Request Details and Response Keys */}
        <div className="space-y-4">
          <ApiEndpointTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            endpointUrl={endpointUrl}
            method={method}
            requiresAuth={requiresAuth}
            token={token}
            apiKeyId={apiKeyId}
            requestPayload={requestPayload}
            setRequestPayload={setRequestPayload}
            pathParams={pathParams}
            queryParams={queryParams}
            requestBody={requestBody}
            paramValues={paramValues}
            handleParamChange={handleParamChange}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            isLoading={isLoading}
            error={error}
            response={response}
            handleApiCall={handleApiCall}
          >
            {children}
          </ApiEndpointTabs>
          
          <Card className="bg-white border border-gray-200 shadow-sm rounded-md mb-4">
            <ResponseKeysDisplay responseKeys={getResponseKeys()} />
          </Card>
        </div>
        
        {/* Right Side - Code Snippet and Response */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
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
