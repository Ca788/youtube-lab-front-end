'use client';

import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { AppHeader } from '@/components/layout/app-shell/AppHeader';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <Box className="flex flex-col flex-1 min-h-screen">
      <AppHeader />
      {children}
    </Box>
  );
}
