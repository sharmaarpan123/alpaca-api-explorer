
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { ProgrammingLanguage } from "./CodeSnippet";
import ParamEditor from "./ParamEditor";
import RequestBodyEditor from "./RequestBodyEditor";

interface ParamField {
  type: string;
  description: string;
}

interface ParamsObject {
  [key: string]: ParamField;
}

interface ApiEndpointTabsProps {
  method: string;
  requiresAuth: boolean;
  token?: string;
  requestPayload: string;
  setRequestPayload: (payload: string) => void;
  pathParams?: ParamsObject;
  queryParams?: ParamsObject;
  requestBody?: Record<string, any>;
  paramValues: Record<string, string>;
  handleParamChange: (key: string, value: string) => void;
  selectedLanguage: ProgrammingLanguage;
  onLanguageChange: (language: ProgrammingLanguage) => void;
  error: string | null;
  response: any;
  children?: React.ReactNode;
}

const ApiEndpointTabs: React.FC<ApiEndpointTabsProps> = ({
  method,
  requestPayload,
  setRequestPayload,
  pathParams,
  queryParams,
  requestBody,
  paramValues,
  handleParamChange,
}) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="py-2 px-3">
        <CardTitle className="text-base">Request Details</CardTitle>
      </CardHeader>
      <CardContent className="py-2 px-3 text-sm space-y-3">
        {pathParams && Object.keys(pathParams).length > 0 && (
          <ParamEditor
            title="Path Parameters"
            params={pathParams}
            paramValues={paramValues}
            onParamChange={handleParamChange}
          />
        )}

        {queryParams && Object.keys(queryParams).length > 0 && (
          <ParamEditor
            title="Query Parameters"
            params={queryParams}
            paramValues={paramValues}
            onParamChange={handleParamChange}
          />
        )}

        {(method === 'POST' || method === 'PUT' || method === 'PATCH') && requestBody && (
          <RequestBodyEditor
            requestPayload={requestPayload}
            setRequestPayload={setRequestPayload}
            method={method}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ApiEndpointTabs;
