import { useAuth } from "@/contexts/AuthContext";
import { RequestBodyField, ResponseExample } from "@/data/dataTypes";
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
import { useToast } from "@/hooks/use-toast";

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
  requestBody?: Record<string, RequestBodyField>;
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
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [apiSecretKey, setApiSecretKey] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] =
    useState<ProgrammingLanguage>("shell");
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [requestPayload, setRequestPayload] = useState<string>(
    requestBody
      ? JSON.stringify(
          Object.keys(requestBody).reduce((acc, key) => {
            if (!requestBody[key].default && !requestBody[key].required) {
              return acc;
            }

            if (
              !requestBody[key].default &&
              requestBody[key].requiredCondition
            ) {
              return acc;
            }

            acc[key] = requestBody[key].default;
            return acc;
          }, {} as Record<string, any>),
          null,
          2
        )
      : "{}"
  );

  const { privateKey } = useAuth();

  const { toast } = useToast();

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
    const initialFormValues = {};

    Object.keys(requestBody).forEach((key) => {
      if (requestBody[key].requiredCondition) {
        // we don't need the key if required condition is there due backend server validation
        return;
      }

      if (!requestBody[key].default && !requestBody[key].required) {
        // we don't need the key if default value is not there and the value is not required
        // //  due backend server validation
        return;
      }

      initialFormValues[key] = requestBody[key].default;
    });

    console.log(initialFormValues, "initialFormValues");

    const initialErrors = {};

    Object.keys(requestBody).forEach((key) => {
      if (requestBody[key]?.requiredCondition) {
        // we don't need the key if required condition is there due backend server validation
        return "";
      }

      if (!requestBody[key].default && !requestBody[key].required) {
        // we don't need the key if default value is not there and the value is not required
        // //  due backend server validation
        return "";
      }

      initialErrors[key] =
        requestBody[key].default || !requestBody[key].required
          ? ""
          : "This field is required";
    });

    setFormErrors((p) => initialErrors);

    setFormValues((p) => initialFormValues);
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
    refreshToken,
    accountNumber: apiSecretKey,
    privateApiKey: privateKey,
  };

  const handleApiCallClick = async () => {
    const isFormNotValid = Object.values(formErrors).some((error) => error);

    if (isFormNotValid) {
      return toast({
        title: "Required Fields Error",
        description: `Please fill all the required fields`,
        variant: "destructive",
      });
    }

    await handleApiCall(
      paramValues,
      requestPayload,
      pathParams,
      queryParams,
      token,
      privateKey,
      apiSecretKey,
      refreshToken
    );
  };

  console.log(formValues, "formValues", requestPayload, "formValues");

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
              refreshToken={refreshToken}
              setRefreshToken={setRefreshToken}
              showRefreshTokenInput={[
                "/api/v1/user/get-access-token",
              ]?.includes(endpoint)}
              apiSecretKey={apiSecretKey}
              setApiSecretKey={setApiSecretKey}
              showAccountNumberInput={
                ![
                  "/api/v1/user/clock",
                  "/api/v1/user/get-account-number",
                  "/api/v1/user/ping",
                  "/api/v1/user/login",
                  "/api/v1/user/get-access-token",
                ]?.includes(endpoint) // do not show the acc number input on this endpoint's
              }
              showTokenInput={
                ![
                  "/api/v1/user/login",
                  "/api/v1/user/get-access-token",
                ].includes(endpoint)
              }
              token={token}
              setToken={setToken}
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
