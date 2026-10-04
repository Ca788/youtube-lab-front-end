'use client';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RefreshIcon from '@mui/icons-material/Refresh';
import { LiveStreamStatusChip } from '@/features/live-streams/components/common/LiveStreamStatusChip';
import { LiveStreamPlayer } from '@/features/live-streams/components/detail/LiveStreamPlayer';
import { ChatFeed } from '@/features/live-streams/components/detail/ChatFeed';
import { formatDateTime, formatNumber } from '@/utils/format';
import type { LiveStream } from '@/features/live-streams/models/live-stream.model';

interface MetricProps {
  label: string;
  value: string;
}

function Metric({ label, value }: MetricProps) {
  return (
    <Paper className="flex-1 p-4">
      <Stack spacing={0.5}>
        <Typography variant="caption" sx={{
          color: "text.secondary"
        }}>
          {label}
        </Typography>
        <Typography variant="h6">{value}</Typography>
      </Stack>
    </Paper>
  );
}

interface LiveStreamSummaryProps {
  liveStream: LiveStream;
  isSyncing: boolean;
  onSync: () => void;
}

export function LiveStreamSummary({
  liveStream,
  isSyncing,
  onSync,
}: LiveStreamSummaryProps) {
  return (
    <Stack spacing={2}>
      <Stack spacing={1} sx={{ minWidth: 0 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: 'stretch', md: 'flex-start' },
            minWidth: 0,
          }}>
          <Typography
            variant="h6"
            sx={{
              minWidth: 0,
              flex: 1,
              overflowWrap: 'anywhere',
              wordBreak: 'break-word',
            }}
          >
            {liveStream.title ?? liveStream.video_id}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexShrink: 0,
              flexWrap: "wrap",
              alignItems: "center",
            }}>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={onSync}
              disabled={isSyncing}
              sx={{ whiteSpace: 'nowrap' }}
            >
              {isSyncing ? 'Sincronizando...' : 'Sincronizar'}
            </Button>
            {liveStream.watch_url && (
              <Button
                variant="outlined"
                startIcon={<OpenInNewIcon />}
                href={liveStream.watch_url}
                target="_blank"
                rel="noreferrer"
                sx={{ whiteSpace: 'nowrap' }}
              >
                Abrir no YouTube
              </Button>
            )}
          </Stack>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            flexWrap: "wrap",
            minWidth: 0,
          }}>
          <LiveStreamStatusChip status={liveStream.status} />
          <Typography variant="body2" sx={{
            color: "text.secondary",
            overflowWrap: "anywhere"
          }}>
            {liveStream.channel_title ?? '-'} · {liveStream.video_id}
          </Typography>
        </Stack>
      </Stack>

      <LiveStreamPlayer videoId={liveStream.video_id} title={liveStream.title} />
      <ChatFeed liveStreamId={liveStream.id} compact />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Metric
          label="Espectadores agora"
          value={formatNumber(liveStream.concurrent_viewers)}
        />
        <Metric label="Views totais" value={formatNumber(liveStream.total_view_count)} />
        <Metric label="Likes" value={formatNumber(liveStream.like_count)} />
        <Metric label="Ultimo sync" value={formatDateTime(liveStream.last_polled_at)} />
      </Stack>
    </Stack>
  );
}
