import { z } from 'zod';

export const trackLiveStreamFormSchema = z.object({
  url: z.string().min(1, 'Informe a URL ou o ID do video'),
});

export type TrackLiveStreamFormValues = z.infer<typeof trackLiveStreamFormSchema>;
