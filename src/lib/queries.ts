import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import api from './api';

// Generic query hook creator
export function useApiQuery<TData = unknown, TVariables = unknown>(
  endpoint: string,
  variables?: TVariables,
  options?: UseQueryOptions<TData, Error, TData, [string, TVariables]>
): UseQueryResult<TData, Error> {
  return useQuery<TData, Error, TData, [string, TVariables]>({
    queryKey: [endpoint, variables as TVariables],
    queryFn: async () => {
      const response = await api.get<TData>(endpoint, { params: variables });
      return response.data;
    },
    ...options,
  });
}

// Example of a specific query hook
interface User {
  id: string;
  email: string;
  name?: string;
}

export function useUserQuery(userId: string) {
  return useApiQuery<User>(`/users/${userId}`);
}

// Example of a paginated query hook
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

interface PaginationParams {
  page: number;
  limit: number;
}

export function usePaginatedQuery<T>(
  endpoint: string,
  page: number,
  limit: number,
  options?: UseQueryOptions<PaginatedResponse<T>, Error, PaginatedResponse<T>, [string, PaginationParams]>
) {
  return useApiQuery<PaginatedResponse<T>, PaginationParams>(
    endpoint,
    { page, limit },
    options
  );
}

// Example of a search query hook
interface SearchParams {
  search: string;
}

export function useSearchQuery<T>(
  endpoint: string,
  searchTerm: string,
  options?: UseQueryOptions<T[], Error, T[], [string, SearchParams]>
) {
  return useApiQuery<T[], SearchParams>(
    endpoint,
    { search: searchTerm },
    options
  );
} 