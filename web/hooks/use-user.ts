'use client';

import { create } from 'zustand';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/lib/api-client';
import type { User, UpdateUserData } from '@/lib/types/user';
import { useAuth } from './use-auth';

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export function useUser(overrideStore: boolean = false) {
  const { user, setUser } = useUserStore();
  const queryClient = useQueryClient();
  const { isAuthenticated, accessToken } = useAuth();

  const { isLoading: isLoadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const data = await userApi.getMe();
      setUser(data);
      return data;
    },
    enabled: isAuthenticated && !!accessToken && (overrideStore || !user),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 1, // Only retry once to avoid infinite loops if token is invalid
  });

  const { mutateAsync: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: async (data: UpdateUserData) => {
      const updatedUser = await userApi.updateMe(data);
      setUser(updatedUser);
      return updatedUser;
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['user'], updatedUser);
    },
  });

  return {
    user,
    setUser,
    updateUser,
    isLoading: isLoadingUser || isUpdating,
  };
}
