import { PageContent } from '@/components/layout/PageContent';
import { LiveStreamsPage } from '@/features/live-streams/components/list/LiveStreamsPage';

export default function Page() {
  return (
    <PageContent>
      <LiveStreamsPage />
    </PageContent>
  );
}
