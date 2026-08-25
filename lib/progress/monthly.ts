import type { ProgressItemId } from "./schema";

/**
 * Returns the account's current local calendar month, not UTC. Passing a Date
 * keeps this deterministic in tests and when rendering historical checklists.
 */
export function getMonthlyExchangeScope(date = new Date()): string {
  if (Number.isNaN(date.getTime())) {
    throw new RangeError("Cannot create a monthly scope from an invalid Date");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

/** Creates a stable, month-scoped checklist ID for limited shop stock. */
export function getMonthlyExchangeProgressId(
  itemId: string,
  date = new Date(),
): ProgressItemId {
  const stableItemId = itemId.trim();
  if (!stableItemId) {
    throw new TypeError("Monthly exchange item IDs cannot be empty");
  }

  return `exchange:monthly:${getMonthlyExchangeScope(date)}:${stableItemId}`;
}

