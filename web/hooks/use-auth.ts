'use client';

import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/lib/api-client';
import { LoginInput, RegisterInput } from '@/lib/validations/auth';
import { User } from '@/lib/types/user';
import { useRouter } from 'next/navigation';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  login: (data: LoginInput) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      accessToken: null,
      user: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAccessToken: (accessToken) => set({ accessToken, isAuthenticated: !!accessToken }),
      login: async (data) => {
        const { access_token } = await authApi.login(data);
        set({
          isAuthenticated: true,
          accessToken: access_token,
        });
      },
      logout: () => {
        set({
          isAuthenticated: false,
          accessToken: null,
          user: null,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export function useLogin() {
  const router = useRouter();
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (data: LoginInput) => {
      await login(data);
    },
    onSuccess: () => {
      const searchParams = new URLSearchParams(window.location.search);
      const from = searchParams.get('from') || '/applications';
      router.push(from);
    },
  });
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterInput) => authApi.register(data),
    onSuccess: () => {
      router.push('/login');
    },
  });
}
