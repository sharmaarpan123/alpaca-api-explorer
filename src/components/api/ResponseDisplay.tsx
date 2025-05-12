
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { checkResponse } from '@/utilities/commonFuncs';

interface ResponseDisplayProps {
  isLoading: boolean;
  error: string | null;
  response: any;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({
  isLoading,
  error,
  response
}) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6 text-gray-200">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  // Extract API response status information
  const apiResponseStatus = response ? checkResponse({ res: response }) : null;

  // Handle API-specific error (when there's a response but status code is not 200)
  if (response && !apiResponseStatus?.success) {
    return (
      <div className="mt-4 space-y-4">
        <div className="relative">
          <h4 className="font-semibold text-gray-700 text-sm mb-2">RESPONSE</h4>
          <pre className="bg-gray-800 p-3 rounded-md text-xs overflow-auto max-h-96 text-gray-300">
            {JSON.stringify(response, null, 2)}
          </pre>
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-8 right-2 h-6 w-6 p-0 bg-gray-700 hover:bg-gray-600 text-gray-300"
            onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </div>
    );
  }

  // Handle network/request error (no response object)
  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-700/30 text-red-400 p-3 rounded-md text-xs">
        <p className="font-medium">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  // Handle success response
  if (response && apiResponseStatus?.success) {
    return (
      <div className="mt-4 space-y-4">
        <Alert className="bg-green-900/20 border-green-700/30">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle className="text-green-500">Success</AlertTitle>
          <AlertDescription className="text-green-400 text-sm">
            {apiResponseStatus.message}
          </AlertDescription>
        </Alert>
        
        <div className="relative">
          <h4 className="font-semibold text-gray-700 text-sm mb-2">RESPONSE</h4>
          <pre className="bg-gray-800 p-3 rounded-md text-xs overflow-auto max-h-96 text-gray-300">
            {JSON.stringify(response, null, 2)}
          </pre>
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-8 right-2 h-6 w-6 p-0 bg-gray-700 hover:bg-gray-600 text-gray-300"
            onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </div>
    );
  }

  // Default state (no request made yet)
  return (
    <div className="text-gray-400 p-6 text-center bg-gray-800/50 rounded-md text-xs mt-4">
      <p>Click "Try It!" to start a request and see the response here!</p>
      <p className="text-xs mt-1">Or choose an example.</p>
      <div className="mt-3 text-center">
        <div className="inline-block bg-gray-800 text-gray-400 px-2 py-1 rounded text-xs">application/json</div>
        <div className="mt-1">
          <span className="inline-flex items-center bg-green-800/20 text-green-400 px-2 py-0.5 rounded text-xs font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
            200
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResponseDisplay;
