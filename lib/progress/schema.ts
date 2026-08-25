/**
 * Persistent checklist state. UI labels are deliberately not part of this
 * schema: callers own immutable IDs such as `weapon:water:m3:gaze-mare:1`.
 */
export const SOUTENROKU_PROGRESS_VERSION = 2 as const;
export const SOUTENROKU_PROGRESS_STORAGE_KEY = "soutenroku-progress";

export type ProgressItemId = string;

export type ProgressValues = Record<ProgressItemId, boolean>;

export interface SoutenrokuProgress {
  version: typeof SOUTENROKU_PROGRESS_VERSION;
  values: ProgressValues;
  updatedAt: string | null;
}

export function createEmptyProgress(): SoutenrokuProgress {
  return {
    version: SOUTENROKU_PROGRESS_VERSION,
    values: {},
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

/** Parses and sanitizes stored JSON instead of trusting its compile-time type. */
export function parseProgress(raw: string | null): SoutenrokuProgress | null {
  if (!raw) return null;

  try {
    const candidate: unknown = JSON.parse(raw);
    if (!isRecord(candidate) || candidate.version !== SOUTENROKU_PROGRESS_VERSION) {
      return null;
    }

    return {
      version: SOUTENROKU_PROGRESS_VERSION,
      values: booleanRecord(candidate.values),
      updatedAt:
        typeof candidate.updatedAt === "string" ? candidate.updatedAt : null,
    };
  } catch {
    return null;
  }
}
