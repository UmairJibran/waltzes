'use client'

import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/lib/api-client';
import { LoginInput, RegisterInput } from '@/lib/validations/auth';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
    onSuccess: () => {
      router.push('/dashboard');
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