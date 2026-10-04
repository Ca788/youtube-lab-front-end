'use client';

import { selectAuthState } from '@/store/slices/auth.slice';
import { useAppSelector } from '@/store/hooks';

export function useCurrentUser() {
  const { user, status, loading } = useAppSelector(selectAuthState);

  return {
    user,
    isLoading: loading || status === 'idle',
    isAuthenticated: status === 'authorized',
    isUnauthenticated: status === 'unauthorized',
  };
}
