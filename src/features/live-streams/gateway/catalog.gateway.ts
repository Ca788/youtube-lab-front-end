import authorizedApiClient from '@/infrastructure/authorized-api.client';
import type { PaginatedSuccessResponse } from '@/infrastructure/AppResponse';
import type { PaginationQueryParams } from '@/infrastructure/api-query-params';
import type {
  CatalogLive,
  CatalogLiveFilters,
  CatalogLivesMetadata,
} from '@/features/live-streams/models/catalog-live.model';
import type { VideoCategory } from '@/features/live-streams/models/video-category.model';

export interface ListCatalogLivesParams extends CatalogLiveFilters, PaginationQueryParams {}

export type CatalogLivesResponse = Omit<PaginatedSuccessResponse<CatalogLive>, 'metadata'> & {
  metadata?: CatalogLivesMetadata;
};

export async function listCatalogLives(
  params?: ListCatalogLivesParams,
): Promise<CatalogLivesResponse> {
  const response = await authorizedApiClient.get<CatalogLivesResponse>(
    '/youtube/catalog/live_streams',
    {
      params: {
        page: params?.page ?? 1,
        perPage: params?.perPage ?? 12,
        view: params?.view ?? 'default',
        q: params?.q,
        category_id: params?.category_id,
        region_code: params?.region_code ?? 'BR',
        page_token: params?.page_token,
      },
    },
  );
  return response.data;
}

export async function listVideoCategories(
  region_code = 'BR',
): Promise<PaginatedSuccessResponse<VideoCategory>> {
  const response = await authorizedApiClient.get<PaginatedSuccessResponse<VideoCategory>>(
    '/youtube/catalog/categories',
    {
      params: {
        page: 1,
        perPage: 100,
        view: 'default',
        region_code,
      },
    },
  );
  return response.data;
}
