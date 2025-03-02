'use client';

import { useAuth } from '@/hooks/use-auth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const publicPaths = ['/login', '/register', '/forgot-password'];
const protectedPaths = ['/applications', '/account', '/dashboard'];

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isProtectedPath = protectedPaths.some(path =>
      pathname.startsWith(path)
    );
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

    if (isProtectedPath && !isAuthenticated) {
      router.push(`/login?from=${pathname}`);
    } else if (isPublicPath && isAuthenticated) {
      router.push('/applications');
    }
  }, [isAuthenticated, pathname, router]);

  // Don't render children while redirecting from root
  if (pathname === '/') {
    return null;
  }

  return <>{children}</>;
}
