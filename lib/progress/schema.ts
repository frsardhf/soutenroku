/**
 * The single device-local account document. UI labels deliberately stay out of
 * this schema: callers use stable IDs so labels can change without losing data.
 */
export const SOUTENROKU_ACCOUNT_VERSION = 1 as const;
export const SOUTENROKU_STORAGE_KEY = "soutenroku";
export const SOUTENROKU_LEGACY_PROGRESS_KEY = "soutenroku-progress";
export const SOUTENROKU_EXPORT_FORMAT = "soutenroku-account" as const;

export type ProgressItemId = string;
export type ProgressValues = Record<ProgressItemId, boolean>;

export interface CollectionEntry {
  owned: boolean;
  uncap?: number;
  note?: string;
}

export interface RoadmapSelection {
  teamId?: string;
  gridId?: string;
}

export interface ArcarumProjectProgress {
  recruited: boolean;
  weaponStage: number;
  domainStage: number;
  characterStage: number;
  skill4: boolean;
  goal: "weapon5" | "character5" | "skill4" | "level110";
  included: boolean;
}

export interface SoutenrokuAccount {
  schemaVersion: typeof SOUTENROKU_ACCOUNT_VERSION;
  updatedAt: string | null;
  progress: ProgressValues;
  roadmapSelections: Record<string, RoadmapSelection>;
  arcarumProjects: Record<string, ArcarumProjectProgress>;
  collection: {
    characters: Record<string, CollectionEntry>;
    summons: Record<string, CollectionEntry>;
  };
  preferences: {
    collectionView: "grid" | "table";
  };
}

export interface SoutenrokuExport {
  format: typeof SOUTENROKU_EXPORT_FORMAT;
  schemaVersion: typeof SOUTENROKU_ACCOUNT_VERSION;
  exportedAt: string;
  data: SoutenrokuAccount;
}

