
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ApiUrlDisplayProps {
  url: string;
}

const ApiUrlDisplay: React.FC<ApiUrlDisplayProps> = ({ url }) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard.",
    });
  };

  return (
    <div>
      <h4 className="font-semibold mb-2">URL</h4>
      <div className="flex items-center bg-gray-50 p-2 rounded-md">
        <span className="text-xs font-mono flex-1 break-all">{url}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => copyToClipboard(url)}
          className="h-6 w-6 p-0"
        >
          <Copy className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default ApiUrlDisplay;
