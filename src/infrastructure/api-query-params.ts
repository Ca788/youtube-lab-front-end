import type { SerializerView } from '@/infrastructure/AppResponse';

export interface PaginationQueryParams {
  page?: number;
  perPage?: number;
  view?: SerializerView;
}
