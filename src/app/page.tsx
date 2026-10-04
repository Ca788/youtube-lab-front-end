import { redirect } from 'next/navigation';
import { AppRoutePaths } from '@/constants/AppRoutePaths';

export default function Page() {
  redirect(AppRoutePaths.LIVE_STREAMS);
}
