'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useTrackLiveStream } from '@/features/live-streams/hooks/useTrackLiveStream';
import { useSnackbar } from '@/providers/SnackbarProvider';
import { extractErrorMessage } from '@/infrastructure/AppResponse';
import {
  trackLiveStreamFormSchema,
  type TrackLiveStreamFormValues,
} from '@/features/live-streams/components/form/trackLiveStreamFormSchema';

export function TrackLiveStreamForm() {
  const { showError, showSuccess } = useSnackbar();
  const trackLiveStream = useTrackLiveStream();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TrackLiveStreamFormValues>({
    resolver: zodResolver(trackLiveStreamFormSchema),
    defaultValues: { url: '' },
  });

  const onSubmit = async (values: TrackLiveStreamFormValues) => {
    try {
      const liveStream = await trackLiveStream.mutateAsync(values);
      showSuccess(`Monitorando "${liveStream.title ?? liveStream.video_id}".`);
      reset();
    } catch (error) {
      showError(extractErrorMessage(error, 'Nao foi possivel monitorar essa live.'));
    }
  };

  return (
    <Paper className="p-4">
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          alignItems: { xs: 'stretch', sm: 'flex-start' }
        }}
      >
        <TextField
          fullWidth
          label="URL ou ID do video"
          placeholder="https://www.youtube.com/watch?v=..."
          error={Boolean(errors.url)}
          helperText={errors.url?.message}
          {...register('url')}
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={<AddIcon />}
          disabled={trackLiveStream.isPending}
          sx={{ minWidth: 160, height: 40 }}
        >
          {trackLiveStream.isPending ? 'Adicionando...' : 'Monitorar'}
        </Button>
      </Stack>
    </Paper>
  );
}
