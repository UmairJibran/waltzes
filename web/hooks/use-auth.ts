'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/lib/api-client';
import { LoginInput, RegisterInput } from '@/lib/validations/auth';

interface AuthStore {
  accessToken: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
  setAccessToken: (token: string | null) => void;
  login: (data: LoginInput) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      isHydrated: false,
      setHydrated: (hydrated) => set({ isHydrated: hydrated }),
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
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);

// Hook to protect routes
export function useAuthProtection() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  const publicPaths = ['/login', '/register'];
  const isPublicPath = publicPaths.some((path) => pathname?.startsWith(path));

  useEffect(() => {
    // Only redirect to login if we're definitely not authenticated
    if (!isAuthenticated && !isPublicPath) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    }

    // Only redirect away from login/register if we're definitely authenticated
    if (isAuthenticated && isPublicPath) {
      const searchParams = new URLSearchParams(window.location.search);
      const from = searchParams.get('from');
      router.replace(from || '/applications');
    }
  }, [isAuthenticated, isPublicPath, pathname, router]);

  return { isAuthenticated, isPublicPath };
}

export function useAuth() {
  const { accessToken, isAuthenticated, isHydrated, setAccessToken, login, logout } = useAuthStore();

  return {
    accessToken,
    isAuthenticated,
    isHydrated,
    setAccessToken,
    login,
    logout,
  };
}

export function useLogin() {
  const router = useRouter();
  const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data: LoginInput) => {
      await login(data);
    },
    onSuccess: () => {
      const searchParams = new URLSearchParams(window.location.search);
      const from = searchParams.get('from');
      router.replace(decodeURIComponent(from || '/applications'));
    },
  });

  return mutation;
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
