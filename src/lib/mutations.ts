import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import api from "./api";
import { AxiosResponse } from "axios";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  token: string;
  refreshToken: string;
}

// Generic mutation hook creator

export function useApiMutation<TData = unknown, TVariables = unknown>(
  endpoint: string,
  options?: UseMutationOptions<AxiosResponse<TData>, Error, TVariables>,
  headers:  any = {}
): UseMutationResult<AxiosResponse<TData>, Error, TVariables> {
  return useMutation<AxiosResponse<TData>, Error, TVariables>({
    mutationFn: async (variables) => {
      const response = await api.post<TData>(endpoint, variables, {...headers});
      return response;    
    },
    ...options,
  });
}

// Generic mutation hook for PUT requests
export function useApiPutMutation<TData = unknown, TVariables = unknown>(
  endpoint: string,
  options?: UseMutationOptions<AxiosResponse<TData>, Error, TVariables>
): UseMutationResult<AxiosResponse<TData>, Error, TVariables> {
  return useMutation<AxiosResponse<TData>, Error, TVariables>({
    mutationFn: async (variables) => {
      const response = await api.put<TData>(endpoint, variables);
      return response; 
    },
    ...options,
  });
}

// Generic mutation hook for DELETE requests
export function useApiDeleteMutation<TData = unknown, TVariables = unknown>(
  endpoint: string,
  options?: UseMutationOptions<AxiosResponse<TData>, Error, TVariables>
): UseMutationResult<AxiosResponse<TData>, Error, TVariables> {
  return useMutation<AxiosResponse<TData>, Error, TVariables>({
    mutationFn: async (variables) => {
      const response = await api.delete<TData>(endpoint, { data: variables });
      return response; 
    },
    ...options,
  });
}
