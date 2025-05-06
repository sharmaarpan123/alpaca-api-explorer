
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface ApiRequestOptions extends RequestInit {
  requireAuth?: boolean;
}

export const useApiService = () => {
  const { token, refreshAccessToken, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();

  const apiRequest = async <T>(
    endpoint: string, 
    options: ApiRequestOptions = {}
  ): Promise<T> => {
    const { requireAuth = true, ...fetchOptions } = options;
    
    if (requireAuth && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this resource",
        variant: "destructive",
      });
      throw new Error('Authentication required');
    }

    try {
      // Prepare headers
      const headers = new Headers(fetchOptions.headers);
      
      if (requireAuth && token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      
      if (!headers.has('Content-Type') && fetchOptions.body) {
        headers.set('Content-Type', 'application/json');
      }

      // Make the API request
      const response = await fetch(`${endpoint}`, {
        ...fetchOptions,
        headers,
      });

      // Handle 401 Unauthorized - attempt token refresh
      if (response.status === 401 && requireAuth) {
        const refreshSuccessful = await refreshAccessToken();
        
        if (refreshSuccessful) {
          // Retry the request with the new token
          return apiRequest(endpoint, options);
        } else {
          // If refresh failed, force logout
          logout();
          throw new Error('Session expired. Please log in again.');
        }
      }

      // Handle other error responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Request failed with status ${response.status}`;
        throw new Error(errorMessage);
      }

      // Parse and return the response data
      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
      toast({
        title: "API Request Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  return { apiRequest };
};
