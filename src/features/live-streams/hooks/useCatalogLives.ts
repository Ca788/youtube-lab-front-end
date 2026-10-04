import { keepPreviousData } from '@tanstack/react-query';
import { useAppQuery } from '@/hooks/useAppQuery';
import {
  listCatalogLives,
  type CatalogLivesResponse,
  type ListCatalogLivesParams,
} from '@/features/live-streams/gateway/catalog.gateway';

export const CATALOG_LIVES_LIST_KEY = 'catalog-lives:list';

export function useCatalogLives(params: ListCatalogLivesParams) {
  return useAppQuery<CatalogLivesResponse>({
    queryKey: [CATALOG_LIVES_LIST_KEY, params],
    queryFn: () => listCatalogLives(params),
    placeholderData: keepPreviousData,
  });
}
