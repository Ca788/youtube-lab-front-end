import { keepPreviousData } from '@tanstack/react-query';
import { useAppQuery } from '@/hooks/useAppQuery';
import {
  listViewerSamples,
  type ListViewerSamplesParams,
} from '@/features/live-streams/gateway/viewer-samples.gateway';
import type { PaginatedSuccessResponse } from '@/infrastructure/AppResponse';
import type { ViewerSample } from '@/features/live-streams/models/viewer-sample.model';

export const VIEWER_SAMPLES_LIST_KEY = 'viewer-samples:list';

export function useViewerSamples(
  params: ListViewerSamplesParams,
  refetchInterval: number | false = 30_000,
) {
  return useAppQuery<PaginatedSuccessResponse<ViewerSample>>({
    queryKey: [VIEWER_SAMPLES_LIST_KEY, params],
    queryFn: () => listViewerSamples(params),
    enabled: Boolean(params.liveStreamId),
    placeholderData: keepPreviousData,
    refetchInterval,
  });
}
