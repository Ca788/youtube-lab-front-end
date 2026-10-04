'use client';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useThemeMode } from '@/providers/MuiProvider';

export function ThemeToggleButton() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Tooltip title={mode === 'dark' ? 'Tema claro' : 'Tema escuro'}>
      <IconButton onClick={toggleMode} size="small">
        {mode === 'dark' ? (
          <LightModeOutlinedIcon fontSize="small" />
        ) : (
          <DarkModeOutlinedIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
}
