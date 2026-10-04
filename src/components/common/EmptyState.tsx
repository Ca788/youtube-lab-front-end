import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Stack spacing={0.5} className="py-10" sx={{
      alignItems: "center"
    }}>
      <Typography variant="body1" sx={{
        color: "text.secondary"
      }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="caption" sx={{
          color: "text.disabled"
        }}>
          {description}
        </Typography>
      )}
    </Stack>
  );
}
