
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

interface CredentialsCardProps {
  apiKeyId: string;
  apiSecretKey: string;
  setApiKeyId: (value: string) => void;
  setApiSecretKey: (value: string) => void;
}

const CredentialsCard: React.FC<CredentialsCardProps> = ({
  apiKeyId,
  apiSecretKey,
  setApiKeyId,
  setApiSecretKey
}) => {
  return (
    <Card className="bg-gray-900 text-gray-200 border-gray-800 shadow-sm mb-4">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-gray-200 text-base">Credentials</CardTitle>
      </CardHeader>
      <CardContent className="py-3 px-4">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium block mb-1 text-gray-300">API Key ID</label>
            <Input 
              type="text" 
              placeholder="APCA-API-KEY-ID" 
              className="bg-gray-800 h-8 text-xs border-gray-700 text-gray-200 focus:ring-blue-500"
              value={apiKeyId}
              onChange={(e) => setApiKeyId(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-medium block mb-1 text-gray-300">Account Number</label>
            <Input 
              // type="password" 
              placeholder="APCA-ACCOUNT-NUMBER" 
              className="bg-gray-800 h-8 text-xs border-gray-700 text-gray-200 focus:ring-blue-500"
              value={apiSecretKey}
              onChange={(e) => setApiSecretKey(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CredentialsCard;
