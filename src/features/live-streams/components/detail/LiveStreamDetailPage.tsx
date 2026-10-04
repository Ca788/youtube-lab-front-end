'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LiveStreamSummary } from '@/features/live-streams/components/detail/LiveStreamSummary';
import { ViewersChart } from '@/features/live-streams/components/detail/ViewersChart';
import { ParticipantsTable } from '@/features/live-streams/components/detail/ParticipantsTable';
import { useLiveStream } from '@/features/live-streams/hooks/useLiveStream';
import { useSyncLiveStream } from '@/features/live-streams/hooks/useSyncLiveStream';
import { useSnackbar } from '@/providers/SnackbarProvider';
import { extractErrorMessage } from '@/infrastructure/AppResponse';
import { AppRoutePaths } from '@/constants/AppRoutePaths';

export function LiveStreamDetailPage() {
  const params = useParams<{ id: string }>();
  const id = typeof params.id === 'string' ? params.id : null;

  const { showError, showSuccess } = useSnackbar();
  const syncLiveStream = useSyncLiveStream();
  const { data: liveStream, isLoading, isError } = useLiveStream(id);

  useEffect(() => {
    if (!id) return;

    syncLiveStream.mutate(id);

    const timer = window.setInterval(() => {
      syncLiveStream.mutate(id);
    }, 15_000);

    return () => window.clearInterval(timer);
  }, [id]);

  const handleSync = async () => {
    if (!id) return;

    try {
      await syncLiveStream.mutateAsync(id);
      showSuccess('Live sincronizada com a API do YouTube.');
    } catch (error) {
      showError(extractErrorMessage(error, 'Falha ao sincronizar a live.'));
    }
  };

  return (
    <Stack spacing={3}>
      <Button
        component={Link}
        href={AppRoutePaths.LIVE_STREAMS}
        startIcon={<ArrowBackIcon />}
        size="small"
        className="self-start"
      >
        Voltar
      </Button>

      {!id && <Alert severity="warning">Informe o id da live na URL.</Alert>}

      {isError && <Alert severity="error">Live nao encontrada.</Alert>}

      {isLoading && (
        <Stack className="py-10" sx={{
          alignItems: "center"
        }}>
          <CircularProgress />
        </Stack>
      )}

      {liveStream && (
        <>
          <LiveStreamSummary
            liveStream={liveStream}
            isSyncing={syncLiveStream.isPending}
            onSync={handleSync}
          />
          <ViewersChart liveStreamId={liveStream.id} />
          <ParticipantsTable liveStreamId={liveStream.id} />
        </>
      )}
    </Stack>
  );
}
