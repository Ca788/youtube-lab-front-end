'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { LiveStreamStatusChip } from '@/features/live-streams/components/common/LiveStreamStatusChip';
import { formatNumber } from '@/utils/format';
import type { CatalogLive } from '@/features/live-streams/models/catalog-live.model';

interface CatalogLiveCardProps {
  live: CatalogLive;
  isTracking: boolean;
  onTrack: (live: CatalogLive) => void;
}

export function CatalogLiveCard({ live, isTracking, onTrack }: CatalogLiveCardProps) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {live.thumbnail_url ? (
        <CardMedia
          component="img"
          height="140"
          image={live.thumbnail_url}
          alt={live.title ?? live.video_id}
          sx={{ bgcolor: 'common.black', objectFit: 'cover' }}
        />
      ) : (
        <Box sx={{ height: 140, bgcolor: 'common.black' }} />
      )}
      <CardContent sx={{ flex: 1, minWidth: 0 }}>
        <Stack spacing={1}>
          <LiveStreamStatusChip status={live.status} />
          <Typography variant="subtitle2" sx={{ overflowWrap: 'anywhere' }}>
            {live.title ?? live.video_id}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {live.channel_title ?? '-'} · {formatNumber(live.concurrent_viewers)} espectadores
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          size="small"
          variant="contained"
          startIcon={<AddIcon />}
          disabled={isTracking || !live.watch_url}
          onClick={() => onTrack(live)}
        >
          Monitorar
        </Button>
      </CardActions>
    </Card>
  );
}
