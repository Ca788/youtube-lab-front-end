import { ReactNode } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      sx={{
        justifyContent: "space-between",
        alignItems: { xs: 'stretch', sm: 'center' }
      }}>
      <Stack spacing={0.5}>
        <Typography variant="h6">{title}</Typography>
        {subtitle && (
          <Typography variant="body2" sx={{
            color: "text.secondary"
          }}>
            {subtitle}
          </Typography>
        )}
      </Stack>
      {actions}
    </Stack>
  );
}
