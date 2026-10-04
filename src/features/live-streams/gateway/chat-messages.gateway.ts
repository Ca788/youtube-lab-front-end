import authorizedApiClient from '@/infrastructure/authorized-api.client';
import type { PaginatedSuccessResponse } from '@/infrastructure/AppResponse';
import type { PaginationQueryParams } from '@/infrastructure/api-query-params';
import type {
  ChatMessage,
  ChatMessageFilters,
} from '@/features/live-streams/models/chat-message.model';

export interface ListChatMessagesParams extends ChatMessageFilters, PaginationQueryParams {
  liveStreamId: string;
}

export async function listChatMessages(
  params: ListChatMessagesParams,
): Promise<PaginatedSuccessResponse<ChatMessage>> {
  const response = await authorizedApiClient.get<PaginatedSuccessResponse<ChatMessage>>(
    `/youtube/live_streams/${params.liveStreamId}/chat_messages`,
    {
      params: {
        page: params.page ?? 1,
        perPage: params.perPage ?? 25,
        view: params.view ?? 'default',
        message_type: params.message_type,
        author_channel_id: params.author_channel_id,
        paid_only: params.paid_only ? true : undefined,
      },
    },
  );
  return response.data;
}
