
import { useState } from 'react';
import { makeApiCall, prepareQueryParams, replacePahParams } from '../utils/apiUtils';
import { ParamsObject } from '@/data/apiEndpoints';
import { toast } from 'sonner';

interface UseApiCallProps {
  method: string;
  endpoint: string;
  requiresAuth?: boolean;
}

export const useApiCall = ({ method, endpoint, requiresAuth = true }: UseApiCallProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleApiCall = async (
    paramValues: Record<string, string>,
    requestPayload: string,
    pathParams?: ParamsObject,
    queryParams?: ParamsObject,
    token?: string,
    apiKeyId?: string,
    apiSecretKey?: string
  ) => {
    if (requiresAuth && !token && !apiKeyId) {
      toast.error("Authentication Required", {
        description: "Please provide API credentials to access this endpoint",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      let parsedPayload: Record<string, any> = {};
      
      // Parse the request payload if it's present
      if (requestPayload) {
        try {
          parsedPayload = JSON.parse(requestPayload);
        } catch (e) {
          console.error("Error parsing request payload:", e);
          setError("Invalid JSON in request payload");
          setIsLoading(false);
          return;
        }
      }

      // Prepare query parameters
      const queryParamsObj = prepareQueryParams(queryParams, paramValues);

      // Replace path parameters in the endpoint
      const apiEndpoint = replacePahParams(endpoint, pathParams, paramValues);
      
      // Make API call
      const { data, error: apiError } = await makeApiCall(
        method,
        endpoint,
        parsedPayload,
        queryParamsObj,
        apiEndpoint,
        token,
        apiKeyId,
        apiSecretKey
      );
      
      setResponse(data);
      if (apiError) {
        setError(apiError);
      }
    } catch (err: any) {
      console.error('API call error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    response,
    error,
    handleApiCall,
    setResponse,
    setError
  };
};

export default useApiCall;
