'use client';

import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import type { LiveStreamStatus } from '@/features/live-streams/models/live-stream.model';

export type StatusFilterValue = LiveStreamStatus | 'all';
export type TrackingFilterValue = 'all' | 'tracking' | 'stopped';

const STATUS_OPTIONS: { value: StatusFilterValue; label: string }[] = [
  { value: 'all', label: 'Todos os status' },
  { value: 'live', label: 'Ao vivo' },
  { value: 'upcoming', label: 'Agendadas' },
  { value: 'completed', label: 'Encerradas' },
  { value: 'none', label: 'Sem transmissao' },
];

const TRACKING_OPTIONS: { value: TrackingFilterValue; label: string }[] = [
  { value: 'all', label: 'Monitoradas e paradas' },
  { value: 'tracking', label: 'Somente monitoradas' },
  { value: 'stopped', label: 'Somente paradas' },
];

interface LiveStreamsFiltersProps {
  status: StatusFilterValue;
  tracking: TrackingFilterValue;
  onStatusChange: (value: StatusFilterValue) => void;
  onTrackingChange: (value: TrackingFilterValue) => void;
}

export function LiveStreamsFilters({
  status,
  tracking,
  onStatusChange,
  onTrackingChange,
}: LiveStreamsFiltersProps) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <TextField
        select
        label="Status"
        value={status}
        onChange={(event) => onStatusChange(event.target.value as StatusFilterValue)}
        sx={{ minWidth: 200 }}
      >
        {STATUS_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Monitoramento"
        value={tracking}
        onChange={(event) => onTrackingChange(event.target.value as TrackingFilterValue)}
        sx={{ minWidth: 220 }}
      >
        {TRACKING_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}