export function createEmptyAccount(): SoutenrokuAccount {
  return {
    schemaVersion: SOUTENROKU_ACCOUNT_VERSION,
    updatedAt: null,
    progress: {},
    roadmapSelections: {},
    arcarumProjects: {},
    collection: {characters: {}, summons: {}},
    preferences: {collectionView: "grid"},
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function booleanRecord(value: unknown): ProgressValues {
  if (!isRecord(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(
    (entry): entry is [string, boolean] => entry[0].length > 0 && typeof entry[1] === "boolean",
  ));
}

function collectionRecord(value: unknown): Record<string, CollectionEntry> {
  if (!isRecord(value)) return {};
  const entries: [string, CollectionEntry][] = [];
  for (const [id, raw] of Object.entries(value)) {
    if (!id || !isRecord(raw) || typeof raw.owned !== "boolean") continue;
    const entry: CollectionEntry = {owned: raw.owned};
    if (typeof raw.uncap === "number" && Number.isInteger(raw.uncap) && raw.uncap >= 0) entry.uncap = raw.uncap;
    if (typeof raw.note === "string") entry.note = raw.note.slice(0, 2000);
    entries.push([id, entry]);
  }
  return Object.fromEntries(entries);
}

function selectionRecord(value: unknown): Record<string, RoadmapSelection> {
  if (!isRecord(value)) return {};
  const entries: [string, RoadmapSelection][] = [];
  for (const [element, raw] of Object.entries(value)) {
    if (!element || !isRecord(raw)) continue;
    const selection: RoadmapSelection = {};
    if (typeof raw.teamId === "string" && raw.teamId) selection.teamId = raw.teamId;
    if (typeof raw.gridId === "string" && raw.gridId) selection.gridId = raw.gridId;
    if (selection.teamId || selection.gridId) entries.push([element, selection]);
  }
  return Object.fromEntries(entries);
}

function arcarumProjectRecord(value: unknown): Record<string, ArcarumProjectProgress> {
  if (!isRecord(value)) return {};
  const goals=new Set(["weapon5","character5","skill4","level110"]);
  const entries: [string, ArcarumProjectProgress][]=[];
  for(const [id,raw] of Object.entries(value)){
    if(!id || !isRecord(raw) || typeof raw.recruited!=="boolean" || typeof raw.skill4!=="boolean" || typeof raw.included!=="boolean")continue;
    const weaponStage=typeof raw.weaponStage==="number"?Math.max(-1,Math.min(5,Math.trunc(raw.weaponStage))):-1;
    const domainStage=typeof raw.domainStage==="number"?Math.max(0,Math.min(4,Math.trunc(raw.domainStage))):0;
    const characterStage=typeof raw.characterStage==="number"&&[4,5,110].includes(raw.characterStage)?raw.characterStage:4;
    const goal=typeof raw.goal==="string"&&goals.has(raw.goal)?raw.goal as ArcarumProjectProgress["goal"]:"character5";
    entries.push([id,{recruited:raw.recruited,weaponStage,domainStage,characterStage,skill4:raw.skill4,goal,included:raw.included}]);
  }
  return Object.fromEntries(entries);
}

export function sanitizeAccount(value: unknown): SoutenrokuAccount | null {
  if (!isRecord(value) || value.schemaVersion !== SOUTENROKU_ACCOUNT_VERSION) return null;
  const collection = isRecord(value.collection) ? value.collection : {};
  const preferences = isRecord(value.preferences) ? value.preferences : {};
  return {
    schemaVersion: SOUTENROKU_ACCOUNT_VERSION,
    updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : null,
    progress: booleanRecord(value.progress),
    roadmapSelections: selectionRecord(value.roadmapSelections),
    arcarumProjects: arcarumProjectRecord(value.arcarumProjects),
    collection: {
      characters: collectionRecord(collection.characters),
      summons: collectionRecord(collection.summons),
    },
    preferences: {collectionView: preferences.collectionView === "table" ? "table" : "grid"},
  };
}

export function parseAccount(raw: string | null): SoutenrokuAccount | null {
  if (!raw) return null;
  try { return sanitizeAccount(JSON.parse(raw)); } catch { return null; }
}

export function parseAccountExport(raw: string): SoutenrokuExport | null {
  try {
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value) || value.format !== SOUTENROKU_EXPORT_FORMAT || value.schemaVersion !== SOUTENROKU_ACCOUNT_VERSION || typeof value.exportedAt !== "string") return null;
    const data = sanitizeAccount(value.data);
    return data ? {format:SOUTENROKU_EXPORT_FORMAT,schemaVersion:SOUTENROKU_ACCOUNT_VERSION,exportedAt:value.exportedAt,data} : null;
  } catch { return null; }
}

export function createAccountExport(data: SoutenrokuAccount): SoutenrokuExport {
  return {format:SOUTENROKU_EXPORT_FORMAT,schemaVersion:SOUTENROKU_ACCOUNT_VERSION,exportedAt:new Date().toISOString(),data};
}

export function mergeAccounts(current: SoutenrokuAccount, incoming: SoutenrokuAccount): SoutenrokuAccount {
  return {
    schemaVersion:SOUTENROKU_ACCOUNT_VERSION,
    updatedAt:new Date().toISOString(),
    progress:{...current.progress,...incoming.progress},
    roadmapSelections:{...current.roadmapSelections,...incoming.roadmapSelections},
    arcarumProjects:{...current.arcarumProjects,...incoming.arcarumProjects},
    collection:{
      characters:{...current.collection.characters,...incoming.collection.characters},
      summons:{...current.collection.summons,...incoming.collection.summons},
    },
    preferences:{...current.preferences,...incoming.preferences},
  };
}

/** Reads the former checklist-only shape for a one-time migration. */
export function parseLegacyProgress(raw: string | null): ProgressValues | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value) || value.version !== 2) return null;
    return booleanRecord(value.values);
  } catch { return null; }
}
