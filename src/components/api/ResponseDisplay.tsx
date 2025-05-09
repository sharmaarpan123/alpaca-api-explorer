
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-700/30 text-red-400 p-3 rounded-md text-xs">
        <p className="font-medium">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (response) {
    return (
      <div className="relative mt-4">
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
    );
  }

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
