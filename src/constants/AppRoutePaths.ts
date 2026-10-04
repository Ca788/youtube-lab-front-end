export class AppRoutePaths {
  static readonly ROOT = '/';
  static readonly LOGIN = '/login';
  static readonly REGISTER = '/register';
  static readonly LIVE_STREAMS = '/live-streams';

  static liveStreamDetail(id: string): string {
    return `${this.LIVE_STREAMS}/${id}`;
  }

  static safeNext(value: string | null | undefined): string {
    if (!value || !value.startsWith('/') || value.startsWith('//')) {
      return this.LIVE_STREAMS;
    }
    if (value === this.LOGIN || value.startsWith(`${this.LOGIN}?`)) {
      return this.LIVE_STREAMS;
    }
    return value;
  }
}
