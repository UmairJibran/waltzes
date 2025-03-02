'use client'

import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/lib/api-client';
import { LoginInput, RegisterInput } from '@/lib/validations/auth';
import { useRouter } from 'next/navigation';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
  } | null;
  setUser: (user: AuthState['user']) => void;
  login: (data: LoginInput) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: async (data) => {
        const user = await authApi.login(data);
        set({
          isAuthenticated: true,
          user: {
            id: user.id,
            email: user.email,
          },
        });
      },
      logout: () => {
        set({
          isAuthenticated: false,
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
    onSuccess: (_, variables) => {
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