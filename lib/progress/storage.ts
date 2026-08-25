import {
  createEmptyProgress,
  parseProgress,
  SKYLOG_PROGRESS_STORAGE_KEY,
  type ProgressItemId,
  type SkylogProgressV2,
} from "./schema";

export interface ProgressStorageOptions {
  /** Injectable for tests. Omit to use browser localStorage when available. */
  storage?: Storage | null;
  storageKey?: string;
}

function resolveStorage(explicitStorage?: Storage | null): Storage | null {
  if (explicitStorage !== undefined) return explicitStorage;
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function storageKey(options: ProgressStorageOptions): string {
  return options.storageKey ?? SKYLOG_PROGRESS_STORAGE_KEY;
}

function assertItemId(itemId: ProgressItemId): void {
  if (!itemId.trim()) throw new TypeError("Progress item IDs cannot be empty");
}

export function readProgress(
  options: ProgressStorageOptions = {},
): SkylogProgressV2 {
  const storage = resolveStorage(options.storage);
  if (!storage) return createEmptyProgress();

  try {
    return parseProgress(storage.getItem(storageKey(options))) ?? createEmptyProgress();
  } catch {
    return createEmptyProgress();
  }
}

/** Returns false when persistence is unavailable while leaving the UI usable. */
export function writeProgress(
  progress: SkylogProgressV2,
  options: ProgressStorageOptions = {},
): boolean {
  const storage = resolveStorage(options.storage);
  if (!storage) return false;

  try {
    storage.setItem(storageKey(options), JSON.stringify(progress));
    return true;
  } catch {
    return false;
  }
}

export function setProgressValue(
  itemId: ProgressItemId,
  complete: boolean,
  options: ProgressStorageOptions = {},
): SkylogProgressV2 {
  assertItemId(itemId);
  const current = readProgress(options);
  const next: SkylogProgressV2 = {
    ...current,
    values: { ...current.values, [itemId]: complete },
    updatedAt: new Date().toISOString(),
  };
  writeProgress(next, options);
  return next;
}

export function toggleProgressValue(
  itemId: ProgressItemId,
  options: ProgressStorageOptions = {},
): SkylogProgressV2 {
  assertItemId(itemId);
  const current = readProgress(options);
  const next: SkylogProgressV2 = {
    ...current,
    values: { ...current.values, [itemId]: !current.values[itemId] },
    updatedAt: new Date().toISOString(),
  };
  writeProgress(next, options);
  return next;
}

export function isProgressComplete(
  progress: SkylogProgressV2,
  itemId: ProgressItemId,
): boolean {
  return progress.values[itemId] === true;
}

