export interface ViewerSample {
  id: string;
  concurrent_viewers: number;
  captured_at: string;
  created_at?: string;
}

export interface ViewerSampleFilters {
  from?: string;
  to?: string;
}
