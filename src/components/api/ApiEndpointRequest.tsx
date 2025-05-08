
import React from 'react';
import ApiUrlDisplay from './ApiUrlDisplay';
import ParamEditor from './ParamEditor';
import HeadersDisplay from './HeadersDisplay';
import RequestBodyEditor from './RequestBodyEditor';

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
  setRequestPayload
}) => {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-md">
      <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
        <h3 className="font-medium text-sm">REQUEST DETAILS</h3>
      </div>
      <div className="p-3 space-y-3">
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
          />
        )}
      </div>
    </div>
  );
};

export default ApiEndpointRequest;
