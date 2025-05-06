
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  refreshAccessToken: () => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    refreshToken: null,
    isLoading: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    // Check localStorage for existing auth data when the app loads
    const loadAuthData = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        
        if (storedUser && storedToken && storedRefreshToken) {
          setAuthState({
            user: JSON.parse(storedUser),
            token: storedToken,
            refreshToken: storedRefreshToken,
            isLoading: false,
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Error loading auth data from localStorage:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadAuthData();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      // Mock login API call (replace with actual API call)
      // const response = await fetch('https://api.example.com/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials),
      // });
      // const data = await response.json();
      
      // For demonstration, using mock data
      const mockResponse: LoginResponse = {
        user: { 
          id: '123', 
          email: credentials.email,
          name: 'Demo User'
        },
        token: 'mock-auth-token',
        refreshToken: 'mock-refresh-token',
      };

      // Save auth data to localStorage
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('refreshToken', mockResponse.refreshToken);
      
      // Update state
      setAuthState({
        user: mockResponse.user,
        token: mockResponse.token,
        refreshToken: mockResponse.refreshToken,
        isLoading: false,
      });
      
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${mockResponse.user.name || mockResponse.user.email}!`,
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    // Clear auth data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    
    // Reset state
    setAuthState({
      user: null,
      token: null,
      refreshToken: null,
      isLoading: false,
    });
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const refreshAccessToken = async (): Promise<boolean> => {
    if (!authState.refreshToken) {
      return false;
    }

    try {
      // Mock API call to refresh token
      // const response = await fetch('https://api.example.com/refresh-token', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ refreshToken: authState.refreshToken }),
      // });
      // const data = await response.json();
      
      // Mock response
      const newToken = 'new-mock-auth-token';
      
      // Save new token to localStorage
      localStorage.setItem('token', newToken);
      
      // Update state
      setAuthState(prev => ({
        ...prev,
        token: newToken,
      }));
      
      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      // If refresh token is expired or invalid, log the user out
      logout();
      return false;
    }
  };

  const value = {
    ...authState,
    login,
    logout,
    refreshAccessToken,
    isAuthenticated: !!authState.token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
