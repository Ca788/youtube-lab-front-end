import { keepPreviousData } from '@tanstack/react-query';
import { useAppQuery } from '@/hooks/useAppQuery';
import {
  listChatMessages,
  type ListChatMessagesParams,
} from '@/features/live-streams/gateway/chat-messages.gateway';
import type { PaginatedSuccessResponse } from '@/infrastructure/AppResponse';
import type { ChatMessage } from '@/features/live-streams/models/chat-message.model';

export const CHAT_MESSAGES_LIST_KEY = 'chat-messages:list';

export function useChatMessages(
  params: ListChatMessagesParams,
  refetchInterval: number | false = 10_000,
) {
  return useAppQuery<PaginatedSuccessResponse<ChatMessage>>({
    queryKey: [CHAT_MESSAGES_LIST_KEY, params],
    queryFn: () => listChatMessages(params),
    enabled: Boolean(params.liveStreamId),
    placeholderData: keepPreviousData,
    refetchInterval,
  });
}
