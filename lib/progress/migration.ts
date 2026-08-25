import {
  createEmptyProgress,
  SKYLOG_LEGACY_PROGRESS_STORAGE_KEY,
  type ProgressItemId,
  type SkylogProgressV2,
} from "./schema";
import {
  readProgress,
  writeProgress,
  type ProgressStorageOptions,
} from "./storage";

export type LegacyProgressIdMap = Readonly<Record<string, ProgressItemId>>;

export interface LegacyMigrationOptions extends ProgressStorageOptions {
  legacyStorageKey?: string;
}

export interface LegacyMigrationResult {
  progress: SkylogProgressV2;
  migratedCount: number;
  /** Valid legacy booleans with no caller-supplied stable ID yet. */
  unmappedLegacyKeys: string[];
  persisted: boolean;
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

function readLegacyValues(
  storage: Storage,
  legacyStorageKey: string,
): Record<string, boolean> {
  try {
    const raw = storage.getItem(legacyStorageKey);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, boolean] => typeof entry[1] === "boolean",
      ),
    );
  } catch {
    return {};
  }
}

/**
 * Incrementally migrates the old label-based `skylog-owned` object.
 *
 * The caller supplies every legacy key -> immutable ID association because the
 * data layer, not persistence, knows those identities. Existing v2 values win,
 * migrated legacy keys are remembered (including `false`), and the old storage
 * entry is intentionally retained as a recovery path.
 */
export function migrateLegacyProgress(
  legacyIdMap: LegacyProgressIdMap,
  options: LegacyMigrationOptions = {},
): LegacyMigrationResult {
  const storage = resolveStorage(options.storage);
  if (!storage) {
    return {
      progress: createEmptyProgress(),
      migratedCount: 0,
      unmappedLegacyKeys: [],
      persisted: false,
    };
  }

  const legacyStorageKey =
    options.legacyStorageKey ?? SKYLOG_LEGACY_PROGRESS_STORAGE_KEY;
  const legacyValues = readLegacyValues(storage, legacyStorageKey);
  const current = readProgress({
    storage,
    storageKey: options.storageKey,
  });
  const previouslyMigrated = new Set(
    current.legacyMigration.storageKey === legacyStorageKey
      ? current.legacyMigration.migratedKeys
      : [],
  );
  const values = { ...current.values };
  let migratedCount = 0;

  for (const [legacyKey, stableId] of Object.entries(legacyIdMap)) {
    if (!(legacyKey in legacyValues) || previouslyMigrated.has(legacyKey)) continue;
    if (!stableId.trim()) continue;

    if (!(stableId in values)) values[stableId] = legacyValues[legacyKey];
    previouslyMigrated.add(legacyKey);
    migratedCount += 1;
  }

  const unmappedLegacyKeys = Object.keys(legacyValues).filter(
    (legacyKey) => !(legacyKey in legacyIdMap),
  );

  if (migratedCount === 0) {
    return {
      progress: current,
      migratedCount,
      unmappedLegacyKeys,
      persisted: true,
    };
  }

  const next: SkylogProgressV2 = {
    ...current,
    values,
    legacyMigration: {
      storageKey: legacyStorageKey,
      migratedKeys: [...previouslyMigrated],
    },
    updatedAt: new Date().toISOString(),
  };

  return {
    progress: next,
    migratedCount,
    unmappedLegacyKeys,
    persisted: writeProgress(next, {
      storage,
      storageKey: options.storageKey,
    }),
  };
}
