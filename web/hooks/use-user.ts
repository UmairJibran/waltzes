'use client';

import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/lib/api-client';
import { User } from '@/lib/types/user';
import { useAuth } from './use-auth';

export function useUser() {
  const { user, setUser, accessToken, isAuthenticated } = useAuth();

  const { data } = useQuery<User>({
    queryKey: ['user'],
    queryFn: () => userApi.getMe(),
    enabled: isAuthenticated && !user && !!accessToken,
    staleTime: Infinity,
  });

  if (data && !user) {
    setUser(data);
  }

  return { user: user || data };
} 
