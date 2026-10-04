export const LIVE_STREAM_STATUSES = {
  none: 'none',
  upcoming: 'upcoming',
  live: 'live',
  completed: 'completed',
};

export type LiveStreamStatus =
  (typeof LIVE_STREAM_STATUSES)[keyof typeof LIVE_STREAM_STATUSES];

export interface LiveStream {
  id: string;
  video_id: string;
  title?: string;
  channel_title?: string;
  status: LiveStreamStatus;
  concurrent_viewers?: number;
  actual_start_at?: string;
  tracking: boolean;
  chat_available: boolean;
  channel_id?: string;
  scheduled_start_at?: string;
  actual_end_at?: string;
  total_view_count?: number;
  like_count?: number;
  last_polled_at?: string;
  created_at?: string;
  updated_at?: string;
  watch_url?: string;
}

export interface TrackLiveStreamInput {
  url: string;
}

export interface LiveStreamFilters {
  status?: LiveStreamStatus;
  tracking?: boolean;
}
