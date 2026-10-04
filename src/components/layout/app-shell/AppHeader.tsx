'use client';

import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import { ThemeToggleButton } from '@/components/common/ThemeToggleButton';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { logout } from '@/store/slices/auth.slice';
import { useAppDispatch } from '@/store/hooks';
import { AppRoutePaths } from '@/constants/AppRoutePaths';

export function AppHeader() {
  const { user } = useCurrentUser();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    window.location.replace(AppRoutePaths.LOGIN);
  };

  return (
    <AppBar position="sticky">
      <Toolbar className="gap-3">
        <Stack
          component={Link}
          href={AppRoutePaths.LIVE_STREAMS}
          direction="row"
          spacing={1}
          className="flex-1 no-underline"
          sx={{
            alignItems: "center",
            color: 'text.primary'
          }}>
          <SmartDisplayOutlinedIcon sx={{ color: 'primary.main' }} />
          <Typography variant="subtitle1" sx={{
            fontWeight: 600
          }}>
            YouTube Lab
          </Typography>
        </Stack>

        <ThemeToggleButton />

        {user && (
          <Tooltip title={user.email}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.dark', fontSize: 14 }}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
          </Tooltip>
        )}

        <Button
          size="small"
          color="inherit"
          startIcon={<LogoutOutlinedIcon fontSize="small" />}
          onClick={handleLogout}
        >
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  );
}
