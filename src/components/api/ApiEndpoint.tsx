import { useAuth } from "@/contexts/AuthContext";
import { ResponseExample } from "@/data/apiEndpoints";
import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import ApiEndpointCodeSnippet from "./ApiEndpointCodeSnippet";
import ApiEndpointTabs from "./ApiEndpointTabs";
import { ProgrammingLanguage } from "./CodeSnippet";
import CredentialsCard from "./CredentialsCard";
import EndpointHeader from "./EndpointHeader";
import useApiCall from "./hooks/useApiCall";
import ResponseKeysDisplay from "./ResponseKeysDisplay";
import { constructEndpointUrl } from "./utils/urlUtils";

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
  responseExamples?: ResponseExample[];
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
  responseExamples,
}) => {
  const token = localStorage.getItem("token");
  const [apiSecretKey, setApiSecretKey] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] =
    useState<ProgrammingLanguage>("shell");
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [requestPayload, setRequestPayload] = useState<string>(
    requestBody
      ? JSON.stringify(
          Object.keys(requestBody).reduce((acc, key) => {
            acc[key] = requestBody[key].default;
            return acc;
          }, {} as Record<string, any>),
          null,
          2
        )
      : "{}"
  );

  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { privateKey } = useAuth();

  const { isLoading, response, error, handleApiCall } = useApiCall({
    method,
    endpoint,
    requiresAuth,
  });

  const handleParamChange = (key: string, value: string) => {
    setParamValues((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!requestBody) {
      return;
    }
    const obj = {};

    Object.keys(requestBody).forEach((key) => {
      obj[key] = requestBody[key].default;
    });

    console.log(obj, "obj");

    setFormValues((p) => obj);
  }, []);

  const endpointUrl = constructEndpointUrl(
    endpoint,
    pathParams,
    queryParams,
    paramValues
  );

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    accesstoken: token,
    accountnumber: apiSecretKey,
    privateApiKey: privateKey,
  };

  const handleApiCallClick = async () => {
    const isFormValid = Object.values(formErrors).every((error) => !error);

    if (!isFormValid) {
      return;
    }

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Side - Request Details and Response Keys */}
        <div className="space-y-2">
          <ApiEndpointTabs
            method={method}
            requiresAuth={requiresAuth}
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
            error={error}
            response={response}
            formValues={formValues}
            formErrors={formErrors}
            setFormValues={setFormValues}
            setFormErrors={setFormErrors}
          />

          <Card className="bg-white border border-gray-200 shadow-sm rounded-md mb-4">
            <ResponseKeysDisplay responseExamples={responseExamples} />
          </Card>
        </div>

        {/* Right Side - Code Snippet and Response */}
        <div className="space-y-2">
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
              onLanguageChange={setSelectedLanguage}
              isLoading={isLoading}
              onTryItClick={handleApiCallClick}
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
