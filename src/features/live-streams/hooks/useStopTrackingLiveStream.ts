import { useMutation, useQueryClient } from '@tanstack/react-query';
import { stopTrackingLiveStream } from '@/features/live-streams/gateway/live-streams.gateway';
import { LIVE_STREAMS_LIST_KEY } from '@/features/live-streams/hooks/useLiveStreams';

export function useStopTrackingLiveStream() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => stopTrackingLiveStream(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIVE_STREAMS_LIST_KEY] });
    },
  });
}
