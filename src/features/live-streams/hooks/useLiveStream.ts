import { useAppQuery } from '@/hooks/useAppQuery';
import { getLiveStream } from '@/features/live-streams/gateway/live-streams.gateway';
import type { LiveStream } from '@/features/live-streams/models/live-stream.model';

export const LIVE_STREAM_DETAIL_KEY = 'live-streams:detail';

export function useLiveStream(id: string | null, refetchInterval = 30_000) {
  return useAppQuery<LiveStream>({
    queryKey: [LIVE_STREAM_DETAIL_KEY, id],
    queryFn: () => getLiveStream(id as string),
    enabled: Boolean(id),
    refetchInterval,
  });
}
