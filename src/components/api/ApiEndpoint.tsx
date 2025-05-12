
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProgrammingLanguage } from './CodeSnippet';
import EndpointHeader from './EndpointHeader';
import { constructEndpointUrl } from './utils/urlUtils';
import ApiEndpointContent from './ApiEndpointContent';
import { generateRequestFields } from './utils/apiUtils';
import useApiCall from './hooks/useApiCall';

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
  const [apiKeyId, setApiKeyId] = useState<string>('');
  const [apiSecretKey, setApiSecretKey] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>("documentation");
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>('shell');
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [requestPayload, setRequestPayload] = useState<string>(
    requestBody ? JSON.stringify(requestBody, null, 2) : '{}'
  );
  
  const { isLoading, response, error, handleApiCall } = useApiCall({ 
    method, 
    endpoint,
    requiresAuth 
  });
  
  // Generate request fields from request body
  const requestFields = generateRequestFields(requestBody);
  
  const handleParamChange = (key: string, value: string) => {
    setParamValues(prev => ({ ...prev, [key]: value }));
  };

  const endpointUrl = constructEndpointUrl(endpoint, pathParams, queryParams, paramValues);

  const handleApiCallClick = async () => {
    // Set the active tab to "response" to show the user the results
    setActiveTab("response");
    
    await handleApiCall(
      paramValues,
      requestPayload,
      pathParams,
      queryParams,
      token,
      apiKeyId,
      apiSecretKey
    );
  };

  return (
    <div className="mb-4">
      <EndpointHeader 
        title={title}
        method={method}
        endpoint={endpoint}
        description={description}
      />

      <ApiEndpointContent
        title={title}
        method={method}
        endpoint={endpoint}
        description={description}
        requiresAuth={requiresAuth}
        endpointUrl={endpointUrl}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        apiKeyId={apiKeyId}
        setApiKeyId={setApiKeyId}
        apiSecretKey={apiSecretKey}
        setApiSecretKey={setApiSecretKey}
        token={token}
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
        handleApiCall={handleApiCallClick}
      >
        {children}
      </ApiEndpointContent>
    </div>
  );
};

export default ApiEndpoint;
