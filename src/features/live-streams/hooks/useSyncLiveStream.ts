import { useMutation, useQueryClient } from '@tanstack/react-query';
import { syncLiveStream } from '@/features/live-streams/gateway/live-streams.gateway';
import { LIVE_STREAMS_LIST_KEY } from '@/features/live-streams/hooks/useLiveStreams';
import { LIVE_STREAM_DETAIL_KEY } from '@/features/live-streams/hooks/useLiveStream';
import { VIEWER_SAMPLES_LIST_KEY } from '@/features/live-streams/hooks/useViewerSamples';
import { CHAT_MESSAGES_LIST_KEY } from '@/features/live-streams/hooks/useChatMessages';
import { PARTICIPANTS_LIST_KEY } from '@/features/live-streams/hooks/useParticipants';

export function useSyncLiveStream() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => syncLiveStream(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: [LIVE_STREAMS_LIST_KEY] });
      queryClient.invalidateQueries({ queryKey: [LIVE_STREAM_DETAIL_KEY, id] });
      queryClient.invalidateQueries({ queryKey: [VIEWER_SAMPLES_LIST_KEY] });
      queryClient.invalidateQueries({ queryKey: [CHAT_MESSAGES_LIST_KEY] });
      queryClient.invalidateQueries({ queryKey: [PARTICIPANTS_LIST_KEY] });
    },
  });
}
