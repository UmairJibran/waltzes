'use client';

import { create } from 'zustand';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/lib/api-client';
import type { User, UpdateUserData } from '@/lib/types/user';

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

  useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const data = await userApi.getMe();
      setUser(data);
      return data;
    },
    enabled: overrideStore || !user,
  });

  const { mutateAsync: updateUser, isPending } = useMutation({
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
    isLoading: isPending,
  };
}
