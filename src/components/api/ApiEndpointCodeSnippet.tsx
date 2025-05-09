
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgrammingLanguage } from './CodeSnippet';
import CodeSnippetGenerator from './CodeSnippetGenerator';
import LanguageSelector from './LanguageSelector';
import ResponseDisplay from './ResponseDisplay';

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
  const supportedLanguages: ProgrammingLanguage[] = ['shell', 'python', 'node', 'php', 'ruby'];
  
  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-md">
      <CardHeader className="py-3 px-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">Code Snippet</CardTitle>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
            supportedLanguages={supportedLanguages}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CodeSnippetGenerator
          language={selectedLanguage}
          method={method}
          url={endpointUrl}
          headers={headers}
          body={requestPayload}
        />
        
        {response && (
          <div className="mt-4">
            <ResponseDisplay response={response} error={error} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiEndpointCodeSnippet;
