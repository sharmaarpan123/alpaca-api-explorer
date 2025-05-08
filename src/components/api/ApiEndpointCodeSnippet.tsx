
import React from 'react';
import { Button } from '@/components/ui/button';
import { ProgrammingLanguage } from './CodeSnippet';
import CodeSnippetGenerator from './CodeSnippetGenerator';
import ResponseDisplay from './ResponseDisplay';

interface ApiEndpointCodeSnippetProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpointUrl: string;
  headers: Record<string, string>;
  requestPayload?: string;
  selectedLanguage: ProgrammingLanguage;
  onLanguageChange: (language: ProgrammingLanguage) => void;
  isLoading: boolean;
  onTryItClick: () => void;
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
    <div className="bg-gray-900 text-gray-200 border-gray-800 shadow-sm rounded-md">
      <CodeSnippetGenerator
        method={method}
        url={endpointUrl}
        headers={headers}
        requestPayload={['POST', 'PUT', 'PATCH'].includes(method) ? requestPayload : undefined}
        selectedLanguage={selectedLanguage}
        onLanguageChange={onLanguageChange}
        limitedLanguages={true}
      />
      
      <div className="p-2 flex justify-center border-t border-gray-800">
        <Button 
          onClick={onTryItClick} 
          disabled={isLoading} 
          className="w-full h-8 text-sm"
        >
          {isLoading ? 'Sending...' : 'Try It!'}
        </Button>
      </div>

      <div className="border-t border-gray-800 p-2">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-gray-200 font-semibold text-sm">RESPONSE</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">EXAMPLES</span>
          </div>
        </div>
        <ResponseDisplay 
          isLoading={isLoading}
          error={error}
          response={response}
        />
      </div>
    </div>
  );
};

export default ApiEndpointCodeSnippet;
