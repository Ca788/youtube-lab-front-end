'use client';

import { useMemo } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { EmptyState } from '@/components/common/EmptyState';
import { useViewerSamples } from '@/features/live-streams/hooks/useViewerSamples';
import { formatNumber, formatTime } from '@/utils/format';

interface ViewersChartProps {
  liveStreamId: string;
}

export function ViewersChart({ liveStreamId }: ViewersChartProps) {
  const theme = useTheme();
  const { data } = useViewerSamples({ liveStreamId, perPage: 100 });

  const samples = useMemo(
    () =>
      (data?.data ?? [])
        .map((sample) => ({
          capturedAt: formatTime(sample.captured_at),
          viewers: sample.concurrent_viewers,
        }))
        .reverse(),
    [data?.data],
  );

  return (
    <Paper className="p-4">
      <Stack spacing={2}>
        <Stack spacing={0.25}>
          <Typography variant="subtitle1">Audiencia simultanea</Typography>
          <Typography variant="caption" sx={{
            color: "text.secondary"
          }}>
            {data?.pagination.totalCount ?? 0} amostras capturadas
          </Typography>
        </Stack>

        {samples.length === 0 ? (
          <EmptyState
            title="Sem amostras ainda"
            description="Sincronize a live para capturar a primeira medicao."
          />
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={samples} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="viewersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={theme.palette.primary.main}
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="100%"
                      stopColor={theme.palette.primary.main}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={theme.palette.divider} vertical={false} />
                <XAxis
                  dataKey="capturedAt"
                  stroke={theme.palette.text.secondary}
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke={theme.palette.text.secondary}
                  fontSize={12}
                  tickLine={false}
                  width={64}
                  tickFormatter={(value: number) => formatNumber(value)}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 12,
                  }}
                  formatter={(value) => [formatNumber(Number(value)), 'Espectadores']}
                />
                <Area
                  type="monotone"
                  dataKey="viewers"
                  stroke={theme.palette.primary.main}
                  strokeWidth={2}
                  fill="url(#viewersGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </Stack>
    </Paper>
  );
}
