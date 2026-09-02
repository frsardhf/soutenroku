import {
  createEmptyAccount,
  parseAccount,
  parseLegacyProgress,
  SOUTENROKU_LEGACY_PROGRESS_KEY,
  SOUTENROKU_STORAGE_KEY,
  type SoutenrokuAccount,
} from "./schema";

export interface AccountRepository {
  load(): Promise<SoutenrokuAccount>;
  save(account: SoutenrokuAccount): Promise<boolean>;
  clear(): Promise<boolean>;
}

function browserStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try { return window.localStorage; } catch { return null; }
}

export class LocalAccountRepository implements AccountRepository {
  constructor(private readonly explicitStorage?: Storage | null) {}

  private resolveStorage():Storage|null {
    return this.explicitStorage === undefined ? browserStorage() : this.explicitStorage;
  }

  async load(): Promise<SoutenrokuAccount> {
    const storage=this.resolveStorage();
    if (!storage) return createEmptyAccount();
    try {
      const current = parseAccount(storage.getItem(SOUTENROKU_STORAGE_KEY));
      const legacyRaw=storage.getItem(SOUTENROKU_LEGACY_PROGRESS_KEY);
      if (!legacyRaw) return current ?? createEmptyAccount();
      const legacy = parseLegacyProgress(legacyRaw);

      const migrated:SoutenrokuAccount = {
        ...(current ?? createEmptyAccount()),
        progress:{...(legacy ?? {}),...(current?.progress ?? {})},
        updatedAt:new Date().toISOString(),
      };
      const saved = await this.save(migrated);
      if (saved) storage.removeItem(SOUTENROKU_LEGACY_PROGRESS_KEY);
      return migrated;
    } catch { return createEmptyAccount(); }
  }

  async save(account: SoutenrokuAccount): Promise<boolean> {
    const storage=this.resolveStorage();
    if (!storage) return false;
    try {
      storage.setItem(SOUTENROKU_STORAGE_KEY, JSON.stringify(account));
      return true;
    } catch { return false; }
  }

  async clear(): Promise<boolean> {
    const storage=this.resolveStorage();
    if (!storage) return false;
    try {
      storage.removeItem(SOUTENROKU_STORAGE_KEY);
      storage.removeItem(SOUTENROKU_LEGACY_PROGRESS_KEY);
      return true;
    } catch { return false; }
  }
}

export const localAccountRepository = new LocalAccountRepository();
