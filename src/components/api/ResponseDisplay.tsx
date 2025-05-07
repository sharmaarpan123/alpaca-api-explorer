
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
      <div className="flex justify-center items-center p-6">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md text-xs">
        <p className="font-medium">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (response) {
    return (
      <div className="relative">
        <pre className="bg-gray-50 p-3 rounded-md text-xs overflow-auto max-h-96">
          {JSON.stringify(response, null, 2)}
        </pre>
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute top-2 right-2 h-6 w-6 p-0"
          onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
        >
          <Copy className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <div className="text-gray-500 p-6 text-center border rounded-md bg-gray-50 text-xs">
      <p className="mb-1">Click "Try It!" to send a request</p>
      <p className="text-xs">Or choose an example from the dropdown</p>
    </div>
  );
};

export default ResponseDisplay;
