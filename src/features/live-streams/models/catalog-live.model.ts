import type { LiveStreamStatus } from '@/features/live-streams/models/live-stream.model';

export interface CatalogLive {
  video_id: string;
  title?: string;
  channel_title?: string;
  status: LiveStreamStatus;
  concurrent_viewers?: number;
  thumbnail_url?: string;
  watch_url?: string;
  channel_id?: string;
  category_id?: string;
  actual_start_at?: string;
  total_view_count?: number;
  like_count?: number;
}

export interface CatalogLiveFilters {
  q?: string;
  category_id?: string;
  region_code?: string;
  page_token?: string;
}

export interface CatalogLivesMetadata {
  nextPageToken?: string;
  prevPageToken?: string;
}
