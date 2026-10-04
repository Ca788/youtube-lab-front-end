import authorizedApiClient from '@/infrastructure/authorized-api.client';
import type { PaginatedSuccessResponse } from '@/infrastructure/AppResponse';
import type { PaginationQueryParams } from '@/infrastructure/api-query-params';
import type {
  ViewerSample,
  ViewerSampleFilters,
} from '@/features/live-streams/models/viewer-sample.model';

export interface ListViewerSamplesParams
  extends ViewerSampleFilters, PaginationQueryParams {
  liveStreamId: string;
}

export async function listViewerSamples(
  params: ListViewerSamplesParams,
): Promise<PaginatedSuccessResponse<ViewerSample>> {
  const response = await authorizedApiClient.get<PaginatedSuccessResponse<ViewerSample>>(
    `/youtube/live_streams/${params.liveStreamId}/viewer_samples`,
    {
      params: {
        page: params.page ?? 1,
        perPage: params.perPage ?? 50,
        view: params.view ?? 'default',
        from: params.from,
        to: params.to,
      },
    },
  );
  return response.data;
}
