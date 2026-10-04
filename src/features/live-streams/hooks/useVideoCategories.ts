import { useAppQuery } from '@/hooks/useAppQuery';
import { listVideoCategories } from '@/features/live-streams/gateway/catalog.gateway';
import type { PaginatedSuccessResponse } from '@/infrastructure/AppResponse';
import type { VideoCategory } from '@/features/live-streams/models/video-category.model';

export const VIDEO_CATEGORIES_LIST_KEY = 'video-categories:list';

export function useVideoCategories(region_code = 'BR') {
  return useAppQuery<PaginatedSuccessResponse<VideoCategory>>({
    queryKey: [VIDEO_CATEGORIES_LIST_KEY, region_code],
    queryFn: () => listVideoCategories(region_code),
    staleTime: 12 * 60 * 60 * 1000,
  });
}
