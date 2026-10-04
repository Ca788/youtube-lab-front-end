import authorizedApiClient from '@/infrastructure/authorized-api.client';
import type {
  PaginatedSuccessResponse,
  SuccessResponse,
} from '@/infrastructure/AppResponse';
import type { PaginationQueryParams } from '@/infrastructure/api-query-params';
import type {
  LiveStream,
  LiveStreamFilters,
  TrackLiveStreamInput,
} from '@/features/live-streams/models/live-stream.model';

const BASE_PATH = '/youtube/live_streams';

export interface ListLiveStreamsParams extends LiveStreamFilters, PaginationQueryParams {}

export async function listLiveStreams(
  params?: ListLiveStreamsParams,
): Promise<PaginatedSuccessResponse<LiveStream>> {
  const response = await authorizedApiClient.get<PaginatedSuccessResponse<LiveStream>>(
    BASE_PATH,
    {
      params: {
        page: params?.page ?? 1,
        perPage: params?.perPage ?? 10,
        view: params?.view ?? 'default',
        status: params?.status,
        tracking: params?.tracking,
      },
    },
  );
  return response.data;
}

export async function getLiveStream(id: string): Promise<LiveStream> {
  const response = await authorizedApiClient.get<SuccessResponse<LiveStream>>(
    `${BASE_PATH}/${id}`,
  );
  return response.data.data;
}

export async function trackLiveStream(input: TrackLiveStreamInput): Promise<LiveStream> {
  const response = await authorizedApiClient.post<SuccessResponse<LiveStream>>(
    BASE_PATH,
    { live_stream: input },
  );
  return response.data.data;
}

export async function syncLiveStream(id: string): Promise<LiveStream> {
  const response = await authorizedApiClient.post<SuccessResponse<LiveStream>>(
    `${BASE_PATH}/${id}/sync`,
  );
  return response.data.data;
}

export async function stopTrackingLiveStream(id: string): Promise<void> {
  await authorizedApiClient.delete(`${BASE_PATH}/${id}`);
}
