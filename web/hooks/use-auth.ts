'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/lib/api-client';
import { LoginInput, RegisterInput } from '@/lib/validations/auth';

interface AuthStore {
  accessToken: string | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string | null) => void;
  login: (data: LoginInput) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      setAccessToken: (token) => set({ accessToken: token, isAuthenticated: !!token }),
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
        });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export function useAuth() {
  const { accessToken, isAuthenticated, setAccessToken, login, logout } = useAuthStore();

  return {
    accessToken,
    isAuthenticated,
    setAccessToken,
    login,
    logout,
  };
}

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
