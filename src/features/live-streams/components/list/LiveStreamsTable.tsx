'use client';

import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import { EmptyState } from '@/components/common/EmptyState';
import { LiveStreamStatusChip } from '@/features/live-streams/components/common/LiveStreamStatusChip';
import { AppRoutePaths } from '@/constants/AppRoutePaths';
import { formatDateTime, formatNumber } from '@/utils/format';
import type { LiveStream } from '@/features/live-streams/models/live-stream.model';

interface LiveStreamsTableProps {
  liveStreams: LiveStream[];
  isLoading: boolean;
  syncingId?: string;
  onSync: (id: string) => void;
  onStopTracking: (liveStream: LiveStream) => void;
}

export function LiveStreamsTable({
  liveStreams,
  isLoading,
  syncingId,
  onSync,
  onStopTracking,
}: LiveStreamsTableProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <Paper className="p-4">
        <Stack spacing={1.5}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} height={40} />
          ))}
        </Stack>
      </Paper>
    );
  }

  if (liveStreams.length === 0) {
    return (
      <Paper>
        <EmptyState
          title="Nenhuma live monitorada"
          description="Cole a URL de uma transmissao do YouTube para comecar."
        />
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Live</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Espectadores</TableCell>
            <TableCell>Inicio</TableCell>
            <TableCell align="right">Acoes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {liveStreams.map((liveStream) => (
            <TableRow
              key={liveStream.id}
              hover
              className="cursor-pointer"
              onClick={() => router.push(AppRoutePaths.liveStreamDetail(liveStream.id))}
            >
              <TableCell>
                <Stack spacing={0.25}>
                  <Typography variant="body2" sx={{
                    fontWeight: 500
                  }}>
                    {liveStream.title ?? liveStream.video_id}
                  </Typography>
                  <Typography variant="caption" sx={{
                    color: "text.secondary"
                  }}>
                    {liveStream.channel_title ?? liveStream.video_id}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>
                <LiveStreamStatusChip status={liveStream.status} />
              </TableCell>
              <TableCell align="right">
                {formatNumber(liveStream.concurrent_viewers)}
              </TableCell>
              <TableCell>{formatDateTime(liveStream.actual_start_at)}</TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={0.5} sx={{
                  justifyContent: "flex-end"
                }}>
                  <Tooltip title="Sincronizar agora">
                    <IconButton
                      size="small"
                      disabled={syncingId === liveStream.id}
                      onClick={(event) => {
                        event.stopPropagation();
                        onSync(liveStream.id);
                      }}
                    >
                      <RefreshIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Parar de monitorar">
                    <IconButton
                      size="small"
                      onClick={(event) => {
                        event.stopPropagation();
                        onStopTracking(liveStream);
                      }}
                    >
                      <DeleteOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
