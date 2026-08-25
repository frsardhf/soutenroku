/**
 * Persistent checklist state. UI labels are deliberately not part of this
 * schema: callers own immutable IDs such as `weapon:water:m3:gaze-mare:1`.
 */
export const SKYLOG_PROGRESS_VERSION = 2 as const;
export const SKYLOG_PROGRESS_STORAGE_KEY = "skylog-progress-v2";
export const SKYLOG_LEGACY_PROGRESS_STORAGE_KEY = "skylog-owned";

export type ProgressItemId = string;

export type ProgressValues = Record<ProgressItemId, boolean>;

export interface LegacyMigrationState {
  storageKey: string;
  /** Legacy keys already considered, including keys that mapped to `false`. */
  migratedKeys: string[];
}

export interface SkylogProgressV2 {
  version: typeof SKYLOG_PROGRESS_VERSION;
  values: ProgressValues;
  legacyMigration: LegacyMigrationState;
  updatedAt: string | null;
}

export function createEmptyProgress(): SkylogProgressV2 {
  return {
    version: SKYLOG_PROGRESS_VERSION,
    values: {},
    legacyMigration: {
      storageKey: SKYLOG_LEGACY_PROGRESS_STORAGE_KEY,
      migratedKeys: [],
    },
    updatedAt: null,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function booleanRecord(value: unknown): ProgressValues {
  if (!isRecord(value)) return {};

  return Object.fromEntries(
    Object.entries(value).filter(
      (entry): entry is [string, boolean] =>
        entry[0].length > 0 && typeof entry[1] === "boolean",
    ),
  );
}

function stringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((item): item is string => typeof item === "string"))];
}

/** Parses and sanitizes stored JSON instead of trusting its compile-time type. */
export function parseProgress(raw: string | null): SkylogProgressV2 | null {
  if (!raw) return null;

  try {
    const candidate: unknown = JSON.parse(raw);
    if (!isRecord(candidate) || candidate.version !== SKYLOG_PROGRESS_VERSION) {
      return null;
    }

    const migration = isRecord(candidate.legacyMigration)
      ? candidate.legacyMigration
      : {};

    return {
      version: SKYLOG_PROGRESS_VERSION,
      values: booleanRecord(candidate.values),
      legacyMigration: {
        storageKey:
          typeof migration.storageKey === "string"
            ? migration.storageKey
            : SKYLOG_LEGACY_PROGRESS_STORAGE_KEY,
        migratedKeys: stringArray(migration.migratedKeys),
      },
      updatedAt:
        typeof candidate.updatedAt === "string" ? candidate.updatedAt : null,
    };
  } catch {
    return null;
  }
}
