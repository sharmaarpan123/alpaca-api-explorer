
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgrammingLanguage } from './CodeSnippet';
import CodeSnippetGenerator from './CodeSnippetGenerator';
import LanguageSelector from './LanguageSelector';
import ResponseDisplay from './ResponseDisplay';
import { Button } from '@/components/ui/button';

interface ApiEndpointCodeSnippetProps {
  method: string;
  endpointUrl: string;
  headers: Record<string, string>;
  requestPayload?: string;
  selectedLanguage: ProgrammingLanguage;
  onLanguageChange: (language: ProgrammingLanguage) => void;
  isLoading: boolean;
  onTryItClick?: () => void;
  error: string | null;
  response: any;
}

const ApiEndpointCodeSnippet: React.FC<ApiEndpointCodeSnippetProps> = ({
  method,
  endpointUrl,
  headers,
  requestPayload,
  selectedLanguage,
  onLanguageChange,
  isLoading,
  onTryItClick,
  error,
  response
}) => {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-md">
      <CardHeader className="py-3 px-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">Code Snippet</CardTitle>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CodeSnippetGenerator
          method={method}
          url={endpointUrl}
          headers={headers}
          body={requestPayload}
          selectedLanguage={selectedLanguage}
          onLanguageChange={onLanguageChange}
        />
        
        {onTryItClick && (
          <Button 
            className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700" 
            type="button"
            onClick={onTryItClick}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Try It!'}
          </Button>
        )}
        
        {(response || isLoading || error) && (
          <div className="mt-4">
            <ResponseDisplay isLoading={isLoading} response={response} error={error} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiEndpointCodeSnippet;
