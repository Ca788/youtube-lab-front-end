import { keepPreviousData } from '@tanstack/react-query';
import { useAppQuery } from '@/hooks/useAppQuery';
import {
  listLiveStreams,
  type ListLiveStreamsParams,
} from '@/features/live-streams/gateway/live-streams.gateway';
import type { PaginatedSuccessResponse } from '@/infrastructure/AppResponse';
import type { LiveStream } from '@/features/live-streams/models/live-stream.model';

export const LIVE_STREAMS_LIST_KEY = 'live-streams:list';

export function useLiveStreams(params: ListLiveStreamsParams) {
  return useAppQuery<PaginatedSuccessResponse<LiveStream>>({
    queryKey: [LIVE_STREAMS_LIST_KEY, params],
    queryFn: () => listLiveStreams(params),
    placeholderData: keepPreviousData,
    refetchInterval: 30_000,
  });
}
