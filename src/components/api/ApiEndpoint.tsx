
import React, { useState } from "react";
import ApiEndpointContent from "./ApiEndpointContent";
import { ProgrammingLanguage } from "./CodeSnippet";
import EndpointHeader from "./EndpointHeader";
import useApiCall from "./hooks/useApiCall";
import { constructEndpointUrl } from "./utils/urlUtils";
import { useAuth } from "@/contexts/AuthContext";

interface ParamField {
  type: string;
  description: string;
}

interface ParamsObject {
  [key: string]: ParamField;
}

interface ApiEndpointProps {
  title: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  description: string;
  requiresAuth?: boolean;
  requestBody?: Record<string, any>;
  queryParams?: ParamsObject;
  pathParams?: ParamsObject;
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
}) => {
  const token = localStorage.getItem("token");
  const [apiSecretKey, setApiSecretKey] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] =
    useState<ProgrammingLanguage>("shell");
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [requestPayload, setRequestPayload] = useState<string>(
    requestBody ? JSON.stringify(requestBody, null, 2) : "{}"
  );

  const { privateKey } = useAuth();

  const { isLoading, response, error, handleApiCall } = useApiCall({
    method,
    endpoint,
    requiresAuth,
  });

  const handleParamChange = (key: string, value: string) => {
    setParamValues((prev) => ({ ...prev, [key]: value }));
  };

  const endpointUrl = constructEndpointUrl(
    endpoint,
    pathParams,
    queryParams,
    paramValues
  );

  const handleApiCallClick = async () => {
    await handleApiCall(
      paramValues,
      requestPayload,
      pathParams,
      queryParams,
      token,
      privateKey,
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
      />
    </div>
  );
};

export default ApiEndpoint;
