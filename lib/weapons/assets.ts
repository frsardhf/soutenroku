import rawManifest from "@/app/generated-weapon-assets.json";

export interface WeaponAsset {
  canonicalName: string;
  name: string;
  path: string;
  source: string;
  resolvedUrl: string;
}

interface ManifestWeapon {
  name: string;
  path: string;
  source: string;
  resolvedUrl: string;
}

interface WeaponAssetManifest {
  version: number;
  generatedAt: string;
  weapons: Record<string, ManifestWeapon>;
  aliases: Record<string, string>;
}

const manifest = rawManifest as WeaponAssetManifest;

function normalizeWeaponName(name: string): string {
  return name
    .normalize("NFKC")
    .trim()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("en-US");
}

const normalizedAliases = new Map<string, string>();
for (const [alias, canonicalName] of Object.entries(manifest.aliases)) {
  normalizedAliases.set(normalizeWeaponName(alias), canonicalName);
}
for (const [canonicalName, asset] of Object.entries(manifest.weapons)) {
  normalizedAliases.set(normalizeWeaponName(canonicalName), canonicalName);
  normalizedAliases.set(normalizeWeaponName(asset.name), canonicalName);
}

/**
 * Resolves planner labels without DOM scanning. It tries exact canonical and
 * alias keys first, then a conservative case/space/Unicode punctuation match.
 */
export function resolveWeaponAsset(
  label: string | null | undefined,
): WeaponAsset | null {
  if (!label?.trim()) return null;

  const exactCanonical = manifest.weapons[label];
  const canonicalName = exactCanonical
    ? label
    : (manifest.aliases[label] ?? normalizedAliases.get(normalizeWeaponName(label)));
  if (!canonicalName) return null;

  const asset = manifest.weapons[canonicalName];
  if (!asset) return null;

  return { canonicalName, ...asset };
}

export function getWeaponAssetPath(
  label: string | null | undefined,
): string | undefined {
  return resolveWeaponAsset(label)?.path;
}

export const weaponAssetManifestMeta = Object.freeze({
  version: manifest.version,
  generatedAt: manifest.generatedAt,
  weaponCount: Object.keys(manifest.weapons).length,
});

