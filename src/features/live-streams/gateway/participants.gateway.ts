import authorizedApiClient from '@/infrastructure/authorized-api.client';
import type { PaginatedSuccessResponse } from '@/infrastructure/AppResponse';
import type { PaginationQueryParams } from '@/infrastructure/api-query-params';
import type {
  ChatParticipant,
  ParticipantOrder,
} from '@/features/live-streams/models/participant.model';

export interface ListParticipantsParams extends PaginationQueryParams {
  liveStreamId: string;
  order?: ParticipantOrder;
}

export async function listParticipants(
  params: ListParticipantsParams,
): Promise<PaginatedSuccessResponse<ChatParticipant>> {
  const response = await authorizedApiClient.get<
    PaginatedSuccessResponse<ChatParticipant>
  >(`/youtube/live_streams/${params.liveStreamId}/participants`, {
    params: {
      page: params.page ?? 1,
      perPage: params.perPage ?? 10,
      view: params.view ?? 'extended',
      order: params.order ?? 'messages',
    },
  });
  return response.data;
}
