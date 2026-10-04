import { keepPreviousData } from '@tanstack/react-query';
import { useAppQuery } from '@/hooks/useAppQuery';
import {
  listParticipants,
  type ListParticipantsParams,
} from '@/features/live-streams/gateway/participants.gateway';
import type { PaginatedSuccessResponse } from '@/infrastructure/AppResponse';
import type { ChatParticipant } from '@/features/live-streams/models/participant.model';

export const PARTICIPANTS_LIST_KEY = 'participants:list';

export function useParticipants(
  params: ListParticipantsParams,
  refetchInterval: number | false = 20_000,
) {
  return useAppQuery<PaginatedSuccessResponse<ChatParticipant>>({
    queryKey: [PARTICIPANTS_LIST_KEY, params],
    queryFn: () => listParticipants(params),
    enabled: Boolean(params.liveStreamId),
    placeholderData: keepPreviousData,
    refetchInterval,
  });
}
