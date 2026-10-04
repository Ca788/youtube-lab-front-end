import { useMutation, useQueryClient } from '@tanstack/react-query';
import { trackLiveStream } from '@/features/live-streams/gateway/live-streams.gateway';
import { LIVE_STREAMS_LIST_KEY } from '@/features/live-streams/hooks/useLiveStreams';
import { CHAT_MESSAGES_LIST_KEY } from '@/features/live-streams/hooks/useChatMessages';
import { PARTICIPANTS_LIST_KEY } from '@/features/live-streams/hooks/useParticipants';
import type { TrackLiveStreamInput } from '@/features/live-streams/models/live-stream.model';

export function useTrackLiveStream() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: TrackLiveStreamInput) => trackLiveStream(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIVE_STREAMS_LIST_KEY] });
      queryClient.invalidateQueries({ queryKey: [CHAT_MESSAGES_LIST_KEY] });
      queryClient.invalidateQueries({ queryKey: [PARTICIPANTS_LIST_KEY] });
    },
  });
}
