import { Card } from "@/components/ui/card";
import { ParamsObject } from "@/data/apiEndpoints";
import React from "react";
import ApiEndpointCodeSnippet from "./ApiEndpointCodeSnippet";
import ApiEndpointTabs from "./ApiEndpointTabs";
import { ProgrammingLanguage } from "./CodeSnippet";
import CredentialsCard from "./CredentialsCard";
import ResponseKeysDisplay from "./ResponseKeysDisplay";
import { getResponseKeys } from "./utils/apiUtils";
import { useAuth } from "@/contexts/AuthContext";

interface ApiEndpointContentProps {
  title: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  description: string;
  requiresAuth: boolean;
  endpointUrl: string;
  apiKeyId: string;
  setApiKeyId: (value: string) => void;
  apiSecretKey: string;
  setApiSecretKey: (value: string) => void;
  token?: string;
  requestPayload: string;
  setRequestPayload: (value: string) => void;
  pathParams?: ParamsObject;
  queryParams?: ParamsObject;
  requestBody?: Record<string, any>;
  paramValues: Record<string, string>;
  handleParamChange: (key: string, value: string) => void;
  selectedLanguage: ProgrammingLanguage;
  onLanguageChange: (language: ProgrammingLanguage) => void;
  isLoading: boolean;
  error: string | null;
  response: any;
  handleApiCall: () => void;
  children?: React.ReactNode;
}

const ApiEndpointContent: React.FC<ApiEndpointContentProps> = ({
  method,
  endpoint,
  requiresAuth,
  endpointUrl,
  apiKeyId,

  apiSecretKey,
  setApiSecretKey,
  token,
  requestPayload,
  setRequestPayload,
  pathParams,
  queryParams,
  requestBody,
  paramValues,
  handleParamChange,
  selectedLanguage,
  onLanguageChange,
  isLoading,
  error,
  response,
  handleApiCall,
  children,
}) => {
  const { privateKey } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    accesstoken: token,
    accountnumber : apiSecretKey,
    privateApiKey: privateKey,
  };

  const responseKeys = getResponseKeys(endpoint);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Left Side - Request Details and Response Keys */}
      <div className="space-y-4">
        <ApiEndpointTabs
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
          onLanguageChange={onLanguageChange}
          error={error}
          response={response}
        >
          {children}
        </ApiEndpointTabs>

        <Card className="bg-white border border-gray-200 shadow-sm rounded-md mb-4">
          <ResponseKeysDisplay responseKeys={responseKeys} />
        </Card>
      </div>

      {/* Right Side - Code Snippet and Response */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <CredentialsCard
            apiSecretKey={apiSecretKey}
            setApiSecretKey={setApiSecretKey}
          />

          <ApiEndpointCodeSnippet
            method={method}
            endpointUrl={endpointUrl}
            headers={headers}
            requestPayload={
              ["POST", "PUT", "PATCH"].includes(method)
                ? requestPayload
                : undefined
            }
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
            isLoading={isLoading}
            onTryItClick={handleApiCall}
            error={error}
            response={response}
          />
        </div>
      </div>
    </div>
  );
};

export default ApiEndpointContent;
