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

export function useUser() {
  const { user, setUser } = useUserStore();
  const queryClient = useQueryClient();

  useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const data = await userApi.getMe();
      setUser(data);
      return data;
    },
    enabled: !user, // Only fetch if we don't have user data
  });

  const { mutateAsync: updateUser, isPending } = useMutation({
    mutationFn: (data: UpdateUserData) => userApi.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return {
    user,
    setUser,
    updateUser,
    isLoading: isPending,
  };
}
