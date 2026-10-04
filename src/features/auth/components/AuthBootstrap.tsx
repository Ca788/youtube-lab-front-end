'use client';

import { useEffect } from 'react';
import { getUserFromToken, selectAuthState } from '@/store/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export function AuthBootstrap() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectAuthState);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getUserFromToken());
    }
  }, [dispatch, status]);

  return null;
}
