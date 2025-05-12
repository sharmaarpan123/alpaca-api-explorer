
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DocumentationContent from './DocumentationContent';
import ApiUrlDisplay from './ApiUrlDisplay';
import HeadersDisplay from './HeadersDisplay';
import ParamEditor from './ParamEditor';
import RequestBodyEditor from './RequestBodyEditor';
import { Button } from '@/components/ui/button';
import { ProgrammingLanguage } from './CodeSnippet';
import ResponseDisplay from './ResponseDisplay';
import api from '@/lib/api';
import axios from 'axios';

interface ParamField {
  type: string;
  description: string;
}

interface ParamsObject {
  [key: string]: ParamField;
}

interface ApiEndpointTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  endpointUrl: string;
  method: string;
  requiresAuth: boolean;
  token?: string;
  apiKeyId?: string;
  requestPayload: string;
  setRequestPayload: (payload: string) => void;
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

const ApiEndpointTabs: React.FC<ApiEndpointTabsProps> = ({
  activeTab,
  setActiveTab,
  endpointUrl,
  method,
  requiresAuth,
  token,
  apiKeyId,
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
  children
}) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(requiresAuth ? {'Authorization': `Bearer ${token || apiKeyId || '[YOUR_TOKEN]'}`} : {})
  };

  return (
    <Tabs defaultValue="documentation" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-3 w-full justify-start h-8 p-1">
        <TabsTrigger value="documentation" className="text-xs h-6">Documentation</TabsTrigger>
        <TabsTrigger value="request" className="text-xs h-6">Request</TabsTrigger>
        <TabsTrigger value="response" className="text-xs h-6">Response</TabsTrigger>
      </TabsList>
      
      <TabsContent value="documentation" className="pt-1">
        <Card className="shadow-sm">
          <CardHeader className="py-2 px-3">
            <CardTitle className="text-base">API Details</CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-3 text-sm">
            <DocumentationContent
              requiresAuth={requiresAuth}
              pathParams={pathParams}
              queryParams={queryParams}
              requestBody={requestBody}
            >
              {children}
            </DocumentationContent>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="request" className="pt-1">
        <Card className="shadow-sm">
          <CardHeader className="py-2 px-3">
            <CardTitle className="text-base">Request Details</CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-3 text-sm space-y-3">
            <ApiUrlDisplay url={endpointUrl} />
            
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
            
            <HeadersDisplay 
              requiresAuth={requiresAuth} 
              token={token} 
              apiKeyId={apiKeyId} 
            />
            
            {(method === 'POST' || method === 'PUT' || method === 'PATCH') && requestBody && (
              <RequestBodyEditor
                requestPayload={requestPayload}
                setRequestPayload={setRequestPayload}
                method={method}
                onTryItClick={handleApiCall}
              />
            )}
            
            {(!['POST', 'PUT', 'PATCH'].includes(method) || !requestBody) && (
              <Button onClick={handleApiCall} disabled={isLoading} className="w-full h-8 text-sm">
                {isLoading ? 'Sending...' : 'Try It!'}
              </Button>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="response" className="pt-1">
        <Card className="shadow-sm">
          <CardHeader className="py-2 px-3">
            <CardTitle className="text-base">Response</CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-3 text-sm">
            <ResponseDisplay
              isLoading={isLoading}
              error={error}
              response={response}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ApiEndpointTabs;
