
import React from 'react';
import ApiUrlDisplay from './ApiUrlDisplay';
import ParamEditor from './ParamEditor';
import HeadersDisplay from './HeadersDisplay';
import RequestBodyEditor from './RequestBodyEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

interface ApiEndpointRequestProps {
  endpointUrl: string;
  pathParams?: Record<string, any>;
  queryParams?: Record<string, any>;
  paramValues: Record<string, string>;
  onParamChange: (key: string, value: string) => void;
  requiresAuth: boolean;
  token?: string;
  apiKeyId?: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  requestPayload: string;
  setRequestPayload: (payload: string) => void;
  requestFields?: RequestField[];
  onTryItClick?: () => void;
}

const ApiEndpointRequest: React.FC<ApiEndpointRequestProps> = ({
  endpointUrl,
  pathParams,
  queryParams,
  paramValues,
  onParamChange,
  requiresAuth,
  token,
  apiKeyId,
  method,
  requestPayload,
  setRequestPayload,
  requestFields = [],
  onTryItClick
}) => {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-md mb-4">
      <CardHeader className="py-3 px-4 border-b border-gray-200">
        <CardTitle className="text-sm font-medium">REQUEST DETAILS</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <ApiUrlDisplay url={endpointUrl} />
        
        {pathParams && Object.keys(pathParams).length > 0 && (
          <ParamEditor 
            title="Path Parameters"
            params={pathParams}
            paramValues={paramValues}
            onParamChange={onParamChange}
          />
        )}
        
        {queryParams && Object.keys(queryParams).length > 0 && (
          <ParamEditor 
            title="Query Parameters"
            params={queryParams}
            paramValues={paramValues}
            onParamChange={onParamChange}
          />
        )}
        
        <HeadersDisplay 
          requiresAuth={requiresAuth} 
          token={token} 
          apiKeyId={apiKeyId} 
        />
        
        {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
          <RequestBodyEditor
            requestPayload={requestPayload}
            setRequestPayload={setRequestPayload}
            requestFields={requestFields}
            method={method}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ApiEndpointRequest;
