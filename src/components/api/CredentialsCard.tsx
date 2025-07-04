import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

interface CredentialsCardProps {
  apiSecretKey: string;
  setApiSecretKey: (value: string) => void;
  showAccountNumberInput: boolean;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  refreshToken: string;
  showTokenInput: boolean;
  showRefreshTokenInput: boolean;
}

const CredentialsCard: React.FC<CredentialsCardProps> = ({
  apiSecretKey,
  setApiSecretKey,
  showAccountNumberInput,
  showTokenInput,
  setToken,
  token,
  showRefreshTokenInput,
  refreshToken,
  setRefreshToken,
}) => {
  const { privateKey } = useAuth();
  return (
    <Card className="bg-gray-900 text-gray-200 border-gray-800 shadow-sm mb-4">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-gray-200 text-base">Credentials</CardTitle>
      </CardHeader>
      <CardContent className="py-3 px-4">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium block mb-1 text-gray-300">
              API Key ID
            </label>
            <Input
              type="text"
              placeholder="APCA-API-KEY-ID"
              className="bg-gray-800 h-8 text-xs border-gray-700 text-gray-200 focus:ring-blue-500"
              value={privateKey}
              disabled
            />
          </div>
          {showAccountNumberInput && (
            <div>
              <label className="text-xs font-medium block mb-1 text-gray-300">
                Account Number
              </label>
              <Input
                placeholder="APCA-ACCOUNT-NUMBER"
                className="bg-gray-800 h-8 text-xs border-gray-700 text-gray-200 focus:ring-blue-500"
                value={apiSecretKey}
                onChange={(e) => setApiSecretKey(e.target.value)}
              />
            </div>
          )}
          {showTokenInput && (
            <div>
              <label className="text-xs font-medium block mb-1 text-gray-300">
                Token
              </label>
              <Input
                placeholder="Access Token"
                className="bg-gray-800 h-8 text-xs border-gray-700 text-gray-200 focus:ring-blue-500"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
          )}
          {showRefreshTokenInput && (
            <div>
              <label className="text-xs font-medium block mb-1 text-gray-300">
                Refresh Token
              </label>
              <Input
                placeholder="Access Token"
                className="bg-gray-800 h-8 text-xs border-gray-700 text-gray-200 focus:ring-blue-500"
                value={refreshToken}
                onChange={(e) => setRefreshToken(e.target.value)}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CredentialsCard;
