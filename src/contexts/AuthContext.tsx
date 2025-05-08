import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useReducer,
} from "react";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  token: string | null;
  isLoading: boolean;
  accountId: string | null;
}

export const authContextActionsTypeEnum = {
  LOGIN: "LOGIN",
  LOG_OUT: "LOG_OUT",
  SET_AUTH_STATE: "SET_AUTH_STATE",
};

interface AuthContextType extends AuthState {
  logout: () => void;
  isAuthenticated: boolean;
  authDispatch: (action: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const authReducer = (state: AuthState, action: any) => {
  switch (action.type) {
    case authContextActionsTypeEnum.LOGIN:
      return { ...state, ...action.payload };

    case authContextActionsTypeEnum.LOG_OUT:
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accountId");
      return { ...state, user: null, token: null };

    case authContextActionsTypeEnum.SET_AUTH_STATE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { toast } = useToast();

  const [authState, dispatch] = useReducer(authReducer, {
    token: null,
    isLoading: true,
    accountId: null,
  });

  useEffect(() => {
    // Check localStorage for existing auth data when the app loads
    const loadAuthData = () => {
      try {
        const storedToken = localStorage.getItem("token");
        const accountId = localStorage.getItem("accountId");
        const refreshToken = localStorage.getItem("refreshToken");
        if (storedToken && accountId && refreshToken) {
          dispatch({
            type: authContextActionsTypeEnum.LOGIN,
            payload: {
              accountId,
              token: storedToken,
              isLoading: false,
            },
          });
        } else {
          dispatch({
            type: authContextActionsTypeEnum.SET_AUTH_STATE,
            payload: {
              isLoading: false,
            },
          });
        }
      } catch (error) {
        console.error("Error loading auth data from localStorage:", error);
        dispatch({
          type: authContextActionsTypeEnum.SET_AUTH_STATE,
          payload: {
            isLoading: false,
          },
        });
      }
    };

    loadAuthData();
  }, []);

  const logout = () => {
    // Clear auth data from localStorage

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accountId");

    // Reset state
    dispatch({
      type: authContextActionsTypeEnum.SET_AUTH_STATE,
      payload: {
        token: null,
        accountId: null,
      },
    });

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const value = {
    ...authState,
    logout,
    isAuthenticated: !!authState.token,
    authDispatch: dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
