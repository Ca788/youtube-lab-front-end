'use client';

import { useState } from 'react';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import { PageHeader } from '@/components/common/PageHeader';
import { DataPagination } from '@/components/common/DataPagination';
import { TrackLiveStreamForm } from '@/features/live-streams/components/form/TrackLiveStreamForm';
import { CatalogLivesSection } from '@/features/live-streams/components/catalog/CatalogLivesSection';
import { LiveStreamsTable } from '@/features/live-streams/components/list/LiveStreamsTable';
import {
  LiveStreamsFilters,
  type StatusFilterValue,
  type TrackingFilterValue,
} from '@/features/live-streams/components/list/LiveStreamsFilters';
import { useLiveStreams } from '@/features/live-streams/hooks/useLiveStreams';
import { useSyncLiveStream } from '@/features/live-streams/hooks/useSyncLiveStream';
import { useStopTrackingLiveStream } from '@/features/live-streams/hooks/useStopTrackingLiveStream';
import { useSnackbar } from '@/providers/SnackbarProvider';
import { extractErrorMessage } from '@/infrastructure/AppResponse';
import type { LiveStream } from '@/features/live-streams/models/live-stream.model';

function trackingParam(value: TrackingFilterValue): boolean | undefined {
  switch (value) {
    case 'all':
      return undefined;
    case 'tracking':
      return true;
    case 'stopped':
      return false;
    default: {
      const exhaustiveCheck: never = value;
      return exhaustiveCheck;
    }
  }
}

export function LiveStreamsPage() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [status, setStatus] = useState<StatusFilterValue>('all');
  const [tracking, setTracking] = useState<TrackingFilterValue>('all');

  const { showError, showSuccess } = useSnackbar();
  const syncLiveStream = useSyncLiveStream();
  const stopTracking = useStopTrackingLiveStream();

  const { data, isLoading, isFetching, isError } = useLiveStreams({
    page,
    perPage,
    status: status === 'all' ? undefined : status,
    tracking: trackingParam(tracking),
  });

  const liveStreams = data?.data ?? [];
  const totalCount = data?.pagination.totalCount ?? 0;

  const handleSync = async (id: string) => {
    try {
      await syncLiveStream.mutateAsync(id);
      showSuccess('Live sincronizada com a API do YouTube.');
    } catch (error) {
      showError(extractErrorMessage(error, 'Falha ao sincronizar a live.'));
    }
  };

  const handleStopTracking = async (liveStream: LiveStream) => {
    try {
      await stopTracking.mutateAsync(liveStream.id);
      showSuccess('Monitoramento interrompido.');
    } catch (error) {
      showError(extractErrorMessage(error, 'Falha ao parar o monitoramento.'));
    }
  };

  const handlePerPageChange = (next: number) => {
    setPerPage(next);
    setPage(1);
  };

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Lives monitoradas"
        subtitle="Audiencia simultanea e chat capturado pela API do YouTube."
      />

      <CatalogLivesSection />

      <TrackLiveStreamForm />

      <LiveStreamsFilters
        status={status}
        tracking={tracking}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
        onTrackingChange={(value) => {
          setTracking(value);
          setPage(1);
        }}
      />

      {isError && <Alert severity="error">Erro ao carregar as lives monitoradas.</Alert>}
      {isFetching && !isLoading && <LinearProgress />}

      <LiveStreamsTable
        liveStreams={liveStreams}
        isLoading={isLoading}
        syncingId={syncLiveStream.isPending ? syncLiveStream.variables : undefined}
        onSync={handleSync}
        onStopTracking={handleStopTracking}
      />

      {totalCount > 0 && (
        <DataPagination
          page={page}
          perPage={perPage}
          totalCount={totalCount}
          onPageChange={setPage}
          onPerPageChange={handlePerPageChange}
        />
      )}
    </Stack>
  );
}
