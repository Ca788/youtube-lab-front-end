import Chip from '@mui/material/Chip';
import type { LiveStreamStatus } from '@/features/live-streams/models/live-stream.model';

type ChipColor = 'default' | 'primary' | 'info' | 'success';

interface StatusConfig {
  label: string;
  color: ChipColor;
}

const STATUS_CONFIG: Record<LiveStreamStatus, StatusConfig> = {
  none: { label: 'Sem transmissao', color: 'default' },
  upcoming: { label: 'Agendada', color: 'info' },
  live: { label: 'Ao vivo', color: 'primary' },
  completed: { label: 'Encerrada', color: 'default' },
};

interface LiveStreamStatusChipProps {
  status: LiveStreamStatus;
}

export function LiveStreamStatusChip({ status }: LiveStreamStatusChipProps) {
  const config = STATUS_CONFIG[status];

  return (
    <Chip
      size="small"
      label={config.label}
      color={config.color}
      variant={status === 'live' ? 'filled' : 'outlined'}
    />
  );
}
