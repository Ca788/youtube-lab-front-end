import { AppStorage } from '@/infrastructure/storage/AppStorage';

interface StoredItem<T> {
  value: T;
  expiration: number | null;
}

export class MemoryStorage implements AppStorage {
  private readonly store = new Map<string, StoredItem<unknown>>();

  get<T>(key: string): T | undefined {
    const item = this.store.get(key);
    if (!item) return undefined;

    if (item.expiration && Date.now() > item.expiration) {
      this.remove(key);
      return undefined;
    }

    return item.value as T;
  }

  set<T>(key: string, value: T, ttlInMinutes?: number): void {
    this.store.set(key, {
      value,
      expiration: ttlInMinutes ? Date.now() + ttlInMinutes * 60_000 : null,
    });
  }

  remove(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}
